import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Check, Copy, MessageCircle, Phone} from "lucide-react";
import {useState} from "react";

const BookCallButton = ({phoneNumber, variant = "desktop"}) => {
    const [copyState, setCopyState] = useState("idle");
    const digits = String(phoneNumber || "").replace(/\D/g, "");
    const whatsappNumber = digits.startsWith("0") ? `88${digits}` : digits;
    const isMobile = variant === "mobile";

    const copyNumber = async () => {
        try {
            await navigator.clipboard.writeText(phoneNumber);
            setCopyState("copied");
        } catch (error) {
            console.error("Could not copy the phone number.", error);
            setCopyState("error");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    aria-label="Call or message Eshrak"
                    className={
                        isMobile
                            ? "relative z-10 -mt-7 flex h-[4.25rem] w-[4.25rem] shrink-0 flex-col items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            : "hidden h-11 items-center gap-2 rounded-full border border-primary/40 bg-primary px-5 font-bold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:flex"
                    }
                >
                    <Phone aria-hidden="true" size={isMobile ? 20 : 16} />
                    <span className={isMobile ? "mt-0.5 text-[10px] font-bold" : "text-xs tracking-wide"}>
                        {isMobile ? "Call" : "Let’s talk"}
                    </span>
                </button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-3xl p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Phone aria-hidden="true" size={23} />
                    </div>
                    <DialogTitle className="text-xl font-bold">
                        Let’s connect
                    </DialogTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Choose how you’d like to get in touch.
                    </p>
                </div>
                <p className="my-5 rounded-xl bg-muted px-4 py-3 text-center text-base font-semibold tracking-wide">
                    {phoneNumber}
                </p>
                <div className="grid gap-2.5">
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        <MessageCircle aria-hidden="true" size={18} />
                        WhatsApp
                    </a>
                    <a
                        href={`tel:${digits}`}
                        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <Phone aria-hidden="true" size={18} />
                        Direct call
                    </a>
                    <button
                        type="button"
                        onClick={copyNumber}
                        className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-4 font-semibold transition-colors hover:bg-muted"
                    >
                        {copyState === "copied" ? (
                            <>
                                <Check aria-hidden="true" size={18} />
                                Number copied
                            </>
                        ) : (
                            <>
                                <Copy aria-hidden="true" size={18} />
                                Copy number
                            </>
                        )}
                    </button>
                    {copyState === "error" && (
                        <p role="status" className="text-center text-sm text-destructive">
                            Could not copy the number. Please select it above.
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookCallButton;
