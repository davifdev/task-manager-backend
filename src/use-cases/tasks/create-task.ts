import type { GenerateIdAdapter } from "../../adapters/generate-id";
import type { BodyParams, TaskType } from "../../models/tasks/create-task";
import type { CreateTaskRepository } from "../../repositories/tasks/create-task";
export class CreateTaskUseCase {
  private readonly createTaskRepository;
  private readonly generateIdAdapter;

  constructor(
    createTaskRepository: CreateTaskRepository,
    generateIdAdapter: GenerateIdAdapter,
  ) {
    this.createTaskRepository = createTaskRepository;
    this.generateIdAdapter = generateIdAdapter;
  }

  async execute(createTaskParams: BodyParams) {
    const id = this.generateIdAdapter.execute();

    const result: TaskType = await this.createTaskRepository.execute({
      ...createTaskParams,
      id,
    });

    return result;
  }
}
