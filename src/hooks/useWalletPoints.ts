
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useWalletPoints = () => {
  return useQuery({
    queryKey: ["wallet-points"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("No authenticated user found");
      }

      const { data: wallet, error } = await supabase
        .from('wallet')
        .select('points')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      // If wallet doesn't exist, create it
      if (!wallet) {
        const { error: insertError } = await supabase
          .from('wallet')
          .insert({
            id: user.id,
            points: 0,
            updated_at: new Date().toISOString()
          });
        
        if (insertError) {
          throw insertError;
        }
        
        return 0; // New wallet has 0 points
      }

      return wallet?.points ?? 0;
    },
  });
};
