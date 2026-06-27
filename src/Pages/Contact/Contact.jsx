import React, { useState } from "react";
import ContactSection from "@/components/contactSection/contactSection";
import CommonMap from "@/components/commonMap/commonMap";
import {
  useGetSettingsDataQuery,
  useGetSocialLinksQuery,
} from "@/redux/api/homeApi";
import { useCreateContactMessageMutation } from "@/redux/api/contactApi";
import CommonBanner from "@/components/commonBanner/commonBanner";
import connectImg from "../../assets/BannerImages/mainB.jpg";
import GetInTouchSectionSkeleton from "@/components/skeletons/getInTouchSectionSkeleton";
import ContactSectionSkeleton from "@/components/skeletons/contactSectionSkeleton";
import MessageSuccess from "@/components/messageSuccess/messageSuccess";
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
        <CommonMap
          google_map_embed={settingData?.data?.[0]?.google_map_embed}
          loading={settingDataLoading}
        />
      </div>
      <MessageSuccess
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default Contact;
