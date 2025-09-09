'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { deals } from '@/data/products.json';

const DealsSection = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTimeRemaining = (validUntil: string) => {
    const now = new Date();
    const endDate = new Date(validUntil);
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Tag className="h-6 w-6 text-primary" />
            <Badge variant="destructive" className="px-3 py-1">
              Limited Time Offers
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Special Deals & Bundles
          </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Save big with our exclusive bundles and limited-time offers. Don&apos;t miss out!
            </p>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {deals.map((deal, index) => {
            const timeRemaining = getTimeRemaining(deal.validUntil);
            const isExpired = timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0;
            
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    {/* Deal Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          Save {deal.discount}%
                        </Badge>
                        {!isExpired && (
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Ends Soon</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                      <p className="text-white/90">{deal.description}</p>
                    </div>

                    {/* Deal Content */}
                    <div className="p-6">
                      {/* Price */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div>
                          <p className="text-3xl font-bold text-primary">
                            {formatPrice(deal.salePrice)}
                          </p>
                          <p className="text-lg text-muted-foreground line-through">
                            {formatPrice(deal.originalPrice)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">You Save</p>
                          <p className="text-xl font-bold text-green-600">
                            {formatPrice(deal.originalPrice - deal.salePrice)}
                          </p>
                        </div>
                      </div>

                      {/* Timer */}
                      {!isExpired && (
                        <div className="mb-6">
                          <p className="text-sm text-muted-foreground mb-2">Offer ends in:</p>
                          <div className="flex space-x-2">
                            <div className="bg-muted rounded-lg p-2 text-center min-w-[50px]">
                              <p className="text-lg font-bold text-foreground">{timeRemaining.days}</p>
                              <p className="text-xs text-muted-foreground">Days</p>
                            </div>
                            <div className="bg-muted rounded-lg p-2 text-center min-w-[50px]">
                              <p className="text-lg font-bold text-foreground">{timeRemaining.hours}</p>
                              <p className="text-xs text-muted-foreground">Hours</p>
                            </div>
                            <div className="bg-muted rounded-lg p-2 text-center min-w-[50px]">
                              <p className="text-lg font-bold text-foreground">{timeRemaining.minutes}</p>
                              <p className="text-xs text-muted-foreground">Mins</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Products Included */}
                      <div className="mb-6">
                        <p className="text-sm font-medium text-foreground mb-2">Bundle includes:</p>
                        <div className="space-y-1">
                          {deal.products.map((productId, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <span>Product {idx + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled={isExpired}
                      >
                        {isExpired ? 'Offer Expired' : 'Get This Deal'}
                        <ShoppingCart className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* View All Deals Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Button size="lg" variant="outline" className="px-8">
            View All Deals
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DealsSection;
