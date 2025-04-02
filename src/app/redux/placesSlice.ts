import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "../../map/types";


const placesSlice = createSlice({
  name: "places",
  initialState: [] as Place[],
  reducers: {
    setPlaces: (state, action: PayloadAction<Place[]>) => {
      return action.payload;
    },
  },
});

export const { setPlaces } = placesSlice.actions;
export default placesSlice.reducer;