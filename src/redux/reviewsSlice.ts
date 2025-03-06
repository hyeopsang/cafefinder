import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "../types/Review";
const reviewsSlice = createSlice({
  name: "reviews",
  initialState: [],
  reducers: {
    setReviews: (state: Review[], action: PayloadAction) => {
      return action.payload;
    },
  },
});

export const { setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
