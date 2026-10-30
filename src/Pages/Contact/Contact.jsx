import CommonBanner from "@/components/commonBanner/commonBanner";
import CommonMap from "@/components/commonMap/commonMap";
import MessageSuccess from "@/components/messageSuccess/messageSuccess";
import GetInTouchSectionSkeleton from "@/components/skeletons/getInTouchSectionSkeleton";
import { useCreateContactMessageMutation } from "@/redux/api/contactApi";
import {
  useGetSettingsDataQuery,
  useGetSocialLinksQuery,
} from "@/redux/api/homeApi";
import { useState } from "react";
import connectImg from "../../assets/BannerImages/mainB.jpg";
import GetInTouchSection from "./GetInTouchSection/GetInTouchSection";

const Contact = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  // SETTINGS
  const { data: settingData, isLoading: settingDataLoading } =
    useGetSettingsDataQuery();

  // SOCIAL LINKS
  const { data: socialLinksData, isLoading: socialLinksLoading } =
    useGetSocialLinksQuery();

  // CONTACT FORM MUTATION
  const [createContactMessage, { isLoading: contactLoading }] =
    useCreateContactMessageMutation();

  const [showSuccess, setShowSuccess] = useState(false);
  const handleContactSubmit = async (formData) => {
    try {
      await createContactMessage(formData).unwrap();
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to send message!");
    }
  };
  const mapSettings = (() => {
    try {
      const value = settingData?.data?.[0]?.google_map_embed;

      return value ? JSON.parse(value) : {};
    } catch (error) {
      console.error("Invalid map settings:", error);
      return {};
    }
  })();

  return (
    <div>
      {/* CONNECT SECTION */}

      <CommonBanner
        backgroundImage={connectImg}
        subtitle="Connect with me"
        title="Whats App"
        highlight="01829076247"
      />

      {/* CONTACT FORM */}

      {contactLoading || !settingData ? (
        <GetInTouchSectionSkeleton />
      ) : (
        <GetInTouchSection
          InTouchSection
          onSubmit={handleContactSubmit}
          loading={contactLoading}
          settings={settingData}
        />
      )}
      {/* MAP */}
      <div className="-mb-20">
        <div className="-mb-20">
          <CommonMap
            google_map_embed={mapSettings.google_map_embed}
            street_view_embed={mapSettings.street_view_embed}
            loading={settingDataLoading}
          />
        </div>
      </div>
      <MessageSuccess
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default Contact;
