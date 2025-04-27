
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import Points from "./pages/Points";
import Work from "./pages/Work";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Mobile from "./pages/Mobile";
import Auth from "./pages/Auth";
import { AuthGuard } from "./components/AuthGuard";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <AuthGuard>
                    <Index />
                  </AuthGuard>
                }
              />
              <Route
                path="/points"
                element={
                  <AuthGuard>
                    <Points />
                  </AuthGuard>
                }
              />
              <Route
                path="/work"
                element={
                  <AuthGuard>
                    <Work />
                  </AuthGuard>
                }
              />
              <Route
                path="/report"
                element={
                  <AuthGuard>
                    <Report />
                  </AuthGuard>
                }
              />
              <Route
                path="/admin"
                element={
                  <AuthGuard>
                    <Admin />
                  </AuthGuard>
                }
              />
              <Route
                path="/mobile"
                element={
                  <AuthGuard>
                    <Mobile />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
