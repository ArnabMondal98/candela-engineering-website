import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Award, Send, CheckCircle, FileClock, Trash2, ShieldCheck, CreditCard, Clock, Loader2, Database } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import { ContactInquiry } from '../types';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface ContactProps {
  preFillType: 'Project' | 'Consultancy' | 'Trading' | 'General' | null;
  preFillServiceName: string;
  clearPreFill: () => void;
}

export default function Contact({ preFillType, preFillServiceName, clearPreFill }: ContactProps) {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'General',
    message: ''
  });

  const [submissions, setSubmissions] = useState<ContactInquiry[]>([]);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<'success' | 'failed' | null>(null);
  const [supabaseConnectionError, setSupabaseConnectionError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Handle pre-fills from tabular grid interactions
  useEffect(() => {
    if (preFillType && preFillServiceName) {
      setFormData(prev => ({
        ...prev,
        serviceType: preFillType,
        message: `I am interested in acquiring your services for: "${preFillServiceName}". Please provide the technical feasibility parameters, commercial rates, and process requirements.`
      }));
    }
  }, [preFillType, preFillServiceName]);

  // Load submissions from Supabase and test connection on load
  useEffect(() => {
    async function checkConnectionAndLoad() {
      console.log("Checking Supabase connection...");
      try {
        const { count, error } = await supabase
          .from('contact_inquiries')
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error("Supabase Connection Failed", error);
          setSupabaseConnectionError("Supabase Connection Failed");
        } else {
          console.log("Supabase Connected", count);
          setSupabaseConnectionError(null);
          
          // Load submissions directly from Supabase
          const { data, error: loadErr } = await supabase
            .from('contact_inquiries')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

          if (!loadErr && data) {
            const mapped: ContactInquiry[] = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              email: item.email,
              phone: item.phone,
              company: item.company || '',
              serviceType: item.service_type || 'General',
              message: item.message,
              created_at: item.created_at
            }));
            setSubmissions(mapped);
          }
        }
      } catch (err: any) {
        console.error("Supabase Connection Failed", err);
        setSupabaseConnectionError("Supabase Connection Failed");
      }
    }

    checkConnectionAndLoad();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmittedSuccess(false);
    setSupabaseSyncStatus(null);

    // Form validations
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage('Please fill in all mandatory fields (*).');
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting Form", formData);

    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || null,
            service_type: formData.serviceType,
            message: formData.message
          }
        ])
        .select();

      if (error) {
        console.error("Supabase Insert Failed", error);
        setErrorMessage(`Submission failed: ${error.message} (${error.code || 'unknown'})`);
        setSupabaseSyncStatus('failed');
        setIsSubmitting(false);
        return;
      }

      console.log("Insert Successful", data);
      setSupabaseSyncStatus('success');
      setSubmittedSuccess(true);
      clearPreFill();

      // Reset inputs
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: 'General',
        message: ''
      });

      // Reload list directly from Supabase
      const { data: refreshed, error: loadError } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!loadError && refreshed) {
        const mapped: ContactInquiry[] = refreshed.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          company: item.company || '',
          serviceType: item.service_type || 'General',
          message: item.message,
          created_at: item.created_at
        }));
        setSubmissions(mapped);
      }

      // Hide success notification after 8 seconds
      setTimeout(() => {
        setSubmittedSuccess(false);
        setSupabaseSyncStatus(null);
      }, 8000);

    } catch (err: any) {
      console.error("Supabase Insert Failed", err);
      setErrorMessage(`Submission failed: ${err.message || err}`);
      setSupabaseSyncStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteInquiry = async (id: string | undefined, index: number) => {
    if (!id) {
      const updated = submissions.filter((_, i) => i !== index);
      setSubmissions(updated);
      return;
    }

    console.log("Deleting submission from Supabase, ID:", id);
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Failed to delete inquiry from Supabase:", error);
        alert(`Failed to delete from Supabase: ${error.message}`);
        return;
      }

      console.log("Inquiry deleted successfully from Supabase");
      const updated = submissions.filter((sub) => sub.id !== id);
      setSubmissions(updated);
    } catch (err) {
      console.error("Error during deletion:", err);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-ces-accent mb-2">Connect With Us</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ces-blue dark:text-sky-450 tracking-tight transition-colors">
            Consultation & Business Inquiries
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed transition-colors">
            Submit your industrial electrification requirements, subsidy query, or product specifications RFP. Our executive office will revert within 24 business hours.
          </p>
          <div className="w-16 h-1 bg-ces-blue dark:bg-sky-500 mx-auto mt-4 rounded-sm transition-colors"></div>
        </motion.div>

        {/* Master Contacts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Coordinates & Visual Business Card */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            
            {/* Elegant Business Card Replica */}
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center space-x-1 transition-colors">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Official Business Card</span>
              </p>
              <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 md:p-8 rounded-sm border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden group transition-all duration-300">
                {/* Accent line of card */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-ces-blue dark:bg-sky-500 transition-colors"></div>
                
                {/* Card Logo header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-sm border border-ces-blue dark:border-sky-500 flex items-center justify-center bg-white dark:bg-slate-900 flex-shrink-0 transition-colors">
                      <span className="font-display font-bold text-xs text-ces-blue dark:text-sky-400">CES</span>
                    </div>
                    <div>
                      <div className="font-display font-bold text-xs tracking-wide text-ces-blue dark:text-sky-400 transition-colors">CANDELA</div>
                      <div className="text-[7px] text-slate-500 dark:text-slate-400 uppercase tracking-wider -mt-0.5 font-semibold transition-colors">Engineering & Services</div>
                    </div>
                  </div>
                  <span className="text-[8px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-sm border border-emerald-200 dark:border-emerald-900/40 font-mono font-bold uppercase tracking-wide transition-colors">
                    APPROVED HOLDER
                  </span>
                </div>

                {/* Chief Officer Details */}
                <div className="space-y-1 mb-6">
                  <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-slate-100 tracking-tight transition-colors">{COMPANY_DETAILS.ceo}</h4>
                  <p className="text-xs text-ces-accent dark:text-amber-500 font-bold uppercase tracking-wider transition-colors">{COMPANY_DETAILS.ceoTitle}</p>
                  <p className="text-[10px] font-bold text-ces-blue/80 dark:text-sky-400/80 uppercase tracking-wider pt-1 border-t border-slate-200 dark:border-slate-800 transition-colors">
                    Candela Engineering & Services
                  </p>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 italic transition-colors">Engineering & Financial Consultant</p>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 italic transition-colors">Govt. Electrical License Holder</p>
                </div>

                {/* Footer details on card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[9px] text-slate-500 dark:text-slate-400 border-t border-dashed border-slate-200 dark:border-slate-800 pt-4 transition-colors">
                  <div className="space-y-1">
                    <p className="flex items-center space-x-1.5 font-medium">
                      <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span>{COMPANY_DETAILS.phone}</span>
                    </p>
                    <p className="flex items-center space-x-1.5 font-medium">
                      <Mail className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span className="truncate">{COMPANY_DETAILS.email}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-start space-x-1.5 font-medium">
                      <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">Shibpur, Howrah - 711109</span>
                    </p>
                    <a 
                      href={`https://${COMPANY_DETAILS.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ces-blue hover:text-ces-blue-light dark:text-sky-400 dark:hover:text-sky-300 font-bold flex items-center space-x-1 transition-colors hover:underline cursor-pointer"
                    >
                      <span className="inline-block w-1 h-1 bg-ces-blue dark:bg-sky-500 rounded-sm"></span>
                      <span>{COMPANY_DETAILS.website}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>



          </motion.div>

          {/* Right Column: Interactive RFP Submission Form */}
          <motion.div 
            className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-sm shadow-xs transition-colors"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display font-bold text-xl text-ces-blue dark:text-sky-450 tracking-tight mb-6 transition-colors">
              Industrial RFP & Consultation Request Form
            </h3>

            {supabaseConnectionError && (
              <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-400 rounded-sm text-xs font-bold transition-colors flex items-center gap-2">
                <Database className="w-4 h-4 text-rose-600 dark:text-rose-500 animate-pulse shrink-0" />
                <span>{supabaseConnectionError}</span>
              </div>
            )}

            {submittedSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 rounded-sm flex items-start space-x-3 transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs font-semibold space-y-1">
                  <span className="font-bold block text-emerald-700 dark:text-emerald-400">Your enquiry has been submitted successfully.</span>
                  <span className="text-slate-600 dark:text-slate-400 block text-[11px] font-medium">Your inquiry has been successfully inserted into the Supabase backend in real-time.</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1 mt-1 bg-emerald-100/30 dark:bg-emerald-500/10 px-2 py-1 rounded border border-emerald-200/30">
                    <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Supabase Synchronized
                  </span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-400 rounded-sm text-xs font-bold transition-colors">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 transition-colors">
                    Contact Person Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs rounded-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-bold transition-colors"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 transition-colors">
                    Company / Industry Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs rounded-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-bold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 transition-colors">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs rounded-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-bold transition-colors"
                  />
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 transition-colors">
                    Telephone / Mobile <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs rounded-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-bold transition-colors"
                  />
                </div>
              </div>

              {/* Service vertical dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 transition-colors">
                  Business Vertical Interest
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs rounded-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 text-slate-800 dark:text-slate-100 font-bold transition-colors"
                >
                  <option value="General">General Inquiry / Licensing</option>
                  <option value="Project">Engineering Projects (Turnkey / Solar)</option>
                  <option value="Consultancy">Technical Consultancy (Subsidies / Audits)</option>
                  <option value="Trading">Equipment (Panels / Transformers)</option>
                </select>
              </div>

              {/* Message description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 transition-colors">
                  Requirements Specification / Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs rounded-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-ces-blue dark:focus:ring-sky-500 text-slate-850 dark:text-slate-100 placeholder-slate-400 resize-none leading-relaxed font-medium transition-colors"
                ></textarea>
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ces-blue hover:bg-ces-blue-light dark:bg-sky-500 dark:hover:bg-sky-650 text-white dark:text-slate-950 font-bold text-xs py-3.5 rounded-sm uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-ces-accent dark:text-slate-950 animate-spin" />
                    <span>Synchronizing with Supabase...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-ces-accent dark:text-slate-950" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

        {/* New Office Coordinates card exactly matching the attached design */}
        <motion.div 
          className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column: List of coordinates */}
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                Registered Office
              </h3>
              
              <div className="space-y-5">
                {/* Address block */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 text-ces-blue dark:text-sky-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {COMPANY_DETAILS.address}
                  </p>
                </div>

                {/* Email block */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 text-ces-blue dark:text-sky-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <a 
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="block text-sm sm:text-base text-slate-700 dark:text-slate-300 hover:text-ces-blue dark:hover:text-sky-450 hover:underline transition-colors font-medium break-all"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                    <a 
                      href="mailto:ceoxces@gmail.com"
                      className="block text-sm sm:text-base text-slate-700 dark:text-slate-300 hover:text-ces-blue dark:hover:text-sky-450 hover:underline transition-colors font-medium break-all"
                    >
                      ceoxces@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone block */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 text-ces-blue dark:text-sky-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <a 
                    href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                    className="text-sm sm:text-base text-slate-700 dark:text-slate-300 hover:text-ces-blue dark:hover:text-sky-450 hover:underline transition-colors font-medium"
                  >
                    {COMPANY_DETAILS.phone}
                  </a>
                </div>

                {/* Timings block */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 text-ces-blue dark:text-sky-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 space-y-1 font-medium leading-relaxed">
                    <p>Mon - Fri 10 a.m. - 07 p.m.</p>
                    <p>Sat 10 a.m. - 05 p.m.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Google Maps Embed with identical rounded-2xl framing */}
            <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs relative">
                <iframe
                  title="Candela Engineering & Services Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5828859737877!2d88.29736317587843!3d22.568354279500057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027912aef85565%3A0xdc23323ab3a89fbe!2sCANDELA%20ENGINEERING%20%26%20SERVICES!5e0!3m2!1sen!2sin!4v1720216000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter grayscale-[5%] contrast-[101%] dark:invert-[90%] dark:hue-rotate-[180deg] dark:brightness-[95%] dark:contrast-[100%] transition-all duration-300 block w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real-time Submissions Audit logs */}
        {submissions.length > 0 && (
          <div className="mt-16 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 transition-colors duration-300">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-display font-bold text-sm text-ces-blue dark:text-sky-450 flex items-center space-x-2 transition-colors">
                <FileClock className="w-4 h-4 text-ces-blue dark:text-sky-450" />
                <span>Submitted RFPs Log (Administrator Preview)</span>
              </h4>
              <div className="relative">
                {!showClearConfirm ? (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-455 flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear History</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 p-1.5 rounded-sm">
                    <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold uppercase tracking-wide">Confirm Clear?</span>
                    <button
                      onClick={async () => {
                        console.log("Clearing submissions locally");
                        setSubmissions([]);
                        try {
                          const { error } = await supabase
                            .from('contact_inquiries')
                            .delete()
                            .neq('id', '00000000-0000-0000-0000-000000000000');
                          if (error) {
                            console.warn("Could not delete from Supabase (may be blocked by RLS policies):", error.message);
                          } else {
                            console.log("Supabase records cleared successfully");
                          }
                        } catch (err) {
                          console.warn("Supabase clear error:", err);
                        }
                        setShowClearConfirm(false);
                      }}
                      className="bg-rose-600 dark:bg-rose-700 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {submissions.map((sub, index) => (
                <div key={index} className="bg-white dark:bg-slate-950 p-4 rounded-sm border border-slate-200 dark:border-slate-850 text-xs shadow-xs relative transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm transition-colors">{sub.name}</span>
                      {sub.company && <span className="text-slate-500 dark:text-slate-400 font-semibold transition-colors"> ({sub.company})</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-ces-blue/10 dark:bg-sky-500/10 text-ces-blue dark:text-sky-400 px-2.5 py-1 rounded-sm font-bold text-[9px] uppercase tracking-wider border border-ces-blue/25 dark:border-sky-500/20 transition-colors">
                        {sub.serviceType}
                      </span>
                      <button
                        onClick={() => handleDeleteInquiry(sub.id, index)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                        title="Delete Inquiry from Supabase"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-500 dark:text-slate-400 font-mono text-[10px] mb-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-sm border border-slate-100 dark:border-slate-850 transition-colors">
                    <div><span className="font-bold text-slate-700 dark:text-slate-300 uppercase">Email:</span> {sub.email}</div>
                    <div><span className="font-bold text-slate-700 uppercase dark:text-slate-300">Phone:</span> {sub.phone}</div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/50 p-2.5 rounded-sm border border-slate-200 dark:border-slate-800 leading-relaxed text-[11px] font-medium transition-colors">
                    {sub.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
