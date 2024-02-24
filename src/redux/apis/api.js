// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userManagementApis = createApi({
  reducerPath: 'userManagementApis',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3009/user_mngmnt/' }),
  endpoints: (builder) => ({

    getAllUsers: builder.query({
      query: () => ({
          url: `users`
      }),
      providesTags: ["users"]
    }),

    loginUser: builder.mutation({
      query: (body) => ({
          url: `login`,
          method: "POST",
          body
      }),
      invalidatesTags: ["users"]
    }),

    createUser: builder.mutation({
      query: (body) => {
        return ({
          url: `user`,
          method: "POST",
          body
        })
      }
    }),

    updateUserStatus: builder.mutation({
      query: (body) => ({
        url: `/user/${body?.userId}/status/${body?.status}`,
        method: "PATCH"
      }),
      invalidatesTags: ["users"]
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery, useLoginUserMutation, useCreateUserMutation, useUpdateUserStatusMutation } = userManagementApis