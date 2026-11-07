import React, { useState } from 'react';
import { Calendar, Users, ShieldCheck, AlertCircle, CheckCircle2, Building, Sparkles } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  club: string;
  category: 'Technical' | 'Cultural' | 'Design';
  venue: string;
  time: string;
  rsvps: number;
  userRsvp: boolean;
}

export const InteractiveCampusPulsePreview: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'Club President' | 'Faculty Advisor' | 'Student Member'>('Club President');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Technical' | 'Cultural' | 'Design'>('All');
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 'cp-1',
      title: 'Sample Event: Coding Workshop',
      club: 'Coding Society',
      category: 'Technical',
      venue: 'Systems Lab 302',
      time: 'Tomorrow, 4:00 PM',
      rsvps: 42,
      userRsvp: false,
    },
    {
      id: 'cp-2',
      title: 'Sample Event: Hackathon Kickoff',
      club: 'Developer Club',
      category: 'Technical',
      venue: 'Main Auditorium',
      time: 'Nov 14, 9:00 AM',
      rsvps: 88,
      userRsvp: true,
    },
    {
      id: 'cp-3',
      title: 'Sample Event: Acoustic Night',
      club: 'Music Collective',
      category: 'Cultural',
      venue: 'Student Amphitheater',
      time: 'Nov 18, 6:30 PM',
      rsvps: 35,
      userRsvp: false,
    },
    {
      id: 'cp-4',
      title: 'Sample Event: UI Design Session',
      club: 'Design Guild',
      category: 'Design',
      venue: 'Creative Studio B',
      time: 'Nov 20, 3:00 PM',
      rsvps: 26,
      userRsvp: false,
    },
  ]);

  // Conflict Simulator State
  const [testVenue, setTestVenue] = useState('Main Auditorium');
  const [testSlot, setTestSlot] = useState('Nov 14, 9:00 AM');

  const handleToggleRsvp = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === id) {
          const userRsvp = !ev.userRsvp;
          return {
            ...ev,
            userRsvp,
            rsvps: userRsvp ? ev.rsvps + 1 : ev.rsvps - 1,
          };
        }
        return ev;
      })
    );
  };

  const isConflict =
    testVenue === 'Main Auditorium' && testSlot === 'Nov 14, 9:00 AM';

  const filteredEvents =
    activeCategory === 'All'
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-5 backdrop-blur-md">
      {/* Platform Header & RBAC Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <h4 className="text-sm font-semibold text-white">CampusPulse Interface Demo</h4>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Interactive demonstration of event listings and scheduling validation
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] ml-1.5" />
          <span className="text-[11px] text-zinc-400 mr-1">Role:</span>
          {(['Student Member', 'Club President', 'Faculty Advisor'] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                selectedRole === role
                  ? 'bg-[#2563EB] text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {role.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {(['All', 'Technical', 'Cultural', 'Design'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-zinc-800 text-white font-medium border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards Grid */}
      <div className="space-y-2.5">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-3.5 rounded-lg border border-zinc-900 bg-black/40 hover:border-zinc-800 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {ev.club}
                </span>
                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  {ev.time}
                </span>
              </div>
              <div className="text-xs font-semibold text-white truncate">{ev.title}</div>
              <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Building className="w-3 h-3 text-zinc-500" />
                {ev.venue}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <div className="text-right">
                <div className="font-mono-tabular text-xs font-semibold text-white">
                  {ev.rsvps}
                </div>
                <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <Users className="w-2.5 h-2.5" />
                  RSVPs
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleRsvp(ev.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  ev.userRsvp
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-[#2563EB] hover:bg-blue-500 text-white'
                }`}
              >
                {ev.userRsvp ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>RSVP'd (Demo)</span>
                  </>
                ) : (
                  <>
                    <span>RSVP (Demo)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Conflict Validation Demo */}
      <div className="pt-3 border-t border-zinc-900 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-zinc-300 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Venue Conflict Validation Demo
          </span>
          <span className="text-[11px] text-zinc-500 font-mono-tabular">Scheduling Logic</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <select
            value={testVenue}
            onChange={(e) => setTestVenue(e.target.value)}
            className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 focus:outline-none"
          >
            <option value="Main Auditorium">Main Auditorium</option>
            <option value="Systems Lab 302">Systems Lab 302</option>
            <option value="Creative Studio B">Creative Studio B</option>
          </select>

          <select
            value={testSlot}
            onChange={(e) => setTestSlot(e.target.value)}
            className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 focus:outline-none"
          >
            <option value="Nov 14, 9:00 AM">Nov 14, 9:00 AM (Clashing Slot)</option>
            <option value="Nov 15, 2:00 PM">Nov 15, 2:00 PM (Available Slot)</option>
            <option value="Nov 16, 5:00 PM">Nov 16, 5:00 PM (Available Slot)</option>
          </select>
        </div>

        <div
          className={`p-2.5 rounded-lg text-xs flex items-center gap-2 border ${
            isConflict
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}
        >
          {isConflict ? (
            <>
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>
                <strong>Conflict Flagged:</strong> Room is already booked for "Sample Event: Hackathon Kickoff" in Main Auditorium.
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                <strong>Slot Available:</strong> No overlapping event reservation for {testVenue} at this time.
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
