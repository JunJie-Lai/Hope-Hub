import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTaskActions } from "@/hooks/useTaskActions";
import { useActiveTasks } from "@/hooks/useActiveTasks";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
}

interface TasksSectionProps {
  tasks: Task[];
  isLoading: boolean;
}

export const TasksSection = ({ tasks, isLoading }: TasksSectionProps) => {
  const { startTask, finishTask } = useTaskActions();
  const { data: activeTasks = [], isLoading: isLoadingActiveTasks } = useActiveTasks();

  const handleTaskAction = async (taskId: string, isActive: boolean) => {
    if (isActive) {
      await finishTask(taskId);
    } else {
      await startTask(taskId);
    }
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Earn More Points</h2>
      </div>
      
      <div className="space-y-4">
        {isLoading || isLoadingActiveTasks ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Card key={i} className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="space-y-2 mb-4 md:mb-0">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-6 w-96" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-12 w-24" />
                </div>
              </Card>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <Card className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
            <p className="text-center text-gray-500">No tasks available at the moment.</p>
          </Card>
        ) : (
          tasks.map((task) => {
            const isActive = activeTasks.includes(task.id);
            return (
              <Card key={task.id} className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="space-y-2 mb-4 md:mb-0">
                    <h3 className="text-2xl font-semibold text-gray-800">📋 {task.title}</h3>
                    <p className="text-lg text-gray-600">{task.description}</p>
                    <p className="text-xl font-bold text-emerald-700">+{task.points} Points</p>
                  </div>
                  <Button 
                    className={`text-lg py-5 px-8 ${
                      isActive 
                        ? 'bg-emerald-500 hover:bg-emerald-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    onClick={() => handleTaskAction(task.id, isActive)}
                  >
                    {isActive ? 'Finish' : 'Start'}
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
};
