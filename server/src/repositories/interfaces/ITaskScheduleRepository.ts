import { ScheduleTask } from "@prisma/client";

export interface IScheduleTaskRepository {
  insertScheduleTask(data: ScheduleTask): any;
  viewScheduleTasks(): Promise<ScheduleTask[]>;
  getScheduleTaskById(taskId: string | number):any;
}
