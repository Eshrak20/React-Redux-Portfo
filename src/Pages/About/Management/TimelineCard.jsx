
import {
    FaExternalLinkAlt,
    FaGraduationCap,
    FaLaptopCode,
    FaSchool,
    FaUniversity,
} from "react-icons/fa";

import {
    SiCodeforces,
    SiLaravel,
} from "react-icons/si";

const icons = {
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaLaptopCode,
  SiLaravel,
  SiCodeforces,
};

const TimelineCard = ({ item, index }) => {
  const Icon = icons[item.icon] || FaGraduationCap;

  return (
    <article
      className="
        group relative isolate flex h-full
        min-w-0 flex-col overflow-hidden

        rounded-xl sm:rounded-2xl
        border border-border/70
        bg-card

        p-4 sm:p-5 lg:p-6

        shadow-sm
        transition-all duration-500 ease-out

        hover:-translate-y-1
        hover:border-primary
        hover:bg-primary
        hover:shadow-xl
        hover:shadow-primary/20

        focus-within:border-primary
        focus-within:bg-primary
      "
    >
      {/* Background Glow */}
      <div className="
        pointer-events-none absolute
        -right-12 -top-12
        h-36 w-36 rounded-full
        bg-white/10 blur-3xl
        opacity-0
        transition-opacity duration-500
        group-hover:opacity-100
        group-focus-within:opacity-100
      " />

      {/* Decorative Number */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-3 right-3
          select-none
          text-6xl font-black
          tracking-tighter
          text-foreground/[0.035]
          transition-colors duration-500
          group-hover:text-white/10
          group-focus-within:text-white/10
          sm:text-7xl
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Card Header */}
      <div className="
        relative flex items-center
        justify-between gap-3
      ">
        {/* Icon */}
        <div className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-xl

          border border-primary/15
          bg-primary/10
          text-lg text-primary

          transition-all duration-500

          group-hover:border-white/20
          group-hover:bg-white/15
          group-hover:text-white

          group-focus-within:border-white/20
          group-focus-within:bg-white/15
          group-focus-within:text-white

          sm:h-12 sm:w-12
        ">
          <Icon aria-hidden="true" />
        </div>

        {/* External Link */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${item.title}`}
            className="
              relative z-10
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg

              border border-border
              text-muted-foreground

              transition-all duration-500

              hover:!border-white/30
              hover:!bg-white/20
              hover:!text-white

              group-hover:border-white/25
              group-hover:bg-white/10
              group-hover:text-white

              group-focus-within:border-white/25
              group-focus-within:bg-white/10
              group-focus-within:text-white

              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-primary
            "
          >
            <FaExternalLinkAlt
              aria-hidden="true"
              className="text-xs"
            />
          </a>
        )}
      </div>

      {/* Card Content */}
      <div className="relative mt-4 flex flex-1 flex-col sm:mt-5">

        {/* Label */}
        <p className="
          mb-2 flex items-center gap-2
          text-[9px] font-bold
          uppercase tracking-[0.18em]
          text-muted-foreground

          transition-colors duration-500

          group-hover:text-white/70
          group-focus-within:text-white/70

          sm:text-[10px]
        ">
          <span className="
            h-1.5 w-1.5 rounded-full
            bg-primary
            transition-colors duration-500
            group-hover:bg-white
            group-focus-within:bg-white
          " />

          Education & Learning
        </p>

        {/* Title */}
        <h3 className="
          relative z-10
          break-words
          text-sm font-bold
          leading-snug

          text-card-foreground
          transition-colors duration-500

          group-hover:text-white
          group-focus-within:text-white

          sm:text-base
          xl:text-lg
        ">
          {item.title}
        </h3>

        {/* Description */}
        {item.subtitle && (
          <p className="
            relative z-10
            mt-2 break-words
            text-xs leading-relaxed

            text-muted-foreground
            transition-colors duration-500

            group-hover:text-white/80
            group-focus-within:text-white/80

            sm:text-sm sm:leading-6
            lg:text-xs lg:leading-6
            xl:text-sm
          ">
            {item.subtitle}
          </p>
        )}

        {/* Status */}
        {item.status && (
          <div className="relative z-10 mt-auto pt-4">
            <div className="
              inline-flex max-w-full
              items-center gap-2

              rounded-full
              border border-primary/15
              bg-primary/5

              px-3 py-1.5

              transition-all duration-500

              group-hover:border-white/25
              group-hover:bg-white/10

              group-focus-within:border-white/25
              group-focus-within:bg-white/10
            ">
              <span className="
                h-1.5 w-1.5 shrink-0
                rounded-full bg-primary
                transition-colors duration-500
                group-hover:bg-white
                group-focus-within:bg-white
              " />

              <span className="
                truncate text-[9px]
                font-bold uppercase
                tracking-wider

                text-primary
                transition-colors duration-500

                group-hover:text-white
                group-focus-within:text-white

                sm:text-[10px]
              ">
                {item.status}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Animated Bottom Accent */}
      <div className="
        absolute bottom-0 left-0
        h-[3px] w-full
        origin-left scale-x-0
        bg-white/60
        transition-transform duration-500
        group-hover:scale-x-100
        group-focus-within:scale-x-100
      " />
    </article>
  );
};

export default TimelineCard;
