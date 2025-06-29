// This is a base API which is injected into all of the APIs
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Service", "Order", "User", "Event", "Calendar"],
  endpoints: (builder) => ({}),
});
