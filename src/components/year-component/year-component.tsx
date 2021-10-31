import { useAppDispatch } from "../../redux/hooks";
import "./year-component.scss";

import { setMonth } from "../../redux/date-slice";

export function Year() {
  const dispatch = useAppDispatch();
  const year: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function setCurrentMonth(month: number) {
    dispatch(setMonth(month));
    window.location.href = "/month";
  }

  return (
    <div className="content-year">
      <div className="grid-year">
        {year.map((el, i) => {
          return (
            <div onClick={() => setCurrentMonth(12)} className="month" key={i}>
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
}
