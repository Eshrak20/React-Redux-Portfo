import CumButton from "@/components/CumButton/CumButton";
import Title from "@/components/Title/Title";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaLaptopCode,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SiLaravel, SiCodeforces } from "react-icons/si";

const icons = {
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaLaptopCode,
  SiLaravel,
  SiCodeforces,
};

const Management = () => {
  const [managementData, setManagementData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Json/Management.json")
      .then((res) => res.json())
      .then((data) => {
        setManagementData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="my-40 text-center text-lg">Loading Education...</div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto my-24 px-5">
      <Title name="Education & Learning Journey" />

      <div className="mt-14 flex items-start">
        <div className="hidden lg:block -rotate-90 origin-center mt-72 -ml-28 mr-10">
          <CumButton title="Always Learning" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-7 w-full"
        >
          {managementData.map((item, index) => {
            const Icon = icons[item.icon] || FaUniversity;

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="group relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl p-7"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-500" />

                <div className="relative flex justify-between items-start">
                  <motion.div
                    whileHover={{
                      rotate: 12,
                      scale: 1.15,
                    }}
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl"
                  >
                    <Icon />
                  </motion.div>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-circle btn-sm btn-ghost"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-bold">{item.title}</h2>

                  <p className="mt-2 text-base-content/70 leading-relaxed">
                    {item.subtitle}
                  </p>

                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(255,107,107,0.2)",
                        "0 0 24px rgba(255,107,107,0.45)",
                        "0 0 0px rgba(255,107,107,0.2)",
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="inline-flex mt-6 rounded-full bg-primary text-white px-4 py-2 text-sm font-semibold"
                  >
                    {item.status}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Management;
