import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.email}</p>
    </div>
  );
}
