import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import blogReducer from "./Features/Blog/BlogSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
    },
});