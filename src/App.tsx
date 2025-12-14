import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BusinessSegmentsPage from "./pages/BusinessSegmentsPage";
import FruitsPage from "./pages/FruitsPage";
import VegetablesPage from "./pages/VegetablesPage";
import HerbsPage from "./pages/HerbsPage";
import ExportLogisticsPage from "./pages/ExportLogisticsPage";
import CertificationsPage from "./pages/CertificationsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<BusinessSegmentsPage />} />
            <Route path="/products/fruits" element={<FruitsPage />} />
            <Route path="/products/vegetables" element={<VegetablesPage />} />
            <Route path="/products/herbs" element={<HerbsPage />} />
            <Route path="/export-logistics" element={<ExportLogisticsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
