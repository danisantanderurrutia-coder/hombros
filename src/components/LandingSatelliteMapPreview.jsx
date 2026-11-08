import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Satellite, Sparkles, ArrowRight, Activity, MapPin } from 'lucide-react';

const PREVIEW_TERRITORIES = [
  { id: 'chanco', name: 'Chanco (Maule)', coords: [-35.7333, -72.5333], regime: 'Elástico (Seguro)', color: '#34d399' },
  { id: 'aconcagua', name: 'Aconcagua', coords: [-32.8333, -70.6000], regime: 'Fluencia Crítica', color: '#fbbf24' },
  { id: 'quintero', name: 'Quintero-Puchuncaví', coords: [-32.7833, -71.5167], regime: 'Fractura Plástica', color: '#f43f5e' },
  { id: 'bilbao', name: 'Bilbao (Euskadi)', coords: [43.2630, -2.9350], regime: 'Transición Circular', color: '#38bdf8' },
  { id: 'copenhague', name: 'Copenhague', coords: [55.6761, 12.5683], regime: 'Scope 3 Parasitario', color: '#fb923c' },
  { id: 'berlin', name: 'Berlín', coords: [52.5200, 13.4050], regime: 'Post-Industrial', color: '#818cf8' },
];

export default function LandingSatelliteMapPreview({ onNavigate }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center map showing both Latin America (Chile) and Europe
    const map = L.map(mapContainerRef.current, {
      center: [16, -38],
      zoom: 2.1,
      minZoom: 1.8,
      maxZoom: 6,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      worldCopyJump: true
    });

    mapInstanceRef.current = map;

    // Photographic Satellite Tile Layer (Esri World Imagery)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 17,
      attribution: 'Esri Satellite'
    }).addTo(map);

    // Add Glowing Bioluminescent Markers
    PREVIEW_TERRITORIES.forEach(t => {
      const markerHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; cursor: pointer;">
          <div style="position: absolute; inset: -6px; border-radius: 9999px; background-color: ${t.color}; opacity: 0.45; filter: blur(3px); animation: pulse 2s infinite;"></div>
          <div style="width: 14px; height: 14px; border-radius: 9999px; background-color: rgba(15, 23, 42, 0.9); border: 2px solid ${t.color}; box-shadow: 0 0 10px ${t.color}; display: flex; align-items: center; justify-content: center;">
            <div style="width: 5px; height: 5px; border-radius: 9999px; background-color: ${t.color};"></div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(t.coords, { icon: customIcon }).addTo(map);
      marker.bindTooltip(`<strong>${t.name}</strong><br/><span style="font-size: 10px; color: ${t.color};">${t.regime}</span>`, {
        direction: 'top',
        className: 'font-mono'
      });
      marker.on('click', () => onNavigate('world_map'));
    });

    // Draw Metabolic Arc (Chile -> Europe)
    const arcPoints = [
      [-35.7333, -72.5333],
      [-5, -45],
      [43.2630, -2.9350]
    ];
    L.polyline(arcPoints, {
      color: '#34d399',
      weight: 2,
      dashArray: '4, 8',
      opacity: 0.85
    }).addTo(map);

    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          // ignore
        }
        mapInstanceRef.current = null;
      }
    };
  }, [onNavigate]);

  return (
    <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border border-[#D4C9B8]/80 bg-slate-950 shadow-inner group">
      {/* Real Interactive Leaflet Satellite Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0 cursor-pointer" onClick={() => onNavigate('world_map')} />

      {/* Floating Action Banner Above */}
      <div 
        onClick={() => onNavigate('world_map')}
        className="absolute top-3 inset-x-3 sm:inset-x-6 z-20 cursor-pointer"
      >
        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-[#487075] text-white shadow-xl flex items-center justify-between hover:bg-slate-900 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-emerald-300">¡Aprieta aquí para probar el mapa satelital!</span>
          </div>
          <span className="text-[11px] font-mono text-slate-300 hidden sm:flex items-center gap-1">
            <span>25 Cuencas Calibradas</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </span>
        </div>
      </div>

      {/* Bottom Satellite Overlay Pill */}
      <div 
        onClick={() => onNavigate('world_map')}
        className="absolute bottom-3 inset-x-3 sm:inset-x-4 z-20 flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono cursor-pointer hover:border-emerald-400 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Satellite className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-slate-300">Sentinel & Esri HD Orbital · Cobertura Transoceánica</span>
        </div>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <span>Abrir Atlas</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
