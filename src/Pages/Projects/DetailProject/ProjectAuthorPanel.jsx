
import portfolioLogo from "@/assets/profile/EshrakG.JPG";
import { getExcerpt } from "@/Pages/Blogs/BlogsCard/blogUtils.js";
import BlogAuthorPanel from "@/Pages/Blogs/DetBlogs/BlogAuthorPanel";

const ProjectAuthorPanel = ({ staff, about, socialLinks = [] }) => {
    const authorName = staff?.name || "Eshrak G";

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
        staff?.website ||
        staff?.portfolio_url ||
        "https://e.veringroup.com/about";

    return (
        <BlogAuthorPanel
            authorName={authorName}
            authorImage={staff?.image}
            designation={staff?.designation}
            authorBio={getExcerpt(
                about?.who_we_are || about?.description || "",
                180,
            )}
            facebookUrl={facebookUrl}
            linkedInUrl={linkedInUrl}
            portfolioUrl={portfolioUrl}
            portfolioLogo={portfolioLogo}
        />
    );
};

export default ProjectAuthorPanel;
