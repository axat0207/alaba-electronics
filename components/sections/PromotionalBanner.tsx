'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Gift, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PromotionalBanner = () => {
  const taglines = [
    "Up to 60% off | Trending products from Emerging Businesses",
    "Free Shipping | On orders above ₦50,000",
    "New Arrivals | Latest technology at your fingertips",
    "Best Deals | Quality products at unbeatable prices"
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₦50,000"
    },
    {
      icon: Gift,
      title: "Gift Wrapping",
      description: "Available for all products"
    },
    {
      icon: Shield,
      title: "Warranty",
      description: "2-year warranty on all items"
    },
    {
      icon: TrendingUp,
      title: "Best Prices",
      description: "Competitive pricing guaranteed"
    }
  ];

  return (
    <section className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Promotional Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Limited Time Offer
            </Badge>
            <span className="text-sm">Ends Soon</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {taglines[0]}
          </h2>
          
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Discover amazing deals on electronics and office equipment from emerging businesses. 
            Quality products at unbeatable prices!
          </p>
          
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-slate-800 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <feature.icon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs opacity-80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Taglines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {taglines.slice(1).map((tagline, index) => (
              <span key={index} className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                {tagline}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
