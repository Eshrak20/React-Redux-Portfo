import {
    COMPANY_EMAIL,
    COMPANY_LOCATION,
    COMPANY_PHONE,
} from "@/data/emailGreating";
import { useGetSettingsDataQuery } from "@/redux/api/homeApi";
import { Mail, MapPin, Phone } from "lucide-react";

const FooterContact = () => {
  const { data, isLoading, isError } = useGetSettingsDataQuery();

  const settings = data?.data ?? {};

  const email = settings.email || COMPANY_EMAIL;
  const phone = settings.phone || COMPANY_PHONE;
  const address = settings.address || COMPANY_LOCATION;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email,
  )}`;

  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-bold text-foreground">
          Contact
        </h3>

        <div className="mt-6 space-y-5">
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
      <h3 className="text-xl font-bold text-foreground">
        Contact
      </h3>

      <div className="mt-6 space-y-6">
        {/* Email */}
        <a
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Mail size={20} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email
            </p>

            <p className="mt-1 break-all text-sm text-foreground transition-colors duration-300 group-hover:text-primary">
              {email}
            </p>
          </div>
        </a>

        {/* Phone */}
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="group flex items-start gap-4"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Phone size={20} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Phone
            </p>

            <p className="mt-1 text-sm text-foreground transition-colors duration-300 group-hover:text-primary">
              {phone}
            </p>
          </div>
        </a>

        {/* Address */}
        <div className="group flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin size={20} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Address
            </p>

            <p className="mt-1 text-sm text-foreground">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;