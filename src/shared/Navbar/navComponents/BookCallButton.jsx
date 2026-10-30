
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Check,
    Copy,
    MessageCircle,
    Phone
} from "lucide-react";

import { useState } from "react";

const BookCallButton = ({
    phoneNumber,
    variant = "desktop",
}) => {
    const [copyState, setCopyState] = useState("idle");

    const digits = String(phoneNumber || "").replace(/\D/g, "");

    const whatsappNumber = digits.startsWith("0")
        ? `88${digits}`
        : digits;

    const isMobile = variant === "mobile";
    const hasPhoneNumber = Boolean(digits);

    const copyNumber = async () => {
        if (!phoneNumber) return;

        try {
            await navigator.clipboard.writeText(String(phoneNumber));
            setCopyState("copied");
        } catch (error) {
            console.error("Could not copy the phone number.", error);
            setCopyState("error");
        }
    };

    return (
        <Dialog
            onOpenChange={(open) => {
                if (open) setCopyState("idle");
            }}
        >
            <DialogTrigger asChild>
                <button
                    type="button"
                    aria-label="Call or message Eshrak"
                    className={
                        isMobile
                            ? `
                                relative z-10 -mt-7 flex h-[4.25rem]
                                w-[4.25rem] shrink-0 flex-col
                                items-center justify-center rounded-full
                                border-4 border-background bg-primary
                                text-primary-foreground shadow-lg
                                shadow-primary/25 transition-all
                                hover:scale-105 active:scale-95
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary
                            `
                            : `
                                hidden h-11 items-center gap-2
                                rounded-full border border-primary/20
                                bg-primary px-5 text-white shadow-sm
                                shadow-primary/10 transition-all
                                hover:-translate-y-0.5 hover:bg-primary/90
                                hover:shadow-md hover:shadow-primary/20
                                active:translate-y-0
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary
                                focus-visible:ring-offset-2
                                lg:flex
                            `
                    }
                >
                    <Phone
                        aria-hidden="true"
                        size={isMobile ? 20 : 16}
                    />

                    <span
                        className={
                            isMobile
                                ? "mt-0.5 text-[10px] font-bold"
                                : "text-xs font-bold tracking-wide"
                        }
                    >
                        {isMobile ? "Call" : "Let's talk"}
                    </span>
                </button>
            </DialogTrigger>

            <DialogContent
                showCloseButton={false}
                className="
                    fixed left-1/2 top-1/2
                    grid w-[calc(100%-2rem)]
                    max-w-[400px] -translate-x-1/2
                    -translate-y-1/2 gap-0
                    overflow-y-auto overscroll-contain
                    rounded-3xl border border-border/60
                    bg-background p-6 shadow-2xl
                    max-h-[85dvh]
                    sm:p-7
                "
            >
                {/* Header */}
                <div className="relative flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Phone size={26} />
                    </div>

                    <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                        Let's connect
                    </DialogTitle>

                    <DialogDescription className="mt-2 max-w-[260px] text-sm leading-relaxed">
                        Have a project in mind? Let's discuss how we can work together.
                    </DialogDescription>
                </div>

                {/* Phone number */}
                <div className="my-6 rounded-2xl border border-border/70 bg-muted/50 px-4 py-4 text-center">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Contact number
                    </p>

                    <p className="text-lg font-bold tracking-wider">
                        {phoneNumber || "Number unavailable"}
                    </p>
                </div>

                {/* Actions */}
                <div className="grid gap-3">
                    <a
                        href={
                            hasPhoneNumber
                                ? `https://wa.me/${whatsappNumber}`
                                : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!hasPhoneNumber}
                        className="
                            flex min-h-12 items-center justify-center
                            gap-2.5 rounded-xl bg-[#25D366]
                            px-4 text-sm font-bold text-white
                            transition-all hover:brightness-95
                            active:scale-[0.98]
                            aria-disabled:pointer-events-none
                            aria-disabled:opacity-50
                        "
                    >
                        <MessageCircle size={19} />
                        Chat on WhatsApp
                    </a>

                    <a
                        href={
                            hasPhoneNumber
                                ? `tel:${digits}`
                                : undefined
                        }
                        aria-disabled={!hasPhoneNumber}
                        className="
                            flex min-h-12 items-center justify-center
                            gap-2.5 rounded-xl bg-primary px-4
                            text-sm font-bold text-primary-foreground
                            transition-all hover:bg-primary/90
                            active:scale-[0.98]
                            aria-disabled:pointer-events-none
                            aria-disabled:opacity-50
                        "
                    >
                        <Phone size={18} />
                        Make a direct call
                    </a>

                    <button
                        type="button"
                        onClick={copyNumber}
                        disabled={!hasPhoneNumber}
                        className="
                            flex min-h-12 items-center justify-center
                            gap-2.5 rounded-xl border border-border
                            px-4 text-sm font-bold
                            transition-colors hover:bg-muted
                            active:scale-[0.98] disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {copyState === "copied" ? (
                            <>
                                <Check size={18} className="text-green-500" />
                                Number copied
                            </>
                        ) : (
                            <>
                                <Copy size={17} />
                                Copy phone number
                            </>
                        )}
                    </button>

                    {copyState === "error" && (
                        <p
                            role="alert"
                            className="text-center text-xs text-destructive"
                        >
                            Could not copy the number. Please try again.
                        </p>
                    )}
                </div>

                <p className="mt-5 text-center text-xs text-muted-foreground">
                    Usually available for project discussions.
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default BookCallButton;
