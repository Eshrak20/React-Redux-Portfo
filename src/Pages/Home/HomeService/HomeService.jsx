import Title from "@/components/Title/Title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight, Code } from "lucide-react";

const HomeService = ({ services }) => {
  const sortedServices = services
    ? [...services].sort((a, b) => (a.position || 0) - (b.position || 0))
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="w-5 h-5 text-primary" />
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              What I Do Best
            </Badge>
          </div>
          <Title name="My Specializations" />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sortedServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative"
            >
              <Card className="relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                
                <CardContent className="relative p-6 flex flex-col items-center text-center">
                  {/* Image Container with Glow Effect */}
                  <div className="relative w-full h-40 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative z-10"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Decorative Line */}
                    <div className="w-12 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full mx-auto group-hover:w-20 transition-all duration-300" />
                    
                    {/* Arrow Indicator */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </CardContent>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeService;