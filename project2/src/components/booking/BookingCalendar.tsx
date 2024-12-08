import React, { useState } from 'react';
import { format, addDays, startOfWeek, addWeeks, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Service } from '@/types/business';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingCalendarProps {
  selectedService: Service | null;
  onSelectDateTime: (date: Date, time: string) => void;
}

const generateTimeSlots = (startHour: number = 9, endHour: number = 19): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    ['00', '30'].forEach(minutes => {
      slots.push({
        time: `${hour}:${minutes}`,
        available: Math.random() > 0.3, // Simulate availability
      });
    });
  }
  return slots;
};

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedService,
  onSelectDateTime,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = generateTimeSlots();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      onSelectDateTime(selectedDate, time);
    }
  };

  const getDaysArray = () => {
    const start = startOfWeek(currentDate, { locale: fr });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {selectedService && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-lg mb-2">{selectedService.name}</h3>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{selectedService.duration} min</span>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentDate(date => addWeeks(date, -1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </h3>
          <button
            onClick={() => setCurrentDate(date => addWeeks(date, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getDaysArray().map((date, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-500 mb-1">
                {format(date, 'EEE', { locale: fr })}
              </div>
              <button
                onClick={() => handleDateSelect(date)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors',
                  isSameDay(date, selectedDate || new Date())
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                )}
              >
                {format(date, 'd')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h4 className="font-medium mb-4">
            Horaires disponibles le{' '}
            {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!slot.available}
                onClick={() => handleTimeSelect(slot.time)}
                className={cn(
                  'py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                  slot.available
                    ? selectedTime === slot.time
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;