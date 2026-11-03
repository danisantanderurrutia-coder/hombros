import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import { 
  Globe, MapPin, Wind, Zap, Factory, Ship, ArrowUpRight, 
  ExternalLink, Info, Activity, ShieldAlert, CheckCircle2, 
  Layers, Database, Compass, RefreshCw, ZoomIn, ZoomOut, Maximize2,
  FileText, BarChart3, Users, Droplets, Leaf, Scale, Calendar, Terminal, Cpu, Hexagon,
  Copy, Check, GitCompare
} from 'lucide-react';
import { calculateHombrosFullState, calculateScopeEmissionsMetrics } from '../models/santanderModel';
import ScopeEmissionsBreakdown from './ScopeEmissionsBreakdown';
import HoneycombNetwork from './HoneycombNetwork';
import DeepDiveCasesView from './DeepDiveCasesView';
import { useTheme } from '../context/ThemeContext';

// Trade / Metabolic Geodesic Flow Arcs (from Global South extraction to Global North consumption hubs)
const METABOLIC_TRADE_ARCS = [
  // Quintero / Aconcagua (Chile) -> Amsterdam / Rotterdam (Hub de Cobre y Combustibles)
  { 
    from: [-32.7833, -71.5167], 
    to: [52.3676, 4.9041], 
    label: 'Cobre Refinado & Combustibles (Scope 3 Downstream)', 
    color: '#00f2fe',
    weight: 2.5
  },
  // Chanco (Chile) -> Bilbao / Europa (Pulpa de Celulosa & Madera)
  { 
    from: [-35.7333, -72.5333], 
    to: [43.2630, -2.9350], 
    label: 'Celulosa y Biomasa Forestal', 
    color: '#34d399',
    weight: 2.5
  },
  // Aconcagua (Chile) -> Copenhague (Paltas y Fruta de Contra-estación / Agua Virtual)
  { 
    from: [-32.8333, -70.6000], 
    to: [55.6761, 12.5683], 
    label: 'Agua Virtual & Fruta Agroexportada', 
    color: '#38bdf8',
    weight: 2
  },
  // Barcelona <-> Berlín (Flujo Europeo de Servicios y Tecnología Baja en Carbono)
  { 
    from: [41.3879, 2.1699], 
    to: [52.5200, 13.4050], 
    label: 'Intercambio Tecnológico & Donut Circular', 
    color: '#818cf8',
    weight: 2
  }
];

// Basemap Tile Providers (Satellite, Relief, and Bio-Digital Dark)
const TILE_LAYERS = {
  satellite: {
    id: 'satellite',
    name: '🛰️ Satélite HD Fotográfico',
    tag: 'Orbital Esri World Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics'
  },
  dark: {
    id: 'dark',
    name: '🌌 Bio-Digital Nocturno',
    tag: 'Carto Dark Matter (Bio-Luminiscente)',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CartoDB &copy; OpenStreetMap'
  },
  relief: {
    id: 'relief',
    name: '🏔️ Relieve & Cuencas',
    tag: 'Sombreado Topográfico de Elevación',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; USGS, NOAA'
  }
};

export default function WorldTerritoriesMap({ 
  territories, 
  selectedTerritoryId, 
  setSelectedTerritoryId,
  globalModifiers,
  onNavigateToCases,
  initialSubTab = 'map'
}) {
  const { palette, isFcinq } = useTheme();
  const [activeTileKey, setActiveTileKey] = useState('satellite');
  const [filterRegion, setFilterRegion] = useState('all'); // 'all', 'chile', 'europe'
  const [showMetabolicFlows, setShowMetabolicFlows] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab || 'map'); // 'map', 'cases', 'emissions', 'panal'

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Dossier Active Sub-tab
  const [dossierTab, setDossierTab] = useState('diagnosis'); // 'diagnosis', 'raw_data', 'surveys', 'emissions', 'history', 'compare'
  const [comparisonTerritoryId, setComparisonTerritoryId] = useState('copenhagen');
  const [copiedRawData, setCopiedRawData] = useState(false);

  const handleCopyRawData = () => {
    const rawPayload = {
      territory: activeTerritory.name,
      country: activeTerritory.country,
      population: activeTerritory.population,
      coordinates: activeTerritory.coordinates,
      biophysicalResources: activeTerritory.resources,
      normalizedVariables: activeTerritory.variables,
      pressureLoads: activeTerritory.pressureVars,
      emissions: activeTerritory.emissions,
      complementaryMetrics: activeTerritory.complementaryMetrics,
      surveys: activeTerritory.surveys,
      openDataSources: activeTerritory.openDataSources
    };
    navigator.clipboard.writeText(JSON.stringify(rawPayload, null, 2));
    setCopiedRawData(true);
    setTimeout(() => setCopiedRawData(false), 2500);
  };

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const flowsLayerRef = useRef(null);

  const activeTerritory = useMemo(() => {
    return territories.find(t => t.id === selectedTerritoryId) || territories[0];
  }, [territories, selectedTerritoryId]);

  const comparisonTerritory = useMemo(() => {
    return territories.find(t => t.id === comparisonTerritoryId) || territories[1] || territories[0];
  }, [territories, comparisonTerritoryId]);

  const activeState = useMemo(() => {
    return calculateHombrosFullState(activeTerritory);
  }, [activeTerritory]);

  const comparisonState = useMemo(() => {
    return calculateHombrosFullState(comparisonTerritory);
  }, [comparisonTerritory]);

  const activeEmissions = useMemo(() => {
    return calculateScopeEmissionsMetrics(activeTerritory);
  }, [activeTerritory]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create Flat World Map (Mercator flat projection, planar, not a 3D sphere)
      const map = L.map(mapContainerRef.current, {
        center: [22, -15],
        zoom: 2.2,
        minZoom: 1.8,
        maxZoom: 15,
        worldCopyJump: true,
        zoomControl: false,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      // Base Tile Layer
      const baseLayer = L.tileLayer(TILE_LAYERS[activeTileKey].url, {
        maxZoom: 18,
        subdomains: 'abcd',
        noWrap: false
      }).addTo(map);
      tileLayerRef.current = baseLayer;

      // Layers for Markers and Flow Arcs
      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;

      const flowsGroup = L.layerGroup().addTo(map);
      flowsLayerRef.current = flowsGroup;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Basemap Tiles when activeTileKey changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const newLayer = L.tileLayer(TILE_LAYERS[activeTileKey].url, {
      maxZoom: 18,
      subdomains: 'abcd',
      noWrap: false
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [activeTileKey]);

  // Update Markers when territories or selection changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    const displayTerritories = territories.filter(t => {
      if (filterRegion === 'chile') return t.country === 'Chile';
      if (filterRegion === 'europe') return t.country !== 'Chile';
      return true;
    });

    displayTerritories.forEach(t => {
      const isSelected = t.id === selectedTerritoryId;
      const tState = calculateHombrosFullState(t);
      const isCritical = tState.hasCriticalShoulder || tState.sigma > 1.2;
      const isSafe = tState.sigma < 0.75;

      const safeColor = isFcinq ? '#D83F87' : '#DA7B93';
      const warningColor = isFcinq ? '#8D69A6' : '#376E6F';
      const haloColor = isCritical ? '#f43f5e' : isSafe ? safeColor : warningColor;
      const pulseAnimation = isCritical ? 'animate-ping' : isSelected ? 'animate-pulse' : '';

      // High-Tech Bio-Luminescent Marker
      const iconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <!-- Outer Pulsing Glow Ring -->
          <div class="absolute -inset-3 rounded-full ${pulseAnimation}" style="background-color: ${haloColor}; opacity: ${isSelected ? 0.6 : 0.3}; filter: blur(2px);"></div>
          
          <!-- Mid Cybernetic Selection Border Ring -->
          <div class="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-125 shadow-2xl border-2" 
               style="background-color: rgba(20, 10, 30, 0.9); border-color: ${haloColor}; box-shadow: 0 0 14px ${haloColor};">
            <!-- Center Dot -->
            <div class="w-3 h-3 rounded-full shadow-inner" style="background-color: ${haloColor};"></div>
          </div>

          <!-- Pinned HUD Label -->
          <div class="absolute -top-7 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono shadow-2xl border transition-all ${
            isSelected 
              ? 'text-white scale-105 z-30' 
              : 'text-slate-200 opacity-90 group-hover:opacity-100 group-hover:scale-105'
          }" style="background-color: rgba(30, 18, 45, 0.92); border-color: ${haloColor}; box-shadow: 0 0 10px ${haloColor}40;">
            ${t.name.split(' (')[0]} · <span style="color: ${haloColor};" class="text-[9px]">σ ${tState.sigma.toFixed(2)}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-hombros-pin',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([t.coordinates[0], t.coordinates[1]], { icon: customIcon });

      // Click event
      marker.on('click', () => {
        setSelectedTerritoryId(t.id);
        mapInstanceRef.current?.flyTo([t.coordinates[0], t.coordinates[1]], 6, {
          duration: 1.4,
          easeLinearity: 0.25
        });
      });

      // Tooltip with telemetry
      marker.bindTooltip(`
        <div class="p-2 font-mono text-xs space-y-1">
          <div class="font-serif font-bold text-sm text-white">${t.name}</div>
          <div class="text-[10px] text-emerald-400/90">${t.bioregion}</div>
          <div class="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-emerald-500/20">
            <span>Capacidad H: <b class="text-cyan-300">${tState.H.toFixed(2)}</b></span>
            <span>Estrés σ: <b class="${isCritical ? 'text-rose-400' : 'text-emerald-300'}">${tState.sigma.toFixed(2)}</b></span>
          </div>
          <div class="text-[10px] text-cyan-300">Scope 3 Importado: <b>${t.emissions.scope3Upstream} t</b></div>
        </div>
      `, {
        direction: 'top',
        offset: [0, -16],
        className: 'custom-leaflet-tooltip'
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [territories, selectedTerritoryId, filterRegion, palette]);

  // Update Metabolic Trade Flow Arcs
  useEffect(() => {
    if (!mapInstanceRef.current || !flowsLayerRef.current) return;
    flowsLayerRef.current.clearLayers();

    if (!showMetabolicFlows) return;

    const arcColor = isFcinq ? '#D83F87' : '#DA7B93';

    METABOLIC_TRADE_ARCS.forEach(arc => {
      const p1 = arc.from;
      const p2 = arc.to;
      const midLat = (p1[0] + p2[0]) / 2 + 12;
      const midLng = (p1[1] + p2[1]) / 2;

      const curvePoints = [
        p1,
        [midLat, midLng],
        p2
      ];

      const polyline = L.polyline(curvePoints, {
        color: arcColor,
        weight: arc.weight,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round'
      });

      polyline.bindTooltip(`
        <div class="font-mono text-xs">
          <strong style="color: ${arcColor};">${arc.label}</strong>
          <div class="text-[10px] text-slate-400">Transferencia Entrópica Scope 3</div>
        </div>
      `, { sticky: true });

      flowsLayerRef.current.addLayer(polyline);
    });
  }, [showMetabolicFlows, palette]);

  // Camera Fly-To Shortcuts
  const handleFlyToRegion = (region) => {
    if (!mapInstanceRef.current) return;
    if (region === 'world') {
      mapInstanceRef.current.flyTo([22, -15], 2.2, { duration: 1.6 });
    } else if (region === 'chile') {
      mapInstanceRef.current.flyTo([-33.8, -71.5], 6.5, { duration: 1.6 });
    } else if (region === 'europe') {
      mapInstanceRef.current.flyTo([49.5, 6.0], 4.8, { duration: 1.6 });
    }
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl transition-all shadow-2xl bio-hud-panel relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Observatorio Territorial Empírico (Mapa Satelital Plano)
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Cartografía Global & Auditoría Metabólica
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100/80 max-w-3xl leading-relaxed">
              Explora y audita los <strong>9 territorios biofísicos del mundo real</strong>. 
              Al seleccionar cualquier lugar se despliega su diagnóstico matemático de Hombros, 
              <strong>encuestas sociales oficiales (CASEN, CIS, Eurobarometer)</strong>, métricas biofísicas de recarga hídrica y la huella Scope 1, 2 y 3.
            </p>
          </div>

          {/* Sub-tab view switch: Map + Cases + Emissions + Panal */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border border-white/10 bg-[#1e132c] shadow-md self-start lg:self-center">
            <button
              onClick={() => setActiveSubTab('map')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeSubTab === 'map'
                  ? 'bg-[#376E6F] text-white shadow-md shadow-[#376E6F]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Mapa & Datos Crudos
            </button>
            <button
              onClick={() => setActiveSubTab('cases')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeSubTab === 'cases'
                  ? 'bg-[#DA7B93] text-white shadow-md shadow-[#DA7B93]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              Contraste de Casos & Modelos
            </button>
            <button
              onClick={() => setActiveSubTab('emissions')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeSubTab === 'emissions'
                  ? 'bg-[#44318D] text-white shadow-md shadow-[#44318D]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              Matriz Scope 1-2-3 (Metabolismo)
            </button>
            <button
              onClick={() => setActiveSubTab('panal')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeSubTab === 'panal'
                  ? 'bg-[#2C3539] text-white shadow-md shadow-black/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Hexagon className="w-3.5 h-3.5" />
              Red Panal P2P
            </button>
          </div>
        </div>

        {/* Basemap Switcher & Quick Navigation Bar */}
        <div className="mt-6 pt-5 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          
          {/* Basemap Layers Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 uppercase tracking-wider font-bold">Capa Satelital:</span>
            <div className="flex gap-1.5">
              {Object.values(TILE_LAYERS).map(tile => (
                <button
                  key={tile.id}
                  onClick={() => setActiveTileKey(tile.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTileKey === tile.id
                      ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-950/40 border border-cyan-400'
                      : 'bg-bio-deep text-slate-300 hover:text-white border border-emerald-500/20'
                  }`}
                >
                  {tile.name}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Quick Fly Shortcuts */}
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 uppercase tracking-wider font-bold">Enfoque:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => handleFlyToRegion('world')}
                className="px-2.5 py-1 rounded-lg bg-bio-deep hover:bg-bio-surface border border-emerald-500/20 text-slate-300 hover:text-white"
              >
                🗺️ Todo el Mundo
              </button>
              <button
                onClick={() => handleFlyToRegion('chile')}
                className="px-2.5 py-1 rounded-lg bg-bio-deep hover:bg-bio-surface border border-emerald-500/20 text-slate-300 hover:text-white"
              >
                🇨🇱 Chile (Cono Sur)
              </button>
              <button
                onClick={() => handleFlyToRegion('europe')}
                className="px-2.5 py-1 rounded-lg bg-bio-deep hover:bg-bio-surface border border-emerald-500/20 text-slate-300 hover:text-white"
              >
                🇪🇺 Europa
              </button>
            </div>
          </div>

          {/* Trade Flows Toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showMetabolicFlows}
                onChange={e => setShowMetabolicFlows(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-bio-void border-emerald-500/30"
              />
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Ship className="w-3.5 h-3.5 text-cyan-400" />
                Flujos de Deuda Ecológica Scope 3
              </span>
            </label>
          </div>

        </div>
      </div>

      {/* Main Map View, Panal Network, or Scope Breakdown */}
      {activeSubTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hyperrealistic Leaflet Map Container (6 cols) */}
          <div className="lg:col-span-6 p-4 sm:p-5 rounded-3xl bio-hud-panel shadow-2xl transition-all relative">
            
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <h3 className="font-serif font-bold text-sm tracking-wide text-white">
                  Cartografía Satelital de Medios Continuos
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400/80">
                [ LAT/LNG METRIC RESOLUTION ]
              </span>
            </div>

            {/* Flat World Map Leaflet DOM Element */}
            <div className="relative w-full aspect-[4/3] min-h-[440px] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-inner z-10">
              
              <div 
                ref={mapContainerRef} 
                className="w-full h-full"
                style={{ background: '#020b08' }}
              />

              {/* Float Controls on Map (Zoom & Reset) */}
              <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5 bg-bio-void/90 backdrop-blur-md p-1.5 rounded-xl border border-emerald-500/30 shadow-xl">
                <button
                  onClick={handleZoomIn}
                  title="Acercar"
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-bio-surface rounded-lg transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Alejar"
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-bio-surface rounded-lg transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFlyToRegion('world')}
                  title="Restablecer Vista Mundial"
                  className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-bio-surface rounded-lg transition-colors border-t border-emerald-500/20 mt-0.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Live Status Overlay Pill on Map */}
              <div className="absolute bottom-3 left-3 z-[1000] bg-bio-void/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-white text-[11px] font-mono flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]"></span>
                <span>Proyección: <strong>Plana Web Mercator</strong> · Capa: <strong>{TILE_LAYERS[activeTileKey].tag}</strong></span>
              </div>
            </div>

            {/* Fast Territory Selector Pills under map */}
            <div className="mt-4 pt-3 border-t border-emerald-500/20">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block mb-2">
                Selección Rápida de Territorio:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {territories.map(t => {
                  const isSelected = t.id === selectedTerritoryId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedTerritoryId(t.id);
                        mapInstanceRef.current?.flyTo([t.coordinates[0], t.coordinates[1]], 6, { duration: 1.4 });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all border ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-950/50'
                          : 'bg-bio-deep/90 text-slate-300 hover:text-white border-emerald-500/20 hover:border-cyan-500/40'
                      }`}
                    >
                      {t.name.split(' (')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Comprehensive Territorial Empirical Dossier (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Territory Identity Card */}
            <div className="p-6 rounded-3xl bio-hud-panel shadow-xl transition-all">
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                      Nodo Empírico ({activeTerritory.country})
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-bio-deep border border-emerald-500/20 text-emerald-300">
                      Población: {activeTerritory.population.toLocaleString()} hab
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    {activeTerritory.name}
                  </h2>
                  <p className="text-xs font-serif italic text-emerald-300/80 mt-0.5">
                    {activeTerritory.tag}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <button
                      onClick={() => setActiveSubTab('cases')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-[#DA7B93]/20 hover:bg-[#DA7B93]/30 text-[#DA7B93] border border-[#DA7B93]/40 hover:border-[#DA7B93] transition-all shadow-sm"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>Ver en Contraste Epistémico &rarr;</span>
                    </button>
                    <button
                      onClick={handleCopyRawData}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-bio-deep hover:bg-bio-surface text-slate-300 hover:text-white border border-emerald-500/30 transition-all shadow-sm"
                    >
                      {copiedRawData ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">¡Datos Copiados!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Copiar Datos Crudos</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className={`px-3.5 py-1.5 rounded-2xl border text-center font-mono shrink-0 shadow-lg ${
                  activeState.sigma > 1.2
                    ? 'bg-rose-950/80 text-rose-300 border-rose-500/60 shadow-rose-950/50'
                    : activeState.sigma > 0.9
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/60 shadow-amber-950/50'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-emerald-950/50'
                }`}>
                  <span className="block text-[9px] uppercase font-bold">Estrés σ</span>
                  <span className="text-lg font-extrabold">{activeState.sigma.toFixed(2)}</span>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                {activeTerritory.description}
              </p>

              {/* Instant Empirical Snapshot Strip (6 Telemetric Indicators) */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-2.5 rounded-2xl bg-black/30 border border-white/5 font-mono text-center">
                <div className="p-1.5 rounded-xl bg-white/[0.02]">
                  <span className="block text-[9px] uppercase text-slate-400 font-bold">Población</span>
                  <span className="text-xs font-bold text-white">{activeTerritory.population.toLocaleString()}</span>
                </div>
                <div className="p-1.5 rounded-xl bg-white/[0.02]">
                  <span className="block text-[9px] uppercase text-cyan-300 font-bold">Agua</span>
                  <span className="text-xs font-bold text-cyan-200">
                    {activeTerritory.complementaryMetrics?.waterConsumptionLitresPerDay ? `${activeTerritory.complementaryMetrics.waterConsumptionLitresPerDay} L/d` : 'N/D'}
                  </span>
                </div>
                <div className="p-1.5 rounded-xl bg-white/[0.02]">
                  <span className="block text-[9px] uppercase text-emerald-300 font-bold">Área Verde</span>
                  <span className="text-xs font-bold text-emerald-200">
                    {activeTerritory.complementaryMetrics?.greenSpaceM2PerCapita ? `${activeTerritory.complementaryMetrics.greenSpaceM2PerCapita} m²` : 'N/D'}
                  </span>
                </div>
                <div className="p-1.5 rounded-xl bg-white/[0.02]">
                  <span className="block text-[9px] uppercase text-amber-300 font-bold">Red Eléctrica</span>
                  <span className="text-xs font-bold text-amber-200">
                    {activeTerritory.emissions?.gridCarbonIntensity ? `${activeTerritory.emissions.gridCarbonIntensity} g/k` : 'N/D'}
                  </span>
                </div>
                <div className="p-1.5 rounded-xl bg-white/[0.02]">
                  <span className="block text-[9px] uppercase text-teal-300 font-bold">Autonomía</span>
                  <span className="text-xs font-bold text-teal-200">
                    {activeTerritory.complementaryMetrics?.municipalAutonomyRate ? `${(activeTerritory.complementaryMetrics.municipalAutonomyRate * 100).toFixed(0)}%` : 'N/D'}
                  </span>
                </div>
                <div className="p-1.5 rounded-xl bg-white/[0.02]">
                  <span className="block text-[9px] uppercase text-pink-300 font-bold">Gini</span>
                  <span className="text-xs font-bold text-pink-200">
                    {activeTerritory.surveys?.gini || 'N/D'}
                  </span>
                </div>
              </div>

              {/* Sitios Web Oficiales & Fuentes de Datos Abiertos */}
              <div className="mt-4 pt-3.5 border-t border-emerald-500/20">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                      Sitios Web Oficiales & Fuentes Abiertas del Territorio:
                    </span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-200">
                    {activeTerritory.openDataSources?.length || 0} Portales
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeTerritory.openDataSources?.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between p-2.5 rounded-xl bg-bio-deep/90 hover:bg-bio-surface border border-cyan-500/20 hover:border-cyan-400 transition-all hover:scale-[1.01] shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                            {source.type}
                          </span>
                          <ExternalLink className="w-3 h-3 text-cyan-400 group-hover:text-white transition-colors shrink-0" />
                        </div>
                        <p className="font-serif font-bold text-xs text-white group-hover:text-cyan-200 transition-colors">
                          {source.name}
                        </p>
                        <p className="text-[10px] text-slate-300 line-clamp-2 mt-0.5 leading-snug">
                          {source.description}
                        </p>
                      </div>
                      <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-cyan-400 group-hover:text-cyan-300">
                        <span className="truncate max-w-[120px]">{source.url.replace(/^https?:\/\//, '')}</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Dossier Navigation Tabs */}
              <div className="mt-5 pt-4 border-t border-emerald-500/20 flex flex-wrap gap-1.5 font-mono">
                {[
                  { id: 'diagnosis', label: '📊 Hombros & Variables', icon: BarChart3 },
                  { id: 'raw_data', label: '📡 Datos Crudos (Telemetría)', icon: Terminal },
                  { id: 'surveys', label: '📋 Encuestas & Métricas', icon: Users },
                  { id: 'emissions', label: '🏭 Huella Scope 1-3', icon: Factory },
                  { id: 'history', label: '📈 Histórico', icon: Calendar },
                  { id: 'compare', label: '⚖️ Comparar', icon: Scale },
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = dossierTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setDossierTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/50 border border-cyan-400'
                          : 'bg-bio-deep text-slate-400 hover:text-white border border-emerald-500/20'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dossier Content Body */}
            <div className="p-6 rounded-3xl bio-hud-panel shadow-xl transition-all">
              
              {/* TAB 1: DIAGNOSTIC & 12 VARIABLES */}
              {dossierTab === 'diagnosis' && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-white mb-1">
                      Diagnóstico de Capacidad Portante H = (S · E · K)⅓
                    </h3>
                    <p className="text-xs text-slate-300">
                      Capacidad total calculada: <strong className="font-mono text-cyan-300 text-sm">{activeState.H.toFixed(3)}</strong> · Régimen: <strong className="text-emerald-300">{activeState.trafficTitle}</strong>
                    </p>
                  </div>

                  {/* 3 Shoulders Summary */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-2xl bg-bio-deep/90 border border-cyan-500/30 text-center shadow-inner">
                      <span className="block text-[10px] font-mono uppercase text-cyan-300 font-bold">Social (S)</span>
                      <span className="text-2xl font-serif font-bold text-cyan-200">{activeState.S.toFixed(2)}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-bio-deep/90 border border-emerald-500/30 text-center shadow-inner">
                      <span className="block text-[10px] font-mono uppercase text-emerald-300 font-bold">Ambiental (E)</span>
                      <span className="text-2xl font-serif font-bold text-emerald-200">{activeState.E.toFixed(2)}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-bio-deep/90 border border-teal-500/30 text-center shadow-inner">
                      <span className="block text-[10px] font-mono uppercase text-teal-300 font-bold">Económico (K)</span>
                      <span className="text-2xl font-serif font-bold text-teal-200">{activeState.K.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* 12 Inferred Observable Variables Breakdown */}
                  <div className="pt-3 border-t border-emerald-500/20">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-3">
                      Variables de Primer Nivel Inferidas de Datos Públicos:
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      {/* S1-S4 */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-bio-deep/80 border border-cyan-500/20">
                        <strong className="block text-[10px] uppercase text-cyan-300">Social (S)</strong>
                        <div className="flex justify-between"><span className="text-slate-400">S₁ Cohesión:</span> <b className="text-cyan-200">{activeTerritory.variables.s1}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">S₂ Institución:</span> <b className="text-cyan-200">{activeTerritory.variables.s2}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">S₃ Saberes:</span> <b className="text-cyan-200">{activeTerritory.variables.s3}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">S₄ Paz Social:</span> <b className="text-cyan-200">{activeTerritory.variables.s4}</b></div>
                      </div>

                      {/* E1-E4 */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-bio-deep/80 border border-emerald-500/20">
                        <strong className="block text-[10px] uppercase text-emerald-300">Ambiental (E)</strong>
                        <div className="flex justify-between"><span className="text-slate-400">E₁ Ecosistema:</span> <b className="text-emerald-200">{activeTerritory.variables.e1}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">E₂ Agua:</span> <b className="text-emerald-200">{activeTerritory.variables.e2}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">E₃ Suelo Vivo:</span> <b className="text-emerald-200">{activeTerritory.variables.e3}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">E₄ Clima:</span> <b className="text-emerald-200">{activeTerritory.variables.e4}</b></div>
                      </div>

                      {/* K1-K4 */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-bio-deep/80 border border-teal-500/20">
                        <strong className="block text-[10px] uppercase text-teal-300">Económico (K)</strong>
                        <div className="flex justify-between"><span className="text-slate-400">K₁ Diversidad:</span> <b className="text-teal-200">{activeTerritory.variables.k1}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">K₂ Autonomía:</span> <b className="text-teal-200">{activeTerritory.variables.k2}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">K₃ 1-Gini:</span> <b className="text-teal-200">{activeTerritory.variables.k3}</b></div>
                        <div className="flex justify-between"><span className="text-slate-400">K₄ Reposición:</span> <b className="text-teal-200">{activeTerritory.variables.k4}</b></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: RAW BIOPHYSICAL TELEMETRY (DATOS CRUDOS) */}
              {dossierTab === 'raw_data' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-white flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        Telemetría Biofísica en Bruto (Datos Crudos Oficiales)
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Lecturas directas de sensores, caudales físicos y encuestas sin normalizar.
                      </p>
                    </div>

                    <button
                      onClick={handleCopyRawData}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-bio-deep hover:bg-bio-surface text-cyan-300 border border-cyan-500/30 transition-all self-start sm:self-center"
                    >
                      {copiedRawData ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">¡COPIADO JSON!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>COPIAR JSON RAW</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 4 Bio-physical Resource Flow Cards (Unidades Físicas Reales) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    
                    {/* 1. AGUA */}
                    <div className="p-3.5 rounded-2xl bg-bio-deep/90 border border-cyan-500/30 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-cyan-300 flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                          {activeTerritory.resources?.water?.name || 'Recursos Hídricos'}
                        </span>
                        <span className="text-[10px] text-cyan-200/80 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                          {activeTerritory.resources?.water?.unit}
                        </span>
                      </div>
                      <div className="space-y-1 text-[11px] pt-1">
                        <div className="flex justify-between text-slate-300">
                          <span>Consumo Basal Vital:</span>
                          <strong className="text-white">{activeTerritory.resources?.water?.basalNeed}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Recarga / Aforo Natural:</span>
                          <strong className="text-emerald-400">{activeTerritory.resources?.water?.naturalInflow}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Extracción Consuntiva:</span>
                          <strong className="text-rose-400">{activeTerritory.resources?.water?.extractiveLoad}</strong>
                        </div>
                        <div className="flex justify-between text-slate-400 pt-1 border-t border-emerald-500/20 text-[10px]">
                          <span>Consumo Domiciliario:</span>
                          <span className="text-cyan-300 font-bold">{activeTerritory.complementaryMetrics?.waterConsumptionLitresPerDay || 'N/D'} l/hab/día</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. BIOMASA Y SUELO */}
                    <div className="p-3.5 rounded-2xl bg-bio-deep/90 border border-emerald-500/30 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-emerald-300 flex items-center gap-1.5">
                          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                          {activeTerritory.resources?.biomass?.name || 'Suelo y Biomasa'}
                        </span>
                        <span className="text-[10px] text-emerald-200/80 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                          {activeTerritory.resources?.biomass?.unit}
                        </span>
                      </div>
                      <div className="space-y-1 text-[11px] pt-1">
                        <div className="flex justify-between text-slate-300">
                          <span>Sustento Vital Basal:</span>
                          <strong className="text-white">{activeTerritory.resources?.biomass?.basalNeed}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Regeneración / Biomasa:</span>
                          <strong className="text-emerald-400">{activeTerritory.resources?.biomass?.naturalInflow}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Pérdida / Extracción:</span>
                          <strong className="text-rose-400">{activeTerritory.resources?.biomass?.extractiveLoad}</strong>
                        </div>
                        <div className="flex justify-between text-slate-400 pt-1 border-t border-emerald-500/20 text-[10px]">
                          <span>Áreas Verdes Accesibles:</span>
                          <span className="text-emerald-300 font-bold">{activeTerritory.complementaryMetrics?.greenSpaceM2PerCapita || 'N/D'} m²/hab</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. ENERGÍA Y EMISIONES */}
                    <div className="p-3.5 rounded-2xl bg-bio-deep/90 border border-amber-500/30 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-amber-300 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          {activeTerritory.resources?.energy?.name || 'Autonomía Energética'}
                        </span>
                        <span className="text-[10px] text-amber-200/80 px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                          {activeTerritory.resources?.energy?.unit}
                        </span>
                      </div>
                      <div className="space-y-1 text-[11px] pt-1">
                        <div className="flex justify-between text-slate-300">
                          <span>Demanda Basal Mínima:</span>
                          <strong className="text-white">{activeTerritory.resources?.energy?.basalNeed}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Generación Renovable:</span>
                          <strong className="text-emerald-400">{activeTerritory.resources?.energy?.naturalInflow}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Consumo Total:</span>
                          <strong className="text-amber-400">{activeTerritory.resources?.energy?.extractiveLoad}</strong>
                        </div>
                        <div className="flex justify-between text-slate-400 pt-1 border-t border-emerald-500/20 text-[10px]">
                          <span>Intensidad Carbono Red:</span>
                          <span className="text-white font-bold">{activeTerritory.emissions?.gridCarbonIntensity || 'N/D'} gCO₂/kWh</span>
                        </div>
                      </div>
                    </div>

                    {/* 4. CUIDADOS Y TEJIDO SOCIAL */}
                    <div className="p-3.5 rounded-2xl bg-bio-deep/90 border border-teal-500/30 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-teal-300 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-teal-400" />
                          {activeTerritory.resources?.care?.name || 'Tiempo de Cuidados'}
                        </span>
                        <span className="text-[10px] text-teal-200/80 px-1.5 py-0.5 rounded bg-teal-950/60 border border-teal-500/30">
                          {activeTerritory.resources?.care?.unit}
                        </span>
                      </div>
                      <div className="space-y-1 text-[11px] pt-1">
                        <div className="flex justify-between text-slate-300">
                          <span>Tiempo Basal Vital:</span>
                          <strong className="text-white">{activeTerritory.resources?.care?.basalNeed}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Disponibilidad Cuidados:</span>
                          <strong className="text-emerald-400">{activeTerritory.resources?.care?.naturalInflow}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Sobrecarga Asumida:</span>
                          <strong className="text-rose-400">{activeTerritory.resources?.care?.extractiveLoad}</strong>
                        </div>
                        <div className="flex justify-between text-slate-400 pt-1 border-t border-emerald-500/20 text-[10px]">
                          <span>Gini Territorial:</span>
                          <span className="text-teal-300 font-bold">{activeTerritory.surveys?.gini || 'N/D'}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Open Portals Links */}
                  <div className="pt-3 border-t border-emerald-500/20">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block mb-2">
                      Fuentes Sensorizadas Oficiales del Territorio:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activeTerritory.openDataSources?.map((src, i) => (
                        <a 
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-xl bg-bio-deep hover:bg-bio-surface border border-emerald-500/20 hover:border-cyan-400/50 flex items-start justify-between gap-2 transition-all group"
                        >
                          <div>
                            <strong className="font-serif text-white group-hover:text-cyan-300 block text-[11px]">
                              {src.name}
                            </strong>
                            <span className="text-[10px] text-slate-400 font-mono block">{src.type}</span>
                            <p className="text-[10px] text-slate-300/80 mt-0.5 leading-snug">{src.description}</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SURVEYS & COMPLEMENTARY METRICS */}
              {dossierTab === 'surveys' && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-white mb-1">
                      Encuestas Sociales & Métricas Biofísicas Reales
                    </h3>
                    <p className="text-xs text-slate-300">
                      Información empírica oficial recopilada de encuestas de hogares, inventarios ambientales y catastros territoriales.
                    </p>
                  </div>

                  {/* Surveys Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-bio-deep/90 border border-emerald-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase block">Pobreza Multidimensional / Exclusión</span>
                      <strong className="text-sm font-serif font-bold text-white block">
                        {activeTerritory.surveys?.povertyMultidimensional || 'N/D'}
                      </strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-bio-deep/90 border border-emerald-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase block">Distribución del Ingreso (Gini)</span>
                      <strong className="text-sm font-serif font-bold text-white block">
                        {activeTerritory.surveys?.gini || 'N/D'}
                      </strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-bio-deep/90 border border-emerald-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase block">Confianza Comunitaria & Vecinal</span>
                      <strong className="text-sm font-serif font-bold text-cyan-300 block">
                        {activeTerritory.surveys?.socialTrust || 'N/D'}
                      </strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-bio-deep/90 border border-emerald-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase block">Seguridad & Tranquilidad Barrial</span>
                      <strong className="text-sm font-serif font-bold text-emerald-300 block">
                        {activeTerritory.surveys?.perceivedSafety || 'N/D'}
                      </strong>
                    </div>
                  </div>

                  {/* Complementary Metrics */}
                  <div className="pt-3 border-t border-emerald-500/20 space-y-2.5 text-xs">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                      Métricas Biofísicas & Financieras Específicas:
                    </span>

                    <div className="grid grid-cols-2 gap-2.5 font-mono text-[11px]">
                      <div className="p-2.5 rounded-xl bg-bio-deep/80 border border-emerald-500/20">
                        <span className="text-slate-400 block text-[9px] uppercase">Consumo Hídrico Domiciliario</span>
                        <strong className="text-cyan-300">{activeTerritory.complementaryMetrics?.waterConsumptionLitresPerDay || 'N/D'} litros/hab/día</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-bio-deep/80 border border-emerald-500/20">
                        <span className="text-slate-400 block text-[9px] uppercase">Áreas Verdes Urbanas</span>
                        <strong className="text-emerald-300">{activeTerritory.complementaryMetrics?.greenSpaceM2PerCapita || 'N/D'} m²/hab</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-bio-deep/80 border border-emerald-500/20">
                        <span className="text-slate-400 block text-[9px] uppercase">Autonomía Presupuestaria</span>
                        <strong className="text-teal-300">{activeTerritory.complementaryMetrics?.municipalAutonomyRate || 'N/D'}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-bio-deep/80 border border-emerald-500/20">
                        <span className="text-slate-400 block text-[9px] uppercase">Calidad del Aire (MP2.5)</span>
                        <strong className="text-white">{activeTerritory.complementaryMetrics?.airQualityPM25 || 'N/D'}</strong>
                      </div>
                    </div>

                    {/* Local Tension Banner */}
                    <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-xs">
                      <strong className="block font-serif font-bold mb-0.5 text-cyan-300">Tensión Socio-Ambiental Identificada:</strong>
                      <span>{activeTerritory.complementaryMetrics?.keyLocalTension}</span>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono text-right">
                      Fuente: {activeTerritory.surveys?.source}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: EMISSIONS SCOPE 1, 2, 3 */}
              {dossierTab === 'emissions' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-white mb-1">
                      Desglose de Emisiones Scope 1, 2 y 3 (GHG Protocol)
                    </h3>
                    <p className="text-xs text-slate-300">
                      Emisiones per cápita anuales (t CO₂e / hab / año) y tasa de tercerización externa.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Scope 1 */}
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-mono">
                        <span className="text-slate-300">Scope 1 (Territorial Físico):</span>
                        <strong className="text-rose-400 font-bold">{activeEmissions.scope1} t</strong>
                      </div>
                      <div className="w-full h-2 rounded-full bg-bio-void overflow-hidden border border-emerald-500/20">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${Math.min(100, (activeEmissions.scope1 / 15) * 100)}%` }} />
                      </div>
                    </div>

                    {/* Scope 2 */}
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-mono">
                        <span className="text-slate-300">Scope 2 (Electricidad de Red):</span>
                        <strong className="text-cyan-400 font-bold">{activeEmissions.scope2} t</strong>
                      </div>
                      <div className="w-full h-2 rounded-full bg-bio-void overflow-hidden border border-emerald-500/20">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, (activeEmissions.scope2 / 15) * 100)}%` }} />
                      </div>
                    </div>

                    {/* Scope 3 Upstream */}
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-mono">
                        <span className="text-slate-300">Scope 3 Upstream (Importado):</span>
                        <strong className="text-teal-300 font-bold">{activeEmissions.scope3Upstream} t</strong>
                      </div>
                      <div className="w-full h-2 rounded-full bg-bio-void overflow-hidden border border-emerald-500/20">
                        <div className="h-full bg-teal-400 rounded-full" style={{ width: `${Math.min(100, (activeEmissions.scope3Upstream / 15) * 100)}%` }} />
                      </div>
                    </div>

                    {/* Scope 3 Downstream */}
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-mono">
                        <span className="text-slate-300">Scope 3 Downstream (Exportado):</span>
                        <strong className="text-blue-400 font-bold">{activeEmissions.scope3Downstream} t</strong>
                      </div>
                      <div className="w-full h-2 rounded-full bg-bio-void overflow-hidden border border-emerald-500/20">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (activeEmissions.scope3Downstream / 15) * 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-bio-deep border border-emerald-500/20 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Huella de Consumo Real</span>
                      <strong className="text-white">{activeEmissions.consumptionTotal} t CO₂e/hab</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Ratio de Tercerización</span>
                      <strong className={activeEmissions.outsourcingRatio > 2.0 ? 'text-rose-400' : 'text-emerald-400'}>
                        {activeEmissions.outsourcingRatio}x
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: HISTORICAL MULTI-TEMPORAL TRAJECTORY */}
              {dossierTab === 'history' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-white mb-1">
                      Evolución Histórica & Trayectoria Temporal
                    </h3>
                    <p className="text-xs text-slate-300">
                      Monitoreo interanual de la velocidad sintrópica Γ y la capacidad portante H.
                    </p>
                  </div>

                  {activeTerritory.history && activeTerritory.history.length > 0 ? (
                    <div className="space-y-2.5">
                      {activeTerritory.history.map((step, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                            step.isProjectedHombros
                              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                              : step.isProjectedBAU
                                ? 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                                : 'bg-bio-deep/90 border-emerald-500/20 text-slate-200'
                          }`}
                        >
                          <div>
                            <span className="font-mono font-bold text-sm mr-2 text-cyan-300">{step.year}:</span>
                            <span className="font-serif">{step.note}</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-[11px] shrink-0">
                            <span>H: <b className="text-cyan-300">{step.H?.toFixed(2)}</b></span>
                            <span>σ: <b className={step.sigma > 1.0 ? 'text-rose-400' : 'text-emerald-400'}>{step.sigma?.toFixed(2)}</b></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic p-4 text-center">
                      Serie histórica continua en proceso de calibración para este nodo.
                    </p>
                  )}
                </div>
              )}

              {/* TAB 5: BENCHMARK FACE-TO-FACE COMPARISON */}
              {dossierTab === 'compare' && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-white mb-1">
                      Comparativa Cara a Cara
                    </h3>
                    <p className="text-xs text-slate-300">
                      Contrasta directamente {activeTerritory.name} contra otro territorio de la red.
                    </p>
                  </div>

                  {/* Selector of Comparison Territory */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-cyan-400 uppercase font-bold">Comparar contra:</span>
                    <select
                      value={comparisonTerritoryId}
                      onChange={e => setComparisonTerritoryId(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-bio-deep font-serif font-bold text-white focus:outline-none"
                    >
                      {territories.filter(t => t.id !== activeTerritory.id).map(t => (
                        <option key={t.id} value={t.id} className="bg-bio-deep text-white">
                          {t.name} ({t.country})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Side by side comparison table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-emerald-500/20 text-[10px] text-cyan-400 uppercase">
                          <th className="py-2">Métrica</th>
                          <th className="py-2 text-right">{activeTerritory.name.split(' (')[0]}</th>
                          <th className="py-2 text-right">{comparisonTerritory.name.split(' (')[0]}</th>
                          <th className="py-2 text-right">Diferencia</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-500/10">
                        <tr>
                          <td className="py-2 font-sans font-medium text-slate-300">Capacidad Portante H</td>
                          <td className="py-2 text-right font-bold text-cyan-300">{activeState.H.toFixed(2)}</td>
                          <td className="py-2 text-right font-bold text-cyan-300">{comparisonState.H.toFixed(2)}</td>
                          <td className="py-2 text-right font-bold text-emerald-400">
                            {(activeState.H - comparisonState.H).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-sans font-medium text-slate-300">Estrés Sistémico σ</td>
                          <td className="py-2 text-right font-bold text-white">{activeState.sigma.toFixed(2)}</td>
                          <td className="py-2 text-right font-bold text-white">{comparisonState.sigma.toFixed(2)}</td>
                          <td className="py-2 text-right font-bold text-cyan-400">
                            {(activeState.sigma - comparisonState.sigma).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-sans font-medium text-slate-300">Scope 1 (Territorial)</td>
                          <td className="py-2 text-right text-rose-400">{activeTerritory.emissions.scope1} t</td>
                          <td className="py-2 text-right text-rose-400">{comparisonTerritory.emissions.scope1} t</td>
                          <td className="py-2 text-right text-slate-300">
                            {(activeTerritory.emissions.scope1 - comparisonTerritory.emissions.scope1).toFixed(1)} t
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-sans font-medium text-slate-300">Scope 3 Upstream</td>
                          <td className="py-2 text-right text-teal-300 font-bold">{activeTerritory.emissions.scope3Upstream} t</td>
                          <td className="py-2 text-right text-teal-300 font-bold">{comparisonTerritory.emissions.scope3Upstream} t</td>
                          <td className="py-2 text-right text-slate-300">
                            {(activeTerritory.emissions.scope3Upstream - comparisonTerritory.emissions.scope3Upstream).toFixed(1)} t
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-sans font-medium text-slate-300">Gini Comunal / Distrital</td>
                          <td className="py-2 text-right">{activeTerritory.surveys?.gini?.split(' ')[0] || 'N/D'}</td>
                          <td className="py-2 text-right">{comparisonTerritory.surveys?.gini?.split(' ')[0] || 'N/D'}</td>
                          <td className="py-2 text-right text-slate-500">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Public Open Data Links Footer */}
              <div className="mt-5 pt-4 border-t border-emerald-500/20">
                <span className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  Fuentes Oficiales Abiertas para {activeTerritory.name.split(' (')[0]}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeTerritory.openDataSources?.map((source, i) => (
                    <a
                      key={i}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bio-deep hover:bg-bio-surface border border-emerald-500/20 text-xs transition-all hover:border-cyan-400 font-medium text-slate-200 shadow-sm"
                    >
                      <span>{source.name}</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Contraste de Casos & Modelos Nativos View */}
      {activeSubTab === 'cases' && (
        <DeepDiveCasesView 
          selectedTerritoryId={selectedTerritoryId}
          setSelectedTerritoryId={setSelectedTerritoryId}
          onNavigateToMap={(id) => {
            if (id) setSelectedTerritoryId(id);
            setActiveSubTab('map');
          }}
        />
      )}

      {/* Honeycomb P2P Network View */}
      {activeSubTab === 'panal' && (
        <HoneycombNetwork 
          territories={territories}
          globalModifiers={globalModifiers || { climateShock: 0, extractivePressure: 0, regenerativeInvestment: 0 }}
        />
      )}

      {/* Full Scope 1, 2, 3 Emissions Matrix Deep Dive View */}
      {activeSubTab === 'emissions' && (
        <ScopeEmissionsBreakdown 
          territories={territories} 
          selectedTerritoryId={selectedTerritoryId}
          setSelectedTerritoryId={setSelectedTerritoryId}
        />
      )}

    </div>
  );
}
