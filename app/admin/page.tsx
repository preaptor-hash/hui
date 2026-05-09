'use client';

import React, { useState, useEffect } from 'react';
import AdminDashboard from '@/admin-panel/AdminDashboard';
import AdminLogin from '@/admin-panel/AdminLogin';
import { useAuth } from '@/lib/AuthContext';

export default function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = () => {
    // AuthContext will automatically update and trigger re-render
  };

  // Avoid hydration mismatch by waiting for mount
  if (!isMounted || loading) {
    return (
      <div style={{ 
        height: '100vh', 
        background: '#0a0a0b',
      }} />
    );
  }

  if (!user || !isAdmin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard />;
}
