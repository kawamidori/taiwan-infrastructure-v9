'use client';
import { useState, useEffect } from 'react';
import DeckGLMap, { LayerVisibility } from '@/components/DeckGLMap';
import TimelineScrubber from '@/components/TimelineScrubber';
import OsintOverlay from '@/components/OsintOverlay';
import AnalyticsOverlay from '@/components/AnalyticsOverlay';
import SimulationOverlay from '@/components/SimulationOverlay';
import ScaleComparisonOverlay from '@/components/ScaleComparisonOverlay';
import { TIMELINE_MILESTONES } from '@/data/store';
import { Map, Activity, Globe, Shield, Scaling, X } from 'lucide-react';

export default function CleanDashboard() {
  const [activePanel, setActivePanel] = useState<'none' | 'scale' | 'osint' | 'analytics' | 'simulation'>('none');
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    highways: true,
    traRail: true,
    thsr: true,
    portsAirports: true,
    infraNodes: true
  });

  const [viewState, setViewState] = useState<any>({
    longitude: 120.75,
    latitude: 23.75,
    zoom: 7.2,
    pitch: 0,
    bearing: 0
  });

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSelectedYear(prev => {
        const idx = TIMELINE_MILESTONES.findIndex(m => m.year === prev);
        const nextIdx = (idx + 1) % TIMELINE_MILESTONES.length;
        const nextMilestone = TIMELINE_MILESTONES[nextIdx];
        setViewState((vs: any) => ({
          ...vs,
          longitude: nextMilestone.coords[0],
          latitude: nextMilestone.coords[1],
          zoom: 9.5,
          transitionDuration: 1200
        }));
        return nextMilestone.year;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    const milestone = TIMELINE_MILESTONES.find(m => m.year === year);
    if (milestone) {
      setViewState((vs: any) => ({
        ...vs,
        longitude: milestone.coords[0],
        latitude: milestone.coords[1],
        zoom: 9.5,
        transitionDuration: 1200
      }));
    }
  };

  const handleOsintClick = (ev: any) => {
    setIsPlaying(false);
    setActiveEvent(ev);
    if (ev.year) setSelectedYear(ev.year);
    setViewState({
      longitude: ev.coords[0],
      latitude: ev.coords[1],
      zoom: 10,
      pitch: 0,
      bearing: 0,
      transitionDuration: 1000
    });
  };

  const resetCamera = () => {
    setIsPlaying(false);
    setActivePanel('none');
    setActiveEvent(null);
    setViewState({
      longitude: 120.75,
      latitude: 23.75,
      zoom: 7.2,
      pitch: 0,
      bearing: 0,
      transitionDuration: 1000
    });
  };

  const toggleLayer = (key: keyof LayerVisibility) => {
    setLayerVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative w-screen h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      {/* Base GIS Map (Carto Light Vector Basemap + Official NLSC/THSR GeoJSON + Point Nodes) */}
      <DeckGLMap
        activeEvent={activeEvent}
        viewState={viewState}
        setViewState={setViewState}
        selectedYear={selectedYear}
        layerVisibility={layerVisibility}
      />

      {/* Top Header, Layer Filter Pills & White-Red Alert Banner */}
      <header className="absolute top-4 left-6 right-6 z-10 pointer-events-none flex justify-between items-start gap-4">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200 px-4 py-2.5 rounded-lg shadow-sm">
            <h1 className="text-base font-bold text-slate-800">台灣基礎設施點位與尺度圖資</h1>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              V9 // NLSC OFFICIAL HIGHWAYS · TRA · THSR 12 STATIONS · PORTS
            </p>
          </div>

          {/* Minimal Layer Verification Toggles */}
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-1.5 rounded-lg shadow-sm flex flex-wrap items-center gap-1 text-[11px]">
            <button
              onClick={() => toggleLayer('highways')}
              className={`px-2 py-1 rounded border transition-colors ${
                layerVisibility.highways
                  ? 'bg-slate-700 text-white border-slate-700 font-bold'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              國道/快速公路
            </button>
            <button
              onClick={() => toggleLayer('traRail')}
              className={`px-2 py-1 rounded border transition-colors ${
                layerVisibility.traRail
                  ? 'bg-slate-500 text-white border-slate-500 font-bold'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              臺鐵路網
            </button>
            <button
              onClick={() => toggleLayer('thsr')}
              className={`px-2 py-1 rounded border transition-colors ${
                layerVisibility.thsr
                  ? 'bg-slate-800 text-white border-slate-800 font-bold'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              高鐵 12 站
            </button>
            <button
              onClick={() => toggleLayer('portsAirports')}
              className={`px-2 py-1 rounded border transition-colors ${
                layerVisibility.portsAirports
                  ? 'bg-teal-700 text-white border-teal-700 font-bold'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              商港/機場
            </button>
            <button
              onClick={() => toggleLayer('infraNodes')}
              className={`px-2 py-1 rounded border transition-colors ${
                layerVisibility.infraNodes
                  ? 'bg-amber-700 text-white border-amber-700 font-bold'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              水電/海纜
            </button>
          </div>
        </div>

        {activeEvent && (
          <div className="pointer-events-auto bg-white border-2 border-red-600 px-4 py-2.5 rounded-lg shadow-md max-w-md">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono font-bold text-red-600 uppercase">
                EVENT LOCKED · {activeEvent.date}
              </span>
              <button
                onClick={() => setActiveEvent(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">{activeEvent.title}</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{activeEvent.desc}</div>
          </div>
        )}
      </header>

      {/* Overlays */}
      {activePanel === 'scale' && <ScaleComparisonOverlay onClose={() => setActivePanel('none')} />}
      {activePanel === 'osint' && (
        <OsintOverlay
          onClose={() => setActivePanel('none')}
          onEventClick={handleOsintClick}
          activeEventId={activeEvent?.id}
          selectedYear={selectedYear}
        />
      )}
      {activePanel === 'analytics' && <AnalyticsOverlay onClose={() => setActivePanel('none')} />}
      {activePanel === 'simulation' && <SimulationOverlay onClose={() => setActivePanel('none')} selectedYear={selectedYear} />}

      {/* Bottom Timeline & Mode Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center gap-3">
        <TimelineScrubber
          selectedYear={selectedYear}
          onSelectYear={handleSelectYear}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />

        <div className="bg-white border border-slate-200 p-1.5 rounded-lg flex items-center gap-1 shadow-sm">
          <button
            onClick={resetCamera}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-colors ${
              activePanel === 'none' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Map size={14} /> GIS 圖資
          </button>

          <div className="w-px h-5 bg-slate-200 mx-1" />

          <button
            onClick={() => setActivePanel(activePanel === 'scale' ? 'none' : 'scale')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-colors ${
              activePanel === 'scale' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Scaling size={14} /> 空間尺度對照
          </button>

          <button
            onClick={() => setActivePanel(activePanel === 'analytics' ? 'none' : 'analytics')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-colors ${
              activePanel === 'analytics' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Activity size={14} /> 實證象限
          </button>

          <button
            onClick={() => setActivePanel(activePanel === 'osint' ? 'none' : 'osint')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-colors ${
              activePanel === 'osint' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Globe size={14} /> 輿情清單
          </button>

          <button
            onClick={() => setActivePanel(activePanel === 'simulation' ? 'none' : 'simulation')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-colors ${
              activePanel === 'simulation' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield size={14} /> 韌性推演
          </button>
        </div>
      </div>
    </div>
  );
}
