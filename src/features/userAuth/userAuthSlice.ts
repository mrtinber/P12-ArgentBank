import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type userAuthState = {
    token: string,
}

const initialState: userAuthState = {
    token: '',
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserToken.fulfilled, (state, action) => {
            state.token = action.payload.token;
        })
    },
})

export const { setToken } = userAuthSlice.actions;

export const selectAuthToken = (state: RootState) => state.userAuth.token; 