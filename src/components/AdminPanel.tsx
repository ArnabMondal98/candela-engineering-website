import React, { useState, useEffect } from 'react';
import { 
  Upload, Plus, Trash2, Save, Check, RefreshCw, X, 
  FileText, Image as ImageIcon, Video, Award, BookOpen, 
  Bell, HelpCircle, ArrowLeft, Layers, Edit2, LogOut, Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_DETAILS, PROJECTS_DATA, CONSULTANCY_DATA, TRADING_DATA, CLIENTS_DATA } from '../data';

// Define TS Interfaces corresponding to application types
interface Scheme {
  id: string;
  title: string;
  description: string;
  category: 'State Govt' | 'Central Govt' | string;
  incentive: string;
  link?: string;
  lastUpdated: string;
}

interface UpdateItem {
  id: string;
  title: string;
  description: string;
  date: string;
  badge?: string;
  link?: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  url: string;
  category: string;
  date: string;
}

interface AdminPanelProps {
  onClose: () => void;
}

const GALLERY_CATEGORIES = ['Electrification', 'Solar Power', 'Substations', 'Industrial', 'Other'];

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'gallery' | 'schemes' | 'updates' | 'clients'>('about');

  // --- 1. LOGO & ABOUT STATE ---
  const [logoBase64, setLogoBase64] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [aboutDetails, setAboutDetails] = useState(COMPANY_DETAILS);
  const [aboutSaved, setAboutSaved] = useState(false);

  // --- 2. SERVICES STATE ---
  const [servicesTab, setServicesTab] = useState<'projects' | 'consultancy' | 'trading'>('projects');
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [consultancyList, setConsultancyList] = useState<any[]>([]);
  const [tradingList, setTradingList] = useState<any[]>([]);
  
  // New Service Form State
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('');
  const [newServiceSpecs, setNewServiceSpecs] = useState(''); // Comma-separated list of highlights

  // --- 3. GALLERY STATE ---
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  // New Gallery Form State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');
  const [newGalleryType, setNewGalleryType] = useState<'image' | 'video'>('image');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Electrification');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryDate, setNewGalleryDate] = useState('July 2026');

  // --- 4. GOVT SCHEMES STATE ---
  const [schemesList, setSchemesList] = useState<Scheme[]>([]);
  // New Scheme Form State
  const [newSchemeTitle, setNewSchemeTitle] = useState('');
  const [newSchemeDesc, setNewSchemeDesc] = useState('');
  const [newSchemeCategory, setNewSchemeCategory] = useState<'State Govt' | 'Central Govt'>('State Govt');
  const [newSchemeIncentive, setNewSchemeIncentive] = useState('');
  const [newSchemeLink, setNewSchemeLink] = useState('');

  // --- 5. LATEST UPDATES STATE ---
  const [updatesList, setUpdatesList] = useState<UpdateItem[]>([]);
  // New Update Form State
  const [newUpdateTitle, setNewUpdateTitle] = useState('');
  const [newUpdateDesc, setNewUpdateDesc] = useState('');
  const [newUpdateBadge, setNewUpdateBadge] = useState('');
  const [newUpdateDate, setNewUpdateDate] = useState('');
  const [newUpdateLink, setNewUpdateLink] = useState('');

  // --- 6. CLIENTS STATE ---
  const [clientsList, setClientsList] = useState<any[]>([]);
  // New Client Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientSubtitle, setNewClientSubtitle] = useState('');
  const [newClientIndustry, setNewClientIndustry] = useState('');
  const [newClientLogo, setNewClientLogo] = useState('');

  // --- GENERAL INITIALIZATION & SYNCHRONIZATION ---
  useEffect(() => {
    // 1. Logo
    setLogoBase64(localStorage.getItem('candela_logo') || '');

    // 2. About
    const savedAbout = localStorage.getItem('candela_company_details');
    if (savedAbout) {
      try { setAboutDetails(JSON.parse(savedAbout)); } catch (e) { setAboutDetails(COMPANY_DETAILS); }
    } else {
      setAboutDetails(COMPANY_DETAILS);
    }

    // 3. Services
    const savedProjects = localStorage.getItem('candela_projects');
    const savedConsultancy = localStorage.getItem('candela_consultancy');
    const savedTrading = localStorage.getItem('candela_trading');
    setProjectsList(savedProjects ? JSON.parse(savedProjects) : PROJECTS_DATA);
    setConsultancyList(savedConsultancy ? JSON.parse(savedConsultancy) : CONSULTANCY_DATA);
    setTradingList(savedTrading ? JSON.parse(savedTrading) : TRADING_DATA);

    // 4. Gallery
    const savedGallery = localStorage.getItem('candela_gallery_items');
    setGalleryItems(savedGallery ? JSON.parse(savedGallery) : []);

    // 5. Schemes & Updates
    const savedSchemes = localStorage.getItem('candela_schemes');
    const savedUpdates = localStorage.getItem('candela_updates');
    setSchemesList(savedSchemes ? JSON.parse(savedSchemes) : []);
    setUpdatesList(savedUpdates ? JSON.parse(savedUpdates) : []);

    // 6. Clients
    const savedClients = localStorage.getItem('candela_clients');
    setClientsList(savedClients ? JSON.parse(savedClients) : CLIENTS_DATA);
  }, []);

  // Dispatch utilities to sync other components
  const triggerUpdate = (eventName: string) => {
    window.dispatchEvent(new CustomEvent(eventName));
  };

  // --- HANDLERS: LOGO & ABOUT US ---
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('candela_logo', base64String);
        setLogoBase64(base64String);
        triggerUpdate('candela-logo-changed');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (logoUrl) {
      localStorage.setItem('candela_logo', logoUrl);
      setLogoBase64(logoUrl);
      setLogoUrl('');
      triggerUpdate('candela-logo-changed');
    }
  };

  const handleResetLogo = () => {
    localStorage.removeItem('candela_logo');
    setLogoBase64('');
    triggerUpdate('candela-logo-changed');
  };

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('candela_company_details', JSON.stringify(aboutDetails));
    setAboutSaved(true);
    triggerUpdate('candela-about-changed');
    setTimeout(() => setAboutSaved(false), 3000);
  };

  const handleResetAbout = () => {
    if (window.confirm("Reset corporate About details to factory defaults? All custom text edits will be reverted.")) {
      localStorage.setItem('candela_company_details', JSON.stringify(COMPANY_DETAILS));
      setAboutDetails(COMPANY_DETAILS);
      triggerUpdate('candela-about-changed');
    }
  };

  // --- HANDLERS: SERVICES MANAGEMENT ---
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle || !newServiceDesc || !newServiceCategory) {
      alert("Please fill out Title, Description, and Category.");
      return;
    }

    const newId = `service-${Date.now()}`;
    const specsArray = newServiceSpecs
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (servicesTab === 'projects') {
      const updated = [...projectsList, {
        id: newId,
        title: newServiceTitle,
        category: newServiceCategory,
        description: newServiceDesc,
        specs: specsArray.length > 0 ? specsArray : ["Industrial compliance & design execution"]
      }];
      setProjectsList(updated);
      localStorage.setItem('candela_projects', JSON.stringify(updated));
    } else if (servicesTab === 'consultancy') {
      const updated = [...consultancyList, {
        id: newId,
        title: newServiceTitle,
        category: newServiceCategory,
        description: newServiceDesc,
        benefits: specsArray.length > 0 ? specsArray : ["Statutory milestones coordination"]
      }];
      setConsultancyList(updated);
      localStorage.setItem('candela_consultancy', JSON.stringify(updated));
    } else {
      const updated = [...tradingList, {
        id: newId,
        title: newServiceTitle,
        category: newServiceCategory,
        description: newServiceDesc,
        specifications: specsArray.length > 0 ? specsArray : ["CPRI tested ratings standards"]
      }];
      setTradingList(updated);
      localStorage.setItem('candela_trading', JSON.stringify(updated));
    }

    // Clean form
    setNewServiceTitle('');
    setNewServiceDesc('');
    setNewServiceCategory('');
    setNewServiceSpecs('');
    triggerUpdate('candela-services-changed');
  };

  const handleDeleteService = (id: string, tab: 'projects' | 'consultancy' | 'trading') => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    if (tab === 'projects') {
      const updated = projectsList.filter(item => item.id !== id);
      setProjectsList(updated);
      localStorage.setItem('candela_projects', JSON.stringify(updated));
    } else if (tab === 'consultancy') {
      const updated = consultancyList.filter(item => item.id !== id);
      setConsultancyList(updated);
      localStorage.setItem('candela_consultancy', JSON.stringify(updated));
    } else {
      const updated = tradingList.filter(item => item.id !== id);
      setTradingList(updated);
      localStorage.setItem('candela_trading', JSON.stringify(updated));
    }
    triggerUpdate('candela-services-changed');
  };

  const handleResetServices = () => {
    if (window.confirm("Restore factory default Services matrices for Projects, Consultancy, and Trading?")) {
      localStorage.removeItem('candela_projects');
      localStorage.removeItem('candela_consultancy');
      localStorage.removeItem('candela_trading');
      setProjectsList(PROJECTS_DATA);
      setConsultancyList(CONSULTANCY_DATA);
      setTradingList(TRADING_DATA);
      triggerUpdate('candela-services-changed');
    }
  };

  // --- HANDLERS: PROJECT GALLERY ---
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryDesc || !newGalleryUrl) {
      alert("Please fill out Title, Description, and Media URL.");
      return;
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newGalleryTitle,
      description: newGalleryDesc,
      type: newGalleryType,
      url: newGalleryUrl,
      category: newGalleryCategory,
      date: newGalleryDate || 'July 2026'
    };

    const updated = [...galleryItems, newItem];
    setGalleryItems(updated);
    localStorage.setItem('candela_gallery_items', JSON.stringify(updated));

    // Clear form
    setNewGalleryTitle('');
    setNewGalleryDesc('');
    setNewGalleryUrl('');
    triggerUpdate('candela-gallery-changed');
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (!window.confirm("Delete this photo/video from the gallery?")) return;
    const updated = galleryItems.filter(item => item.id !== id);
    setGalleryItems(updated);
    localStorage.setItem('candela_gallery_items', JSON.stringify(updated));
    triggerUpdate('candela-gallery-changed');
  };

  const handleLoadDemoGallery = () => {
    const demoItems: GalleryItem[] = [
      {
        id: 'demo-1',
        title: '33KV Electrical Substation Installation',
        description: 'Complete erection, earthing loops, and high-tension transformer commissioning for a manufacturing plant in Midnapore.',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800',
        category: 'Substations',
        date: 'June 2026'
      },
      {
        id: 'demo-2',
        title: 'Rooftop Grid-Connected Solar Array',
        description: '150KW photovoltaic rooftop solar plant integration under WBSEDCL net-metering clearances.',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
        category: 'Solar Power',
        date: 'May 2026'
      },
      {
        id: 'demo-3',
        title: 'Industrial Panel Cabling Operations',
        description: 'Cable tray structural layout, distribution breakers routing, and safety testing operations.',
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-automation-machines-working-in-factory-42866-large.mp4',
        category: 'Electrification',
        date: 'July 2026'
      }
    ];

    setGalleryItems(demoItems);
    localStorage.setItem('candela_gallery_items', JSON.stringify(demoItems));
    triggerUpdate('candela-gallery-changed');
  };

  const handleClearGallery = () => {
    if (window.confirm("Are you sure you want to delete ALL gallery items?")) {
      setGalleryItems([]);
      localStorage.setItem('candela_gallery_items', JSON.stringify([]));
      triggerUpdate('candela-gallery-changed');
    }
  };

  // --- HANDLERS: GOVT SCHEMES ---
  const handleAddScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchemeTitle || !newSchemeDesc || !newSchemeIncentive) {
      alert("Please enter a Title, Description, and Incentive badge.");
      return;
    }

    const newScheme: Scheme = {
      id: `sch-${Date.now()}`,
      title: newSchemeTitle,
      description: newSchemeDesc,
      category: newSchemeCategory,
      incentive: newSchemeIncentive,
      link: newSchemeLink || undefined,
      lastUpdated: 'July 2026'
    };

    const updated = [...schemesList, newScheme];
    setSchemesList(updated);
    localStorage.setItem('candela_schemes', JSON.stringify(updated));

    // Clear form
    setNewSchemeTitle('');
    setNewSchemeDesc('');
    setNewSchemeIncentive('');
    setNewSchemeLink('');
    triggerUpdate('candela-schemes-changed');
  };

  const handleDeleteScheme = (id: string) => {
    if (!window.confirm("Delete this Government scheme?")) return;
    const updated = schemesList.filter(item => item.id !== id);
    setSchemesList(updated);
    localStorage.setItem('candela_schemes', JSON.stringify(updated));
    triggerUpdate('candela-schemes-changed');
  };

  const handleResetSchemes = () => {
    const defaultSchemes: Scheme[] = [
      {
        id: 's-1',
        title: 'West Bengal MSME Electrification Subsidy',
        description: 'Special scheme by the Government of West Bengal providing high-tension electricity line infrastructure and capital subsidy on substation installation costs for registered micro and small enterprises.',
        category: 'State Govt',
        incentive: 'Up to ₹5 Lakh Subsidy',
        link: 'https://wbmsme.gov.in',
        lastUpdated: 'June 2026'
      },
      {
        id: 's-2',
        title: 'WBSEDCL Rooftop Solar Net Metering Policy',
        description: 'Enables commercial, institutional, and residential consumers to install grid-connected solar power plants with automated billing credits and grid offsets under strict safety regulatory clearances.',
        category: 'State Govt',
        incentive: 'Net Metering Approved',
        link: 'https://wbreda.org',
        lastUpdated: 'May 2026'
      },
      {
        id: 's-3',
        title: 'PM-KUSUM Feeder Solarization (Component C)',
        description: 'Central Ministry of New & Renewable Energy (MNRE) national program assisting agricultural feeders electrification, offering solar pump sets grid integrations with heavy capital subsidies.',
        category: 'Central Govt',
        incentive: '60% Financial Subsidy',
        link: 'https://mnre.gov.in',
        lastUpdated: 'July 2026'
      }
    ];

    setSchemesList(defaultSchemes);
    localStorage.setItem('candela_schemes', JSON.stringify(defaultSchemes));
    triggerUpdate('candela-schemes-changed');
  };

  // --- HANDLERS: LATEST UPDATES ---
  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateTitle || !newUpdateDesc) {
      alert("Please enter a Bulletin Headline and Description.");
      return;
    }

    const newUpdate: UpdateItem = {
      id: `up-${Date.now()}`,
      title: newUpdateTitle,
      description: newUpdateDesc,
      date: newUpdateDate || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      badge: newUpdateBadge || undefined,
      link: newUpdateLink || undefined
    };

    const updated = [...updatesList, newUpdate];
    setUpdatesList(updated);
    localStorage.setItem('candela_updates', JSON.stringify(updated));

    // Clear form
    setNewUpdateTitle('');
    setNewUpdateDesc('');
    setNewUpdateBadge('');
    setNewUpdateDate('');
    setNewUpdateLink('');
    triggerUpdate('candela-updates-changed');
  };

  const handleDeleteUpdate = (id: string) => {
    if (!window.confirm("Delete this latest update bulletin?")) return;
    const updated = updatesList.filter(item => item.id !== id);
    setUpdatesList(updated);
    localStorage.setItem('candela_updates', JSON.stringify(updated));
    triggerUpdate('candela-updates-changed');
  };

  const handleResetUpdates = () => {
    const defaultUpdates: UpdateItem[] = [
      {
        id: 'u-1',
        title: 'CEA Safety Inspection Guidelines & Compliance Standard 2026',
        description: 'The Central Electricity Authority (CEA) has announced updated guidelines for earthing design, overcurrent protection relays testing, and sub-station clearance standards.',
        date: 'July 04, 2026',
        badge: 'IMPORTANT',
        link: 'https://cea.nic.in'
      },
      {
        id: 'u-2',
        title: 'Candela Group Selected for 12MW Solar Turnkey Installation',
        description: 'Proud to announce that Candela Engineering & Services has been awarded a major grid-connected solar plant engineering and regulatory compliance project in Midnapore.',
        date: 'June 28, 2026',
        badge: 'NEW',
        link: '#contact'
      }
    ];

    setUpdatesList(defaultUpdates);
    localStorage.setItem('candela_updates', JSON.stringify(defaultUpdates));
    triggerUpdate('candela-updates-changed');
  };

  // --- HANDLERS: CLIENTS ---
  const handleClientLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewClientLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) {
      alert("Please fill out Client Name.");
      return;
    }

    const newId = `cl-${Date.now()}`;
    const newClient = {
      id: newId,
      name: newClientName,
      subtitle: '',
      industry: 'General',
      logo: newClientLogo || undefined
    };

    const updated = [...clientsList, newClient];
    setClientsList(updated);
    localStorage.setItem('candela_clients', JSON.stringify(updated));

    // Clear form
    setNewClientName('');
    setNewClientSubtitle('');
    setNewClientIndustry('');
    setNewClientLogo('');

    triggerUpdate('candela-clients-changed');
  };

  const handleDeleteClient = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    const updated = clientsList.filter(client => client.id !== id);
    setClientsList(updated);
    localStorage.setItem('candela_clients', JSON.stringify(updated));
    triggerUpdate('candela-clients-changed');
  };

  const handleResetClients = () => {
    if (window.confirm("Reset clients to defaults? All custom client entries will be reverted.")) {
      setClientsList(CLIENTS_DATA);
      localStorage.setItem('candela_clients', JSON.stringify(CLIENTS_DATA));
      triggerUpdate('candela-clients-changed');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-950 rounded-sm shadow-xl border border-slate-200 dark:border-slate-850 overflow-hidden">
        
        {/* Header Block */}
        <div className="bg-ces-blue dark:bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-sm border border-white/15">
              <Layers className="w-8 h-8 text-ces-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-ces-accent uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-xs">
                  ADMIN CONSOLE
                </span>
              </div>
              <h1 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight uppercase mt-1">
                Candela Corporate Dashboard
              </h1>
              <p className="text-xs text-slate-300 mt-1 leading-none">
                Modify master configurations, services lists, gallery showcases, and regulatory bulletins.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to log out of your session and lock the Admin Console?")) {
                  localStorage.removeItem('candela_admin_active');
                  window.dispatchEvent(new CustomEvent('candela-admin-changed'));
                  onClose();
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out & Lock</span>
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ces-accent hover:bg-ces-accent/90 text-ces-blue font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Close & View Website</span>
            </button>
          </div>
        </div>

        {/* Inner Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 space-y-1">
            <div className="px-3 py-2 text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 mb-2">
              Configuration Modules
            </div>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-3 cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-ces-blue dark:bg-sky-600 text-white font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Logo & About Us</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-3 cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-ces-blue dark:bg-sky-600 text-white font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Our Services</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-3 cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-ces-blue dark:bg-sky-600 text-white font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Project Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('schemes')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-3 cursor-pointer ${
                activeTab === 'schemes'
                  ? 'bg-ces-blue dark:bg-sky-600 text-white font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Govt Schemes</span>
            </button>

            <button
              onClick={() => setActiveTab('updates')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-3 cursor-pointer ${
                activeTab === 'updates'
                  ? 'bg-ces-blue dark:bg-sky-600 text-white font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Latest Updates</span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-3 cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-ces-blue dark:bg-sky-600 text-white font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Our Clients</span>
            </button>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 mt-8 space-y-2">
              <div className="bg-slate-100 dark:bg-slate-950 p-3 rounded-sm text-[10px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-850 leading-relaxed">
                <span className="font-extrabold text-ces-blue dark:text-sky-400 uppercase tracking-wider block mb-1">Live Updates</span>
                Changes saved in this panel write directly to Local Storage. Swapping views shows updates instantly on the live site!
              </div>
            </div>
          </div>

          {/* Module Screen Content */}
          <div className="lg:col-span-9 p-6 sm:p-8 space-y-6">
            
            {/* --- TAB 1: LOGO & ABOUT US --- */}
            {activeTab === 'about' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Logo Uploader Card */}
                <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-sm border border-slate-200 dark:border-slate-800">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <ImageIcon className="w-4.5 h-4.5 text-ces-accent" />
                    Candela Company Logo Setup
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Logo Preview */}
                    <div className="md:col-span-3 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-sm text-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase mb-2">Active Logo</span>
                      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden border-2 border-ces-blue dark:border-sky-500 shadow-sm">
                        {logoBase64 ? (
                          <img src={logoBase64} alt="Company Logo" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase">Default SVG</div>
                        )}
                      </div>
                      {logoBase64 && (
                        <button
                          onClick={handleResetLogo}
                          className="mt-3 text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                        >
                          Reset to Standard
                        </button>
                      )}
                    </div>

                    {/* Logo Upload Form */}
                    <div className="md:col-span-9 space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                          Method A: Upload Logo Image (PNG/JPG, Under 2MB)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-ces-blue file:text-white hover:file:bg-ces-blue-light file:cursor-pointer"
                        />
                      </div>

                      <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
                        <form onSubmit={handleLogoUrlSubmit} className="space-y-2">
                          <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                            Method B: Provide Image URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              placeholder="https://example.com/logo.png"
                              value={logoUrl}
                              onChange={(e) => setLogoUrl(e.target.value)}
                              className="flex-grow bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue focus:outline-none"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 text-white text-xs font-bold rounded-sm uppercase tracking-wider cursor-pointer"
                            >
                              Save Url
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                  </div>
                </div>

                {/* About details Form */}
                <form onSubmit={handleAboutSubmit} className="space-y-4 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-sm border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-ces-accent" />
                      Change About Us Section Text
                    </h2>
                    <button
                      type="button"
                      onClick={handleResetAbout}
                      className="text-[10px] text-slate-500 dark:text-slate-400 hover:text-ces-blue font-bold flex items-center gap-1 cursor-pointer"
                      title="Reset details to default text"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Restore Default Text
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Company Title Name</label>
                      <input
                        type="text"
                        value={aboutDetails.name}
                        onChange={(e) => setAboutDetails({...aboutDetails, name: e.target.value})}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={aboutDetails.tagline}
                        onChange={(e) => setAboutDetails({...aboutDetails, tagline: e.target.value})}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">About Us Main Description</label>
                    <textarea
                      rows={4}
                      value={aboutDetails.description}
                      onChange={(e) => setAboutDetails({...aboutDetails, description: e.target.value})}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none leading-relaxed"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Our Mission Statement</label>
                      <textarea
                        rows={4}
                        value={aboutDetails.mission}
                        onChange={(e) => setAboutDetails({...aboutDetails, mission: e.target.value})}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none leading-relaxed"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Our Vision Statement</label>
                      <textarea
                        rows={4}
                        value={aboutDetails.vision}
                        onChange={(e) => setAboutDetails({...aboutDetails, vision: e.target.value})}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none leading-relaxed"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-900">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Company Credentials highlights</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {aboutDetails.credentials?.map((cred, index) => (
                        <div key={index}>
                          <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Credential #{index+1}</label>
                          <input
                            type="text"
                            value={cred}
                            onChange={(e) => {
                              const newCreds = [...(aboutDetails.credentials || [])];
                              newCreds[index] = e.target.value;
                              setAboutDetails({...aboutDetails, credentials: newCreds});
                            }}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3 py-1.5 text-xs focus:outline-none"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-ces-blue hover:bg-ces-blue-light text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save About Us Text
                    </button>
                    {aboutSaved && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1 animate-pulse">
                        <Check className="w-4 h-4" /> Changes Saved Successfully
                      </span>
                    )}
                  </div>
                </form>

              </div>
            )}

            {/* --- TAB 2: OUR SERVICES --- */}
            {activeTab === 'services' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-4.5 h-4.5 text-ces-accent" />
                      Manage Our Services Matrix
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-1">Add, edit, and delete services under the three corporate verticals.</p>
                  </div>
                  <button
                    onClick={handleResetServices}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-ces-blue font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset to Factory Defaults
                  </button>
                </div>

                {/* Vertical Tab Selector */}
                <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800">
                  {(['projects', 'consultancy', 'trading'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setServicesTab(tab)}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                        servicesTab === tab
                          ? 'bg-ces-blue text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                      }`}
                    >
                      {tab === 'projects' ? 'Projects' : tab === 'consultancy' ? 'Consultancy' : 'Trading'}
                    </button>
                  ))}
                </div>

                {/* Add New Service Form */}
                <form onSubmit={handleAddService} className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-sm border border-slate-200 dark:border-slate-800 space-y-4">
                  <span className="text-[10px] font-extrabold text-ces-blue dark:text-sky-400 uppercase tracking-widest block mb-1">
                    Add New Service to {servicesTab === 'projects' ? 'Projects' : servicesTab === 'consultancy' ? 'Consultancy' : 'Trading'}
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Service Heading / Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. 33KV Substation Erection"
                        value={newServiceTitle}
                        onChange={(e) => setNewServiceTitle(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Classification Category / Department *</label>
                      <input
                        type="text"
                        placeholder="e.g. Turnkey Execution, Regulatory, Switchgear"
                        value={newServiceCategory}
                        onChange={(e) => setNewServiceCategory(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Description / Scope Summary *</label>
                    <textarea
                      rows={2}
                      placeholder="Enter a brief summary of what this service offers..."
                      value={newServiceDesc}
                      onChange={(e) => setNewServiceDesc(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Specifications / Highlights (Comma-separated checklist)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HT & LT cable laying, Oil filtration testing, No-Objection Certificate coordination"
                      value={newServiceSpecs}
                      onChange={(e) => setNewServiceSpecs(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                    />
                    <span className="text-[9px] text-slate-400 mt-1 block">Separating statements with commas will automatically display them as checklist bullets in the service viewer drawer.</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-ces-accent" />
                    <span>Create Service Item</span>
                  </button>
                </form>

                {/* List Existing Services with Deletion Option */}
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Existing {servicesTab === 'projects' ? 'Projects' : servicesTab === 'consultancy' ? 'Consultancy' : 'Trading'} ({
                      servicesTab === 'projects' ? projectsList.length : servicesTab === 'consultancy' ? consultancyList.length : tradingList.length
                    })
                  </span>

                  <div className="divide-y divide-slate-100 dark:divide-slate-850 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
                    {(servicesTab === 'projects' ? projectsList : servicesTab === 'consultancy' ? consultancyList : tradingList).map((service, index) => (
                      <div key={service.id || index} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/45 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-ces-blue dark:text-sky-400 font-bold">
                              {servicesTab === 'projects' ? `CES-PRJ-${String(index+1).padStart(2, '0')}` : servicesTab === 'consultancy' ? `CES-CON-${String(index+1).padStart(2, '0')}` : `CES-TRD-${String(index+1).padStart(2, '0')}`}
                            </span>
                            <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                              {service.title}
                            </span>
                            <span className="bg-slate-100 dark:bg-slate-900 text-slate-500 text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-800">
                              {service.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{service.description}</p>
                          
                          {/* Render Bullets preview */}
                          {((service.specs || service.benefits || service.specifications) && (
                            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1.5">
                              {(service.specs || service.benefits || service.specifications).slice(0, 3).map((b: string, i: number) => (
                                <span key={i} className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 leading-none">
                                  <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                                  <span>{b}</span>
                                </span>
                              ))}
                              {(service.specs || service.benefits || service.specifications).length > 3 && (
                                <span className="text-[9px] text-slate-400">+{(service.specs || service.benefits || service.specifications).length - 3} more</span>
                              )}
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handleDeleteService(service.id, servicesTab)}
                          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-200/40 transition-all cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* --- TAB 3: PROJECT GALLERY --- */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <ImageIcon className="w-4.5 h-4.5 text-ces-accent" />
                      Manage Showcase Portfolio Gallery
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-1">Upload photos, register videos, and coordinate the project carousel.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLoadDemoGallery}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-sm flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-ces-accent" />
                      Load Showcase Demo Media
                    </button>
                    <button
                      onClick={handleClearGallery}
                      className="px-3 py-1.5 text-rose-500 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold rounded-sm flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Add New Gallery Media form */}
                <form onSubmit={handleAddGalleryItem} className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-sm border border-slate-200 dark:border-slate-800 space-y-4">
                  <span className="text-[10px] font-extrabold text-ces-blue dark:text-sky-400 uppercase tracking-widest block mb-1">
                    Add New Showcase Photo or Video Asset
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Asset Heading / Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. 100KW Transformer Hookup"
                        value={newGalleryTitle}
                        onChange={(e) => setNewGalleryTitle(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Media Type *</label>
                      <select
                        value={newGalleryType}
                        onChange={(e) => setNewGalleryType(e.target.value as 'image' | 'video')}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3 py-2 text-xs focus:outline-none font-bold"
                      >
                        <option value="image">Still Image / Photo</option>
                        <option value="video">Motion Video (.mp4 link)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Classification Category *</label>
                      <select
                        value={newGalleryCategory}
                        onChange={(e) => setNewGalleryCategory(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3 py-2 text-xs focus:outline-none font-bold"
                      >
                        {GALLERY_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Media File / Streaming URL *</label>
                      <input
                        type="url"
                        placeholder="e.g. https://images.unsplash.com/photo-1544724569-5f546fd6f2b5"
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Completion Date</label>
                      <input
                        type="text"
                        placeholder="e.g. July 2026, May 2026"
                        value={newGalleryDate}
                        onChange={(e) => setNewGalleryDate(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Operational Description / Scope Summary *</label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe the machinery or electrical system displayed..."
                      value={newGalleryDesc}
                      onChange={(e) => setNewGalleryDesc(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-ces-accent" />
                    <span>Deploy to Showcase</span>
                  </button>
                </form>

                {/* Grid list of existing Gallery Items */}
                <div className="space-y-3">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Existing Portfolio Items ({galleryItems.length})
                  </span>

                  {galleryItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {galleryItems.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-sm overflow-hidden flex flex-col justify-between shadow-xs">
                          {/* Thumbnail */}
                          <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                            {item.type === 'video' ? (
                              <div className="relative w-full h-full flex items-center justify-center">
                                <video src={item.url} className="w-full h-full object-cover opacity-75" muted />
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20">
                                  <Video className="w-8 h-8 text-white drop-shadow-sm" />
                                </div>
                              </div>
                            ) : (
                              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                            )}
                            <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          </div>

                          {/* Info */}
                          <div className="p-3 flex-grow flex flex-col justify-between">
                            <div>
                              <h3 className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-wide truncate leading-tight">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-normal">{item.description}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-900 mt-2">
                              <span className="text-[9px] text-slate-400 font-bold uppercase">{item.date}</span>
                              <button
                                onClick={() => handleDeleteGalleryItem(item.id)}
                                className="text-rose-500 hover:text-rose-600 p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded transition-colors cursor-pointer"
                                title="Delete media item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-sm">
                      <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-bold">No gallery items are currently active.</p>
                      <p className="text-[10px] text-slate-400 mt-1">Click "Load Showcase Demo Media" above or fill in the form to register photos.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* --- TAB 4: GOVT SCHEMES --- */}
            {activeTab === 'schemes' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4.5 h-4.5 text-ces-accent" />
                      Manage Government Schemes & Incentives
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-1">Publish state and central electricity subsidies, capital grants, and rooftop solar net-meterings.</p>
                  </div>
                  <button
                    onClick={handleResetSchemes}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-ces-blue font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                    Reset to Default Schemes
                  </button>
                </div>

                {/* Add New Scheme Form */}
                <form onSubmit={handleAddScheme} className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-sm border border-slate-200 dark:border-slate-800 space-y-4">
                  <span className="text-[10px] font-extrabold text-ces-blue dark:text-sky-400 uppercase tracking-widest block mb-1">
                    Add New Subsidy Policy / Govt Scheme
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Scheme Heading / Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. WBSEDCL Rooftop Solar Net Metering Policy"
                        value={newSchemeTitle}
                        onChange={(e) => setNewSchemeTitle(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Jurisdiction Level *</label>
                      <select
                        value={newSchemeCategory}
                        onChange={(e) => setNewSchemeCategory(e.target.value as 'State Govt' | 'Central Govt')}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3 py-2 text-xs focus:outline-none font-bold"
                      >
                        <option value="State Govt">State Govt (West Bengal)</option>
                        <option value="Central Govt">Central Govt (National)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Note / Incentive Badge *</label>
                      <input
                        type="text"
                        placeholder="e.g. Up to 60% Financial Subsidy"
                        value={newSchemeIncentive}
                        onChange={(e) => setNewSchemeIncentive(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Guidelines / PDF Document Link (URL)</label>
                      <input
                        type="url"
                        placeholder="https://example-gov.in/subsidies-guidelines.pdf"
                        value={newSchemeLink}
                        onChange={(e) => setNewSchemeLink(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Policy Description / Regulatory Scope *</label>
                    <textarea
                      rows={2}
                      placeholder="Explain who is eligible and what infrastructure grants or financial duty offsets this policy covers..."
                      value={newSchemeDesc}
                      onChange={(e) => setNewSchemeDesc(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-ces-accent" />
                    <span>Publish Policy Scheme</span>
                  </button>
                </form>

                {/* List Schemes with Delete */}
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Active Subsidies & Policies ({schemesList.length})
                  </span>

                  {schemesList.length > 0 ? (
                    <div className="divide-y divide-slate-100 dark:divide-slate-850 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
                      {schemesList.map((scheme, index) => (
                        <div key={scheme.id || index} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/45 transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                                {scheme.title}
                              </span>
                              <span className="bg-ces-blue/10 text-ces-blue dark:bg-sky-950 dark:text-sky-300 text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded border border-ces-blue/10">
                                {scheme.category}
                              </span>
                              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded border border-emerald-100">
                                {scheme.incentive}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{scheme.description}</p>
                            {scheme.link && (
                              <a href={scheme.link} target="_blank" rel="noreferrer" className="text-[10px] text-ces-blue hover:underline font-bold block pt-1">
                                Document Link: {scheme.link}
                              </a>
                            )}
                          </div>

                          <button
                            onClick={() => handleDeleteScheme(scheme.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-200/40 transition-colors cursor-pointer shrink-0"
                            title="Delete Scheme"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-sm">
                      <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-bold">No regulatory schemes published.</p>
                      <p className="text-[10px] text-slate-400 mt-1">Click "Reset to Default Schemes" above to restore sample policies.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* --- TAB 5: LATEST UPDATES --- */}
            {activeTab === 'updates' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <Bell className="w-4.5 h-4.5 text-ces-accent" />
                      Manage Latest Bulletins & Announcements
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-1">Add circular notices, national electricity mandates, safety codes, and company updates.</p>
                  </div>
                  <button
                    onClick={handleResetUpdates}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-ces-blue font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset to Default Bulletins
                  </button>
                </div>

                {/* Add New Update form */}
                <form onSubmit={handleAddUpdate} className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-sm border border-slate-200 dark:border-slate-800 space-y-4">
                  <span className="text-[10px] font-extrabold text-ces-blue dark:text-sky-400 uppercase tracking-widest block mb-1">
                    Add New Announcement Bulletin
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Bulletin Headline / Heading *</label>
                      <input
                        type="text"
                        placeholder="e.g. CEA Safety Inspection Guidelines & Compliance Standard"
                        value={newUpdateTitle}
                        onChange={(e) => setNewUpdateTitle(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Sticker Badge (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. IMPORTANT, NEW, none"
                        value={newUpdateBadge}
                        onChange={(e) => setNewUpdateBadge(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Posting Date (Leave blank for today)</label>
                      <input
                        type="text"
                        placeholder="e.g. July 06, 2026"
                        value={newUpdateDate}
                        onChange={(e) => setNewUpdateDate(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Reference Link / PDF Document Link (URL)</label>
                      <input
                        type="text"
                        placeholder="e.g. https://cea.nic.in/notices/doc.pdf"
                        value={newUpdateLink}
                        onChange={(e) => setNewUpdateLink(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Announcement Details / Scope *</label>
                    <textarea
                      rows={2}
                      placeholder="Write the full description or official memo summarizing this circular notice..."
                      value={newUpdateDesc}
                      onChange={(e) => setNewUpdateDesc(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-ces-accent" />
                    <span>Publish Announcement</span>
                  </button>
                </form>

                {/* List Bulletins with Delete */}
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Active Bulletins & Notices ({updatesList.length})
                  </span>

                  {updatesList.length > 0 ? (
                    <div className="divide-y divide-slate-100 dark:divide-slate-850 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
                      {updatesList.map((item, index) => (
                        <div key={item.id || index} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/45 transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="bg-red-50 text-red-700 text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded border border-red-100 animate-pulse">
                                  {item.badge}
                                </span>
                              )}
                              <span className="text-slate-400 text-[10px] font-bold">
                                {item.date}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                            {item.link && (
                              <span className="text-[10px] text-slate-400 block pt-0.5">
                                Link: <a href={item.link} target="_blank" rel="noreferrer" className="text-ces-blue hover:underline font-bold">{item.link}</a>
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleDeleteUpdate(item.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-200/40 transition-colors cursor-pointer shrink-0"
                            title="Delete Announcement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-sm">
                      <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-bold">No announcements published.</p>
                      <p className="text-[10px] text-slate-400 mt-1">Click "Reset to Default Bulletins" above to restore circular notices.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* --- TAB 6: OUR CLIENTS --- */}
            {activeTab === 'clients' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <Users className="w-4.5 h-4.5 text-ces-accent" />
                      Manage Corporate Clients
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-1">Register new clients, upload client brand logos, and configure the scrolling clients slider track.</p>
                  </div>
                  <button
                    onClick={handleResetClients}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-ces-blue font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset to Default Clients
                  </button>
                </div>

                {/* Add New Client form */}
                <form onSubmit={handleAddClient} className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-sm border border-slate-200 dark:border-slate-800 space-y-4">
                  <span className="text-[10px] font-extrabold text-ces-blue dark:text-sky-400 uppercase tracking-widest block mb-1">
                    Add New Client Brand
                  </span>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Company Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. TATA STEEL LIMITED"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Client Brand Logo (Upload Image, PNG/JPG recommended, Under 2MB)</label>
                    <div className="flex items-center gap-4 mt-1.5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleClientLogoUpload}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-ces-blue file:text-white hover:file:bg-ces-blue-light file:cursor-pointer"
                      />
                      {newClientLogo && (
                        <div className="relative w-14 h-14 bg-white rounded-md border border-slate-200 p-1 flex items-center justify-center shrink-0">
                          <img src={newClientLogo} alt="Preview" className="max-w-full max-h-full object-contain" />
                          <button
                            type="button"
                            onClick={() => setNewClientLogo('')}
                            className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 hover:bg-rose-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-ces-accent" />
                    <span>Register Client to Slider</span>
                  </button>
                </form>

                {/* List clients with Delete */}
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Existing Slider Clients ({clientsList.length})
                  </span>

                  {clientsList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {clientsList.map((client) => (
                        <div key={client.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-sm p-4 flex items-center justify-between gap-3 shadow-xs">
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Logo view */}
                            <div className="w-12 h-12 rounded bg-slate-50 border border-slate-200/50 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                              {client.logo ? (
                                <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                              ) : (
                                <span className="font-mono text-[8px] font-extrabold text-slate-400 tracking-tight leading-none text-center uppercase">{client.id}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-150 uppercase tracking-wide truncate leading-tight">
                                {client.name}
                              </h4>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteClient(client.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-200/40 transition-colors cursor-pointer shrink-0"
                            title="Remove Client"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-sm">
                      <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-bold">No clients registered.</p>
                      <p className="text-[10px] text-slate-400 mt-1">Click "Reset to Default Clients" above to load factory mock brands.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
