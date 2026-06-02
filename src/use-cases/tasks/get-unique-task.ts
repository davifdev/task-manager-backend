import { TaskNotFound } from "../../helpers/errors";
import type { TaskType } from "../../models/tasks/create-task";
import type { GetUniqueTaskRepository } from "../../repositories/tasks/get-unique-task";

export class GetUniqueTaskUseCase {
  private readonly getUniqueTaskRepository;

  constructor(getUniqueTaskRepository: GetUniqueTaskRepository) {
    this.getUniqueTaskRepository = getUniqueTaskRepository;
  }

  async execute(taskId: string) {
    const result: TaskType[] =
      await this.getUniqueTaskRepository.execute(taskId);

    if (!result) {
      throw new TaskNotFound();
    }

    return result;
  }
}
