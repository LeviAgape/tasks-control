import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  Paper,
  TableContainer,
} from "@mui/material";
import { Task } from "../task/interfaceTask";
import { TaskRegisterView } from "../task/taskRegister";

const API_URL = import.meta.env.VITE_API_URL;

export const TaskView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    checkTaskDeadlines();
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(`${API_URL}/task`);
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const calculateDueDate = (sla: number) => {
    const dueDate = new Date();
    dueDate.setHours(dueDate.getHours() + sla);
    return dueDate;
  };

  const checkTaskDeadlines = () => {
    const overdueTask = tasks.find(
      (task) => new Date() > calculateDueDate(task.sla)
    );
    if (overdueTask) {
      setNotificationMessage(`O SLA da tarefa "${overdueTask.title}" venceu.`);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", color: "#2C3E50" }}
      >
        Lista de Tarefas
      </Typography>

      <Paper
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: 3,
          mt: 3,
        }}
      >
        <TableContainer sx={{ maxHeight: 300 }}>
          {" "}
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2980B9",
                    color: "#fff",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2980B9",
                    color: "#fff",
                  }}
                >
                  Título
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2980B9",
                    color: "#fff",
                  }}
                >
                  SLA
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2980B9",
                    color: "#fff",
                  }}
                >
                  Arquivo
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2980B9",
                    color: "#fff",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => {
                const dueDate = calculateDueDate(task.sla);
                const isExceeded = new Date() > dueDate;

                return (
                  <TableRow key={task.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.sla}</TableCell>
                    <TableCell>{task.file}</TableCell>
                    <TableCell>
                      {isExceeded ? (
                        <Typography
                          sx={{ color: "#e74c3c", fontWeight: "bold" }}
                        >
                          SLA Vencido
                        </Typography>
                      ) : (
                        <Typography
                          sx={{ color: "#2ecc71", fontWeight: "bold" }}
                        >
                          Em Andamento
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <TaskRegisterView onTaskAdded={fetchTasks} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          onClose={() => setOpenSnackbar(false)}
          sx={{
            width: "100%",
            fontSize: "1.2rem",
            fontWeight: "bold",
            padding: "16px",
            backgroundColor: "#e74c3c",
            color: "#fff",
          }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
