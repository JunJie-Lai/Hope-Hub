
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useActiveJobs } from "@/hooks/useActiveJobs";
import { useJobActions } from "@/hooks/useJobActions";
import { useWalletPoints } from "@/hooks/useWalletPoints";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  points: number;
}

const Work = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: activeJobIds = [], isLoading: isLoadingActiveJobs } = useActiveJobs();
  const { acceptJob, finishJob } = useJobActions();
  const { refetch: refetchWallet } = useWalletPoints();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*');

        if (error) throw error;
        setJobs(data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobAction = async (job: Job, isActive: boolean) => {
    if (isActive) {
      const success = await finishJob(job.id);
      if (success) {
        refetchWallet();
      }
    } else {
      await acceptJob(job.id);
    }
  };

  const isJobActive = (jobId: string) => {
    return activeJobIds.includes(jobId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Find Nearby Jobs</h1>
          <p className="text-xl text-gray-700">Pick small jobs near you to earn HopePoints!</p>
        </div>

        {/* Jobs List Section */}
        <div className="space-y-6 animate-fade-in">
          {loading || isLoadingActiveJobs ? (
            // Loading skeletons
            Array(4).fill(null).map((_, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                  <Skeleton className="h-14 w-full" />
                </div>
              </Card>
            ))
          ) : jobs.length > 0 ? (
            jobs.map((job) => {
              const active = isJobActive(job.id);
              return (
                <Card key={job.id} className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">🛠️ {job.title}</h2>
                    <p className="text-lg text-gray-600">{job.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">📍 {job.location}</span>
                      <span className="text-xl font-bold text-emerald-700">+{job.points} HopePoints</span>
                    </div>
                    
                    <Button 
                      className={`w-full text-xl py-6 ${
                        active 
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={() => handleJobAction(job, active)}
                    >
                      {active ? (
                        <>
                          <CheckCircle className="mr-2" /> Finish Job
                        </>
                      ) : (
                        "Accept Job"
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="text-center text-gray-600 py-8">
              No jobs available at the moment
            </div>
          )}
        </div>
        
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

export default Work;
