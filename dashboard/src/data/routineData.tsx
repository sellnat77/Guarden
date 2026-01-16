enum RoutineEnum {
  WATER = "water",
  FERTILIZE = "fertilize",
  PRUNE = "prune",
  REPOT = "repot",
}

enum RoutinePriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
export interface Routine {
  id: string;
  plantId: string;
  type: RoutineEnum;
  dueDate: string;
  priority: RoutinePriority;
  completed: boolean;
}
export const upcomingRoutines: Array<Routine> = [
  {
    id: "0",
    plantId: "2",
    type: RoutineEnum.WATER,
    dueDate: "2023-10-27",
    priority: RoutinePriority.HIGH,
    completed: false,
  },
  {
    id: "1",
    plantId: "2",
    type: RoutineEnum.PRUNE,
    dueDate: "2023-10-27",
    priority: RoutinePriority.HIGH,
    completed: true,
  },
  {
    id: "2",
    plantId: "5",
    type: RoutineEnum.WATER,
    dueDate: "2023-10-28",
    priority: RoutinePriority.MEDIUM,
    completed: false,
  },
  {
    id: "3",
    plantId: "6",
    type: RoutineEnum.FERTILIZE,
    dueDate: "2023-10-29",
    priority: RoutinePriority.LOW,
    completed: false,
  },
];
