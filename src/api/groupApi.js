import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config/customBaseQuery.js';

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Group'],
    endpoints: (builder) => ({
        getGroups: builder.query({
            query: () => '/groups',
            providesTags: ['Group'],
        }),
    }),
});

export const { useGetGroupsQuery, useCreateGroupMutation } = groupApi;
