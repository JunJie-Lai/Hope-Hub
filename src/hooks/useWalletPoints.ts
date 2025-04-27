
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

      return wallet?.points ?? 0;
    },
  });
};
