
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useWalletPoints } from "./useWalletPoints";

export const useRedeemReward = () => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const queryClient = useQueryClient();
  const { data: currentPoints } = useWalletPoints();

  const redeemMutation = useMutation({
    mutationFn: async ({ rewardId, cost, title }: { rewardId: string; cost: number; title: string }) => {
      setIsRedeeming(true);
      
      // Call the database function for redeeming rewards
      // Using type assertion to avoid TypeScript errors since the function is not in the types file
      const { error } = await supabase.rpc('redeem_reward' as unknown as any, {
        reward_id_param: rewardId,
        cost_param: cost,
        title_param: title
      });
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    },
    onSuccess: () => {
      // Refresh data after successful redemption
      queryClient.invalidateQueries({ queryKey: ["wallet-points"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
      toast.success("Reward redeemed successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setIsRedeeming(false);
    },
  });

  return {
    redeemReward: redeemMutation.mutate,
    isRedeeming: isRedeeming,
    error: redeemMutation.error,
  };
};
