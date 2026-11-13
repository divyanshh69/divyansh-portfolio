import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
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
import { easeEditorial } from '../utils/motionVariants';
import { KineticHeading } from './KineticHeading';
import { Magnetic } from './Magnetic';

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
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReduced(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

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

    try {
      window.location.href = draft.mailtoUrl;
    } catch {
      // Fallback handled in UI
    }
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 bg-[#07080C] border-t border-white/[0.08] relative overflow-hidden"
    >
      {/* Background Architectural Grid & Subtle Telemetry Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 arch-grid-pattern opacity-20 [mask-image:radial-gradient(ellipse_at_bottom,white_10%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-6 lg:right-10 hidden md:flex items-center gap-3 text-[10px] font-mono-tabular text-[#7C7872] opacity-70 select-none"
      >
        <span>SYS // 22°43&apos;N 75°52&apos;E [INDORE, IN]</span>
        <span>&bull;</span>
        <span>UTC+05:30</span>
        <span>&bull;</span>
        <span className="text-[#10B981] flex items-center gap-1.5 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block animate-pulse" />
          AVAILABLE 2026
        </span>
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Links & Intro */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <KineticHeading
                id="contact-heading"
                tag="[ 05 // INITIATE CONTACT ]"
                firstLine="Let’s Build Something"
                secondLine="Exceptional Together."
              />

              <motion.p
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: 0.2, ease: easeEditorial }}
                className="text-sm sm:text-base text-[#9B968F] leading-relaxed max-w-lg font-sans"
              >
                I am actively seeking software engineering internship opportunities for 2026. Whether you have an open role, feedback on my desktop audio or web builds, or a technical inquiry, I welcome your message.
              </motion.p>
            </div>

            {/* Direct Email Card */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.25, ease: easeEditorial }}
              className="p-6 rounded-2xl arch-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="text-xs text-[#7C7872] font-mono-tabular uppercase tracking-wider">Direct Email Address</div>
                <a
                  href={`mailto:${personal.email}`}
                  className="font-mono-tabular text-sm sm:text-base font-bold text-[#F4EFEA] hover:text-[#FF4D26] transition-colors break-all"
                >
                  {personal.email}
                </a>
              </div>

              <div className="flex flex-col sm:items-end gap-1.5">
                <Magnetic strength={0.25} radius={50}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy direct email address to clipboard"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono-tabular font-semibold text-[#090A0E] bg-[#F4EFEA] hover:bg-white rounded-xl transition-all cursor-pointer shrink-0 min-h-[44px]"
                  >
                    {copyStatus === 'success' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                        <span>COPIED</span>
                      </>
                    ) : copyStatus === 'error' ? (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-[#FF4D26]" aria-hidden="true" />
                        <span>COPY FAILED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#7C7872]" aria-hidden="true" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </motion.div>

            {/* Social Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                {
                  href: personal.github,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  icon: Github,
                  title: 'GitHub',
                  subtitle: '@divyanshh69',
                },
                {
                  href: personal.linkedin,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  icon: Linkedin,
                  title: 'LinkedIn',
                  subtitle: 'Divyansh Nayak',
                },
                {
                  href: `mailto:${personal.email}`,
                  icon: Mail,
                  title: 'Mail Client',
                  subtitle: 'Direct Message',
                },
              ].map((card, idx) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target={card.target}
                  rel={card.rel}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.3 + idx * 0.08, ease: easeEditorial }}
                  className="group p-5 rounded-2xl arch-surface hover:border-[#FF4D26]/40 transition-all flex flex-col justify-between space-y-4 min-h-[100px]"
                >
                  <div className="flex items-center justify-between text-[#A8A39D] group-hover:text-[#F4EFEA] transition-colors">
                    <card.icon className="w-5 h-5" aria-hidden="true" />
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#7C7872]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#F4EFEA]">{card.title}</div>
                    <div className="text-xs text-[#7C7872] font-mono-tabular mt-0.5">{card.subtitle}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form with Dependable Validation */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.88, delay: 0.28, ease: easeEditorial }}
            className="lg:col-span-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl arch-surface space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F4EFEA]">Send a Direct Message</h3>
                <p className="text-xs text-[#9B968F] mt-1">
                  Compose a note below to open in your default email application, or reach out directly at{' '}
                  <a href={`mailto:${personal.email}`} className="text-[#FF4D26] hover:underline font-mono-tabular">
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
                    <label htmlFor="contact-name" className="block text-xs font-mono-tabular font-medium text-[#A8A39D] mb-1.5">
                      YOUR NAME <span className="text-[#FF4D26] font-bold" aria-hidden="true">*</span>
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
                      className={`w-full px-4 py-2.5 min-h-[44px] text-xs sm:text-sm bg-black/50 border rounded-xl text-[#F4EFEA] placeholder:text-[#7C7872] focus:outline-none transition-colors ${
                        errors.name ? 'border-rose-500/70 focus:border-rose-400' : 'border-white/[0.08] focus:border-[#FF4D26]'
                      }`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-[11px] text-rose-400 mt-1 font-mono-tabular" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono-tabular font-medium text-[#A8A39D] mb-1.5">
                      YOUR EMAIL <span className="text-[#FF4D26] font-bold" aria-hidden="true">*</span>
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
                      className={`w-full px-4 py-2.5 min-h-[44px] text-xs sm:text-sm bg-black/50 border rounded-xl text-[#F4EFEA] placeholder:text-[#7C7872] focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500/70 focus:border-rose-400' : 'border-white/[0.08] focus:border-[#FF4D26]'
                      }`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-[11px] text-rose-400 mt-1 font-mono-tabular" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono-tabular font-medium text-[#A8A39D] mb-1.5">
                    SUBJECT <span className="text-[#FF4D26] font-bold" aria-hidden="true">*</span>
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
                    placeholder="2026 SWE Internship Opportunity / Project Collaboration"
                    className={`w-full px-4 py-2.5 min-h-[44px] text-xs sm:text-sm bg-black/50 border rounded-xl text-[#F4EFEA] placeholder:text-[#7C7872] focus:outline-none transition-colors ${
                      errors.subject ? 'border-rose-500/70 focus:border-rose-400' : 'border-white/[0.08] focus:border-[#FF4D26]'
                    }`}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="text-[11px] text-rose-400 mt-1 font-mono-tabular" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono-tabular font-medium text-[#A8A39D] mb-1.5">
                    MESSAGE <span className="text-[#FF4D26] font-bold" aria-hidden="true">*</span>
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
                    placeholder="Role details, timeline, or project inquiry..."
                    className={`w-full px-4 py-2.5 min-h-[44px] text-xs sm:text-sm bg-black/50 border rounded-xl text-[#F4EFEA] placeholder:text-[#7C7872] focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-rose-500/70 focus:border-rose-400' : 'border-white/[0.08] focus:border-[#FF4D26]'
                    }`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-[11px] text-rose-400 mt-1 font-mono-tabular" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <Magnetic strength={0.25} radius={50}>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-[#090A0E] bg-[#F4EFEA] hover:bg-white rounded-xl transition-all cursor-pointer min-h-[46px]"
                    >
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>PREPARE EMAIL DRAFT</span>
                    </button>
                  </Magnetic>

                  <a
                    href={`mailto:${personal.email}?subject=${encodeURIComponent(
                      formState.subject || 'Portfolio Inquiry'
                    )}&body=${encodeURIComponent(formState.message || '')}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-mono-tabular text-[#A8A39D] hover:text-[#F4EFEA] transition-colors min-h-[44px]"
                  >
                    <span>Direct Mail Link</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </form>

              {/* Truthful Email Draft Status Box */}
              {preparedDraft && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-5 rounded-xl bg-[#FF4D26]/10 border border-[#FF4D26]/25 space-y-3.5"
                >
                  <div className="flex items-center gap-2 text-xs text-[#FF4D26] font-semibold font-mono-tabular">
                    <Mail className="w-4 h-4 text-[#FF4D26] shrink-0" aria-hidden="true" />
                    <span>EMAIL DRAFT READY FOR {personal.name.toUpperCase()}</span>
                  </div>

                  <p className="text-xs text-[#D8D4CE] leading-relaxed">
                    Your message has been formatted into your email client addressed to{' '}
                    <span className="text-white font-mono-tabular font-bold">{personal.email}</span>. Since this website runs statically without an unauthenticated backend mail server, delivery completes when you click Send in your email client.
                  </p>

                  <div className="p-3 rounded-lg bg-black/50 border border-white/[0.06] text-xs font-mono-tabular text-[#D8D4CE] space-y-1">
                    <div>
                      <span className="text-[#7C7872]">Destination:</span> {personal.email}
                    </div>
                    <div>
                      <span className="text-[#7C7872]">Subject:</span> {preparedDraft.formattedSubject}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-1">
                    <a
                      href={preparedDraft.mailtoUrl}
                      aria-label="Open pre-formatted message in your email client"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#090A0E] bg-[#F4EFEA] rounded-lg hover:bg-white transition-colors cursor-pointer min-h-[44px]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>OPEN IN MAIL CLIENT</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      aria-label="Copy draft message text to clipboard"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-mono-tabular text-[#F4EFEA] bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-lg transition-colors cursor-pointer min-h-[44px]"
                    >
                      {draftCopyStatus === 'success' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                          <span>COPIED</span>
                        </>
                      ) : draftCopyStatus === 'error' ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                          <span>FAILED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#A8A39D]" aria-hidden="true" />
                          <span>COPY BODY</span>
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
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-mono-tabular text-[#A8A39D] hover:text-[#F4EFEA] transition-colors cursor-pointer sm:ml-auto min-h-[44px]"
                    >
                      <RotateCcw className="w-3 h-3" aria-hidden="true" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Clean Architectural Footer Bottom Bar */}
        <div className="pt-8 sm:pt-10 border-t border-[#262A36] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tabular">
          <div className="space-y-1">
            <div className="text-sm font-bold text-[#F4EFEA] tracking-tight">
              {personal.name}
            </div>
            <p className="text-xs text-[#7C7872]">
              MEDI-CAPS UNIVERSITY · B.TECH CSE (2ND YEAR) · INDORE, INDIA
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#A8A39D]">
            {NAV_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigate(sec.id)}
                className="hover:text-[#FF4D26] transition-colors cursor-pointer py-2 px-2 uppercase tracking-wider min-h-[44px] flex items-center"
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
