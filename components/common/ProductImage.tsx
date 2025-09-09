'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductImageProps {
  productId: string;
  category: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const ProductImage = ({ productId, category, className = '', size = 'medium' }: ProductImageProps) => {
  const getProductImage = (productId: string, categoryName: string) => {
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

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-16 h-16';
      case 'large':
        return 'w-48 h-48';
      default:
        return 'w-24 h-24';
    }
  };

  const imageSrc = getProductImage(productId, category);
  const sizeClasses = getSizeClasses(size);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center ${className}`}
    >
      <Image
        src={imageSrc}
        alt={`${category} product`}
        width={size === 'small' ? 64 : size === 'large' ? 192 : 96}
        height={size === 'small' ? 64 : size === 'large' ? 192 : 96}
        className={`object-contain ${sizeClasses}`}
        priority={false}
      />
    </motion.div>
  );
};

export default ProductImage;
