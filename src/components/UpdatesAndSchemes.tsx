import React, { useState, useEffect } from 'react';
import { 
  Building2, Landmark, Clock, FileText, Plus, Edit2, Trash2, Check, X, 
  ShieldAlert, Key, AlertCircle, ChevronRight, ExternalLink, RefreshCw, Lock, Unlock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CompanyLogo from './CompanyLogo';

export interface Scheme {
  id: string;
  title: string;
  description: string;
  category: 'State Govt' | 'Central Govt';
  incentive: string;
  link: string;
  lastUpdated: string;
}

export interface UpdateItem {
  id: string;
  title: string;
  description: string;
  date: string;
  badge: 'NEW' | 'IMPORTANT' | 'ALERT' | '';
  link?: string;
}

const DEFAULT_SCHEMES: Scheme[] = [];

const DEFAULT_UPDATES: UpdateItem[] = [];

export default function UpdatesAndSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  
  // Selection/Filtering State
  const [activeTab, setActiveTab] = useState<'all' | 'state' | 'central'>('all');
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem('candela_admin_active') === 'true';
  });
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleAdminChange = () => {
      setIsAdminMode(localStorage.getItem('candela_admin_active') === 'true');
    };
    window.addEventListener('candela-admin-changed', handleAdminChange);
    window.addEventListener('storage', handleAdminChange);
    return () => {
      window.removeEventListener('candela-admin-changed', handleAdminChange);
      window.removeEventListener('storage', handleAdminChange);
    };
  }, []);

  // Edit/Add Modals State
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [editingUpdate, setEditingUpdate] = useState<UpdateItem | null>(null);
  const [isAddingScheme, setIsAddingScheme] = useState(false);
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);

  // Form Field States - Schemes
  const [schemeTitle, setSchemeTitle] = useState('');
  const [schemeDescription, setSchemeDescription] = useState('');
  const [schemeCategory, setSchemeCategory] = useState<'State Govt' | 'Central Govt'>('State Govt');
  const [schemeIncentive, setSchemeIncentive] = useState('');
  const [schemeLink, setSchemeLink] = useState('');

  // Form Field States - Updates
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [updateBadge, setUpdateBadge] = useState<'NEW' | 'IMPORTANT' | 'ALERT' | ''>('');
  const [updateLink, setUpdateLink] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    if (adminParam === 'true' || adminParam === 'candela' || adminParam === 'admin') {
      setIsAdminMode(true);
      localStorage.setItem('candela_admin_active', 'true');
      window.dispatchEvent(new CustomEvent('candela-admin-changed'));
    } else if (adminParam === 'false' || adminParam === 'logout') {
      setIsAdminMode(false);
      localStorage.removeItem('candela_admin_active');
      window.dispatchEvent(new CustomEvent('candela-admin-changed'));
    }

    const alreadyCleared = localStorage.getItem('candela_data_v2_cleared');
    if (!alreadyCleared) {
      localStorage.setItem('candela_schemes', JSON.stringify([]));
      localStorage.setItem('candela_updates', JSON.stringify([]));
      localStorage.setItem('candela_data_v2_cleared', 'true');
    }

    const savedSchemes = localStorage.getItem('candela_schemes');
    const savedUpdates = localStorage.getItem('candela_updates');
    
    if (savedSchemes) {
      setSchemes(JSON.parse(savedSchemes));
    } else {
      setSchemes(DEFAULT_SCHEMES);
      localStorage.setItem('candela_schemes', JSON.stringify(DEFAULT_SCHEMES));
    }

    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    } else {
      setUpdates(DEFAULT_UPDATES);
      localStorage.setItem('candela_updates', JSON.stringify(DEFAULT_UPDATES));
    }

    const handleExternalChanges = () => {
      const schemesStore = localStorage.getItem('candela_schemes');
      const updatesStore = localStorage.getItem('candela_updates');
      if (schemesStore) setSchemes(JSON.parse(schemesStore));
      if (updatesStore) setUpdates(JSON.parse(updatesStore));
    };

    window.addEventListener('candela-schemes-changed', handleExternalChanges);
    window.addEventListener('candela-updates-changed', handleExternalChanges);
    window.addEventListener('storage', handleExternalChanges);

    return () => {
      window.removeEventListener('candela-schemes-changed', handleExternalChanges);
      window.removeEventListener('candela-updates-changed', handleExternalChanges);
      window.removeEventListener('storage', handleExternalChanges);
    };
  }, []);

  // Save changes helper
  const saveSchemesToStorage = (updatedSchemes: Scheme[]) => {
    setSchemes(updatedSchemes);
    localStorage.setItem('candela_schemes', JSON.stringify(updatedSchemes));
  };

  const saveUpdatesToStorage = (updatedUpdates: UpdateItem[]) => {
    setUpdates(updatedUpdates);
    localStorage.setItem('candela_updates', JSON.stringify(updatedUpdates));
  };

  // Reset to default helper
  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all schemes and updates to default factory details? Your custom modifications will be lost.')) {
      saveSchemesToStorage(DEFAULT_SCHEMES);
      saveUpdatesToStorage(DEFAULT_UPDATES);
    }
  };

  // Admin login trigger
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === 'admin' || adminPasscode === 'candela') {
      setIsAdminMode(true);
      localStorage.setItem('candela_admin_active', 'true');
      window.dispatchEvent(new CustomEvent('candela-admin-changed'));
      setShowLoginModal(false);
      setAdminPasscode('');
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid credentials. Hint: use "admin" or "candela"');
    }
  };

  // Logout
  const handleAdminLogout = () => {
    setIsAdminMode(false);
    localStorage.removeItem('candela_admin_active');
    window.dispatchEvent(new CustomEvent('candela-admin-changed'));
  };

  // Open edit scheme modal
  const startEditScheme = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setSchemeTitle(scheme.title);
    setSchemeDescription(scheme.description);
    setSchemeCategory(scheme.category);
    setSchemeIncentive(scheme.incentive);
    setSchemeLink(scheme.link);
    setIsAddingScheme(false);
  };

  // Start add scheme
  const startAddScheme = () => {
    setEditingScheme(null);
    setSchemeTitle('');
    setSchemeDescription('');
    setSchemeCategory('State Govt');
    setSchemeIncentive('');
    setSchemeLink('');
    setIsAddingScheme(true);
  };

  // Save / Add Scheme Submission
  const handleSchemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schemeTitle || !schemeDescription || !schemeIncentive) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isAddingScheme) {
      const newScheme: Scheme = {
        id: `s-${Date.now()}`,
        title: schemeTitle,
        description: schemeDescription,
        category: schemeCategory,
        incentive: schemeIncentive,
        link: schemeLink || '#',
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      saveSchemesToStorage([...schemes, newScheme]);
      setIsAddingScheme(false);
    } else if (editingScheme) {
      const updatedSchemes = schemes.map(s => {
        if (s.id === editingScheme.id) {
          return {
            ...s,
            title: schemeTitle,
            description: schemeDescription,
            category: schemeCategory,
            incentive: schemeIncentive,
            link: schemeLink || '#',
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          };
        }
        return s;
      });
      saveSchemesToStorage(updatedSchemes);
      setEditingScheme(null);
    }
  };

  // Delete scheme
  const handleDeleteScheme = (id: string) => {
    if (window.confirm('Delete this government scheme permanently?')) {
      const updated = schemes.filter(s => s.id !== id);
      saveSchemesToStorage(updated);
    }
  };

  // Open edit update modal
  const startEditUpdate = (update: UpdateItem) => {
    setEditingUpdate(update);
    setUpdateTitle(update.title);
    setUpdateDescription(update.description);
    setUpdateDate(update.date);
    setUpdateBadge(update.badge);
    setUpdateLink(update.link || '');
    setIsAddingUpdate(false);
  };

  // Start add update
  const startAddUpdate = () => {
    setEditingUpdate(null);
    setUpdateTitle('');
    setUpdateDescription('');
    setUpdateDate(new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    setUpdateBadge('NEW');
    setUpdateLink('');
    setIsAddingUpdate(true);
  };

  // Save / Add Update Submission
  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle || !updateDescription) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isAddingUpdate) {
      const newUpdate: UpdateItem = {
        id: `u-${Date.now()}`,
        title: updateTitle,
        description: updateDescription,
        date: updateDate || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        badge: updateBadge,
        link: updateLink || undefined
      };
      saveUpdatesToStorage([newUpdate, ...updates]);
      setIsAddingUpdate(false);
    } else if (editingUpdate) {
      const updatedUpdates = updates.map(u => {
        if (u.id === editingUpdate.id) {
          return {
            ...u,
            title: updateTitle,
            description: updateDescription,
            date: updateDate,
            badge: updateBadge,
            link: updateLink || undefined
          };
        }
        return u;
      });
      saveUpdatesToStorage(updatedUpdates);
      setEditingUpdate(null);
    }
  };

  // Delete update item
  const handleDeleteUpdate = (id: string) => {
    if (window.confirm('Delete this update bulletin permanently?')) {
      const updated = updates.filter(u => u.id !== id);
      saveUpdatesToStorage(updated);
    }
  };

  // Scheme list filter logic
  const filteredSchemes = schemes.filter(s => {
    if (activeTab === 'all') return true;
    if (activeTab === 'state') return s.category === 'State Govt';
    if (activeTab === 'central') return s.category === 'Central Govt';
    return true;
  });

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ces-accent mb-1.5">Compliance & Bulletins</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ces-blue dark:text-sky-450 tracking-tight leading-none transition-colors duration-300">
              Govt. Schemes & Latest Updates
            </h2>
            <div className="w-16 h-1 bg-ces-blue dark:bg-sky-500 mt-4 rounded-sm transition-colors duration-300"></div>
          </div>

          {/* Admin Toggle button in top right of section */}
          {isAdminMode && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-sm border border-emerald-200 dark:border-emerald-900">
                <Unlock className="w-3.5 h-3.5" />
                Admin Console Unlocked
              </span>
              <button
                onClick={handleResetToDefaults}
                className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-700 dark:text-slate-400 rounded-sm border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                title="Reset both sections to factory default values"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={handleAdminLogout}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Lock Panel
              </button>
            </div>
          )}
        </div>

        {/* Admin Dashboard Actions (Logo & Brand Management) */}
        {isAdminMode && (
          <div className="mb-8 p-5 bg-gradient-to-r from-ces-blue/5 to-ces-accent/5 dark:from-sky-500/5 dark:to-ces-accent/5 border border-ces-blue/20 dark:border-sky-500/20 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Circular Company Logo with quick upload / change */}
              <div className="relative group/dash-logo w-16 h-16 flex items-center justify-center shrink-0 drop-shadow-md">
                <CompanyLogo className="w-16 h-16" />
                <label className="absolute inset-0 bg-slate-900/80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/dash-logo:opacity-100 transition-opacity duration-200 cursor-pointer text-white select-none text-[9px] font-black uppercase text-center p-1 leading-tight z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-0.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Change
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
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
                          window.dispatchEvent(new CustomEvent('candela-logo-changed'));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Candela Engineering & Services Branding Logo
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Upload a custom company logo image. Changes are saved locally and synchronize immediately across the website header and panels.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {localStorage.getItem('candela_logo') && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to restore the default circular SVG monogram logo?")) {
                      localStorage.removeItem('candela_logo');
                      window.dispatchEvent(new CustomEvent('candela-logo-changed'));
                    }
                  }}
                  className="px-3 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Reset Default Logo
                </button>
              )}
              
              <label className="px-4 py-2 bg-ces-blue hover:bg-ces-blue-light dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-xs hover:shadow-sm">
                Upload New Picture
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
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
                        window.dispatchEvent(new CustomEvent('candela-logo-changed'));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        )}

        {/* Content Layout Grid: Split 55% Government Schemes, 45% Latest Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= 1. GOVERNMENT SCHEMES PANEL (55% width) ================= */}
          <div id="govt-schemes" className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-300">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 dark:border-slate-900 pb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-ces-blue/5 dark:bg-sky-500/5 rounded text-ces-blue dark:text-sky-400 shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                    Government Incentives & Subsidies
                  </h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                    Assisting with Central & State financial assistance
                  </p>
                </div>
              </div>

              {/* Admin addition trigger */}
              {isAdminMode && (
                <button
                  onClick={startAddScheme}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-ces-blue dark:bg-sky-500 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Scheme
                </button>
              )}
            </div>

            {/* Scheme Type Toggle Buttons */}
            <div className="flex items-center gap-1.5 mb-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-sm uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-ces-blue text-white dark:bg-sky-500 dark:text-slate-950 shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                All Schemes
              </button>
              <button
                onClick={() => setActiveTab('state')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-sm uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'state'
                    ? 'bg-ces-blue text-white dark:bg-sky-500 dark:text-slate-950 shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                State Government
              </button>
              <button
                onClick={() => setActiveTab('central')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-sm uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'central'
                    ? 'bg-ces-blue text-white dark:bg-sky-500 dark:text-slate-950 shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                Central Government
              </button>
            </div>

            {/* Schemes Cards Grid */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredSchemes.map((scheme) => (
                  <motion.div
                    layout
                    key={scheme.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 rounded-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-800 transition-all flex flex-col justify-between relative group"
                  >
                    {/* Admin Actions Overlay inside card */}
                    {isAdminMode && (
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-slate-100 dark:bg-slate-800 p-1 rounded-sm border border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => startEditScheme(scheme)}
                          className="p-1 hover:text-ces-blue dark:hover:text-sky-400 text-slate-500 rounded transition-colors"
                          title="Edit Scheme Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteScheme(scheme.id)}
                          className="p-1 hover:text-rose-500 text-slate-500 rounded transition-colors"
                          title="Delete Scheme"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div>
                      {/* Top badging */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                          scheme.category === 'State Govt'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {scheme.category}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-sm">
                          {scheme.incentive}
                        </span>
                      </div>

                      <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-2">
                        {scheme.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                        {scheme.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-slate-800/50 mt-1">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                        Last audited: {scheme.lastUpdated}
                      </span>
                      <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-ces-blue dark:text-sky-400 hover:text-ces-blue-light dark:hover:text-sky-300 flex items-center gap-1 uppercase tracking-wider"
                      >
                        Apply / Guidelines
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredSchemes.length === 0 && (
                <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-sm">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2.5 animate-pulse" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-450 uppercase tracking-wider">No Government Schemes Listed</p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">Use the admin console to add or configure industrial incentive schemes.</p>
                </div>
              )}
            </div>
          </div>

          {/* ================= 2. LATEST UPDATES PANEL (45% width) ================= */}
          <div id="latest-updates" className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-300 relative overflow-hidden">
            
            {/* Decorative top red starburst banner identical to the visual mock */}
            <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden">
              {/* This mimics the red NEW badge burst beautifully */}
              <div className="absolute top-4 -right-8 bg-red-600 text-white font-extrabold text-[8px] tracking-widest uppercase py-1 px-8 rotate-45 shadow-xs text-center border-y border-white/20 select-none">
                NEW Feed
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 dark:border-slate-900 pb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-500/5 rounded text-rose-500 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                    Latest Updates
                    <span className="inline-block px-1.5 py-0.5 bg-red-600 text-white font-black text-[8px] uppercase tracking-widest rounded-xs animate-bounce">
                      NEW
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                    Circulars, notifications & safety mandates
                  </p>
                </div>
              </div>

              {/* Admin addition trigger */}
              {isAdminMode && (
                <button
                  onClick={startAddUpdate}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Update
                </button>
              )}
            </div>

            {/* Updates Feed list layout */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {updates.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="p-4.5 rounded-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-800 transition-all flex items-start gap-4 relative group"
                  >
                    {/* Admin Actions Overlay */}
                    {isAdminMode && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-sm border border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => startEditUpdate(item)}
                          className="p-1 hover:text-ces-blue dark:hover:text-sky-400 text-slate-500 rounded transition-colors"
                          title="Edit Update Bullet"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteUpdate(item.id)}
                          className="p-1 hover:text-rose-500 text-slate-500 rounded transition-colors"
                          title="Delete Bulletin"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Left Icon Panel */}
                    <div className="p-2 bg-white dark:bg-slate-950 rounded border border-slate-200/60 dark:border-slate-800 shrink-0 text-slate-400 dark:text-slate-500">
                      <FileText className="w-4.5 h-4.5" />
                    </div>

                    {/* Details Panel */}
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-tight">
                          {item.date}
                        </span>
                        
                        {/* Custom status badge block */}
                        {item.badge && (
                          <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-xs leading-none ${
                            item.badge === 'ALERT'
                              ? 'bg-rose-600 text-white animate-pulse'
                              : item.badge === 'IMPORTANT'
                              ? 'bg-amber-500 text-slate-950 font-extrabold'
                              : 'bg-red-600 text-white font-extrabold'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display font-extrabold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-snug tracking-tight mb-1 group-hover:text-ces-blue dark:group-hover:text-sky-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                        {item.description}
                      </p>

                      {item.link && (
                        <a
                          href={item.link}
                          className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-ces-blue dark:text-sky-400 hover:text-ces-blue-light dark:hover:text-sky-300 transition-colors"
                        >
                          Read Bulletin
                          <ChevronRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {updates.length === 0 && (
                <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-sm">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2.5 animate-pulse" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-450 uppercase tracking-wider">No Updates Bulletin Active</p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">Regulatory notices and company achievements will appear in this column.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= ADMIN PASSCODE LOGIN MODAL ================= */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div 
            className="fixed inset-0 bg-slate-950/75 flex items-center justify-center z-50 p-4 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-950 rounded-sm shadow-2xl max-w-sm w-full border border-slate-200 dark:border-slate-850 p-6 relative"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  setAdminPasscode('');
                  setPasscodeError('');
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Admin Verification</h3>
                  <p className="text-[10px] text-slate-400">Unlock compliance manager workspace</p>
                </div>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Enter Passcode</label>
                  <input
                    type="password"
                    placeholder="Enter admin passcode"
                    value={adminPasscode}
                    onChange={(e) => {
                      setAdminPasscode(e.target.value);
                      setPasscodeError('');
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                    autoFocus
                  />
                  {passcodeError && (
                    <p className="text-[11px] text-rose-500 font-bold mt-1.5 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      {passcodeError}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 italic leading-normal">
                    *Prototype override passcode: <strong>admin</strong> or <strong>candela</strong>. Allows updating compliance bulletins, schemes, details and persisting changes instantly.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      setAdminPasscode('');
                      setPasscodeError('');
                    }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 text-slate-600 dark:text-slate-350 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-ces-blue hover:bg-ces-blue-light text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Unlock Console
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SCHEME EDIT/ADD MODAL ================= */}
      <AnimatePresence>
        {(isAddingScheme || editingScheme) && (
          <motion.div 
            className="fixed inset-0 bg-slate-950/75 flex items-center justify-center z-50 p-4 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-950 rounded-sm shadow-2xl max-w-lg w-full border border-slate-200 dark:border-slate-850 p-6 relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <button 
                onClick={() => {
                  setIsAddingScheme(false);
                  setEditingScheme(null);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-ces-blue/10 text-ces-blue dark:text-sky-450 rounded">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    {isAddingScheme ? 'Publish Government Scheme' : 'Edit Scheme Profile'}
                  </h3>
                  <p className="text-[10px] text-slate-400">Directly updates the public website resources listing</p>
                </div>
              </div>

              <form onSubmit={handleSchemeSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Scheme Heading / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. West Bengal Industrial Subsidised Electricity Program"
                    value={schemeTitle}
                    onChange={(e) => setSchemeTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Division / Category *</label>
                    <select
                      value={schemeCategory}
                      onChange={(e) => setSchemeCategory(e.target.value as 'State Govt' | 'Central Govt')}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                    >
                      <option value="State Govt">State Govt (West Bengal)</option>
                      <option value="Central Govt">Central Govt (Govt of India)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Note / Incentive Badge *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Up to ₹5 Lakh Subsidy, Net-Metering"
                      value={schemeIncentive}
                      onChange={(e) => setSchemeIncentive(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Detailed Summary *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide a comprehensive explanation of who is eligible, application mandates, and technical infrastructure parameters covered."
                    value={schemeDescription}
                    onChange={(e) => setSchemeDescription(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Guidelines / PDF Document Link (URL)</label>
                  <input
                    type="url"
                    placeholder="https://example-gov.in/subsidies-guidelines.pdf"
                    value={schemeLink}
                    onChange={(e) => setSchemeLink(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingScheme(false);
                      setEditingScheme(null);
                    }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 text-slate-600 dark:text-slate-350 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-ces-blue hover:bg-ces-blue-light text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Save Scheme Details
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= UPDATE EDIT/ADD MODAL ================= */}
      <AnimatePresence>
        {(isAddingUpdate || editingUpdate) && (
          <motion.div 
            className="fixed inset-0 bg-slate-950/75 flex items-center justify-center z-50 p-4 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-950 rounded-sm shadow-2xl max-w-lg w-full border border-slate-200 dark:border-slate-850 p-6 relative"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <button 
                onClick={() => {
                  setIsAddingUpdate(false);
                  setEditingUpdate(null);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    {isAddingUpdate ? 'Publish Live Update Bulletin' : 'Edit Update Notice'}
                  </h3>
                  <p className="text-[10px] text-slate-400">Broadcast safety regulations or company notices</p>
                </div>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Bulletin Headline / Heading *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WBSEDCL Single-Window Clearance Active"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Notice Date *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. July 05, 2026"
                      value={updateDate}
                      onChange={(e) => setUpdateDate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Action Badge Type</label>
                    <select
                      value={updateBadge}
                      onChange={(e) => setUpdateBadge(e.target.value as 'NEW' | 'IMPORTANT' | 'ALERT' | '')}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                    >
                      <option value="">No Badge</option>
                      <option value="NEW">NEW Badge (Red)</option>
                      <option value="IMPORTANT">IMPORTANT Badge (Amber)</option>
                      <option value="ALERT">ALERT Badge (Flashing Rose)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Bulletin Message *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter the update body text clearly. Keep it concise for side column feed presentation."
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Reference Link / PDF Document Link (URL)</label>
                  <input
                    type="text"
                    placeholder="https://example-gov.in/notices/doc.pdf"
                    value={updateLink}
                    onChange={(e) => setUpdateLink(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingUpdate(false);
                      setEditingUpdate(null);
                    }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 text-slate-600 dark:text-slate-350 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-ces-blue hover:bg-ces-blue-light text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Publish Live Bulletin
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
