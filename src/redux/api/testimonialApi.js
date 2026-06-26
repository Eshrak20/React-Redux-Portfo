import { baseApi } from "./baseApi";

export const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonial: builder.query({
      query: () => ({
        url: `/testimonials`,
        method: "GET",
      }),
      providesTags: ["TestimonialApi"],
    }),
  }),
});

export const { useGetTestimonialQuery } = testimonialApi;
