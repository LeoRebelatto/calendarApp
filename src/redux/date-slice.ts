import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface DateState {
  month: number,
  year: number
}

// Define the initial state using that type
const initialState: DateState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear()
}

export const dateSlice = createSlice({
  name: 'date',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
        state.year = state.month===12 ? state.year + 1 : state.year;
        state.month = state.month===12 ? 1 : state.month + 1;
    },
    decrement: (state) => {
        state.year = state.month===1 ? state.year - 1 : state.year;
        state.month = state.month===1 ? 12 : state.month - 1;
    },
  },
})

export const { increment, decrement } = dateSlice.actions

export default dateSlice.reducer