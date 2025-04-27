
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
}

export const useRewards = () => {
  return useQuery({
    queryKey: ["rewards"],
    queryFn: async () => {
      const { data: rewards, error } = await supabase
        .from('rewards')
        .select('*')
        .order('cost', { ascending: true });

      if (error) {
        throw error;
      }

      return (rewards || []) as Reward[];
    },
  });
};
