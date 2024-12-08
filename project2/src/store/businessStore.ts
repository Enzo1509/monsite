import { create } from 'zustand';
import type { Business } from '@/types/business';
import { getAllBusinesses, createBusiness as dbCreateBusiness, updateBusiness as dbUpdateBusiness, deleteBusiness as dbDeleteBusiness } from '@/lib/db';

interface BusinessState {
  businesses: Business[];
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
  loadBusinesses: () => Promise<void>;
  addBusiness: (business: Omit<Business, 'id' | 'rating' | 'totalReviews' | 'reviews' | 'services'>) => Promise<Business>;
  updateBusiness: (id: string, business: Business) => Promise<Business>;
  deleteBusiness: (id: string) => Promise<void>;
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
  businesses: [],
  selectedCity: null,
  setSelectedCity: (city) => set({ selectedCity: city }),
  
  loadBusinesses: async () => {
    const businesses = await getAllBusinesses();
    set({ businesses });
  },
  
  addBusiness: async (business) => {
    const newBusiness = await dbCreateBusiness(business);
    set(state => ({
      businesses: [...state.businesses, newBusiness],
    }));
    return newBusiness;
  },
  
  updateBusiness: async (id, business) => {
    const updatedBusiness = await dbUpdateBusiness(id, business);
    set(state => ({
      businesses: state.businesses.map(b =>
        b.id === id ? updatedBusiness : b
      ),
    }));
    return updatedBusiness;
  },
  
  deleteBusiness: async (id) => {
    await dbDeleteBusiness(id);
    set(state => ({
      businesses: state.businesses.filter(b => b.id !== id),
    }));
  },
}));