import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["BlogApi"],
    }),

    getDetailBlogs: builder.query({
      query: (slug) => `/blogs/${slug}`,
      providesTags: ["BlogApi"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetDetailBlogsQuery,
} = blogApi;
