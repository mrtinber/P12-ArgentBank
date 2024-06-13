import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserToken = createAsyncThunk(
    'userAuth/getUserToken',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        const storedToken = sessionStorage.getItem('token');

        if (!storedToken) {
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
            return { token: storedToken }
        }
    }
)