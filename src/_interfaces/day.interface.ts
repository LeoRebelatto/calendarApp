import { Reminder } from "./reminder.interface";

export interface Day {
    id: number;
    reminders: Reminder[];
  }