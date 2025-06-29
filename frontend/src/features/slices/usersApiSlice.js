import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../utils/constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    signout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/signout`,
        method: "POST",
      }),
    }),
    forgotpass: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotpass`,
        method: "POST",
        body: data,
      }),
    }),
    resetpass: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetpass`,
        method: "PATCH",
        body: data,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    contactus: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/contactus`,
        method: "POST",
        body: data,
      }),
    }),
    newsletter: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/newsletter`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignoutMutation,
  useSignupMutation,
  useForgotpassMutation,
  useResetpassMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
  useNewsletterMutation,
  useContactusMutation,
} = userApiSlice;
