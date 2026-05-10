'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login?redirect=/admin');
      } else if (profile && profile.role !== 'admin' && profile.role !== 'manager' && profile.role !== 'super_admin') {
        // If logged in but not an admin, kick them out to storefront
        router.push('/');
      }
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-[#f8f9fa]">Loading Admin...</div>;
  }

  if (!user || (profile && profile.role !== 'admin' && profile.role !== 'manager' && profile.role !== 'super_admin')) return null; // Redirecting

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200/50 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="text-lg font-medium text-zinc-800">
            Welcome back, {user.email}
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-zinc-100 text-zinc-600 border border-zinc-200/80 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {profile?.role || 'Admin'}
            </span>
            <div className="h-8 w-8 rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold shadow-sm">
              {(user.email?.[0] || 'A').toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fa] relative">
          {children}
        </main>
      </div>
    </div>
  );
}
