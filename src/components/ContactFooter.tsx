import React, { useState, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  ExternalLink,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  validateContactInput,
  createMailtoDraft,
  ContactSubmissionInput,
  PreparedMailtoDraft,
} from '../utils/portfolioLogic';
import { copyToClipboard } from '../utils/clipboard';
import { SectionId, NAV_SECTIONS } from './Navbar';

interface ContactFooterProps {
  onNavigate: (id: SectionId) => void;
}

interface ActiveDraft extends PreparedMailtoDraft {
  time: string;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onNavigate }) => {
  const { personal } = PORTFOLIO_DATA;
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [draftCopyStatus, setDraftCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');

  const [formState, setFormState] = useState<ContactSubmissionInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactSubmissionInput, string>>>({});
  const [preparedDraft, setPreparedDraft] = useState<ActiveDraft | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyEmail = async () => {
    try {
      const success = await copyToClipboard(personal.email);
      if (success) {
        setCopyStatus('success');
        setScreenReaderAnnouncement(`Email address copied to clipboard: ${personal.email}`);
        setTimeout(() => setCopyStatus('idle'), 2500);
      } else {
        setCopyStatus('error');
        setScreenReaderAnnouncement(`Failed to copy email address. Please copy manually: ${personal.email}`);
        setTimeout(() => setCopyStatus('idle'), 4000);
      }
    } catch {
      setCopyStatus('error');
      setScreenReaderAnnouncement(`Failed to copy email address. Please copy manually: ${personal.email}`);
      setTimeout(() => setCopyStatus('idle'), 4000);
    }
  };

  const handleCopyDraft = async () => {
    if (!preparedDraft) return;
    try {
      const success = await copyToClipboard(preparedDraft.formattedBody);
      if (success) {
        setDraftCopyStatus('success');
        setScreenReaderAnnouncement('Draft message body copied to clipboard.');
        setTimeout(() => setDraftCopyStatus('idle'), 2500);
      } else {
        setDraftCopyStatus('error');
        setScreenReaderAnnouncement('Failed to copy draft message. Please copy manually.');
        setTimeout(() => setDraftCopyStatus('idle'), 4000);
      }
    } catch {
      setDraftCopyStatus('error');
      setScreenReaderAnnouncement('Failed to copy draft message. Please copy manually.');
      setTimeout(() => setDraftCopyStatus('idle'), 4000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactInput(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      const errorCount = Object.keys(validation.errors).length;
      setScreenReaderAnnouncement(
        `The contact form contains ${errorCount} error${errorCount === 1 ? '' : 's'}. Please review the highlighted fields.`
      );

      // Focus first invalid field for keyboard & assistive technology users
      if (validation.errors.name) {
        nameInputRef.current?.focus();
      } else if (validation.errors.email) {
        emailInputRef.current?.focus();
      } else if (validation.errors.subject) {
        subjectInputRef.current?.focus();
      } else if (validation.errors.message) {
        messageInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
    const draftData = createMailtoDraft(personal.email, formState);
    const draft: ActiveDraft = {
      ...draftData,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPreparedDraft(draft);
    setScreenReaderAnnouncement(
      `Email draft prepared for ${personal.name}. Directed to your email client with subject "${draft.formattedSubject}".`
    );

    // Open user's default email client
    try {
      window.location.href = draft.mailtoUrl;
    } catch {
      // Browser navigation fallback handled gracefully in UI
    }
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

              <div className="flex flex-col sm:items-end gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy direct email address to clipboard"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-200 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:text-white hover:bg-white/[0.1] transition-colors whitespace-nowrap cursor-pointer shrink-0"
                >
                  {copyStatus === 'success' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span>Email Copied</span>
                    </>
                  ) : copyStatus === 'error' ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                      <span>Copy Failed</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
                {copyStatus === 'error' && (
                  <span className="text-[11px] text-rose-400 font-mono-tabular" role="alert">
                    Please copy manually: {personal.email}
                  </span>
                )}
              </div>
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
                  Have an internship role, project idea, or question? Compose a note below to open in your email client, or contact directly at{' '}
                  <a href={`mailto:${personal.email}`} className="text-blue-400 hover:underline font-mono-tabular">
                    {personal.email}
                  </a>.
                </p>
              </div>

              {/* Accessible Announcement Region */}
              <div className="sr-only" role="status" aria-live="polite">
                {screenReaderAnnouncement}
              </div>

              <form onSubmit={handleSubmit} noValidate aria-label="Contact Divyansh Nayak" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Name <span className="text-rose-400 font-bold" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      autoComplete="name"
                      value={formState.name}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Alex Chen"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/40 border rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors ${
                        errors.name ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/[0.08] focus:border-[#2563EB]'
                      }`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-[11px] text-rose-400 mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Email <span className="text-rose-400 font-bold" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={emailInputRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      value={formState.email}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@company.com"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/40 border rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/[0.08] focus:border-[#2563EB]'
                      }`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-[11px] text-rose-400 mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Subject <span className="text-rose-400 font-bold" aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={subjectInputRef}
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    aria-required="true"
                    value={formState.subject}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, subject: e.target.value }));
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                    }}
                    placeholder="Internship Opportunity / Project Inquiry"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/40 border rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors ${
                      errors.subject ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/[0.08] focus:border-[#2563EB]'
                    }`}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="text-[11px] text-rose-400 mt-1" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Message <span className="text-rose-400 font-bold" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    ref={messageInputRef}
                    id="contact-message"
                    name="message"
                    required
                    aria-required="true"
                    rows={4}
                    value={formState.message}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Details about the role, team, or project..."
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/40 border rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/[0.08] focus:border-[#2563EB]'
                    }`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-[11px] text-rose-400 mt-1" role="alert">
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
                    <span>Send via Email Client</span>
                  </button>

                  <a
                    href={`mailto:${personal.email}?subject=${encodeURIComponent(
                      formState.subject || 'Portfolio Inquiry'
                    )}&body=${encodeURIComponent(formState.message || '')}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>Direct email link</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </form>

              {/* Truthful Email Draft Status */}
              {preparedDraft && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/25 space-y-3.5 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                    <span>Email Draft Prepared for {personal.name}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Your message has been formatted and handed off to your default email client addressed to{' '}
                    <span className="text-white font-mono-tabular">{personal.email}</span>. Since this website operates without an external mail server, delivery completes when you click Send in your email client.
                  </p>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono-tabular text-zinc-300 space-y-1">
                    <div>
                      <span className="text-zinc-500">Destination:</span> {personal.email}
                    </div>
                    <div>
                      <span className="text-zinc-500">Subject:</span> {preparedDraft.formattedSubject}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href={preparedDraft.mailtoUrl}
                      aria-label="Open pre-formatted message in your email client"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      aria-label="Copy draft message text to clipboard"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-lg transition-colors cursor-pointer"
                    >
                      {draftCopyStatus === 'success' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                          <span>Draft Copied</span>
                        </>
                      ) : draftCopyStatus === 'error' ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                          <span>Copy Failed</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                          <span>Copy Draft Message</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPreparedDraft(null);
                        setFormState({ name: '', email: '', subject: '', message: '' });
                        nameInputRef.current?.focus();
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer ml-auto"
                    >
                      <RotateCcw className="w-3 h-3" aria-hidden="true" />
                      <span>Compose Another Message</span>
                    </button>
                  </div>
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
