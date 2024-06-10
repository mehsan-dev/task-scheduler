import {
  PrismaClient,
  ScheduleTask as PrismaScheduleTask,
} from "@prisma/client";
import { IScheduleTaskRepository } from "./interfaces/ITaskScheduleRepository";
import { injectable } from "inversify";

@injectable()
export class ScheduleTaskRepository implements IScheduleTaskRepository {
  private _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async insertScheduleTask(
    data: PrismaScheduleTask
  ) {
    const response= await this._prisma.scheduleTask.create({ data: {
      taskId: data.taskId,
      startTime: data.startTime,
      endTime: data.endTime,
      // include other fields except id
    }, }).then((task) => {
        return task;
    }).catch((err) => {
        return err;
    });
    return response ;
  }

  async viewScheduleTasks(): Promise<PrismaScheduleTask[]> {
    return this._prisma.scheduleTask.findMany();
  }

  async getScheduleTaskById(
    taskId: string
  ){
    const schedualeList= this._prisma.scheduleTask.findMany({
      where: { taskId: taskId },
    }).then((task)=>{
      return task;
    }).catch((err)=>console.log(err));
    return schedualeList;
  }
}
