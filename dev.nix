{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.postgresql_13
  ];

  shellHook = ''
    export PGDATA=$PWD/.pgdata
    export PGHOST=$PWD/.pgdata # Use a project-local socket directory
    export PGDATABASE=vtc_tracker

    # Create a directory for the socket
    mkdir -p $PGHOST

    if [ ! -d "$PGDATA/base" ]; then
      echo "--- Initializing PostgreSQL Database in $PGDATA ---"
      initdb -D "$PGDATA" --no-locale --encoding=UTF8
    fi

    pg_ctl -D "$PGDATA" -l "$PGDATA/postgres.log" -o "-k $PGHOST" status || pg_ctl -D "$PGDATA" -l "$PGDATA/postgres.log" -o "-k $PGHOST" start

    # Create the database if it doesn't exist
    psql -h $PGHOST -lqt | cut -d \| -f 1 | grep -qw $PGDATABASE || createdb -h $PGHOST $PGDATABASE

    echo -e "\\n\\nPostgreSQL is running. You are now in the development shell.\\nRun ./scripts/reset_database.sh to apply the SQL scripts.\\n"

    trap 'echo "--- Stopping PostgreSQL ---"; pg_ctl -D "$PGDATA" stop' EXIT
  '';
}
