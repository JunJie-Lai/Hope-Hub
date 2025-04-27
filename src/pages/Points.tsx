
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Header } from "@/components/points/Header";
import { RedemptionSection } from "@/components/points/RedemptionSection";
import { TasksSection } from "@/components/points/TasksSection";
import { HistorySection } from "@/components/points/HistorySection";
import { useWalletPoints } from "@/hooks/useWalletPoints";
import { useTasks } from "@/hooks/useTasks";

const Points = () => {
  const navigate = useNavigate();
  const { 
    data: points, 
    isLoading: isLoadingPoints,
    error: pointsError 
  } = useWalletPoints();
  
  const { 
    data: tasks, 
    isLoading: isLoadingTasks,
    error: tasksError 
  } = useTasks();

  if (pointsError || tasksError) {
    toast.error("Failed to load data");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        <Header points={points} isLoading={isLoadingPoints} />
        <RedemptionSection />
        <TasksSection tasks={tasks || []} isLoading={isLoadingTasks} />
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
