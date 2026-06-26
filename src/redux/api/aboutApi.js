import { baseApi } from "./baseApi";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: `/about`,
        method: "GET",
      }),
      providesTags: ["AboutApi"],
    }),
    getProfiles: builder.query({
      query: () => ({
        url: `/staffs`,
        method: "GET",
      }),
      providesTags: ["StaffsApi"],
    }),
  }),
});

export const { useGetProfilesQuery, useGetAboutQuery } = aboutApi;
