import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movie_detail_http } from "../app/apis";
import { AppDispatch } from "../app/store";

const initialState = {
    id: 0,
    movieClips: [],
    loadingClips: false,
    errorClips: false,
    recommends: [],
    loadingRecommends: true,
    errorRecommends: false,
    loaded: false
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getMovieId: (state, {payload} ) => {
            state.id = payload;
        },
        getMovieClips: (state) => {
            state.loadingClips = true;
        },
        getMovieClipsSuccess: (state, action: PayloadAction<[]>) => {
            state.movieClips = action.payload;
            state.loadingClips = false;
            state.errorClips = false;
        },
        getMovieClipsError: (state) => {
            state.loadingClips = false;
            state.errorClips = true;
        },
        getMoviesRecommend: (state) => {
            state.loadingRecommends = true;
        },
        getMoviesRecommendSuccess: (state, action: PayloadAction<[]>) => {
            state.recommends = action.payload;
            state.errorRecommends = false;
            state.loadingRecommends = false;
        },
        getMoviesRecommendFailure: (state) => {
            state.errorRecommends = true;
            state.loadingRecommends = false;
        }
    }
});

export const {getMovieId, getMovieClips, getMovieClipsSuccess, getMoviesRecommend, getMoviesRecommendSuccess, getMoviesRecommendFailure} = movieSlice.actions;

export default movieSlice.reducer;

export function GetVideoClips (id: number): any{
    const key = process.env.REACT_APP_API_KEY;
    const url = `${movie_detail_http}/${id}/videos?api_key=${key}&language=en-US`;

    return async (dispatch: AppDispatch) => {
        dispatch(getMovieClips());
        fetch(url)
        .then( res => res.json())
        .then(data => {
            dispatch(getMovieClipsSuccess(data.results));
        })
        .catch(err => console.log(err));
    }
}

export function GetRecommendsMovie (id: number): any{
    const key = process.env.REACT_APP_API_KEY;
    const page = Math.floor(Math.random() * 3) + 1;
    const url = `${movie_detail_http}/${id}/recommendations?api_key=${key}&language=en-US&page=${page}"`;

    return async (dispatch: AppDispatch) => {
        dispatch(getMoviesRecommend());
        fetch(url)
        .then(res => res.json())
        .then(data => {
            dispatch(getMoviesRecommendSuccess(data.results))
        })
        .catch(err => {
            dispatch(getMoviesRecommendFailure());
            console.log(err);
        });
    }

}