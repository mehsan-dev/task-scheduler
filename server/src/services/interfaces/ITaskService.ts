import { Task } from "../../models/task.model";
import {
  ScheduleTask as PrismaScheduleTask,
  ScheduleTask,
} from "@prisma/client";

export interface ITaskService {
  createTask(input: any): Promise<Task>;
  updateTask(input: any): Promise<Task>;
  getTasks(): Promise<Task[]>;
  getTask(id: any): Promise<Task>;
  deleteTask(id: any): Promise<any>;
  createScheduleTask(input: PrismaScheduleTask): Promise<PrismaScheduleTask>;
  viewScheduleTasks(): Promise<PrismaScheduleTask[]>;
  getScheduleTaskById(taskId: string | number): Promise<PrismaScheduleTask | null>;
  executeScheduleTask(
    id: string,
    taskName: string,
    minute: number,
    type: string,
    req:any
  ): any;
}
