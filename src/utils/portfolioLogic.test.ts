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
