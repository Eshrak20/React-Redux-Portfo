import portfolioLogo from "@/assets/title/eg2.png";
import BlogAuthorPanel from "@/Pages/Blogs/DetBlogs/BlogAuthorPanel";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import { getExcerpt } from "@/Pages/Blogs/BlogsCard/blogUtils.js";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

const ProjectAuthorPanel = ({ staff, about, socialLinks = [] }) => {
  const [imageOpen, setImageOpen] = useState(false);
  const authorName = staff?.name || "Eshrak G";
  const authorImage = staff?.image;
  const facebookUrl =
    staff?.facebook_url ||
    socialLinks.find((link) =>
      /facebook/i.test(
        `${link.name || ""} ${link.platform || ""} ${link.icon || ""}`,
      ),
    )?.url ||
    "https://www.facebook.com/eshrakg62";
  const linkedInUrl =
    staff?.linkedin_url ||
    socialLinks.find((link) =>
      /linkedin/i.test(
        `${link.name || ""} ${link.platform || ""} ${link.icon || ""}`,
      ),
    )?.url;
  const portfolioUrl =
    staff?.website || staff?.portfolio_url || "https://e.veringroup.com/about";
  const profileImage = authorImage || portfolioLogo;

  return (
    <>
      <BlogAuthorPanel
        authorName={authorName}
        authorImage={authorImage}
        designation={staff?.designation}
        authorBio={getExcerpt(about?.who_we_are || about?.description || "", 180)}
        facebookUrl={facebookUrl}
        linkedInUrl={linkedInUrl}
        portfolioUrl={portfolioUrl}
        portfolioLogo={portfolioLogo}
        onAuthorImageClick={() => setImageOpen(true)}
      />
      <Lightbox
        open={imageOpen}
        close={() => setImageOpen(false)}
        slides={[{ src: profileImage, alt: `${authorName} profile image` }]}
        plugins={[Zoom]}
      />
    </>
  );
};

export default ProjectAuthorPanel;
