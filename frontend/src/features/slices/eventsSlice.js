import { SCROL_EVENTS_URL } from "../../utils/constants";
import { PANCHANG_URL } from "../../utils/constants";
import { apiSlice } from "./apiSlice";

export const eventsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScrolEvents: builder.query({
      query: () => `${SCROL_EVENTS_URL}/announcements`,
      keepUnusedDataFor: 5,
    }),
    getDailyPanchang: builder.query({
      query: () => `${PANCHANG_URL}/panchang`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetScrolEventsQuery, useGetDailyPanchangQuery } = eventsSlice;
