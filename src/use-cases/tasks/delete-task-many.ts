import type { DeleteTasksManyRepository } from "../../repositories/tasks/delete-task-many";

export class DeleteTasksManyUseCase {
  private readonly deleteTasksManyRepository;

  constructor(deleteTasksManyRepository: DeleteTasksManyRepository) {
    this.deleteTasksManyRepository = deleteTasksManyRepository;
  }

  async execute() {
    const result = await this.deleteTasksManyRepository.execute();

    return result;
  }
}
