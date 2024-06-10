import { Task } from "../../models/task.model";

export interface ITaskRepository {
  create(data: Task): Promise<Task>;
  update(data: Task): Promise<Task>;
  delete(id: number): any;
  find(): Promise<Task[]>;
  findOne(id: number):any;
}
