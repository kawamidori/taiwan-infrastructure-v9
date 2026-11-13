'use client';
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { CORRELATION_DATA } from '@/data/store';
import { X } from 'lucide-react';

export default function AnalyticsOverlay({ onClose }: any) {
  const [xAxis, setXAxis] = useState('supplier_density');
  const [yAxis, setYAxis] = useState('expansion_flexibility');

  return (
    <div className="absolute top-20 left-6 w-[480px] max-w-[92vw] bg-white border border-slate-200 rounded-xl shadow-md p-5 flex flex-col z-20 text-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold">實證供應鏈象限圖</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
      </div>
      <div className="flex gap-3 mb-4">
        <select value={xAxis} onChange={e => setXAxis(e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 p-1.5 rounded text-xs outline-none">
          <option value="supplier_density">供應鏈鄰近密度 (1-5)</option>
        </select>
        <select value={yAxis} onChange={e => setYAxis(e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 p-1.5 rounded text-xs outline-none">
          <option value="expansion_flexibility">土地擴張彈性 (1-5)</option>
          <option value="resource_limitation">水電資源限制指數 (0-100)</option>
        </select>
      </div>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" dataKey={xAxis} stroke="#64748b" tick={{ fontSize: 10 }} />
            <YAxis type="number" dataKey={yAxis} stroke="#64748b" tick={{ fontSize: 10 }} />
            <ZAxis type="category" dataKey="id" name="園區" />
            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '4px' }} />
            <Scatter data={CORRELATION_DATA} fill="#334155" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
