import { baseApi } from "./baseApi";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeMetrics: builder.query({
      query: () => ({
        url: "/home-section",
        method: "GET",
      }),
      providesTags: ["HomeApi"], 
    }),
    getSettingsData: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),
    getSocialLinks: builder.query({
      query: () => ({
        url: "/social-links",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),
    getService: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),
  }),
});

export const { useGetHomeMetricsQuery, useGetSettingsDataQuery, useGetSocialLinksQuery, useGetServiceQuery } = homeApi;
