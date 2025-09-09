'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PlaceholderImageProps {
  category: string;
  className?: string;
}

const PlaceholderImage = ({ category, className = '' }: PlaceholderImageProps) => {
  const getCategoryImage = (categoryName: string) => {
    // Use only the 2 specified images: authbg1.svg, authbg2.svg
    const availableImages = ['/authbg1.svg', '/authbg2.svg'];
    
    // Map categories to one of the 2 images based on category name hash
    const hash = categoryName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const imageIndex = Math.abs(hash) % availableImages.length;
    return availableImages[imageIndex];
  };

  const imageSrc = getCategoryImage(category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center ${className}`}
    >
      <Image
        src={imageSrc}
        alt={`${category} product`}
        width={120}
        height={120}
        className="object-contain"
        priority={false}
      />
    </motion.div>
  );
};

export default PlaceholderImage;
