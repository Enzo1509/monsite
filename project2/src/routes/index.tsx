import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import AdminLayout from '@/layouts/AdminLayout';
import HomePage from '@/pages/HomePage';
import CategoryLayout from '@/layouts/CategoryLayout';
import BusinessListPage from '@/pages/BusinessListPage';
import BusinessPage from '@/pages/BusinessPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminBusinessesPage from '@/pages/admin/AdminBusinessesPage';
import AdminBusinessEditPage from '@/pages/admin/AdminBusinessEditPage';
import { useAuthStore } from '@/store/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ':category',
        element: <CategoryLayout />,
        children: [
          {
            index: true,
            element: <BusinessListPage />,
          },
          {
            path: ':businessId',
            element: <BusinessPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'login',
        element: <AdminLoginPage />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'businesses',
        element: (
          <ProtectedRoute>
            <AdminBusinessesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'businesses/:businessId',
        element: (
          <ProtectedRoute>
            <AdminBusinessEditPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);