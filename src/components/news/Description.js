import React from "react";
import { motion } from "framer-motion";

import "./Description.css";
function Description() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="header_container"
    >
      <h1 className="header_title">
        News by{" "}
        <span id="title" data-text="InfoStream">
          InfoStream
        </span>
      </h1>

      <p className="header_desc">
        InfoStream is a dynamic news platform that delivers real-time updates
        from trusted sources in a clean, user-friendly interface. Stay ahead
        with trending headlines, personalized categories, and an engaging
        experience that keeps you informed anytime, anywhere.
      </p>
    </motion.div>
  );
}

export default Description;
