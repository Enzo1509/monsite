import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import ReviewList from '@/components/reviews/ReviewList';
import ServiceList from '@/components/services/ServiceList';

// Mock data - In a real app, this would come from an API
const mockBusiness = {
  id: '1',
  name: 'Garage Premium Auto',
  category: { id: '1', name: 'Garagiste', slug: 'garagiste', icon: 'car' },
  address: '123 rue de la Réparation',
  city: 'Paris',
  rating: 4.8,
  totalReviews: 127,
  reviews: [
    { id: '1', rating: 5, comment: 'Excellent service, très professionnel !', author: 'Jean D.', date: '2024-02-15' },
    { id: '2', rating: 4, comment: 'Bon rapport qualité-prix', author: 'Marie L.', date: '2024-02-10' }
  ],
  services: [
    { id: '1', name: 'Révision complète', duration: 120, price: 149.99, description: 'Révision complète du véhicule' },
    { id: '2', name: 'Vidange', duration: 60, price: 79.99, description: 'Vidange moteur et filtres' }
  ]
};

const BusinessPage: React.FC = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">{mockBusiness.name}</h1>
        
        <ReviewList
          reviews={mockBusiness.reviews}
          totalReviews={mockBusiness.totalReviews}
          rating={mockBusiness.rating}
          showReviews={showReviews}
          onToggleReviews={() => setShowReviews(!showReviews)}
        />

        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{mockBusiness.address}, {mockBusiness.city}</span>
        </div>

        <h2 className="text-xl font-semibold mb-4">Nos services</h2>
        <ServiceList services={mockBusiness.services} />
      </div>
    </div>
  );
};

export default BusinessPage;