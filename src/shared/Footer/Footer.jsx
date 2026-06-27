import { useState } from "react";
import {
  Building2,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import logoL from "@/assets/title/eg1.png";
import logoD from "@/assets/title/eg2.png";
import { COMPANY_EMAIL, COMPANY_PHONE, GMAIL_BODY, GMAIL_SUBJECT } from "@/data/emailGreating";


const HEAD_OFFICE = "Mohammadpur, Dhaka";
const WORK_HOUR = "Available 24/7";



const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
  },
];

const socialIconByPlatform = {
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  x: Twitter,
};

const footerSocialPlatforms = new Set([
  "facebook",
  "linkedin",
  "instagram",
  "twitter",
  "x",
]);

const footerTabs = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Testimonial",
    path: "/testimonial",
  },
  {
    label: "Contact",
    path: "/contact",
  },
  {
    label: "Blogs",
    path: "/blogs",
  },
];

const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  COMPANY_EMAIL,
)}&su=${encodeURIComponent(GMAIL_SUBJECT)}&body=${encodeURIComponent(
  GMAIL_BODY,
)}`;

const phoneCallNumber = COMPANY_PHONE .replace(/\s/g, "");

const isMobileDevice = () => {
  if (typeof window === "undefined") return false;

  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(navigator.userAgent) || window.innerWidth < 768;
};

const Footer = ({ socialLinksData }) => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isMobilePhoneModal, setIsMobilePhoneModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const footerSocialLinks = socialLinksData?.data?.length
    ? [...socialLinksData.data]
        .filter((item) =>
          footerSocialPlatforms.has(item.platform?.toLowerCase()),
        )
        .sort((a, b) => Number(a.position) - Number(b.position))
        .map((item) => ({
          name: item.platform || item.name,
          icon: socialIconByPlatform[item.platform?.toLowerCase()] || Twitter,
          url: item.url,
        }))
        .filter((item) => item.url)
    : socialLinks;

  const handleEmailClick = () => {
    window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
  };

  const handlePhoneClick = () => {
    setIsCopied(false);
    setIsMobilePhoneModal(isMobileDevice());
    setIsPhoneModalOpen(true);
  };

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY_PHONE);
      setIsCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = COMPANY_PHONE;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setIsCopied(true);
    }

    setTimeout(() => {
      setIsCopied(false);
    }, 1800);
  };

  const handleCallNumber = () => {
    window.location.href = `tel:${phoneCallNumber}`;
  };

  const handleQuickLinkClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-background px-4 py-10 text-foreground sm:px-6 md:px-18 xl:px-8">
        <div
          className="
            mx-auto grid max-w-7xl gap-10
            md:grid-cols-2
            lg:grid-cols-[1fr_0.65fr_1fr]
            lg:items-start
            lg:gap-14
            xl:gap-20
          "
        >
          {/* Left Part */}
          <div className="space-y-5">
            <div>
              <div className="-ml-4">
                <img
                  src={logoL}
                  alt="iLabs360 Logo"
                  className="h-44 w-auto dark:hidden"
                />

                <img
                  src={logoD}
                  alt="iLabs360 Logo"
                  className="hidden h-44 w-auto dark:block"
                />
              </div>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                We build modern websites, mobile apps, AI-powered solutions, and
                digital products that help businesses grow faster with clean
                design and reliable technology.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {footerSocialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={`${item.name}-${item.url}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label={item.name}
                    className="
                      flex h-10 w-10 items-center justify-center rounded-full
                      border border-primary bg-transparent text-primary
                      transition-all duration-300 hover:bg-primary hover:text-primary-foreground
                    "
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Middle Part */}
          <div
            className="
              md:w-full md:justify-self-start
              lg:max-w-52 lg:justify-self-center
            "
          >
            <h3 className="text-xl font-extrabold tracking-tight text-primary">
              Quick Links
            </h3>

            <nav
              className="
                mt-5 grid grid-cols-1 gap-x-8 gap-y-4
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-1
                lg:gap-y-4
              "
            >
              {footerTabs.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleQuickLinkClick}
                  className="
                    group flex w-fit items-center gap-2 text-sm font-semibold
                    text-muted-foreground transition-all duration-300
                    hover:translate-x-1 hover:text-primary
                  "
                >
                  <ChevronRight
                    size={16}
                    strokeWidth={2.4}
                    className="
                      text-primary/70 transition-colors duration-300
                      group-hover:text-primary
                    "
                  />

                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Part */}
          <div className="rounded-2xl border border-border bg-card p-6 md:col-span-2 lg:col-span-1">
            <div className="space-y-6">
              {/* <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                   Address
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-foreground">
                    {HEAD_OFFICE}
                  </h3>
                </div>
              </div> */}

              <div className="border-t border-border" />

              {/* Email */}
              <button
                type="button"
                onClick={handleEmailClick}
                className="flex w-full items-start gap-4 text-left transition-colors hover:text-primary"
              >
                <div className="mt-1 text-primary">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-medium break-all">
                    {COMPANY_EMAIL}
                  </p>
                </div>
              </button>

              <div className="border-t border-border" />

              {/* Phone */}
              <button
                type="button"
                onClick={handlePhoneClick}
                className="flex w-full items-start gap-4 text-left transition-colors hover:text-primary"
              >
                <div className="mt-1 text-primary">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium">{COMPANY_PHONE}</p>
                </div>
              </button>

              <div className="border-t border-border" />

            
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-3 border-t border-border pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tashrif Hasan Jilan Eshrak. All rights reserved.</p>

          {/* <div className="flex flex-wrap gap-4">
            <Link
              to="/privacy-policy"
              className="transition hover:text-primary"
            >
              Privacy Policy
            </Link>

            <Link to="/terms" className="transition hover:text-primary">
              Terms
            </Link>

            <Link to="/contact" className="transition hover:text-primary">
              Contact
            </Link>
          </div> */}
        </div>
      </footer>

      {/* Phone Modal */}
      <AnimatePresence>
        {isPhoneModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
            <motion.button
              type="button"
              aria-label="Close phone modal overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhoneModalOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="
                relative z-10 w-full max-w-sm rounded-2xl border border-border
                bg-background p-5 text-foreground shadow-2xl
              "
            >
              <button
                type="button"
                onClick={() => setIsPhoneModalOpen(false)}
                aria-label="Close modal"
                className="
                  absolute right-4 top-4 flex h-8 w-8 items-center justify-center
                  rounded-full border border-border text-muted-foreground
                  transition hover:bg-muted hover:text-foreground
                "
              >
                <X size={16} />
              </button>

              <div className="pr-8">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone size={20} />
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Contact Number
                </p>

                <h3 className="mt-1 text-xl font-extrabold text-primary">
                  {COMPANY_PHONE}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {isMobilePhoneModal
                    ? "You can call directly or copy the number."
                    : "Copy the number and use it from your preferred device."}
                </p>
              </div>

              <div
                className={`
                  mt-5 grid gap-3
                  ${isMobilePhoneModal ? "grid-cols-2" : "grid-cols-1"}
                `}
              >
                {isMobilePhoneModal && (
                  <button
                    type="button"
                    onClick={handleCallNumber}
                    className="
                      flex items-center justify-center gap-2 rounded-xl
                      bg-primary px-4 py-3 text-sm font-bold text-primary-foreground
                      transition hover:bg-primary/90
                    "
                  >
                    <Phone size={17} />
                    Call
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="
                    flex items-center justify-center gap-2 rounded-xl
                    border border-primary/30 bg-transparent px-4 py-3
                    text-sm font-bold text-primary transition
                    hover:bg-primary/10
                  "
                >
                  {isCopied ? <Check size={17} /> : <Copy size={17} />}
                  {isCopied
                    ? "Copied"
                    : isMobilePhoneModal
                      ? "Copy"
                      : "Copy Number"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
