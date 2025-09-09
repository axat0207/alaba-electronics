# Alaba Electronics Hub

A modern, professional ecommerce website for Alaba Electronics Hub, specializing in electronics and office equipment for businesses in Alaba International Market, Lagos.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Comprehensive product listings with categories
- **Shopping Cart**: Slide-out cart with real-time updates
- **Wishlist**: Save favorite products for later
- **Search**: Product search and filtering
- **Responsive Design**: Mobile-first approach with touch-friendly interactions

### Product Categories
- **POS Systems**: TouchPOS terminals, mobile POS kits, restaurant systems
- **Computers & Laptops**: Business desktops, office laptops, workstations
- **Cash Registers**: Electronic cash registers and terminals
- **Printers & Scanners**: Multifunction printers, scanners, office equipment
- **Money Detectors**: Currency counting and verification machines
- **Office Equipment**: Chairs, desks, and general office accessories

### UI/UX Features
- **Modern Design**: Clean, professional interface with smooth animations
- **Framer Motion**: Smooth transitions and micro-interactions
- **shadcn/ui**: High-quality, accessible UI components
- **Tailwind CSS**: Utility-first styling with custom design system
- **Mobile Optimized**: Touch-friendly interactions and responsive layouts

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **Framer Motion**: Animation library for smooth interactions

### State Management
- **Zustand**: Lightweight state management
- **Persistent Storage**: Cart and wishlist data persistence

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Turbopack**: Fast development builds

## 📁 Project Structure

```
ecommerce/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Layout.tsx           # Main layout wrapper
│   │   └── CartSidebar.tsx      # Shopping cart sidebar
│   ├── sections/                # Page sections
│   │   ├── HeroSection.tsx      # Hero banner
│   │   ├── CategoriesSection.tsx # Product categories
│   │   ├── FeaturedProductsSection.tsx # Featured products
│   │   └── DealsSection.tsx     # Special offers
│   ├── product/                 # Product-related components
│   │   └── ProductCard.tsx      # Product card component
│   └── common/                  # Shared components
│       └── PlaceholderImage.tsx # Placeholder image component
├── data/                        # Static data
│   └── products.json            # Product catalog data
├── lib/                         # Utilities and configuration
│   ├── store.ts                 # Zustand store configuration
│   └── utils.ts                 # Utility functions
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Main type definitions
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Trust and professionalism
- **Secondary**: Green (#10B981) - Growth and success
- **Accent**: Yellow (#F59E0B) - Attention and highlights
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter - Modern, readable sans-serif
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Badges**: Status indicators and labels
- **Animations**: Smooth transitions and hover effects

## 📱 Responsive Design

The website is built with a mobile-first approach:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Key Responsive Features
- Collapsible navigation menu
- Touch-friendly buttons and interactions
- Optimized product grid layouts
- Responsive typography scaling

## 🛒 E-commerce Features

### Shopping Cart
- Slide-out cart panel
- Real-time quantity updates
- Price calculations
- Persistent storage
- Easy item removal

### Product Management
- Product categories and filtering
- Search functionality
- Featured products
- Special deals and bundles
- Product specifications

### User Experience
- Wishlist functionality
- Quick add to cart
- Product quick view
- Smooth animations
- Loading states

## 🔧 Customization

### Adding New Products
1. Update `data/products.json`
2. Add product images to `public/images/products/`
3. Update product types in `types/index.ts` if needed

### Styling
- Modify `app/globals.css` for global styles
- Use Tailwind classes for component styling
- Update CSS variables for theme customization

### Components
- Add new components in `components/` directory
- Follow existing patterns for consistency
- Use TypeScript for type safety

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Deploy automatically on push

### Environment Variables
No environment variables required for basic functionality.

## 📈 Performance

- **Lighthouse Score**: Optimized for performance
- **Core Web Vitals**: Fast loading and smooth interactions
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: info@alabaelectronics.com
- Phone: +234 801 234 5678
- Address: Alaba International Market, Lagos

---

Built with ❤️ for Alaba Electronics Hub# alaba-electronics
