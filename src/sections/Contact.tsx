import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Send, CheckCircle2, AlertCircle, RefreshCw, Terminal, ArrowUpRight, Copy, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const serviceId = 'service_qehkzpm';
    const templateId = 'template_honr1dj';
    const publicKey: string = 'tyJ89dXitoki-XN7V';

    if (publicKey && publicKey !== 'public_key_here') {
      emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)
        .then(() => {
          handleSuccess();
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          setSubmitStatus('error');
          setIsSubmitting(false);
        });
    } else {
      setTimeout(() => {
        handleSuccess();
      }, 1200);
    }
  };

  const handleSuccess = () => {
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#FACC15', '#000000', '#10B981']
    });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-white/20 bg-slate-50 dark:bg-[#0D0E14]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="// 07"
          badge="Direct Inquiries"
          title="Connect / Collaborate"
          subtitle="Open for engineering roles, technical internships, and collaborative software projects."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#38bdf8]">
              <div className="flex justify-between items-center pb-3 mb-6 border-b-2 border-black dark:border-white/20 font-mono text-xs uppercase font-bold">
                <span className="flex items-center gap-1.5 text-black dark:text-white">
                  <Terminal size={14} /> // TRANSMISSION PORT
                </span>
                <span className="text-slate-500">
                  STANDARD ENCRYPTION
                </span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-black border-2 border-black dark:border-white font-mono text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:bg-amber-50 dark:focus:bg-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@domain.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-black border-2 border-black dark:border-white font-mono text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:bg-amber-50 dark:focus:bg-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-1.5">
                    SUBJECT // PURPOSE *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Internship / Full-Stack Project / Inquiry"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-black border-2 border-black dark:border-white font-mono text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:bg-amber-50 dark:focus:bg-slate-900 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-1.5">
                    MESSAGE CONTENT *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter project specifications, job description, or message..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-black border-2 border-black dark:border-white font-mono text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:bg-amber-50 dark:focus:bg-slate-900 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black dark:border-white shadow-[4px_4px_0px_#2563eb] brutal-press flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>Transmitting... <RefreshCw size={15} className="animate-spin" /></>
                    ) : (
                      <>Transmit Message <Send size={15} /></>
                    )}
                  </button>

                  <a
                    href={`mailto:${resumeData.email}?subject=Portfolio%20Inquiry`}
                    className="px-5 py-3.5 bg-amber-300 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] brutal-press flex items-center gap-1.5"
                  >
                    Direct Email Client <ArrowUpRight size={14} />
                  </a>
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-emerald-100 text-emerald-950 border-2 border-emerald-800 font-mono text-xs font-bold flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-emerald-700 flex-shrink-0" />
                    <span>TRANSMISSION CONFIRMED. Thank you! I will reply to your email promptly.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 text-red-950 border-2 border-red-800 font-mono text-xs font-bold flex items-center gap-2.5">
                    <AlertCircle size={18} className="text-red-700 flex-shrink-0" />
                    <span>Direct submission failed. Please send your message directly to {resumeData.email}.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Details & Coordinates Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Contact Data Box */}
            <div className="p-6 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#38bdf8]">
              <h4 className="font-mono text-xs uppercase font-bold pb-2 mb-4 border-b-2 border-black dark:border-white/20 text-black dark:text-white">
                // DIRECT COMMUNICATIONS
              </h4>

              <div className="flex flex-col gap-4 font-mono text-xs">
                <div className="p-3 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">EMAIL</span>
                    <a href={`mailto:${resumeData.email}`} className="font-bold text-black dark:text-white hover:text-blue-600 transition-colors break-all">
                      {resumeData.email}
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(resumeData.email);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2200);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase border border-black dark:border-white transition-all flex items-center gap-1 cursor-pointer brutal-press flex-shrink-0 ${
                      copiedEmail
                        ? 'bg-emerald-400 text-black'
                        : 'bg-amber-300 hover:bg-amber-400 text-black'
                    }`}
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">PHONE / WHATSAPP</span>
                  <a href={`tel:${resumeData.phone}`} className="font-bold text-black dark:text-white hover:text-blue-600 transition-colors">
                    {resumeData.phone}
                  </a>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">RESIDENTIAL BASE</span>
                  <span className="font-bold text-black dark:text-white">
                    {resumeData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Architectural Geographic Stamp */}
            <div className="p-6 bg-black text-white dark:bg-[#181A26] border-2 border-black dark:border-white/30 shadow-[5px_5px_0px_#2563eb]">
              <div className="flex justify-between items-center pb-2 mb-3 border-b border-white/20 font-mono text-[10px] uppercase tracking-widest">
                <span>GEO.STAMP // KARNATAKA</span>
                <span className="text-amber-300">IND // UTC+05:30</span>
              </div>

              <div className="space-y-1 font-mono text-xs text-slate-300">
                <p>MANGALORE — Yenepoya Institute of Tech</p>
                <p>HALIYAL — Permanent Residence</p>
                <p className="text-[10px] text-slate-400 pt-2">
                  COORDINATES: 15°16'04"N • 74°45'22"E
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 flex justify-between items-center font-mono text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> AVAILABLE IMMEDIATELY
                </span>
                <span className="text-slate-400 uppercase">2026/2027</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
