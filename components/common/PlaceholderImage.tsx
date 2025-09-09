'use client';

import { motion } from 'framer-motion';
import { CreditCard, Laptop, Calculator, Printer, Banknote, Briefcase } from 'lucide-react';

interface PlaceholderImageProps {
  category: string;
  className?: string;
}

const PlaceholderImage = ({ category, className = '' }: PlaceholderImageProps) => {
  const getCategoryIcon = (categoryName: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      'pos-systems': CreditCard,
      'computers': Laptop,
      'cash-registers': Calculator,
      'printers': Printer,
      'money-detectors': Banknote,
      'office-equipment': Briefcase,
    };
    return icons[categoryName] || Briefcase;
  };

  const IconComponent = getCategoryIcon(category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center ${className}`}
    >
      <IconComponent className="h-16 w-16 text-primary/60" />
    </motion.div>
  );
};

export default PlaceholderImage;
