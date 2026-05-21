import type { BodyParams, TaskType } from "../../models/tasks/create-task";
import type { CreateTaskRepository } from "../../repositories/tasks/create-task";
export class CreateTaskUseCase {
  private readonly createTaskRepository;

  constructor(createTaskRepository: CreateTaskRepository) {
    this.createTaskRepository = createTaskRepository;
  }

  async execute(createTaskParams: BodyParams) {
    const id = crypto.randomUUID();

    const result: TaskType = await this.createTaskRepository.execute({
      ...createTaskParams,
      id,
    });

    return result;
  }
}
