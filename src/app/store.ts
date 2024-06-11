import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userProfileSlice } from "../features/userProfile/userProfileSlice";

export const initReduxStore = configureStore({
    reducer: combineReducers({
        userProfile: userProfileSlice.reducer,
    }),
    devTools: true,
}
)

export type RootState = ReturnType<typeof initReduxStore.getState>;
export type AppDispatch = typeof initReduxStore.dispatch;