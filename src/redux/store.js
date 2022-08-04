import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";

let reducer = {
    user: userReducer
}

export const store = configureStore({
    reducer
})