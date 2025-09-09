'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/products.json';
import Link from 'next/link';

const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      CreditCard: '💳',
      Laptop: '💻',
      Calculator: '🧮',
      Printer: '🖨️',
      Banknote: '💰',
      Briefcase: '💼',
    };
    return icons[iconName] || '📦';
  };

  const getSubcategories = (categoryId: string) => {
    const subcategories: Record<string, string[]> = {
      'pos-systems': [
        'TouchPOS Terminals',
        'Mobile POS Kits',
        'Restaurant POS',
        'Retail POS',
        'POS Accessories',
        'Receipt Printers',
        'Cash Drawers',
        'Barcode Scanners'
      ],
      'computers': [
        'Desktop Computers',
        'Laptops',
        'Workstations',
        'Gaming PCs',
        'Business Laptops',
        'All-in-One PCs',
        'Mini PCs',
        'Computer Accessories'
      ],
      'cash-registers': [
        'Electronic Cash Registers',
        'Cash Register Accessories',
        'Receipt Paper',
        'Cash Register Software',
        'Point of Sale Systems',
        'Payment Terminals'
      ],
      'printers': [
        'Laser Printers',
        'Inkjet Printers',
        'Multifunction Printers',
        '3D Printers',
        'Label Printers',
        'Printer Accessories',
        'Toner & Ink',
        'Printer Paper'
      ],
      'money-detectors': [
        'Currency Counters',
        'Money Detectors',
        'Bill Counters',
        'Coin Counters',
        'UV Detectors',
        'Counterfeit Detectors',
        'Money Counting Accessories'
      ],
      'office-equipment': [
        'Office Chairs',
        'Desks & Tables',
        'Filing Cabinets',
        'Office Supplies',
        'Whiteboards',
        'Projectors',
        'Office Lighting',
        'Storage Solutions'
      ]
    };
    return subcategories[categoryId] || [];
  };

  return (
    <div className="relative">
      {/* Menu Trigger */}
      <Button
        variant="outline"
        className="flex items-center space-x-2 px-4 py-2 bg-white border-gray-300 hover:bg-gray-50"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Menu className="h-4 w-4" />
        <span>Browse All Categories</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 bg-white border-2 border-gray-300 shadow-2xl z-[9999] overflow-hidden"
            style={{ 
              width: 'min(90vw, 800px)',
              maxWidth: '800px'
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="flex flex-col md:flex-row">
              {/* Categories List */}
              <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 max-h-48 md:max-h-96 overflow-y-auto flex-shrink-0">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-3 border-b border-gray-200 hover:bg-white cursor-pointer transition-colors"
                    onMouseEnter={() => setHoveredCategory(category.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getCategoryIcon(category.icon)}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subcategories Content */}
              <div className="flex-1 p-4 md:p-6 max-h-48 md:max-h-96 overflow-y-auto">
                {hoveredCategory ? (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      {categories.find(c => c.id === hoveredCategory)?.name}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2">
                      {getSubcategories(hoveredCategory).map((subcategory, index) => (
                        <Link
                          key={index}
                          href={`/categories/${hoveredCategory}?subcategory=${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block py-2 text-sm text-gray-700 hover:text-primary hover:underline transition-colors"
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🛍️</div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Browse Our Categories
                      </h3>
                      <p className="text-gray-500">
                        Hover over a category to see products
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;
