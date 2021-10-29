import React, { useState } from "react";
import { Reminder } from "../../_interfaces/reminder.interface";
import "./add-reminder-component.scss";

interface ComponentProps{
  showModal: boolean,
  setShowModal:React.Dispatch<React.SetStateAction<boolean>>,
  setNewReminderData: React.Dispatch<React.SetStateAction<Reminder>>
}

export default function AddReminder(props: ComponentProps) {


  function newReminder(){
    props.setShowModal((prev: boolean) => !prev);
    props.setNewReminderData({name:'Churrasco', time: '15:00', description: 'Churrasco casa do Celso', color:'#fefefe'})
  }


  return (
    <>
      <div className="content-add-reminder">
        <div className="dialog">
          <div className="dialog-title">
            <span>New Reminder day</span>
          </div>
          <span className="input-title">Reminder name</span>
          <input className="input-style" placeholder="Ex: Birthday" />
          <span className="input-title">Description</span>
          <input className="input-style" placeholder="Ex: Enzo Birthday" />
          <span className="input-title">Time</span>
          <input className="input-style" placeholder="Ex: Enzo Birthday" />

          <button onClick={() => newReminder()}>
            Add new reminder
          </button>
        </div>
      </div>
    </>
  );
}
