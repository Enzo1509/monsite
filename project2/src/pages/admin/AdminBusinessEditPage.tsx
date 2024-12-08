import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import { useBusinessMutations } from '@/hooks/useBusinessMutations';
import type { Business, BusinessCategory } from '@/types/business';

const businessSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    icon: z.string(),
  }),
  address: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, 'La ville est requise'),
});

type BusinessForm = z.infer<typeof businessSchema>;

const categories: BusinessCategory[] = [
  { id: '1', name: 'Garagiste', slug: 'garagiste', icon: 'car' },
  { id: '2', name: 'Coiffeur', slug: 'coiffeur', icon: 'scissors' },
  { id: '3', name: 'Restaurant', slug: 'restaurant', icon: 'utensils' },
];

const AdminBusinessEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { businessId } = useParams<{ businessId: string }>();
  const isNewBusiness = businessId === 'new';
  const { createBusiness, editBusiness } = useBusinessMutations();

  const { data: business, isLoading } = useQuery<Business>({
    queryKey: ['admin-business', businessId],
    queryFn: async () => {
      if (isNewBusiness) {
        return {
          id: '',
          name: '',
          category: categories[0],
          address: '',
          city: '',
          rating: 0,
          totalReviews: 0,
          reviews: [],
          services: [],
        };
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: '1',
        name: 'Garage Premium Auto',
        category: categories[0],
        address: '123 rue de la Réparation',
        city: 'Paris',
        rating: 4.8,
        totalReviews: 127,
        reviews: [],
        services: [],
      };
    },
    enabled: !!businessId,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessForm>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: business?.name || '',
      category: business?.category || categories[0],
      address: business?.address || '',
      city: business?.city || '',
    },
  });

  const onSubmit = async (data: BusinessForm) => {
    try {
      if (isNewBusiness) {
        await createBusiness.mutateAsync(data);
      } else if (business) {
        await editBusiness.mutateAsync({ ...business, ...data });
      }
      navigate('/admin/businesses');
    } catch (error) {
      console.error('Failed to save business:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">
        {isNewBusiness ? 'Nouvelle entreprise' : 'Modifier l\'entreprise'}
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Catégorie
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  value={categories.findIndex(c => c.id === field.value.id)}
                  onChange={e => field.onChange(categories[parseInt(e.target.value)])}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {categories.map((category, index) => (
                    <option key={category.id} value={index}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <input
              type="text"
              {...register('address')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ville
            </label>
            <input
              type="text"
              {...register('city')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || createBusiness.isPending || editBusiness.isPending}
            >
              {isSubmitting || createBusiness.isPending || editBusiness.isPending
                ? 'Enregistrement...'
                : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBusinessEditPage;