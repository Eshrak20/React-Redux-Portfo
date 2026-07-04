import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Calendar,
  Check,
  Code,
  ExternalLink,
  Heart,
  Link2,
  Mail,
  Share2,
  Sparkles,
  User,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

const BlogPublisher = ({ blog }) => {
  const staff = blog?.staff;
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [showCreditModal, setShowCreditModal] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!staff) {
    return (
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center py-12 border-t border-gray-100 dark:border-gray-800">
          <p className="text-gray-400 dark:text-gray-500 font-medium">
            Author information unavailable.
          </p>
        </div>
      </section>
    );
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(blog.title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + " " + currentUrl)}`,
  };

  const copyToClipboard = (text, type = "link") => {
    navigator.clipboard.writeText(text);
    if (type === "link") {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const authorStats = [
    {
      label: "Role",
      value: staff.designation,
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Dept",
      value: staff.department,
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      label: "Tenure",
      value: staff.years_in_company ? `${staff.years_in_company}y` : null,
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      label: "Identity",
      value: staff.age ? `${staff.age} yrs` : null,
      icon: <User className="w-4 h-4" />,
    },
  ].filter((stat) => stat.value);

  return (
    <>
      <section className="max-w-231.25 mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-sm p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          {/* Author Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
            <img
              src={
                staff.image ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                  staff.name || "User",
                )}`
              }
              alt={staff.name}
              className="w-28 h-28 md:rounded-2xl rounded-md object-cover ring-4 ring-gray-50 dark:ring-gray-800 shadow-sm"
              onError={(e) => {
                e.currentTarget.src =
                  "https://api.dicebear.com/9.x/initials/svg?seed=User";
              }}
            />

            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                Published By
              </span>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {staff.name}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">
                {staff.designation}{" "}
                <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                {staff.department}
              </p>

              {/* SOCIAL / ACTION BUTTONS (RESTORED - UNCHANGED STRUCTURE) */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {staff.email && (
                  <button
                    onClick={() => copyToClipboard(staff.email, "email")}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    {emailCopied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    {emailCopied ? "Email Copied" : "Copy Email"}
                  </button>
                )}

                {staff.website && (
                  <a
                    href={staff.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Portfolio
                  </a>
                )}

         
              </div>
            </div>
          </div>

          {/* Stats (UNCHANGED) */}
          {authorStats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-10">
              {authorStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-4 flex flex-col items-center justify-center gap-1"
                >
                  <div className="text-gray-400 dark:text-gray-500">
                    {stat.icon}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">
                    {stat.label}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Share section (UNCHANGED STRUCTURE + dark fix already OK) */}
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xs">
                <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary" />
                  Spread the word
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Found this useful? Share it with your professional network.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(currentUrl)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  linkCopied
                    ? "bg-white dark:bg-black text-primary dark:text-primary ring-1 ring-primary dark:ring-primary"
                    : "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                }`}
              >
                {linkCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Link2 className="w-4 h-4" />
                )}
                {linkCopied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Developer credit (RESTORED - ONLY DARK FIX) */}
      <div className="flex justify-end">
        <button onClick={() => setShowCreditModal(true)} className="group">
          <h1 className="text-white dark:text-background text-xs">
            Developed by : Fardin Ahmed & Eshrak G
          </h1>
        </button>
      </div>

      {/* Modal (RESTORED - ONLY DARK FIX) */}
      {showCreditModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreditModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="bg-linear-to-r from-primary to-secondary px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart size={20} className="text-white fill-white" />
                  <p className="text-white font-semibold text-lg">
                    Made with passion
                  </p>
                </div>
                <button
                  onClick={() => setShowCreditModal(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Code size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Lead Developer
                    </p>
                    <p className="text-base font-semibold text-gray-800">
                      Fardin Ahmed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Code size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Developer
                    </p>
                    <p className="text-base font-semibold text-gray-800">
                      Eshrak G
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-center">
                    <Sparkles size={14} className="text-primary" />
                    <p className="text-xs text-gray-500">
                      Built with React, Tailwind CSS & Framer Motion
                    </p>
                    <Sparkles size={14} className="text-primary" />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => setShowCreditModal(false)}
                  className="w-full px-4 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default BlogPublisher;
