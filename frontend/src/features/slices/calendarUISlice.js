import { createSlice } from "@reduxjs/toolkit";

const calendarUISlice = createSlice({
  name: "calendarui",
  initialState: {
    defaultView: "dayGridMonth", // or "timeGridWeek", "timeGridDay"
  },
  reducers: {
    setDefaultView: (state, action) => {
      state.defaultView = action.payload;
    },
  },
});

export const { setDefaultView } = calendarUISlice.actions;
export default calendarUISlice.reducer;
