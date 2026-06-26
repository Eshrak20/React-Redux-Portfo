import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import contactImg from "../../assets/BannerImages/Contact.jpg";

const platformIcons = {
  instagram: <Instagram size={18} />,
  facebook: <Facebook size={18} />,
  twitter: <Twitter size={18} />,
  linkedin: <Linkedin size={18} />,
  youtube: <Youtube size={18} />,
  whatsapp: <MessageSquare size={18} />,
  default: <ExternalLink size={18} />,
};

const ContactSection = ({ settings, socials }) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const data = settings?.data?.[0];

  const sortedSocials = useMemo(() => {
    if (!socials?.data) return [];
    return [...socials.data].sort(
      (a, b) => Number(a.position) - Number(b.position)
    );
  }, [socials]);

  const getPlatformIcon = (platform) =>
    platformIcons[platform?.toLowerCase()] || platformIcons.default;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden font-lato bg-gray-50 dark:bg-slate-950"
    >
      {/* PARALLAX BACKGROUND */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-10 dark:opacity-20 grayscale"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${contactImg})` }}
        />
        <div className="absolute inset-0 bg-white/50 dark:bg-black/60 backdrop-blur-sm" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT */}
          <div className="order-2 lg:order-1 w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-8 md:w-12 bg-primary"></span>
              <span className="text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase text-primary">
                Get In Touch
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight text-gray-900 dark:text-white mb-6">
              Ready to start your <br />
              <span className="italic font-serif text-primary">
                next chapter
              </span>
              ?
            </h2>

            {/* CONTACT CARDS */}
            <div className="flex flex-col gap-4 mb-10 max-w-lg">
              {[
                {
                  label: "Email",
                  val: data?.primary_email,
                  icon: <Mail size={20} />,
                },
                {
                  label: "Phone",
                  val: data?.primary_phone,
                  icon: <Phone size={20} />,
                },
                {
                  label: "Location",
                  val: data?.address,
                  icon: <MapPin size={20} />,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start sm:items-center p-4 md:p-5 rounded-md md:rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {item.icon}
                  </div>

                  <div className="ml-4 md:ml-5 overflow-hidden">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-light wrap-break-word">
                      {item.val}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SOCIALS */}
            <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-wrap gap-3 md:gap-4">
              {sortedSocials.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  whileHover={{ y: -5 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary transition-colors shadow-sm"
                >
                  {getPlatformIcon(social.platform)}
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2 flex justify-center w-full"
          >
            <div className="relative z-10 overflow-hidden rounded-md md:rounded-2xl shadow-xl w-full aspect-4/5 md:aspect-3/4 group border border-gray-100 dark:border-slate-800">
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${contactImg})` }}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                <p className="text-white text-lg md:text-2xl font-light italic">
                  "Excellence is not an act, but a habit."
                </p>
                <div className="h-1 w-10 md:w-12 bg-primary mt-3 md:mt-4" />
              </div>
            </div>

            {/* BADGE */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-2 md:-right-8 bg-primary px-4 py-3 md:px-8 md:py-5 rounded-md md:rounded-2xl shadow-lg z-20"
            >
              <p className="text-white font-bold text-sm md:text-xl">
                Available
              </p>
              <p className="text-white/90 text-[8px] md:text-[10px] uppercase tracking-widest font-black mt-1">
                For Partnerships
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;