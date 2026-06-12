import type {
  BodyParams,
  TaskType,
  UpdateTaskParams,
} from "../../models/tasks/create-task.model";

import { faker } from "@faker-js/faker";

export const task: TaskType = {
  id: faker.string.uuid(),
  user_id: faker.string.uuid(),
  title: faker.lorem.words(1),
  description: faker.lorem.words(1),
  status: faker.lorem.words(1),
  time: faker.lorem.words(1),
};

export const taskExample: BodyParams = {
  user_id: faker.string.uuid(),
  title: faker.lorem.words(1),
  description: faker.lorem.words(1),
  status: faker.lorem.words(1),
  time: faker.lorem.words(1),
};

export const taskUpdated: UpdateTaskParams = {
  title: faker.lorem.words(1),
  description: faker.lorem.words(1),
  status: "is_pending",
  time: "morning",
};
