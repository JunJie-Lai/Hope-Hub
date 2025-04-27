
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Earn More Points</h2>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
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
          ))
        ) : tasks.length === 0 ? (
          <Card className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
            <p className="text-center text-gray-500">No tasks available at the moment.</p>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="space-y-2 mb-4 md:mb-0">
                  <h3 className="text-2xl font-semibold text-gray-800">📋 {task.title}</h3>
                  <p className="text-lg text-gray-600">{task.description}</p>
                  <p className="text-xl font-bold text-emerald-700">+{task.points} Points</p>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-lg py-5 px-8">
                  Start
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};
