using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TaskControl.Data;
using TaskControl.Models;
using TaskRoutes.Services; 

namespace TaskControl.Routes
{
    public static class TaskRoute
    {
        public static void TaskRoutes(this WebApplication app)
        {
            var route = app.MapGroup("task");

            route.MapPost("", 
            async (TaskRequest req, TaskService service) =>
            {
                var task = await service.CreateTaskAsync(req.Title, req.SLA, req.File);
                return Results.Created($"/task/{task.Id}", task);
            });

            route.MapGet("", 
            async (TaskService service) =>
            {
                var tasks = await service.GetAllTasksAsync();
                return Results.Ok(tasks);
            });

            route.MapGet("{id:guid}", 
            async (Guid id, TaskService service) =>
            {
                var task = await service.GetTaskByIdAsync(id);
                return task == null ? Results.NotFound("Task not found.") : Results.Ok(task);
            });

            route.MapPut("{id:guid}", 
            async (Guid id, TaskRequest req, TaskService service) =>
            {
                var updatedTask = await service.UpdateTaskAsync(id, req.Title, req.SLA, req.File);

                return updatedTask == null 
                    ? Results.NotFound("Task not found.") 
                    : Results.Ok(updatedTask);
            });

            route.MapDelete("{id:guid}",
            async (Guid id, TaskService service) =>
            {
                var deleted = await service.DeleteTaskAsync(id);
                return deleted ? Results.NoContent() : Results.NotFound("Task not found.");
            });
        }
    }
}
