import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MapState { // ✅ export 추가
  map: kakao.maps.Map | null;
}

const initialState: MapState = {
  map: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<kakao.maps.Map>) => {
      state.map = action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;
export default mapSlice.reducer;
