import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import axiosInstance from "../../utility/axiosInstance";
import { endPoints } from "../../utility/constants/constants";
import { useEffect, useState } from "react";
import { TaskListProps } from "../../interfaces/task";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const TaskList = () => {
  const ENDPOINT = "http://127.0.0.1:3000";
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskListProps[]>([]);
  const [isStart, setIsStart] = useState<boolean>(true);
  useEffect(() => {
    getData();
    const socket = io(ENDPOINT, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("FromAPI", (data) => {
      console.log("Socket Data");
      console.log(data, "Socket Data");
    });
  }, []);

  const getData = async () => {
    try {
      const result = await axiosInstance(endPoints?.getTasks);
      if (result?.data) {
        setTasks(result?.data);
      } else {
        toast.info("Data Not Found");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleTaskAction = async (
    action: string,
    singleTasks: TaskListProps
  ) => {
    switch (action) {
      case "delete":
        try {
          const result = await axiosInstance.delete(
            `${endPoints.deleteTask}/${singleTasks?.id}`
          );
          if (result?.status === 200) {
            getData();
            toast.success("Successfully Deleteed task");
          }
        } catch (err) {
          toast.error(`${err?.response?.data?.message}`);
        }
        break;
      case "edit":
        navigate(`/editTask/${singleTasks?.id}`);
        break;
      case "execute":
        try {
          setIsStart((prev) => !prev);
          toast.success("Task running in background");
          console.log(singleTasks, "singleTasks");
          await axiosInstance.post(endPoints.executeTask, singleTasks);
          // if(result?.data){
          //     toast.success(result?.data?.message);
          //     setMessage([...message,result?.data?.message])
          // }
        } catch (err: unknown) {
          toast.error(err.message);
        }
        break;
      case "view":
        navigate(`/viewTask/${singleTasks?.id}/${singleTasks?.taskName}`);
        break;
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2, float: "left" }}
        onClick={() => navigate("/addTask")}
      >
        Add New Task
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Task Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Time </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((tasks) => (
              <StyledTableRow key={tasks?.task_name}>
                <StyledTableCell component="th" scope="row">
                  {tasks?.taskName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {tasks?.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {tasks?.type === "dynamic" ? "recurring" : "One-Time"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {tasks?.minute ? tasks?.minute + "s" : "10s"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleTaskAction("execute", tasks)}
                    >
                      Execute
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleTaskAction("view", tasks)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleTaskAction("edit", tasks)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleTaskAction("delete", tasks)}
                    >
                      Delete
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
