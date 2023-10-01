import { configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import projectsReducer from '../features/project/projectSlice'
import requestsReducer from '../features/request/requestSlice'

export default configureStore({
    reducer: {
        projects: projectsReducer,
        requests: requestsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})