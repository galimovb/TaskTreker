import {createApi} from '@reduxjs/toolkit/query/react';
import {customBaseQuery} from './config/customBaseQuery.js';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (searchParams = {}) => ({
                url: '/tasks',
                method: 'GET',
                params: searchParams,
            }),
            providesTags: ['Tasks'],
        }),
        createTask: builder.mutation({
            query: (newTask) => ({
                url: '/tasks/new',
                method: 'POST',
                body: newTask,
            }),
        }),
        editTaskProjectGroup: builder.mutation({
            query: ({id, newGroupId}) => ({
                url: `/tasks/edit/${id}`,
                method: 'PUT',
                body: {newGroupId},
                invalidatesTags: ['Tasks'],
            }),
        }),
        editTask: builder.mutation({
            query: (body) => ({
                url: `/tasks/data/edit/${body.id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['Tasks'],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});

export const {
    useCreateTaskMutation,
    useEditTaskProjectGroupMutation,
    useEditTaskMutation,
    useDeleteTaskMutation,
    useGetTasksQuery
} = taskApi;
