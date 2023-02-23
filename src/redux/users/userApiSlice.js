import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../services/apiUrl';

const userApiSlice = createApi({
  reducerPath: 'userApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/users`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['user'],
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: user => ({
        url: `/register`,
        method: 'POST',
        body: user,
        providesTags: ['user'],
      }),
    }),

    logInUser: builder.mutation({
      query: user => ({
        url: `/login`,
        method: 'POST',
        body: { email: user.email, password: user.password },
      }),
      providesTags: ['user'],
    }),

    logOutUser: builder.mutation({
      query: () => ({
        url: `/logout`,
      }),
      providesTags: ['user'],
    }),

    getUser: builder.query({
      query: () => ({
        url: '/current',
      }),
      providesTags: ['user'],
    }),
  }),
  refetchOnReconnect: true,
});

export const {
  useRegisterUserMutation,
  useLogInUserMutation,
  useLogOutUserMutation,
  useGetUserQuery,
} = userApiSlice;

export default userApiSlice;
