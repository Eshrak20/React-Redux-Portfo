import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsapp({
  phoneNumber,
}) {
  const handleWhatsapp = () => {
    if (!phoneNumber) return;

    const formattedNumber = phoneNumber.replace(/\D/g, "");

    window.open(
      `https://wa.me/${formattedNumber}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      <motion.button
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 180,
        }}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={handleWhatsapp}
        aria-label="Chat on WhatsApp"
        className="
          group
          fixed
          bottom-24
          right-4
          z-90

          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-full

          bg-[#25D366]

          text-white

          shadow-lg

          transition-all
          duration-300

          hover:shadow-2xl

          dark:border
          dark:border-gray-400

          md:right-5
        "
      >
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          <FaWhatsapp size={28} />
        </motion.div>
      </motion.button>
    </>
  );
}
