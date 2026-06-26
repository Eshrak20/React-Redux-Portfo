import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
     import.meta.env.VITE_API_BASE_URL,
    // "https://mastermind.ilabs360.com/api"
    //  || "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["HomeApi", "ProjectApi"],
  endpoints: () => ({}),
});