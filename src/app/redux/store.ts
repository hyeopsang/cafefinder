import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session"; // sessionStorage 사용

import mapReducer from "./mapSlice"; // persist 제외할 리듀서
import authReducer from "./authSlice";
import placesReducer from "./placesSlice";
import reviewsReducer from "./reviewsSlice";
import searchReducer from "./searchSlice";
// persist 설정
const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["auth", "places", "reviews"], // persist할 리듀서만 명시
};

// persistReducer 적용할 리듀서들
const rootReducer = combineReducers({
  auth: authReducer,
  places: placesReducer,
  reviews: reviewsReducer,
  map: mapReducer, // persist 제외 리듀서는 따로 두고 map은 persist에서 제외됨
  place: searchReducer
});

// persist 적용된 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store 생성
export const store = configureStore({
  reducer: persistedReducer, // persistedReducer를 그대로 사용
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist와 관련된 오류를 방지
    }),
});

// 타입 선언
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// persistor 생성
export const persistor = persistStore(store);
