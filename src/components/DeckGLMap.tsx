'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Map from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, GeoJsonLayer, PathLayer } from '@deck.gl/layers';
import 'maplibre-gl/dist/maplibre-gl.css';
import { GIS_DATA } from '@/data/store';

export interface LayerVisibility {
  highways: boolean;
  traRail: boolean;
  thsr: boolean;
  portsAirports: boolean;
  infraNodes: boolean;
}

export default function DeckGLMap({
  activeEvent,
  viewState,
  setViewState,
  selectedYear,
  layerVisibility
}: {
  activeEvent: any;
  viewState: any;
  setViewState: any;
  selectedYear: number;
  layerVisibility: LayerVisibility;
}) {
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [thsrStations, setThsrStations] = useState<any>(null);
  const [officialPorts, setOfficialPorts] = useState<any>(null);
  const [offshoreAirports, setOffshoreAirports] = useState<any>(null);

  useEffect(() => {
    fetch('/data/official-thsr-stations.geojson')
      .then(r => r.json())
      .then(setThsrStations)
      .catch(() => {});

    fetch('/data/official-ports.geojson')
      .then(r => r.json())
      .then(data => {
        // Filter to commercial ports (9960401) and industrial ports (9960403) so fishing ports do not clutter the macro view
        const filtered = {
          ...data,
          features: (data.features || []).filter(
            (ft: any) =>
              ft.properties?.category === 'commercial_port' ||
              ft.properties?.category === 'industrial_port'
          )
        };
        setOfficialPorts(filtered);
      })
      .catch(() => {});

    fetch('/data/official-airports-offshore.geojson')
      .then(r => r.json())
      .then(setOffshoreAirports)
      .catch(() => {});
  }, []);

  // Derive vertex-snapped THSR station sequence line directly from the 12 official station coordinates
  const thsrSequencePath = useMemo(() => {
    if (!thsrStations?.features) return [];
    const sorted = [...thsrStations.features].sort((a: any, b: any) =>
      String(a.properties?.['編號'] || '').localeCompare(String(b.properties?.['編號'] || ''))
    );
    return [
      {
        name: '台灣高鐵 12 站序列走廊 (南港－左營)',
        path: sorted.map((ft: any) => ft.geometry.coordinates)
      }
    ];
  }, [thsrStations]);

  // Filter point nodes by selectedYear
  const visibleHubs = GIS_DATA.hubs.filter(h => h.activeFrom <= selectedYear);
  const visiblePower = GIS_DATA.powerPlants.filter(p => p.activeFrom <= selectedYear);
  const visibleWater = GIS_DATA.waterNodes.filter(w => w.activeFrom <= selectedYear);
  const visibleDigital = GIS_DATA.digitalNodes.filter(d => d.activeFrom <= selectedYear);
  const mainlandAirports = GIS_DATA.portsAndAirports.filter(
    p => p.kind === 'Airport' && p.activeFrom <= selectedYear
  );

  const layers: any[] = [
    // 1. Metropolitan Population Clusters (#64748b, opacity 15% = alpha 38)
    new ScatterplotLayer({
      id: 'cities-layer',
      data: GIS_DATA.cities,
      getPosition: (d: any) => d.coords,
      getRadius: (d: any) => Math.sqrt(d.pop) * 3.2,
      getFillColor: [100, 116, 139, 38],
      getLineColor: [203, 213, 225, 140],
      lineWidthMinPixels: 1,
      stroked: true,
      pickable: false
    }),

    // 2. Official NLSC Highways & Expressways (/data/official-highways.geojson)
    layerVisibility.highways &&
      new GeoJsonLayer({
        id: 'official-highways-layer',
        data: '/data/official-highways.geojson',
        pickable: true,
        stroked: true,
        filled: false,
        lineWidthUnits: 'pixels',
        lineCapRounded: true,
        lineJoinRounded: true,
        getLineColor: (f: any) =>
          f.properties?.category === 'freeway'
            ? [71, 85, 105, 205]   // #475569 國道主線
            : [100, 116, 139, 180], // #64748b 快速公路 (台61等)
        getLineWidth: (f: any) => (f.properties?.category === 'freeway' ? 2 : 1.4),
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? {
                  name: info.object.properties?.name || info.object.properties?.road_num || '國省道',
                  sub: `${info.object.properties?.county || ''} · 國土測繪中心官方路網`,
                  x: info.x,
                  y: info.y
                }
              : null
          )
      }),

    // 3. Official NLSC TRA Railway Network (/data/official-rail.geojson)
    layerVisibility.traRail &&
      new GeoJsonLayer({
        id: 'official-rail-layer',
        data: '/data/official-rail.geojson',
        pickable: true,
        stroked: true,
        filled: false,
        lineWidthUnits: 'pixels',
        lineCapRounded: true,
        lineJoinRounded: true,
        getLineColor: [148, 163, 184, 210], // #94a3b8 臺鐵官方軌道
        getLineWidth: 1.5,
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? {
                  name: info.object.properties?.name || '臺鐵路線',
                  sub: info.object.properties?.bridge_tunnel
                    ? `構造物：${info.object.properties.bridge_tunnel}`
                    : '國土測繪中心官方鐵路圖資',
                  x: info.x,
                  y: info.y
                }
              : null
          )
      }),

    // 4. THSR Station-to-Station Line + 12 Official Station Points (/data/official-thsr-stations.geojson)
    layerVisibility.thsr &&
      thsrSequencePath.length > 0 &&
      new PathLayer({
        id: 'thsr-corridor-line',
        data: thsrSequencePath,
        getPath: (d: any) => d.path,
        getColor: [51, 65, 85, 210], // #334155 深石板灰
        getWidth: 2,
        widthUnits: 'pixels',
        pickable: false
      }),

    layerVisibility.thsr &&
      thsrStations &&
      new GeoJsonLayer({
        id: 'official-thsr-stations-layer',
        data: thsrStations,
        pickable: true,
        stroked: true,
        filled: true,
        pointRadiusUnits: 'pixels',
        getPointRadius: 5.5,
        getFillColor: [255, 255, 255, 255],
        getLineColor: [30, 41, 59, 255], // #1e293b 深黑框
        lineWidthMinPixels: 2,
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? {
                  name: `高鐵${info.object.properties?.['站名']} (${info.object.properties?.['編號']})`,
                  sub: info.object.properties?.['地址'] || '',
                  x: info.x,
                  y: info.y
                }
              : null
          )
      }),

    // 5. Official Commercial & Industrial Ports (/data/official-ports.geojson)
    layerVisibility.portsAirports &&
      officialPorts &&
      new GeoJsonLayer({
        id: 'official-ports-layer',
        data: officialPorts,
        pickable: true,
        stroked: true,
        filled: true,
        pointRadiusUnits: 'meters',
        getPointRadius: 3000,
        getFillColor: (f: any) =>
          f.properties?.category === 'industrial_port'
            ? [13, 148, 136, 235] // 工業專用港 (觀塘/麥寮/和平)
            : [15, 118, 110, 235], // #0f766e 國際與國內商港
        getLineColor: [255, 255, 255, 255],
        lineWidthMinPixels: 1.5,
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? {
                  name: info.object.properties?.name,
                  sub: `${
                    info.object.properties?.category === 'industrial_port' ? '工業專用港' : '官方商港'
                  } ${info.object.properties?.address ? '· ' + info.object.properties.address : ''}`,
                  x: info.x,
                  y: info.y
                }
              : null
          )
      }),

    // 6. Airports: Mainland Gateways + Official Offshore Airports (/data/official-airports-offshore.geojson)
    layerVisibility.portsAirports &&
      new ScatterplotLayer({
        id: 'mainland-airports-layer',
        data: mainlandAirports,
        getPosition: (d: any) => d.coords,
        getRadius: 3400,
        getFillColor: [29, 78, 216, 240], // #1d4ed8 深藍
        getLineColor: [255, 255, 255, 255],
        lineWidthMinPixels: 1.5,
        stroked: true,
        pickable: true,
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? { name: info.object.name, sub: `${info.object.township} · 國際航空門戶`, x: info.x, y: info.y }
              : null
          )
      }),

    layerVisibility.portsAirports &&
      offshoreAirports &&
      new GeoJsonLayer({
        id: 'offshore-airports-layer',
        data: offshoreAirports,
        pickable: true,
        stroked: true,
        filled: true,
        pointRadiusUnits: 'meters',
        getPointRadius: 2800,
        getFillColor: [59, 130, 246, 220],
        getLineColor: [255, 255, 255, 255],
        lineWidthMinPixels: 1.5,
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? {
                  name: info.object.properties?.name,
                  sub: info.object.properties?.address || '離島航空站',
                  x: info.x,
                  y: info.y
                }
              : null
          )
      }),

    // 7. Power System Nodes ONLY (White fill + Deep Amber #b45309 stroke)
    layerVisibility.infraNodes &&
      new ScatterplotLayer({
        id: 'power-nodes-layer',
        data: visiblePower,
        getPosition: (d: any) => d.coords,
        getRadius: 2800,
        getFillColor: [255, 255, 255, 255],
        getLineColor: [180, 83, 9, 255],
        lineWidthMinPixels: 2,
        stroked: true,
        pickable: true,
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? { name: info.object.name, sub: `${info.object.township} · ${info.object.capacity}`, x: info.x, y: info.y }
              : null
          )
      }),

    // 8. Water System Nodes ONLY (White fill + Deep Blue #2563eb stroke)
    layerVisibility.infraNodes &&
      new ScatterplotLayer({
        id: 'water-nodes-layer',
        data: visibleWater,
        getPosition: (d: any) => d.coords,
        getRadius: 2600,
        getFillColor: [255, 255, 255, 255],
        getLineColor: [37, 99, 235, 255],
        lineWidthMinPixels: 2,
        stroked: true,
        pickable: true,
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? { name: info.object.name, sub: `${info.object.township} · 水資源${info.object.role}`, x: info.x, y: info.y }
              : null
          )
      }),

    // 9. Digital & Subsea Landing Nodes ONLY (White fill + Deep Purple #6d28d9 stroke)
    layerVisibility.infraNodes &&
      new ScatterplotLayer({
        id: 'digital-nodes-layer',
        data: visibleDigital,
        getPosition: (d: any) => d.coords,
        getRadius: 2600,
        getFillColor: [255, 255, 255, 255],
        getLineColor: [109, 40, 217, 255],
        lineWidthMinPixels: 2,
        stroked: true,
        pickable: true,
        onHover: (info: any) =>
          setHoverInfo(
            info.object
              ? { name: info.object.name, sub: `${info.object.township} · 數位${info.object.role}`, x: info.x, y: info.y }
              : null
          )
      }),

    // 10. Semiconductor Core Load Terminals (Fab Sinks - Pure Black #0f172a, Crimson #dc2626 on alert)
    new ScatterplotLayer({
      id: 'hubs-layer',
      data: visibleHubs,
      getPosition: (d: any) => d.coords,
      getRadius: 4200,
      getFillColor: (d: any) => (activeEvent?.node === d.id ? [220, 38, 38, 255] : [15, 23, 42, 255]),
      getLineColor: [255, 255, 255, 255],
      lineWidthMinPixels: 2,
      stroked: true,
      pickable: true,
      onHover: (info: any) =>
        setHoverInfo(
          info.object
            ? { name: info.object.name, sub: `${info.object.township} · ${info.object.type}`, x: info.x, y: info.y }
            : null
        ),
      updateTriggers: {
        getFillColor: [activeEvent?.node]
      }
    })
  ].filter(Boolean);

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-slate-50">
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e: any) => setViewState(e.viewState)}
        controller={true}
        layers={layers}
      >
        <Map
          reuseMaps
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        />
      </DeckGL>

      {hoverInfo && (
        <div
          style={{ left: hoverInfo.x + 12, top: hoverInfo.y + 12 }}
          className="pointer-events-none fixed z-40 bg-white/95 backdrop-blur-sm border border-slate-200 px-3 py-2 rounded-lg shadow-md text-xs text-slate-800 max-w-xs"
        >
          <div className="font-bold">{hoverInfo.name}</div>
          {hoverInfo.sub && <div className="text-[11px] text-slate-500 mt-0.5">{hoverInfo.sub}</div>}
        </div>
      )}
    </div>
  );
}
