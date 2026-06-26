import React from "react";
import CommonBanner from "@/components/commonBanner/commonBanner";
import testimonialImg from "../../assets/BannerImages/mainB.jpg";
import ChairmanSpeech from "./ChairmanSpeech/ChairmanSpeech";
import CommonBannerSkeleton from "@/components/skeletons/commonBannerSkeleton";
import { useGetTestimonialQuery } from "@/redux/api/testimonialApi";
import TestimonialSection from "../Home/HomeTestimonial/TestimonialSection";

const Testimonial = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const { data: testimonialData, isLoading } = useGetTestimonialQuery();
  

  if (isLoading) {
    return <CommonBannerSkeleton />;
  }

  // ✅ Safety check
  const dataArray = testimonialData?.data || [];

  // ✅ First item → Chairman Speech
  const chairmanData = dataArray[0];

  // ✅ Rest → Testimonials
  const testimonialList = dataArray.slice(1);

  return (
    <div>
      <CommonBanner
        backgroundImage={testimonialImg}
        subtitle="MY Testimonial"
        title="Feedback Us"
        highlight="Excellence"
      />

      {chairmanData && <ChairmanSpeech data={chairmanData} />}

      {/* {testimonialList.length > 0 && <MainTestimonial data={testimonialList} />} */}
      <TestimonialSection testimonial={testimonialData?.data} />
    </div>
  );
};

export default Testimonial;
