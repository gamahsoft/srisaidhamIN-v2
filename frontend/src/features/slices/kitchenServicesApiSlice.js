import { KITCHEN_URL } from "../../utils/constants";
import { apiSlice } from "./apiSlice";

export const kitchenServicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllKitchenServices: builder.query({
      query: () => ({
        url: `${KITCHEN_URL}/kitchen-menu`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllKitchenServicesQuery } = kitchenServicesApiSlice;
