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
        <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
          Contact
        </h3>

        <div className="mt-6 space-y-6 lg:mt-8 lg:space-y-8">
          <div className="h-16 animate-pulse rounded-lg bg-muted lg:h-20" />
          <div className="h-16 animate-pulse rounded-lg bg-muted lg:h-20" />
          <div className="h-16 animate-pulse rounded-lg bg-muted lg:h-20" />
        </div>
      </div>
    );
  }

  if (isError) return null;

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
        Contact
      </h3>

      <div className="mt-7 space-y-7 lg:mt-9 lg:space-y-9">
        {/* Email */}
        <a
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 lg:gap-5"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground lg:h-16 lg:w-16 lg:rounded-2xl">
            <Mail size={24} className="lg:h-7 lg:w-7" />
          </div>

          <div className="min-w-0 pt-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground lg:text-base">
              Email
            </p>

            <p className="mt-1 break-all text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-primary lg:text-xl xl:text-2xl">
              {email}
            </p>
          </div>
        </a>

        {/* Phone */}
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="group flex items-start gap-4 lg:gap-5"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground lg:h-16 lg:w-16 lg:rounded-2xl">
            <Phone size={24} className="lg:h-7 lg:w-7" />
          </div>

          <div className="min-w-0 pt-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground lg:text-base">
              Phone
            </p>

            <p className="mt-1 text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-primary lg:text-xl xl:text-2xl">
              {phone}
            </p>
          </div>
        </a>

        {/* Address */}
        <div className="group flex items-start gap-4 lg:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary lg:h-16 lg:w-16 lg:rounded-2xl">
            <MapPin size={24} className="lg:h-7 lg:w-7" />
          </div>

          <div className="min-w-0 pt-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground lg:text-base">
              Address
            </p>

            <p className="mt-1 text-lg font-medium leading-relaxed text-foreground lg:text-xl xl:text-2xl">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;