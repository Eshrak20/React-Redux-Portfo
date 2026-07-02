import { useGetSettingsDataQuery } from "@/redux/api/homeApi";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Phone, X } from "lucide-react";
import { useState } from "react";

const PhoneModal = ({ open, onClose }) => {
  const [copied, setCopied] = useState(false);

  const { data } = useGetSettingsDataQuery();

  const phoneNumber = data?.data?.phone ?? "";

  const handleCopy = async () => {
    if (!phoneNumber) return;

    await navigator.clipboard.writeText(phoneNumber);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-border p-2 hover:bg-muted"
            >
              <X size={18} />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Phone size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Contact Number
            </h3>

            <p className="mt-2 text-muted-foreground">
              {phoneNumber}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-primary-foreground"
              >
                <Phone size={18} />
                Call
              </a>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 rounded-xl border border-primary/20 py-3 text-primary"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PhoneModal;