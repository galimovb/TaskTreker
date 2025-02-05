import {createApi} from '@reduxjs/toolkit/query/react';
import {customBaseQuery} from './config/customBaseQuery.js';

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Group'],
    endpoints: (builder) => ({
        getGroups: builder.query({
            query: () => '/groups',
            providesTags: ['Group'],
        }),
        createProjectGroup: builder.mutation({
            query: (newGroup) => ({
                url: '/groups/new',
                method: 'POST',
                body: newGroup,
                invalidatesTags: ['Group'],
            }),
        }),
        deleteProjectGroup: builder.mutation({
            query: (id) => ({
                url: `/groups/delete/${id}`,
                method: 'DELETE',
                invalidatesTags: ['Group'],
            }),
        }),
        editProjectGroup: builder.mutation({
            query: ({id, name}) => ({
                url: `/groups/edit/${id}`,
                method: 'PUT',
                body: {name},
                invalidatesTags: ['Group'],
            }),
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useCreateProjectGroupMutation,
    useDeleteProjectGroupMutation,
    useEditProjectGroupMutation
} = groupApi;
