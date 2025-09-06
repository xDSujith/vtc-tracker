-- VTC Tracker - Comprehensive Database Schema
-- Version 2: Fixed creation order to resolve dependency issues.

-- Step 1: Create all tables without foreign key constraints.

CREATE TABLE IF NOT EXISTS vtcs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    tag VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    logo TEXT,
    banner TEXT,
    owner_id UUID, -- To be linked in Step 2
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}'::jsonb,
    stats JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discord_id VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
    vtc_id UUID, -- To be linked in Step 2
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    preferences JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    vtc_id UUID NOT NULL,
    employee_id VARCHAR(20) NOT NULL,
    hired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    stats JSONB DEFAULT '{}'::jsonb,
    current_truck UUID, -- To be linked in Step 2
    current_job UUID, -- To be linked in Step 2
    location JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(20) DEFAULT 'OFFLINE',
    UNIQUE(vtc_id, employee_id)
);

CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vtc_id UUID NOT NULL,
    created_by UUID NOT NULL,
    assigned_to UUID, -- To be linked in Step 2
    title VARCHAR(200) NOT NULL,
    description TEXT,
    cargo JSONB NOT NULL,
    route JSONB NOT NULL,
    payment DECIMAL(10,2) NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT
);

CREATE TABLE IF NOT EXISTS trucks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vtc_id UUID NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    owned_by UUID NOT NULL,
    assigned_to UUID, -- To be linked in Step 2
    purchase_date DATE NOT NULL,
    mileage INTEGER DEFAULT 0,
    condition INTEGER DEFAULT 100,
    location JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    specs JSONB DEFAULT '{}'::jsonb,
    UNIQUE(vtc_id, license_plate)
);

CREATE TABLE IF NOT EXISTS telemetry_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    game VARCHAR(10) NOT NULL,
    position JSONB NOT NULL,
    speed DECIMAL(5,2) NOT NULL,
    fuel DECIMAL(5,2) NOT NULL,
    damage DECIMAL(5,2) NOT NULL,
    is_online BOOLEAN DEFAULT true,
    job_id UUID, -- To be linked in Step 2
    truck_id UUID -- To be linked in Step 2
);

CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vtc_id UUID NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location JSONB,
    participants UUID[] DEFAULT '{}',
    max_participants INTEGER,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL,
    vtc_id UUID NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    reason TEXT NOT NULL,
    issued_by UUID NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_paid BOOLEAN DEFAULT false,
    paid_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vtc_id UUID NOT NULL,
    user_id UUID NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_by UUID, -- To be linked in Step 2
    reviewed_at TIMESTAMP WITH TIME ZONE,
    feedback TEXT,
    UNIQUE(vtc_id, user_id)
);

-- Step 2: Add all foreign key constraints now that tables are created.
ALTER TABLE users ADD CONSTRAINT fk_users_vtc FOREIGN KEY (vtc_id) REFERENCES vtcs(id) ON DELETE SET NULL;
ALTER TABLE vtcs ADD CONSTRAINT fk_vtcs_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE drivers ADD CONSTRAINT fk_drivers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE drivers ADD CONSTRAINT fk_drivers_vtc FOREIGN KEY (vtc_id) REFERENCES vtcs(id) ON DELETE CASCADE;
ALTER TABLE drivers ADD CONSTRAINT fk_drivers_truck FOREIGN KEY (current_truck) REFERENCES trucks(id) ON DELETE SET NULL;
ALTER TABLE drivers ADD CONSTRAINT fk_drivers_job FOREIGN KEY (current_job) REFERENCES jobs(id) ON DELETE SET NULL;

ALTER TABLE jobs ADD CONSTRAINT fk_jobs_vtc FOREIGN KEY (vtc_id) REFERENCES vtcs(id) ON DELETE CASCADE;
ALTER TABLE jobs ADD CONSTRAINT fk_jobs_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE jobs ADD CONSTRAINT fk_jobs_driver FOREIGN KEY (assigned_to) REFERENCES drivers(id) ON DELETE SET NULL;

ALTER TABLE trucks ADD CONSTRAINT fk_trucks_vtc FOREIGN KEY (vtc_id) REFERENCES vtcs(id) ON DELETE CASCADE;
ALTER TABLE trucks ADD CONSTRAINT fk_trucks_owner FOREIGN KEY (owned_by) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE trucks ADD CONSTRAINT fk_trucks_driver FOREIGN KEY (assigned_to) REFERENCES drivers(id) ON DELETE SET NULL;

ALTER TABLE telemetry_data ADD CONSTRAINT fk_telemetry_driver FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE;
ALTER TABLE telemetry_data ADD CONSTRAINT fk_telemetry_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL;
ALTER TABLE telemetry_data ADD CONSTRAINT fk_telemetry_truck FOREIGN KEY (truck_id) REFERENCES trucks(id) ON DELETE SET NULL;

ALTER TABLE events ADD CONSTRAINT fk_events_vtc FOREIGN KEY (vtc_id) REFERENCES vtcs(id) ON DELETE CASCADE;
ALTER TABLE events ADD CONSTRAINT fk_events_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE fines ADD CONSTRAINT fk_fines_driver FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE;
ALTER TABLE fines ADD CONSTRAINT fk_fines_vtc FOREIGN KEY (vtc_id) REFERENCES vtcs(id) ON DELETE CASCADE;
ALTER TABLE fines ADD CONSTRAINT fk_fines_issuer FOREIGN KEY (issued_by) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE applications ADD CONSTRAINT fk_applications_vtc FOREIGN KEY (vtc_id) REFERENCES vtcs(id) ON DELETE CASCADE;
ALTER TABLE applications ADD CONSTRAINT fk_applications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE applications ADD CONSTRAINT fk_applications_reviewer FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL;


-- Step 3: Create indexes for better performance.
CREATE INDEX IF NOT EXISTS idx_users_discord_id ON users(discord_id);
CREATE INDEX IF NOT EXISTS idx_users_vtc_id ON users(vtc_id);
CREATE INDEX IF NOT EXISTS idx_drivers_user_id ON drivers(user_id);
CREATE INDEX IF NOT EXISTS idx_drivers_vtc_id ON drivers(vtc_id);
CREATE INDEX IF NOT EXISTS idx_jobs_vtc_id ON jobs(vtc_id);
CREATE INDEX IF NOT EXISTS idx_jobs_assigned_to ON jobs(assigned_to);
CREATE INDEX IF NOT EXISTS idx_telemetry_driver_id ON telemetry_data(driver_id);
CREATE INDEX IF NOT EXISTS idx_telemetry_timestamp ON telemetry_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_events_vtc_id ON events(vtc_id);
CREATE INDEX IF NOT EXISTS idx_fines_driver_id ON fines(driver_id);
CREATE INDEX IF NOT EXISTS idx_applications_vtc_id ON applications(vtc_id);
