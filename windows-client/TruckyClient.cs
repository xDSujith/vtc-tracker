// C# Windows Client Implementation (Reference)
// This would be the actual C# code for the Windows application

using System;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TruckyPlusPlus.Client
{
    public class TruckyClient
    {
        private ClientWebSocket webSocket;
        private CancellationTokenSource cancellationTokenSource;
        private TelemetryReader telemetryReader;
        private OverlayForm overlayForm;
        private ClientConfig config;

        public TruckyClient(ClientConfig config)
        {
            this.config = config;
            this.telemetryReader = new TelemetryReader();
            this.overlayForm = new OverlayForm(config.Overlay);
        }

        public async Task<bool> InitializeAsync()
        {
            try
            {
                // Authenticate with backend
                var authResult = await AuthenticateAsync();
                if (!authResult)
                {
                    return false;
                }

                // Connect WebSocket
                webSocket = new ClientWebSocket();
                cancellationTokenSource = new CancellationTokenSource();
                
                var uri = new Uri($"{config.ApiEndpoint.Replace("http", "ws")}/ws/telemetry");
                await webSocket.ConnectAsync(uri, cancellationTokenSource.Token);

                // Start telemetry loop
                _ = Task.Run(TelemetryLoop);
                
                // Start message listener
                _ = Task.Run(MessageListener);

                // Show overlay
                if (config.Overlay.Enabled)
                {
                    overlayForm.Show();
                }

                return true;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Initialization failed: {ex.Message}", "Trucky++ Error");
                return false;
            }
        }

        private async Task<bool> AuthenticateAsync()
        {
            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = 
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", config.AuthToken);

            var authData = new
            {
                driverId = config.DriverId,
                clientVersion = "1.0.0"
            };

            var json = JsonSerializer.Serialize(authData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync($"{config.ApiEndpoint}/api/client/auth", content);
            return response.IsSuccessStatusCode;
        }

        private async Task TelemetryLoop()
        {
            while (!cancellationTokenSource.Token.IsCancellationRequested)
            {
                try
                {
                    var telemetryData = telemetryReader.ReadTelemetry();
                    if (telemetryData != null)
                    {
                        await SendTelemetryAsync(telemetryData);
                        
                        // Update overlay
                        if (overlayForm.Visible)
                        {
                            overlayForm.UpdateTelemetry(telemetryData);
                        }
                    }

                    await Task.Delay(config.TelemetryInterval, cancellationTokenSource.Token);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Telemetry error: {ex.Message}");
                }
            }
        }

        private async Task SendTelemetryAsync(TelemetryPacket telemetry)
        {
            if (webSocket.State == WebSocketState.Open)
            {
                var message = new
                {
                    type = "telemetry",
                    data = telemetry
                };

                var json = JsonSerializer.Serialize(message);
                var bytes = Encoding.UTF8.GetBytes(json);
                var buffer = new ArraySegment<byte>(bytes);

                await webSocket.SendAsync(buffer, WebSocketMessageType.Text, true, cancellationTokenSource.Token);
            }
        }

        private async Task MessageListener()
        {
            var buffer = new byte[4096];
            
            while (webSocket.State == WebSocketState.Open && !cancellationTokenSource.Token.IsCancellationRequested)
            {
                try
                {
                    var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cancellationTokenSource.Token);
                    
                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        var json = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        var message = JsonSerializer.Deserialize<dynamic>(json);
                        
                        HandleServerMessage(message);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Message listener error: {ex.Message}");
                }
            }
        }

        private void HandleServerMessage(dynamic message)
        {
            string messageType = message.GetProperty("type").GetString();
            
            switch (messageType)
            {
                case "job_assignment":
                    ShowNotification("New Job Assigned", message.GetProperty("data").GetProperty("title").GetString());
                    break;
                case "vtc_message":
                    ShowNotification("VTC Message", message.GetProperty("data").GetProperty("message").GetString());
                    break;
            }
        }

        private void ShowNotification(string title, string message)
        {
            // Show system tray notification
            var notifyIcon = new NotifyIcon
            {
                Icon = SystemIcons.Information,
                BalloonTipTitle = title,
                BalloonTipText = message,
                Visible = true
            };
            
            notifyIcon.ShowBalloonTip(3000);
        }

        public void Shutdown()
        {
            cancellationTokenSource?.Cancel();
            webSocket?.CloseAsync(WebSocketCloseStatus.NormalClosure, "Client shutdown", CancellationToken.None);
            overlayForm?.Close();
        }
    }

    // Configuration classes
    public class ClientConfig
    {
        public string ApiEndpoint { get; set; }
        public string AuthToken { get; set; }
        public string DriverId { get; set; }
        public string VtcId { get; set; }
        public int TelemetryInterval { get; set; } = 1000;
        public OverlayConfig Overlay { get; set; }
        public AntiCheatConfig AntiCheat { get; set; }
    }

    public class OverlayConfig
    {
        public bool Enabled { get; set; } = true;
        public Point Position { get; set; } = new Point(10, 10);
        public Size Size { get; set; } = new Size(300, 400);
        public float Opacity { get; set; } = 0.8f;
        public string Theme { get; set; } = "dark";
    }

    public class AntiCheatConfig
    {
        public bool Enabled { get; set; } = true;
        public bool StrictMode { get; set; } = false;
        public bool ReportViolations { get; set; } = true;
    }
}
