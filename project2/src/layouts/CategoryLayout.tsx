import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useBusinessStore } from '@/store/businessStore';
import SearchBar from '@/components/SearchBar';

const CategoryLayout: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const selectedCity = useBusinessStore(state => state.selectedCity);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-6 text-center capitalize">
          Trouvez {getCategoryTitle(category)} près de chez vous
        </h1>
        <SearchBar />
      </div>
      <Outlet />
    </div>
  );
};

function getCategoryTitle(category: string | undefined): string {
  switch (category) {
    case 'garagiste':
      return 'un garagiste';
    case 'coiffeur':
      return 'un coiffeur';
    case 'restaurant':
      return 'un restaurant';
    default:
      return 'un professionnel';
  }
}

export default CategoryLayout;