import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../services/apiUrl';

const listsApiSlice = createApi({
  reducerPath: 'listsApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/lists`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['lists'],
  endpoints: builder => ({
    getAllLists: builder.query({
      query: () => `/`,
      keepUnusedDataFor: 30,
      providesTags: ['lists'],
    }),

    addNewList: builder.mutation({
      query: list => ({
        url: `/`,
        method: 'POST',
        body: list,
      }),
      invalidatesTags: ['lists'],
    }),

    deleteList: builder.mutation({
      query: listId => ({
        url: `/${listId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['lists'],
    }),
  }),
  refetchOnReconnect: true,
});

export const {
  useGetAllListsQuery,
  useAddNewListMutation,
  useDeleteListMutation,
} = listsApiSlice;

export default listsApiSlice;
