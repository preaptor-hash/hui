import { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: {
    template: '%s | AdminPro Dashboard',
    default: 'AdminPro Dashboard',
  },
  description: 'Enterprise eCommerce Administration',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }

  // Fetch user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // If strict role checking is needed
  const adminRoles = ['admin', 'manager', 'super_admin'];
  if (!profile || !adminRoles.includes(profile.role)) {
    // Optionally redirect to home if not admin
    // redirect('/');
  }

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header Navbar could go here */}
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
