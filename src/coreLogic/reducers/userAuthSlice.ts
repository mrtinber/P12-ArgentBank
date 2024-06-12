import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/initReduxStore";
import { userAuthState } from "../models/userAuthState";

const initialState: userAuthState = {
    token: '',
    isLoggedIn: false,
    error: null,
}

export const getUserToken = createAsyncThunk(
    'userAuth/getUserToken',
    async ({ email, password }: { email: string, password: string }, { getState, rejectWithValue }) => {

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to login');
            }
            return { token: data.body.token };
        } catch (error: any) {
            return rejectWithValue(error.toString());
        } finally {
            const state = getState() as RootState;
            console.log(state)
        }
    }
)

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserToken.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })
        builder.addCase(getUserToken.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
        })
    },
})

export const { setToken } = userAuthSlice.actions;
export const { setIsLoggedIn } = userAuthSlice.actions;

export const selectAuthToken = (state: RootState) => state.userAuth.token;
export const selectIsLoggedIn = (state: RootState) => state.userAuth.isLoggedIn;
export const selectAuthError = (state: RootState) => state.userAuth.error;