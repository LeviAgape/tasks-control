using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;


namespace TaskControl.Models
{
    [Table("tasks")] 
    public class TaskModel
    {   
             public TaskModel() { }

             public TaskModel(string title, int sla, string file)
        {
            Id = Guid.NewGuid();
            Title = title;
            SLA = sla;
            File = file;
            CreatedAt = DateTime.UtcNow; 
        }

        public Guid Id { get; init; }
        public string Title { get; set; } = string.Empty;
        public int SLA { get; set; } 
        public string File { get; set; } = string.Empty; 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            
        public void UpdateTask ( string title, int sla, string file)
        {
            Title = title;
            SLA = sla;
            File = file;
        }
    }

   
}