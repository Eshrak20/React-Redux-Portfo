import aboutBg from "@/assets/BannerImages/mainB.jpg";
import CommonBanner from "@/components/commonBanner/commonBanner";
import MiniAboutSkeleton from "@/components/skeletons/MiniAboutSkeleton";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import { useGetGalleryImageQuery } from "@/redux/api/galleryApi";
import { useGetHomeMetricsQuery } from "@/redux/api/homeApi";
import { useEffect } from "react";
import Gallery from "./Gallery/Gallery";
import Management from "./Management/Management";
import MiniAbout from "./MiniAbout/MiniAbout";
import Missions from "./Missions/Missions";

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

      <div className="md:mx-14 xl:mx-64">
        {aboutLoading || homeSectionLoading || !about || !homeSectionData ? (
          <MiniAboutSkeleton />
        ) : (
          <MiniAbout
          about={about}
          metrics={homeSectionData?.data[0].metrics || []}
          />
        )}
        <Management />
        <Gallery galleryImageData={galleryImageData?.data} />
        <Missions about={about?.data[0]} aboutLoading={aboutLoading} />
      </div>
    </>
  );
};

export default About;
