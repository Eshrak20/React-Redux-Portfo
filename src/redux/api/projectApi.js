import { baseApi } from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["ProjectApi"],
    }),
    getDetailProjects: builder.query({
      query: (slug) => ({
        url: `/get-project-by-id/${slug}`,
        method: "GET",
      }),
      providesTags: ["ProjectApi"],
    }),
  }),
});

export const { useGetDetailProjectsQuery, useGetAllProjectsQuery } = projectApi;
