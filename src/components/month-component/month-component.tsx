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

export function Month() {
  const currentDate = useSelector((state: RootState) => state.data);
  const [showModal, setShowModal] = useState(false);
  const [daySelected, setDaySelected] = useState<any>();
  const [typeDialog, setTypeDialog] = useState<string>("");
  const [reminderToEdit, setReminderToEdit] = useState<Reminder>();
  var totalDays: Day[] = [];
  var prevDays: Day[] = [];
  //var nextDays: Day[] = [];
  const date = new Date(currentDate.year, currentDate.month, 0);

  getDays();
  getPrevMonthDays();
  //getNextMonthDays();

  //Open dialog in new reminder mode
  function showAddReminder(day: any) {
    setTypeDialog("new");
    setReminderToEdit({ name: "", date: "", color: "", time: new Date("0000-00-00T00:00:00") , id: "" });
    setDaySelected(day);
    setShowModal((prev) => !prev);
  }

  //Open dialog in edit mode
  function showEditReminder(reminder: Reminder, day: any) {
    setTypeDialog("edit");
    setReminderToEdit(reminder);
    setDaySelected(day);
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

  //Array for prev Month days in the calendar
  function getPrevMonthDays() {
    let dateStart = new Date(currentDate.year, currentDate.month - 1, 0);
    let prevMonthLastDay = new Date(
      currentDate.year,
      currentDate.month + 1,
      0
    ).getDate();
    let startsOn = dateStart.getDay();
    for (let i = startsOn; i >= 0; i--) {
      prevDays.push({
        id: prevMonthLastDay - i,
        reminders: [],
      });
    }
  }

  // //Array for next Month days in the calendar
  // function getNextMonthDays() {

  //   console.log(nextStartsOn)
  //   for (let i = 0; i <= nextStartsOn ; i++) {
  //     nextDays.push({
  //       id: i + 1,
  //       reminders:[]
  //     });
  //   }
  // }

  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }

  function getReminders() {
    let allReminders = allStorage();
    allReminders.map((el: any) => {
      totalDays.map((res, i) => {
        let date = new Date(
          currentDate.year,
          currentDate.month,
          res.id
        ).toString();
        let obj: any | null = JSON.parse(el);
        if (obj?.date === date) {
          let teste: Reminder = obj;
          totalDays[i].reminders.push(teste);
        }
      });
    });
    sortReminders();
  }

  function sortReminders() {
    totalDays.map((res) => {
      res.reminders.sort(function (a, b) {
        if (a.time > b.time) {
          return 1;
        }
        if (a.time < b.time) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    });
  }

  return (
    <>
      <div className="content-month">
        <div className="grid-month">
          <span className="week-day">Sunday</span>
          <span className="week-day">Monday</span>
          <span className="week-day">Tuesday</span>
          <span className="week-day">Wednesday</span>
          <span className="week-day">Thursday</span>
          <span className="week-day">Friday</span>
          <span className="week-day">Saturday</span>
          {prevDays.map((prev) => {
            return (
              <div className="prev-day" key={prev.id}>
                <div className="day-header">
                  <span>{prev.id}</span>
                </div>
              </div>
            );
          })}
          {totalDays.map((res) => {
            return (
              <div className="day" key={res.id}>
                <div className="day-header">
                  <span>{res.id}</span>
                  <button onClick={() => showAddReminder(res.id)}>+</button>
                </div>
                <div className="reminders">
                  {res.reminders.map((el, i) => {
                    if(i<2){
                      return (
                        <div
                          key={i}
                          className="reminder"
                          style={{ backgroundColor: el.color }}
                          onClick={() => showEditReminder(el, res.id)}
                        >
                          {`${new Date(el.time).getHours()}:${new Date(el.time).getMinutes()} `} -
                          {` ${el.name}`}
                        </div>
                      );
                    }else{
                      if(i===2){
                        return(
                          <div className="more-reminders">
                          ...
                        </div>
                        )
                        
                      }
                    }
                    
                  })}
                </div>
              </div>
            );
          })}
          {/* {nextDays.map((next) => {
            return (
              <div className="prev-day" key={next.id}>
                <div className="day-header">
                  <span>{next.id}</span>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
      {showModal && (
        <AddReminder
          reminderToEdit={reminderToEdit}
          type={typeDialog}
          showModal={showModal}
          setShowModal={setShowModal}
          day={daySelected}
        />
      )}
    </>
  );
}
