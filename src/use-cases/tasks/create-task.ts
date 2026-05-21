import type {
  CreateTaskRepository,
  TaskType,
} from "../../repositories/tasks/create-task";

type BodyParams = {
  title: string;
  time: string;
  description: string;
  status: string;
};

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
