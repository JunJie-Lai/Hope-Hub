
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTaskActions = () => {
  const queryClient = useQueryClient();

  const startTask = async (taskId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Check if wallet exists, create if it doesn't
    const { data: walletData } = await supabase
      .from('wallet')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (!walletData) {
      // Create wallet for the user
      const { error: walletError } = await supabase
        .from('wallet')
        .insert({
          id: user.id,
          points: 0,
          updated_at: new Date().toISOString()
        });

      if (walletError) {
        console.error('Error creating wallet:', walletError);
        toast.error("Failed to initialize wallet");
        return false;
      }
    }

    const { error } = await supabase
      .from('active_tasks')
      .insert({
        task_id: taskId,
        user_id: user.id
      });

    if (error) {
      console.error('Error starting task:', error);
      toast.error("Failed to start task");
      return false;
    }

    await queryClient.invalidateQueries({ queryKey: ['active-tasks'] });
    return true;
  };

  const finishTask = async (taskId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Check if wallet exists, create if it doesn't
    const { data: walletData } = await supabase
      .from('wallet')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (!walletData) {
      // Create wallet for the user
      const { error: walletError } = await supabase
        .from('wallet')
        .insert({
          id: user.id,
          points: 0,
          updated_at: new Date().toISOString()
        });

      if (walletError) {
        console.error('Error creating wallet:', walletError);
        toast.error("Failed to initialize wallet");
        return false;
      }
    }

    const { error: rpcError } = await supabase
      .rpc('complete_task', {
        task_id_param: taskId,
        user_id_param: user.id
      });

    if (rpcError) {
      console.error('Error completing task:', rpcError);
      toast.error("Failed to complete task");
      return false;
    }

    const { error: deleteError } = await supabase
      .from('active_tasks')
      .delete()
      .eq('task_id', taskId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error removing active task:', deleteError);
    }

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['active-tasks'] }),
      queryClient.invalidateQueries({ queryKey: ['wallet-points'] }),
      queryClient.invalidateQueries({ queryKey: ['transaction-history'] })
    ]);

    toast.success("Task completed successfully!");
    return true;
  };

  return { startTask, finishTask };
};
