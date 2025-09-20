import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import RecommendationMetrics from '../../components/admin/RecommendationMetrics';
import AdminLayout from '../../components/layout/AdminLayout';

const MetricsDashboard: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect non-admin users to home
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recommendation System Analytics</h1>
          <p className="text-muted-foreground">
            Monitor the performance and usage of the career recommendation system
          </p>
        </div>
        
        <RecommendationMetrics />
      </div>
    </AdminLayout>
  );
};

export default MetricsDashboard;
