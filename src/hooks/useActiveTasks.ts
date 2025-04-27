
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useActiveTasks = () => {
  return useQuery({
    queryKey: ["active-tasks"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('active_tasks')
        .select('task_id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      return (data || []).map(item => item.task_id);
    },
  });
};
