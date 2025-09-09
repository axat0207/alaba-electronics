'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  images?: string[];
}

interface ReviewSectionProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

const ReviewSection = ({ averageRating, totalReviews }: ReviewSectionProps) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      userName: 'John Doe',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent product!',
      comment: 'This product exceeded my expectations. Great quality and fast delivery. The build quality is outstanding and it works perfectly for my business needs. Highly recommended!',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      userName: 'Sarah Wilson',
      rating: 4,
      date: '2024-01-10',
      title: 'Good value for money',
      comment: 'Good product overall. Minor issues with packaging but product works perfectly. The customer service was helpful in resolving my concerns quickly.',
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      rating: 5,
      date: '2024-01-08',
      title: 'Perfect for my business',
      comment: 'Exactly what I needed for my business. Highly recommended! The setup was easy and the performance is excellent.',
      helpful: 15,
      verified: false
    },
    {
      id: 4,
      userName: 'Emily Chen',
      rating: 3,
      date: '2024-01-05',
      title: 'Average product',
      comment: 'It works as expected but nothing extraordinary. The price is reasonable for what you get. Could be better with some improvements.',
      helpful: 5,
      verified: true
    },
    {
      id: 5,
      userName: 'David Brown',
      rating: 5,
      date: '2024-01-03',
      title: 'Outstanding quality',
      comment: 'Amazing product! The quality is top-notch and it has all the features I need. The delivery was fast and packaging was secure.',
      helpful: 20,
      verified: true
    }
  ];

  const ratingDistribution = {
    5: 12,
    4: 8,
    3: 3,
    2: 1,
    1: 1
  };

  const getRatingPercentage = (rating: number) => {
    return (ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100;
  };

  const filteredReviews = reviews.filter(review => {
    if (filterBy === 'all') return true;
    if (filterBy === 'verified') return review.verified;
    return review.rating === parseInt(filterBy);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span>Customer Reviews</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Overall Rating */}
            <div className="text-center lg:text-left">
              <div className="text-4xl font-bold text-foreground mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {totalReviews} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="lg:col-span-2 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-8">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Progress 
                    value={getRatingPercentage(rating)} 
                    className="flex-1 h-2"
                  />
                  <span className="text-sm text-muted-foreground w-8">
                    {ratingDistribution[rating as keyof typeof ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterBy === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('all')}
          >
            All Reviews
          </Button>
          <Button
            variant={filterBy === 'verified' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('verified')}
          >
            Verified Only
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={filterBy === rating.toString() ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy(rating.toString())}
            >
              {rating} Star{rating > 1 ? 's' : ''}
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-background"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {review.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">{review.userName}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <Button size="lg" className="px-8">
          Write a Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewSection;
