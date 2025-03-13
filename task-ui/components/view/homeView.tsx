import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { TaskView } from "../task/TaskView";

export const HomeView = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Paper sx={{ p: 3, backgroundColor: "#ffffff", boxShadow: 3 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#2C3E50", mb: 3 }}
          >
            Gerenciamento de Tarefas
          </Typography>
          <TaskView />

          <Box sx={{ mt: 4, textAlign: "center" }}>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
