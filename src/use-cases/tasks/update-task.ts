import type {
  TaskType,
  UpdateTaskParams,
} from "../../models/tasks/create-task.model";
import type { UpdateTaskRepository } from "../../repositories/tasks/update-task";

export class UpdateTaskUseCase {
  private readonly updateTaskRepository;

  constructor(updateTaskRepository: UpdateTaskRepository) {
    this.updateTaskRepository = updateTaskRepository;
  }

  async execute(taskId: string, updateTaskParams: UpdateTaskParams) {
    const result: TaskType = await this.updateTaskRepository.execute(
      taskId,
      updateTaskParams,
    );

    return result;
  }
}
