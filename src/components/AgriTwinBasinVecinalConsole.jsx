import React, { useState, useRef, useCallback } from 'react';
import {
  Waves,
  Hexagon,
  ShieldCheck,
  Flame,
  Droplet,
  Zap,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Plug,
  WifiOff
} from 'lucide-react';
import {
  loadSavedAgriTwinUrl,
  saveAgriTwinUrl,
  fetchBasinSync,
  deriveLiveVariables
} from '../services/agritwinClient';

/**
 * AgriTwinBasinVecinalConsole
 *
 * Consola de Doble Lente del Kit "Audita tu Propia Cuenca":
 *  - Lente 1 (Macro-Cuenca): esquema del corte Andes → Valle.
 *  - Lente 2 (Meso-Vecinal · El Panal): 5 comités APR + predio ancla.
 *
 * HONESTIDAD DE DATOS
 *  - Sin conexión: todo es un ESQUEMA ILUSTRATIVO con supuestos de ejemplo.
 *  - Con conexión a AgriTwin (GET /api/basin-sync, solo lectura): se muestran
 *    valores reales de AgriTwin (clima en vivo + modelo hidrológico) y se
 *    pueden aplicar a E2 y E4 como proxies declarados.
 */

// Efecto de cada pacto (SUPUESTOS DE EJEMPLO, a calibrar con casos reales).
// Se aplican como incrementos: al activar suman, al desactivar restan.
const PACT_EFFECTS = {
  keylineAPR: { kappa: 0.16, vars: { s1: 0.06, e2: 0.05 } },
  firebreakDAO: { kappa: 0.21, vars: { e4: 0.10, s4: 0.05 } },
  p2pEnergyRewild: { kappa: 0.15, vars: { k1: 0.06, k4: 0.06 } }
};

// Nombres por defecto (documentación de AgriTwin). Con conexión se reemplazan por los reales.
const DEFAULT_APR_NAMES = ['Bullileo', 'Retiro Centro', 'Copihue', 'Romeral', 'Villaseca'];
const HEX_CENTERS = [
  [140, 70],
  [260, 70],
  [80, 125],
  [320, 125],
  [200, 180]
];
const hexPoints = (cx, cy) =>
  [[cx, cy - 30], [cx + 35, cy - 15], [cx + 35, cy + 15], [cx, cy + 30], [cx - 35, cy + 15], [cx - 35, cy - 15]]
    .map((p) => p.join(','))
    .join(' ');

const PACT_COLORS = {
  cyan: { on: 'bg-cyan-950/40 border-cyan-500/60', icon: 'text-cyan-400', text: 'text-cyan-300' },
  emerald: { on: 'bg-emerald-950/40 border-emerald-500/60', icon: 'text-emerald-400', text: 'text-emerald-300' },
  amber: { on: 'bg-amber-950/40 border-amber-500/60', icon: 'text-amber-400', text: 'text-amber-300' }
};

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const short = (s, n = 13) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

const STATUS_STYLE = {
  normal: { fill: '#0c4a6e', stroke: '#38bdf8', label: 'Normal' },
  recharge_positive: { fill: '#065f46', stroke: '#34d399', label: 'Recarga positiva' },
  warning_abatimiento: { fill: '#78350f', stroke: '#f59e0b', label: 'Alerta: baja el nivel del pozo' }
};

export default function AgriTwinBasinVecinalConsole({
  effectiveVariables = { e1: 0.5, e2: 0.5, e3: 0.5, e4: 0.5, s1: 0.5, s2: 0.5, s3: 0.5, s4: 0.5, k1: 0.5, k2: 0.5, k3: 0.5, k4: 0.5 },
  onVariableChange,
  onVariablesChange,
  kappa = 0.32,
  onKappaChange,
  onLoadAgriTwinPreset,
  pacts: externalPacts,
  onPactsChange,
  onLiveChange,
  onImportJson,
  cuencaId,
  onTelemetryUpdate
}) {
  const [activeLens, setActiveLens] = useState('both'); // 'both' | 'basin' | 'vecinal'
  const [activeBand, setActiveBand] = useState('NDRE');
  const [basinShock, setBasinShock] = useState('normal'); // 'normal' | 'megadrought' | 'puelche'
  const shockSnapshot = useRef(null);

  const [localPacts, setLocalPacts] = useState({
    keylineAPR: false,
    firebreakDAO: false,
    p2pEnergyRewild: false
  });
  const pacts = externalPacts || localPacts;
  const setPactsState = (updater) => {
    if (onPactsChange) {
      const next = typeof updater === 'function' ? updater(pacts) : updater;
      onPactsChange(next);
    } else {
      setLocalPacts(updater);
    }
  };
  const [selectedHex, setSelectedHex] = useState('meniel');

  // Conexión con AgriTwin (solo lectura)
  const [agriUrl, setAgriUrl] = useState(loadSavedAgriTwinUrl);
  const [conn, setConn] = useState({ state: 'idle', live: null, error: null }); // idle | loading | ok | error

  const live = conn.state === 'ok' ? conn.live : null;

  const applyVars = useCallback(
    (changes) => {
      if (onVariablesChange) onVariablesChange(changes);
      else if (onVariableChange) Object.entries(changes).forEach(([k, v]) => onVariableChange(k, v));
    },
    [onVariableChange, onVariablesChange]
  );

  const handleConnect = async () => {
    setConn({ state: 'loading', live: null, error: null });
    try {
      const data = await fetchBasinSync(agriUrl);
      saveAgriTwinUrl(agriUrl.trim());
      setConn({ state: 'ok', live: data, error: null });
      if (onLiveChange) onLiveChange(data);
      if (onTelemetryUpdate) onTelemetryUpdate(data);
    } catch (err) {
      setConn({ state: 'error', live: null, error: err.message });
      if (onLiveChange) onLiveChange(null);
    }
  };

  const handleApplyLive = () => {
    if (!live) return;
    applyVars(deriveLiveVariables(live));
  };

  const togglePact = (key) => {
    const turningOn = !pacts[key];
    const sign = turningOn ? 1 : -1;
    const eff = PACT_EFFECTS[key];

    setPactsState((p) => ({ ...p, [key]: turningOn }));
    if (onKappaChange) onKappaChange(parseFloat(clamp((kappa ?? 0.32) + sign * eff.kappa, 0.05, 0.75).toFixed(2)));

    const changes = {};
    Object.entries(eff.vars).forEach(([k, delta]) => {
      changes[k] = parseFloat(clamp(((effectiveVariables && effectiveVariables[k]) ?? 0.5) + sign * delta, 0.02, 1).toFixed(2));
    });
    applyVars(changes);
  };

  const handleBasinShockChange = (shock) => {
    // Guardamos el estado previo la primera vez que se aplica un shock, para restaurarlo exacto.
    if (basinShock === 'normal' && shock !== 'normal') {
      shockSnapshot.current = {
        e1: effectiveVariables?.e1 ?? 0.5,
        e2: effectiveVariables?.e2 ?? 0.5,
        e4: effectiveVariables?.e4 ?? 0.5
      };
    }
    setBasinShock(shock);

    if (shock === 'normal') {
      if (shockSnapshot.current) {
        applyVars(shockSnapshot.current);
        shockSnapshot.current = null;
      }
    } else if (shock === 'megadrought') {
      applyVars({ e2: 0.28 });
    } else if (shock === 'puelche') {
      applyVars({ e4: 0.32, e1: 0.44 });
    }
  };

  const handleReset = () => {
    setPactsState({ keylineAPR: false, firebreakDAO: false, p2pEnergyRewild: false });
    setBasinShock('normal');
    shockSnapshot.current = null;
    setActiveBand('NDRE');
    onLoadAgriTwinPreset();
  };

  const bandInject = (band, key, value) => {
    setActiveBand(band);
    applyVars({ [key]: value });
  };

  const aprs = HEX_CENTERS.map((c, i) => {
    const liveApr = live?.aprs?.[i];
    return {
      key: `apr${i}`,
      center: c,
      name: liveApr?.name || DEFAULT_APR_NAMES[i],
      families: liveApr?.families ?? null,
      depthM: liveApr?.depthM ?? null,
      status: liveApr?.status || 'normal',
      isLive: !!liveApr
    };
  });
  const selectedApr = aprs.find((a) => a.key === selectedHex);

  const e = effectiveVariables || { e1: 0.5, e2: 0.5, e3: 0.5, e4: 0.5, s1: 0.5, s2: 0.5, s3: 0.5, s4: 0.5, k1: 0.5, k2: 0.5, k3: 0.5, k4: 0.5 };

  return (
    <div className="bg-[#101A1E] border border-emerald-500/30 rounded-2xl p-5 shadow-2xl text-slate-100 font-sans mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cabecera */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-emerald-500/20 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-lg font-serif font-bold text-emerald-300 tracking-wide">
              Consola Biescala AgriTwin ⇄ HOMBROS
            </h3>
            {live ? (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-900 text-emerald-200 border border-emerald-400/50 font-bold">
                🟢 DATOS DE AGRITWIN
              </span>
            ) : (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/50 font-bold">
                🟡 ESQUEMA ILUSTRATIVO · valores de ejemplo
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Cuenca (Longaví · Bullileo) y vecindario (El Panal · 5 comités de agua potable rural).
            {!live && ' Conéctate a AgriTwin para ver datos reales.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-[#0A1215] p-1 rounded-xl border border-emerald-500/20 text-xs font-mono" role="group" aria-label="Elegir vista">
            {[
              ['both', 'Doble vista'],
              ['basin', '🛰️ Solo cuenca'],
              ['vecinal', '🐝 Solo El Panal']
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveLens(id)}
                aria-pressed={activeLens === id}
                className={`px-3 py-1 rounded-lg transition-all ${activeLens === id ? 'bg-emerald-700 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-[#16272C] hover:bg-[#1C3238] text-emerald-300 border border-emerald-500/30 transition-all">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cargar archivo JSON</span>
            <input
              type="file"
              accept=".json"
              aria-label="Cargar archivo JSON de variables"
              className="hidden"
              onChange={(ev) => {
                const file = ev.target.files?.[0];
                if (file && onImportJson) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      onImportJson(JSON.parse(event.target.result));
                    } catch (err) {
                      alert('No se pudo leer el archivo JSON: ' + err.message);
                    }
                  };
                  reader.readAsText(file);
                }
                ev.target.value = '';
              }}
            />
          </label>
        </div>
      </div>

      {/* Barra de conexión con AgriTwin */}
      <div className="relative z-10 mt-4 p-3 rounded-xl bg-[#0B1518] border border-cyan-500/25">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold shrink-0">
            {live ? <Plug className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-amber-400" />}
            Conexión con AgriTwin
          </div>
          <input
            type="text"
            value={agriUrl}
            onChange={(ev) => setAgriUrl(ev.target.value)}
            aria-label="Dirección del servidor AgriTwin"
            placeholder="http://localhost:7777"
            className="flex-1 px-3 py-1.5 rounded-lg bg-black/50 border border-white/20 text-white text-xs font-mono"
          />
          <button
            onClick={handleConnect}
            disabled={conn.state === 'loading'}
            className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 disabled:opacity-60 text-white text-xs font-mono font-bold"
          >
            {conn.state === 'loading' ? 'Conectando…' : live ? 'Actualizar' : 'Conectar'}
          </button>
          {live && (
            <button
              onClick={handleApplyLive}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-mono font-bold"
              title="Copia el llenado del embalse a E₂ y el riesgo de incendio (FWI) a E₄"
            >
              Aplicar a E₂ y E₄
            </button>
          )}
        </div>

        {conn.state === 'error' && (
          <p className="mt-2 text-xs text-rose-300 flex items-start gap-1.5" role="alert">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            {conn.error} Se siguen mostrando valores de ejemplo. Para encender AgriTwin: en su carpeta, <code className="font-mono">node server.cjs</code>.
          </p>
        )}
        {live && (
          <p className="mt-2 text-xs text-slate-300">
            Actualizado: <span className="font-mono text-white">{live.timestamp ? new Date(live.timestamp).toLocaleString('es-CL') : '—'}</span>
            {' · '}Clima: <span className={live.weatherIsReal ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
              {live.weatherIsReal ? 'real (Open-Meteo)' : 'simulado'}
            </span>
            {' · '}Caudal, embalse y riesgo de incendio son <strong>modelados por AgriTwin (prototipo)</strong>: aún no hay base de datos de estaciones detrás.
          </p>
        )}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* LENTE 1: CUENCA */}
        {(activeLens === 'both' || activeLens === 'basin') && (
          <div className={`${activeLens === 'both' ? 'lg:col-span-6' : 'lg:col-span-12'} bg-[#0B1518]/90 border border-emerald-500/20 rounded-xl p-4`}>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase font-bold text-cyan-300">Cuenca (macro)</span>
              </div>
              <span className="text-xs font-mono text-slate-300">Imagen satelital: tile Sentinel-2 18HYD</span>
            </div>

            <div className="mt-3 bg-[#070D10] rounded-xl p-3 border border-cyan-500/20">
              <div className="text-xs font-mono text-cyan-300/90 mb-1">
                CORTE ESQUEMÁTICO: CORDILLERA ➔ VALLE <span className="text-slate-400">(dibujo ilustrativo, no a escala)</span>
              </div>

              <svg viewBox="0 0 500 160" className="w-full h-40" role="img" aria-label="Esquema de la cuenca: cordillera, embalse Bullileo, río Longaví y tranque Keyline">
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
                <path d="M 10 140 L 40 50 L 80 80 L 130 20 L 190 95 L 280 110 L 390 125 L 490 135 L 490 155 L 10 155 Z" fill="url(#basinGrad)" opacity="0.7" />
                <polygon points="115,35 130,20 145,35 130,42" fill="url(#snowGrad)" />
                <ellipse cx="205" cy="98" rx="28" ry="8" fill="#38bdf8" opacity="0.85" />
                <text x="150" y="88" fill="#bae6fd" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  {live ? `Embalse Bullileo ${live.reservoir.fillPct.toFixed(0)}% lleno` : 'Embalse Bullileo'}
                </text>
                <path d="M 230 100 Q 290 108 340 120 T 490 138" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
                <text x="300" y="112" fill="#7dd3fc" fontSize="10" fontFamily="monospace">
                  {live ? `Río Longaví ${live.river.flow.toFixed(1)} m³/s` : 'Río Longaví'}
                </text>
                <circle cx="420" cy="132" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                <text x="340" y="152" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  Tranque Keyline{live?.tranque.capacityM3 ? ` (${live.tranque.capacityM3.toLocaleString('es-CL')} m³)` : ''}
                </text>
                <path d="M 50 30 L 120 45" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                <text x="20" y="22" fill="#fcd34d" fontSize="10" fontFamily="monospace">
                  {live?.puelcheGustsKmh != null ? `Viento puelche ${live.puelcheGustsKmh.toFixed(0)} km/h` : 'Viento puelche'}
                </text>
              </svg>

              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-cyan-500/20 text-xs font-mono">
                <div className="bg-[#0A1417] p-1.5 rounded border border-cyan-500/20">
                  <span className="text-slate-300">Agua (E₂):</span>{' '}
                  <span className="text-cyan-300 font-bold">{(e?.e2 ?? 0.5).toFixed(2)}</span>
                  {live?.reservoir.volumeHm3 != null && (
                    <span className="text-slate-400"> · {live.reservoir.volumeHm3.toFixed(1)} hm³</span>
                  )}
                </div>
                <div className="bg-[#0A1417] p-1.5 rounded border border-cyan-500/20">
                  <span className="text-slate-300">Riesgo de incendio:</span>{' '}
                  <span className="text-cyan-300 font-bold">
                    {live ? `FWI ${live.fwi.value} (${live.fwi.label.toLowerCase()})` : 'sin dato'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bandas */}
            <div className="mt-4">
              <span className="text-xs font-mono text-slate-200 block mb-1">
                🛰️ Qué mide cada banda satelital y a qué variable alimenta
              </span>
              <p className="text-xs text-amber-300/90 mb-2">
                Los botones asignan un valor de ejemplo. No leen la imagen satelital todavía.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'NDRE', code: 'NDRE', title: 'Vigor de la vegetación', key: 'e1', val: 0.58, label: 'E₁', on: 'bg-emerald-900/60 border-emerald-400', tc: 'text-emerald-300' },
                  { id: 'MNDWI', code: 'MNDWI', title: 'Agua superficial', key: 'e2', val: 0.52, label: 'E₂', on: 'bg-cyan-900/60 border-cyan-400', tc: 'text-cyan-300' },
                  { id: 'SOC', code: 'SOC (suelo)', title: 'Materia orgánica', key: 'e3', val: 0.63, label: 'E₃', on: 'bg-amber-900/60 border-amber-400', tc: 'text-amber-300' },
                  { id: 'NBR', code: 'NBR', title: 'Daño por fuego', key: 'e4', val: 0.65, label: 'E₄', on: 'bg-rose-900/60 border-rose-400', tc: 'text-rose-300' }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => bandInject(b.id, b.key, b.val)}
                    aria-pressed={activeBand === b.id}
                    className={`p-2 rounded-lg border text-left transition-all ${activeBand === b.id ? `${b.on} text-white` : 'bg-[#081013] border-slate-700/60 text-slate-300 hover:text-white'}`}
                  >
                    <div className={`text-xs font-mono font-bold ${b.tc}`}>{b.code}</div>
                    <div className="text-xs font-semibold">{b.title}</div>
                    <div className="text-xs text-slate-300 font-mono">{b.label}: {e[b.key].toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Shocks */}
            <div className="mt-4 pt-3 border-t border-emerald-500/15">
              <span className="text-xs font-mono text-slate-200 flex items-center gap-1.5 mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Probar un escenario de estrés (puedes volver al estado anterior):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  ['normal', 'Condición actual', 'bg-emerald-950 border-emerald-500 text-emerald-200'],
                  ['megadrought', 'Megasequía (agua baja a 0,28)', 'bg-cyan-950 border-cyan-500 text-cyan-200'],
                  ['puelche', 'Viento puelche fuerte (resiliencia baja a 0,32)', 'bg-rose-950 border-rose-500 text-rose-200']
                ].map(([id, label, on]) => (
                  <button
                    key={id}
                    onClick={() => handleBasinShockChange(id)}
                    aria-pressed={basinShock === id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${basinShock === id ? `${on} font-bold` : 'bg-[#081013] border-slate-700 text-slate-300 hover:text-white'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LENTE 2: EL PANAL */}
        {(activeLens === 'both' || activeLens === 'vecinal') && (
          <div className={`${activeLens === 'both' ? 'lg:col-span-6' : 'lg:col-span-12'} bg-[#0B1518]/90 border border-amber-500/20 rounded-xl p-4`}>
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/15">
              <div className="flex items-center gap-2">
                <Hexagon className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase font-bold text-amber-300">El Panal (vecindario)</span>
              </div>
              <span className="text-xs font-mono text-slate-300">
                Amortiguación κ: <strong className="text-amber-300">{kappa.toFixed(2)}</strong>
              </span>
            </div>

            <div className="mt-3 bg-[#070D10] rounded-xl p-3 border border-amber-500/20">
              <div className="text-xs font-mono text-amber-300/90 mb-1">
                5 COMITÉS DE AGUA POTABLE RURAL + PREDIO ANCLA{' '}
                <span className="text-slate-400">({live && live.aprs.length ? 'nombres y familias de AgriTwin' : 'esquema, sin datos de población'})</span>
              </div>

              <svg viewBox="0 0 400 215" className="w-full h-52" role="img" aria-label="Tablero hexagonal con el predio ancla y cinco comités de agua potable rural">
                <ellipse
                  cx="200" cy="110" rx="185" ry="95" fill="none"
                  stroke={pacts.firebreakDAO ? '#10b981' : '#f43f5e'}
                  strokeWidth={pacts.firebreakDAO ? '4' : '2'}
                  strokeDasharray={pacts.firebreakDAO ? 'none' : '5 5'}
                  opacity="0.8"
                />
                <text x="200" y="14" fill={pacts.firebreakDAO ? '#34d399' : '#fb7185'} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  {pacts.firebreakDAO ? '✓ Faja cortafuegos activa (pacto)' : '⚠ Sin faja cortafuegos (pacto apagado)'}
                </text>

                {/* Predio ancla */}
                <g onClick={() => setSelectedHex('meniel')} className="cursor-pointer" role="button" aria-label="Predio ancla Fundo Meniel">
                  <polygon points={hexPoints(200, 105)} fill="#065f46" stroke="#34d399" strokeWidth={selectedHex === 'meniel' ? '3' : '1.5'} />
                  <text x="200" y="103" fill="#ffffff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Fundo Meniel</text>
                  <text x="200" y="115" fill="#a7f3d0" fontSize="8" fontFamily="monospace" textAnchor="middle">predio ancla</text>
                </g>

                {aprs.map((a) => {
                  const st = STATUS_STYLE[a.status] || STATUS_STYLE.normal;
                  const [cx, cy] = a.center;
                  return (
                    <g key={a.key} onClick={() => setSelectedHex(a.key)} className="cursor-pointer" role="button" aria-label={`Comité de agua ${a.name}`}>
                      <polygon points={hexPoints(cx, cy)} fill={st.fill} stroke={st.stroke} strokeWidth={selectedHex === a.key ? '3' : '1.5'} />
                      <text x={cx} y={cy - 2} fill="#ffffff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">{short(a.name)}</text>
                      <text x={cx} y={cy + 10} fill="#bae6fd" fontSize="8" fontFamily="monospace" textAnchor="middle">
                        {a.families != null ? `${a.families} familias` : 'sin dato'}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="mt-2 p-2 bg-[#0A1417] rounded border border-amber-500/20 text-xs">
                <span className="text-slate-300">Nodo elegido: </span>
                <strong className="text-amber-300 font-serif">
                  {selectedHex === 'meniel' ? 'Fundo Meniel (predio ancla)' : `Comité ${selectedApr?.name}`}
                </strong>
                {selectedHex !== 'meniel' && selectedApr?.isLive && (
                  <span className="text-slate-200">
                    {' '}· {STATUS_STYLE[selectedApr.status]?.label || selectedApr.status}
                    {selectedApr.depthM != null && ` · pozo a ${selectedApr.depthM} m`}
                  </span>
                )}
                {selectedHex !== 'meniel' && !selectedApr?.isLive && (
                  <span className="text-slate-400"> · conéctate a AgriTwin para ver su estado</span>
                )}
              </div>
            </div>

            {/* Pactos */}
            <div className="mt-4">
              <span className="text-xs font-mono text-slate-200 block mb-1">
                🤝 Acuerdos vecinales (cada uno suma amortiguación κ)
              </span>
              <p className="text-xs text-amber-300/90 mb-2">
                Los aportes (+0,16 / +0,21 / +0,15) son supuestos de ejemplo, aún sin calibrar con casos reales.
              </p>
              <div className="space-y-2">
                {[
                  { key: 'keylineAPR', Icon: Droplet, title: 'Tranque Keyline recarga los pozos de los comités', desc: 'Más agua para las familias (sube S₁ y E₂)', color: 'cyan', gain: '+0.16' },
                  { key: 'firebreakDAO', Icon: ShieldCheck, title: 'Faja cortafuegos de 45 m acordada por los vecinos', desc: 'Protege la interfaz con el bosque (sube E₄ y S₄)', color: 'emerald', gain: '+0.21' },
                  { key: 'p2pEnergyRewild', Icon: Zap, title: 'Intercambio de energía solar y corredor de biodiversidad', desc: 'Economía local más diversa (sube K₁ y K₄)', color: 'amber', gain: '+0.15' }
                ].map(({ key, Icon, title, desc, color, gain }) => (
                  <button
                    key={key}
                    onClick={() => togglePact(key)}
                    aria-pressed={pacts[key]}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                      pacts[key] ? PACT_COLORS[color].on : 'bg-[#081013] border-slate-700 opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 shrink-0 ${pacts[key] ? PACT_COLORS[color].icon : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-bold text-slate-100">{title}</div>
                        <div className="text-xs text-slate-300">{desc}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-mono font-bold shrink-0 ${pacts[key] ? PACT_COLORS[color].text : 'text-slate-500'}`}>
                      {pacts[key] ? `${gain} κ` : 'apagado'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-5 pt-3 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 font-mono">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Estas pantallas alimentan las 12 variables de HOMBROS y la amortiguación κ = <strong className="text-emerald-300">{kappa.toFixed(2)}</strong></span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs px-3 py-1 rounded bg-[#16272C] hover:bg-[#1E353C] text-emerald-300 border border-emerald-500/30 transition-all font-mono"
        >
          Volver al caso de ejemplo Longaví
        </button>
      </div>
    </div>
  );
}
