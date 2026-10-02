import {baseApi} from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: ({
                        page = 1,
                        perPage = 20,
                        status = "",
                        category = "",
                        sort = "latest",
                    } = {}) => {
                const params = new URLSearchParams();

                params.set("page", page);
                params.set("per_page", perPage);

                if (status) {
                    params.set("status", status);
                }

                if (category) {
                    params.set("category_id", category);
                }

                if (sort) {
                    params.set("sort", sort);
                }

                return `/blogs?${params.toString()}`;
            },

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