import {createApi} from '@reduxjs/toolkit/query/react';
import {customBaseQuery} from "./config/customBaseQuery.js";

export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Project','ProjectsInfo'],
    endpoints: (builder) => ({

        getProjects: builder.query({
            query: (searchParams = {}) => ({
                url: '/projects',
                method: 'GET',
                params: searchParams,
            }),
            providesTags: ['Project'],
        }),
        getProjectTasks: builder.query({
            query: (id) => ({
                url: `/projects/${id}`, // id используется в пути
                method: 'GET',
            }),
            providesTags: ['ProjectsInfo'],
        }),

        getProjectsAuthors: builder.query({
            query: (id) => ({
                url: `/projects/${id}/authors`, // id используется в пути
                method: 'GET',
            }),
        }),

        createProject: builder.mutation({
            query: (newProject) => ({
                url: '/projects/new',
                method: 'POST',
                body: newProject,
            }),
            invalidatesTags: ['Project'],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetProjectTasksQuery,
} = projectsApi;
