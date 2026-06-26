import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CumButton = ({ path, title, onClick }) => {
  const ButtonContent = ( 
    <motion.button
      type="button"
      className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white md:rounded-2xl rounded-md font-bold shadow-xl hover:md:shadow-2xl transition-all duration-300 relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className="relative z-10">{title}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </motion.button>
  );

  return (
    <motion.div
      className="mt-10 text-center cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      {path ? <Link to={path}>{ButtonContent}</Link> : ButtonContent}
    </motion.div>
  );
};

export default CumButton;
