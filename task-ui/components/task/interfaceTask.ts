export interface Task {
  id: string;
  title: string;
  sla: number;
  file: string;
  dueDate: string | null;
  notificationSent?: boolean;
}

export interface RegisterTask {
  title: string;
  sla: number;
  file: string;
}
