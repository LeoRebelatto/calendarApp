import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Reminder } from "../../_interfaces/reminder.interface";
import AddReminder from "../add-reminder-component/add-reminder-component";
import "./month-component.scss";

interface Day {
  id: number;
  reminders: Reminder[];
}

interface ComponentProps {
  month: number;
  year: number;
}

export function Month(props: ComponentProps) {
  const currentDate = useSelector((state: RootState) => state.data);
  const [showModal, setShowModal] = useState(false);
  const [daySelected, setDaySelected] = useState<any>();
  var totalDays: Day[] = [];
  const date = new Date(props.year, props.month, 0);

  getDays();
  //addNewReminder()

  function showAddReminder(id: any) {
    setDaySelected(id);
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
    getReminders();
  }

  function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

  function getReminders() { 
    let allReminders = allStorage();
    allReminders.map((el: any)=>{
      totalDays.map((res, i) => {
        let date = new Date(
          currentDate.year,
          currentDate.month,
          res.id
        ).toString();
        let obj: any | null = JSON.parse(el);
        if(obj?.date === date){
          let teste: Reminder = obj;
          totalDays[i].reminders.push(teste)
        }
      });
    })
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
          day={daySelected}
        />
      )}
    </>
  );
}