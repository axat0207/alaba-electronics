'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BrandsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const brands = [
    {
      name: 'AMD',
      subcategories: [
        'AMD Ryzen 3',
        'AMD Ryzen 5', 
        'AMD Ryzen 7',
        'AMD Ryzen 9'
      ]
    },
    {
      name: 'Intel',
      subcategories: [
        'Core i3 processor',
        'Core i5 processor',
        'Core i7 processor', 
        'Core i9 processor'
      ]
    },
    {
      name: 'Ant Esports',
      subcategories: [
        'Cabinet',
        'SSD',
        'Speakers',
        'Motherboard'
      ]
    },
    {
      name: 'Deep Cool',
      subcategories: [
        'Cabinet',
        'CPU Cooler',
        'Power Supply',
        'Thermal fan'
      ]
    }
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span>Shop By Brands</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {/* Brands Mega Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 bg-white border-2 border-gray-300 shadow-2xl z-[9999] overflow-hidden"
            style={{ 
              left: '-50px',
              width: 'min(85vw, 500px)',
              maxWidth: '500px'
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {brands.map((brand) => (
                  <div key={brand.name} className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-2">
                      {brand.name}
                    </h3>
                    <div className="space-y-1">
                      {brand.subcategories.map((subcategory, subIndex) => (
                        <Link
                          key={subIndex}
                          href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-sm text-gray-700 hover:text-primary hover:underline transition-colors"
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandsMenu;
