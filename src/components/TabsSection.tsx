import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA, CONSULTANCY_DATA, TRADING_DATA } from '../data';
import { Search, SlidersHorizontal, ArrowDownToLine, Check, HelpCircle, FileText, Send, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface TabsSectionProps {
  onPreFillInquiry: (serviceType: 'Project' | 'Consultancy' | 'Trading', serviceName: string) => void;
}

export default function TabsSection({ onPreFillInquiry }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState<'project' | 'consultancy' | 'trading'>('consultancy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [downloadState, setDownloadState] = useState<'idle' | 'success'>('idle');

  const [projectsData, setProjectsData] = useState(PROJECTS_DATA);
  const [consultancyData, setConsultancyData] = useState(CONSULTANCY_DATA);
  const [tradingData, setTradingData] = useState(TRADING_DATA);

  useEffect(() => {
    const loadServices = () => {
      const savedProjects = localStorage.getItem('candela_projects');
      const savedConsultancy = localStorage.getItem('candela_consultancy');
      const savedTrading = localStorage.getItem('candela_trading');
      
      if (savedProjects) {
        try { setProjectsData(JSON.parse(savedProjects)); } catch(e) { setProjectsData(PROJECTS_DATA); }
      } else {
        setProjectsData(PROJECTS_DATA);
      }

      if (savedConsultancy) {
        try { setConsultancyData(JSON.parse(savedConsultancy)); } catch(e) { setConsultancyData(CONSULTANCY_DATA); }
      } else {
        setConsultancyData(CONSULTANCY_DATA);
      }

      if (savedTrading) {
        try { setTradingData(JSON.parse(savedTrading)); } catch(e) { setTradingData(TRADING_DATA); }
      } else {
        setTradingData(TRADING_DATA);
      }
    };

    loadServices();
    window.addEventListener('candela-services-changed', loadServices);
    window.addEventListener('storage', loadServices);
    return () => {
      window.removeEventListener('candela-services-changed', loadServices);
      window.removeEventListener('storage', loadServices);
    };
  }, []);

  // Get unique categories for active tab filter
  const getCategories = () => {
    const data = activeTab === 'project' 
      ? projectsData 
      : activeTab === 'consultancy' 
        ? consultancyData 
        : tradingData;
    
    const cats = data.map(item => item.category);
    return ['All', ...Array.from(new Set(cats))];
  };

  const categories = getCategories();

  // Filter items based on search and category
  const getFilteredItems = () => {
    const data = activeTab === 'project' 
      ? projectsData 
      : activeTab === 'consultancy' 
        ? consultancyData 
        : tradingData;

    return data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredItems = getFilteredItems();

  const handleTabChange = (tab: 'project' | 'consultancy' | 'trading') => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedItem(null);
  };

  const getSNo = (index: number) => {
    const prefixes = { project: 'CES-PRJ', consultancy: 'CES-CON', trading: 'CES-TRD' };
    const num = String(index + 1).padStart(2, '0');
    return `${prefixes[activeTab]}-${num}`;
  };

  const handleInquireClick = (item: any) => {
    const typeMap: Record<string, 'Project' | 'Consultancy' | 'Trading'> = {
      project: 'Project',
      consultancy: 'Consultancy',
      trading: 'Trading'
    };
    onPreFillInquiry(typeMap[activeTab], item.title);
    
    // Smooth scroll to contact
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-ces-accent mb-2">Service Matrix</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ces-blue dark:text-sky-450 tracking-tight transition-colors">
            Our Business Verticals
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm transition-colors">
            Interactive service listings structured in a professional, tabular layout for easy exploration.
          </p>
          <div className="w-16 h-1 bg-ces-accent mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Tab Selection Row (Mimics professional tabular flow of sreeco.com) */}
        <motion.div 
          className="flex flex-col sm:flex-row border-b border-slate-300 dark:border-slate-800 mb-8 overflow-hidden rounded-sm shadow-xs bg-slate-100 dark:bg-slate-900 transition-colors"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <button
            onClick={() => handleTabChange('consultancy')}
            className={`flex-1 py-4.5 px-6 font-display text-sm font-bold uppercase tracking-wider text-center transition-all border-b-4 sm:border-b-0 cursor-pointer ${
              activeTab === 'consultancy'
                ? 'bg-ces-blue dark:bg-sky-600 text-white border-ces-blue dark:border-sky-500 font-extrabold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-ces-blue dark:hover:text-sky-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 border-transparent'
            }`}
          >
            Consultancy
          </button>
          <button
            onClick={() => handleTabChange('project')}
            className={`flex-1 py-4.5 px-6 font-display text-sm font-bold uppercase tracking-wider text-center transition-all border-b-4 sm:border-b-0 cursor-pointer ${
              activeTab === 'project'
                ? 'bg-ces-blue dark:bg-sky-600 text-white border-ces-blue dark:border-sky-500 font-extrabold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-ces-blue dark:hover:text-sky-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 border-transparent'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => handleTabChange('trading')}
            className={`flex-1 py-4.5 px-6 font-display text-sm font-bold uppercase tracking-wider text-center transition-all border-b-4 sm:border-b-0 cursor-pointer ${
              activeTab === 'trading'
                ? 'bg-ces-blue dark:bg-sky-600 text-white border-ces-blue dark:border-sky-500 font-extrabold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-ces-blue dark:hover:text-sky-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 border-transparent'
            }`}
          >
            Trading
          </button>
        </motion.div>

        {/* Search & Category Filter Subbar */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-slate-50 dark:bg-slate-900 p-4 rounded-sm border border-slate-200 dark:border-slate-800 transition-colors"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}s...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 pl-10 pr-4 py-2 text-sm rounded-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-colors"
            />
          </div>

          {/* Category Quick Pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2 flex items-center space-x-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-ces-accent" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 text-xs font-bold rounded-sm transition-all uppercase tracking-wider cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-ces-blue dark:bg-sky-500 text-white dark:text-slate-950'
                    : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Service Grid / Table */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          
          {/* Tabular Grid Table Panel */}
          <div className="lg:col-span-8 overflow-hidden bg-white dark:bg-slate-950 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-ces-blue dark:bg-slate-900 text-white text-xs uppercase tracking-wider border-b border-slate-300 dark:border-slate-800">
                    <th className="py-4 px-4 font-bold w-24">S.No</th>
                    <th className="py-4 px-4 font-bold">Service Description</th>
                    <th className="py-4 px-4 font-bold w-40">Classification</th>
                    <th className="py-4 px-4 font-bold w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer tabular-row ${
                          selectedItem?.id === item.id 
                            ? 'bg-slate-50 dark:bg-slate-900 font-semibold border-l-4 border-ces-blue dark:border-sky-500' 
                            : ''
                        }`}
                        onClick={() => setSelectedItem(item)}
                      >
                        {/* Serial Identifier */}
                        <td className="py-4.5 px-4 font-mono text-xs font-bold text-ces-blue dark:text-sky-400 whitespace-nowrap">
                          {getSNo(index)}
                        </td>
                        {/* Service description panel */}
                        <td className="py-4.5 px-4">
                          <div className="font-display font-bold text-sm text-ces-blue dark:text-sky-300 hover:text-ces-accent dark:hover:text-sky-400 transition-colors">
                            {item.title}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </td>
                        {/* Classification Badge */}
                        <td className="py-4.5 px-4">
                          <span className="inline-block bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider border border-slate-200 dark:border-slate-800">
                            {item.category}
                          </span>
                        </td>
                        {/* Detail Trigger */}
                        <td className="py-4.5 px-4 text-center">
                          <button 
                            className="inline-flex items-center justify-center p-1.5 rounded-sm hover:bg-slate-200/80 dark:hover:bg-slate-800 text-ces-blue dark:text-sky-400 transition-colors"
                            title="View technical details"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                        No services match your search query or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Micro warning indicator about regulatory norms */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 py-3.5 px-4 text-xs text-slate-500 dark:text-slate-450 flex items-center space-x-2 font-medium">
              <span className="inline-flex w-1.5 h-1.5 bg-emerald-500 rounded-sm"></span>
              <span>All operations comply strictly with West Bengal State Discom (WBSEDCL / CESC) regulatory statutes.</span>
            </div>
          </div>

          {/* Interactive Specification Detail Drawer */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-sm p-6 shadow-xs sticky top-28 transition-colors">
            {selectedItem ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-ces-accent dark:text-sky-450 uppercase tracking-widest block mb-1">
                    Technical Specifications
                  </span>
                  <h3 className="font-display font-bold text-lg text-ces-blue dark:text-sky-300 leading-snug">
                    {selectedItem.title}
                  </h3>
                  <div className="inline-block bg-slate-200/60 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-sm mt-2 uppercase tracking-wide">
                    {selectedItem.category}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Scope & Framework:</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Sub specifications for Projects */}
                {selectedItem.specs && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">Key Operations Checklist:</h4>
                    <ul className="space-y-2">
                      {selectedItem.specs.map((spec: string, i: number) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-450">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Statutory benefits for Consultancy */}
                {selectedItem.benefits && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">Consultancy Milestones & Deliverables:</h4>
                    <ul className="space-y-2">
                      {selectedItem.benefits.map((benefit: string, i: number) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-450">
                          <Check className="w-4 h-4 text-ces-blue dark:text-sky-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technical specifications list for Trading */}
                {selectedItem.specifications && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">Available Supply & Ratings:</h4>
                    <ul className="space-y-2">
                      {selectedItem.specifications.map((spec: string, i: number) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-450">
                          <Check className="w-4 h-4 text-ces-blue dark:text-sky-400 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Statutory Authority detail for SWID or like licenses */}
                {selectedItem.statutoryAgency && (
                  <div className="bg-slate-200/50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 p-3 rounded-sm text-xs text-slate-600 dark:text-slate-400 transition-colors">
                    <span className="font-bold block text-ces-blue dark:text-sky-400 uppercase text-[9px] tracking-wider mb-1">Governing Authority</span>
                    {selectedItem.statutoryAgency}
                  </div>
                )}

                {/* Action CTA triggers */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-3">
                  <button
                    onClick={() => handleInquireClick(selectedItem)}
                    className="w-full bg-ces-blue hover:bg-ces-blue-light dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-bold text-xs py-3 rounded-sm uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire About Service</span>
                  </button>
                  <a
                    href={`mailto:candelaengineering.service2016@gmail.com?subject=Inquiry: ${encodeURIComponent(selectedItem.title)}`}
                    className="w-full bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs py-2.5 rounded-sm uppercase tracking-wider transition-all text-center block cursor-pointer"
                  >
                    Direct Email RFP
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                <div>
                  <h4 className="font-bold text-sm text-slate-600 dark:text-slate-400">No Item Selected</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs leading-relaxed">
                    Select any industrial service or trading asset from the tabular grid on the left to view full technical specifications, compliance parameters, and to pre-fill inquiry sheets.
                  </p>
                </div>
              </div>
            )}
          </div>

        </motion.div>

        {/* Corporate Technical Downloads Mock Strip */}
        <motion.div 
          className="mt-16 bg-slate-50 dark:bg-slate-900/50 rounded-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-ces-blue/10 dark:bg-sky-500/10 p-3 rounded-sm text-ces-blue dark:text-sky-400 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base">
                Download Candela Technical Specifications Guide (PDF)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                Contains the detailed engineering credentials of Sayan Biswas (CEO), past project blueprints, SLD designing compliance templates, and full trading catalog ratings.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0 gap-2">
            <button
              onClick={() => {
                setDownloadState('success');
                setTimeout(() => setDownloadState('idle'), 4000);
              }}
              className="inline-flex items-center justify-center bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-sm shadow-xs transition-all space-x-2 shrink-0 cursor-pointer"
            >
              <ArrowDownToLine className="w-4 h-4 text-slate-500" />
              <span>{downloadState === 'success' ? 'Downloading...' : 'Download Catalog'}</span>
            </button>
            {downloadState === 'success' && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider animate-pulse">
                PDF specifications download initiated successfully
              </span>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
