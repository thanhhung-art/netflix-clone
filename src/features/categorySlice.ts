import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";

const initialState = {
    categories: [],
    loading: false,
    error: false
};

export const categoriesSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategories: state => {
            state.loading = true;
        },
        getCategoriesSuccess: (state,action: PayloadAction<[]>) => {
            state.categories = action.payload;
            state.loading = false;
            state.error = false;
        },
        getCategoriesFailure: state => {
            state.error = true;
        }
    }
})
    
export const { getCategories ,getCategoriesSuccess, getCategoriesFailure } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export function fetchCategories() {
    const key = process.env.REACT_APP_API_KEY;
    const genres_list: string = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`;

    return async (dispatch: AppDispatch) => {  
        dispatch(getCategories());

        fetch(genres_list)
        .then(res => res.json())
        .then(data => {
            dispatch(getCategoriesSuccess(data.genres));
        })
        .catch(err => {
            console.log(err);
            dispatch(getCategoriesFailure());
        })
    }
}