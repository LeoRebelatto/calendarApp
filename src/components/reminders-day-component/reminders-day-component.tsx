import React from "react";
import { Reminder } from "../../_interfaces/reminder.interface";
import "./reminders-day-component.scss";

interface ComponentProps {
  allReminders: Reminder[];
  day: number;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setReminderToEdit: React.Dispatch<React.SetStateAction<Reminder>>;
  setEditDialog: React.Dispatch<React.SetStateAction<string>>;
}

export function RemindersDay(props: ComponentProps) {
  console.log(props.day);
  function openEditReminder(reminder: Reminder) {
    props.setEditDialog('edit');
    props.setReminderToEdit(reminder);
    props.setShowDialog((prev: boolean) => !prev);
    
  }

  return (
    <div className="content-all-reminders">
      <div className="title">All Reminders day {props.day}</div>
      {props.allReminders.map((res, i) => {
        return (
          <div
            className="reminder"
            key={i}
            style={{ backgroundColor: res.color }}
            onClick={() => openEditReminder(res)}
          >
            {`${new Date(res.time).getHours()}:${
              new Date(res.time).getMinutes() < 10 ? "0" : ""
            }${new Date(res.time).getMinutes()} `}{" "}
            -{` ${res.name}`}
          </div>
        );
      })}
    </div>
  );
}
