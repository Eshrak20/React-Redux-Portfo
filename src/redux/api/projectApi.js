import { baseApi } from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: ({
                page = 1,
                per_page = 20,
                project_type,
                project_category,
                sort,
              } = {}) => ({
        url: "/projects",
        method: "GET",

        params: {
          page,
          per_page,

          ...(project_type && {
            project_type,
          }),

          ...(project_category && {
            project_category,
          }),

          ...(sort && {
            sort,
          }),
        },
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

export const {
  useGetAllProjectsQuery,
  useGetDetailProjectsQuery,
} = projectApi;