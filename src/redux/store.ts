import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import todoSlice from "./features/todoSlice";
export const store = configureStore({
  reducer: {
    get: todoSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type TypedThunk<R = void> = ThunkAction<R, RootState, unknown, Action>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = () => useSelector((state: RootState) => state);
