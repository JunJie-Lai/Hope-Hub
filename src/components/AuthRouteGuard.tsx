
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

interface AuthRouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthRouteGuard = ({ children, requireAuth = true }: AuthRouteGuardProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        const isAuthenticated = !!session;
        setAuthenticated(isAuthenticated);
        
        if (!requireAuth && !isAuthenticated) {
          // Redirect to auth if user is not logged in and route requires auth
          navigate('/auth');
        } else if (requireAuth && isAuthenticated) {
          // Redirect to home if user is logged in and route doesn't require auth
          navigate('/');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        if (!requireAuth) {
          // Redirect to auth on error if the route requires authentication
          navigate('/auth');
        }
      } finally {
        setLoading(false);
      }
    };

    // Check initial auth state
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isAuthenticated = !!session;
      setAuthenticated(isAuthenticated);
      
      if (!requireAuth && !isAuthenticated) {
        navigate('/auth');
      } else if (requireAuth && isAuthenticated) {
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, requireAuth]);

  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If authentication check is complete, render children based on authentication requirements
  if ((!requireAuth && authenticated) || (requireAuth && !authenticated)) {
    return <>{children}</>;
  }

  // This should rarely be visible as the navigation should happen immediately
  return null;
};
