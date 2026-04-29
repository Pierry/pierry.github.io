import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Article from "./pages/Article";
import Newsletters from "./pages/Newsletters";
import Threads from "./pages/Threads";
import Thread from "./pages/Thread";
import DevSimulator from "./pages/DevSimulator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/newsletters/:entryId" element={<Newsletters />} />
          <Route path="/threads" element={<Threads />} />
          <Route path="/threads/:slug" element={<Thread />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/games/dev-simulator" element={<DevSimulator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
