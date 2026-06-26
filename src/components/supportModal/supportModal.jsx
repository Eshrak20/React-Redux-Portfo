import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Phone } from "lucide-react";

const SupportModal = ({ isOpen, onClose, phoneNumber = "+1 234 567 890" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
  };

  return (
    
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white md:rounded-2xl rounded-md md:shadow-2xl overflow-hidden p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-gray-500 text-sm mb-6">
                MY team is available to help you with your inquiries.
              </p>

              {/* Number Display & Copy Button */}
              <div className="flex items-center gap-2 p-1 bg-gray-50 border border-gray-100 rounded-xl">
                <div className="flex-1 font-mono font-medium text-lg py-3 px-4 text-black">
                  {phoneNumber}
                </div>
                <button
                  onClick={handleCopy}
                  className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                    copied 
                    ? "bg-secondary text-white" 
                    : "bg-primary text-white hover:brightness-110"
                  }`}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span className="text-xs font-bold uppercase tracking-wider pr-1">
                    {copied ? "Copied" : "Copy"}
                  </span>
                </button>
              </div>
              
              <a 
                href={`tel:${phoneNumber}`} 
                className="block mt-4 text-primary text-sm font-bold hover:underline"
              >
                Call Now Directly
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;