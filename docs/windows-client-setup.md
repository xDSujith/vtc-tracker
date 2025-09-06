# Trucky++ Windows Client Setup Guide

## Overview
The Trucky++ Windows Client provides real-time integration between Euro Truck Simulator 2 / American Truck Simulator and your VTC management system.

## Features
- **Real-time Telemetry**: Live data streaming from ETS2/ATS
- **In-game Overlay**: Customizable HUD with job info, navigation, and VTC data
- **Job Integration**: Automatic job tracking and progress updates
- **Anti-cheat Protection**: Built-in violation detection and reporting
- **Discord Integration**: Rich presence and notification support
- **Voice Chat**: Integrated VTC communication system

## System Requirements
- Windows 10/11 (64-bit)
- .NET Framework 4.8 or later
- Euro Truck Simulator 2 or American Truck Simulator
- Active internet connection
- VTC membership and valid authentication token

## Installation

### Step 1: Download
1. Download the latest Trucky++ Client installer from the VTC dashboard
2. Verify the file integrity using the provided checksum
3. Run the installer as Administrator

### Step 2: Initial Setup
1. Launch Trucky++ Client
2. Enter your VTC credentials:
   - API Endpoint: `https://your-vtc-domain.com`
   - Auth Token: (from your VTC dashboard)
   - Driver ID: Your assigned driver ID
3. Click "Connect" to authenticate

### Step 3: Game Integration
1. Ensure ETS2/ATS is installed and updated
2. Enable the Telemetry SDK in game settings:
   - Go to Options > Gameplay
   - Enable "Developer Console"
   - Restart the game
3. The client will automatically detect the game when launched

### Step 4: Overlay Configuration
1. Open Overlay Settings in the client
2. Configure position, size, and opacity
3. Select which modules to display:
   - Speedometer and vehicle info
   - Current job details
   - Navigation information
   - VTC announcements
   - Chat messages

## Configuration

### Telemetry Settings
\`\`\`json
{
  "telemetryInterval": 1000,
  "enableAntiCheat": true,
  "strictMode": false,
  "reportViolations": true
}
\`\`\`

### Overlay Modules
- **Vehicle Info**: Speed, RPM, fuel, damage
- **Job Tracker**: Current cargo, destination, ETA
- **Navigation**: Route guidance and traffic info
- **VTC Panel**: Company messages and announcements
- **Chat**: In-game communication with VTC members

### Anti-cheat Features
The client includes several anti-cheat mechanisms:
- Speed violation detection
- Teleportation prevention
- Fuel consumption monitoring
- Route validation
- Time manipulation detection

## Troubleshooting

### Common Issues

**Client won't connect**
- Verify internet connection
- Check firewall settings
- Ensure auth token is valid
- Contact VTC administrators

**Game not detected**
- Restart both game and client
- Run client as Administrator
- Verify game installation path
- Check telemetry SDK is enabled

**Overlay not showing**
- Check overlay is enabled in settings
- Verify game is in windowed/borderless mode
- Adjust overlay position and opacity
- Restart client if needed

### Log Files
Client logs are stored in:
\`\`\`
%APPDATA%\TruckyPlusPlus\Logs\
\`\`\`

Include these logs when reporting issues.

## Support
For technical support:
1. Check the troubleshooting section
2. Review log files for errors
3. Contact your VTC administrators
4. Submit bug reports through the client

## Privacy & Security
- Telemetry data is encrypted in transit
- Only game-related data is collected
- No personal files or system info accessed
- Data retention follows VTC policies
- Anti-cheat data helps maintain fair play

## Updates
The client includes automatic update functionality:
- Updates are downloaded in background
- Restart required for installation
- Backup configurations are preserved
- Rollback available if issues occur
