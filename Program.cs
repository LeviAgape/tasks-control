using Microsoft.EntityFrameworkCore;
using TaskControl.Data;
using TaskControl.Routes;
using TaskRoutes.Services;
using TaskControl.Exceptions;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var connectionString = Env.GetString("DATABASE_URL");
var frontendUrl = Env.GetString("FRONTEND_URL", "http://localhost:5173"); 

builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;

builder.Services.AddDbContext<TaskContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<TaskService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(frontendUrl) 
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseCustomExceptionMiddleware();

app.TaskRoutes();

app.UseHttpsRedirection();

app.Run();
