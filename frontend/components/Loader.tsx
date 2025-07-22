import React from "react";
import { motion } from "framer-motion";
// Make sure to install framer-motion: npm install framer-motion

export const Loader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            initial={{ y: 0, opacity: 0.5 }}
            animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="text-3xl"
            role="img"
            aria-label="paw"
          >
            🐾
          </motion.span>
        ))}
      </div>
      <span className="ml-4 text-lg text-blue-700 font-semibold animate-pulse">Generating profile...</span>
    </div>
  );
};
