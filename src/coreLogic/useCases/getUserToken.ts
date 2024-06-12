import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/initReduxStore";

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