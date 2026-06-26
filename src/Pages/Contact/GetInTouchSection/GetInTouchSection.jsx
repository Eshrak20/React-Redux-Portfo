import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  Send,
  MapPin,
  ArrowRight,
} from "lucide-react";

const GetInTouchSection = ({ onSubmit, loading, settings }) => {
  const embedUrl = settings?.data?.[0]?.google_map_embed;
  const data = settings?.data?.[0];

  const mapLink = embedUrl
    ? embedUrl.replace("/maps/embed?", "/maps?")
    : "#";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputWrapperClasses = (fieldName) => `
    relative group transition-all duration-300 border-b-2
    ${
      focusedField === fieldName
        ? "border-primary"
        : "border-gray-200 dark:border-slate-700"
    }
  `;

  return (
    <section
      id="submit"
      className="relative py-24 bg-[#faf9f6] dark:bg-slate-950 overflow-hidden"
    >
      {/* Background text */}
      <div className="absolute top-10 right-[-5%] text-[18vw] font-black text-black/[0.03] dark:text-white/[0.03] select-none leading-none pointer-events-none uppercase">
        Inquiry
      </div>

      <div className="container mx-auto md:px-6 relative z-10">
        <div className="bg-white dark:bg-slate-900 md:rounded-[40px] md:shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-slate-800">
          
          {/* LEFT FORM */}
          <div className="lg:w-3/5 p-8 md:p-16 lg:p-20">
            
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-primary"></span>
                <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">
                  Write to us
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white">
                Send a <span className="italic text-primary">Message</span>
              </h2>
            </header>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12"
            >
              {/* INPUT FIELD FACTORY */}
              {[
                { name: "name", icon: User, label: "Full Name", type: "text" },
                { name: "email", icon: Mail, label: "Email Address", type: "email" },
                { name: "phone", icon: Phone, label: "Phone Number", type: "tel" },
                { name: "subject", icon: BookOpen, label: "Subject", type: "text" },
              ].map((field) => (
                <div key={field.name} className={inputWrapperClasses(field.name)}>
                  <label
                    className={`absolute flex items-center gap-2 transition-all duration-300 ${
                      formData[field.name] || focusedField === field.name
                        ? "-top-6 text-[10px] text-primary font-black uppercase tracking-widest"
                        : "top-3 text-gray-400 dark:text-slate-500"
                    }`}
                  >
                    <field.icon size={14} /> {field.label}
                  </label>

                  <input
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    type={field.type}
                    required
                    className="w-full bg-transparent py-3 outline-none text-slate-800 dark:text-white"
                  />
                </div>
              ))}

              {/* MESSAGE */}
              <div className={`md:col-span-2 ${inputWrapperClasses("message")}`}>
                <label
                  className={`absolute flex items-center gap-2 transition-all duration-300 ${
                    formData.message || focusedField === "message"
                      ? "-top-6 text-[10px] text-primary font-black uppercase tracking-widest"
                      : "top-3 text-gray-400 dark:text-slate-500"
                  }`}
                >
                  <MessageSquare size={14} /> Your Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows="3"
                  required
                  className="w-full bg-transparent py-3 outline-none text-slate-800 dark:text-white resize-none"
                />
              </div>

              {/* SUBMIT */}
              <div className="md:col-span-2 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-black text-white rounded-full overflow-hidden transition-all duration-500 shadow-lg disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-3 font-bold tracking-[0.2em] text-xs">
                    {loading ? "PROCESSING..." : "SUBMIT INQUIRY"}
                    <Send
                      size={16}
                      className={`transition-transform duration-300 ${
                        loading
                          ? "animate-pulse"
                          : "group-hover:translate-x-1 group-hover:-translate-y-1"
                      }`}
                    />
                  </span>

                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </div>
            </form>
          </div>

          {/* RIGHT INFO */}
          <div className="lg:w-2/5 bg-slate-900 dark:bg-black p-8 md:p-16 lg:p-20 text-white relative overflow-hidden flex flex-col justify-between">
            
            {/* glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 blur-[100px]" />

            <div className="relative z-10">
              <h3 className="text-3xl font-serif mb-12">
                Contact <span className="text-primary">Details</span>
              </h3>

              {[
                {
                  icon: Phone,
                  label: "Call Anytime",
                  value: data?.primary_phone,
                  href: `tel:${data?.primary_phone}`,
                },
                {
                  icon: Mail,
                  label: "Email Support",
                  value: data?.primary_email,
                  href: `mailto:${data?.primary_email}`,
                },
                {
                  icon: MapPin,
                  label: "MY Location",
                  value: data?.address,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group mb-10">
                  <div className="w-14 h-14 flex items-center justify-center rounded-md md:rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all">
                    <item.icon
                      size={22}
                      className="text-primary group-hover:text-white"
                    />
                  </div>

                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
                      {item.label}
                    </p>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-medium max-w-[220px]">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* bottom */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <p className="italic text-white/50 text-sm mb-6">
                "Building spaces where luxury meets comfort."
              </p>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:opacity-80"
              >
                View on Maps <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;