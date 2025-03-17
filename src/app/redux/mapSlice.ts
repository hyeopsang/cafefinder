import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const mapSlice = createSlice({
  name: "map",
  initialState: null as kakao.maps.Map | null,
  reducers: {
    setMap: (state, action: PayloadAction<kakao.maps.Map>) => {
      return action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;
export default mapSlice.reducer;
