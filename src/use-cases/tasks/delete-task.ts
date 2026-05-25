export class DeleteTaskUseCase {
  private readonly deleteTaskRepository;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(deleteTaskRepository: any) {
    this.deleteTaskRepository = deleteTaskRepository;
  }

  async execute(taskId: string) {
    const deletedTask = await this.deleteTaskRepository(taskId);

    return deletedTask;
  }
}
