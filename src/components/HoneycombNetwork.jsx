import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, ArrowRight, ShieldCheck, ArrowLeftRight, Check, X, RefreshCw, Sparkles, Activity } from 'lucide-react';
import { evaluateTerritoryState, validateIntercellTrade } from '../models/mechanics';
import { getAssetUrl } from '../utils/assets';

export default function HoneycombNetwork({ territories, globalModifiers }) {
  const territoryStates = {};
  territories.forEach(t => {
    territoryStates[t.id] = evaluateTerritoryState(t, globalModifiers);
  });

  const [originId, setOriginId] = useState(territories[0].id);
  const [destinationId, setDestinationId] = useState(territories[1].id);
  const [selectedGoodId, setSelectedGoodId] = useState('');
  const [quantity, setQuantity] = useState(50);
  const [tradeLogs, setTradeLogs] = useState([
    {
      id: 1,
      timestamp: 'Reciente',
      origin: 'Chanco (Maule)',
      destination: 'Valle de Aconcagua (Valparaíso)',
      item: 'Legumbres de Secano',
      quantity: '40 ton',
      status: 'approved',
      reason: 'Intercambio Sintrópico Aprobado (Excedente no extractivo verificado)'
    }
  ]);
  const [lastValidation, setLastValidation] = useState(null);

  const originTerritory = territories.find(t => t.id === originId) || territories[0];
  const destinationTerritory = territories.find(t => t.id === destinationId) || territories[1];
  const originState = territoryStates[originId];
  const destinationState = territoryStates[destinationId];

  const availableGoods = originTerritory.tradableSurplus || [];
  const activeGood = availableGoods.find(g => g.id === selectedGoodId) || availableGoods[0];

  const handleExecuteTrade = () => {
    if (!activeGood) return;

    const validation = validateIntercellTrade(
      originTerritory,
      destinationTerritory,
      activeGood,
      quantity,
      originState,
      destinationState
    );

    setLastValidation(validation);

    const newLog = {
      id: Date.now(),
      timestamp: 'Ahora',
      origin: originTerritory.name,
      destination: destinationTerritory.name,
      item: activeGood.name,
      quantity: `${quantity} ${activeGood.unit}`,
      status: validation.allowed ? 'approved' : 'blocked',
      reason: validation.reason
    };
    setTradeLogs(prev => [newLog, ...prev.slice(0, 5)]);
  };

  const statusThemes = {
    green: {
      card: 'card-teal text-white',
      dot: 'bg-[#376E6F] shadow-[0_0_8px_#376E6F]',
      badge: 'bg-[#173132] border-[#376E6F]/60 text-[#376E6F]'
    },
    amber: {
      card: 'card-rose text-white',
      dot: 'bg-[#DA7B93] shadow-[0_0_8px_#DA7B93]',
      badge: 'bg-[#301b24] border-[#DA7B93]/60 text-[#DA7B93]'
    },
    red: {
      card: 'card-plum text-white',
      dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]',
      badge: 'bg-rose-950/80 border-rose-500/60 text-rose-300'
    },
    black: {
      card: 'card-slate text-stone-300',
      dot: 'bg-stone-500',
      badge: 'bg-stone-900 border-stone-700 text-stone-400'
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md relative border border-[#D4C9B8]">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51]" />
        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-[#487075]/10 border border-[#487075]/30 text-[#487075] shadow-xs">
                <Hexagon className="w-6 h-6 text-[#487075]" />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-[#487075]/10 text-[#487075] border-[#487075]/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#487075] animate-ping" />
                Red Federada P2P Metabólica
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 flex items-center gap-3">
              El Panal <span className="text-[#C86D51] font-mono text-xl">· Intercambio Sintrópico Territorial</span>
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
              Coordinación biofísica descentralizada entre células territoriales. 
              <strong className="text-[#C86D51] font-semibold"> Regla de oro:</strong> Ningún territorio puede exportar flujos que comprometan la base de sus propios hombros de sustento. El comercio se restringe estrictamente al excedente regenerativo.
            </p>
          </div>

          <div className="bg-[#FAF7F0] border border-[#D4C9B8] px-4 py-3 rounded-2xl text-slate-800 text-xs font-mono shrink-0 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Activity className="w-4 h-4 text-[#487075] animate-pulse" />
              <span>Validación Termodinámica</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500 text-[11px]">Estado:</span>
              <span className="text-[#1B4332] font-bold">P2P ACTIVO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Topology Visualizer */}
      <div className="card-slate rounded-3xl p-6 shadow-md border border-[#D4C9B8]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs uppercase tracking-wider font-mono font-bold flex items-center gap-2 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full inline-block bg-[#487075] shadow-[0_0_8px_#487075] animate-pulse" />
            Topología de Celdas Activas en el Panal
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            {territories.length} Celdas Telemonitoreadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {territories.map(t => {
            const st = territoryStates[t.id];
            const theme = statusThemes[st.regime] || statusThemes.green;
            const isOrigin = t.id === originId;
            const isDest = t.id === destinationId;

            return (
              <div 
                key={t.id}
                className={`relative rounded-2xl border p-4 transition-all duration-300 ${theme.card} ${
                  isOrigin ? 'ring-2 ring-emerald-400 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]' : ''
                } ${
                  isDest ? 'ring-2 ring-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${theme.dot}`} />
                    <h4 className="font-bold text-sm font-serif text-white">
                      {t.name}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${theme.badge}`}>
                    {st.regime}
                  </span>
                </div>

                <p className="text-xs line-clamp-2 mb-3 text-slate-400">
                  {t.tag}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono p-2.5 rounded-xl border bg-bio-void/60 border-emerald-500/20">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tensión (σ)</span>
                    <span className="font-bold text-white">{st.sigma} <span className="text-slate-500">/ {t.materialProperties.yieldStress}</span></span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Excedente Seguro</span>
                    <span className={st.isExportViable ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {st.isExportViable ? '✓ HABILITADO' : '✗ BLOQUEADO'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {isOrigin && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                        EMISOR
                      </span>
                    )}
                    {isDest && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                        RECEPTOR
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setOriginId(t.id)}
                      disabled={isDest}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg border bg-bio-surface hover:bg-emerald-950/40 text-slate-200 border-emerald-500/30 disabled:opacity-30 transition"
                    >
                      Emisor
                    </button>
                    <button
                      onClick={() => setDestinationId(t.id)}
                      disabled={isOrigin}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg border bg-bio-surface hover:bg-cyan-950/40 text-slate-200 border-cyan-500/30 disabled:opacity-30 transition"
                    >
                      Receptor
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trade Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-6 space-y-4 shadow-md border border-[#D4C9B8]">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-[#28475A]" />
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-[#28475A]">
              Consola de Intercambio Biofísico
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl border bg-[#FAF7F0] border-[#D4C9B8]">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Emisor (Origen)</span>
              <strong className="text-sm font-semibold font-serif text-[#C86D51]">
                {originTerritory.name}
              </strong>
              <div className="text-[11px] font-mono mt-0.5 text-slate-600">
                Estado: <span className="capitalize text-slate-800">{originState.regime}</span> (σ = {originState.sigma})
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Receptor (Destino)</span>
              <strong className="text-sm font-semibold font-serif text-[#487075]">
                {destinationTerritory.name}
              </strong>
              <div className="text-[11px] font-mono mt-0.5 text-slate-600">
                Estado: <span className="capitalize text-slate-800">{destinationState.regime}</span> (σ = {destinationState.sigma})
              </div>
            </div>
          </div>

          {/* Good selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium block text-slate-700">
              Bien o Excedente Sintrópico a Transferir
            </label>
            <select
              value={selectedGoodId || (activeGood ? activeGood.id : '')}
              onChange={(e) => setSelectedGoodId(e.target.value)}
              className="w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border bg-white border-[#D4C9B8] text-slate-800 font-mono shadow-xs focus:border-[#487075]"
            >
              {availableGoods.map(g => (
                <option key={g.id} value={g.id} className="bg-white text-slate-800">
                  {g.name} ({g.category}) · Base: {g.baseSurplus} {g.unit}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="space-y-2 p-4 rounded-2xl border bg-[#FAF7F0] border-[#D4C9B8]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-slate-700">Volumen del Intercambio</span>
              <span className="font-mono font-bold text-[#28475A]">
                {quantity} {activeGood?.unit || 'unidades'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max={activeGood ? activeGood.baseSurplus * 2 : 200}
              step="5"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-[#28475A]"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleExecuteTrade}
            className="w-full font-serif font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all duration-200 bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#376E6F] hover:brightness-110 text-white"
          >
            <ShieldCheck className="w-4 h-4 text-white" />
            Evaluar con el Guardián Biofísico & Ejecutar
          </button>

          {/* Result Box */}
          {lastValidation && (
            <div className={`p-4 rounded-2xl border transition-all ${
              lastValidation.allowed
                ? 'bg-[#173132] border-[#376E6F] text-white'
                : 'bg-rose-950/80 border-rose-500 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide mb-1 font-mono">
                {lastValidation.allowed ? <Check className="w-4 h-4 text-[#376E6F]" /> : <X className="w-4 h-4 text-rose-400" />}
                {lastValidation.reason}
              </div>
              <p className="text-xs leading-relaxed text-slate-200">
                {lastValidation.details}
              </p>
            </div>
          )}
        </div>

        {/* Trade Ledger */}
        <div className="lg:col-span-5 card-slate rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold mb-3 flex items-center gap-2 text-[#A4B3B6]">
              <RefreshCw className="w-3.5 h-3.5 text-[#A4B3B6]" />
              Libro Mayor de Intercambios
            </h3>
            
            <div className="space-y-2.5">
              {tradeLogs.map(log => (
                <div 
                  key={log.id} 
                  className="p-3.5 rounded-2xl text-xs space-y-1.5 border bg-black/40 border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold font-serif text-white">
                      {log.item}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      log.status === 'approved' 
                        ? 'bg-[#173132] text-[#376E6F] border border-[#376E6F]/60' 
                        : 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                    }`}>
                      {log.status === 'approved' ? '✓ APROBADO' : '✗ BLOQUEADO'}
                    </span>
                  </div>
                  <div className="text-[11px] flex items-center gap-1.5 font-mono text-slate-400">
                    <span className="text-[#DA7B93]">{log.origin.split(' ')[0]}</span>
                    <ArrowRight className="w-3 h-3 text-[#A4B3B6]" />
                    <span className="text-[#376E6F]">{log.destination.split(' ')[0]}</span>
                    <span className="text-slate-500 font-mono">({log.quantity})</span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    {log.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-2xl border text-[11px] bg-black/50 border-white/10 text-slate-300 font-mono">
            💠 <em>Los intercambios aprobados liquidan créditos mutuos territoriales indexados a horas de regeneración metabólica y balance de biomasa, impidiendo el drenaje colonial y el endeudamiento fiduciario.</em>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
