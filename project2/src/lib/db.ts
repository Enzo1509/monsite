import { openDB } from 'idb';
import type { Business } from '@/types/business';

const DB_NAME = 'book-it-db';
const STORE_NAME = 'businesses';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
  },
});

export async function initDatabase() {
  await dbPromise;
}

export async function getAllBusinesses(): Promise<Business[]> {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
}

export async function createBusiness(business: Omit<Business, 'id' | 'rating' | 'totalReviews' | 'reviews' | 'services'>) {
  const db = await dbPromise;
  const id = Math.random().toString(36).substr(2, 9);
  
  const newBusiness: Business = {
    ...business,
    id,
    rating: 0,
    totalReviews: 0,
    reviews: [],
    services: [],
  };
  
  await db.add(STORE_NAME, newBusiness);
  return newBusiness;
}

export async function updateBusiness(id: string, business: Business) {
  const db = await dbPromise;
  await db.put(STORE_NAME, business);
  return business;
}

export async function deleteBusiness(id: string) {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
}