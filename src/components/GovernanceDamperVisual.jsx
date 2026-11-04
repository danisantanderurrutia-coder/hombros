import React from 'react';
import { ShieldCheck, Sliders, Cpu, Sparkles, HelpCircle } from 'lucide-react';

/**
 * GovernanceDamperVisual
 * 
 * Figura visual interactiva tipo "Amortiguador de Cuenca" (Damper / Shock Absorber).
 * Permite seleccionar el modo de aproximación para kappa (κ):
 * 1. 'ostrom_governance': Parametrizado endógeno f(S1, S2, K3).
 * 2. 'empirical_benchmark': Preset territorial calibrado.
 * 3. 'pacts_additive': Acumulación por pactos vecinales de El Panal.
 * 4. 'manual_slider': Hipótesis libre con deslizador.
 * 
 * Visualiza el porcentaje de estrés disipado y la expansión de la capacidad portante:
 * H_efectiva = H * (1 + κ).
 */
export default function GovernanceDamperVisual({
  kappa,
  onKappaChange,
  kappaMode = 'manual_slider',
  onKappaModeChange,
  endogenousKappa = 0.42,
  benchmarkKappa = 0.38,
  pactsKappa = 0.52,
  sigmaBaseline = 0.45
}) {
  // Cálculo de mitigación física: cuánto absorbe el amortiguador frente a kappa = 0
  const unbufferedSigma = sigmaBaseline * (1 + kappa);
  const stressAbsorptionPct = Math.round((kappa / (1 + kappa)) * 100);

  // Dimensiones del pistón/resorte en el SVG en función de kappa (0.05 a 0.75)
  // Mayor kappa = Resorte más robusto y pistón de disipación hidráulica más ancho
  const damperCompression = Math.max(15, Math.min(85, Math.round(kappa * 100)));
  const damperColor = kappa < 0.20 ? '#f43f5e' : kappa < 0.40 ? '#f59e0b' : '#10b981';

  return (
    <div className="p-4 rounded-2xl bg-[#091216] border border-emerald-500/30 text-slate-100 font-mono text-xs space-y-3.5 shadow-xl">
      {/* Encabezado con selector de Modo de Aproximación */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-emerald-500/20 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-emerald-300 uppercase tracking-wide">
            Amortiguador Policéntrico (κ = {kappa.toFixed(2)})
          </span>
        </div>

        {/* Selector de Aproximación Metodológica */}
        <div className="flex flex-wrap gap-1 text-[10px]" role="group" aria-label="Aproximación de kappa">
          {[
            { id: 'ostrom_governance', label: 'Ecuación Ostrom f(S₁,S₂,K₃)', val: endogenousKappa },
            { id: 'empirical_benchmark', label: 'Benchmark Calibrado', val: benchmarkKappa },
            { id: 'pacts_additive', label: 'Pactos Panal', val: pactsKappa },
            { id: 'manual_slider', label: 'Manual / Hipótesis', val: null }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                onKappaModeChange(mode.id);
                if (mode.val !== null) onKappaChange(mode.val);
              }}
              className={`px-2 py-1 rounded-lg border transition-all ${
                kappaMode === mode.id
                  ? 'bg-emerald-700 text-white font-bold border-emerald-400 shadow-sm'
                  : 'bg-black/50 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Visualizador SVG del Amortiguador vs. Deslizador / Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* SVG Diagrama del Amortiguador y Resorte (Shock Absorber) */}
        <div className="md:col-span-5 bg-black/60 p-2.5 rounded-xl border border-emerald-500/20 flex flex-col items-center">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between w-full">
            <span>Disipación Mecánica</span>
            <strong className="text-emerald-400">-{stressAbsorptionPct}% Carga</strong>
          </div>

          <svg viewBox="0 0 160 120" className="w-36 h-28" role="img" aria-label="Diagrama del resorte y pistón de amortiguación territorial">
            <defs>
              <linearGradient id="fluidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={damperColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Placa superior de carga (Presión D) */}
            <rect x="25" y="10" width="110" height="8" rx="2" fill="#94a3b8" />
            <text x="80" y="8" fill="#cbd5e1" fontSize="7" textAnchor="middle" fontFamily="monospace">
              Presión de Desarrollo (D)
            </text>

            {/* Vástago del pistón central */}
            <rect x="76" y="18" width="8" height="30" fill="#cbd5e1" />

            {/* Resorte lateral (Elasticidad de Cuenca H) */}
            <path
              d="M 40 18 L 48 26 L 36 34 L 48 42 L 36 50 L 48 58 L 40 66"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text x="32" y="44" fill="#7dd3fc" fontSize="6.5" textAnchor="end" fontFamily="monospace">H</text>

            {/* Cilindro Amortiguador Hidráulico (Gobernanza κ) */}
            <rect x="62" y="48" width="36" height="52" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            
            {/* Nivel de fluido viscoso amortiguador (crece con kappa) */}
            <rect
              x="64"
              y={100 - (damperCompression * 0.48)}
              width="32"
              height={damperCompression * 0.48}
              rx="2"
              fill="url(#fluidGrad)"
            />

            {/* Cabeza del pistón dentro del cilindro */}
            <rect x="65" y={48 + (15 * (1 - kappa))} width="30" height="5" fill="#f8fafc" />

            {/* Resorte derecho */}
            <path
              d="M 120 18 L 112 26 L 124 34 L 112 42 L 124 50 L 112 58 L 120 66"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text x="128" y="44" fill="#7dd3fc" fontSize="6.5" textAnchor="start" fontFamily="monospace">H</text>

            {/* Placa base (Soporte Biofísico) */}
            <rect x="25" y="104" width="110" height="8" rx="2" fill="#475569" />
            <text x="80" y="117" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">
              Tensión Resultante σ = D / [H·(1+κ)]
            </text>
          </svg>
        </div>

        {/* Deslizador Interactivo & Explicación Conceptual */}
        <div className="md:col-span-7 space-y-2.5">
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300">
                Coeficiente κ ({kappaMode === 'ostrom_governance' ? 'Parametrizado Ostrom' : kappaMode === 'pacts_additive' ? 'Pactos El Panal' : kappaMode === 'empirical_benchmark' ? 'Benchmark' : 'Hipótesis Libre'}):
              </span>
              <strong className="text-emerald-300 text-sm">{kappa.toFixed(2)}</strong>
            </div>

            <input
              type="range"
              min="0.05"
              max="0.75"
              step="0.01"
              value={kappa}
              onChange={(e) => {
                onKappaModeChange('manual_slider');
                onKappaChange(parseFloat(e.target.value));
              }}
              className="w-full accent-emerald-400 cursor-pointer h-2"
              aria-label="Deslizador del coeficiente de amortiguación kappa"
            />

            <div className="flex justify-between text-[9px] text-slate-400 pt-0.5">
              <span>0.05: Atomizado (Frágil)</span>
              <span className="text-amber-300">Ostrom calc: {endogenousKappa.toFixed(2)}</span>
              <span>0.75: Máxima Red Vecinal</span>
            </div>
          </div>

          {/* Comparación directa de tensión con vs. sin amortiguador */}
          <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Sin Organización (κ=0):</span>
              <strong className="text-rose-400">σ = {unbufferedSigma.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Con Tejido Vecinal (κ={kappa.toFixed(2)}):</span>
              <strong className="text-emerald-300">σ = {sigmaBaseline.toFixed(2)}</strong>
            </div>
          </div>

          <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
            <strong>¿Qué refleja esta figura?</strong> La gobernanza policéntrica no reduce la demanda física de un megaproyecto ni aumenta mágicamente el agua, sino que <strong>amortigua mecánicamente el golpe</strong> disipando la tensión social y distribuyendo los turnos y cortafuegos en red.
          </p>
        </div>
      </div>
    </div>
  );
}
