using Microsoft.EntityFrameworkCore;
using TaskControl.Data;
using TaskControl.Routes;
using TaskRoutes.Services; 
using TaskControl.Exceptions; 
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var connectionString = Env.GetString("DATABASE_URL");

builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;

builder.Services.AddDbContext<TaskContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<TaskService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCustomExceptionMiddleware();

app.TaskRoutes();

app.UseHttpsRedirection();

app.Run();
