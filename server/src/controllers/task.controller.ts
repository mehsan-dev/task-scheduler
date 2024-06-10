import { NextFunction, Request, Response } from "express";
import { ITaskService } from "../services/interfaces/ITaskService";
import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConstant";

@injectable()
export class TaskController {
  private taskService: ITaskService;

  constructor(@inject(INTERFACE_TYPE.TaskService) taskService: ITaskService) {
    this.taskService = taskService;
  }

  async addTaskScheduler(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.taskService.createTask(req.body);
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async updateTaskScheduler(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.taskService.updateTask(req.body);
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getTasksScheduler(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.taskService.getTasks();
      res.send(result);
    } catch (err) {
      console.log(err,"Err")
      res.status(500).send(err);
    }
  }

  async getTasksSchedulerAgainstId(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req?.params?.id,"req?.params?.idreq?.params?.id")
      const result = await this.taskService.getTask(req?.params?.id);
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async deleteTaskScheduler(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;
      const result = await this.taskService.deleteTask(taskId);
      console.log(result)
      res.status(200).send(result);
    } catch (err:any) {
      res.status(500).json({ message: err?.message });
    }
  }

  async executeTaskScheduler(req: any, res: Response, next: NextFunction) {
    let { id, taskName, minute, type } = req.body;
    if(minute===0){
      minute=10
    }
    try {
      const result = await this.taskService.executeScheduleTask(
        id,
        taskName,
        minute,
        type,
        req
      );
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async viewTaskScheduler(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const result = await this.taskService.getScheduleTaskById(id);
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
