
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TransactionHistory {
  id: string;
  type: 'task' | 'report' | 'reward' | 'job' | null;
  points: number;
  created_at: string;
  title: string | null;
}

export const useTransactionHistory = () => {
  return useQuery({
    queryKey: ["transaction-history"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        throw new Error("No authenticated user found");
      }

      const { data, error } = await supabase
        .rpc('get_transaction_history', {
          user_id_param: user.user.id,
        }) as { data: TransactionHistory[] | null, error: Error | null };

      if (error) {
        throw error;
      }

      return (data || []) as TransactionHistory[];
    },
  });
};
