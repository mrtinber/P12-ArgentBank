import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/initReduxStore";

export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchUserProfile',
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const USER_TOKEN = state.userAuth.token;

        if (!USER_TOKEN) {
            return rejectWithValue('Token not found');
        }

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${USER_TOKEN}`,
                },
            });
            const data = await response.json();
            return data.body;
        } catch (error: any) {
            return rejectWithValue(error.toString());
        }
    }
)