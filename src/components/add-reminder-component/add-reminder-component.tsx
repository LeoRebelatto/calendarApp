import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Reminder } from "../../_interfaces/reminder.interface";
import "./add-reminder-component.scss";

interface ComponentProps {
  showModal: boolean;
  day: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddReminder(props: ComponentProps) {
  const currentDate = useSelector((state: RootState) => state.data);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  var id = idGenerate(); //Generate id for localStorage key
  const [time, setTime] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const timeChange = (newValue: Date | null) => {
    console.log(color);
    setTime(newValue);
  };

  function newReminder() {
    let date = new Date(currentDate.year, currentDate.month, props.day);
    let reminder: Reminder = {
      id: id,
      date: date.toString(),
      name: name,
      time: `${time?.getHours()}:${time?.getMinutes()}`,
      description: description,
      color: color,
    };
    props.setShowModal((prev: boolean) => !prev);
    localStorage.setItem(id, JSON.stringify(reminder));
  }

  function idGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  return (
    <>
      <div className="content-add-reminder">
        <div className="dialog">
          <div className="dialog-title">
            <span>New Reminder day</span>
          </div>
          <TextField 
          id="standard-basic" 
          label="Name" 
          variant="standard" 
          value={name}
          onChange={e=>setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="timeAndColor">
            <div className="time">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Time"
                  value={time}
                  onChange={timeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="color">
              <input type="color" onChange={(e) => setColor(e.target.value)}></input>
            </div>
          </div>
          <button className="buttonAdd" onClick={() => newReminder()}>
            Add new reminder
          </button>
        </div>
      </div>
    </>
  );
}
