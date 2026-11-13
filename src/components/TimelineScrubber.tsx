'use client';
import React from 'react';
import { TIMELINE_MILESTONES, TimelineMilestone } from '@/data/store';
import { History, Play, Pause } from 'lucide-react';

export default function TimelineScrubber({
  selectedYear,
  onSelectYear,
  isPlaying,
  setIsPlaying
}: {
  selectedYear: number;
  onSelectYear: (year: number) => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const currentIndex = Math.max(
    0,
    TIMELINE_MILESTONES.findIndex(m => m.year === selectedYear)
  );
  const activeMilestone: TimelineMilestone = TIMELINE_MILESTONES[currentIndex] || TIMELINE_MILESTONES[4];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    const target = TIMELINE_MILESTONES[idx];
    if (target) {
      onSelectYear(target.year);
    }
  };

  return (
    <div className="w-[780px] max-w-[94vw] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
          </button>
          <History size={14} className="text-slate-500" />
          <span className="text-xs font-mono font-bold text-slate-800">{activeMilestone.label}</span>
          <span className="text-xs font-bold text-slate-700 truncate max-w-[360px]">{activeMilestone.headline}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
          <span>尖峰負載: {activeMilestone.semiPowerMW.toLocaleString()} MW</span>
        </div>
      </div>

      <div className="relative flex items-center mt-2">
        <input
          type="range"
          min={0}
          max={TIMELINE_MILESTONES.length - 1}
          step={1}
          value={currentIndex}
          onChange={handleSliderChange}
          className="w-full timeline-slider"
        />
      </div>

      <div className="flex justify-between mt-1 px-0.5">
        {TIMELINE_MILESTONES.map((m, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={m.year}
              onClick={() => onSelectYear(m.year)}
              className={`text-[10px] font-mono transition-colors ${
                isSelected ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {m.year}
            </button>
          );
        })}
      </div>
    </div>
  );
}
