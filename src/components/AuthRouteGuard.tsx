import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AuthRouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthRouteGuard = ({
  children,
  requireAuth = true,
}: AuthRouteGuardProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const isAuthenticated = !!session;
        setAuthenticated(isAuthenticated);

        if (requireAuth && !isAuthenticated) {
          // Redirect to /auth if the route requires authentication and the user is not authenticated
          navigate("/auth");
        } else if (!requireAuth && isAuthenticated) {
          // Redirect to / if the route doesn't require authentication and the user is authenticated
          navigate("/");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        if (requireAuth) {
          navigate("/auth"); // Ensure redirection to /auth on error
        }
      } finally {
        setLoading(false);
      }
    };

    // Initial authentication check
    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const isAuthenticated = !!session;
      setAuthenticated(isAuthenticated);

      if (requireAuth && !isAuthenticated) {
        navigate("/auth");
      } else if (!requireAuth && isAuthenticated) {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe(); // Cleanup subscription on unmount
    };
  }, [navigate, requireAuth]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is authenticated and route requires auth, or unauthenticated and doesn't, render children
  if ((requireAuth && authenticated) || (!requireAuth && !authenticated)) {
    return <>{children}</>;
  }

  // Default fallback (rarely used as navigation usually happens)
  return null;
};
