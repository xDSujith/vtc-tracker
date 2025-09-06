#!/usr/bin/env bash
set -e # Exit immediately if a command exits with a non-zero status.

DB_NAME="vtc_tracker"

echo "--- Checking for existing database and dropping if found ---"
if psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "Database '$DB_NAME' found. Dropping it."
    dropdb $DB_NAME
else
    echo "Database '$DB_NAME' not found. Skipping drop."
fi

echo "--- Creating new database: $DB_NAME ---"
createdb $DB_NAME

echo "--- Running setup script: 001_create_tables.sql ---"
psql -d $DB_NAME -f scripts/001_create_tables.sql

echo "--- Running data clearing script: 005_clear_player_data.sql ---"
psql -d $DB_NAME -f scripts/005_clear_player_data.sql

echo "--- Database reset complete! ---"
