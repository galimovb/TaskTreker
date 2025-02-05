    import { configureStore } from '@reduxjs/toolkit';
    import {usersApi} from "../usersApi.js";
    import {projectsApi} from "../projectsApi.js";
    import {groupApi} from "../groupApi.js";
    import {taskApi} from "../taskApi.js";

    export const store = configureStore({
        reducer: {
            [usersApi.reducerPath]: usersApi.reducer,
            [projectsApi.reducerPath]: projectsApi.reducer,
            [groupApi.reducerPath]: groupApi.reducer,
            [taskApi.reducerPath]: taskApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                usersApi.middleware,
                projectsApi.middleware,
                groupApi.middleware,
                taskApi.middleware,
            ),

    });
