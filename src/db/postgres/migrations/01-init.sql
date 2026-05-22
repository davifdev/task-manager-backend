CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TYPE task_status AS ENUM (
  'is_pending',
  'in_progress', 
  'is_completed'
);

CREATE TYPE task_time AS ENUM (
  'morning', 
  'afternoon', 
  'evening'
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  description TEXT,
  status task_status,
  time task_time,

  user_id UUID NOT NULL,

  CONSTRAINT fk_tasks_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  family_id VARCHAR(255) NOT NULL,

  user_id UUID NOT NULL,

  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_refresh_tokens_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);