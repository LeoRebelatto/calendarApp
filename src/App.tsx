import React from "react";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import "./App.scss";
import { Month } from "./components/month-component/month-component";

import dateSlice, { decrement, increment } from "./redux/date-slice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";

function App() {
  const currentDate = useSelector((state: RootState) => state.data);
  const dispatch = useAppDispatch()

  return(
    <>
    <button onClick={()=>dispatch(decrement())}>&lt;</button>
    <span>{currentDate.month + 1}/{currentDate.year}</span>
    <button onClick={()=>dispatch(increment())}>&gt;</button>
    <Month month_id={currentDate.month} />
    </>
    )
}

export default App;
