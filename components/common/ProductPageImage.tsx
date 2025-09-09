'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductPageImageProps {
  productId: string;
  className?: string;
}

const ProductPageImage = ({ productId, className = '' }: ProductPageImageProps) => {
  const getProductImage = (productId: string) => {
    // Use only the 2 specified images: authbg1.svg, authbg2.svg
    const availableImages = ['/authbg1.svg', '/authbg2.svg'];
    
    // Map products to one of the 2 images based on product ID hash
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const imageIndex = Math.abs(hash) % availableImages.length;
    return availableImages[imageIndex];
  };

  const imageSrc = getProductImage(productId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Image
        src={imageSrc}
        alt="Product image"
        width={400}
        height={400}
        className="w-full h-full object-contain max-w-none"
        priority={false}
      />
    </motion.div>
  );
};

export default ProductPageImage;
