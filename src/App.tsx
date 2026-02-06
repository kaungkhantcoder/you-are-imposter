import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "@/hooks/useLang";
import { GameSessionProvider } from "@/hooks/useGameSession";
import Index from "./pages/Index";
import GameSetup from "./pages/GameSetup";
import GamePlay from "./pages/GamePlay";
import OnlineMode from "./pages/OnlineMode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LangProvider>
      <GameSessionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/setup" element={<GameSetup />} />
              <Route path="/play/:sessionId" element={<GamePlay />} />
              <Route path="/online" element={<OnlineMode />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </GameSessionProvider>
    </LangProvider>
  </QueryClientProvider>
);

export default App;
