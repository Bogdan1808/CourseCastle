#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE courses;
    CREATE DATABASE identity;
    CREATE DATABASE payment;
EOSQL