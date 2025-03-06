import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "../types/Place";

const placesSlice = createSlice({
  name: "places",
  initialState: [],
  reducers: {
    setPlaces: (state: Place[], action: PayloadAction) => {
      return action.payload;
    },
  },
});

export const { setPlaces } = placesSlice.actions;
export default placesSlice.reducer;
