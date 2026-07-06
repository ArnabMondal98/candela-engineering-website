import React, { useState, useEffect } from 'react';
import { Target, Eye, HeartHandshake, Award, FileSpreadsheet } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import { motion } from 'motion/react';

export default function About() {
  const [companyDetails, setCompanyDetails] = useState(COMPANY_DETAILS);

  useEffect(() => {
    const loadAbout = () => {
      const savedAbout = localStorage.getItem('candela_company_details');
      if (savedAbout) {
        try {
          setCompanyDetails(JSON.parse(savedAbout));
        } catch (e) {
          setCompanyDetails(COMPANY_DETAILS);
        }
      } else {
        setCompanyDetails(COMPANY_DETAILS);
      }
    };

    loadAbout();
    window.addEventListener('candela-about-changed', loadAbout);
    window.addEventListener('storage', loadAbout);
    return () => {
      window.removeEventListener('candela-about-changed', loadAbout);
      window.removeEventListener('storage', loadAbout);
    };
  }, []);

  const credentials = [
    {
      icon: <Award className="w-5 h-5 text-ces-accent" />,
      title: companyDetails.credentials?.[0] || 'Govt. Electrical License Holder',
      description: 'Authorized by the Government licensing board to carry out and certify heavy electrical layouts, installations, and commissioning.'
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-ces-accent" />,
      title: companyDetails.credentials?.[1] || 'Industrial Engineering Consultant',
      description: 'Consultant for master planning, feasibility studies, detailed engineering layout design, and capacity optimization studies.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-ces-accent" />,
      title: companyDetails.credentials?.[2] || 'Financial Subsidy Specialists',
      description: 'Technical coordinators assisting businesses to leverage financial subsidies, concessional electricity duties, and state capital incentives.'
    }
  ];

  return (
    <section 
      id="about" 
      className="relative py-12 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 overflow-hidden bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center"
    >
      {/* Background overlay for optimal content contrast and professional aesthetics */}
      <div className="absolute inset-0 bg-slate-100/40 dark:bg-slate-950/65 transition-colors duration-300" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-ces-accent mb-1.5">Corporate Profile</p>
          <h2 className="font-gothic font-extrabold text-2xl sm:text-3xl text-ces-blue dark:text-sky-455 tracking-tight transition-colors duration-300">
            About Candela Group
          </h2>
          <div className="w-12 h-1 bg-ces-blue dark:bg-sky-500 mx-auto mt-3 rounded-sm transition-colors duration-300"></div>
        </motion.div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Text Column */}
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-between space-y-5 bg-white/95 dark:bg-slate-950/95 p-6 md:p-8 rounded-sm shadow-xs border border-slate-200/80 dark:border-slate-850/80 transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-xl md:text-2xl text-ces-blue dark:text-sky-400 tracking-tight transition-colors duration-300 leading-tight">
                Engineering Excellence & Regulatory Expertise Since 2016
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm transition-colors duration-300">
                {companyDetails.description}
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm transition-colors duration-300">
                At Candela, we understand that establishing and operating a heavy industry requires a seamless blend of engineering precision and compliance coordination. Our specialized focus on West Bengal regulations allows us to expedite setups and maximize profitability for our clients.
              </p>
            </div>

            {/* Mission & Vision Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-4 border-t border-slate-100 dark:border-slate-900">
              <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-sm border border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
                <div className="inline-flex p-1.5 bg-ces-blue/5 dark:bg-sky-500/10 rounded-sm mb-2">
                  <Target className="w-4 h-4 text-ces-blue dark:text-sky-400" />
                </div>
                <h4 className="font-display font-bold text-slate-900 dark:text-slate-100 text-xs tracking-wide uppercase mb-1">Our Mission</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {companyDetails.mission}
                </p>
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-sm border border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
                <div className="inline-flex p-1.5 bg-ces-accent/5 dark:bg-ces-accent/10 rounded-sm mb-2">
                  <Eye className="w-4 h-4 text-ces-accent" />
                </div>
                <h4 className="font-display font-bold text-slate-900 dark:text-slate-100 text-xs tracking-wide uppercase mb-1">Our Vision</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {companyDetails.vision}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Accreditations Column */}
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col justify-between h-full space-y-3">
              {credentials.map((cred, index) => (
                <div 
                  key={index} 
                  className="bg-white/95 dark:bg-slate-950/95 p-5 rounded-sm border border-slate-200/80 dark:border-slate-850/80 shadow-xs flex items-start space-x-4 hover:border-ces-blue dark:hover:border-sky-500 hover:shadow-sm transition-all duration-300 flex-1"
                >
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-sm shrink-0 transition-colors">
                    {cred.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-ces-blue dark:text-sky-400 uppercase tracking-wide transition-colors">
                      {cred.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed transition-colors">
                      {cred.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
