'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function SimulationOverlay({ onClose, selectedYear }: any) {
  const [geoFriction, setGeoFriction] = useState(75);
  const [gridLoad, setGridLoad] = useState(82);
  const yearFactor = selectedYear >= 2028 ? -6 : selectedYear <= 2021 ? 5 : 0;
  const resilienceScore = Math.max(15, Math.min(98, Math.round(100 - (geoFriction * 0.4 + gridLoad * 0.45) + yearFactor)));

  return (
    <div className="absolute top-20 left-6 w-[340px] max-w-[92vw] bg-white border border-slate-200 rounded-xl shadow-md p-5 flex flex-col z-20 text-slate-800">
      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
        <h2 className="text-sm font-bold">都市與電網韌性推演器 ({selectedYear})</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>地緣管制摩擦度</span>
            <span className="font-bold">{geoFriction}%</span>
          </div>
          <input type="range" min="10" max="100" value={geoFriction} onChange={e => setGeoFriction(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>尖峰電網負載率</span>
            <span className="font-bold">{gridLoad}%</span>
          </div>
          <input type="range" min="40" max="100" value={gridLoad} onChange={e => setGridLoad(Number(e.target.value))} className="w-full" />
        </div>
        <div className="p-3 bg-slate-50 rounded border border-slate-200 text-center">
          <div className="text-[10px] text-slate-500">系統韌性指數</div>
          <div className="text-2xl font-bold text-slate-800">{resilienceScore} / 100</div>
        </div>
      </div>
    </div>
  );
}
