import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { RegisterTask } from "../task/interfaceTask";

const API_URL = import.meta.env.VITE_API_URL;

export const TaskRegisterView = () => {
  const [task, setTask] = useState<RegisterTask>({
    title: "",
    sla: 0,
    file: "", 
    dueDate: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dueDate = new Date();
    dueDate.setHours(dueDate.getHours() + task.sla);

    try {
      const formData = new FormData();
      formData.append("title", task.title);
      formData.append("sla", task.sla.toString());
      formData.append("dueDate", dueDate.toISOString());
      formData.append("file", task.file); 

      await axios.post(`${API_URL}/task`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Task registered successfully!");
      setTask({ title: "", sla: 0, file: "", dueDate: null });
    } catch (error) {
      console.error("Error registering task:", error);
      alert("Failed to register task.");
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
    </Box>
  );
};
