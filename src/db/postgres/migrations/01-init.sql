CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(100),
  time VARCHAR(100),

  user_id UUID NOT NULL,

  CONSTRAINT fk_tasks_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

