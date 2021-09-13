import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";
import movieReducer from "../features/movieSlice";

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        movie: movieReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;