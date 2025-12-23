// This is a base API which is injected into all of the APIs
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

// credentials: 'include', is required for cross domain where back and front ends are different
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Service", "Order", "User", "Event", "Calendar", "Kitchen"],
  endpoints: (builder) => ({}),
});
