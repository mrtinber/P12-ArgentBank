import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userProfileSlice } from "../features/userProfile/userProfileSlice";
import { userAuthSlice } from "../features/userAuth/userAuthSlice";

export const initReduxStore = configureStore({
    reducer: combineReducers({
        userProfile: userProfileSlice.reducer,
        userAuth: userAuthSlice.reducer,
    }),
    devTools: true,
}
)

export type RootState = ReturnType<typeof initReduxStore.getState>;
export type AppDispatch = typeof initReduxStore.dispatch;