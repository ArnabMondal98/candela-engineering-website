import React from 'react';
import { Award, ShieldCheck, Mail, Phone, ChevronUp } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import CompanyLogo from './CompanyLogo';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          {/* Logo Brand Segment */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <CompanyLogo className="w-10 h-10" />
              <div>
                <h3 className="font-gothic font-extrabold text-base text-white tracking-wide leading-tight uppercase text-ces-accent">CANDELA GROUP</h3>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider font-sans">Consultancy • Project • Trading</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Established in 2016 in West Bengal, Candela Group is an industry-trusted Engineering & Financial Consultant, specialized in turnkey electrical setups, subsidy facilitation, and safety audits.
            </p>
          </div>

          {/* Quick links Segment */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-ces-accent transition-colors">Home Base</a>
              </li>
              <li>
                <a href="#about" className="hover:text-ces-accent transition-colors">Corporate Profile</a>
              </li>
              <li>
                <a href="#services" className="hover:text-ces-accent transition-colors">Service Verticals</a>
              </li>
              <li>
                <a href="#clients" className="hover:text-ces-accent transition-colors">Valued Partners</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-ces-accent transition-colors">Consultations</a>
              </li>
            </ul>
          </div>

          {/* Regulatory details Segment */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">Accreditations</h4>
            <div className="space-y-2.5">
              <div className="flex items-start space-x-2 text-slate-400 leading-relaxed">
                <ShieldCheck className="w-4.5 h-4.5 text-ces-accent shrink-0 mt-0.5" />
                <span>
                  Authorized Government Electrical License Holder for commercial & industrial power installations (up to 33KV grids).
                </span>
              </div>
              <div className="flex items-start space-x-2 text-slate-400 leading-relaxed">
                <Award className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Liaison consultant for Directorate of Electricity (DOE) and State Water Investigation Directorate (SWID) approvals.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Segment */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <div className="text-slate-500 text-center sm:text-left space-y-1">
            <p>© {new Date().getFullYear()} {COMPANY_DETAILS.name}. All Rights Reserved.</p>
          </div>
          
          {/* Scroll back to top */}
          <button
            onClick={handleScrollToTop}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white p-2.5 rounded-sm transition-all flex items-center space-x-1.5 shadow-sm"
            title="Scroll to Top"
          >
            <ChevronUp className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Back to Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
