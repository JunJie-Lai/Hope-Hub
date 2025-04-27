
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import Points from "./pages/Points";
import Work from "./pages/Work";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Mobile from "./pages/Mobile";
import Auth from "./pages/Auth";
import { AuthRouteGuard } from "./components/AuthRouteGuard";

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
              <Route 
                path="/auth" 
                element={
                  <AuthRouteGuard requireAuth={false}>
                    <Auth />
                  </AuthRouteGuard>
                } 
              />
              <Route
                path="/"
                element={
                  <AuthRouteGuard>
                    <Index />
                  </AuthRouteGuard>
                }
              />
              <Route
                path="/points"
                element={
                  <AuthRouteGuard>
                    <Points />
                  </AuthRouteGuard>
                }
              />
              <Route
                path="/work"
                element={
                  <AuthRouteGuard>
                    <Work />
                  </AuthRouteGuard>
                }
              />
              <Route
                path="/report"
                element={
                  <AuthRouteGuard>
                    <Report />
                  </AuthRouteGuard>
                }
              />
              <Route
                path="/admin"
                element={
                  <AuthRouteGuard>
                    <Admin />
                  </AuthRouteGuard>
                }
              />
              <Route
                path="/mobile"
                element={
                  <AuthRouteGuard requireAuth={false}>
                    <Mobile />
                  </AuthRouteGuard>
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
