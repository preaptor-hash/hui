'use client';

import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Try Supabase Auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: username.includes('@') ? username : `${username}@indicaluxe.com`,
      password: password,
    });

    if (authError) {
      // Fallback for demo credentials if strictly requested, 
      // but we should favor real DB users for RBAC
      if (username === 'admin' && password === 'pointLESS123') {
        window.sessionStorage.setItem('admin_auth', 'true');
        onLogin();
      } else {
        setError(authError.message);
      }
    } else {
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin') {
        onLogin();
      } else {
        setError('Access denied: You do not have administrator privileges.');
        await supabase.auth.signOut();
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2>Indica<span>Luxe</span></h2>
          <p>Admin Portal Access</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.loginBtn}>Sign In</button>
        </form>
        <p className={styles.loginFooter}>Secure encrypted connection</p>
      </div>
    </div>
  );
}
