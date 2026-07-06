import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TabsSection from './components/TabsSection';
import Gallery from './components/Gallery';
import Clients from './components/Clients';
import UpdatesAndSchemes from './components/UpdatesAndSchemes';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAdminView, setIsAdminView] = useState(false);
  const [preFillType, setPreFillType] = useState<'Project' | 'Consultancy' | 'Trading' | 'General' | null>(null);
  const [preFillServiceName, setPreFillServiceName] = useState('');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark class on document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Handle section scrolling highlight logic
  useEffect(() => {
    const handleScroll = () => {
      if (isAdminView) return; // Ignore scrolling events during admin mode
      const sections = ['hero', 'about', 'services', 'gallery', 'clients', 'govt-schemes', 'latest-updates', 'contact'];
      const scrollPosition = window.scrollY + 160; // Offset for header height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminView]);

  // Listen to admin event requests from header or other elements
  useEffect(() => {
    const handleToggleAdminView = (e: any) => {
      setIsAdminView(e.detail === true);
    };
    window.addEventListener('candela-toggle-admin-view', handleToggleAdminView);
    return () => {
      window.removeEventListener('candela-toggle-admin-view', handleToggleAdminView);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setIsAdminView(false); // Automatically return to website view if navigating
    setActiveSection(sectionId);
  };

  const handlePreFillInquiry = (serviceType: 'Project' | 'Consultancy' | 'Trading', serviceName: string) => {
    setPreFillType(serviceType);
    setPreFillServiceName(serviceName);
  };

  const clearPreFill = () => {
    setPreFillType(null);
    setPreFillServiceName('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-ces-blue selection:text-white flex flex-col transition-colors duration-300">
      {/* Header Utility Ribbon and Navigations */}
      <Header 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        isDark={isDark} 
        onToggleDark={() => setIsDark(!isDark)}
        isAdminView={isAdminView}
        onToggleAdminView={setIsAdminView}
      />

      {/* Main Core Site Segments */}
      <main className="flex-grow">
        {isAdminView ? (
          <AdminPanel onClose={() => setIsAdminView(false)} />
        ) : (
          <>
            {/* Banner with decorative metrics */}
            <Hero onNavigate={handleNavigate} />

            {/* Story details, mission, vision */}
            <About />

            {/* Service metrics tabular grid panels */}
            <TabsSection onPreFillInquiry={handlePreFillInquiry} />

            {/* Dynamic Project Media Gallery & Admin Portal */}
            <Gallery />

            {/* Partner conglomerates carousel-like logo grid */}
            <Clients />

            {/* Government Schemes & Latest Updates with Admin Portal Workspace */}
            <UpdatesAndSchemes />

            {/* RFP submission forms & persistent inquiry history records */}
            <Contact 
              preFillType={preFillType} 
              preFillServiceName={preFillServiceName} 
              clearPreFill={clearPreFill} 
            />
          </>
        )}
      </main>

      {/* Footer copyright and license tags */}
      <Footer />
    </div>
  );
}
