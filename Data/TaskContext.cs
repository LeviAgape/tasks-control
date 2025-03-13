using Microsoft.EntityFrameworkCore;
using TaskControl.Models;
using DotNetEnv;

namespace TaskControl.Data
{
    public class TaskContext : DbContext
    {
        public DbSet<TaskModel> Tasks { get; set; }

        public TaskContext(DbContextOptions<TaskContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                Env.Load();
                string connectionString = Env.GetString("DB_CONNECTION");
                optionsBuilder.UseNpgsql(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskModel>().ToTable("tasks");
        }
    }
}
