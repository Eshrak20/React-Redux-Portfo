import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Check, Copy, MessageCircle, Phone } from "lucide-react";
import { useState } from 'react';
import { CallSignalIcon } from "./AnimatedIcons";

// const phoneNumber = "+8801309176398";

const BookCallButton = ({phoneNumber}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative hidden h-11 items-center gap-2 overflow-hidden rounded-full border border-primary/40 bg-transparent px-5 font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white dark:border-gray-400 dark:bg-primary dark:text-white dark:hover:bg-transparent md:flex"
        >
          <CallSignalIcon />
          <span className="text-xs uppercase tracking-wider">Book a Call</span>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="w-[90%] max-w-sm overflow-hidden rounded-3xl p-6 sm:max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Phone className="text-primary" size={24} />
          </div>
          <DialogTitle className="text-xl font-bold">Book a Call</DialogTitle>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Let’s connect directly.</p>
        </div>

        <div className="my-6 rounded-xl border border-dashed border-primary/20 bg-primary/5 p-4 text-center">
          <p className="text-xs uppercase text-gray-400">Phone Number</p>
          <h3 className="mt-1 text-lg font-bold tracking-tight">{phoneNumber}</h3>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleCopy} variant="outline">
            {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Number</>}
          </Button>
          <Button onClick={() => window.location.href = `tel:${phoneNumber}`} className="bg-primary text-white">
            <Phone size={16} /> Direct Call
          </Button>
          <Button onClick={() => window.open(`https://wa.me/${phoneNumber.replace("+", "")}`, "_blank")} className="bg-[#25D366] text-white hover:bg-[#20bd5a]">
            <MessageCircle size={16} /> WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper component
const Button = ({ children, onClick, className = "", variant = "solid" }) => {
  const base = "flex w-full items-center justify-center gap-2 rounded-xl p-3 font-medium transition-all hover:opacity-90 active:scale-95";
  const variants = variant === "outline" ? "border border-gray-200 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800" : "";
  return (
    <button onClick={onClick} className={`${base} ${variants} ${className}`}>
      {children}
    </button>
  );
};

export default BookCallButton;