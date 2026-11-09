import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { validateContactInput, ContactSubmissionInput } from '../utils/portfolioLogic';
import { SectionId, NAV_SECTIONS } from './Navbar';

interface ContactFooterProps {
  onNavigate: (id: SectionId) => void;
}

interface SubmittedMessage extends ContactSubmissionInput {
  id: string;
  time: string;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onNavigate }) => {
  const { personal } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formState, setFormState] = useState<ContactSubmissionInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactSubmissionInput, string>>>({});
  const [submittedMessage, setSubmittedMessage] = useState<SubmittedMessage | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactInput(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const record: SubmittedMessage = {
      ...formState,
      id: `msg-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSubmittedMessage(record);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#06070a] border-t border-white/[0.08]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16 sm:space-y-20">
        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Links & Intro */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
                <span className="text-[#2563EB] font-bold">05.</span>
                <span className="uppercase tracking-wider">Contact & Connect</span>
                <span aria-hidden="true" className="text-zinc-600">/</span>
                <span>Get in Touch</span>
              </div>

              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight [text-wrap:balance]"
              >
                Let’s connect and build something meaningful.
              </h2>

              <p className="font-editorial text-lg text-zinc-300 leading-relaxed [text-wrap:balance]">
                I am actively open to Software Engineering internship opportunities, technical collaborations, and conversations about systems and native application craft.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0c0d14] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1 min-w-0">
                <div className="text-xs text-zinc-500 font-mono-tabular">Direct Email Address</div>
                <a
                  href={`mailto:${personal.email}`}
                  className="font-mono-tabular text-sm sm:text-base font-semibold text-white hover:text-blue-400 transition-colors break-all"
                >
                  {personal.email}
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-200 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:text-white hover:bg-white/[0.1] transition-colors whitespace-nowrap cursor-pointer shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    <span>Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0c0d14] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-zinc-400 group-hover:text-white transition-colors">
                  <Github className="w-5 h-5" aria-hidden="true" />
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">GitHub</div>
                  <div className="text-xs text-zinc-500 font-mono-tabular mt-0.5">@divyanshh69</div>
                </div>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0c0d14] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-zinc-400 group-hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">LinkedIn</div>
                  <div className="text-xs text-zinc-500 font-mono-tabular mt-0.5">Divyansh Nayak</div>
                </div>
              </a>

              <a
                href={`mailto:${personal.email}`}
                className="group p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0c0d14] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-zinc-400 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Mail Client</div>
                  <div className="text-xs text-zinc-500 font-mono-tabular mt-0.5">Send Direct</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form with Dependable Validation */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0c0d14] space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Send a Message</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Have an internship role or project idea? Send a note directly below.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/40 border border-white/[0.08] rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#2563EB]"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/40 border border-white/[0.08] rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#2563EB]"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Internship Opportunity / Project Inquiry"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/40 border border-white/[0.08] rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#2563EB]"
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-400 mt-1" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Details about the role, team, or project..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/40 border border-white/[0.08] rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#2563EB] resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 mt-1" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={`mailto:${personal.email}?subject=${encodeURIComponent(
                      formState.subject || 'Portfolio Inquiry'
                    )}&body=${encodeURIComponent(formState.message || '')}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>Or send via email app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </form>

              {/* Feedback Confirmation */}
              {submittedMessage && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Message received for {personal.name}!</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Subject: <span className="text-white font-medium">{submittedMessage.subject}</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Logged at {submittedMessage.time}. You can also email directly at{' '}
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-blue-400 underline font-mono-tabular"
                    >
                      {personal.email}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clean Footer Bottom Bar */}
        <div className="pt-8 sm:pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-white tracking-tight">
              {personal.name} · Medi-Caps University
            </div>
            <p className="text-xs text-zinc-500 font-mono-tabular">
              B.Tech Computer Science & Engineering (2nd Year)
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
            {NAV_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigate(sec.id)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
