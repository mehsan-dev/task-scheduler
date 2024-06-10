import { ITaskService } from "./interfaces/ITaskService";
import { injectable, inject } from "inversify";
import { ITaskRepository } from "../repositories/interfaces/ITaskRepository";
import { IScheduleTaskRepository } from "../repositories/interfaces/ITaskScheduleRepository";
import { ScheduleTask as PrismaScheduleTask } from "@prisma/client";
import { INTERFACE_TYPE } from "../utils/appConstant";
import cron from "node-cron";

@injectable()
export class TaskService implements ITaskService {
  public taskCronJobs = new Map();
  private _taskRepository: ITaskRepository;
  private _scheduleTaskRepository: IScheduleTaskRepository;

  constructor(
    @inject(INTERFACE_TYPE.TaskRepository) taskRepository: ITaskRepository,
    @inject(INTERFACE_TYPE.ScheduleTaskRepository)
    scheduleTaskRepository: IScheduleTaskRepository
  ) {
    this._taskRepository = taskRepository;
    this._scheduleTaskRepository = scheduleTaskRepository;
  }

  async createTask(input: any) {
    const data = await this._taskRepository.create(input);
    return data;
  }

  async updateTask(input: any) {
    const data = await this._taskRepository.update(input);
    return data;
  }

  async getTasks() {
    const tasks = await this._taskRepository.find();
    return tasks;
  }

  async getTask(id: any) {
    const task = this._taskRepository.findOne(parseInt(id));
    return task;
  }

  async createScheduleTask(input: PrismaScheduleTask) {
    const data = await this._scheduleTaskRepository.insertScheduleTask(input);
    return data;
  }

  async viewScheduleTasks() {
    const scheduleTasks =
      await this._scheduleTaskRepository.viewScheduleTasks();
    return scheduleTasks;
  }

  async getScheduleTaskById(taskId: string) {
    const scheduleTask = await this._scheduleTaskRepository.getScheduleTaskById(
      taskId
    );
    return scheduleTask;
  }

  async executeScheduleTask(
    id: string,
    taskName: string,
    minute: number,
    type: string,
    req: any
  ) {
    const taskId = String(id);
    const currentTime = new Date().toLocaleTimeString([], { hour12: false });
    console.log(taskId, taskName, minute, type);
    let currentTime2;
    try {
      if (type === "dynamic") {
        const job = cron.schedule(`*/${minute} * * * * *`, async () => {
          currentTime2 = new Date().toLocaleTimeString([], {
            hour12: false,
          });
          const message = `'This task ${taskName} runs every ${minute} seconds start-Time :${currentTime} end-time :${currentTime2}`;
          console.log(message);
          req.io.emit("FromAPI", { message: message });

          await this._scheduleTaskRepository
            .insertScheduleTask({
              taskId: taskId,
              startTime: currentTime,
              endTime: currentTime2 || "",
              id: 0,
            })
            .then((res: any) => {
              return res;
            })
            .catch((err: any) => {
              return err;
            });
        });
        this.taskCronJobs.set(taskId, job);
      } else if (type === "static") {
        let hasRun = false;
        const job = cron.schedule(`*/${minute} * * * * *`, async () => {
          if (!hasRun) {
            currentTime2 = new Date().toLocaleTimeString([], {
              hour12: false,
            });
            const message = `'This task ${taskName} runs only ${minute} seconds start-Time :${currentTime} end-time :${currentTime2}`;
            console.log(message);
            hasRun = true;

            req.io.emit("FromAPI", { message: message });
            const response = await this._scheduleTaskRepository
              .insertScheduleTask({
                taskId: taskId,
                startTime: currentTime,
                endTime: currentTime2 || "",
                id: 0,
              })
              .then((res: any) => {
                return res;
              })
              .catch((err: any) => {
                return err;
              });
            return response;
          }
        });
        this.taskCronJobs.set(taskId, job);
      } else {
        throw new Error("Invalid task type");
      }
    } catch (err) {
      console.error("Error scheduling task:", err);
      throw new Error("Error scheduling task");
    }
  }

  async deleteTask(id: any) {
    const cronJob = this.taskCronJobs.get(id);
    if (cronJob) {
      cronJob.stop();
      this.taskCronJobs.delete(id);
      const result = await this._taskRepository.delete(parseInt(id));
      return result;
    } else {
      throw new Error("Task not Schedule");
    }
  }
}
