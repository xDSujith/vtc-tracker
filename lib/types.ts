export interface User {
  id: string
  discordId: string
  username: string
  email: string
  avatar?: string
  role: UserRole
  vtcId?: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  lastSeen: Date
  preferences: UserPreferences
  name: string
  avatar_url: string
  company_id?: string
  company?: VTC
  role_id?: string
  total_driven_distance: number
  total_cargo_mass: number
  total_revenue: number
  twitch?: string
  youtube?: string
  facebook?: string
  website?: string
  wotr?: string
  twitter?: string
  discord_server?: string
}

export interface UserPreferences {
  theme: "light" | "dark"
  notifications: boolean
  language: string
  timezone: string
}

export enum UserRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  DISPATCHER = "DISPATCHER",
  DRIVER = "DRIVER",
  MEMBER = "MEMBER",
}

export interface VTC {
  id: string
  name: string
  tag: string
  description: string
  logo?: string
  banner?: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  settings: VTCSettings
  stats: VTCStats
}

export interface VTCSettings {
  // General Settings
  name: string
  slug: string
  logo?: string
  banner?: string
  motto?: string
  timeZone: string
  currency: string
  languages: string[]
  contactInfo: ContactInfo

  // Branding
  themeColors: ThemeColors
  fonts: FontSettings
  overlayDefaults: OverlayDefaults

  // Fleet & Economy
  fleetCap: number
  vehicleAssignment: VehicleAssignmentSettings
  salaries: SalarySettings
  penalties: PenaltySettings
  insurance: InsuranceSettings
  multipliers: MultiplierSettings
  leaderboardWeights: LeaderboardWeights

  // Legacy settings
  requireApplication: boolean
  autoAcceptApplications: boolean
  allowPublicJobs: boolean
  economyEnabled: boolean
  antiCheatEnabled: boolean
  discordWebhook?: string
}

export interface ContactInfo {
  website?: string
  email?: string
  discord?: string
  facebook?: string
  twitter?: string
  youtube?: string
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
}

export interface FontSettings {
  heading: string
  body: string
  monospace: string
}

export interface OverlayDefaults {
  opacity: number
  fonts: FontSettings
  draggableLayouts: boolean
}

export interface VehicleAssignmentSettings {
  allowDriverOwnership: boolean
  requireManagerApproval: boolean
  maxTrucksPerDriver: number
}

export interface SalarySettings {
  baseSalary: number
  perKmRate: number
  bonusMultiplier: number
  paymentSchedule: "WEEKLY" | "MONTHLY"
}

export interface PenaltySettings {
  lateFee: number
  damageFee: number
  speedingFine: number
  trafficViolationFine: number
}

export interface InsuranceSettings {
  enabled: boolean
  monthlyRate: number
  deductible: number
  coveragePercentage: number
}

export interface MultiplierSettings {
  distanceMultiplier: number
  cargoMultiplier: number
  difficultyMultiplier: number
  timeMultiplier: number
}

export interface LeaderboardWeights {
  distance: number
  jobs: number
  revenue: number
  rating: number
  onTime: number
}

export interface Driver {
  id: string
  userId: string
  vtcId: string
  employeeId: string
  hiredAt: Date
  isActive: boolean
  stats: DriverStats
  currentTruck?: string
  currentJob?: string
  location: Location
  status: DriverStatus
}

export interface DriverStats {
  totalJobs: number
  totalDistance: number
  totalRevenue: number
  averageRating: number
  onTimeDeliveries: number
  lateDeliveries: number
  accidents: number
  fines: number
}

export enum DriverStatus {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
  DRIVING = "DRIVING",
  RESTING = "RESTING",
  LOADING = "LOADING",
  UNLOADING = "UNLOADING",
}

export interface Truck {
  id: string
  vtcId: string
  brand: string
  model: string
  licensePlate: string
  ownedBy: string
  assignedTo?: string
  purchaseDate: Date
  mileage: number
  condition: number
  location: Location
  isActive: boolean
  specs: TruckSpecs
}

export interface TruckSpecs {
  engine: string
  transmission: string
  horsepower: number
  torque: number
  fuelCapacity: number
  maxWeight: number
}

export interface Job {
  id: string
  vtcId: string
  createdBy: string
  assignedTo?: string
  title: string
  description: string
  cargo: CargoInfo
  route: Route
  payment: number
  deadline: Date
  status: JobStatus
  createdAt: Date
  startedAt?: Date
  completedAt?: Date
  rating?: number
  feedback?: string
}

export interface CargoInfo {
  type: string
  weight: number
  fragile: boolean
  hazardous: boolean
  specialRequirements?: string
}

export interface Route {
  origin: Location
  destination: Location
  distance: number
  estimatedTime: number
  waypoints?: Location[]
}

export interface Location {
  city: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
}

export enum JobStatus {
  AVAILABLE = "AVAILABLE",
  ASSIGNED = "ASSIGNED",
  IN_PROGRESS = "IN_PROGRESS",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export interface TelemetryData {
  id: string
  driverId: string
  timestamp: Date
  game: "ETS2" | "ATS"
  position: Location
  speed: number
  fuel: number
  damage: number
  isOnline: boolean
  jobId?: string
  truckId?: string
}

export interface Event {
  id: string
  vtcId: string
  title: string
  description: string
  coverImage?: string
  tags: string[]
  startDate: Date
  endDate: Date
  recurrence?: RecurrenceSettings
  server?: string
  dlc?: string[]
  route?: EventRoute
  location?: Location
  maxParticipants?: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
  status: EventStatus
  chatEnabled: boolean
  voiceChannelId?: string
  staffRoles: string[]
}

export interface RecurrenceSettings {
  type: "DAILY" | "WEEKLY" | "MONTHLY"
  interval: number
  endDate?: Date
  count?: number
}

export interface EventRoute {
  gpxData?: string
  waypoints: Location[]
  distance: number
  estimatedTime: number
}

export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface EventAttendee {
  id: string
  eventId: string
  userId: string
  rsvpStatus: RSVPStatus
  role: AttendeeRole
  joinedAt: Date
  notes?: string
}

export enum RSVPStatus {
  GOING = "GOING",
  INTERESTED = "INTERESTED",
  NOT_GOING = "NOT_GOING",
  NO_RESPONSE = "NO_RESPONSE",
}

export enum AttendeeRole {
  DRIVER = "DRIVER",
  STAFF = "STAFF",
  STREAMER = "STREAMER",
  OBSERVER = "OBSERVER",
}

export interface EventReminder {
  id: string
  eventId: string
  type: "EMAIL" | "DISCORD" | "PUSH"
  scheduledFor: Date
  sent: boolean
  sentAt?: Date
}

export interface EventTag {
  id: string
  vtcId: string
  name: string
  color: string
  createdAt: Date
}

export interface NotificationTemplate {
  id: string
  vtcId: string
  type: NotificationType
  name: string
  subject: string
  content: string
  variables: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export enum NotificationType {
  EMAIL = "EMAIL",
  DISCORD = "DISCORD",
  PUSH = "PUSH",
  SMS = "SMS",
}

export interface NotificationSettings {
  emailEnabled: boolean
  discordEnabled: boolean
  pushEnabled: boolean
  smsEnabled: boolean
  severityLevels: SeverityLevel[]
}

export interface SeverityLevel {
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  channels: NotificationType[]
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  ipAllowlist: string[]
  apiKeyRotationDays: number
  sessionTimeout: number
  gdprCompliant: boolean
  telemetryRetentionDays: number
  jobRetentionDays: number
  ssoEnabled: boolean
  ssoProviders: SSOProvider[]
}

export interface SSOProvider {
  type: "STEAM" | "DISCORD" | "GOOGLE"
  clientId: string
  enabled: boolean
}

export interface DeveloperSettings {
  betaFeatures: string[]
  customCSS?: string
  customJS?: string
  telemetrySigningRules: SigningRule[]
  webhookTesting: boolean
}

export interface SigningRule {
  field: string
  algorithm: string
  secret: string
}

export interface Role {
  id: string
  vtcId: string
  name: string
  color: string
  permissions: Permission[]
  isDefault: boolean
  priority: number
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  module: string
  action: string
  resource?: string
}

export interface Integration {
  id: string
  vtcId: string
  type: IntegrationType
  config: IntegrationConfig
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export enum IntegrationType {
  DISCORD = "DISCORD",
  OBS = "OBS",
  TRUCKSBOOK = "TRUCKSBOOK",
  WEBHOOK = "WEBHOOK",
  API = "API",
}

export interface IntegrationConfig {
  [key: string]: any
}

export interface VTCStats {
  totalMembers: number
  totalJobs: number
  totalDistance: number
  totalRevenue: number
  averageRating: number
}

export interface CompanyAllTimeStats {
  balance: number
  vehicles: number
  jobs: number
  running_jobs: number
  members: number
  garages: number
  revenues: number
}

export interface CompanyLeaderboardsStats {
  month: number
  year: number
  total: {
    real: number
    race: number
    total_jobs: number
    jobs_completed: number
    jobs_canceled: number
  }
  ets2: {
    real: number
    race: number
    total_jobs: number
    jobs_completed: number
    jobs_canceled: number
    leaderbords_position_real_miles: number
    leaderbords_position_race_miles: number
  }
  ats: {
    real: number
    race: number
    total_jobs: number
    jobs_completed: number
    jobs_canceled: number
    leaderbords_position_real_miles: number
    leaderbords_position_race_miles: number
  }
}

export interface CompanyMemberStats {
  month: number
  year: number
  members: CompanySingleMemberStats[]
}

export interface CompanySingleMemberStats {
  user_id: number
  name: string
  driven_distance: number
  jobs: number
  cargo_mass: number
  revenue: number
}

export interface CompanyEcoMonthlyStats {
  jobs: number
  driven_distance: number
  revenue: number
  cargo_mass: number
  fuel_used: number
  fuel_cost: number
  rent_cost: number
  taxes: number
  damage_cost: number
}

export interface CompanyAggregatedStats {
  avg_driving_time: number
  avg_real_distance: number
  company_trailer_deliveries: number
  distance_driven_on_job: number
  jobs_delivered: number
  max_driving_time: number
  max_real_distance: number
  no_damage_jobs: number
  owned_trailer_deliveries: number
  race_stats_jobs: number
  real_stats_jobs: number
  sp_jobs: number
  special_transport: number
  total_earned_money: number
  total_jobs_late: number
  total_jobs_manual_load: number
  total_jobs_manual_park: number
}

export interface Vehicle {
  id: string
  created_at: string
  updated_at?: string
  deleted_at?: string
  type: string
  company_id: string
  company?: VTC
  assigned_to_user_id?: string
  driver?: User
  game_id?: number
  garage_id: string
  garage?: Garage
  model_id: string
  model?: VehicleModel
  odometer: number
  wheels_number?: number
  price?: number
  currency: string
  odometer_km: number
  last_general_maintenance_km: number
  last_tires_maintenance_km: number
  last_engine_maintenance_km: number
  last_brakes_maintenance_km: number
  status: "active" | "need_maintenance" | "under_maintenance"
  maintenance_end_date?: string
}

export interface VehicleModel {
  id: string
  created_at: string
  updated_at?: string
  name: string
  in_game_id: string
  game_id?: number
  photo_url?: string
  brand_id: string
  brand?: Brand
  price?: number
  source: string
  type: "truck" | "bus"
}

export interface Brand {
  id: string
  created_at: string
  updated_at?: string
  name: string
  in_game_id: string
  logo_url: string
}

export interface Garage {
  id: string
  created_at: string
  updated_at?: string
  deleted_at?: string
  company_id: string
  game_id?: number
  city_id: number
  city?: City
  max_vehicles?: number
  max_trailers?: number
  price: number
  currency: string
}

export interface City {
  id: string
  name: string
  country_id: string
  country?: Country
  region?: string
  longitude?: number
  latitude?: number
}

export interface Country {
  id: string
  name: string
  code_alpha_2: string
  code_alpha_3: string
  currency?: string
  tax_rate?: number
}

export interface MaintenanceAlerts {
  need_maintenance: number
  under_maintenance: number
}

export interface Application {
  id: string
  company_id: string
  user_id: string
  user?: User
  editor_user_id?: number
  recruiter?: User
  status?: "pending" | "accepted" | "rejected" | "retired"
  message?: string
  created_at: string
  updated_at?: string
  discord?: string
  reject_reason?: string
  internal_comment?: string
}

export interface CompanyEvent {
  id: string
  created_at: string
  updated_at?: string
  event_type: "meetup" | "convoy" | "truckshow" | "truckshow_and_convoy"
  mode: "truckersmp" | "convoymode"
  server: string
  company_id: string
  company?: VTC
  user_id?: string
  author?: User
  game_id: 1 | 2
  meetup_date: string
  start_date: string
  start_city: string
  start_location: string
  end_city?: string
  end_location?: string
  information: string
  rules?: string
  discord_sync?: boolean
  discord_channel_id?: string
  discord_message_id?: string
  discord_event_id?: string
  status: "draft" | "published"
  private?: boolean
  language: string
  cover_url?: string
  route_url?: string
  voice_link?: string
  website?: string
}

export interface Dispatch {
  id: string
  company_id: string
  claimed_by_user_id: string
  dispatched_to_user_id: string
  user_id: string
  dispatch_type: "job"
  game: "ETS2" | "ATS"
  dispatcher?: User
  claimedBy?: User
  dispatchedTo?: User
  data?: JobDispatchData
  unique_id: string
  grouped_unique_id: string
  expired_at?: string
  must_be_claimed?: boolean
  description?: string
}

export interface JobDispatchData {
  game: "ETS2" | "ATS"
  cargo: string
  market: "freight_market" | "cargo_market"
  urgency?: number
  distance: number
  uniqueID: string
  cargo_name: string
  source_city: string
  source_company: string
  source_city_name: string
  source_company_name: string
  destination_city: string
  destination_company: string
  destination_city_name: string
  destination_company_name: string
}

export interface CargoDefinition {
  id: string
  name: string
  in_game_id: string
  game_id: number
  adr_class: number
  fragility: number
  mass: number
  volume: number
  unit_reward_per_km: number
  overweight: boolean
  groups?: string[]
  body_types: string[]
  localized_names: Record<string, string>
  valueable: boolean
  last_value_change?: string
  market_demand?: number
  difference?: number
  is_fragile: boolean
  revenue_per_ton_per_km?: number
  revenue_per_ton_per_km_with_market_change?: number
}

export interface JobEvent {
  id: string
  event_type:
    | "teleport"
    | "truck_fixed"
    | "job_resumed"
    | "fined"
    | "tollgate_paid"
    | "collision"
    | "transport_used"
    | "refuel"
  x?: number
  y?: number
  z?: number
  job_id: string
  attributes?: Record<string, any>
  created_at: string
  updated_at?: string
}

export interface FineDetails {
  offence:
    | "crash"
    | "avoid_sleeping"
    | "wrong_way"
    | "speeding_camera"
    | "no_lights"
    | "red_signal"
    | "speeding"
    | "avoid_weighing"
    | "illegal_trailer"
    | "avoid_inspection"
    | "illegal_border_crossing"
    | "hard_shoulder_violation"
    | "damaged_vehicle_usage"
    | "generic"
  amount: number
}

export interface TollgatesDetails {
  amount: number
}

export interface TransportsDetails {
  event: "ferry" | "train"
  source: string
  destination: string
  amount: number
}

export interface EnhancedJob extends Job {
  deleted_at?: string
  driver?: User
  game_id: number
  company?: VTC
  market: string
  game_mode: string
  server?: string
  vehicle_id?: string
  vehicle?: Vehicle
  owned_trailer_id?: string
  in_game_profile_id?: string
  in_game_profile_name?: string
  vehicle_in_game_brand_id?: string
  vehicle_in_game_id?: string
  vehicle_brand_name?: string
  vehicle_model_name?: string
  trailer_in_game_id?: string
  trailer_name?: string
  trailer_body_type?: string
  trailer_chain_type?: string
  vehicle_odometer_start: number
  vehicle_odometer_end: number
  source_city_id?: string
  source_city_name?: string
  destination_city_id?: string
  destination_city_name?: string
  source_company_id?: string
  source_company_name?: string
  destination_company_id?: string
  destination_company_name?: string
  cargo_id?: string
  cargo_definition_id?: string
  cargo_definition?: CargoDefinition
  cargo_name?: string
  planned_distance?: number
  planned_distance_km?: number
  driven_distance: number
  driven_distance_km: number
  cargo_mass: number
  cargo_mass_t: number
  cargo_unit_count?: number
  cargo_unit_mass: number
  income?: number
  income_details?: Record<string, any>
  game_income?: number
  revenue: number
  taxes: number
  vehicle_damage: number
  trailers_damage: number
  cargo_damage: number
  fuel_used: number
  fuel_used_l: number
  fuel_cost: number
  special_job?: boolean
  auto_load?: boolean
  auto_park?: boolean
  other_costs_total: number
  fines_details?: FineDetails[]
  transports_details?: TransportsDetails[]
  tollgates_details?: TollgatesDetails[]
  late_delivery?: boolean
  started_at?: string
  completed_at?: string
  canceled_at?: string
  in_game_delivery_time?: number
  in_game_time_start?: number
  in_game_time_end?: number
  max_map_scale?: number
  real_driving_time_seconds?: number
  currency: string
  weight_unit: string
  distance_unit: string
  volume_unit: string
  fuel_unit_price: string
  stats_type?: "real_miles" | "race_miles" | "invalid"
  max_speed?: number
  average_speed_kmh?: number
  damage_cost: number
  damage_cost_details?: string
  timezone?: string
  rent_cost_per_km: number
  rent_cost_total: number
  deleted_by_user_id?: string
  warp?: number
  events?: JobEvent[]
}

export interface PaginatedResponse<T> {
  current_page: number
  from: number
  to: number
  last_page: number
  per_page: number
  total: number
  data: T[]
}

export interface ApiResponse<T = any> {
  message?: string
  success: boolean
  error: boolean
  data?: T
}

export interface AddMemberRequest {
  steam_id: string
  email: string
  name: string
  avatar?: string
  country?: string
  language?: string
  twitch?: string
  youtube?: string
  facebook?: string
  wotr?: string
  twitter?: string
  website?: string
  discord_server?: string
}

export interface RemoveMemberRequest {
  steam_id: string
}
