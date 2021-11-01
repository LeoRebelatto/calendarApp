import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface DateState {
  month: number;
  year: number;
}

// Define the initial state using that type
const initialState: DateState = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

export const dateSlice = createSlice({
  name: "date",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.year = state.month === 11 ? state.year + 1 : state.year;
      state.month = state.month === 11 ? 0 : state.month + 1;
    },
    decrement: (state) => {
      state.year = state.month === 0 ? state.year - 1 : state.year;
      state.month = state.month === 0 ? 11 : state.month - 1;
    },
    incrementYear: (state) => {
      state.year += 1;
    },
    decrementYear: (state) => {
      state.year -= 1;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
  },
});

export const { increment, decrement, incrementYear, decrementYear, setMonth, setYear } = dateSlice.actions;

export default dateSlice.reducer;
