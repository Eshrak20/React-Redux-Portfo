import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const GalleryDetProject = ({ project_gallery = [] }) => {
  const fallbackGallery = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  ];

  const gallery = project_gallery?.length > 0 ? project_gallery : fallbackGallery;

  return (
    <div className="w-full min-w-0 relative overflow-hidden rounded-2xl shadow-lg">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1000} // Smooth crossfade transition
        autoplay={{
          delay: 3000, // 3 seconds
          disableOnInteraction: false,
        }}
        loop={true}
        allowTouchMove={false} // Disable user dragging
        slidesPerView={1}
        className="aspect-[16/10] w-full"
      >
        {gallery.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GalleryDetProject;