import {
  JourneyCategory,
  JourneyItem,
  ProjectItem,
  SkillCategory,
  SkillItem,
} from '../data/portfolioData';

export function filterSkillsByCategory(
  skills: SkillItem[],
  category: SkillCategory,
  searchQuery: string = ''
): SkillItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return skills.filter((skill) => {
    const matchesCategory = category === 'All' || skill.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      skill.name.toLowerCase().includes(normalizedQuery) ||
      skill.context.toLowerCase().includes(normalizedQuery) ||
      skill.usedIn.some((proj) => proj.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function filterProjects(
  projects: ProjectItem[],
  category: string,
  searchQuery: string = ''
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.shortDescription.toLowerCase().includes(normalizedQuery) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function filterJourneyMilestones(
  milestones: JourneyItem[],
  category: JourneyCategory
): JourneyItem[] {
  if (category === 'All') return milestones;
  return milestones.filter((item) => item.category === category);
}

export interface ContactSubmissionInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactSubmissionInput, string>>;
}

export function validateContactInput(input: ContactSubmissionInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactSubmissionInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!input.subject || input.subject.trim().length < 3) {
    errors.subject = 'Please specify a brief subject.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface PreparedMailtoDraft {
  formattedSubject: string;
  formattedBody: string;
  mailtoUrl: string;
}

export function createMailtoDraft(
  recipientEmail: string,
  input: ContactSubmissionInput
): PreparedMailtoDraft {
  const formattedSubject = `[Portfolio Contact] ${input.subject.trim()}`;
  const formattedBody = `Hi Divyansh,\n\n${input.message.trim()}\n\n---\nSender: ${input.name.trim()}\nReply-To: ${input.email.trim()}\nSent via portfolio contact form`;
  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    formattedSubject
  )}&body=${encodeURIComponent(formattedBody)}`;

  return {
    formattedSubject,
    formattedBody,
    mailtoUrl,
  };
}

