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
    // This will now be handled by real Supabase Auth in the AdminLogin component
    window.location.reload(); 
  };

  // Avoid hydration mismatch by waiting for mount
  if (!isMounted) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#0a0a0b',
        color: '#c4a163',
        fontSize: '1.2rem',
        fontFamily: 'Inter, sans-serif'
      }}>
        Initializing Admin Portal...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard />;
}
