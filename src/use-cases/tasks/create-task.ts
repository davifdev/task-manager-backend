import { CreateTaskRepository } from "../../repositories/tasks/create-task";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "is_pending" | "is_progress" | "is_completed";
  time: "morning" | "afternoon" | "evening";
}

export class CreateTaskUseCase {
  async execute(createTaskParams: Task) {
    const createTaskRepository = new CreateTaskRepository();

    const result = await createTaskRepository.execute(createTaskParams);

    return result;
  }
}
