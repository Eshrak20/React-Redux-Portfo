import React, { useState } from "react";
import Title from "@/components/Title/Title";
import CumButton from "@/components/CumButton/CumButton";

const HomeClients = ({ testimonial }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const showMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const showLess = () => {
    setVisibleCount(8);
  };

  return (
    <section className="py-16 bg-background">
      {/* GLOBAL STRUCTURE WRAPPER ALIGNMENT */}
      <div className="container md:container lg:container mx-auto md:mx-auto lg:mx-auto px-6 md:px-8 lg:px-12">
        
        <div className="mb-12">
          <Title name="MY Clients" />
        </div>

        {/* 8-Column Responsive Brand Grid System */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
          {testimonial?.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Company Logo Display Engine */}
              <div className="flex items-center justify-center min-h-30 group-hover:opacity-90 transition-opacity duration-300 w-full">
                {item.company_image ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.company_image}`}
                    alt={item.company_name || "Company"}
                    className="max-w-full max-h-30 object-contain mx-auto"
                    style={{ width: "auto", height: "auto" }}
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      {item.company_name?.charAt(0) || item.name?.charAt(0)}
                    </div>
                  </div>
                )}
              </div>

              {/* Brand Label Accent */}
              <p className="mt-4 text-xs sm:text-sm font-semibold text-primary truncate w-full px-1">
                {item.company_name || "Independent"}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Action Control Anchor */}
        <div className="mt-12 flex justify-center gap-4">
          {visibleCount < testimonial?.length && (
            <CumButton onClick={showMore} title="Show More"/>
          )}

          {visibleCount > 8 && (
            <CumButton onClick={showLess} title="Show Less"/>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeClients;