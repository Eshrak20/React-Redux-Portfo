import {FaWhatsapp} from "react-icons/fa";

const FloatingWhatsapp = ({phoneNumber}) => {
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
        <button
            type="button"
            onClick={handleWhatsapp}
            aria-label="Chat on WhatsApp"
            className="fixed bottom-5 right-4 z-[90] hidden h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 lg:flex md:right-5"
        >
            <FaWhatsapp aria-hidden="true" size={25} />
        </button>
    );
};

export default FloatingWhatsapp;
