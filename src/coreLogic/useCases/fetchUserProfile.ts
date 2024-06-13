import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        const USER_TOKEN = sessionStorage.getItem('token')

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