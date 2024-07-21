import { Navbar } from '@/components/navbar/navbar';
import { Sidebar } from '@/components/sidebar/sidebar';
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/Auth';


const ProtectedComponent = ({ children }) => {
      const { isAuthenticated, loading } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();

      React.useEffect(() => {
            if (!loading && !isAuthenticated) {
                  navigate('/masuk', { state: { from: location }, replace: true });
            }
      }, [loading, isAuthenticated, navigate, location]);

      if (loading) {
            return <div>Loading...</div>;
      }

      return isAuthenticated ? children : null;
};

export default function Layout() {
      const { isAuthenticated } = useAuth();

      if (!isAuthenticated) {
            return <div>Loading...</div>; // atau redirect ke halaman login
      }

      return (
            <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
                        <Outlet />
                  </main>
                  <Sidebar />
            </div>
      );
}