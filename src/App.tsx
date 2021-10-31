import { useSelector } from "react-redux";
import "./App.scss";
import { Month } from "./components/month-component/month-component";

import {
  decrement,
  increment,
  incrementYear,
  decrementYear,
  setMonth,
  setYear,
} from "./redux/date-slice";
import { useAppDispatch } from "./redux/hooks";
import { RootState } from "./redux/store";
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Year } from "./components/year-component/year-component";

function App() {
  const currentDate = useSelector((state: RootState) => state.data);
  const dispatch = useAppDispatch();
  const history = useHistory();

  function clearAll() {
    localStorage.clear();
    window.location.reload();
  }

  function goToYear() {
    history.push("/year");
  }

  function currentDay() {
    let actualMonth = new Date().getMonth() + 1;
    let actualYear = new Date().getFullYear();
    dispatch(setYear(actualYear));
    dispatch(setMonth(actualMonth));
    history.push("/");
  }

  return (
    <>
      <div className="header">
        <div className="option" onClick={currentDay}>
          Current Month
        </div>
        <Switch>
          <Route exact path="/">
            <div className="navigation">
              <button onClick={() => dispatch(decrement())}>&lt;</button>
              <span onClick={goToYear}>
                {currentDate.month}/{currentDate.year}
              </span>
              <button onClick={() => dispatch(increment())}>&gt;</button>
            </div>
          </Route>
          <Route path="/year">
            <div className="navigation">
              <button onClick={() => dispatch(decrementYear())}>&lt;</button>
              <span>{currentDate.year}</span>
              <button onClick={() => dispatch(incrementYear())}>&gt;</button>
            </div>
          </Route>
        </Switch>

        <div onClick={clearAll} className="option">
          Clear All
        </div>
      </div>

      <Switch>
        <Route exact path="/">
          <Month />
        </Route>
        <Route path="/year">
          <Year />
        </Route>
      </Switch>
    </>
  );
}

export default App;
