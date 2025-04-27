
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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
        {/* Header Section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="text-6xl">🏆</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {isLoadingPoints ? "Loading points..." : `You have ${points ?? 0} HopePoints!`}
          </h1>
        </div>
        
        {/* Redemption Section */}
        <section className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Redeem Your HopePoints</h2>
            <p className="text-xl text-gray-700 mt-2">
              Use your HopePoints to get food, transport, and other essentials!
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
              <div className="space-y-4 text-center">
                <div className="text-4xl">🍔</div>
                <h3 className="text-2xl font-semibold text-gray-800">Food Coupon</h3>
                <p className="text-xl font-bold text-emerald-700">100 HopePoints</p>
                <p className="text-gray-600">Redeem for a $10 meal voucher</p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-xl py-6">
                  Redeem
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
              <div className="space-y-4 text-center">
                <div className="text-4xl">🚌</div>
                <h3 className="text-2xl font-semibold text-gray-800">Transport Pass</h3>
                <p className="text-xl font-bold text-emerald-700">150 HopePoints</p>
                <p className="text-gray-600">Bus pass valid for 1 day</p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-xl py-6">
                  Redeem
                </Button>
              </div>
            </Card>

            <Card className="md:col-span-2 p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
              <div className="space-y-4 text-center">
                <div className="text-4xl">🛒</div>
                <h3 className="text-2xl font-semibold text-gray-800">Hygiene Kit</h3>
                <p className="text-xl font-bold text-emerald-700">200 HopePoints</p>
                <p className="text-gray-600">Includes soap, toothbrush, sanitizer</p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-xl py-6">
                  Redeem
                </Button>
              </div>
            </Card>
          </div>
        </section>
        
        {/* Earn More Points Section */}
        <section className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Earn More Points</h2>
          </div>
          
          <div className="space-y-4">
            {isLoadingTasks ? (
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
        
        {/* Points History Section */}
        <section className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">HopePoints History</h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg">Date</TableHead>
                  <TableHead className="text-lg">Action</TableHead>
                  <TableHead className="text-lg">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-base">April 26, 2025</TableCell>
                  <TableCell className="text-base">Attended Workshop</TableCell>
                  <TableCell className="text-base font-semibold text-emerald-700">+75</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-base">April 25, 2025</TableCell>
                  <TableCell className="text-base">Completed Microjob</TableCell>
                  <TableCell className="text-base font-semibold text-emerald-700">+50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-base">April 24, 2025</TableCell>
                  <TableCell className="text-base">Completed Microjob</TableCell>
                  <TableCell className="text-base font-semibold text-emerald-700">+100</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
        
        {/* Go Back Button */}
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
