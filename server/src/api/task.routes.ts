import express from "express";
import { INTERFACE_TYPE } from "../utils/appConstant";
import { TaskController } from "../controllers/task.controller";
import { ITaskService } from "../services/interfaces/ITaskService";
import container from "../depInjContainer";

const router = express.Router();

export const taskService = container.get<ITaskService>(
  INTERFACE_TYPE.TaskService
);

const taskController = new TaskController(taskService);

// Routes
router.post("/addTask", taskController.addTaskScheduler.bind(taskController));

router.put(
  "/updateTask",
  taskController.updateTaskScheduler.bind(taskController)
);

router.get(
  "/getTask/",
  taskController.getTasksScheduler.bind(taskController)
);
router.get(
  "/getTask/:id",
  taskController.getTasksSchedulerAgainstId.bind(taskController)
);
router.get(
  "/viewSchedualeTask/:id",
  taskController.viewTaskScheduler.bind(taskController)
);

router.delete(
  "/deleteTask/:id",
  taskController.deleteTaskScheduler.bind(taskController)
);

router.post(
  "/executeTask",
  taskController.executeTaskScheduler.bind(taskController)
);

export default router;
