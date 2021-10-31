import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Reminder } from "../../_interfaces/reminder.interface";

import "./add-reminder-component.scss";
import thrashIcon from "../../assets/delete.svg";

interface ComponentProps {
  reminderToEdit?: Reminder;
  type: string;
  showModal: boolean;
  day: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddReminder(props: ComponentProps) {
  const currentDate = useSelector((state: RootState) => state.data);
  const [name, setName] = React.useState<string>(
    props.reminderToEdit?.name ? props.reminderToEdit?.name : ""
  );
  const [color, setColor] = React.useState<string>(
    props.reminderToEdit?.color ? props.reminderToEdit?.color : ""
  );
  var id = props.reminderToEdit?.id ? props.reminderToEdit?.id : idGenerate(); //Generate id for localStorage key
  const [time, setTime] = React.useState<Date>(
    props.reminderToEdit?.time
      ? props.reminderToEdit?.time
      : new Date("2021-01-01T00:00:00")
  );

  function timeChange(newValue: Date) {
    console.log(color);
    setTime(newValue);
  }

  function newReminder() {
    let date = new Date(currentDate.year, currentDate.month, props.day);
    let reminder: Reminder = {
      id: id,
      date: date.toString(),
      name: name,
      time: time,
      color: color,
    };
    props.setShowModal((prev: boolean) => !prev);
    localStorage.setItem(id, JSON.stringify(reminder));
  }

  function removeReminder() {
    localStorage.removeItem(
      props?.reminderToEdit?.id ? props?.reminderToEdit?.id : ""
    );
    props.setShowModal((prev: boolean) => !prev);
  }

  function idGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  return (
    <>
      <div className="content-add-reminder" >
      <div className="backgroud-dialog" onClick={()=> props.setShowModal((prev: boolean) => !prev)}></div>
        <div className="dialog">
          <div className="dialog-title">
            {props.type === "edit" && <span>Edit Reminder</span>}
            {props.type === "new" && <span>New Reminder</span>}
            <label className="remove">
            <span onClick={()=> props.setShowModal((prev: boolean) => !prev)}>x</span>
              {props.type === "edit" && (
                <img
                  src={thrashIcon}
                  alt="Remove"
                  onClick={() => removeReminder()}
                />
              )}
            </label>
          </div>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="timeAndColor">
            <div className="time">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Time"
                  value={time}
                  onChange={(e) =>
                    timeChange(e ? e : new Date("2021-01-01T00:00:00"))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="color">
              <input
                type="color"
                onChange={(e) => setColor(e.target.value)}
              ></input>
            </div>
          </div>
          <button className="buttonAdd" onClick={() => newReminder()}>
            {props.type ==="new" ? "Add new reminder":"Edit reminder"}
          </button>
        </div>
      </div>
    </>
  );
}
