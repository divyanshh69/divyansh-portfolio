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
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { validateContactInput, ContactSubmissionInput } from '../utils/portfolioLogic';
import { SectionId, NAV_SECTIONS } from './Navbar';
import { CardTilt } from './CardTilt';

interface ContactFooterProps {
  onNavigate: (id: SectionId) => void;
}

interface SentMessageRecord extends ContactSubmissionInput {
  id: string;
  timestamp: string;
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
  const [sentMessages, setSentMessages] = useState<SentMessageRecord[]>([]);

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
    const newRecord: SentMessageRecord = {
      ...formState,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSentMessages((prev) => [newRecord, ...prev]);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-14 sm:pt-20 pb-12 sm:pb-16 bg-[#050505]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-14 sm:space-y-20">
        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Channels & Social Links */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="font-mono-tabular text-[#2563EB]">08.</span>
                <span>Contact & Connect</span>
                <span aria-hidden="true">·</span>
                <span>Open for Engineering Opportunities & Collaborations</span>
              </div>
              <h2
                id="contact-heading"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight [text-wrap:balance]"
              >
                Let’s build something meaningful together.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                Whether you want to discuss software engineering roles, collaborate on a project like MetroFlow or CampusPulse, or talk systems and UI craft—my inbox is always open.
              </p>
            </div>

            {/* Direct Email & Quick Copy Card */}
            <div className="p-4.5 sm:p-6 rounded-2xl border border-zinc-800/90 bg-[#0A0A0C] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1 min-w-0">
                <div className="text-xs text-zinc-400">Direct Email</div>
                <a
                  href={`mailto:${personal.email}`}
                  className="font-mono-tabular text-sm sm:text-base font-semibold text-white hover:text-[#60A5FA] transition-colors break-all sm:break-normal"
                >
                  {personal.email}
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-100 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer w-full sm:w-auto"
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

            {/* Social Links with Subtle Animated Hover */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <CardTilt maxTilt={4} className="rounded-2xl">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 sm:p-5 rounded-2xl border border-zinc-800/80 bg-[#0A0A0C] hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 h-full shadow-md"
                >
                  <div className="flex items-center justify-between text-zinc-400 group-hover:text-white transition-colors">
                    <Github className="w-5 h-5" aria-hidden="true" />
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">GitHub</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Code & Repositories</div>
                  </div>
                </a>
              </CardTilt>

              <CardTilt maxTilt={4} className="rounded-2xl">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 sm:p-5 rounded-2xl border border-zinc-800/80 bg-[#0A0A0C] hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 h-full shadow-md"
                >
                  <div className="flex items-center justify-between text-zinc-400 group-hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">LinkedIn</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Professional Network</div>
                  </div>
                </a>
              </CardTilt>

              <CardTilt maxTilt={4} className="rounded-2xl">
                <a
                  href={`mailto:${personal.email}`}
                  className="group p-4 sm:p-5 rounded-2xl border border-zinc-800/80 bg-[#0A0A0C] hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 h-full shadow-md"
                >
                  <div className="flex items-center justify-between text-zinc-400 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Email</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Direct Dispatch</div>
                  </div>
                </a>
              </CardTilt>
            </div>
          </div>

          {/* Right Column: Interactive Message Note Dispatch */}
          <div className="lg:col-span-6">
            <div className="p-4.5 sm:p-8 rounded-2xl border border-zinc-800/90 bg-[#0A0A0C] space-y-5 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Send a Direct Note</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Leave a message right here to start a conversation.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-zinc-300 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="e.g. Rohan Sharma"
                      className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#2563EB]"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-zinc-300 mb-1.5"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#2563EB]"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-zinc-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    placeholder="Internship Opportunity / Project Collaboration"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#2563EB]"
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 mt-1" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-zinc-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Tell me about what you are building or how we can work together..."
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#2563EB] resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Send Message to Divyansh</span>
                </button>
              </form>

              {/* Dispatched Messages Confirmation List */}
              {sentMessages.length > 0 && (
                <div className="pt-4 border-t border-zinc-900 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span>
                      Message logged for {personal.name} ({sentMessages.length} sent in session)
                    </span>
                  </div>
                  {sentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 sm:p-3.5 rounded-xl bg-zinc-950 border border-zinc-900 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-zinc-300 font-semibold">
                        <span>{msg.subject}</span>
                        <span className="font-mono-tabular text-zinc-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-zinc-400">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clean Closing Footer Bar */}
        <div className="pt-8 sm:pt-10 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-white">{personal.name}</div>
            <p className="text-xs text-zinc-400">
              Built with care, clear architecture, and intentional motion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
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
          </div>
        </div>
      </div>
    </footer>
  );
};
