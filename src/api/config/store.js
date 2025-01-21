    import { configureStore } from '@reduxjs/toolkit';
    import {usersApi} from "../usersApi.js";
    import {projectsApi} from "../projectsApi.js";
    import {groupApi} from "../groupApi.js";

    export const store = configureStore({
        reducer: {
            [usersApi.reducerPath]: usersApi.reducer,
            [projectsApi.reducerPath]: projectsApi.reducer,
            [groupApi.reducerPath]: groupApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                usersApi.middleware,
                projectsApi.middleware,
                groupApi.middleware,
            ),

    });
