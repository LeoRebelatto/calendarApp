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
  const [isLoadding, setIsLoadding] = useState(true);
  const [daySelected, setDaySelected] = useState<any>();
  const [totalDays, setTotalDays] = useState<Day[]>([]);
  const [newReminderData, setNewReminderData] = useState<Reminder>({name:'',color:'',description:'', time: ''});
  const date = new Date(2021, props.month_id, 0);

  useEffect(() => {
    getDays();
  }, [props.month_id]);

  useEffect(() =>{
    addNewReminder()
  }, [newReminderData]);

  function showAddReminder(id: any) {
    setDaySelected(id);
    setShowModal((prev) => !prev);
  }

  //Array of object days criation
  async function getDays() {
    let monthTotalDays = await date.getDate(); //get days amount
    let totalDaysAux: Day[] = []; //Aux array for setTotalDays push
    for (let day = 1; day <= monthTotalDays; day++) {
      totalDaysAux.push({
        id: day,
        reminders: [
          {
            name: "Birthday",
            color: "#50c8ff",
            description: "Enzo Birthday in the playground",
            time: "15:00",
          },
        ],
      });
    }
    setTotalDays(totalDaysAux);
    totalDays.length > 0 ? setIsLoadding(false) : setIsLoadding(true);
  }

  function addNewReminder(){
    let aux = totalDays;
    aux.map((res, i)=>{
      if(res.id === daySelected){
        aux[i].reminders.push(newReminderData);
      }
    })
    setTotalDays(aux);
    console.log(totalDays);
  }

  return (
    <>
      <div className="content-month">
        {!isLoadding && (
          <div className="grid-month">
            {totalDays.map((res) => {
              return (
                <div className="day" key={res.id}>
                  <div className="day-header">
                    <span>{res.id}</span>
                    <button onClick={() => showAddReminder(res.id)}>+</button>
                  </div>
                  <div className="reminders">
                    {res.reminders.map((el) => {
                      return (
                        <div
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
        )}
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
