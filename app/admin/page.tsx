'use client';

import React, { useState, useEffect } from 'react';
import AdminDashboard from '@/admin-panel/AdminDashboard';
import AdminLogin from '@/admin-panel/AdminLogin';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on client after mounting to avoid hydration mismatch
    const authStatus = window.sessionStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsMounted(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    window.sessionStorage.setItem('admin_auth', 'true');
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

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard />;
}
