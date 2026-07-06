import React, { useState } from 'react';
import { Phone, Mail, MapPin, Award, Menu, X, Globe, Sun, Moon, ChevronDown, ChevronRight, Check, Building2, Landmark, Zap, ShieldCheck, ShieldAlert, Lock, Unlock } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import CompanyLogo from './CompanyLogo';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isDark?: boolean;
  onToggleDark?: () => void;
  isAdminView?: boolean;
  onToggleAdminView?: (val: boolean) => void;
}

export default function Header({ 
  activeSection, 
  onNavigate, 
  isDark = false, 
  onToggleDark,
  isAdminView = false,
  onToggleAdminView
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCompany, setActiveCompany] = useState('Candela Engineering & Services');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [govtDropdownOpen, setGovtDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('candela_admin_active') === 'true';
  });
  const [hamburgerDropdownOpen, setHamburgerDropdownOpen] = useState(false);
  const [showHeaderAdminModal, setShowHeaderAdminModal] = useState(false);
  const [headerUsername, setHeaderUsername] = useState('');
  const [headerPassword, setHeaderPassword] = useState('');
  const [headerPasscodeError, setHeaderPasscodeError] = useState('');

  const handleHeaderAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = headerUsername.trim().toLowerCase();
    const pass = headerPassword.trim();
    
    if (user === 'admin' && (pass === 'candela' || pass === 'admin')) {
      localStorage.setItem('candela_admin_active', 'true');
      window.dispatchEvent(new CustomEvent('candela-admin-changed'));
      setShowHeaderAdminModal(false);
      setHeaderUsername('');
      setHeaderPassword('');
      setHeaderPasscodeError('');
      setHamburgerDropdownOpen(false);
      if (onToggleAdminView) {
        onToggleAdminView(true);
      }
    } else {
      setHeaderPasscodeError('Invalid credentials. Hint: Username "admin", Password "candela"');
    }
  };

  const handleHeaderAdminLogout = () => {
    localStorage.removeItem('candela_admin_active');
    window.dispatchEvent(new CustomEvent('candela-admin-changed'));
    setHamburgerDropdownOpen(false);
    if (onToggleAdminView) {
      onToggleAdminView(false);
    }
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    if (adminParam === 'login' || adminParam === 'true') {
      setShowHeaderAdminModal(true);
    }
  }, []);

  React.useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('candela_admin_active') === 'true');
    };
    window.addEventListener('candela-admin-changed', checkAdmin);
    window.addEventListener('storage', checkAdmin);
    return () => {
      window.removeEventListener('candela-admin-changed', checkAdmin);
      window.removeEventListener('storage', checkAdmin);
    };
  }, []);

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
        window.dispatchEvent(new CustomEvent('candela-logo-changed'));
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home', type: 'link' },
    { id: 'about', label: 'About Us', type: 'link' },
    { id: 'services', label: 'Our services', type: 'link' },
    { id: 'gallery', label: 'Gallery', type: 'link' },
    { id: 'govt-schemes', label: 'Govt Scheme', type: 'dropdown' },
    { id: 'latest-updates', label: 'Latest Update', type: 'update' },
    { id: 'clients', label: 'Our Clients', type: 'link' },
    { id: 'contact', label: 'Contact Us', type: 'link' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setGovtDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSchemeFilter = (category: 'all' | 'state' | 'central') => {
    setGovtDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('govt-schemes');
    const element = document.getElementById('govt-schemes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      const event = new CustomEvent('filter-schemes', { detail: category });
      window.dispatchEvent(event);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      {/* Top Utility Ribbon */}
      <div className="hidden lg:block w-full bg-ces-blue text-white text-xs py-2 px-6 border-b border-ces-blue-light">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="flex items-center space-x-2 hover:text-ces-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-ces-accent" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center space-x-2 hover:text-ces-accent transition-colors">
              <Mail className="w-3.5 h-3.5 text-ces-accent" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-ces-accent" />
              <span className="truncate max-w-xs">{COMPANY_DETAILS.address}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 bg-ces-blue-light px-2.5 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider text-ces-accent border border-ces-accent/30">
              <Award className="w-3 h-3" />
              <span>{COMPANY_DETAILS.credentials[0]}</span>
            </span>
            <a 
              href={`https://${COMPANY_DETAILS.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-slate-300 hover:text-ces-accent transition-colors cursor-pointer"
            >
              <Globe className="w-3 h-3 text-ces-accent" />
              <span className="hover:underline">{COMPANY_DETAILS.website}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full bg-white dark:bg-slate-900 px-4 md:px-8 h-20 flex items-center shadow-xs transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center h-full">
          {/* Logo Brand Panel with Professional Polish block design */}
          <div className="flex items-center gap-3 h-full">
            {/* Circular High-Fidelity Company Logo with Admin Upload support */}
            <div className="relative group/logo w-12 h-12 flex items-center justify-center shrink-0 drop-shadow-sm">
              <div 
                className="w-12 h-12 flex items-center justify-center shrink-0 cursor-pointer"
                onClick={() => handleNavClick('hero')}
                onDoubleClick={() => {
                  setShowHeaderAdminModal(true);
                }}
                title="Home"
              >
                <CompanyLogo className="w-12 h-12 transition-transform duration-300 group-hover/logo:scale-105" />
              </div>

              {/* Admin Logo Upload Overlay */}
              {isAdmin && (
                <label className="absolute inset-0 bg-slate-900/85 dark:bg-slate-950/85 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 cursor-pointer text-white select-none text-[8px] font-bold uppercase text-center p-1 leading-tight z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 mb-0.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Upload
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleLogoUpload}
                  />
                </label>
              )}
            </div>

            {/* Elegant Candela Group dropdown menu */}
            <div className="relative">
              <div 
                className="flex items-center gap-1.5 cursor-pointer select-none group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="leading-none">
                      <div
                        className="
                          text-ces-blue
                          dark:text-sky-400
                          font-extrabold
                          text-[30px]
                          md:text-[32px]
                          tracking-tight"
                      >
                        CANDELA
                      </div>
                      <div
                        className="
                          text-slate-800
                          dark:text-white
                          font-normal
                          text-[18px]
                          leading-none
                          -mt-1"
                      >
                        Group
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold transition-colors duration-300 mt-1 leading-none">
                    {activeCompany}
                  </p>
                </div>
              </div>

              {/* Custom Dropdown Menu */}
              {dropdownOpen && (
                <>
                  {/* Invisible background click-away shield */}
                  <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute left-0 mt-2.5 w-64 sm:w-72 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm shadow-xl py-2 z-45 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3.5 py-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px] border-b border-slate-100 dark:border-slate-900 mb-1">
                      Group Divisions
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCompany('Candela Engineering & Services');
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-between cursor-pointer ${
                        activeCompany === 'Candela Engineering & Services' 
                          ? 'text-ces-blue dark:text-sky-400 font-extrabold' 
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">Candela Engineering & Services</span>
                        <span className="text-[10px] text-slate-400 font-normal mt-0.5">Industrial Electrification & Compliance</span>
                      </div>
                      {activeCompany === 'Candela Engineering & Services' && <Check className="w-4 h-4 shrink-0 text-ces-blue dark:text-sky-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveCompany('Candela Engineering Services');
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-between border-t border-slate-100 dark:border-slate-900 cursor-pointer ${
                        activeCompany === 'Candela Engineering Services' 
                          ? 'text-ces-blue dark:text-sky-400 font-extrabold' 
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">Candela Engineering Services</span>
                        <span className="text-[10px] text-slate-400 font-normal mt-0.5">Engineering & Government Scheme Consultants</span>
                      </div>
                      {activeCompany === 'Candela Engineering Services' && <Check className="w-4 h-4 shrink-0 text-ces-blue dark:text-sky-400" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation using full-height tab triggers */}
          <nav className="hidden lg:flex items-center h-full">
            {navItems.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <div key={item.id} className="relative h-full flex items-center">
                    <button
                      onClick={() => setGovtDropdownOpen(!govtDropdownOpen)}
                      className={`px-3.5 xl:px-4.5 flex items-center gap-1.5 text-xs xl:text-sm font-bold uppercase tracking-wider h-full transition-all border-b-4 cursor-pointer select-none ${
                        activeSection === 'govt-schemes'
                          ? 'text-ces-blue dark:text-sky-400 border-ces-blue dark:border-sky-500 bg-slate-50/80 dark:bg-slate-800/80 font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:text-ces-blue dark:hover:text-sky-400 border-transparent hover:bg-slate-50/40 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>

                    {/* Govt Scheme Submenu Dropdown */}
                    {govtDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setGovtDropdownOpen(false)} />
                        <div className="absolute top-[100%] left-0 w-52 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm shadow-xl py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                          <button
                            type="button"
                            onClick={() => handleSchemeFilter('state')}
                            className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                          >
                            <span>State Govt</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSchemeFilter('central')}
                            className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-900 cursor-pointer"
                          >
                            <span>Central Govt.</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              }

              if (item.type === 'update') {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavClick(item.id);
                      setGovtDropdownOpen(false);
                    }}
                    className={`relative px-3.5 xl:px-4.5 flex items-center text-xs xl:text-sm font-bold uppercase tracking-wider h-full transition-all border-b-4 cursor-pointer ${
                      activeSection === item.id
                        ? 'text-ces-blue dark:text-sky-400 border-ces-blue dark:border-sky-500 bg-slate-50/80 dark:bg-slate-800/80 font-extrabold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-ces-blue dark:hover:text-sky-400 border-transparent hover:bg-slate-50/40 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {item.label}

                    {/* Red Starburst sticker identical to attached reference image */}
                    <span className="absolute -top-1.5 -right-3 flex items-center justify-center select-none z-10 scale-85 pointer-events-none">
                      <span className="relative flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600 drop-shadow-xs animate-pulse" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            fill="currentColor" 
                            d="M50 0 L58 20 L78 12 L70 32 L90 32 L78 50 L90 68 L70 68 L78 88 L58 80 L50 100 L42 80 L22 88 L30 68 L10 68 L22 50 L10 32 L30 32 L22 12 L42 20 Z" 
                          />
                        </svg>
                        <span className="absolute text-[7px] font-black text-white uppercase tracking-wider leading-none">NEW</span>
                      </span>
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item.id);
                    setGovtDropdownOpen(false);
                  }}
                  className={`px-3.5 xl:px-4.5 flex items-center text-xs xl:text-sm font-bold uppercase tracking-wider h-full transition-all border-b-4 cursor-pointer ${
                    activeSection === item.id
                      ? 'text-ces-blue dark:text-sky-400 border-ces-blue dark:border-sky-500 bg-slate-50/80 dark:bg-slate-800/80 font-extrabold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-ces-blue dark:hover:text-sky-400 border-transparent hover:bg-slate-50/40 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle & Call to Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onToggleDark}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-ces-blue dark:hover:text-sky-400 transition-colors cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            
            {isAdmin && (
              <button
                onClick={() => onToggleAdminView?.(!isAdminView)}
                className={`text-xs font-extrabold px-5 py-3 rounded-sm uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer border ${
                  isAdminView
                    ? 'bg-amber-500 hover:bg-amber-600 border-amber-500 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-800 shadow-xs'
                }`}
              >
                {isAdminView ? '← Website View' : 'Admin Panel'}
              </button>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className="bg-ces-blue hover:bg-ces-blue-light dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-bold px-6 py-3 rounded-sm uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              Request Quote
            </button>

            {/* Three lines of menu (Hamburger) with custom options and Admin toggle */}
            <div className="relative">
              <button
                onClick={() => setHamburgerDropdownOpen(!hamburgerDropdownOpen)}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-sm hover:text-ces-blue dark:hover:text-sky-400 transition-all duration-200 cursor-pointer flex items-center justify-center border border-slate-200 dark:border-slate-750 shadow-xs"
                title="Portal Directory Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {hamburgerDropdownOpen && (
                <>
                  {/* Backdrop click shield */}
                  <div className="fixed inset-0 z-30" onClick={() => setHamburgerDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-64 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm shadow-xl py-2 z-40 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px] border-b border-slate-100 dark:border-slate-900 mb-1 flex items-center justify-between">
                      <span>Quick Access</span>
                      <span className="text-[8px] bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold px-1.5 py-0.5 rounded uppercase">Explore</span>
                    </div>

                    {!isAdmin ? (
                      <button
                        onClick={() => {
                          setShowHeaderAdminModal(true);
                          setHamburgerDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-amber-500/10 dark:hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold flex items-center gap-2 cursor-pointer border-b border-slate-100 dark:border-slate-900 mb-1.5 transition-colors duration-200"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Admin Verification Portal
                      </button>
                    ) : (
                      <div className="mx-3.5 my-1.5 p-2 bg-amber-500/10 dark:bg-amber-500/5 rounded border border-amber-500/20 text-[11px] flex flex-col gap-1 shadow-inner">
                        <div className="text-amber-600 dark:text-amber-400 font-extrabold flex items-center gap-1.5">
                          <Unlock className="w-3.5 h-3.5 shrink-0" />
                          <span>Admin Control Panel</span>
                        </div>
                        <div className="flex gap-2 font-bold mt-0.5">
                          <button
                            onClick={() => {
                              onToggleAdminView?.(!isAdminView);
                              setHamburgerDropdownOpen(false);
                            }}
                            className="text-ces-blue dark:text-sky-400 hover:underline cursor-pointer"
                          >
                            {isAdminView ? '← Website View' : 'Open Admin View'}
                          </button>
                          <span className="text-slate-300 dark:text-slate-700">|</span>
                          <button
                            onClick={() => {
                              handleHeaderAdminLogout();
                              setHamburgerDropdownOpen(false);
                            }}
                            className="text-rose-500 hover:underline cursor-pointer"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        handleNavClick('hero');
                        setHamburgerDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                      Home
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('about');
                        setHamburgerDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                      About Us
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('services');
                        setHamburgerDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                      Our services
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('gallery');
                        setHamburgerDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                      Gallery
                    </button>

                    {/* Govt Scheme options in quick menu */}
                    <div className="border-t border-b border-slate-100 dark:border-slate-900 my-1 py-1 bg-slate-50/50 dark:bg-slate-950/20">
                      <div className="px-4 py-0.5 text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                        Govt Scheme
                      </div>
                      <button
                        onClick={() => {
                          handleSchemeFilter('state');
                          setHamburgerDropdownOpen(false);
                        }}
                        className="w-full text-left px-6 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-600 dark:text-slate-400 font-semibold flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Landmark className="w-3.5 h-3.5 text-slate-400" />
                          State Govt
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                      <button
                        onClick={() => {
                          handleSchemeFilter('central');
                          setHamburgerDropdownOpen(false);
                        }}
                        className="w-full text-left px-6 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-600 dark:text-slate-400 font-semibold flex items-center justify-between cursor-pointer border-t border-slate-50 dark:border-slate-900/40"
                      >
                        <span className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          Central Govt
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>

                    {/* Latest Update option */}
                    <button
                      onClick={() => {
                        handleNavClick('latest-updates');
                        setHamburgerDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                        Latest Update
                      </span>
                      {/* Starburst NEW badge */}
                      <span className="flex items-center justify-center select-none scale-80 pointer-events-none pr-1">
                        <span className="relative flex items-center justify-center">
                          <svg className="w-7 h-7 text-red-600 drop-shadow-xs animate-pulse" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path 
                              fill="currentColor" 
                              d="M50 0 L58 20 L78 12 L70 32 L90 32 L78 50 L90 68 L70 68 L78 88 L58 80 L50 100 L42 80 L22 88 L30 68 L10 68 L22 50 L10 32 L30 32 L22 12 L42 20 Z" 
                            />
                          </svg>
                          <span className="absolute text-[6.5px] font-black text-white uppercase tracking-wider leading-none">NEW</span>
                        </span>
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('clients');
                        setHamburgerDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer border-t border-slate-50 dark:border-slate-900/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                      Our Clients
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('contact');
                        setHamburgerDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                      Contact Us
                    </button>

                    {/* Clients and navigation options */}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Theme Toggle & Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onToggleDark}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-ces-blue dark:hover:text-sky-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ces-blue"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850 shadow-inner px-4 pt-2 pb-6 space-y-1 transition-colors duration-300">
          {navItems.map((item) => {
            if (item.type === 'dropdown') {
              return (
                <div key={item.id} className="border-t border-slate-100 dark:border-slate-800 py-2.5 my-1.5 px-4 space-y-2">
                  <span className="block text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500">
                    {item.label}
                  </span>
                  <button
                    onClick={() => handleSchemeFilter('state')}
                    className="w-full text-left py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-ces-blue dark:hover:text-sky-400 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    State Government
                  </button>
                  <button
                    onClick={() => handleSchemeFilter('central')}
                    className="w-full text-left py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-ces-blue dark:hover:text-sky-400 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    Central Government
                  </button>
                </div>
              );
            }

            if (item.type === 'update') {
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item.id);
                  }}
                  className={`block w-full text-left px-4 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider transition-colors border-t border-slate-100 dark:border-slate-800 cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-slate-50 dark:bg-slate-800 text-ces-blue dark:text-sky-400 border-l-4 border-ces-blue dark:border-sky-500 font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-ces-blue dark:hover:text-sky-400'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    <span className="px-1.5 py-0.5 bg-red-600 text-white font-black text-[8px] uppercase tracking-widest rounded-xs animate-pulse">
                      NEW
                    </span>
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-slate-50 dark:bg-slate-800 text-ces-blue dark:text-sky-400 border-l-4 border-ces-blue dark:border-sky-500 font-black'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-ces-blue dark:hover:text-sky-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3">
            <div className="text-xs text-slate-500 dark:text-slate-400 px-4">
              <span className="block font-semibold">Contact support:</span>
              <a href={`tel:${COMPANY_DETAILS.phone}`} className="block mt-1 text-ces-blue dark:text-sky-400">{COMPANY_DETAILS.phone}</a>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="block text-ces-blue dark:text-sky-400">{COMPANY_DETAILS.email}</a>
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  onToggleAdminView?.(!isAdminView);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-center py-3 rounded-md font-extrabold text-sm uppercase tracking-wider border ${
                  isAdminView
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-800'
                }`}
              >
                {isAdminView ? '← Website View' : 'Admin Panel'}
              </button>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full bg-ces-blue hover:bg-ces-blue-light dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-center py-3 rounded-md font-semibold text-sm uppercase tracking-wider"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}

      {/* Candela Services Informational Modal */}
      <AnimatePresence>
        {showServicesModal && (
          <motion.div 
            className="fixed inset-0 bg-slate-950/75 flex items-center justify-center z-50 p-4 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-950 rounded-sm shadow-2xl max-w-lg w-full border border-slate-200 dark:border-slate-850 overflow-hidden relative"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setShowServicesModal(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner */}
              <div className="bg-ces-blue dark:bg-slate-900 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-15" />
                <div className="relative flex items-center space-x-3">
                  <div className="p-2.5 bg-white/10 backdrop-blur-md rounded border border-white/20">
                    <Building2 className="w-6 h-6 text-ces-accent" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-ces-accent">Division Profile</span>
                    <h3 className="font-display font-extrabold text-xl leading-tight">CANDELA SERVICES</h3>
                  </div>
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Candela Services</strong> is a core sister-concern of the Candela Group. While our Engineering division handles turnkey installations and West Bengal regulatory compliances, <strong>Candela Services</strong> delivers commercial procurement support, equipment supply-chains, and localized operations.
                </p>

                {/* Offerings list */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Core Services Portfolio</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 bg-emerald-500/10 rounded mt-0.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Sourcing & Electrical Equipment Sourcing</p>
                        <p className="text-[11px] text-slate-500">Corporate trading of high-tension cables, energy meters, distribution panels, and custom relays.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 bg-emerald-500/10 rounded mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Facility Operations & AMC Support</p>
                        <p className="text-[11px] text-slate-500">General service contracts, building lighting upkeep, and preventative maintenance for commercial properties.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 bg-emerald-500/10 rounded mt-0.5">
                        <Landmark className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Government Incentive Consulting</p>
                        <p className="text-[11px] text-slate-500">Advisory on central/state financial subsidies, tax breaks, and industrial zone benefits.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Est. 2016 • Sayan Biswas</span>
                  <button
                    onClick={() => {
                      setShowServicesModal(false);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-4 py-2 bg-ces-blue hover:bg-ces-blue-light text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Contact Division
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HEADER ADMIN LOGIN MODAL ================= */}
      <AnimatePresence>
        {showHeaderAdminModal && (
          <motion.div 
            className="fixed inset-0 bg-slate-950/75 flex items-center justify-center z-55 p-4 backdrop-blur-xs animate-in fade-in duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-950 rounded-sm shadow-2xl max-w-sm w-full border border-slate-200 dark:border-slate-850 p-6 relative animate-in zoom-in-95 duration-200"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <button 
                onClick={() => {
                  setShowHeaderAdminModal(false);
                  setHeaderUsername('');
                  setHeaderPassword('');
                  setHeaderPasscodeError('');
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
 
              <div className="flex items-center space-x-3 mb-5">
                <div className="p-2.5 bg-ces-blue/10 text-ces-blue dark:text-sky-450 rounded">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Admin Verification</h3>
                  <p className="text-[10px] text-slate-400">Unlock compliance manager workspace</p>
                </div>
              </div>
 
              <form onSubmit={handleHeaderAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 font-sans">Username</label>
                  <input
                    type="text"
                    placeholder="Enter admin username"
                    value={headerUsername}
                    onChange={(e) => {
                      setHeaderUsername(e.target.value);
                      setHeaderPasscodeError('');
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 font-sans">Password</label>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={headerPassword}
                    onChange={(e) => {
                      setHeaderPassword(e.target.value);
                      setHeaderPasscodeError('');
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm px-3.5 py-2 text-xs focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 focus:outline-none"
                  />
                  {headerPasscodeError && (
                    <p className="text-[11px] text-rose-500 font-bold mt-1.5 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      {headerPasscodeError}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2.5 italic leading-normal font-sans">
                    *Default admin credentials: Username is <strong>admin</strong> and Password is <strong>candela</strong>. Allows updating compliance bulletins, schemes, and visual assets instantly.
                  </p>
                </div>
 
                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowHeaderAdminModal(false);
                      setHeaderUsername('');
                      setHeaderPassword('');
                      setHeaderPasscodeError('');
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
    </header>
  );
}
