import { createSlice } from "@reduxjs/toolkit"

const initialState = {    
    user:null,
    isLoggedin:window.localStorage.getItem('isLogedIn')?window.localStorage.getItem('isLogedIn'):false
    }
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // const { user } = action.payload
            state.user = action.payload
            state.isLoggedin = true
        },
        logOut: (state, action) => {
            state.user = null
            state.isLoggedin = false
            window.localStorage.removeItem("isLogedIn");
        }
    },
})

export const { setCredentials, logOut } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state) => state.user.user
export const checkisLogedIn = (state) => state.user.isLoggedin