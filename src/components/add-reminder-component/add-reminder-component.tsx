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
  reminderToEdit?: Reminder,
  type: string,
  showDialog: boolean,
  day: number,
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddReminder(props: ComponentProps) {
  const currentDate = useSelector((state: RootState) => state.data);
  const [name, setName] = React.useState<string>(
    props.reminderToEdit?.name ? props.reminderToEdit?.name : ""
  );
  const [messageError, setMessageError] = React.useState<string>("");
  const [color, setColor] = React.useState<string>(
    props.reminderToEdit?.color ? props.reminderToEdit?.color : "#1F2833"
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
    if(name.length>0){
      let date = new Date(currentDate.year, currentDate.month, props.day);
    let reminder: Reminder = {
      id: id,
      date: date.toString(),
      name: name,
      time: time,
      color: color,
    };
    props.setShowDialog((prev: boolean) => !prev);
    localStorage.setItem(id, JSON.stringify(reminder));
    }else{
      setMessageError('The reminder has to have a name!')
    }
  }

  function removeReminder() {
    localStorage.removeItem(
      props?.reminderToEdit?.id ? props?.reminderToEdit?.id : ""
    );
    props.setShowDialog((prev: boolean) => !prev);
  }

  function idGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  return (
    <>
      <div className="content-add-reminder" >
      <div className="backgroud-dialog" onClick={()=> props.setShowDialog((prev: boolean) => !prev)}></div>
        <div className="dialog">
          <div className="dialog-title">
            {props.type === "edit" && <span>Edit Reminder</span>}
            {props.type === "new" && <span>New Reminder</span>}
            <label className="remove">
            <span onClick={()=> props.setShowDialog((prev: boolean) => !prev)}>x</span>
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
            error={messageError.length===0 ? false: true}
            id="standard-basic"
            label="Name"
            variant="standard"
            value={name}
            inputProps={{ maxLength : 30 }}
            helperText={messageError}
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
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></input>
            </div>
          </div>
          <button className="buttonAdd" data-testid="buttonAdd" onClick={() => newReminder()}>
            {props.type ==="new" ? "Add new reminder":"Edit reminder"}
          </button>
        </div>
      </div>
    </>
  );
}
