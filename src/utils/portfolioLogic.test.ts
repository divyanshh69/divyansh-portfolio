import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  filterSkillsByCategory,
  filterProjects,
  filterJourneyMilestones,
  validateContactInput,
  createMailtoDraft,
} from './portfolioLogic';
import { copyToClipboard } from './clipboard';

test('filterSkillsByCategory returns all skills when category is All', () => {
  const all = filterSkillsByCategory(PORTFOLIO_DATA.skills, 'All');
  assert.equal(all.length, PORTFOLIO_DATA.skills.length);
});

test('filterSkillsByCategory filters accurately by category and search query', () => {
  const programming = filterSkillsByCategory(PORTFOLIO_DATA.skills, 'Programming');
  assert.ok(programming.length > 0);
  assert.ok(programming.every((s) => s.category === 'Programming'));

  const swiftOnly = filterSkillsByCategory(PORTFOLIO_DATA.skills, 'Programming', 'Swift');
  assert.equal(swiftOnly.length, 1);
  assert.equal(swiftOnly[0].id, 'swift');
});

test('filterProjects includes MetroFlow, SkillSync, and CampusPulse and filters by category', () => {
  const allProjects = filterProjects(PORTFOLIO_DATA.projects, 'All');
  assert.ok(allProjects.some((p) => p.title === 'MetroFlow'));
  assert.ok(allProjects.some((p) => p.title === 'SkillSync'));
  assert.ok(allProjects.some((p) => p.title === 'CampusPulse'));

  const macosOnly = filterProjects(PORTFOLIO_DATA.projects, 'macOS / Native');
  assert.equal(macosOnly.length, 1);
  assert.equal(macosOnly[0].id, 'metroflow');

  const webOnly = filterProjects(PORTFOLIO_DATA.projects, 'Full-Stack Web');
  assert.equal(webOnly.length, 2);
  assert.ok(webOnly.some((p) => p.id === 'skillsync'));
  assert.ok(webOnly.some((p) => p.id === 'campuspulse'));
});

test('filterJourneyMilestones filters timeline entries by category', () => {
  const projects = filterJourneyMilestones(PORTFOLIO_DATA.journey, 'Projects');
  assert.equal(projects.length, 3);
  assert.ok(projects.every((j) => j.category === 'Projects'));
});

test('validateContactInput enforces required fields and email format', () => {
  const invalid = validateContactInput({
    name: 'D',
    email: 'invalid-email',
    subject: 'Hi',
    message: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactInput({
    name: 'Arjun Mehta',
    email: 'arjun@university.edu',
    subject: 'Collaboration on MetroFlow and SkillSync',
    message: 'Hi Divyansh, loved exploring the architecture of MetroFlow, SkillSync, and CampusPulse!',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('projects have properly structured screenshots for desktop showcase', () => {
  for (const project of PORTFOLIO_DATA.projects) {
    assert.ok(project.screenshots, `${project.title} should have screenshots defined`);
    assert.ok(project.screenshots.length >= 1, `${project.title} should have at least 1 screenshot`);
    for (const screenshot of project.screenshots) {
      assert.ok(screenshot.title, 'Screenshot must have a title');
      assert.ok(screenshot.image, 'Screenshot must have an image');
      assert.ok(screenshot.caption, 'Screenshot must have a caption');
    }
  }

  // Verify MetroFlow screenshots order and titles
  const metroflow = PORTFOLIO_DATA.projects.find((p) => p.id === 'metroflow');
  assert.ok(metroflow?.screenshots);
  assert.equal(metroflow.screenshots[0].title, 'Home / Music Discovery');
  assert.equal(metroflow.screenshots[1].title, 'Synchronized Lyrics');
  assert.equal(metroflow.screenshots[2].title, 'Settings / About');

  // Verify SkillSync screenshots order and titles
  const skillsync = PORTFOLIO_DATA.projects.find((p) => p.id === 'skillsync');
  assert.ok(skillsync?.screenshots);
  assert.equal(skillsync.screenshots[0].title, 'Dashboard');
  assert.equal(skillsync.screenshots[1].title, 'Career Roadmap');
  assert.equal(skillsync.screenshots[2].title, 'My Projects');

  // Verify CampusPulse screenshots order and titles
  const campuspulse = PORTFOLIO_DATA.projects.find((p) => p.id === 'campuspulse');
  assert.ok(campuspulse?.screenshots);
  assert.equal(campuspulse.screenshots[0].title, 'Dashboard');
  assert.equal(campuspulse.screenshots[1].title, 'Member Management');
  assert.equal(campuspulse.screenshots[2].title, 'Platform Settings');
});

test('external URLs match the verified personal and project links', () => {
  assert.equal(
    PORTFOLIO_DATA.personal.linkedin,
    'https://www.linkedin.com/in/divyansh-nayak-703390370/'
  );
  assert.equal(PORTFOLIO_DATA.personal.github, 'https://github.com/divyanshh69');
  assert.equal(PORTFOLIO_DATA.personal.email, 'divyanshnayak713@gmail.com');

  const metroflow = PORTFOLIO_DATA.projects.find((p) => p.id === 'metroflow');
  assert.equal(metroflow?.githubUrl, 'https://github.com/divyanshh69/MetroFlow-MAC');

  const skillsync = PORTFOLIO_DATA.projects.find((p) => p.id === 'skillsync');
  assert.equal(skillsync?.githubUrl, 'https://github.com/divyanshh69/SkillSync');

  const campuspulse = PORTFOLIO_DATA.projects.find((p) => p.id === 'campuspulse');
  assert.equal(campuspulse?.githubUrl, 'https://github.com/divyanshh69/CampusPulse');
});

test('journey milestones reflect accurate academic timeline and experience', () => {
  const edu = PORTFOLIO_DATA.journey.find((j) => j.category === 'Education');
  assert.ok(edu);
  assert.equal(edu.period, 'Aug 2025 — Present');
  assert.equal(edu.organization, 'Medi-Caps University');

  const hackathon = PORTFOLIO_DATA.journey.find((j) => j.category === 'Hackathons');
  assert.ok(hackathon);
  assert.equal(hackathon.period, '2026');

  // Verify no journey entry starts with 2023 or 2024
  for (const item of PORTFOLIO_DATA.journey) {
    assert.ok(!item.period.includes('2023'), `Item ${item.id} should not reference 2023`);
    assert.ok(!item.period.includes('2024'), `Item ${item.id} should not reference 2024`);
  }
});

test('projects have structured challenges and learnings for development reflection', () => {
  for (const project of PORTFOLIO_DATA.projects) {
    assert.ok(project.challengesAndLearnings, `${project.title} should have challengesAndLearnings`);
    assert.ok(project.challengesAndLearnings.length >= 3, `${project.title} should have at least 3 challenges and learnings`);
    for (const item of project.challengesAndLearnings) {
      assert.ok(item.title, 'Each challenge entry must have a title');
      assert.ok(item.challenge, 'Each challenge entry must have a challenge description');
      assert.ok(item.solution, 'Each challenge entry must have a solution description');
      assert.ok(item.learning, 'Each challenge entry must have a learning description');
    }
  }
});

test('projects have technicalDecisions and specifications configured as single source of truth', () => {
  for (const project of PORTFOLIO_DATA.projects) {
    assert.ok(project.specifications && project.specifications.length >= 4, `${project.title} must have specifications`);
    assert.ok(project.technicalDecisions && project.technicalDecisions.length >= 3, `${project.title} must have technicalDecisions`);
    for (const spec of project.specifications) {
      assert.ok(spec.label);
      assert.ok(spec.value);
      assert.ok(spec.detail);
    }
    for (const dec of project.technicalDecisions) {
      assert.ok(dec.title);
      assert.ok(dec.decision);
      assert.ok(dec.rationale);
    }
  }
});

test('MetroFlow technical claims accurately represent Electron, React, libmpv and Python bridge', () => {
  const metroflow = PORTFOLIO_DATA.projects.find((p) => p.id === 'metroflow');
  assert.ok(metroflow);
  assert.ok(metroflow.technologies.includes('Electron'), 'MetroFlow must include Electron');
  assert.ok(metroflow.technologies.includes('React'), 'MetroFlow must include React');
  assert.ok(metroflow.technologies.includes('libmpv CoreAudio'), 'MetroFlow must include libmpv CoreAudio');
  assert.ok(metroflow.technologies.includes('Python Bridge'), 'MetroFlow must include Python Bridge');
  assert.ok(metroflow.fullOverview.includes('Electron'));
  assert.ok(metroflow.fullOverview.includes('React'));
  assert.ok(metroflow.fullOverview.includes('libmpv'));
  assert.ok(metroflow.fullOverview.includes('8765'));

  // Ensure Electron skill exists in Tools & Technologies
  const electronSkill = PORTFOLIO_DATA.skills.find((s) => s.id === 'electron');
  assert.ok(electronSkill);
  assert.equal(electronSkill.category, 'Tools & Technologies');
  assert.ok(electronSkill.usedIn.includes('MetroFlow'));

  // Ensure Swift skill is exploratory and does not misclaim MetroFlow
  const swiftSkill = PORTFOLIO_DATA.skills.find((s) => s.id === 'swift');
  assert.ok(swiftSkill);
  assert.ok(!swiftSkill.usedIn.includes('MetroFlow'));
});

test('SkillSync technical claims accurately represent React, TypeScript, Node.js, Express, PostgreSQL 16, and Prisma ORM', () => {
  const skillsync = PORTFOLIO_DATA.projects.find((p) => p.id === 'skillsync');
  assert.ok(skillsync);
  assert.ok(skillsync.technologies.includes('Prisma ORM'), 'SkillSync must include Prisma ORM');
  assert.ok(skillsync.technologies.includes('PostgreSQL'), 'SkillSync must include PostgreSQL');
  assert.ok(skillsync.technologies.includes('React'), 'SkillSync must include React');
  assert.ok(skillsync.technologies.includes('Node.js'), 'SkillSync must include Node.js');
  assert.ok(skillsync.fullOverview.includes('Prisma ORM'));
  assert.ok(skillsync.fullOverview.includes('PostgreSQL 16'));

  const prismaSkill = PORTFOLIO_DATA.skills.find((s) => s.id === 'prisma');
  assert.ok(prismaSkill);
  assert.equal(prismaSkill.category, 'Tools & Technologies');
  assert.ok(prismaSkill.usedIn.includes('SkillSync'));

  // Ensure readiness formula is accurately documented
  const readinessSpec = skillsync.specifications?.find((s) => s.label === 'Readiness Formula');
  assert.ok(readinessSpec, 'SkillSync must specify Readiness Formula');
  assert.ok(readinessSpec.detail.includes('1.5x'));
  assert.ok(readinessSpec.detail.includes('0.8x'));
  assert.ok(readinessSpec.detail.includes('0.3x'));

  // Verify that Prisma is not misclaimed to eliminate all SQL injection
  for (const dec of skillsync.technicalDecisions || []) {
    assert.ok(!dec.rationale.includes('without SQL injection risks'));
  }
});

test('createMailtoDraft generates structured mailto url with formatted subject and body', () => {
  const draft = createMailtoDraft('divyanshnayak713@gmail.com', {
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    subject: 'Summer Internship Opportunity',
    message: 'We would love to discuss a software engineering internship role with you.',
  });

  assert.equal(draft.formattedSubject, '[Portfolio Contact] Summer Internship Opportunity');
  assert.ok(draft.formattedBody.includes('Sarah Connor'));
  assert.ok(draft.formattedBody.includes('sarah@example.com'));
  assert.ok(draft.formattedBody.includes('We would love to discuss a software engineering internship role with you.'));
  assert.ok(draft.mailtoUrl.startsWith('mailto:divyanshnayak713@gmail.com?'));
  assert.ok(draft.mailtoUrl.includes('subject=%5BPortfolio%20Contact%5D%20Summer%20Internship%20Opportunity'));

  // Ensure no fake delivery messages are claimed in the draft
  assert.ok(!draft.formattedBody.includes('Message received'));
  assert.ok(!draft.formattedBody.includes('Message sent successfully'));
});

test('copyToClipboard safely returns false in non-browser environment without throwing', async () => {
  const result = await copyToClipboard('test text');
  assert.equal(result, false, 'Should return false when clipboard/window is unavailable');
});

test('validateContactInput rejects whitespace-only and malformed input', () => {
  const whitespace = validateContactInput({
    name: '   ',
    email: '   ',
    subject: '   ',
    message: '   ',
  });
  assert.equal(whitespace.valid, false);
  assert.equal(Object.keys(whitespace.errors).length, 4);

  const missingAtInEmail = validateContactInput({
    name: 'Jane Doe',
    email: 'janedoe.com',
    subject: 'Collaboration',
    message: 'Hello Divyansh, great portfolio projects!',
  });
  assert.equal(missingAtInEmail.valid, false);
  assert.ok(missingAtInEmail.errors.email);
  assert.equal(missingAtInEmail.errors.name, undefined);
  assert.equal(missingAtInEmail.errors.subject, undefined);
  assert.equal(missingAtInEmail.errors.message, undefined);
});

test('skills do not contain phantom or invented project references', () => {
  const phantomProjects = [
    'Portfolio Space',
    'MetroFlow Bridge',
    'Interactive Web Tools',
    'Algorithmic Benchmarks',
    'Automation Scripts',
    'Data Parsers',
    'Systems Lab Explorations',
    'CampusPulse v2 Architecture',
  ];

  for (const skill of PORTFOLIO_DATA.skills) {
    for (const phantom of phantomProjects) {
      assert.ok(
        !skill.usedIn.includes(phantom),
        `Skill "${skill.name}" should not reference phantom project "${phantom}"`
      );
    }
  }

  // Ensure MongoDB is not claimed
  assert.ok(
    !PORTFOLIO_DATA.skills.some((s) => s.name.includes('MongoDB')),
    'Skills should not claim MongoDB'
  );

  // Ensure Next.js is not claimed
  assert.ok(
    !PORTFOLIO_DATA.skills.some((s) => s.name.includes('Next.js')),
    'Skills should not claim Next.js'
  );

  // Ensure CampusPulse uses PostgreSQL
  const campuspulse = PORTFOLIO_DATA.projects.find((p) => p.id === 'campuspulse');
  assert.ok(campuspulse?.technologies.includes('PostgreSQL'));
  assert.ok(!campuspulse?.technologies.includes('MongoDB'));
});

test('journey and milestones have distinct entries and truthful descriptions', () => {
  // Ensure future goals are distinctly marked
  const futureGoals = PORTFOLIO_DATA.journey.filter((j) => j.category === 'Future Goals');
  assert.equal(futureGoals.length, 1);
  assert.equal(futureGoals[0].id, 'j-goal-future');
  assert.ok(!futureGoals[0].period.includes('Present'));

  // Ensure achievements do not repeat duplicate awards
  assert.equal(PORTFOLIO_DATA.achievements.length, 4);
  const titles = PORTFOLIO_DATA.achievements.map((a) => a.title);
  assert.equal(new Set(titles).size, titles.length, 'Achievement titles should all be distinct');
});

test('all flagship projects have verified architecture layers, specs, decisions, and learnings', () => {
  const metroflow = PORTFOLIO_DATA.projects.find((p) => p.id === 'metroflow');
  const skillsync = PORTFOLIO_DATA.projects.find((p) => p.id === 'skillsync');
  const campuspulse = PORTFOLIO_DATA.projects.find((p) => p.id === 'campuspulse');

  assert.ok(metroflow);
  assert.ok(skillsync);
  assert.ok(campuspulse);

  for (const project of [metroflow, skillsync, campuspulse]) {
    assert.ok(project.architecture && project.architecture.length >= 3, `${project.title} must have at least 3 architecture layers`);
    assert.ok(project.specifications && project.specifications.length >= 6, `${project.title} must have at least 6 specifications`);
    assert.ok(project.technicalDecisions && project.technicalDecisions.length >= 3, `${project.title} must have at least 3 technical decisions`);
    assert.ok(project.challengesAndLearnings && project.challengesAndLearnings.length >= 3, `${project.title} must have at least 3 challenges and learnings`);

    for (const layer of project.architecture) {
      assert.ok(layer.layer.length > 0);
      assert.ok(layer.component.length > 0);
      assert.ok(layer.responsibility.length > 0);
    }
  }
});
