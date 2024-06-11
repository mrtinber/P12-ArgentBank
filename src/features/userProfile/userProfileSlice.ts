import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProfile } from "../../pages/UserProfile";
import { RootState } from "../../app/store";

const USER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjY2NDFmNTllYWIzMDhiMGViMWI4MiIsImlhdCI6MTcxODA4MDQxMSwiZXhwIjoxNzE4MTY2ODExfQ.gBTJ0PGhYcXVSAlkCyTnHbhnB1Zu54ikZPEz8hw_A5U';

type UserProfile = {
    firstName: string,
    lastName: string,
}

type UserProfileState = {
    profile: UserProfile,
    isLoading: boolean,
    error: string | null,
    isEditing: boolean,
}

const initialState: UserProfileState = {
    profile: { firstName: '', lastName: '' },
    isLoading: false,
    error: null,
    isEditing: false,
}

export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': USER_TOKEN,
                },
            });
            const data = await response.json();
            console.log("les données que j'ai fetch:", data)
            return data.body;
        } catch (error: any) {
            return rejectWithValue(error.toString());
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    'userProfile/updateUserProfile',
    async (formValues: UserProfile, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': USER_TOKEN,
                },
                body: JSON.stringify(formValues),
            });
            const data = await response.json();
            return data.body;
        } catch (error: any) {
            return rejectWithValue(error.toString());
        }
    }
)

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setIsEditing(state, action: PayloadAction<boolean>) {
            state.isEditing = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        })
        builder.addCase(updateUserProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            state.isLoading = false;
            state.isEditing = false;
        });
        builder.addCase(updateUserProfile.rejected, (state, action: any) => {
            state.isLoading = false;
            state.error = action.payload.message;
        });
    }
})

export const { setIsEditing } = userProfileSlice.actions;

export const selectUserProfile = (state: RootState) => state.userProfile.profile;
export const selectIsLoading = (state: RootState) => state.userProfile.isLoading;
export const selectError = (state: RootState) => state.userProfile.error;
export const selectIsEditing = (state: RootState) => state.userProfile.isEditing;
