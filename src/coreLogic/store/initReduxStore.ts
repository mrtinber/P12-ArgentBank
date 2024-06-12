import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userProfileSlice } from "../reducers/userProfileSlice";
import { userAuthSlice } from "../reducers/userAuthSlice";

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