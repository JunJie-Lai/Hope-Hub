
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
      
      // Check if user is authenticated
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        throw new Error("You must be logged in to redeem rewards");
      }
      
      // Check if user has enough points
      if (currentPoints < cost) {
        throw new Error(`Not enough points. You need ${cost} points but have ${currentPoints}`);
      }
      
      // Begin a transaction using RPC for atomic operations
      const { error } = await supabase.rpc('redeem_reward', {
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
