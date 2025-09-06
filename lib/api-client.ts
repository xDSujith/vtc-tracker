// API client utilities for frontend components
export class APIClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL = "/api") {
    this.baseURL = baseURL
  }

  setToken(token: string) {
    this.token = token
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }))
      throw new Error(error.error || "Request failed")
    }

    return response.json()
  }

  // Auth methods
  async login(discordId: string) {
    return this.request<{ user: any; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ discordId }),
    })
  }

  async logout() {
    return this.request("/auth/logout", { method: "POST" })
  }

  // User methods
  async getUsers() {
    return this.request<any[]>("/users")
  }

  async getUserById(id: string) {
    return this.request<any>(`/users/${id}`)
  }

  // VTC methods
  async getVTCs() {
    return this.request<any[]>("/vtcs")
  }

  async createVTC(vtcData: any) {
    return this.request<any>("/vtcs", {
      method: "POST",
      body: JSON.stringify(vtcData),
    })
  }

  // Job methods
  async getJobs(vtcId?: string) {
    const params = vtcId ? `?vtcId=${vtcId}` : ""
    return this.request<any[]>(`/jobs${params}`)
  }

  async createJob(jobData: any) {
    return this.request<any>("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    })
  }

  // Driver methods
  async getDriversByVTC(vtcId: string) {
    return this.request<any[]>(`/vtcs/${vtcId}/drivers`)
  }
}

export const apiClient = new APIClient()
