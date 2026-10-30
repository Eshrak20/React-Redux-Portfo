import Title from "@/components/Title/Title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight, Code } from "lucide-react";

const HomeService = ({ services }) => {
  const sortedServices = services
    ? [...services].sort((a, b) => (a.position || 0) - (b.position || 0))
    : [];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="w-5 h-5 text-primary" />
            <Badge variant="secondary">What I Do Best</Badge>
          </div>

          <Title name="My Specializations" />
        </motion.div>

        {/* Services */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="
            flex gap-4 overflow-x-auto pb-5
            snap-x snap-mandatory scrollbar-hide
            sm:grid sm:grid-cols-2
            lg:grid-cols-4 sm:overflow-visible
          "
        >
          {sortedServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="
                group min-w-[75%] sm:min-w-0
                snap-center
              "
            >
              <Card
                className="
                h-full overflow-hidden
                border-border bg-card
                transition-all duration-300
                hover:border-primary/50
                hover:shadow-lg hover:shadow-primary/5
              "
              >
                <CardContent
                  className="
                  p-5 sm:p-6
                  flex flex-col items-center text-center
                "
                >
                  {/* Image */}
                  <div
                    className="
                        w-full h-32 sm:h-40 lg:h-52 xl:h-60
                        flex items-center justify-center
                        mb-5
                      "
                  >
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                                        className="
                        w-full h-full
                        object-contain
                        drop-shadow-md
                      "
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                    text-lg font-semibold
                    text-foreground
                    group-hover:text-primary
                    transition-colors duration-300
                  "
                  >
                    {service.title}
                  </h3>

                  {/* Decorative line */}
                  <div
                    className="
                    mt-4 h-1 w-10 rounded-full
                    bg-primary/40
                    group-hover:w-16
                    group-hover:bg-primary
                    transition-all duration-300
                  "
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile swipe indicator */}
        <div className="flex justify-center gap-2 mt-3 sm:hidden">
          <span className="text-xs text-muted-foreground">
            Swipe to explore
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HomeService;
