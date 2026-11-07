import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Disc3, Sparkles } from 'lucide-react';

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  format: string;
  bpm: number;
}

export const METROFLOW_SAMPLE_TRACKS: AudioTrack[] = [
  {
    id: 'sample-1',
    title: 'Sample Audio Track 01',
    artist: 'MetroFlow Demo Library',
    duration: '03:42',
    format: 'Local Audio File (Demo)',
    bpm: 120,
  },
  {
    id: 'sample-2',
    title: 'Sample Audio Track 02',
    artist: 'MetroFlow Demo Library',
    duration: '04:15',
    format: 'Local Audio File (Demo)',
    bpm: 116,
  },
  {
    id: 'sample-3',
    title: 'Sample Audio Track 03',
    artist: 'MetroFlow Demo Library',
    duration: '02:58',
    format: 'Local Audio File (Demo)',
    bpm: 128,
  },
];

interface InteractiveAudioSpectrumProps {
  compact?: boolean;
  onTrackChange?: (track: AudioTrack) => void;
}

export const InteractiveAudioSpectrum: React.FC<InteractiveAudioSpectrumProps> = ({
  compact = false,
  onTrackChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackProgress, setPlaybackProgress] = useState(38);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentTrack = METROFLOW_SAMPLE_TRACKS[currentTrackIndex];

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % METROFLOW_SAMPLE_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setPlaybackProgress(0);
    onTrackChange?.(METROFLOW_SAMPLE_TRACKS[nextIdx]);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => (prev >= 100 ? 0 : prev + 0.3));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Real-time canvas spectrum visualization simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    let t = 0;
    const barCount = compact ? 24 : 36;
    const barWidth = 3;
    const gap = 3;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.05;

      const totalWidth = barCount * (barWidth + gap);
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        let height: number;
        if (!isPlaying || prefersReducedMotion) {
          height = 4 + Math.sin(i * 0.4) * 2;
        } else {
          // Simulated waveform oscillation for UI preview
          const freq = Math.sin(t * 1.8 + i * 0.32) * Math.cos(t * 0.9 + i * 0.18);
          const beat = Math.sin(t * 3.2) > 0.8 ? 1.3 : 1.0;
          const normalized = Math.abs(freq);
          height = Math.max(3, normalized * (canvas.height * 0.8) * beat);
        }

        const x = startX + i * (barWidth + gap);
        const y = canvas.height - height;

        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, '#60A5FA');
        gradient.addColorStop(0.6, '#2563EB');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0.2)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 1.5);
        ctx.fill();
      }

      if (!prefersReducedMotion && isPlaying) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, compact]);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 space-y-4 backdrop-blur-md">
      {/* Track Info & Status Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 ${
              isPlaying ? 'text-[#60A5FA]' : 'text-zinc-500'
            }`}
          >
            <Disc3
              className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '4s' }}
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              {currentTrack.title}
            </div>
            <div className="text-[11px] text-zinc-400 truncate">
              {currentTrack.artist} ·{' '}
              <span className="font-mono-tabular text-zinc-300">{currentTrack.format}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-tabular bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-2.5 h-2.5" />
            <span>UI Simulation</span>
          </span>
        </div>
      </div>

      {/* Waveform Spectrum Preview Canvas */}
      <div className="relative h-16 w-full flex items-center justify-center bg-black/40 rounded-lg border border-zinc-900 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={compact ? 220 : 340}
          height={56}
          className="w-full h-full object-contain pointer-events-none"
        />
        <div className="absolute left-3 top-2 text-[10px] font-mono-tabular text-zinc-500">
          Visual Waveform Preview
        </div>
        <div className="absolute right-3 top-2 text-[10px] font-mono-tabular text-zinc-400">
          Local Playback Mode
        </div>
      </div>

      {/* Scrub Bar */}
      <div className="space-y-1">
        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-[#60A5FA] rounded-full transition-all duration-300"
            style={{ width: `${playbackProgress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono-tabular text-zinc-400">
          <span>01:24</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
            className="w-8 h-8 rounded-lg bg-[#2563EB] hover:bg-blue-500 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={handleNextTrack}
            aria-label="Next preview track"
            className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            aria-label={isMuted ? 'Waveform mode muted' : 'Mute visualizer'}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/60 border border-zinc-800 cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-mono-tabular">Visual Wave</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span className="text-[11px] font-mono-tabular">Active</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
