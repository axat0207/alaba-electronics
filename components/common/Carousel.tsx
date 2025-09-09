'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products.json';
import PlaceholderImage from './PlaceholderImage';

interface CarouselProps {
  items?: typeof products;
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const Carousel = ({ 
  items = products.filter(p => p.isFeatured).slice(0, 5), 
  autoPlay = true, 
  interval = 5000,
  showDots = true,
  showArrows = true
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
    <div className="relative w-full bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Carousel Container */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                  {/* Left Side - Product Info */}
                  <div className="text-center lg:text-left space-y-6">
                    {items[currentIndex].isNew && (
                      <Badge className="bg-green-500 hover:bg-green-500 text-white">
                        New Arrival
                      </Badge>
                    )}
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                      {items[currentIndex].name}
                    </h2>
                    
                    <p className="text-base lg:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                      {items[currentIndex].description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(items[currentIndex].rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({items[currentIndex].reviewCount} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-center lg:justify-start space-x-4">
                      <p className="text-2xl lg:text-3xl font-bold text-primary">
                        {formatPrice(items[currentIndex].price)}
                      </p>
                      {items[currentIndex].originalPrice && (
                        <>
                          <p className="text-lg lg:text-xl text-muted-foreground line-through">
                            {formatPrice(items[currentIndex].originalPrice)}
                          </p>
                          <Badge variant="destructive" className="text-sm">
                            -{getDiscountPercentage(items[currentIndex].originalPrice, items[currentIndex].price)}%
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-2 max-w-md mx-auto lg:mx-0">
                      {items[currentIndex].features.slice(0, 3).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center lg:justify-start">
                      <Button size="lg" className="px-8 py-3 text-lg">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  {/* Right Side - Product Image */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-md lg:max-w-lg">
                      <div className="aspect-square bg-white rounded-2xl shadow-2xl p-8">
                        <PlaceholderImage
                          category={items[currentIndex].category}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl border-0 w-12 h-12 rounded-full z-10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl border-0 w-12 h-12 rounded-full z-10"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
