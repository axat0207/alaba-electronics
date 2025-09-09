'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { featuredProducts } from '@/data/products.json';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import Link from 'next/link';

const HeroSection = () => {
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2"
              >
                <Badge variant="secondary" className="px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Trusted by 500+ Businesses
                </Badge>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              >
                Electronics & Office Equipment for{' '}
                <span className="text-primary">Modern Businesses</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-lg"
              >
                From POS systems to computers, we provide reliable solutions for businesses 
                in Alaba International Market and beyond. Quality products at competitive prices.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="text-lg px-8 py-6">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Categories
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4 pt-8"
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Quality Guaranteed</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Featured Products */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center text-foreground">
              Featured Products
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProducts.slice(0, 4).map((productId, index) => {
                const product = featuredProducts.find(p => p === productId);
                if (!product) return null;
                
                // For now, we'll use a placeholder since we need to map productId to actual product
                const mockProduct = {
                  id: productId,
                  name: 'TouchPOS Pro Terminal',
                  price: 450000,
                  originalPrice: 550000,
                  image: '/images/products/pos-terminal-1.jpg',
                  rating: 4.8
                };

                return (
                  <motion.div
                    key={productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-4">
                        <div className="relative">
                          <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                            <PlaceholderImage
                              category="pos-systems"
                              className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          {mockProduct.originalPrice && (
                            <Badge 
                              variant="destructive" 
                              className="absolute top-2 left-2"
                            >
                              -{getDiscountPercentage(mockProduct.originalPrice, mockProduct.price)}%
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {mockProduct.name}
                          </h3>
                          
                          <div className="flex items-center space-x-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(mockProduct.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {mockProduct.rating}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-primary">
                                {formatPrice(mockProduct.price)}
                              </p>
                              {mockProduct.originalPrice && (
                                <p className="text-xs text-muted-foreground line-through">
                                  {formatPrice(mockProduct.originalPrice)}
                                </p>
                              )}
                            </div>
                            <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
      />
    </section>
  );
};

export default HeroSection;
