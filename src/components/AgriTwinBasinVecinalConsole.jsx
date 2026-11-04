import React, { useState } from 'react';
import { 
  Waves, 
  Satellite, 
  Hexagon, 
  ShieldCheck, 
  Flame, 
  Droplet, 
  Zap, 
  Trees, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  Users,
  Compass,
  ArrowRight,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

/**
 * AgriTwinBasinVecinalConsole
 * 
 * Interfaz interactiva de Doble Lente para el Kit "Audita tu Propia Cuenca":
 * - LENTE 1 (Macro-Cuenca · 122.070 ha): Perfil hidro-geofísico Embalse Bullileo (110 hm³) -> Río Longaví -> Sentinel-2 Tile 18HYD.
 * - LENTE 2 (Meso-Vecinal · El Panal): Red policéntrica tipo Catán (Fundo Meniel + 5 Comités APR + Anillo Cortafuegos WUI 45m).
 * 
 * Transmite telemetría en vivo a las 12 variables (S1..K4) y al coeficiente de amortiguación (κ) de HOMBROS.
 */
export default function AgriTwinBasinVecinalConsole({
  effectiveVariables,
  onVariableChange,
  kappa,
  onKappaChange,
  customMeta,
  onMetaChange,
  onLoadAgriTwinPreset,
  onImportJson
}) {
  const [activeLens, setActiveLens] = useState('both'); // 'both' | 'basin' | 'vecinal'
  const [activeBand, setActiveBand] = useState('NDRE'); // 'NDRE' | 'MNDWI' | 'NBR' | 'SOC'
  const [basinShock, setBasinShock] = useState('normal'); // 'normal' | 'megadrought' | 'puelche'

  // Estado de los 3 Pactos Comunitarios de la Mesa Vecinal / El Panal
  const [pacts, setPacts] = useState({
    keylineAPR: true,      // Recarga de tranque Keyline (18.500 m³) hacia pozos de los 5 APRs
    firebreakDAO: true,    // Anillo cortafuegos silvopastoril 45m (28 km, quórum DAO 9/10)
    p2pEnergyRewild: true  // Trueque agrovoltaico + Corredor biológico RewildMapper (PBC)
  });

  const [selectedHex, setSelectedHex] = useState('meniel'); // 'meniel' | 'bullileo' | 'retiro' | 'copihue' | 'romeral' | 'villaseca'

  // Handler para conmutar pactos vecinales y recalcular variables
  const togglePact = (pactKey) => {
    const updated = { ...pacts, [pactKey]: !pacts[pactKey] };
    setPacts(updated);

    // Calcular impacto sobre kappa (amortiguación)
    let newKappa = 0.15; // Base sin gobernanza
    if (updated.keylineAPR) newKappa += 0.16;
    if (updated.firebreakDAO) newKappa += 0.21;
    if (updated.p2pEnergyRewild) newKappa += 0.15;
    onKappaChange(parseFloat(newKappa.toFixed(2)));

    // Modificaciones dinámicas en S1, E4, K4
    if (pactKey === 'keylineAPR') {
      onVariableChange('s1', updated.keylineAPR ? 0.74 : 0.42);
      onVariableChange('e2', updated.keylineAPR ? 0.54 : 0.38);
    } else if (pactKey === 'firebreakDAO') {
      onVariableChange('e4', updated.firebreakDAO ? 0.68 : 0.35);
      onVariableChange('s4', updated.firebreakDAO ? 0.78 : 0.50);
    } else if (pactKey === 'p2pEnergyRewild') {
      onVariableChange('k1', updated.p2pEnergyRewild ? 0.62 : 0.46);
      onVariableChange('k4', updated.p2pEnergyRewild ? 0.66 : 0.44);
    }
  };

  // Handler para simular shock hidro-climático en cuenca
  const handleBasinShockChange = (shock) => {
    setBasinShock(shock);
    if (shock === 'megadrought') {
      onVariableChange('e2', 0.28); // Caída severa en disponibilidad hídrica
      onVariableChange('d1', 0.72); // Se dispara intensidad extractiva relativa
    } else if (shock === 'puelche') {
      onVariableChange('e4', 0.32); // Vulnerabilidad extrema a incendios forestales
      onVariableChange('e1', 0.44);
    } else {
      // Normal
      onVariableChange('e2', pacts.keylineAPR ? 0.54 : 0.48);
      onVariableChange('e4', pacts.firebreakDAO ? 0.68 : 0.55);
      onVariableChange('d1', 0.44);
    }
  };

  return (
    <div className="bg-[#101A1E] border border-emerald-500/30 rounded-2xl p-5 shadow-2xl text-slate-100 font-sans mb-8 relative overflow-hidden">
      {/* Glow de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cabecera de la Consola Biescala */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-emerald-500/20 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="text-lg font-serif font-bold text-emerald-300 tracking-wide">
              Consola Biescala AgriTwin ⇄ HOMBROS
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
              Tier 3 Telemetría en Vivo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Acople simultáneo: <strong className="text-emerald-200">Macro-Cuenca Longaví (122.070 ha · Sentinel-2)</strong> y <strong className="text-amber-200">Mesa Vecinal El Panal (5 APRs · 4.850 hab · Faja 45m)</strong>
          </p>
        </div>

        {/* Botones de acción rápida y vista */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-[#0A1215] p-1 rounded-xl border border-emerald-500/20 text-xs font-mono">
            <button
              onClick={() => setActiveLens('both')}
              className={`px-3 py-1 rounded-lg transition-all ${activeLens === 'both' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Doble Lente
            </button>
            <button
              onClick={() => setActiveLens('basin')}
              className={`px-3 py-1 rounded-lg transition-all ${activeLens === 'basin' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              🛰️ Solo Cuenca
            </button>
            <button
              onClick={() => setActiveLens('vecinal')}
              className={`px-3 py-1 rounded-lg transition-all ${activeLens === 'vecinal' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              🐝 Solo El Panal
            </button>
          </div>

          <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-[#16272C] hover:bg-[#1C3238] text-emerald-300 border border-emerald-500/30 transition-all">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cargar JSON</span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onImportJson) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const parsed = JSON.parse(event.target.result);
                      onImportJson(parsed);
                    } catch (err) {
                      alert('Error al leer el archivo JSON: ' + err.message);
                    }
                  };
                  reader.readAsText(file);
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* CUERPO DEL TABLERO BIESCALA */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        
        {/* ========================================================
            LENTE 1: MACRO-CUENCA (Sentinels + Hidrología de Cuenca)
            ======================================================== */}
        {(activeLens === 'both' || activeLens === 'basin') && (
          <div className={`${activeLens === 'both' ? 'lg:col-span-6' : 'lg:col-span-12'} bg-[#0B1518]/90 border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15">
                <div className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono uppercase font-bold text-cyan-300">
                    Lente Macro-Cuenca (DestinE · 122.070 ha)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Tile Sentinel-2: <span className="text-cyan-200 font-bold">18HYD</span>
                </span>
              </div>

              {/* Esquema SVG del Corte Transversal Andes -> Valle */}
              <div className="mt-3 bg-[#070D10] rounded-xl p-3 border border-cyan-500/20 relative">
                <div className="text-[10px] font-mono text-cyan-400/80 mb-1 flex items-center justify-between">
                  <span>CORTE HIDROLÓGICO: NEVADO LONGAVÍ ➔ VALLE CENTRAL</span>
                  <span>Q(t) = Q₀ · e^(-α·t)</span>
                </div>

                <svg viewBox="0 0 500 160" className="w-full h-36">
                  <defs>
                    <linearGradient id="basinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e3a5f" />
                      <stop offset="40%" stopColor="#0d5c75" />
                      <stop offset="80%" stopColor="#0f766e" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                    <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Perfil topográfico cordillera a valle */}
                  <path 
                    d="M 10 140 L 40 50 L 80 80 L 130 20 L 190 95 L 280 110 L 390 125 L 490 135 L 490 155 L 10 155 Z" 
                    fill="url(#basinGrad)" 
                    opacity="0.7"
                  />
                  {/* Glaciar / Nieve en cumbre */}
                  <polygon points="115,35 130,20 145,35 130,42" fill="url(#snowGrad)" />

                  {/* Embalse Bullileo (110 hm³) */}
                  <ellipse cx="205" cy="98" rx="28" ry="8" fill="#38bdf8" opacity="0.85" />
                  <text x="180" y="92" fill="#bae6fd" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    Embalse Bullileo (110 hm³)
                  </text>

                  {/* Río Longaví fluyendo */}
                  <path 
                    d="M 230 100 Q 290 108 340 120 T 490 138" 
                    fill="none" 
                    stroke="#38bdf8" 
                    strokeWidth="3" 
                    strokeDasharray="4 2"
                  />
                  <text x="320" y="115" fill="#7dd3fc" fontSize="8" fontFamily="monospace">
                    Río Longaví ➔ Canal Matriz (28 L/s)
                  </text>

                  {/* Indicador de Tranque Keyline Fundo Meniel */}
                  <circle cx="420" cy="132" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="375" y="150" fill="#a7f3d0" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    Tranque Keyline (18.500 m³)
                  </text>

                  {/* Flecha de Viento Puelche (ESE) */}
                  <path d="M 50 30 L 120 45" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow)" />
                  <text x="45" y="25" fill="#fcd34d" fontSize="7" fontFamily="monospace">
                    Viento Puelche (ESE 55 km/h)
                  </text>
                </svg>

                {/* Etiquetas de inyección biofísica directa */}
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-cyan-500/20 text-[11px] font-mono">
                  <div className="bg-[#0A1417] p-1.5 rounded border border-cyan-500/20">
                    <span className="text-slate-400">Embalse Bullileo:</span>{' '}
                    <span className="text-cyan-300 font-bold">110 hm³ (E₂={effectiveVariables.e2.toFixed(2)})</span>
                  </div>
                  <div className="bg-[#0A1417] p-1.5 rounded border border-cyan-500/20">
                    <span className="text-slate-400">Recesión Fluvial α:</span>{' '}
                    <span className="text-cyan-300 font-bold">0.018 d⁻¹ (Tier 3)</span>
                  </div>
                </div>
              </div>

              {/* Selector de Bandas Sentinel-2 (Tile 18HYD) */}
              <div className="mt-4">
                <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-2">
                  🛰️ Inyección de Bandas Sentinel-2 en Hombro Ecológico (E):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      setActiveBand('NDRE');
                      onVariableChange('e1', 0.58);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      activeBand === 'NDRE'
                        ? 'bg-emerald-900/60 border-emerald-400 text-white'
                        : 'bg-[#081013] border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-emerald-400">B8A/B05 · NDRE</div>
                    <div className="text-xs font-semibold">Biomasa Clorofila</div>
                    <div className="text-[10px] text-slate-400 font-mono">Alimenta E₁: {effectiveVariables.e1.toFixed(2)}</div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveBand('MNDWI');
                      onVariableChange('e2', 0.52);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      activeBand === 'MNDWI'
                        ? 'bg-cyan-900/60 border-cyan-400 text-white'
                        : 'bg-[#081013] border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-cyan-400">B11/B03 · MNDWI</div>
                    <div className="text-xs font-semibold">Agua Superficial</div>
                    <div className="text-[10px] text-slate-400 font-mono">Alimenta E₂: {effectiveVariables.e2.toFixed(2)}</div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveBand('SOC');
                      onVariableChange('e3', 0.63);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      activeBand === 'SOC'
                        ? 'bg-amber-900/60 border-amber-400 text-white'
                        : 'bg-[#081013] border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-amber-400">B12/B04 + SoilGrids</div>
                    <div className="text-xs font-semibold">Materia Orgánica</div>
                    <div className="text-[10px] text-slate-400 font-mono">Alimenta E₃: {effectiveVariables.e3.toFixed(2)}</div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveBand('NBR');
                      onVariableChange('e4', 0.65);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      activeBand === 'NBR'
                        ? 'bg-rose-900/60 border-rose-400 text-white'
                        : 'bg-[#081013] border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-rose-400">B08/B12 · NBR</div>
                    <div className="text-xs font-semibold">Severidad Fuego</div>
                    <div className="text-[10px] text-slate-400 font-mono">Alimenta E₄: {effectiveVariables.e4.toFixed(2)}</div>
                  </button>
                </div>
              </div>

              {/* Conmutador de Shocks Climáticos de Cuenca */}
              <div className="mt-4 pt-3 border-t border-emerald-500/15">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Simular Estrés Climático en Cuenca:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBasinShockChange('normal')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                      basinShock === 'normal'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-[#081013] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Régimen Normal
                  </button>
                  <button
                    onClick={() => handleBasinShockChange('megadrought')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                      basinShock === 'megadrought'
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold'
                        : 'bg-[#081013] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Megasequía (E₂ ➔ 0.28)
                  </button>
                  <button
                    onClick={() => handleBasinShockChange('puelche')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                      basinShock === 'puelche'
                        ? 'bg-rose-950 border-rose-500 text-rose-200 font-bold'
                        : 'bg-[#081013] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Viento Puelche 55 km/h (E₄ ➔ 0.32)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            LENTE 2: MESO-VECINAL ("El Panal" tipo Catán + 5 APRs)
            ======================================================== */}
        {(activeLens === 'both' || activeLens === 'vecinal') && (
          <div className={`${activeLens === 'both' ? 'lg:col-span-6' : 'lg:col-span-12'} bg-[#0B1518]/90 border border-amber-500/20 rounded-xl p-4 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/15">
                <div className="flex items-center gap-2">
                  <Hexagon className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono uppercase font-bold text-amber-300">
                    Lente Meso-Vecinal: El Panal (5 APRs · 10 Predios)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    Amortiguación κ: <strong className="text-amber-300 font-bold">{kappa.toFixed(2)}</strong>
                  </span>
                </div>
              </div>

              {/* Tablero Hexagonal SVG Estilo Catán */}
              <div className="mt-3 bg-[#070D10] rounded-xl p-3 border border-amber-500/20 relative">
                <div className="text-[10px] font-mono text-amber-400/80 mb-1 flex items-center justify-between">
                  <span>RED POLICÉNTRICA: 5 COMITÉS APR + PREDIO ANCLA</span>
                  <span>4.850 HAB. RURALES</span>
                </div>

                <svg viewBox="0 0 400 210" className="w-full h-48">
                  {/* Anillo Cortafuegos WUI 45m (Verde si activo, Rojo si inactivo) */}
                  <ellipse 
                    cx="200" 
                    cy="105" 
                    rx="180" 
                    ry="92" 
                    fill="none" 
                    stroke={pacts.firebreakDAO ? '#10b981' : '#f43f5e'} 
                    strokeWidth={pacts.firebreakDAO ? '4' : '2'} 
                    strokeDasharray={pacts.firebreakDAO ? 'none' : '5 5'}
                    opacity="0.8"
                  />
                  <text 
                    x="200" 
                    y="18" 
                    fill={pacts.firebreakDAO ? '#34d399' : '#fb7185'} 
                    fontSize="9" 
                    fontFamily="monospace" 
                    textAnchor="middle" 
                    fontWeight="bold"
                  >
                    {pacts.firebreakDAO ? '✓ FAJA CORTAFUEGOS WUI 45m ACTIVA (28 km · QUÓRUM 9/10)' : '⚠️ SIN FAJA CORTAFUEGOS (RIESGO DE FRACTURA WUI)'}
                  </text>

                  {/* Hexágono Central: Fundo Meniel (Predio Ancla) */}
                  <g 
                    onClick={() => setSelectedHex('meniel')} 
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <polygon 
                      points="200,75 235,90 235,120 200,135 165,120 165,90" 
                      fill="#065f46" 
                      stroke="#34d399" 
                      strokeWidth={selectedHex === 'meniel' ? '3' : '1.5'} 
                    />
                    <text x="200" y="103" fill="#ffffff" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                      Fundo Meniel
                    </text>
                    <text x="200" y="114" fill="#a7f3d0" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                      Tranque 18.5k m³
                    </text>
                  </g>

                  {/* Hexágono 1: APR Bullileo */}
                  <g onClick={() => setSelectedHex('bullileo')} className="cursor-pointer hover:opacity-90">
                    <polygon points="140,40 175,55 175,85 140,100 105,85 105,55" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="140" y="68" fill="#ffffff" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">APR Bullileo</text>
                    <text x="140" y="78" fill="#bae6fd" fontSize="6.5" fontFamily="monospace" textAnchor="middle">850 hab · 135 L/d</text>
                  </g>

                  {/* Hexágono 2: APR Retiro Centro */}
                  <g onClick={() => setSelectedHex('retiro')} className="cursor-pointer hover:opacity-90">
                    <polygon points="260,40 295,55 295,85 260,100 225,85 225,55" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="260" y="68" fill="#ffffff" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">APR Retiro</text>
                    <text x="260" y="78" fill="#bae6fd" fontSize="6.5" fontFamily="monospace" textAnchor="middle">1.600 hab · Pozos</text>
                  </g>

                  {/* Hexágono 3: APR Copihue */}
                  <g onClick={() => setSelectedHex('copihue')} className="cursor-pointer hover:opacity-90">
                    <polygon points="80,95 115,110 115,140 80,155 45,140 45,110" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="80" y="123" fill="#ffffff" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">APR Copihue</text>
                    <text x="80" y="133" fill="#bae6fd" fontSize="6.5" fontFamily="monospace" textAnchor="middle">720 hab · Pozo 28m</text>
                  </g>

                  {/* Hexágono 4: APR Romeral */}
                  <g onClick={() => setSelectedHex('romeral')} className="cursor-pointer hover:opacity-90">
                    <polygon points="320,95 355,110 355,140 320,155 285,140 285,110" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="320" y="123" fill="#ffffff" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">APR Romeral</text>
                    <text x="320" y="133" fill="#bae6fd" fontSize="6.5" fontFamily="monospace" textAnchor="middle">980 hab · Aljibe paliativo</text>
                  </g>

                  {/* Hexágono 5: APR Villaseca */}
                  <g onClick={() => setSelectedHex('villaseca')} className="cursor-pointer hover:opacity-90">
                    <polygon points="200,150 235,165 235,195 200,210 165,195 165,165" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="200" y="178" fill="#ffffff" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">APR Villaseca</text>
                    <text x="200" y="188" fill="#bae6fd" fontSize="6.5" fontFamily="monospace" textAnchor="middle">700 hab · Recarga Keyline</text>
                  </g>

                  {/* Líneas de enlace de trueque hídrico y solar */}
                  <line x1="200" y1="90" x2="140" y2="70" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="200" y1="90" x2="260" y2="70" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="180" y1="120" x2="80" y2="125" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="220" y1="120" x2="320" y2="125" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="200" y1="135" x2="200" y2="165" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>

                {/* Detalle del nodo seleccionado */}
                <div className="mt-2 p-2 bg-[#0A1417] rounded border border-amber-500/20 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 font-mono">Nodo Activo: </span>
                    <strong className="text-amber-300 font-serif">
                      {selectedHex === 'meniel' ? 'Fundo Meniel (Predio Ancla Agrovoltaico)' : `Comité ${selectedHex.toUpperCase()}`}
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Soberanía Hídrica: <strong className="text-white font-bold">{pacts.keylineAPR ? '100% Cubierta' : 'Déficit (Aljibe)'}</strong>
                  </span>
                </div>
              </div>

              {/* Los 3 Pactos Comunitarios de la Mesa Vecinal */}
              <div className="mt-4">
                <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-2">
                  🤝 Pactos de Gobernanza Vecinal (Aumentan Amortiguación κ):
                </span>
                <div className="space-y-2">
                  <div 
                    onClick={() => togglePact('keylineAPR')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      pacts.keylineAPR ? 'bg-cyan-950/40 border-cyan-500/60' : 'bg-[#081013] border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Droplet className={`w-4 h-4 ${pacts.keylineAPR ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-bold text-slate-200">Pacto Hidrológico: Tranque Keyline ➔ 5 APRs</div>
                        <div className="text-[10px] text-slate-400 font-mono">Recarga acuífero somero de 4.850 hab. (Sube S₁ y reduce camiones aljibe)</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300">{pacts.keylineAPR ? '+0.16 κ' : '0.00'}</span>
                  </div>

                  <div 
                    onClick={() => togglePact('firebreakDAO')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      pacts.firebreakDAO ? 'bg-emerald-950/40 border-emerald-500/60' : 'bg-[#081013] border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className={`w-4 h-4 ${pacts.firebreakDAO ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-bold text-slate-200">Quórum DAO 9/10: Faja Cortafuegos WUI 45m (28 km)</div>
                        <div className="text-[10px] text-slate-400 font-mono">Blindaje silvopastoril vecinal continuo contra incendios en interfaz forestal (Sube E₄ y S₄)</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-300">{pacts.firebreakDAO ? '+0.21 κ' : '0.00'}</span>
                  </div>

                  <div 
                    onClick={() => togglePact('p2pEnergyRewild')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      pacts.p2pEnergyRewild ? 'bg-amber-950/40 border-amber-500/60' : 'bg-[#081013] border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className={`w-4 h-4 ${pacts.p2pEnergyRewild ? 'text-amber-400' : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-bold text-slate-200">Trueque P2P Solar + Corredor RewildMapper (PBC)</div>
                        <div className="text-[10px] text-slate-400 font-mono">Intercambio de kWh y Unidades de Biodiversidad nativa en asamblea local (Sube K₁ y K₄)</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300">{pacts.p2pEnergyRewild ? '+0.15 κ' : '0.00'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pie de Consola: Resumen de Transmisión hacia el SEIA 2.0 */}
      <div className="relative z-10 mt-5 pt-3 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Telemetría biescala inyectada en las 12 variables de HOMBROS y en el amortiguador κ = <strong className="text-emerald-300">{kappa.toFixed(2)}</strong></span>
        </div>
        <button
          onClick={onLoadAgriTwinPreset}
          className="text-[11px] px-3 py-1 rounded bg-[#16272C] hover:bg-[#1E353C] text-emerald-300 border border-emerald-500/30 transition-all font-mono"
        >
          Restablecer Preset Longaví 100%
        </button>
      </div>
    </div>
  );
}
