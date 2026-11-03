import {
  COMPANY_EMAIL,
  COMPANY_LOCATION,
  COMPANY_PHONE,
} from "@/data/emailGreating";
import { useGetSettingsDataQuery } from "@/redux/api/homeApi";
import { Mail, MapPin, Phone } from "lucide-react";

const FooterContact = () => {
  const { data, isLoading, isError } = useGetSettingsDataQuery();

  const settings = data?.data?.[0] ?? {};

  const email = settings.primary_email || COMPANY_EMAIL;

  const phone =
    settings.primary_phone || settings.secondary_phone || COMPANY_PHONE;

  const address = settings.address || COMPANY_LOCATION;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email,
  )}`;

  if (isLoading) {
    return (
      <div>
        <h3 className="text-base font-semibold tracking-wide text-foreground">
          Contact
        </h3>

        <div className="mt-5 space-y-4">
          <div className="h-12 animate-pulse rounded-lg bg-muted" />
          <div className="h-12 animate-pulse rounded-lg bg-muted" />
          <div className="h-12 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    );
  }

  if (isError) return null;

  return (
    <div>
      <h3 className="text-base font-semibold tracking-wide text-foreground">
        Contact
      </h3>

      <div className="mt-5 space-y-4">
        {/* Email */}
        <a
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Mail size={17} aria-hidden="true" />
          </div>

          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Email
            </p>

            <p className="mt-0.5 break-all text-sm font-medium leading-5 text-foreground transition-colors duration-300 group-hover:text-primary">
              {email}
            </p>
          </div>
        </a>

        {/* Phone */}
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="group flex items-start gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Phone size={17} aria-hidden="true" />
          </div>

          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Phone
            </p>

            <p className="mt-0.5 text-sm font-medium leading-5 text-foreground transition-colors duration-300 group-hover:text-primary">
              {phone}
            </p>
          </div>
        </a>

        {/* Address */}
        <div className="group flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MapPin size={17} aria-hidden="true" />
          </div>

          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Address
            </p>

            <p className="mt-0.5 text-sm font-medium leading-5 text-foreground">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;