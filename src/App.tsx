import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './i18n'; // Import i18n configuration
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Index from '@/pages/Index';
import { GuidePage } from '@/pages/GuidePage';
import { FAQPage } from '@/pages/FAQPage';
import QRGenerator from '@/pages/tools/QRGenerator';
import NotFound from '@/pages/NotFound';

// Loading component for i18n
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/tools/qr-generator" element={<QRGenerator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgb(var(--background))',
                  color: 'rgb(var(--foreground))',
                  border: '1px solid rgb(var(--border))',
                },
              }}
            />
          </div>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
