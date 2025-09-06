-- Adding Trucky VTC Hub API compatible tables and enhancements

-- Enhanced vehicles table with maintenance tracking
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    type VARCHAR(20) DEFAULT 'truck',
    company_id UUID NOT NULL REFERENCES vtcs(id) ON DELETE CASCADE,
    assigned_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    game_id INTEGER,
    garage_id UUID REFERENCES garages(id) ON DELETE CASCADE,
    model_id UUID REFERENCES vehicle_models(id) ON DELETE CASCADE,
    odometer DECIMAL(12,2) DEFAULT 0,
    wheels_number INTEGER,
    price DECIMAL(12,2),
    currency VARCHAR(10) DEFAULT 'T¢',
    odometer_km DECIMAL(12,2) DEFAULT 0,
    last_general_maintenance_km DECIMAL(12,2) DEFAULT 0,
    last_tires_maintenance_km DECIMAL(12,2) DEFAULT 0,
    last_engine_maintenance_km DECIMAL(12,2) DEFAULT 0,
    last_brakes_maintenance_km DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'need_maintenance', 'under_maintenance')),
    maintenance_end_date TIMESTAMP WITH TIME ZONE
);

-- Vehicle models table
CREATE TABLE IF NOT EXISTS vehicle_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(100) NOT NULL,
    in_game_id VARCHAR(50) NOT NULL,
    game_id INTEGER,
    photo_url TEXT,
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    price DECIMAL(12,2),
    source VARCHAR(20) DEFAULT 'stock',
    type VARCHAR(20) DEFAULT 'truck' CHECK (type IN ('truck', 'bus'))
);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(100) NOT NULL,
    in_game_id VARCHAR(50) NOT NULL,
    logo_url TEXT
);

-- Enhanced garages table
CREATE TABLE IF NOT EXISTS garages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    company_id UUID NOT NULL REFERENCES vtcs(id) ON DELETE CASCADE,
    game_id INTEGER,
    city_id INTEGER NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    max_vehicles INTEGER,
    max_trailers INTEGER,
    price DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'T¢'
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    region VARCHAR(100),
    longitude DECIMAL(10,8),
    latitude DECIMAL(10,8)
);

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code_alpha_2 VARCHAR(2) NOT NULL UNIQUE,
    code_alpha_3 VARCHAR(3) NOT NULL UNIQUE,
    currency VARCHAR(10),
    tax_rate INTEGER
);

-- Enhanced events table for Trucky compatibility
CREATE TABLE IF NOT EXISTS company_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    event_type VARCHAR(30) NOT NULL CHECK (event_type IN ('meetup', 'convoy', 'truckshow', 'truckshow_and_convoy')),
    mode VARCHAR(20) NOT NULL CHECK (mode IN ('truckersmp', 'convoymode')),
    server VARCHAR(50) NOT NULL,
    company_id UUID NOT NULL REFERENCES vtcs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    game_id INTEGER NOT NULL CHECK (game_id IN (1, 2)),
    meetup_date TIMESTAMP WITH TIME ZONE NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    start_city VARCHAR(100) NOT NULL,
    start_location VARCHAR(200) NOT NULL,
    end_city VARCHAR(100),
    end_location VARCHAR(200),
    information TEXT NOT NULL,
    rules TEXT,
    discord_sync BOOLEAN DEFAULT false,
    discord_channel_id VARCHAR(20),
    discord_message_id VARCHAR(20),
    discord_event_id VARCHAR(20),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    private BOOLEAN DEFAULT false,
    language VARCHAR(10) NOT NULL,
    cover_url TEXT,
    route_url TEXT,
    voice_link TEXT,
    website TEXT
);

-- Dispatches table
CREATE TABLE IF NOT EXISTS dispatches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES vtcs(id) ON DELETE CASCADE,
    claimed_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    dispatched_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dispatch_type VARCHAR(20) DEFAULT 'job',
    game VARCHAR(10) NOT NULL CHECK (game IN ('ETS2', 'ATS')),
    data JSONB NOT NULL,
    unique_id VARCHAR(50) NOT NULL,
    grouped_unique_id VARCHAR(50) NOT NULL,
    expired_at TIMESTAMP WITH TIME ZONE,
    must_be_claimed BOOLEAN,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cargo definitions table
CREATE TABLE IF NOT EXISTS cargo_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    in_game_id VARCHAR(50) NOT NULL,
    game_id INTEGER NOT NULL,
    adr_class INTEGER NOT NULL,
    fragility DECIMAL(5,2) NOT NULL,
    mass DECIMAL(10,2) NOT NULL,
    volume DECIMAL(10,2) NOT NULL,
    unit_reward_per_km DECIMAL(10,4) NOT NULL,
    overweight BOOLEAN DEFAULT false,
    groups TEXT[],
    body_types TEXT[] NOT NULL,
    localized_names JSONB,
    valueable BOOLEAN DEFAULT false,
    last_value_change TIMESTAMP WITH TIME ZONE,
    market_demand INTEGER,
    difference INTEGER,
    is_fragile BOOLEAN DEFAULT false,
    revenue_per_ton_per_km DECIMAL(10,4),
    revenue_per_ton_per_km_with_market_change DECIMAL(10,4)
);

-- Job events table
CREATE TABLE IF NOT EXISTS job_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(30) NOT NULL,
    x DECIMAL(12,4),
    y DECIMAL(12,4),
    z DECIMAL(12,4),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    attributes JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS editor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS discord VARCHAR(50),
ADD COLUMN IF NOT EXISTS reject_reason TEXT,
ADD COLUMN IF NOT EXISTS internal_comment TEXT;

-- Add steam_id to users table for Trucky compatibility
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS steam_id VARCHAR(20) UNIQUE,
ADD COLUMN IF NOT EXISTS total_driven_distance DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_cargo_mass DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_revenue DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS twitch VARCHAR(100),
ADD COLUMN IF NOT EXISTS youtube VARCHAR(100),
ADD COLUMN IF NOT EXISTS facebook VARCHAR(100),
ADD COLUMN IF NOT EXISTS website VARCHAR(200),
ADD COLUMN IF NOT EXISTS wotr VARCHAR(100),
ADD COLUMN IF NOT EXISTS twitter VARCHAR(100),
ADD COLUMN IF NOT EXISTS discord_server VARCHAR(100);

-- Enhanced jobs table for Trucky compatibility
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS game_id INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS market VARCHAR(30) DEFAULT 'freight_market',
ADD COLUMN IF NOT EXISTS game_mode VARCHAR(20) DEFAULT 'sp',
ADD COLUMN IF NOT EXISTS server VARCHAR(50),
ADD COLUMN IF NOT EXISTS vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS owned_trailer_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS in_game_profile_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS in_game_profile_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS vehicle_in_game_brand_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS vehicle_in_game_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS vehicle_brand_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS vehicle_model_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS trailer_in_game_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS trailer_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS trailer_body_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS trailer_chain_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS vehicle_odometer_start DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS vehicle_odometer_end DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS source_city_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS source_city_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS destination_city_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS destination_city_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS source_company_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS source_company_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS destination_company_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS destination_company_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS cargo_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS cargo_definition_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS cargo_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS planned_distance DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS planned_distance_km DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS driven_distance DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS driven_distance_km DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS cargo_mass DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS cargo_mass_t DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS cargo_unit_count INTEGER,
ADD COLUMN IF NOT EXISTS cargo_unit_mass DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS income DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS income_details JSONB,
ADD COLUMN IF NOT EXISTS game_income DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS revenue DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS taxes DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS vehicle_damage DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS trailers_damage DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS cargo_damage DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS fuel_used DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS fuel_used_l DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS fuel_cost DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS special_job BOOLEAN,
ADD COLUMN IF NOT EXISTS auto_load BOOLEAN,
ADD COLUMN IF NOT EXISTS auto_park BOOLEAN,
ADD COLUMN IF NOT EXISTS other_costs_total DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS fines_details JSONB,
ADD COLUMN IF NOT EXISTS transports_details JSONB,
ADD COLUMN IF NOT EXISTS tollgates_details JSONB,
ADD COLUMN IF NOT EXISTS late_delivery BOOLEAN,
ADD COLUMN IF NOT EXISTS canceled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS in_game_delivery_time DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS in_game_time_start DECIMAL(15,2),
ADD COLUMN IF NOT EXISTS in_game_time_end DECIMAL(15,2),
ADD COLUMN IF NOT EXISTS max_map_scale INTEGER,
ADD COLUMN IF NOT EXISTS real_driving_time_seconds INTEGER,
ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'T¢',
ADD COLUMN IF NOT EXISTS weight_unit VARCHAR(10) DEFAULT 't',
ADD COLUMN IF NOT EXISTS distance_unit VARCHAR(10) DEFAULT 'km',
ADD COLUMN IF NOT EXISTS volume_unit VARCHAR(10) DEFAULT 'l',
ADD COLUMN IF NOT EXISTS fuel_unit_price VARCHAR(20) DEFAULT '0',
ADD COLUMN IF NOT EXISTS stats_type VARCHAR(20),
ADD COLUMN IF NOT EXISTS max_speed DECIMAL(6,2),
ADD COLUMN IF NOT EXISTS average_speed_kmh DECIMAL(6,2),
ADD COLUMN IF NOT EXISTS damage_cost DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS damage_cost_details TEXT,
ADD COLUMN IF NOT EXISTS timezone VARCHAR(50),
ADD COLUMN IF NOT EXISTS rent_cost_per_km DECIMAL(10,4) DEFAULT 0,
ADD COLUMN IF NOT EXISTS rent_cost_total DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS deleted_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS warp DECIMAL(6,2);

-- Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_vehicles_company_id ON vehicles(company_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_assigned_to ON vehicles(assigned_to_user_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_garage_id ON vehicles(garage_id);
CREATE INDEX IF NOT EXISTS idx_garages_company_id ON garages(company_id);
CREATE INDEX IF NOT EXISTS idx_company_events_company_id ON company_events(company_id);
CREATE INDEX IF NOT EXISTS idx_company_events_start_date ON company_events(start_date);
CREATE INDEX IF NOT EXISTS idx_dispatches_company_id ON dispatches(company_id);
CREATE INDEX IF NOT EXISTS idx_job_events_job_id ON job_events(job_id);
CREATE INDEX IF NOT EXISTS idx_cargo_definitions_game_id ON cargo_definitions(game_id);
CREATE INDEX IF NOT EXISTS idx_users_steam_id ON users(steam_id);

-- Insert sample countries
INSERT INTO countries (name, code_alpha_2, code_alpha_3, currency, tax_rate) VALUES
('Germany', 'DE', 'DEU', 'EUR', 19),
('France', 'FR', 'FRA', 'EUR', 20),
('United Kingdom', 'GB', 'GBR', 'GBP', 20),
('Netherlands', 'NL', 'NLD', 'EUR', 21),
('Belgium', 'BE', 'BEL', 'EUR', 21),
('Poland', 'PL', 'POL', 'PLN', 23),
('Czech Republic', 'CZ', 'CZE', 'CZK', 21),
('Austria', 'AT', 'AUT', 'EUR', 20),
('Switzerland', 'CH', 'CHE', 'CHF', 8),
('Italy', 'IT', 'ITA', 'EUR', 22),
('Spain', 'ES', 'ESP', 'EUR', 21),
('United States', 'US', 'USA', 'USD', 10),
('Canada', 'CA', 'CAN', 'CAD', 13)
ON CONFLICT (code_alpha_2) DO NOTHING;

-- Insert sample cities
INSERT INTO cities (name, country_id, region, longitude, latitude) VALUES
('Berlin', (SELECT id FROM countries WHERE code_alpha_2 = 'DE'), 'Brandenburg', 13.4050, 52.5200),
('Paris', (SELECT id FROM countries WHERE code_alpha_2 = 'FR'), 'Île-de-France', 2.3522, 48.8566),
('London', (SELECT id FROM countries WHERE code_alpha_2 = 'GB'), 'England', -0.1276, 51.5074),
('Amsterdam', (SELECT id FROM countries WHERE code_alpha_2 = 'NL'), 'North Holland', 4.9041, 52.3676),
('Brussels', (SELECT id FROM countries WHERE code_alpha_2 = 'BE'), 'Brussels-Capital', 4.3517, 50.8503),
('Warsaw', (SELECT id FROM countries WHERE code_alpha_2 = 'PL'), 'Masovian', 21.0122, 52.2297),
('Prague', (SELECT id FROM countries WHERE code_alpha_2 = 'CZ'), 'Prague', 14.4378, 50.0755),
('Vienna', (SELECT id FROM countries WHERE code_alpha_2 = 'AT'), 'Vienna', 16.3738, 48.2082),
('Los Angeles', (SELECT id FROM countries WHERE code_alpha_2 = 'US'), 'California', -118.2437, 34.0522),
('New York', (SELECT id FROM countries WHERE code_alpha_2 = 'US'), 'New York', -74.0060, 40.7128);

-- Insert sample brands
INSERT INTO brands (name, in_game_id, logo_url) VALUES
('Volvo', 'volvo', 'https://example.com/volvo-logo.png'),
('Scania', 'scania', 'https://example.com/scania-logo.png'),
('Mercedes-Benz', 'mercedes', 'https://example.com/mercedes-logo.png'),
('MAN', 'man', 'https://example.com/man-logo.png'),
('DAF', 'daf', 'https://example.com/daf-logo.png'),
('Iveco', 'iveco', 'https://example.com/iveco-logo.png'),
('Renault', 'renault', 'https://example.com/renault-logo.png'),
('Peterbilt', 'peterbilt', 'https://example.com/peterbilt-logo.png'),
('Kenworth', 'kenworth', 'https://example.com/kenworth-logo.png'),
('Freightliner', 'freightliner', 'https://example.com/freightliner-logo.png');
