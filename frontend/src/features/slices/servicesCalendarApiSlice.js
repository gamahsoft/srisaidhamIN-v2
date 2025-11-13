import { apiSlice } from "./apiSlice";
import { SERVICES_CALENDAR } from "../../utils/constants";

export const servicesCalendarApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createServices: builder.mutation({
      query: (data) => ({
        url: `${SERVICES_CALENDAR}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getServices: builder.query({
      query: () => ({
        url: SERVICES_CALENDAR,
      }),
      providesTags: ["Calendar"],
      keepUnusedDataFor: 5,
    }),
    deleteService: builder.mutation({
      query: (serviceId) => ({
        url: `${SERVICES_CALENDAR}/${serviceId}`,
        method: "DELETE",
      }),
    }),
    updateService: builder.mutation({
      query: (data) => ({
        url: `${SERVICES_CALENDAR}/${data.serviceId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Calendar"],
    }),
  }),
});

export const {
  useCreateServicesQuery,
  useGetServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = servicesCalendarApiSlice;
