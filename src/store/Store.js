import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../slices/AuthReducer'
export const store = configureStore({
    reducer:{
        auth: authReducer,
    }
})