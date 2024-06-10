export interface TaskDetail{
    name: string;
    description: string;
    minute:string
}

export interface ObjectType{
    id?:number,
    taskName: string;
    description: string;
    type?:string;
    minute?:string | null | number;
}

export interface TaskListProps {
    description: string;
    minute: number | null;
    id: number;
    taskName: string;
    type: string;
  }


export interface SchedualeTaskListProps {
    startTime: string;
    endTime: number | null;
    taskId: number | string;
  }