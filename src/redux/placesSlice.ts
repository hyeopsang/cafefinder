import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Place {
  distance: number;
  id: string;
  place_name: string;
  category_name: string;
  category_group_code?:  string | string[] | undefined;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
}

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