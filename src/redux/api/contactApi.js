import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContactMessage: builder.mutation({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
      providesTags: ["ContactApi"],
    }),
  }),
});

export const { useCreateContactMessageMutation } = contactApi;
