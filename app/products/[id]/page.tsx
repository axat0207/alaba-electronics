'use client';

import { useState, use } from 'react';
import { 
  Star, 
  Truck, 
  RotateCcw, 
  Shield, 
  ChevronLeft,
  Plus,
  Minus,
  CheckCircle,
  ThumbsUp,
  MessageCircle,
  User
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { products } from '@/data/products.json';
import ProductPageImage from '@/components/common/ProductPageImage';
import ProductCard from '@/components/product/ProductCard';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPageClient = ({ productId }: { productId: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addItem } = useCartStore();

  const product = products.find(p => p.id === productId);
  
  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };


  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };


  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Mock reviews data for display
  const averageRating = 4.6;
  const totalReviews = 25;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180" />
            <Link href="/categories" className="text-muted-foreground hover:text-primary">
              Categories
            </Link>
            <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2">
                <ProductPageImage
                  productId={product.id}
                  className="w-full h-full"
                />
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-50 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200 p-1 ${
                      selectedImage === index ? 'ring-2 ring-primary' : 'hover:bg-gray-100'
                    }`}
                  >
                    <ProductPageImage
                      productId={product.id}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Title */}
              <div>
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">
                    {averageRating.toFixed(1)} ({totalReviews} reviews)
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount} sold
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-sm text-green-600 font-medium">
                    You save {formatPrice(product.originalPrice - product.price)} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2 border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Free Shipping</p>
                        <p className="text-sm text-muted-foreground">On orders above ₦50,000</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">30-Day Returns</p>
                        <p className="text-sm text-muted-foreground">Hassle-free return policy</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">2-Year Warranty</p>
                        <p className="text-sm text-muted-foreground">Manufacturer warranty included</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Rating & Reviews Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Customer Reviews</h2>
              <p className="text-muted-foreground">What our customers say about this product</p>
            </div>

            {/* Overall Rating */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Rating Summary */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">{averageRating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">Based on {totalReviews} reviews</p>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    // Use deterministic data based on product ID to avoid hydration mismatch
                    const hash = productId.split('').reduce((a, b) => {
                      a = ((a << 5) - a) + b.charCodeAt(0);
                      return a & a;
                    }, 0);
                    const count = Math.abs(hash + rating * 3) % 20 + 1; // Deterministic mock data
                    const percentage = (count / totalReviews) * 100;
                    return (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-8">{rating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Sarah Johnson", rating: 5, comment: "Excellent product! Fast delivery and great quality. Highly recommended.", date: "2 days ago", helpful: 12 },
                { name: "Mike Chen", rating: 4, comment: "Good value for money. Works as expected. Minor issues with setup but overall satisfied.", date: "1 week ago", helpful: 8 },
                { name: "Emily Davis", rating: 5, comment: "Perfect for our business needs. Easy to use and reliable. Customer service was also very helpful.", date: "2 weeks ago", helpful: 15 },
                { name: "David Wilson", rating: 4, comment: "Solid product with good features. Would buy again. Shipping was quick.", date: "3 weeks ago", helpful: 6 }
              ].map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex justify-center">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'description'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'specifications'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Specifications
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl mx-auto">
              {activeTab === 'description' && (
                <div className="text-center">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Specification
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.specifications || {}).map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {key}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Products</h2>
              <p className="text-gray-600">You might also like these products</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  return <ProductPageClient productId={resolvedParams.id} />;
}
