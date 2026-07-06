import React, { useState, useEffect } from 'react';

interface CompanyLogoProps {
  className?: string;
}

export default function CompanyLogo({ className = "w-12 h-12" }: CompanyLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = () => {
      const savedLogo = localStorage.getItem('candela_logo');
      setLogoUrl(savedLogo);
    };

    loadLogo();
    window.addEventListener('candela-logo-changed', loadLogo);
    window.addEventListener('storage', loadLogo);

    return () => {
      window.removeEventListener('candela-logo-changed', loadLogo);
      window.removeEventListener('storage', loadLogo);
    };
  }, []);

  if (logoUrl) {
    return (
      <img 
        src={logoUrl} 
        alt="Candela Logo" 
        className={`${className} object-cover rounded-full border-2 border-ces-blue dark:border-sky-500 bg-white dark:bg-slate-950 shadow-xs`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <svg 
      className={`${className} select-none transition-transform duration-300`} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer thin silver/gray boundary ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="47" 
        stroke="currentColor" 
        className="text-slate-300 dark:text-slate-700 fill-white dark:fill-slate-950 transition-colors duration-300" 
        strokeWidth="1.5" 
      />
      
      {/* Monogram Letters (C, E, S) styled to form a circle contour */}
      <g className="text-ces-blue dark:text-sky-500 transition-colors duration-300" fill="currentColor">
        {/* Letter C (Left crescent) */}
        <path d="M 36,14 A 38,38 0 0,0 36,86 L 36,74 A 26,26 0 0,1 18,50 A 26,26 0 0,1 36,26 Z" />
        
        {/* Letter E (Center Block) */}
        <path d="M 41,12 H 59 V 22 H 49 V 45 H 57 V 55 H 49 V 78 H 59 V 88 H 41 Z" />
        
        {/* Letter S (Right curves) */}
        <path d="M 64,15 C 76,15 86,22 86,34 C 86,40 82,44 76,47 C 70,50 66,52 66,58 C 66,66 74,73 86,73 L 84,85 C 72,85 64,78 64,68 C 64,60 68,56 74,53 C 80,50 84,48 84,42 C 84,34 76,27 64,27 Z" />
      </g>
    </svg>
  );
}
