import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// PlaceSlice의 초기 상태 정의
export interface SearchState {
  search: kakao.maps.services.Places | undefined;
}

const initialState: SearchState = {
  search: undefined,
};

// placeSlice 정의
const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<kakao.maps.services.Places | undefined>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = SearchSlice.actions;

export default SearchSlice.reducer;
