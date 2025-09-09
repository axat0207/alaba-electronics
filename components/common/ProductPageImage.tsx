'use client';

import Image from 'next/image';

interface ProductPageImageProps {
  productId: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  imageIndex?: number;
}

const ProductPageImage = ({ productId, className = '', size = 'large', imageIndex }: ProductPageImageProps) => {
  const getProductImage = (productId: string, index?: number) => {
    // If imageIndex is provided, use the thumbnail images
    if (index !== undefined) {
      const thumbnailImages = ['/product2.svg', '/prodcut1.svg', '/product3.svg', '/productdesc.svg'];
      return thumbnailImages[index % thumbnailImages.length];
    }
    
    // Otherwise use the main product images: authbg1.svg, authbg2.svg
    const availableImages = ['/authbg1.svg', '/authbg2.svg'];
    
    // Map products to one of the 2 images based on product ID hash
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const imageIndex = Math.abs(hash) % availableImages.length;
    return availableImages[imageIndex];
  };

  const imageSrc = getProductImage(productId, imageIndex);

  const getImageDimensions = (size: string) => {
    switch (size) {
      case 'small':
        return { width: 200, height: 200 };
      case 'medium':
        return { width: 300, height: 300 };
      default:
        return { width: 400, height: 400 };
    }
  };

  const { width, height } = getImageDimensions(size);

  return (
    <Image
      src={imageSrc}
      alt="Product image"
      width={width}
      height={height}
      className={`w-full h-full object-cover ${className}`}
      priority={false}
    />
  );
};

export default ProductPageImage;
