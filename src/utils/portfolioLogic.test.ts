import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  filterSkillsByCategory,
  filterProjects,
  filterJourneyMilestones,
  validateContactInput,
} from './portfolioLogic';

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

test('filterProjects includes MetroFlow and CampusPulse and filters by category', () => {
  const allProjects = filterProjects(PORTFOLIO_DATA.projects, 'All');
  assert.ok(allProjects.some((p) => p.title === 'MetroFlow'));
  assert.ok(allProjects.some((p) => p.title === 'CampusPulse'));

  const macosOnly = filterProjects(PORTFOLIO_DATA.projects, 'macOS / Native');
  assert.equal(macosOnly.length, 1);
  assert.equal(macosOnly[0].id, 'metroflow');
});

test('filterJourneyMilestones filters timeline entries by category', () => {
  const projects = filterJourneyMilestones(PORTFOLIO_DATA.journey, 'Projects');
  assert.equal(projects.length, 2);
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
    subject: 'Collaboration on MetroFlow',
    message: 'Hi Divyansh, loved exploring the architecture of MetroFlow and CampusPulse!',
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
