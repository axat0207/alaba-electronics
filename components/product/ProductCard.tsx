'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { Product } from '@/types';
import ProductPageImage from '@/components/common/ProductPageImage';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDiscountPercentage = (originalPrice: number, salePrice: number) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 shadow-sm hover:border-gray-300">
        <Link href={`/products/${product.id}`}>
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <ProductPageImage
                productId={product.id}
                size="medium"
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isHovered ? 'scale-105' : 'scale-100'
                }`}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
                    New
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
                    Featured
                  </Badge>
                )}
                {product.discount && product.originalPrice && (
                  <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
                    -{getDiscountPercentage(product.originalPrice, product.price)}%
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  scale: isHovered ? 1 : 0.8 
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 rounded-full shadow-lg backdrop-blur-sm ${
                    isWishlisted 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-white/90 hover:bg-white'
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      isWishlisted ? 'fill-current' : ''
                    }`} 
                  />
                </Button>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  y: isHovered ? 0 : 20 
                }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-4 right-4 flex gap-2"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm text-gray-700 rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Quick view functionality
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Quick View</span>
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-lg rounded-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Add to Cart</span>
                </Button>
              </motion.div>

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-sm">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5 space-y-4">
              {/* Category */}
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                {product.category}
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors text-sm leading-tight">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-1">
                {product.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="text-xs text-gray-600 flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 flex-shrink-0"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
