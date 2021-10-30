import { useSelector } from "react-redux";
import "./App.scss";
import { Month } from "./components/month-component/month-component";

import { decrement, increment } from "./redux/date-slice";
import { useAppDispatch } from "./redux/hooks";
import { RootState } from "./redux/store";

function App() {
  const currentDate = useSelector((state: RootState) => state.data);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="header">
        <button onClick={() => dispatch(decrement())}>&lt;</button>
        <span>
          {currentDate.month}/{currentDate.year}
        </span>
        <button onClick={() => dispatch(increment())}>&gt;</button>
      </div>
      <Month month={currentDate.month} year={currentDate.year} />
    </>
  );
}

export default App;
