import { configureStore } from "@reduxjs/toolkit"
import userSlice from '../state/auth.slice'

export const store = configureStore({
    reducer: {
        user: userSlice
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})