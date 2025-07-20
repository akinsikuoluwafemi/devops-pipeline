-- DROP TABLE IF EXISTS users;
-- psql -U oluwafemiakinsiku -d crudinfra -f infra/db.sql

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);