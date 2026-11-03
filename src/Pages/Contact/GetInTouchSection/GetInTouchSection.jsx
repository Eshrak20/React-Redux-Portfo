import {
  ArrowUpRight,
  BookOpen,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";

const fields = [
  { name: "name", icon: User, label: "Full name", type: "text" },
  { name: "email", icon: Mail, label: "Email address", type: "email" },
  { name: "phone", icon: Phone, label: "Phone number", type: "tel" },
  { name: "subject", icon: BookOpen, label: "Subject", type: "text" },
];

const GetInTouchSection = ({
  onSubmit,
  loading,
  settings,
  submitError,
}) => {
  const data = settings?.data?.[0];
  let mapUrl = data?.google_map_embed;
  if (mapUrl) {
    try {
      const parsedMapSettings = JSON.parse(mapUrl);
      mapUrl = parsedMapSettings.google_map_embed || mapUrl;
    } catch {
      // The setting can also be stored as a direct URL.
    }
    mapUrl = mapUrl.replace("/maps/embed?", "/maps?");
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitted = await onSubmit(formData);
    if (submitted) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  };

  const inputClassName =
    "min-h-12 w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary disabled:opacity-60";

  return (
    <section
      id="submit"
      className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:pb-20 lg:pt-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl sm:mb-10">
          {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Get in touch
          </p> */}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Let’s start a conversation
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Have a project in mind or a question? Send a message and I’ll get
            back to you as soon as I can.
          </p>
        </div>

        <div className="grid min-w-0 border-y border-border lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
          <div className="min-w-0 py-7 sm:py-9 lg:pr-12 lg:py-10">
            <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
              Send a message
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Fields marked required help me respond to your inquiry.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 grid min-w-0 grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-y-7"
            >
              {fields.map(({ name, icon: Icon, label, type }) => (
                <div key={name} className="min-w-0">
                  <label
                    htmlFor={`contact-${name}`}
                    className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Icon aria-hidden="true" size={15} className="text-primary" />
                    {label}
                    {/* <span className="text-primary" aria-hidden="true">
                      *
                    </span> */}
                  </label>
                  <input
                    id={`contact-${name}`}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    autoComplete={
                      name === "name"
                        ? "name"
                        : name === "email"
                          ? "email"
                          : name === "phone"
                            ? "tel"
                            : "off"
                    }
                    disabled={loading}
                    className={inputClassName}
                  />
                </div>
              ))}

              <div className="min-w-0 sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <MessageSquare
                    aria-hidden="true"
                    size={15}
                    className="text-primary"
                  />
                  Your message
                  {/* <span className="text-primary" aria-hidden="true">
                    *
                  </span> */}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  disabled={loading}
                  className={`${inputClassName} min-h-32 resize-y`}
                />
              </div>

              {submitError && (
                <p
                  role="alert"
                  className="border-s-2 border-destructive bg-destructive/5 px-4 py-3 text-sm text-destructive sm:col-span-2"
                >
                  {submitError}
                </p>
              )}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Sending message…" : "Send message"}
                  <Send aria-hidden="true" size={16} />
                </button>
              </div>
            </form>
          </div>

          <aside className="min-w-0 border-t border-border bg-muted/30 px-4 py-7 sm:px-6 sm:py-9 lg:border-s lg:border-t-0 lg:px-8 lg:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Contact details
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Prefer another way?
            </h3>

            <dl className="mt-7 divide-y divide-border">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: data?.primary_phone,
                  href: data?.primary_phone
                    ? `tel:${data.primary_phone}`
                    : undefined,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: data?.primary_email,
                  href: data?.primary_email
                    ? `mailto:${data.primary_email}`
                    : undefined,
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: data?.address,
                },
              ]
                .filter((item) => item.value)
                .map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-5 first:pt-0 last:pb-0"
                  >
                    <Icon
                      aria-hidden="true"
                      size={19}
                      className="mt-0.5 text-primary"
                    />
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-1 break-words text-sm font-medium leading-6 text-foreground sm:text-base">
                        {href ? (
                          <a
                            href={href}
                            className="underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
            </dl>

            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center gap-2 border-t border-border pt-5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Open location in Maps
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
