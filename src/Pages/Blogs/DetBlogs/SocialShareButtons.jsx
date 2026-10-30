import {Check, Copy} from "lucide-react";
import {useState} from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import {getExcerpt} from "@/Pages/Blogs/BlogsCard/blogUtils.js";

const SocialShareButtons = ({
  title = "",
  summary = "",
  url = window.location.href,
  vertical = false,
  grid = false,
}) => {
  const [copyState, setCopyState] = useState("idle");
  const shareDescription = getExcerpt(summary, 220);
  const shareText = [title, shareDescription].filter(Boolean).join(" — ");
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);
  const buttonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  const shareLinks = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      icon: FaFacebookF,
      className: "hover:border-[#1877F2] hover:bg-[#1877F2]",
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: FaLinkedinIn,
      className: "hover:border-[#0A66C2] hover:bg-[#0A66C2]",
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      icon: FaXTwitter,
      className: "hover:border-slate-950 hover:bg-slate-950",
    },
    {
      label: "Share on WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: FaWhatsapp,
      className: "hover:border-[#25D366] hover:bg-[#25D366]",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 3000);
    }
  };

  return (
    <div>
      <div
        className={`${
          vertical
            ? "flex flex-col"
            : grid
              ? "grid grid-cols-3"
              : "flex flex-wrap"
        } gap-2`}
      >
        {shareLinks.map(({label, href, icon: Icon, className: hoverClass}) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`${buttonClass} ${hoverClass}`}
          >
            <Icon aria-hidden="true" size={18} />
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copyState === "copied" ? "Link copied" : "Copy article link"}
          title={copyState === "copied" ? "Link copied" : "Copy article link"}
          className={buttonClass}
        >
          {copyState === "copied" ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
      {copyState === "error" && (
        <p role="status" className="mt-2 max-w-36 text-xs text-destructive">
          Could not copy the link. Please copy the page URL.
        </p>
      )}
      {copyState === "copied" && (
        <span role="status" className="sr-only">
          Article link copied
        </span>
      )}
    </div>
  );
};

export default SocialShareButtons;
