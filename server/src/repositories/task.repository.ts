import { PrismaClient } from "@prisma/client";
import { Task } from "../models/task.model";
import { ITaskRepository } from "./interfaces/ITaskRepository";
import { injectable } from "inversify";

@injectable()
export class TaskRepository implements ITaskRepository {
  private _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Task): Promise<Task> {
    return this._prisma.task.create({ data });
  }

  async update(data: Task): Promise<Task> {
    return this._prisma.task.update({ where: { id: data.id }, data });
  }

  async delete(id: any) {
    const deleteTask= this._prisma.task.delete({ where: { id: id } }).then(task => {
      return task;
    });
  }

  async find(): Promise<Task[]> {
    return this._prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task>{
     const task=await this._prisma.task.findFirst({ where: { id: id } }).then(task => {
      return task;
    })
    if (task) {
       return task;
    }
    throw new Error("Task not found");
  }
}
