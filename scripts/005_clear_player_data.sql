-- Comprehensive script to clear all player and activity data for a fresh start.
-- This will remove all users, jobs, telemetry, logs, and reset them to a clean slate.
-- It preserves the core VTC entry and re-seeds essential roles and the admin user.

-- Disable triggers to avoid issues with foreign key constraints during truncation.
SET session_replication_role = 'replica';

-- Truncate all tables containing variable data, restarting their ID sequences and cascading to dependent tables.
TRUNCATE TABLE
    "public"."audit_logs",
    "public"."job_legs",
    "public"."jobs",
    "public"."telemetry_data", -- Corrected table name
    "public"."user_roles",
    "public"."users",
    "public"."vehicles",
    "public"."roles",
    "public"."drivers", -- Added missing table
    "public"."trucks" -- Added missing table
RESTART IDENTITY CASCADE;

-- Re-enable triggers after truncation is complete.
SET session_replication_role = 'origin';

-- Re-seed the essential default roles for the VTC.
-- We need to get the ID of the main VTC to associate roles with it.
DO $$
DECLARE
    vtc_id_var UUID;
    owner_role_id_var UUID;
    admin_user_id_var UUID;
BEGIN
    -- Select the ID of the primary VTC
    SELECT id INTO vtc_id_var FROM "public"."vtcs" WHERE name = 'European Express Logistics';

    -- Re-insert the essential default roles
    INSERT INTO "public"."roles" (vtc_id, name, is_default, permissions) VALUES
    (vtc_id_var, 'Owner', true, ARRAY['*']::text[]),
    (vtc_id_var, 'Driver', true, ARRAY['read:jobs', 'create:jobs']::text[])
    RETURNING id INTO owner_role_id_var; -- Get the ID of the 'Owner' role we just created

    -- Re-create the main admin user
    INSERT INTO "public"."users" (vtc_id, username, email, password_hash, is_vtc_owner)
    VALUES (vtc_id_var, 'admin', 'admin@vtc.com', '$2b$12$L/DxH8xL4s2rK5z4s5A6QO2z4i8E9o2v3J1c7B6c5D4e3F2a1G0b2', true)
    RETURNING id INTO admin_user_id_var;

    -- Assign the 'Owner' role to the new admin user
    INSERT INTO "public"."user_roles" (user_id, role_id) VALUES (admin_user_id_var, owner_role_id_var);
END $$;

COMMIT;
