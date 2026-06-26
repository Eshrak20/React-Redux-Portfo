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
      query: (id) => ({
        url: `/get-project-by-id/${id}`,
        method: "GET",
      }),
      providesTags: ["ProjectApi"],
    }),
  }),
});

export const { useGetDetailProjectsQuery, useGetAllProjectsQuery } = projectApi;
