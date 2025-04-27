
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
}

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*');

      if (error) {
        throw error;
      }

      return (tasks || []) as Task[];
    },
  });
};
