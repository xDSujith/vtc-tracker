-- VTC Tracker - Clear All Data Script
-- Version 2: Synchronized with the corrected table schema.

-- Disable triggers to avoid foreign key constraint issues during truncation.
SET session_replication_role = 'replica';

-- Truncate all tables to reset them to a clean state.
-- The order does not matter here as we have disabled triggers.
TRUNCATE TABLE
    "public"."vtcs",
    "public"."users",
    "public"."drivers",
    "public"."jobs",
    "public"."trucks",
    "public"."telemetry_data",
    "public"."events",
    "public"."fines",
    "public"."applications"
RESTART IDENTITY CASCADE;

-- Re-enable triggers.
SET session_replication_role = 'origin';

COMMIT;

-- Note: This script no longer re-seeds the admin user or default roles.
-- Its single purpose is to provide a completely clean slate.
