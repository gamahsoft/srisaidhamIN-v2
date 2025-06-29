import { SERVICES_URL } from "../../utils/constants";
import { apiSlice } from "./apiSlice";

export const poojaServicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSaiServices: builder.query({
      query: () => ({
        url: `${SERVICES_URL}/sai-services`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllPoojaServices: builder.query({
      query: () => ({
        url: `${SERVICES_URL}/all-services`,
      }),
      keepUnusedDataFor: 5,
    }),
    getServices: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${SERVICES_URL}`,
        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Service"],
    }),
  }),
});

export const {
  useGetSaiServicesQuery,
  useGetAllPoojaServicesQuery,
  useGetServicesQuery,
} = poojaServicesApiSlice;
