
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Header } from "@/components/points/Header";
import { RedemptionSection } from "@/components/points/RedemptionSection";
import { TasksSection } from "@/components/points/TasksSection";
import { HistorySection } from "@/components/points/HistorySection";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
}

const Points = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState<number | null>(null);
  const [isLoadingPoints, setIsLoadingPoints] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  useEffect(() => {
    const fetchWalletPoints = async () => {
      try {
        setIsLoadingPoints(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.error("No authenticated user found");
          return;
        }

        console.log("Fetching wallet for user:", user.id);
        const { data: wallet, error } = await supabase
          .from('wallet')
          .select('points')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching wallet points:', error);
          return;
        }

        if (wallet) {
          console.log("Wallet data:", wallet);
          setPoints(wallet.points);
        } else {
          console.log("No wallet found for user");
        }
      } catch (error) {
        console.error("Error in fetchWalletPoints:", error);
      } finally {
        setIsLoadingPoints(false);
      }
    };

    const fetchTasks = async () => {
      try {
        setIsLoadingTasks(true);
        console.log("Fetching tasks...");
        const { data: tasksData, error } = await supabase
          .from('tasks')
          .select('*');

        if (error) {
          console.error('Error fetching tasks:', error);
          toast.error("Failed to load tasks");
          return;
        }

        console.log("Tasks data:", tasksData);
        setTasks(tasksData || []);
      } catch (error) {
        console.error("Error in fetchTasks:", error);
        toast.error("Failed to load tasks");
      } finally {
        setIsLoadingTasks(false);
      }
    };

    fetchWalletPoints();
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        <Header points={points} isLoading={isLoadingPoints} />
        <RedemptionSection />
        <TasksSection tasks={tasks} isLoading={isLoadingTasks} />
        <HistorySection />
        
        <div className="pt-4 animate-fade-in">
          <Button 
            className="w-full bg-purple-400 hover:bg-purple-500 text-white rounded-full text-xl p-7"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2" /> Go Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Points;
