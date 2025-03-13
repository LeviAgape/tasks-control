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
} from "@mui/material";
import { Task } from "../task/interfaceTask";
import { TaskRegisterView } from "../task/taskRegister";


const API_URL = import.meta.env.VITE_API_URL;

export const TaskView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    axios
      .get<Task[]>(`${API_URL}/task`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const calculateDueDate = (sla: number) => {
    const dueDate = new Date();
    dueDate.setHours(dueDate.getHours() + sla);
    return dueDate;
  };

  const isSlaExceeded = (dueDate: Date) => {
    const now = new Date();
    return now > dueDate;
  };

  const showSlaNotification = (title: string) => {
    setNotificationMessage(`O SLA da tarefa "${title}" Venceu.`);
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center", color: "#2C3E50" }}>
        Lista de Tarefas
      </Typography>
      <Paper sx={{ overflow: "hidden", backgroundColor: "#ffffff", boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2980B9", color: "#fff" }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2980B9", color: "#fff" }}>
                Título
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2980B9", color: "#fff" }}>
                SLA
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2980B9", color: "#fff" }}>
                Arquivo
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2980B9", color: "#fff" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => {
              const dueDate = calculateDueDate(task.sla);
              const isExceeded = isSlaExceeded(dueDate);

              if (isExceeded && !task.notificationSent) {
                showSlaNotification(task.title);
                task.notificationSent = true;
              }

              return (
                <TableRow key={task.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.sla}</TableCell>
                  <TableCell>{task.file}</TableCell>
                  <TableCell>
                    {isExceeded ? (
                      <Typography sx={{ color: "#e74c3c", fontWeight: "bold" }}>SLA Vencido</Typography>
                    ) : (
                      <Typography sx={{ color: "#2ecc71", fontWeight: "bold" }}>Em Andamento</Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          {notificationMessage}
        </Alert>
      </Snackbar>
                  <TaskRegisterView />
      
    </Box>
  );
};
