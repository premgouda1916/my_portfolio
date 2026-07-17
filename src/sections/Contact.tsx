import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Mail, Phone, MapPin, Send, CheckCircle, RefreshCw } from 'lucide-react';


export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
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

    // EmailJS keys can be configured here. If not configured, we'll simulate a success to keep portfolio running.
    const serviceId = 'service_qehkzpm'; // Replace with user's EmailJS service ID
    const templateId = 'template_honr1dj'; // Replace with user's EmailJS template ID
    const publicKey: string = 'tyJ89dXitoki-XN7V'; // Replace with user's EmailJS public key

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
      // Simulate success for local testing / demonstration
      setTimeout(() => {
        handleSuccess();
      }, 1500);
    }
  };

  const handleSuccess = () => {
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Fire confetti!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b']
    });
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden bg-slate-900/20 dark:bg-darkBg/10">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accentCyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Get in Touch"
          title="Contact Me"
          subtitle="Feel free to reach out for hackathon inquiries, project collaborations, or student opportunities."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-glass dark:bg-glass p-8 rounded-3xl border border-white/5 shadow-2xl relative">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send Me a Message</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-accentBlue/50 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-accentBlue/50 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-accentBlue/50 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-accentBlue/50 transition-colors text-sm resize-none"
                  />
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accentBlue to-accentCyan text-white font-semibold flex items-center justify-center gap-2 hover:shadow-glow-blue hover:scale-102 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>Sending... <RefreshCw size={18} className="animate-spin" /></>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <span className="text-emerald-400 font-medium text-sm flex items-center gap-1.5 animate-pulse">
                      <CheckCircle size={18} /> Message sent successfully!
                    </span>
                  )}

                  {submitStatus === 'error' && (
                    <span className="text-red-400 font-medium text-sm animate-pulse">
                      Oops! Something went wrong.
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Cards & Maps */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Contact details */}
            <div className="bg-glass dark:bg-glass p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 text-accentBlue">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</span>
                  <a href={`mailto:${resumeData.email}`} className="text-slate-800 dark:text-white hover:text-accentBlue font-semibold transition-colors">
                    {resumeData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 text-accentCyan">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Call / Whatsapp</span>
                  <a href={`tel:${resumeData.phone}`} className="text-slate-800 dark:text-white hover:text-accentBlue font-semibold transition-colors">
                    {resumeData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 text-accentBlue">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Postal Location</span>
                  <span className="text-slate-700 dark:text-slate-200 font-semibold">{resumeData.location}</span>
                </div>
              </div>
            </div>

            {/* Simulated Google Map Widget */}
            <div className="h-64 rounded-3xl overflow-hidden border border-white/5 bg-slate-950 relative shadow-inner group">
              {/* Styled map graphic */}
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:1rem_1rem]" />

                {/* Radial rings representing radar location search */}
                <div className="absolute w-24 h-24 rounded-full border border-accentBlue/20 animate-ping pointer-events-none" />
                <div className="absolute w-12 h-12 rounded-full border border-accentCyan/30 animate-pulse pointer-events-none" />

                {/* Pin indicator */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="p-2.5 rounded-full bg-accentBlue text-white shadow-glow-blue animate-float">
                    <MapPin size={20} />
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-950/95 border border-white/10 text-[10px] font-bold font-mono tracking-widest text-accentCyan uppercase shadow-lg select-none">
                    Haliyala, KA
                  </span>
                </div>
              </div>

              {/* Overlay with grid coordinate data */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm border border-white/5 px-2.5 py-1.5 rounded-xl text-[9px] font-mono text-slate-400 flex gap-3 select-none">
                <span>LAT: 15.2678° N</span>
                <span>LON: 74.7562° E</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
