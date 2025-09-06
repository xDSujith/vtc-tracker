-- Added sample data for VTC Tracker system
-- Insert sample VTC
INSERT INTO vtcs (id, name, tag, description, owner_id, settings, stats) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440000',
    'European Express Logistics',
    'EEL',
    'Premier European trucking company specializing in long-haul deliveries across the continent.',
    '550e8400-e29b-41d4-a716-446655440001',
    '{"requireApplication": true, "autoAcceptApplications": false, "allowPublicJobs": true, "economyEnabled": true, "antiCheatEnabled": true}',
    '{"totalMembers": 25, "totalJobs": 1250, "totalDistance": 125000, "totalRevenue": 2500000, "averageRating": 4.7}'
);

-- Insert sample users
INSERT INTO users (id, discord_id, username, email, role, vtc_id, preferences) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001',
    '123456789012345678',
    'TruckMaster2024',
    'owner@eel-logistics.com',
    'OWNER',
    '550e8400-e29b-41d4-a716-446655440000',
    '{"theme": "dark", "notifications": true, "language": "en", "timezone": "UTC"}'
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    '234567890123456789',
    'DispatcherPro',
    'dispatcher@eel-logistics.com',
    'DISPATCHER',
    '550e8400-e29b-41d4-a716-446655440000',
    '{"theme": "dark", "notifications": true, "language": "en", "timezone": "UTC"}'
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    '345678901234567890',
    'RoadWarrior',
    'driver1@eel-logistics.com',
    'DRIVER',
    '550e8400-e29b-41d4-a716-446655440000',
    '{"theme": "light", "notifications": true, "language": "en", "timezone": "UTC"}'
);

-- Insert sample drivers
INSERT INTO drivers (id, user_id, vtc_id, employee_id, stats, location, status) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440010',
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440000',
    'EEL001',
    '{"totalJobs": 145, "totalDistance": 45000, "totalRevenue": 125000, "averageRating": 4.8, "onTimeDeliveries": 140, "lateDeliveries": 5, "accidents": 2, "fines": 1}',
    '{"city": "Berlin", "country": "Germany", "coordinates": {"lat": 52.5200, "lng": 13.4050}}',
    'ONLINE'
);

-- Insert sample trucks
INSERT INTO trucks (id, vtc_id, brand, model, license_plate, owned_by, assigned_to, purchase_date, mileage, specs, location) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440020',
    '550e8400-e29b-41d4-a716-446655440000',
    'Scania',
    'R 730',
    'EEL-001-DE',
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440010',
    '2023-01-15',
    125000,
    '{"engine": "DC16 V8", "transmission": "Opticruise", "horsepower": 730, "torque": 3500, "fuelCapacity": 1000, "maxWeight": 40000}',
    '{"city": "Berlin", "country": "Germany", "coordinates": {"lat": 52.5200, "lng": 13.4050}}'
);

-- Insert sample jobs
INSERT INTO jobs (id, vtc_id, created_by, assigned_to, title, description, cargo, route, payment, deadline, status) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440030',
    '550e8400-e29b-41d4-a716-446655440000',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440010',
    'Electronics Delivery to Amsterdam',
    'Urgent delivery of electronic components to Amsterdam distribution center.',
    '{"type": "Electronics", "weight": 15000, "fragile": true, "hazardous": false, "specialRequirements": "Temperature controlled"}',
    '{"origin": {"city": "Berlin", "country": "Germany", "coordinates": {"lat": 52.5200, "lng": 13.4050}}, "destination": {"city": "Amsterdam", "country": "Netherlands", "coordinates": {"lat": 52.3676, "lng": 4.9041}}, "distance": 580, "estimatedTime": 360}',
    2500.00,
    '2024-12-10 18:00:00+00',
    'IN_PROGRESS'
),
(
    '550e8400-e29b-41d4-a716-446655440031',
    '550e8400-e29b-41d4-a716-446655440000',
    '550e8400-e29b-41d4-a716-446655440002',
    NULL,
    'Machinery Transport to Prague',
    'Heavy machinery transport requiring special permits.',
    '{"type": "Machinery", "weight": 35000, "fragile": false, "hazardous": false, "specialRequirements": "Oversized load permit required"}',
    '{"origin": {"city": "Munich", "country": "Germany", "coordinates": {"lat": 48.1351, "lng": 11.5820}}, "destination": {"city": "Prague", "country": "Czech Republic", "coordinates": {"lat": 50.0755, "lng": 14.4378}}, "distance": 385, "estimatedTime": 300}',
    4200.00,
    '2024-12-12 12:00:00+00',
    'AVAILABLE'
);

-- Insert sample events
INSERT INTO events (id, vtc_id, title, description, start_date, end_date, created_by, participants) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440040',
    '550e8400-e29b-41d4-a716-446655440000',
    'Christmas Convoy 2024',
    'Annual Christmas convoy from Berlin to Vienna with festive decorations.',
    '2024-12-20 19:00:00+00',
    '2024-12-20 23:00:00+00',
    '550e8400-e29b-41d4-a716-446655440001',
    ARRAY['550e8400-e29b-41d4-a716-446655440003']
);
