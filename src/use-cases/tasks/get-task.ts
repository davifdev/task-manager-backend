import type { TaskType } from "../../models/tasks/create-task";
import type { GetTasksRepository } from "../../repositories/tasks/get-task";

export class GetTasksUseCase {
  private readonly getTasksRepository;

  constructor(getTasksRepository: GetTasksRepository) {
    this.getTasksRepository = getTasksRepository;
  }

  async execute() {
    const result: TaskType[] = await this.getTasksRepository.execute();

    return result;
  }
}
