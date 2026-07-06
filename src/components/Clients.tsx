import React from 'react';
import { CLIENTS_DATA } from '../data';
import { Award } from 'lucide-react';
import { motion } from 'motion/react';
import { ClientItem } from '../types';

// High-fidelity CSS/SVG vector representations of the actual client logos
function ClientLogo({ id, name, logo }: { id: string; name: string; logo?: string }) {
  if (logo) {
    return (
      <div className="w-full h-14 flex items-center justify-center bg-white rounded-xl p-1 select-none border border-slate-200/50 animate-fade-in">
        <img src={logo} alt={name} className="h-10 w-auto max-w-[180px] object-contain" referrerPolicy="no-referrer" />
      </div>
    );
  }
  switch (id) {
    case 'cl1':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-7 w-auto max-w-[180px]" viewBox="0 0 450 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="225" y="42" fontFamily="'Arial Black', 'Impact', sans-serif" fontWeight="900" fontSize="31" fill="#DC2626" textAnchor="middle" letterSpacing="0.5">HUSTON (INDIA) PVT. LTD.</text>
          </svg>
        </div>
      );

    case 'cl2':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 350 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Leaves */}
            <path d="M12 28 C12 18, 17 12, 22 8 C20 16, 17 24, 15 30 Z" fill="#65A30D" />
            <path d="M22 25 C24 15, 30 10, 34 6 C31 14, 27 22, 25 28 Z" fill="#84CC16" />
            <path d="M31 29 C34 20, 42 16, 46 12 C41 20, 36 27, 34 32 Z" fill="#EAB308" />
            {/* Stylized letters j, s, r */}
            <path d="M15 32 L15 48 C15 54, 21 58, 27 58" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M25 46 C25 40, 35 40, 35 46 C35 52, 25 50, 25 56 C25 61, 35 61, 35 56" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M43 42 L43 58 M43 46 C45 42, 51 42, 53 45" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Right Text */}
            <text x="65" y="38" fontFamily="sans-serif" fontWeight="800" fontSize="19" fill="#15803D">JSR Grain Energy Pvt. Ltd.</text>
            <line x1="65" y1="45" x2="330" y2="45" stroke="#15803D" strokeWidth="1.5" />
            <text x="65" y="58" fontFamily="sans-serif" fontWeight="600" fontSize="11" fill="#15803D" letterSpacing="0.2">Manufacturer of Ethanol, DDGS & CO₂</text>
          </svg>
        </div>
      );

    case 'cl3':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-11 w-auto max-w-[180px]" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(80, 24)">
              <circle cx="0" cy="0" r="6" fill="#94A3B8" />
              <path d="M -15 -5 C -15 -18, -2 -22, 10 -20 C 5 -15, 0 -8, -5 -5 Z" fill="#64748B" opacity="0.8" />
              <path d="M 15 5 C 15 18, 2 22, -10 20 C -5 15, 0 8, 5 5 Z" fill="#64748B" opacity="0.8" />
              <path d="M -8 -15 C -25 -5, -20 15, -5 20 C -12 12, -15 -2, -8 -10 Z" fill="#94A3B8" />
              <path d="M 8 15 C 25 5, 20 -15, 5 -20 C 12 -12, 15 2, 8 10 Z" fill="#94A3B8" />
            </g>
            <text x="80" y="70" fontFamily="'Impact', sans-serif" fontWeight="900" fontSize="34" fill="#0284C7" textAnchor="middle" letterSpacing="1">SHIW</text>
          </svg>
        </div>
      );

    case 'cl4':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-neutral-950 rounded-xl p-1 select-none border border-neutral-800">
          <svg className="h-12 w-auto max-w-[180px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="6" fill="#0A0A0A" />
            <rect x="3" y="3" width="94" height="94" rx="4" stroke="#404040" strokeWidth="1" />
            <circle cx="50" cy="30" r="5" fill="#DC2626" />
            <path d="M50 15 L50 22 M50 38 L50 45 M35 30 L42 30 M58 30 L65 30 M39 19 L44 24 M56 36 L61 41 M39 41 L44 36 M56 19 L61 24" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            <path d="M 25 35 C 28 55, 40 75, 48 75 C 55 75, 62 55, 65 35" stroke="#B91C1C" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 45 42 C 55 42, 65 48, 65 58 C 65 68, 52 68, 48 68 L 48 56 L 58 56" stroke="#6B7280" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="6" y="80" width="88" height="14" fill="#171717" />
            <text x="50" y="91" fontFamily="sans-serif" fontWeight="900" fontSize="8" fill="#E5E7EB" textAnchor="middle" letterSpacing="1">VIKAS GROUP</text>
          </svg>
        </div>
      );

    case 'cl5':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="50" height="50" fill="#1D4ED8" rx="4" />
            <path d="M 12 55 L 55 12 M 22 55 L 55 22 M 32 55 L 55 32 M 42 55 L 55 42 M 12 45 L 45 12 M 12 35 L 35 12 M 12 25 L 25 12" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <text x="70" y="42" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="36" fill="#1D4ED8" letterSpacing="-2">nsi</text>
            <text x="73" y="58" fontFamily="sans-serif" fontWeight="800" fontSize="13" fill="#1D4ED8" letterSpacing="0.5">(INDIA) LTD.</text>
          </svg>
        </div>
      );

    case 'cl6':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-11 w-auto max-w-[180px]" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="skewX(-10)">
              <text x="140" y="52" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="44" fill="#DC2626" textAnchor="middle" letterSpacing="-1">NIPHA</text>
            </g>
            <text x="140" y="70" fontFamily="sans-serif" fontWeight="700" fontSize="8" fill="#475569" textAnchor="middle" letterSpacing="0.8">EXPANDING HORIZONS, UPHOLDING VALUES</text>
          </svg>
        </div>
      );

    case 'cl7':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-12 w-auto max-w-[180px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="4" fill="#DC2626" />
            <text x="50" y="38" fontFamily="'Arial Black', 'Impact', sans-serif" fontWeight="900" fontSize="26" fill="white" textAnchor="middle" transform="skewX(-8)">STAR</text>
            <text x="50" y="66" fontFamily="'Arial Black', 'Impact', sans-serif" fontWeight="900" fontSize="18" fill="white" textAnchor="middle" transform="skewX(-8)" letterSpacing="0.5">CEMENT</text>
            <text x="50" y="86" fontFamily="'Georgia', serif" fontWeight="bold" fontSize="7.5" fill="white" textAnchor="middle" italic="true">Solid Setting</text>
          </svg>
        </div>
      );

    case 'cl8':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 220 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="15" width="180" height="30" rx="4" fill="white" stroke="#1E3A8A" strokeWidth="2" />
            <path d="M 10 15 H 90 V 45 H 10 Z" fill="#1E40AF" />
            <text x="50" y="37" fontFamily="sans-serif" fontWeight="900" fontSize="21" fill="white" textAnchor="middle" letterSpacing="0.5">RBA</text>
            <circle cx="135" cy="30" r="22" stroke="#475569" strokeWidth="1" fill="#E2E8F0" />
            <text x="135" y="38" fontFamily="sans-serif" fontWeight="900" fontSize="21" fill="#1F2937" textAnchor="middle">Ferro</text>
            <text x="192" y="19" fontFamily="sans-serif" fontWeight="bold" fontSize="6" fill="#475569">TM</text>
            <text x="10" y="58" fontFamily="sans-serif" fontWeight="700" fontSize="8" fill="#475569" letterSpacing="0.5">consultation - engineering - delivery</text>
          </svg>
        </div>
      );

    case 'cl9':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="35" cy="30" rx="25" ry="18" stroke="#0284C7" strokeWidth="3.5" fill="none" />
            <text x="35" y="36" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#0369A1" textAnchor="middle" letterSpacing="0.2">RBAC</text>
            <text x="73" y="31" fontFamily="'Times New Roman', serif" fontWeight="bold" fontSize="22" fill="#0284C7">RBA Exports</text>
            <text x="75" y="48" fontFamily="sans-serif" fontWeight="600" fontSize="10" fill="#64748B" letterSpacing="1">PRIVATE LIMITED</text>
          </svg>
        </div>
      );

    case 'cl10':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-11 w-auto max-w-[180px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 5 L 63 30 L 92 30 L 71 50 L 83 78 L 50 63 L 17 78 L 29 50 L 8 30 L 37 30 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="50" cy="48" r="23" fill="white" stroke="#1D4ED8" strokeWidth="2" />
            <circle cx="50" cy="48" r="20" fill="#2563EB" />
            <text x="50" y="55" fontFamily="'Impact', 'Arial Black', sans-serif" fontWeight="900" fontSize="15" fill="white" textAnchor="middle" letterSpacing="0.2">AEI</text>
            <text x="83" y="14" fontFamily="sans-serif" fontWeight="bold" fontSize="6" fill="#475569">TM</text>
          </svg>
        </div>
      );

    case 'cl11':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-11 w-auto max-w-[180px]" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 12 44 C 18 20, 48 10, 155 35 C 120 18, 50 16, 25 48 Z" fill="#EF4444" />
            <path d="M 10 46 C 45 66, 120 66, 160 48" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" fill="none" />
            <text x="85" y="47" fontFamily="'Impact', 'Arial Black', sans-serif" fontWeight="900" fontSize="32" fill="#E11D48" textAnchor="middle" transform="skewX(-10)" letterSpacing="-0.5">RUPA</text>
            <circle cx="158" cy="22" r="2" stroke="#EF4444" strokeWidth="0.5" fill="none" />
            <text x="158" y="24" fontFamily="sans-serif" fontSize="2" fill="#EF4444" textAnchor="middle">R</text>
          </svg>
        </div>
      );

    case 'cl12':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-9 w-auto max-w-[180px]" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="120" y="44" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="34" fill="#1E3A8A" textAnchor="middle" letterSpacing="-0.5">CRESCENT</text>
            <path d="M 137 24 L 148 12 L 142 12 M 148 12 L 148 18" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 148 12 L 138 22" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'cl13':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-12 w-auto max-w-[180px]" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(100, 18)">
              <path d="M -10 -12 L -10 12" stroke="#0ea5e9" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M -10 -12 C -2 -12, 4 -6, 4 0 C 4 6, -2 12, -10 12" stroke="#f59e0b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M -8 -8 L 8 8" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M -8 8 L 8 -8" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
            </g>
            <text x="100" y="52" fontFamily="'Brush Script MT', 'Georgia', serif" fontWeight="bold" fontSize="24" fill="#991B1B" textAnchor="middle" italic="true">Kejriwal</text>
            <text x="100" y="68" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#115E59" textAnchor="middle" letterSpacing="0.8">CASTINGS LIMITED</text>
          </svg>
        </div>
      );

    case 'cl14':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-11 w-auto max-w-[180px]" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 25 10 L 45 20 L 45 48 L 25 58 L 5 48 L 5 20 Z" stroke="#EAB308" strokeWidth="3" fill="none" strokeLinejoin="round" />
            <path d="M 25 15 L 40 23 L 40 45 L 25 53 L 10 45 L 10 23 Z" stroke="#F1F5F9" strokeWidth="1" fill="none" strokeLinejoin="round" />
            <text x="25" y="42" fontFamily="'Times New Roman', serif" fontWeight="bold" fontSize="30" fill="#1E3A8A" textAnchor="middle" italic="true">S</text>
            <text x="60" y="27" fontFamily="sans-serif" fontWeight="800" fontSize="17" fill="#1E3A8A">THE SUKHJIT</text>
            <text x="60" y="44" fontFamily="sans-serif" fontWeight="800" fontSize="13" fill="#1E3A8A" letterSpacing="0.2">STARCH AND CHEMICALS</text>
            <line x1="60" y1="50" x2="280" y2="50" stroke="#1E3A8A" strokeWidth="2" />
            <text x="60" y="66" fontFamily="sans-serif" fontWeight="700" fontSize="11" fill="#1D4ED8" letterSpacing="0.5">LIMITED</text>
            <text x="125" y="76" fontFamily="'Georgia', serif" fontWeight="bold" fontSize="6.5" fill="#64748B" italic="true" letterSpacing="0.2">EVOLVING WITH NATURE</text>
          </svg>
        </div>
      );

    case 'cl15':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-11 w-auto max-w-[180px]" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="150" height="70" stroke="black" strokeWidth="2.5" fill="white" />
            <g transform="translate(15, 12)">
              <path d="M 10 24 L 20 2 M 20 2 L 30 24 M 14 15 L 26 15" stroke="#1D4ED8" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 38 2 L 38 24 M 38 2 C 50 2, 54 10, 54 13 C 54 16, 50 24, 38 24" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <path d="M 62 24 L 72 2 M 72 2 L 82 24 M 66 15 L 78 15" stroke="#1D4ED8" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 90 2 L 90 24 M 90 13 L 102 2 M 92 11 L 102 24" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" />
            </g>
            <text x="80" y="64" fontFamily="sans-serif" fontWeight="900" fontSize="23" fill="black" textAnchor="middle" letterSpacing="0.8">METCAST</text>
          </svg>
        </div>
      );

    case 'cl16':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-[#0B1E33] rounded-xl p-1 select-none border border-slate-800">
          <svg className="h-12 w-auto max-w-[180px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="4" fill="#0B1E33" />
            <path d="M 50 15 L 62 27 L 50 39 L 38 27 Z" stroke="white" strokeWidth="1.5" fill="none" />
            <circle cx="50" cy="40" r="13" stroke="white" strokeWidth="2.5" fill="none" />
            <circle cx="50" cy="40" r="9" stroke="white" strokeWidth="1.5" />
            <text x="50" y="44" fontFamily="sans-serif" fontWeight="bold" fontSize="11" fill="white" textAnchor="middle">LC</text>
            <path d="M 28 65 L 72 65 M 34 60 L 66 60 M 30 65 L 20 75 M 70 65 L 80 75" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <text x="50" y="80" fontFamily="sans-serif" fontWeight="900" fontSize="8" fill="white" textAnchor="middle" letterSpacing="0.2">LOCO CASTINGS</text>
            <text x="50" y="90" fontFamily="sans-serif" fontWeight="800" fontSize="6" fill="#94A3B8" textAnchor="middle">Pvt. Ltd.</text>
          </svg>
        </div>
      );

    case 'cl17':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-[#84CC16] rounded-xl p-1 select-none border border-lime-700/50">
          <svg className="h-9 w-auto max-w-[180px]" viewBox="0 0 340 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="340" height="50" fill="#84CC16" rx="2" />
            <rect x="8" y="7" width="36" height="36" fill="white" rx="1" />
            <rect x="11" y="10" width="30" height="30" fill="#15803D" />
            <path d="M 26 14 C 23 16, 23 20, 26 22 C 29 20, 29 16, 26 14 Z" fill="#EAB308" />
            <path d="M 22 18 C 19 20, 19 24, 22 26 C 25 24, 25 20, 22 18 Z" fill="#EAB308" />
            <path d="M 30 18 C 27 20, 27 24, 30 26 C 33 24, 33 20, 30 18 Z" fill="#EAB308" />
            <path d="M 26 24 C 23 26, 23 30, 26 32 C 29 30, 29 26, 26 24 Z" fill="#EAB308" />
            <path d="M 26 12 L 26 36" stroke="#EAB308" strokeWidth="2" />
            <text x="54" y="32" fontFamily="sans-serif" fontWeight="900" fontSize="21" fill="white" letterSpacing="0.8">TEESTA AGRO INDUSTRIES LTD.</text>
          </svg>
        </div>
      );

    case 'cl18':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-11 w-auto max-w-[180px]" viewBox="0 0 250 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(30, 32)">
              <circle cx="0" cy="0" r="18" stroke="#1E293B" strokeWidth="4.5" fill="none" />
              <path d="M-2 -22 L2 -22 L3 -18 L-3 -18 Z M-2 18 L2 18 L3 22 L-3 22 Z M-18 -2 L-18 2 L-22 3 L-22 -3 Z M18 -2 L18 2 L22 3 L22 -3 Z" fill="#1E293B" />
              <path d="M-13 -13 L-10 -10 M10 10 L13 13 M-13 13 L-10 10 M10 -10 L13 -13" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M -10 5 A 11 11 0 0 1 10 5 Z" fill="#DC2626" />
              <text x="0" y="6" fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#1E293B" textAnchor="middle">AF</text>
            </g>
            <text x="70" y="32" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="24" fill="#0F172A" letterSpacing="0.5">ARIS</text>
            <text x="70" y="49" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="#0F172A" letterSpacing="2">FOUNDRY</text>
            <text x="3" y="64" fontFamily="sans-serif" fontWeight="700" fontSize="8" fill="#B91C1C" letterSpacing="0.2">Casting Satisfaction, Moduling trust</text>
          </svg>
        </div>
      );

    case 'cl19':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 260 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 42 L 20 8 L 30 8 L 22 42 Z" fill="#EF4444" />
            <path d="M 28 8 C 42 8, 48 18, 48 26 C 48 35, 38 42, 24 42 C 34 38, 40 32, 40 26 C 40 18, 34 14, 28 14 Z" fill="#1D4ED8" />
            <text x="56" y="30" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="28" fill="#DC2626" letterSpacing="-0.5">LASER</text>
            <text x="58" y="44" fontFamily="sans-serif" fontWeight="800" fontSize="11.5" fill="#1E3A8A" letterSpacing="1">POWER & INFRA</text>
          </svg>
        </div>
      );

    case 'cl20':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 8 12 H 42 M 8 12 V 48 H 42" stroke="#1E3A8A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M22 42 C16 34, 18 24, 22 18 C20 25, 21 32, 24 36 Z" fill="#EAB308" />
            <path d="M25 42 C22 32, 24 22, 28 15 C26 23, 27 31, 30 36 Z" fill="#10B981" />
            <path d="M28 42 C26 34, 30 26, 34 18 C31 25, 31 32, 33 37 Z" fill="#1E40AF" />
            <text x="48" y="30" fontFamily="sans-serif" fontWeight="900" fontSize="17" fill="#1E3A8A" letterSpacing="0.5">EDIBLE</text>
            <text x="48" y="46" fontFamily="sans-serif" fontWeight="900" fontSize="17" fill="#1E3A8A" letterSpacing="0.5">GROUP</text>
          </svg>
        </div>
      );

    case 'cl21':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="10" width="140" height="40" rx="20" stroke="#0284C7" strokeWidth="3" fill="none" />
            <text x="70" y="39" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="25" fill="#0284C7" textAnchor="middle" letterSpacing="-1">PCPL</text>
            <path d="M 106 20 C 103 16, 103 10, 106 6 C 109 10, 109 16, 106 20 Z" fill="#EF4444" />
          </svg>
        </div>
      );

    case 'cl22':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="85" cy="30" rx="75" ry="20" stroke="#2563EB" strokeWidth="3.5" fill="none" />
            <ellipse cx="85" cy="30" rx="72" ry="17" fill="#2563EB" />
            <text x="80" y="36" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="15" fill="white" textAnchor="middle" letterSpacing="0.2">PAHARPUR</text>
            <g transform="translate(135, 42)">
              <circle cx="0" cy="0" r="13" fill="white" stroke="#2563EB" strokeWidth="2" />
              <path d="M -13 0 H 13 M 0 -13 V 13" stroke="#2563EB" strokeWidth="1" />
              <path d="M -9 -9 C -3 -3, -3 3, -9 9 M 9 -9 C 3 -3, 3 3, 9 9" stroke="#2563EB" strokeWidth="1" fill="none" />
            </g>
          </svg>
        </div>
      );

    case 'cl23':
      return (
        <div className="w-full h-14 flex items-center justify-center bg-white dark:bg-white rounded-xl p-1 select-none border border-slate-200/50">
          <svg className="h-10 w-auto max-w-[180px]" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="39" fontFamily="sans-serif" fontWeight="900" fontSize="28" fill="#4B5563" letterSpacing="-0.5">mallcom</text>
            <g transform="translate(130, 24)">
              <path d="M -5 -12 L 5 0 L -5 12" stroke="#F59E0B" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 2 -12 L 12 0 L 2 12" stroke="#EAB308" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>
        </div>
      );

    default:
      return (
        <div className="w-full h-14 flex items-center justify-center bg-slate-50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/60 rounded-xl px-2.5 py-1 group-hover:scale-105 transition-transform duration-300 select-none">
          <span className="font-sans font-extrabold text-[9px] md:text-[10px] text-slate-700 dark:text-slate-350 tracking-tight text-center leading-tight uppercase line-clamp-2">
            {name}
          </span>
        </div>
      );
  }
}

function ClientCard({ client }: { client: ClientItem }) {
  return (
    <div className="w-52 h-32 bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-2xl p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-ces-blue/30 dark:hover:border-sky-500/30 transition-all duration-300 select-none shrink-0 group">
      {/* CSS Vector Logo Container */}
      <div className="w-full h-14 flex items-center justify-center shrink-0">
        <ClientLogo id={client.id} name={client.name} logo={client.logo} />
      </div>
      
      {/* Brand Text Info */}
      <div className="text-center mt-2 flex-1 flex flex-col justify-center leading-none">
        <h4 className="font-sans font-black text-[9.5px] text-ces-blue dark:text-sky-350 tracking-tight leading-none truncate max-w-[170px]">
          {client.name}
        </h4>
        {client.subtitle && (
          <p className="text-[7.5px] text-slate-400 dark:text-slate-500 italic font-medium mt-0.5 truncate max-w-[160px]">
            {client.subtitle}
          </p>
        )}
      </div>

      {/* Tiny clean industry tag */}
      <div className="mt-1 text-[6.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 text-center">
        {client.industry.replace(' Industry', '')}
      </div>
    </div>
  );
}

export default function Clients() {
  const [clients, setClients] = React.useState<ClientItem[]>([]);

  React.useEffect(() => {
    const loadClients = () => {
      const saved = localStorage.getItem('candela_clients');
      if (saved) {
        try {
          let parsed = JSON.parse(saved);
          let migrated = false;
          if (Array.isArray(parsed)) {
            parsed = parsed.map((c: any) => {
              if (c.name === 'NIPHA 65') {
                migrated = true;
                return { ...c, name: 'NIPHA' };
              }
              return c;
            });
          }
          if (migrated) {
            localStorage.setItem('candela_clients', JSON.stringify(parsed));
          }
          setClients(parsed);
        } catch (e) {
          setClients(CLIENTS_DATA);
        }
      } else {
        setClients(CLIENTS_DATA);
        localStorage.setItem('candela_clients', JSON.stringify(CLIENTS_DATA));
      }
    };

    loadClients();
    window.addEventListener('candela-clients-changed', loadClients);
    return () => window.removeEventListener('candela-clients-changed', loadClients);
  }, []);

  // Divide all clients across 3 rows for parallel scrolling tracks
  const divideIntoRows = (items: ClientItem[]) => {
    const r1: ClientItem[] = [];
    const r2: ClientItem[] = [];
    const r3: ClientItem[] = [];
    
    items.forEach((item, index) => {
      if (index % 3 === 0) r1.push(item);
      else if (index % 3 === 1) r2.push(item);
      else r3.push(item);
    });
    
    return [r1, r2, r3];
  };

  const [row1, row2, row3] = divideIntoRows(clients);

  // Pad/Duplicate items to ensure marquee tracks have enough content to loop seamlessly
  const getRowItems = (row: ClientItem[]) => {
    if (row.length === 0) return [];
    let list = [...row];
    while (list.length < 15) {
      list = [...list, ...row];
    }
    // Duplicate exactly once for infinite seamless scrolling mathematics
    return [...list, ...list];
  };

  const track1Items = getRowItems(row1);
  const track2Items = getRowItems(row2);
  const track3Items = getRowItems(row3);

  // Hardware-accelerated infinite scrolling CSS animations
  const marqueeKeyframes = `
    @keyframes marquee-scroll-left {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-50%, 0, 0);
      }
    }
    @keyframes marquee-scroll-right {
      0% {
        transform: translate3d(-50%, 0, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
    .animate-marquee-left-r1 {
      animation: marquee-scroll-left 45s linear infinite;
    }
    .animate-marquee-left-r2 {
      animation: marquee-scroll-left 50s linear infinite;
    }
    .animate-marquee-left-r3 {
      animation: marquee-scroll-left 47s linear infinite;
    }
    .marquee-track-container:hover .animate-marquee-left-r1,
    .marquee-track-container:hover .animate-marquee-left-r2,
    .marquee-track-container:hover .animate-marquee-left-r3 {
      animation-play-state: paused;
    }
  `;

  return (
    <section id="clients" className="py-20 bg-slate-55/70 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 overflow-hidden relative">
      <style>{marqueeKeyframes}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-ces-accent mb-2">Corporate Alliances</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ces-blue dark:text-sky-450 tracking-tight transition-colors">
            Our Clients
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed transition-colors">
            Our engineering intelligence and financial consultancy empower major corporations across West Bengal. Our portfolio spans food agriculture, textiles, iron and steel, and chemical utilities.
          </p>
          <div className="w-16 h-1 bg-ces-blue dark:bg-sky-500 mx-auto mt-4 rounded-sm transition-colors"></div>
        </motion.div>

        {/* 3-Row Automated Infinite Scrolling Marquee Container */}
        <div className="marquee-track-container space-y-4 max-w-7xl mx-auto overflow-hidden rounded-2xl bg-slate-100/40 dark:bg-slate-950/20 p-4 border border-slate-200/40 dark:border-slate-850/40 transition-colors">
          <div className="space-y-4">
            {/* Row 1 (Scrollers Left) */}
            {track1Items.length > 0 && (
              <div className="relative w-full overflow-hidden flex mask-gradient">
                <div className="animate-marquee-left-r1 flex gap-4 w-max">
                  {track1Items.map((client, idx) => (
                    <div key={`row1-${client.id}-${idx}`}>
                      <ClientCard client={client} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Row 2 (Scrollers Left) */}
            {track2Items.length > 0 && (
              <div className="relative w-full overflow-hidden flex mask-gradient">
                <div className="animate-marquee-left-r2 flex gap-4 w-max">
                  {track2Items.map((client, idx) => (
                    <div key={`row2-${client.id}-${idx}`}>
                      <ClientCard client={client} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Row 3 (Scrollers Left) */}
            {track3Items.length > 0 && (
              <div className="relative w-full overflow-hidden flex mask-gradient">
                <div className="animate-marquee-left-r3 flex gap-4 w-max">
                  {track3Items.map((client, idx) => (
                    <div key={`row3-${client.id}-${idx}`}>
                      <ClientCard client={client} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Static Professional bottom panel */}
        <motion.div 
          className="mt-14 text-center bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850/80 p-5 rounded-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-ces-blue/5 dark:bg-sky-500/10 rounded-xl text-ces-blue dark:text-sky-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Certified Regulatory Authority Compliance</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl leading-relaxed">
                We orchestrate comprehensive statutory clearances, electrical load authorizations, power generation synchronizations, and factory inspectorate general assembly layout approvals.
              </p>
            </div>
          </div>
          <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 bg-slate-50 dark:bg-slate-900 shrink-0 font-bold tracking-wider">
            GOVT. LICENSED CONSULTANCY
          </div>
        </motion.div>

      </div>
    </section>
  );
}
