import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Business } from '../types/business';
import { formatPrice } from '../lib/utils';

interface BusinessCardProps {
  business: Business;
  categorySlug: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, categorySlug }) => {
  return (
    <Link
      to={`/${categorySlug}/${business.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <h3 className="text-xl font-semibold mb-2">{business.name}</h3>
      <p className="text-gray-600 mb-3">{business.address}, {business.city}</p>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-medium">{business.rating.toFixed(1)}</span>
        </div>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600">{business.totalReviews} avis</span>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600">À partir de {formatPrice(Math.min(...business.services.map(s => s.price)))}</p>
      </div>
    </Link>
  );
};

export default BusinessCard;