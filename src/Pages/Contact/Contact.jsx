import CommonMap from "@/components/commonMap/commonMap";
import MessageSuccess from "@/components/messageSuccess/messageSuccess";
import GetInTouchSectionSkeleton from "@/components/skeletons/getInTouchSectionSkeleton";
import { useCreateContactMessageMutation } from "@/redux/api/contactApi";
import { useGetSettingsDataQuery } from "@/redux/api/homeApi";
import { ArrowDown, Mail, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import GetInTouchSection from "./GetInTouchSection/GetInTouchSection";

const Contact = () => {
  const { data: settingData, isLoading: settingDataLoading, isError } =
    useGetSettingsDataQuery();
  const [createContactMessage, { isLoading: contactLoading }] =
    useCreateContactMessageMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleContactSubmit = async (formData) => {
    setSubmitError("");
    try {
      await createContactMessage(formData).unwrap();
      setShowSuccess(true);
      return true;
    } catch (error) {
      console.error("Failed to send contact message:", error);
      setSubmitError(
        error?.data?.message ||
          "Your message could not be sent. Please try again in a moment.",
      );
      return false;
    }
  };

  let mapSettings = {};
  const serializedMapSettings =
    settingData?.data?.[0]?.google_map_embed;

  if (serializedMapSettings) {
    try {
      mapSettings = JSON.parse(serializedMapSettings);
    } catch (error) {
      console.error("Invalid map settings:", error);
    }
  }

  const settings = settingData?.data?.[0];

  return (
    <div className="min-w-0 bg-background">
  

      {settingDataLoading ? (
        <GetInTouchSectionSkeleton />
      ) : isError ? (
        <p
          role="alert"
          className="mx-auto max-w-7xl px-4 py-12 text-sm text-destructive sm:px-6 lg:px-8"
        >
          We couldn’t load the contact details. You can still send a message
          using the form below.
        </p>
      ) : null}

      {!settingDataLoading && (
        <GetInTouchSection
          onSubmit={handleContactSubmit}
          loading={contactLoading}
          settings={settingData}
          submitError={submitError}
        />
      )}

      <CommonMap
        google_map_embed={mapSettings.google_map_embed}
        street_view_embed={mapSettings.street_view_embed}
        loading={settingDataLoading}
      />

      <MessageSuccess
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
          <header className="relative overflow-hidden border-b border-border bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl">
              Let’s make something
              <span className="block text-primary">meaningful together.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Tell me what you’re planning, what you need, or what you’d like to
              explore. I’m always open to a thoughtful conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Send an inquiry
                <ArrowDown aria-hidden="true" size={16} />
              </a>
              {settings?.primary_phone && (
                <a
                  href={`https://wa.me/${settings.primary_phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <MessageCircle aria-hidden="true" size={17} />
                  WhatsApp
                </a>
              )}
              {settings?.primary_email && (
                <a
                  href={`mailto:${settings.primary_email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Mail aria-hidden="true" size={17} />
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Contact;
