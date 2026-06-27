import React, { useEffect } from "react";
import aboutBg from "@/assets/BannerImages/mainB.jpg";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import Missions from "./Missions/Missions";
import Gallery from "./Gallery/Gallery";
import Management from "./Management/Management";
import { useGetHomeMetricsQuery } from "@/redux/api/homeApi";
import MiniAboutSkeleton from "@/components/skeletons/MiniAboutSkeleton";
import MiniAbout from "./MiniAbout/MiniAbout";
import { useGetGalleryImageQuery } from "@/redux/api/galleryApi";
import CommonBanner from "@/components/commonBanner/commonBanner";

const About = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { data: about, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: homeSectionData, isLoading: homeSectionLoading } =
    useGetHomeMetricsQuery();
  const { data: galleryImageData } = useGetGalleryImageQuery();

  return (
    <>
      <CommonBanner
        backgroundImage={aboutBg}
        subtitle="MY Info"
        title="About ME"
        highlight="Eshràk G"
      />
      <Management />

      <div className="md:mx-14 xl:mx-64">
        {aboutLoading || homeSectionLoading || !about || !homeSectionData ? (
          <MiniAboutSkeleton />
        ) : (
          <MiniAbout
            about={about}
            metrics={homeSectionData?.data[0].metrics || []}
          />
        )}
        <Missions about={about?.data[0]} aboutLoading={aboutLoading} />
        <Gallery galleryImageData={galleryImageData?.data} />
      </div>
    </>
  );
};

export default About;
