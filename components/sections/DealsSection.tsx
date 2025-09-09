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
    <section className="py-16 bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Tag className="h-6 w-6 text-slate-600" />
            <Badge variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-700 border-slate-200">
              Limited Time Offers
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Special Deals & Bundles
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
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
                    <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                          Save {deal.discount}%
                        </Badge>
                        {!isExpired && (
                          <div className="flex items-center space-x-1 text-sm bg-white/10 px-2 py-1 rounded-md backdrop-blur-sm">
                            <Clock className="h-4 w-4" />
                            <span>Ends Soon</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 leading-tight">{deal.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">{deal.description}</p>
                    </div>

                    {/* Deal Content */}
                    <div className="p-6">
                      {/* Price */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <p className="text-3xl font-bold text-slate-800 mb-1">
                            {formatPrice(deal.salePrice)}
                          </p>
                          <p className="text-lg text-gray-500 line-through">
                            {formatPrice(deal.originalPrice)}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm text-gray-500 mb-1">You Save</p>
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
                        <p className="text-sm font-semibold text-slate-800 mb-3">Bundle includes:</p>
                        <div className="space-y-2">
                          {deal.products.map((productId, idx) => (
                            <div key={idx} className="flex items-center space-x-3 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-slate-600 rounded-full flex-shrink-0" />
                              <span className="leading-relaxed">Product {idx + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button 
                        size="lg"
                        disabled={isExpired}
                        variant={isExpired ? "outline" : "default"}
                        className={`w-full ${isExpired ? 'bg-gray-100 text-gray-500 border-gray-300' : 'bg-slate-800 hover:bg-slate-900 text-white'}`}
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
