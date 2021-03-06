import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Reminder } from "../../_interfaces/reminder.interface";
import AddReminder from "../add-reminder-component/add-reminder-component";
import { RemindersDay } from "../reminders-day-component/reminders-day-component";
import "./month-component.scss";

interface Day {
  id: number;
  reminders: Reminder[];
}

export function Month() {
  const currentDate = useSelector((state: RootState) => state.data);
  const [showDialog, setShowDialog] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [daySelected, setDaySelected] = useState<any>();
  const [typeDialog, setTypeDialog] = useState<string>("");
  //Init object reminder
  const [reminderToEdit, setReminderToEdit] = useState<Reminder>({
    name: "",
    date: "",
    color: "",
    time: new Date("2021-01-01T00:00:00"),
    id: "",
    colorFont: "",
  });
  const [remindersInDay, setRemindersInDay] = useState<Reminder[]>([]);
  var totalDays: Day[] = [];
  var prevDays: Day[] = [];
  var nextDays: Day[] = [];
  const date = new Date(currentDate.year, currentDate.month +1, 0);

  getDays();
  getPrevMonthDays();
  getNextMonthDays();

  //Open dialog in new reminder mode
  function showAddReminder(day: any) {
    setTypeDialog("new");
    setDaySelected(day);
    setReminderToEdit({
      name: "",
      date: "",
      color: "",
      time: new Date("2021-01-01T00:00:00"),
      id: "",
      colorFont: "",
    });
    setShowDialog((prev) => !prev);
  }

  //Open dialog in edit mode
  function showEditReminder(reminder: Reminder, day: any) {
    setTypeDialog("edit");
    setReminderToEdit(reminder);
    setDaySelected(day);
    setShowDialog((prev) => !prev);
  }

  //Show All reminders in a day
  function showAllReminders(reminders: Reminder[], day: any) {
    setRemindersInDay(reminders);
    setDaySelected(day);
    setShowReminders(true);
    setTimeout(() => {
      window.scrollTo(0, 1000);
    }, 100);
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
    let dateStart = new Date(currentDate.year, currentDate.month, 0);
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

  //Array for next Month days in the calendar
  function getNextMonthDays() {
    let dateStart = new Date(currentDate.year, currentDate.month, 0);
    let nextMonth = totalDays.length + dateStart.getDay() + 1;
    nextMonth = 7 - (nextMonth % 7);
    if (nextMonth < 7) {
      for (let i = 1; i <= nextMonth; i++) {
        nextDays.push({
          id: i,
          reminders: [],
        });
      }
    }
  }

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
    allReminders.forEach((el: any) => {
      totalDays.forEach((res, i) => {
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
    totalDays.forEach((res) => {
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
          <span className="week-day">Sun</span>
          <span className="week-day">Mon</span>
          <span className="week-day">Tue</span>
          <span className="week-day">Wed</span>
          <span className="week-day">Thu</span>
          <span className="week-day">Fri</span>
          <span className="week-day">Sat</span>
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
                  <button
                    onClick={() => showAddReminder(res.id)}
                    className="newReminderButton"
                  >
                    +
                  </button>
                </div>
                <div className="reminders d-none">
                  {res.reminders.map((el, i) => {
                    if (i < 2) {
                      return (
                        <div
                          key={i}
                          className="reminder"
                          style={{
                            backgroundColor: el.color,
                            color: el.colorFont,
                          }}
                          onClick={() => showEditReminder(el, res.id)}
                        >
                          {`${new Date(el.time).getHours()}:${
                            new Date(el.time).getMinutes() < 10 ? "0" : ""
                          }${new Date(el.time).getMinutes()} `}{" "}
                          -{` ${el.name}`}
                        </div>
                      );
                    } else {
                      if (i === 2) {
                        return (
                          <div
                            className="more-reminders"
                            key={i}
                            onClick={() =>
                              showAllReminders(res.reminders, res.id)
                            }
                          >
                            ...
                          </div>
                        );
                      }
                      return null;
                    }
                  })}
                </div>
                {res.reminders.length > 0 ? (
                  <div className="reminders-mobile">
                    <div
                      className="more-reminders"
                      onClick={() => showAllReminders(res.reminders, res.id)}
                    >
                      ...
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
          {nextDays.map((next) => {
            return (
              <div className="prev-day" key={next.id}>
                <div className="day-header">
                  <span>{next.id}</span>
                </div>
              </div>
            );
          })}
        </div>
        {showReminders && (
          <RemindersDay
            setEditDialog={setTypeDialog}
            allReminders={remindersInDay}
            day={daySelected}
            setShowDialog={setShowDialog}
            setShowReminders={setShowReminders}
            setReminderToEdit={setReminderToEdit}
          />
        )}
      </div>
      {showDialog && (
        <AddReminder
          reminderToEdit={reminderToEdit}
          type={typeDialog}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          day={daySelected}
        />
      )}
    </>
  );
}
