'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductThumbnailImageProps {
  index: number;
  className?: string;
}

const ProductThumbnailImage = ({ index, className = '' }: ProductThumbnailImageProps) => {
  const getThumbnailImage = (index: number) => {
    // Use the specific product images: product2.svg, prodcut1.svg, product3.svg, productdesc.svg
    const availableImages = ['/product2.svg', '/prodcut1.svg', '/product3.svg', '/productdesc.svg'];
    
    // Map thumbnail index to one of the 4 images
    return availableImages[index % availableImages.length];
  };

  const imageSrc = getThumbnailImage(index);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Image
        src={imageSrc}
        alt={`Product thumbnail ${index + 1}`}
        width={200}
        height={200}
        className="w-full h-full object-contain"
        priority={false}
      />
    </motion.div>
  );
};

export default ProductThumbnailImage;
