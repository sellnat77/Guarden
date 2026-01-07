export interface Task {
  id: string;
  plantId: string;
  type: "water" | "fertilize" | "prune" | "repot";
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}
export const upcomingTasks: Task[] = [
  {
    id: "1",
    plantId: "2",
    type: "water",
    dueDate: "2023-10-27",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    plantId: "5",
    type: "water",
    dueDate: "2023-10-28",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    plantId: "6",
    type: "fertilize",
    dueDate: "2023-10-29",
    priority: "low",
    completed: false,
  },
  {
    id: "4",
    plantId: "4",
    type: "prune",
    dueDate: "2023-11-01",
    priority: "medium",
    completed: false,
  },
];
