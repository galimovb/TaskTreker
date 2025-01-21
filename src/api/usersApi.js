import {createApi} from '@reduxjs/toolkit/query/react';
import {customBaseQuery} from "./config/customBaseQuery.js";

export const usersApi = createApi({
        reducerPath: 'usersApi',
        baseQuery: customBaseQuery,
        tagTypes: ['User'],
        endpoints: (builder) => ({
            // Запрос для получения данных
            getUsers: builder.query({
                query: () => '/users', // GET-запрос на /users
                providesTags: ['User'],
            }),
            // Мутация для создания пользователя
            createUser: builder.mutation({
                query: (newUser) => ({
                    url: '/users/new',
                    method: 'POST',
                    body: newUser,
                }),
            }),
            // Мутация для логина
            loginUser: builder.mutation({
                query: (credentials) => ({
                    url: '/login/check',
                    method: 'POST',
                    body: credentials,
                }),
            }),
        }),
    });

    // Экспортируем автоматически сгенерированные хуки
    export const {
        useGetUsersQuery,
        useCreateUserMutation,
        useLoginUserMutation,
    } = usersApi;
