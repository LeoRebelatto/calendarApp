import React, { useEffect, useState } from "react";
import { Reminder } from "../../_interfaces/reminder.interface";
import AddReminder from "../add-reminder-component/add-reminder-component";
import "./month-component.scss";

interface Day {
  id: number;
  reminders: Reminder[];
}

interface ComponentProps {
  month_id: number;
}

export function Month(props: ComponentProps) {
  const [showModal, setShowModal] = useState(false);
  const [daySelected, setDaySelected] = useState<any>();
  var totalDays: Day[] = [];
  const [newReminderData, setNewReminderData] = useState<Reminder>({
    name: "teste",
    color: "#000000",
    description: "teste",
    time: "15:00",
  });
  const date = new Date(2021, props.month_id, 0);

  getDays();
  //addNewReminder()

  function showAddReminder(id: any) {
    setDaySelected(id);
    addNewReminder();
    setShowModal((prev) => !prev);
  }

  //Array of object days criation
  function getDays() {
    let monthTotalDays = date.getDate(); //get days amount
    for (let day = 1; day <= monthTotalDays; day++) {
      totalDays.push({
        id: day,
        reminders: [],
      });
    }
    //totalDays.length > 0 ? setIsLoadding(false) : setIsLoadding(true);
  }

  function addNewReminder(){
    totalDays.map((res, i)=>{
      if(res.id === daySelected){
        totalDays[i].reminders.push(newReminderData);
      }
    })
    console.log(totalDays)
  }

  return (
    <>
      <div className="content-month">
        <div className="grid-month">
          {totalDays.map((res) => {
            return (
              <div className="day" key={res.id}>
                <div className="day-header">
                  <span>{res.id}</span>
                  <button onClick={() => showAddReminder(res.id)}>+</button>
                </div>
                <div className="reminders">
                  {res.reminders.map((el, i) => {
                    return (
                      <div
                        key={i}
                        className="reminder"
                        style={{ backgroundColor: el.color }}
                      >
                        {el.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showModal && (
        <AddReminder
          showModal={showModal}
          setShowModal={setShowModal}
          setNewReminderData={setNewReminderData}
        />
      )}
    </>
  );
}
