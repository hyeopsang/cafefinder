import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// PlaceSlice의 초기 상태 정의
export interface SearchState {
  search: google.maps.Place | undefined;
}

const initialState: SearchState = {
  search: undefined,
};

// placeSlice 정의
const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<google.maps.Place | undefined>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = SearchSlice.actions;

export default SearchSlice.reducer;
