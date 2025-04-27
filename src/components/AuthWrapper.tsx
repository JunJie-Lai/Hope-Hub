
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && !loading) {
        navigate('/auth');
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
