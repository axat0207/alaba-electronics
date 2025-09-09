'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AccessoriesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const accessories = [
    {
      name: 'Cables & Adapters',
      subcategories: [
        'USB Cables',
        'HDMI Cables',
        'Power Cables',
        'Network Cables'
      ]
    },
    {
      name: 'Storage',
      subcategories: [
        'External Hard Drives',
        'USB Flash Drives',
        'Memory Cards',
        'SSD Enclosures'
      ]
    },
    {
      name: 'Input Devices',
      subcategories: [
        'Keyboards',
        'Mice',
        'Webcams',
        'Microphones'
      ]
    },
    {
      name: 'Office Supplies',
      subcategories: [
        'Desk Organizers',
        'Cable Management',
        'Monitor Stands',
        'Laptop Stands'
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
        <span>Accessories</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {/* Accessories Mega Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 bg-white border-2 border-gray-300 shadow-2xl z-[9999] overflow-hidden"
            style={{ 
              left: '-100px',
              width: 'min(80vw, 400px)',
              maxWidth: '400px'
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {accessories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-2">
                      {category.name}
                    </h3>
                    <div className="space-y-1">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <Link
                          key={subIndex}
                          href={`/accessories/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
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

export default AccessoriesMenu;
