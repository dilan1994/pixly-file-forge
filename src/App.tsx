import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './i18n'; // Import i18n configuration
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { PWAProvider } from '@/components/pwa/PWAProvider';
import Index from '@/pages/Index';
import { GuidePage } from '@/pages/GuidePage';
import { FAQPage } from '@/pages/FAQPage';
import { AboutUsPage } from '@/pages/AboutUsPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { SupportPage } from '@/pages/SupportPage';
import { TermsOfServicePage } from '@/pages/TermsOfServicePage';
import { CareersPage } from '@/pages/CareersPage';
import { ContactSupportPage } from '@/pages/ContactSupportPage';
import { CookiesPolicyPage } from '@/pages/CookiesPolicyPage';
import { GDPRCompliancePage } from '@/pages/GDPRCompliancePage';
import { ChangelogPage } from '@/pages/ChangelogPage';
import { APIAccessPage } from '@/pages/APIAccessPage';
import QRGenerator from '@/pages/tools/QRGenerator';
import NotFound from '@/pages/NotFound';
import { MobileAppPage } from '@/pages/MobileAppPage';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { buttonEffects } from '@/utils/buttonEffects';
import i18n from '@/i18n';

// Loading component for i18n
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    // Set theme attribute on document element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Initialize button effects after theme change
    setTimeout(() => {
      buttonEffects.initializeAllButtons();
    }, 100);
  }, [theme]);

  useEffect(() => {
    // Initialize button effects on mount
    buttonEffects.initializeAllButtons();
    
    // Cleanup on unmount
    return () => {
      buttonEffects.cleanup();
    };
  }, []);

  return (
    <ThemeProvider>
      <PWAProvider
        enableInstallPrompt={true}
        enableUpdateNotifications={true}
        enableOfflineIndicator={true}
        installPromptVariant="banner"
        updateNotificationVariant="toast"
        offlineIndicatorVariant="banner"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/guide" element={<GuidePage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/contact" element={<ContactSupportPage />} />
                  <Route path="/cookies" element={<CookiesPolicyPage />} />
                  <Route path="/gdpr" element={<GDPRCompliancePage />} />
                  <Route path="/changelog" element={<ChangelogPage />} />
                  <Route path="/api" element={<APIAccessPage />} />
                  <Route path="/mobile" element={<MobileAppPage />} />
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
      </PWAProvider>
    </ThemeProvider>
  );
}

export default App;
