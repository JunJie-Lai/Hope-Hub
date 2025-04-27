
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

interface AuthRouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthRouteGuard = ({ children, requireAuth = true }: AuthRouteGuardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (requireAuth && !session) {
        // Redirect to auth if user is not logged in and route requires auth
        navigate('/auth');
      } else if (!requireAuth && session) {
        // Redirect to home if user is logged in and route doesn't require auth
        navigate('/');
      }
    };

    // Check initial auth state
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (requireAuth && !session) {
        navigate('/auth');
      } else if (!requireAuth && session) {
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, requireAuth]);

  return <>{children}</>;
};
