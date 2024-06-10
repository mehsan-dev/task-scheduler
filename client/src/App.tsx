import "./App.css";
import { Route, Routes } from "react-router-dom";
import TaskList from "./component/tasks/TaskList";
import ScheduleTasks from "./component/tasks/ViewTask";
import TaskForm from "./component/tasks/AddOrEditTask";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/addTask" element={<TaskForm />} />
        <Route path="/editTask/:id" element={<TaskForm />} />
        <Route path="/viewTask/:id/:task_name" element={<ScheduleTasks />} />
      </Routes>
    </>
  );
};

export default App;
