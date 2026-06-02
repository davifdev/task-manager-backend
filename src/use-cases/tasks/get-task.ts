import { TaskNotFound } from "../../helpers/errors";
import type { TaskType } from "../../models/tasks/create-task";
import type { GetTasksRepository } from "../../repositories/tasks/get-task";

export class GetTasksUseCase {
  private readonly getTasksRepository;

  constructor(getTasksRepository: GetTasksRepository) {
    this.getTasksRepository = getTasksRepository;
  }

  async execute(userId: string) {
    const result: TaskType[] = await this.getTasksRepository.execute(userId);

    if (!result) {
      throw new TaskNotFound();
    }

    const tasksMorning = result.filter(tasks => tasks.time === "morning");
    const tasksAfternoon = result.filter(tasks => tasks.time === "afternoon");
    const tasksEvening = result.filter(tasks => tasks.time === "evening");

    return {
      tasksMorning,
      tasksAfternoon,
      tasksEvening,
    };
  }
}
