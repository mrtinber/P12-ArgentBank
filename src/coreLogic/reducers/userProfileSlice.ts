import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/initReduxStore";
import { fetchUserProfile } from "../useCases/fetchUserProfile";
import { updateUserProfile } from "../useCases/updateUserProfile";
import { UserProfile, UserProfileState } from "../models/UserProfileState";

const initialState: UserProfileState = {
    profile: { firstName: '', lastName: '' },
    isLoading: false,
    error: null,
    isEditing: false,
}

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
            return {
                ...state,
                isLoading : true,
            }
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        builder.addCase(updateUserProfile.pending, (state) => {
            return {
                ...state,
                isLoading : true,
            }
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            state.isLoading = false;
            state.isEditing = false;
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    }
})

export const { setIsEditing } = userProfileSlice.actions;

export const selectUserProfile = (state: RootState) => state.userProfile.profile;
export const selectIsLoading = (state: RootState) => state.userProfile.isLoading;
export const selectError = (state: RootState) => state.userProfile.error;
export const selectIsEditing = (state: RootState) => state.userProfile.isEditing;
