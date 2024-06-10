import "reflect-metadata";
import { Container } from "inversify";
import { INTERFACE_TYPE } from "./utils/appConstant";
import { ITaskService } from "./services/interfaces/ITaskService";
import { TaskService } from "./services/task.service";
import { ITaskRepository } from "./repositories/interfaces/ITaskRepository";
import { TaskRepository } from "./repositories/task.repository";
import { IScheduleTaskRepository } from "./repositories/interfaces/ITaskScheduleRepository";
import { ScheduleTaskRepository } from "./repositories/task_schedule.repository";

const container = new Container();

container.bind<ITaskService>(INTERFACE_TYPE.TaskService).to(TaskService);
container
  .bind<ITaskRepository>(INTERFACE_TYPE.TaskRepository)
  .to(TaskRepository);
container
  .bind<IScheduleTaskRepository>(INTERFACE_TYPE.ScheduleTaskRepository)
  .to(ScheduleTaskRepository);

export default container;
