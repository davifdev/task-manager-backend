import type { DeleteTaskRepository } from "../../repositories/tasks/delete-task";

export class DeleteTaskUseCase {
  private readonly deleteTaskRepository;

  constructor(deleteTaskRepository: DeleteTaskRepository) {
    this.deleteTaskRepository = deleteTaskRepository;
  }

  async execute(taskId: string) {
    const deletedTask = await this.deleteTaskRepository.execute(taskId);

    return deletedTask;
  }
}
