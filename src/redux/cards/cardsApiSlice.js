import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../services/apiUrl';

const cardsApiSlice = createApi({
  reducerPath: 'cardsApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/cards`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['cards'],
  endpoints: builder => ({
    addCard: builder.mutation({
      query: data => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cards'],
    }),

    deleteCard: builder.mutation({
      query: data => ({
        url: `/`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['cards'],
    }),

    updateCard: builder.mutation({
      query: ({ cardId, card }) => ({
        url: `/${cardId}`,
        method: 'PATCH',
        body: card,
      }),
      invalidatesTags: ['cards'],
    }),

    moveCard: builder.mutation({
      query: data => ({
        url: `/move`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['cards'],
    }),
  }),
  refetchOnReconnect: true,
});

export const {
  useUpdateCardMutation,
  useDeleteCardMutation,
  useAddCardMutation,
  useMoveCardMutation,
} = cardsApiSlice;

export default cardsApiSlice;
