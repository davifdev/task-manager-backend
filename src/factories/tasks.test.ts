import { CreateTaskController } from "../controllers/tasks/create-task";
import { DeleteTaskController } from "../controllers/tasks/delete-task";
import { DeleteTasksManyController } from "../controllers/tasks/delete-task-many";
import { GetTasksController } from "../controllers/tasks/get-task";
import { GetUniqueTaskController } from "../controllers/tasks/get-unique-task";
import { UpdateTaskController } from "../controllers/tasks/update-task";
import {
  createTaskFactory,
  deleteTaskFactory,
  deleteTasksManyFactory,
  getTasksFactory,
  getUniqueTaskFactory,
  updateTaskFactory,
} from "./tasks";

describe("TasksControllersFactories", () => {
  it("should return a valid GetTasksController instance", () => {
    expect(getTasksFactory()).toBeInstanceOf(GetTasksController);
  });

  it("should return a valid CreateTaskController instance", () => {
    expect(createTaskFactory()).toBeInstanceOf(CreateTaskController);
  });

  it("should return a valid UpdateTaskController instance", () => {
    expect(updateTaskFactory()).toBeInstanceOf(UpdateTaskController);
  });

  it("should return a valid DeleteTaskController instance", () => {
    expect(deleteTaskFactory()).toBeInstanceOf(DeleteTaskController);
  });

  it("should return a valid DeleteTasksManyController instance", () => {
    expect(deleteTasksManyFactory()).toBeInstanceOf(DeleteTasksManyController);
  });

  it("should return a valid GetUniqueTaskController instance", () => {
    expect(getUniqueTaskFactory()).toBeInstanceOf(GetUniqueTaskController);
  });
});
