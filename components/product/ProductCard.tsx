'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { Product } from '@/types';
import PlaceholderImage from '@/components/common/PlaceholderImage';
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
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
        <Link href={`/products/${product.id}`}>
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <PlaceholderImage
                category={product.category}
                className={`w-full h-full transition-transform duration-300 ${
                  isHovered ? 'scale-105' : 'scale-100'
                }`}
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {product.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-500">
                    New
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge variant="secondary">
                    Featured
                  </Badge>
                )}
                {product.discount && product.originalPrice && (
                  <Badge variant="destructive">
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
                className="absolute top-3 right-3"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${
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
                className="absolute bottom-3 left-3 right-3 flex space-x-2"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Quick view functionality
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Quick View
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
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
            <div className="p-4 space-y-3">
              {/* Category */}
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.category}
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
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
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                </div>
                
                {/* Add to Cart Button - Mobile */}
                <Button
                  size="sm"
                  className="lg:hidden"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-1">
                {product.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    • {feature}
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
