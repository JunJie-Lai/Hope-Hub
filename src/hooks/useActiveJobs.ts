
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useActiveJobs = () => {
  return useQuery({
    queryKey: ["active-jobs"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from('active_jobs')
        .select('job_id')
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      return data.map(item => item.job_id);
    },
  });
};
