import { configureStore } from "@reduxjs/toolkit";
import { ServiceCallApi } from "../walmart/service/ServiceCall";
import actionReducer from "../walmart/service/slice";


export const store = configureStore({
    reducer: {
        procuctAction: actionReducer,
        [ServiceCallApi.reducerPath]: ServiceCallApi.reducer
    },
    middleware: (ecom) => ecom().concat(ServiceCallApi.middleware),
})