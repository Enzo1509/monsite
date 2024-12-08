import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Service } from '@/types/business';
import BookingCalendar from './BookingCalendar';
import Button from '../ui/Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, service }) => {
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; time: string } | null>(null);

  if (!isOpen) return null;

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDateTime({ date, time });
  };

  const handleBooking = () => {
    if (selectedDateTime) {
      // Here you would typically make an API call to create the booking
      console.log('Booking created:', {
        service,
        date: selectedDateTime.date,
        time: selectedDateTime.time,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Réserver un rendez-vous</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <BookingCalendar
            selectedService={service}
            onSelectDateTime={handleDateTimeSelect}
          />

          {selectedDateTime && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleBooking} size="lg">
                Confirmer le rendez-vous
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;