import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImageFrame({ src, alt, className = '', imageClassName = '', motionProps = {} }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div className={`image-frame ${className}`} {...motionProps}>
      <div className="image-fallback" aria-hidden="true"><i className="bi bi-stars" /></div>
      {!failed && (
        <img
          className={imageClassName}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </motion.div>
  );
}
