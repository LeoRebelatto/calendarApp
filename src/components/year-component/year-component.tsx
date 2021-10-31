import { useAppDispatch } from "../../redux/hooks";
import "./year-component.scss";

import { setMonth } from "../../redux/date-slice";
import { useHistory } from "react-router";

export function Year() {
  const dispatch = useAppDispatch();
  const history = useHistory();
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
    history.push("/");
  }

  return (
    <div className="content-year">
      <div className="grid-year">
        {year.map((el, i) => {
          return (
            <div onClick={() => setCurrentMonth(i+1)} className="month" key={i}>
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
}
