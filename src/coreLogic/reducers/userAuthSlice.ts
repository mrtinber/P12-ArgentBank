import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/initReduxStore";
import { userAuthState } from "../models/userAuthState";
import { getUserToken } from "../useCases/getUserToken";

const initialState: userAuthState = {
    token: sessionStorage.getItem('token') || '',
    isLoggedIn: !!sessionStorage.getItem('token'),
    error: null,
}

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        }, 
        handleLogOut(state) {
            state.token= '';
            state.isLoggedIn= false;
            sessionStorage.clear();
        }, 
    },
    extraReducers: (builder) => {
        builder.addCase(getUserToken.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.error = null;
        })
        builder.addCase(getUserToken.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
        })
    },
})

export const { setToken, setIsLoggedIn, handleLogOut } = userAuthSlice.actions;

export const selectAuthToken = (state: RootState) => state.userAuth.token;
export const selectIsLoggedIn = (state: RootState) => state.userAuth.isLoggedIn;
export const selectAuthError = (state: RootState) => state.userAuth.error;