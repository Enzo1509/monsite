import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import type { Service } from '@/types/business';
import { formatPrice } from '@/lib/utils';
import Button from '../ui/Button';
import BookingModal from '../booking/BookingModal';

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{service.duration} min</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold mb-2">{formatPrice(service.price)}</div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedService(service)}
                >
                  Réserver
                </Button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <BookingModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      )}
    </>
  );
};

export default ServiceList;