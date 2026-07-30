import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Calendar, Download, MapPin, PhoneCall } from 'lucide-react';
import { PortfolioProfile, ContactMessage } from '../types';

interface ContactSectionProps {
  profile: PortfolioProfile;
  onSendMessage: (msg: ContactMessage) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  onSendMessage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Portfolio Query',
      message: formData.message,
      timestamp: new Date().toLocaleTimeString(),
    };

    onSendMessage(newMessage);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const handleCopyEmail = () => {
    const rawEmail = profile.socialLinks.find((l) => l.platform === 'email')?.url.replace('mailto:', '') || 'alex.chen.dev@example.com';
    navigator.clipboard.writeText(rawEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleDownloadVCard = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.title}
EMAIL:${profile.socialLinks.find((l) => l.platform === 'email')?.url.replace('mailto:', '') || 'alex.chen.dev@example.com'}
NOTE:${profile.subtitle}
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Contact.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const emailAddress = profile.socialLinks.find((l) => l.platform === 'email')?.url.replace('mailto:', '') || 'alex.chen.dev@example.com';

  return (
    <section id="contact" className="py-20 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Mail className="w-3.5 h-3.5" />
                Let's Work Together
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Get In Touch
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Have an exciting project, full-time role, consulting contract, or tech question? Send a message and I'll respond within 24 hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Email Address</div>
                    <div className="text-sm font-semibold text-white">{emailAddress}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-all"
                  title="Copy Email"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Location</div>
                    <div className="text-sm font-semibold text-white">{profile.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* vCard & Calendar buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleDownloadVCard}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                Download Contact vCard
              </button>

              <a
                href={`mailto:${emailAddress}?subject=Schedule%20a%20Call`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                <Calendar className="w-4 h-4 text-rose-400" />
                Schedule Intro Call
              </a>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Delivered!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been stored in local session logs and an alert simulated. I will reply to you shortly!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-indigo-400 hover:underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack Lead Role or Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your project, position requirements, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
