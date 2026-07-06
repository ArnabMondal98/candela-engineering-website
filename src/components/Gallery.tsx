import React, { useState, useEffect } from 'react';
import { 
  Image, Video, X, Filter, Film, AlertCircle, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  url: string;
  category: string;
  date: string;
}

const CATEGORIES = ['All', 'Electrification', 'Solar Power', 'Substations', 'Industrial', 'Other'];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Initialize and load dynamic gallery from local storage
  useEffect(() => {
    const loadGallery = () => {
      const saved = localStorage.getItem('candela_gallery_items');
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (e) {
          setItems([]);
        }
      } else {
        setItems([]);
      }
    };

    loadGallery();
    window.addEventListener('candela-gallery-changed', loadGallery);
    window.addEventListener('storage', loadGallery);
    return () => {
      window.removeEventListener('candela-gallery-changed', loadGallery);
      window.removeEventListener('storage', loadGallery);
    };
  }, []);

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-ces-accent mb-1.5">Project Gallery</p>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ces-blue dark:text-sky-450 tracking-tight transition-colors duration-300">
            Showcase of Works & Operations
          </h2>
          <div className="w-12 h-1 bg-ces-blue dark:bg-sky-500 mt-3 rounded-sm transition-colors duration-300"></div>
        </div>

        {/* Filter Navigation Tabs */}
        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-6 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mr-2 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter:</span>
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-bold rounded-sm uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-ces-blue text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  className="group relative bg-white dark:bg-slate-950 rounded-sm border border-slate-200 dark:border-slate-850 shadow-xs overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Media Container */}
                  <div 
                    className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group"
                    onClick={() => setLightboxItem(item)}
                  >
                    {item.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video 
                          src={item.url} 
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                          muted
                          playsInline
                          loop
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />
                        <div className="absolute top-2.5 left-2.5 bg-ces-blue/80 dark:bg-sky-500/80 text-white dark:text-slate-950 p-1.5 rounded-sm backdrop-blur-xs">
                          <Film className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors" />
                        <div className="absolute top-2.5 left-2.5 bg-slate-800/80 text-white p-1.5 rounded-sm backdrop-blur-xs">
                          <Image className="w-3.5 h-3.5 text-ces-accent" />
                        </div>
                      </div>
                    )}

                    {/* Hover Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/40 transition-opacity duration-300">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Category tag */}
                    <span className="absolute bottom-2.5 right-2.5 bg-slate-900/75 dark:bg-slate-950/85 backdrop-blur-xs text-white dark:text-sky-350 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Info Container */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-ces-blue dark:text-sky-400 uppercase tracking-wide mb-1 transition-colors group-hover:text-ces-blue-light dark:group-hover:text-sky-350">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-slate-100 dark:border-slate-900 text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                      <span>CANDELA PROJECT</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-sm">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3 animate-pulse" />
            <p className="text-sm text-slate-600 dark:text-slate-300 font-bold">No project media available in this gallery yet.</p>
            <p className="text-xs text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
              Our upcoming field works, electrical substations, and distribution line portfolios will be listed here soon.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div 
            className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <button 
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-ces-accent transition-colors z-50 p-2 rounded-full bg-slate-900/50 hover:bg-slate-900"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Media Content Box */}
            <motion.div 
              className="max-w-4xl w-full flex flex-col items-center justify-center relative"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {lightboxItem.type === 'video' ? (
                <video 
                  src={lightboxItem.url} 
                  controls 
                  autoPlay
                  className="max-h-[70vh] w-auto max-w-full rounded-sm shadow-2xl border border-white/10"
                />
              ) : (
                <img 
                  src={lightboxItem.url} 
                  alt={lightboxItem.title} 
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-sm shadow-2xl border border-white/10"
                />
              )}

              {/* Media Info Panel */}
              <div className="max-w-2xl w-full text-center mt-6 text-white px-4">
                <span className="inline-block bg-ces-accent text-ces-blue font-bold text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-sm mb-2.5">
                  {lightboxItem.category}
                </span>
                <h3 className="font-display font-bold text-lg md:text-xl text-white tracking-tight">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {lightboxItem.description}
                </p>
                <p className="text-[10px] text-slate-500 mt-4 font-bold">
                  PROJECT COMPLETED ON: {lightboxItem.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
