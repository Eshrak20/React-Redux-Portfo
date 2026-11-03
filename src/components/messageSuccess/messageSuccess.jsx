import { Check, X } from "lucide-react";
import { useEffect } from "react";

export default function MessageSuccess({ show, onClose }) {
  useEffect(() => {
    if (!show) return undefined;

    const timer = window.setTimeout(onClose, 5000);
    return () => window.clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-success-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md border border-border bg-background p-6 text-center sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close confirmation"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X aria-hidden="true" size={20} />
        </button>
        <span className="mx-auto flex h-14 w-14 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
          <Check aria-hidden="true" size={28} />
        </span>
        <h2
          id="contact-success-title"
          className="mt-5 text-2xl font-semibold tracking-tight text-foreground"
        >
          Message sent
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Thank you for reaching out. I’ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 min-h-11 w-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Done
        </button>
      </div>
    </div>
  );
}
