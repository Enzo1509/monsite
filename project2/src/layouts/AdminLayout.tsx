import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, LayoutDashboard, LogOut } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useAuthStore } from '@/store/authStore';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Si on est sur la page de login ou non authentifié, on affiche juste le contenu
  if (!isAuthenticated || location.pathname === '/admin/login') {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <Logo />
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/businesses"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <Building2 className="h-5 w-5 mr-3" />
            Entreprises
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;