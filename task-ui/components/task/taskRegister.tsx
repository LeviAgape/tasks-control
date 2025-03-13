import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { RegisterTask } from "../task/interfaceTask";

const API_URL = import.meta.env.VITE_API_URL;

interface TaskRegisterViewProps {
  onTaskAdded: () => void; 
}

export const TaskRegisterView: React.FC<TaskRegisterViewProps> = ({
  onTaskAdded,
}) => {
  const [task, setTask] = useState<RegisterTask>({
    title: "",
    sla: 0,
    file: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { title: task.title, sla: task.sla, file: task.file };
      await axios.post(`${API_URL}/task`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSnackbarMessage("Tarefa registrada com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTask({ title: "", sla: 0, file: "" });
      onTaskAdded(); 
    } catch (error) {
      console.error("Erro ao registrar tarefa:", error);
      setSnackbarMessage("Falha ao registrar tarefa.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", color: "#2C3E50" }}
      >
        Cadastrar Nova Tarefa
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="title"
          value={task.title}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="SLA"
          name="sla"
          type="number"
          value={task.sla}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Caminho do Arquivo"
          name="file"
          value={task.file}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Registrar Tarefa"}
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            fontSize: "1.2rem", 
            fontWeight: "bold", 
            padding: "16px", 
            backgroundColor:
              snackbarSeverity === "success" ? "#2ecc71" : undefined, 
            color: "#fff", 
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
