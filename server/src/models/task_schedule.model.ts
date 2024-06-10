export class ScheduleTask {
  constructor(
    public readonly taskId: number,
    public readonly startTime: Date,
    public readonly endTime: Date
  ) {}
}
