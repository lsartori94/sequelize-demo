#!/bin/bash

mkdir postgres
cd postgres

docker volume create --driver local --name=pgvolume
docker volume create --driver local --name=pga4volume

docker network create --driver bridge pgnetwork

cat << EOF > pg-env.list
PG_MODE=primary
PG_PRIMARY_USER=admin
PG_PRIMARY_PASSWORD=admin
PG_DATABASE=testdb
PG_USER=test
PG_PASSWORD=test
PG_ROOT_PASSWORD=admin
PG_PRIMARY_PORT=5432
EOF

cat << EOF > pgadmin-env.list
PGADMIN_SETUP_EMAIL=test@test.com
PGADMIN_SETUP_PASSWORD=test
SERVER_PORT=5050
EOF

docker run --publish 5432:5432 \
  --volume=pgvolume:/pgdata \
  --env-file=pg-env.list \
  --name="postgres" \
  --hostname="postgres" \
  --network="pgnetwork" \
  --detach \
crunchydata/crunchy-postgres:centos7-10.5-2.1.0

docker run --publish 5050:5050 \
  --volume=pga4volume:/var/lib/pgadmin \
  --env-file=pgadmin-env.list \
  --name="pgadmin4" \
  --hostname="pgadmin4" \
  --network="pgnetwork" \
crunchydata/crunchy-pgadmin4:centos7-10.5-2.1.0
  --detach \
