import React, { useEffect } from 'react'
import { useAuthStore } from '../../lib/store/authStore'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api/apiClient'
import { Navigate, useLocation } from 'react-router'
import { Loader2Icon } from 'lucide-react'
export const AdminProtectedRoutes = ({ children }) => {
  const { user, token, setAuth, clearAuth } = useAuthStore();
  const location = useLocation();

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    // just retry one more to fetch data
    retry: 1,
  });

  // validations

  // Error case
  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, error, clearAuth]);

  // success case
  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data, token);
    }
  }, [isSuccess, data, setAuth, token]);

  isLoading && (
    <div className="min-h-screen flex justify-center items-center">
      <Loader2Icon size={20} className="animate-spin" />
    </div>
  );

  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

if (user.role !== 'admin') {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;

};

