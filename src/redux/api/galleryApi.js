import { baseApi } from "./baseApi";

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryImage: builder.query({
      query: () => ({
        url: "/gallery-images",
        method: "GET",
      }),
      providesTags: ["GalleryApi"],
    }),
    getGalleryVideo: builder.query({
      query: () => ({
        url: "/gallery-videos",
        method: "GET",
      }),
      providesTags: ["GalleryApi"],
    }),
  }),
});

export const { useGetGalleryImageQuery ,useGetGalleryVideoQuery} = galleryApi;
