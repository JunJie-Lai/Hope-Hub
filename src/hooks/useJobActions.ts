
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useJobActions = () => {
  const queryClient = useQueryClient();

  const acceptJob = async (jobId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from('active_jobs')
      .insert({
        job_id: jobId,
        user_id: user.id
      });

    if (error) {
      console.error('Error accepting job:', error);
      toast.error("Failed to accept job");
      return false;
    }

    await queryClient.invalidateQueries({ queryKey: ['active-jobs'] });
    toast.success("Job accepted successfully!");
    return true;
  };

  const finishJob = async (jobId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error: rpcError } = await supabase
      .rpc('complete_job', {
        job_id_param: jobId,
        user_id_param: user.id
      });

    if (rpcError) {
      console.error('Error completing job:', rpcError);
      toast.error("Failed to complete job");
      return false;
    }

    const { error: deleteError } = await supabase
      .from('active_jobs')
      .delete()
      .eq('job_id', jobId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error removing active job:', deleteError);
    }

    // Invalidate all relevant queries to refresh data
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['active-jobs'] }),
      queryClient.invalidateQueries({ queryKey: ['wallet-points'] }),
      queryClient.invalidateQueries({ queryKey: ['transaction-history'] })
    ]);

    toast.success("Job completed successfully! Points added to your wallet.");
    return true;
  };

  return { acceptJob, finishJob };
};
