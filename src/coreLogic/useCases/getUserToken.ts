import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/initReduxStore";
import { selectAuthToken } from "../reducers/userAuthSlice";

export const getUserToken = createAsyncThunk(
    'userAuth/getUserToken',
    async ({ email, password }: { email: string, password: string }, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const USER_TOKEN = selectAuthToken(state);

        if (!USER_TOKEN) {
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

                sessionStorage.setItem('token', data.body.token)

                return { token: data.body.token };
            } catch (error: any) {
                return rejectWithValue(error.toString());
            }
        } else {
            return { token: USER_TOKEN }
        }
    }
)