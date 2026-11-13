'use client';
import React, { useEffect, useState } from 'react';
import { OSINT_EVENTS } from '@/data/store';
import { X } from 'lucide-react';

export default function OsintOverlay({ onClose, onEventClick, activeEventId, selectedYear }: any) {
  const [events, setEvents] = useState<any[]>(OSINT_EVENTS);

  useEffect(() => {
    fetch('/api/osint')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setEvents(res.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="absolute top-20 right-6 w-[360px] max-w-[92vw] max-h-[70vh] bg-white border border-slate-100 rounded-xl shadow-md p-4 flex flex-col z-20 text-slate-800">
      <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2.5">
        <div>
          <h2 className="text-sm font-bold text-slate-800">CNA 歷史與即時輿情清單</h2>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">載入所有時間軸事件（共 {events.length} 則）</div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {events
          .slice()
          .reverse()
          .map(ev => {
            const isActive = activeEventId === ev.id;
            const isCurrentYear = ev.year === selectedYear;
            return (
              <div
                key={ev.id}
                onClick={() => onEventClick(ev)}
                className={`p-3 mb-2 border rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? 'border-red-400 bg-red-50/70'
                    : isCurrentYear
                    ? 'border-slate-300 bg-slate-50'
                    : 'border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mb-1">
                  <span>{ev.date}</span>
                  {isCurrentYear && <span className="text-slate-700 font-bold">當前時間軸年份</span>}
                </div>
                <div className="font-bold text-xs text-slate-800 mb-1">{ev.title}</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">{ev.desc}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
