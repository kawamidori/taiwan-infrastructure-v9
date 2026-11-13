'use client';
import React, { useState } from 'react';
import { SCALE_COMPARISONS } from '@/data/store';
import { Scaling, X } from 'lucide-react';

export default function ScaleComparisonOverlay({ onClose }: { onClose: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState(SCALE_COMPARISONS[0].id);

  const categoryData = SCALE_COMPARISONS.find(c => c.id === selectedCategory) || SCALE_COMPARISONS[0];
  const items = categoryData.items;
  const maxSqM = Math.max(...items.map(i => i.sizeSqM));

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px] p-4 pointer-events-auto">
      {/* Enlarged 1080 x 1920 architectural proportion panel (responsive to viewport height) */}
      <div className="w-[1080px] max-w-[96vw] h-[1920px] max-h-[88vh] bg-white border border-slate-300 rounded-xl shadow-2xl flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Scaling size={18} className="text-slate-600" />
              The Scale Comparison（空間尺度幾何對照）
            </h2>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              CANVAS SPEC: 1080 × 1920 // REFERENCE: TAIWAN AS A MACRO-CITY (TSMC FAB 18)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 3-Column Body: Left Menu | Center Geometric Comparison | Right Specification */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column: Category Menu */}
          <div className="w-[240px] shrink-0 border-r border-slate-200 bg-slate-50/70 p-3 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2.5 py-1">
              尺度維度選單
            </div>
            {SCALE_COMPARISONS.map((cat, idx) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left px-3 py-2.5 rounded-lg border transition-all ${
                    active
                      ? 'bg-white border-slate-300 text-slate-900 font-bold shadow-sm'
                      : 'border-transparent text-slate-600 hover:bg-white/60 hover:text-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400">0{idx + 1}</div>
                  <div className="text-sm mt-0.5">{cat.category}</div>
                </button>
              );
            })}
          </div>

          {/* Center Column: Geometric Grid (#cbd5e1) & Translucent Gradient Grey Circles (#64748b, opacity 15%) */}
          <div className="flex-1 border-r border-slate-200 p-6 flex flex-col bg-white relative overflow-hidden">
            <div className="text-xs font-mono text-slate-500 mb-3 flex justify-between items-center shrink-0">
              <span>{categoryData.subtitle}</span>
              <span className="text-[11px] text-slate-400">面積等比例幾何投影</span>
            </div>

            <div className="flex-1 w-full border border-[#cbd5e1] rounded-lg relative overflow-hidden flex items-center justify-center bg-white">
              {/* Simple #cbd5e1 geometric grid + crosshair axes */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  opacity: 0.45
                }}
              />
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#cbd5e1] pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-[#cbd5e1] pointer-events-none" />

              {/* Concentric Area Circles (#64748b, opacity 15%) */}
              {items
                .slice()
                .sort((a, b) => b.sizeSqM - a.sizeSqM)
                .map((item, idx) => {
                  const maxRadius = 210;
                  const radius = Math.max(24, Math.sqrt(item.sizeSqM / maxSqM) * maxRadius);
                  const isSmaller = idx > 0;

                  return (
                    <div
                      key={item.id}
                      className="absolute rounded-full border border-[#cbd5e1] flex items-center justify-center transition-all duration-500"
                      style={{
                        width: `${radius * 2}px`,
                        height: `${radius * 2}px`,
                        background:
                          'radial-gradient(circle, rgba(100,116,139,0.18) 0%, rgba(100,116,139,0.12) 70%, rgba(100,116,139,0.05) 100%)',
                        zIndex: idx + 1
                      }}
                    >
                      <span
                        className={`text-[11px] font-bold text-slate-700 bg-white/90 border border-slate-200 px-2 py-0.5 rounded shadow-sm whitespace-nowrap ${
                          isSmaller ? 'translate-y-0' : '-translate-y-[85%]'
                        }`}
                      >
                        {item.name.split(' (')[0]} · {item.sizeSqM.toLocaleString()} m²
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Right Column: Selected Item Descriptions */}
          <div className="w-[310px] shrink-0 p-5 bg-slate-50/40 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              所選項目尺寸與空間說明
            </div>

            {items.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500/30 border border-slate-400 inline-block" />
                  <span className="text-[10px] font-mono text-slate-400">ITEM 0{idx + 1}</span>
                </div>
                <div className="text-sm font-bold text-slate-800 leading-snug">{item.name}</div>
                <div className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded mt-2">
                  {item.unitLabel}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-2.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
