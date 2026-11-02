import React, { useState } from 'react';
import { Users, Trees, Coins, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Layers } from 'lucide-react';

export default function ThreeShouldersBreakdown({ santanderState, territory }) {
  const [expandedShoulder, setExpandedShoulder] = useState('ambiental');

  const { S, E, K, H, hasCriticalShoulder, criticalDetails, currentVars } = santanderState;

  const toggleShoulder = (id) => {
    setExpandedShoulder(prev => prev === id ? null : id);
  };

  const shoulders = [
    {
      id: 'social',
      name: 'Hombro Social (S)',
      val: S,
      icon: Users,
      cardClass: 'card-rose',
      textColor: 'text-[#DA7B93]',
      badgeBg: 'bg-[#301b24] text-[#DA7B93] border-[#DA7B93]/40',
      description: 'Cohesión comunitaria, instituciones locales, capital humano y ausencia de violencia estructural.',
      variables: [
        { key: 's1', name: 'Cohesión Social (S₁)', val: currentVars.s1, desc: 'Confianza comunitaria + organización territorial activa', source: 'Comunidad / CASEN' },
        { key: 's2', name: 'Capacidad Institucional (S₂)', val: currentVars.s2, desc: 'Eficiencia presupuestaria municipal + participación local', source: 'SINIM / SUBDERE' },
        { key: 's3', name: 'Capital Humano (S₃)', val: currentVars.s3, desc: 'Años de escolaridad promedio + cobertura de salud básica', source: 'CASEN / MINEDUC' },
        { key: 's4', name: 'Ausencia de Violencia (S₄)', val: currentVars.s4, desc: 'Inverso de índice de conflicto y exclusión territorial', source: 'Seguridad / Territorio' }
      ]
    },
    {
      id: 'ambiental',
      name: 'Hombro Ambiental (E)',
      val: E,
      icon: Trees,
      cardClass: 'card-teal',
      textColor: 'text-[#376E6F]',
      badgeBg: 'bg-[#173132] text-[#376E6F] border-[#376E6F]/40',
      description: 'Integridad ecosistémica, disponibilidad hídrica por cuenca, suelo vivo y resiliencia climática.',
      variables: [
        { key: 'e1', name: 'Integridad Ecosistémica (E₁)', val: currentVars.e1, desc: 'Cobertura de bosque nativo esclerófilo / superficie total', source: 'CONAF / Catastro' },
        { key: 'e2', name: 'Disponibilidad Hídrica (E₂)', val: currentVars.e2, desc: 'm³/persona/año normalizado por cuenca hidrográfica', source: 'DGA / Aguas' },
        { key: 'e3', name: 'Calidad de Suelo (E₃)', val: currentVars.e3, desc: 'Inverso de tasa de pérdida de cobertura y erosión %/año', source: 'CIREN / SAG' },
        { key: 'e4', name: 'Resiliencia Climática (E₄)', val: currentVars.e4, desc: 'Inverso de exposición a marejadas, sequías e incendios', source: 'SHOA / SENAPRED' }
      ]
    },
    {
      id: 'economico',
      name: 'Hombro Económico (K)',
      val: K,
      icon: Coins,
      cardClass: 'card-indigo',
      textColor: 'text-[#8D69A6]',
      badgeBg: 'bg-[#261c46] text-[#8D69A6] border-[#44318D]/50',
      description: 'Diversificación productiva, autonomía de ingreso, distribución justa y equilibrio regenerativo.',
      variables: [
        { key: 'k1', name: 'Diversificación Productiva (K₁)', val: currentVars.k1, desc: 'Inverso del Índice Herfindahl-Hirschman sectorial', source: 'SII / Economía' },
        { key: 'k2', name: 'Autonomía Económica (K₂)', val: currentVars.k2, desc: '% ingresos propios locales / ingresos totales municipales', source: 'SINIM / Municipal' },
        { key: 'k3', name: 'Distribución del Ingreso (K₃)', val: currentVars.k3, desc: '1 − Gini comunal (medida de equidad interna)', source: 'CASEN' },
        { key: 'k4', name: 'Balance Biótico (K₄)', val: currentVars.k4, desc: 'min(1, tasa regenerativa / tasa extractiva)', source: 'Balance Metabólico' }
      ]
    }
  ];

  return (
    <div className="rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl card-magenta">
      {/* Header with Geometric Mean Formula */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-[#2A1B3D] border-[#D83F87]/40 text-[#D83F87] shadow-sm">
            Nivel 2 & 3: Los Tres Hombros y Media Geométrica
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight mt-2 text-white flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#D83F87]" />
            Capacidad de Carga Estructural: H = (S · E · K)<sup>1/3</sup>
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            <strong>Principio de No-Compensación:</strong> Si un pilar se extingue (ej. sequía hídrica extrema $E \to 0$), la capacidad portante total $H$ se desploma de inmediato. El capital fiduciario ($K$) no puede sustituir a un acuífero destruido ni a una comunidad fracturada.
          </p>
        </div>

        {/* Global H Indicator */}
        <div className="p-4 rounded-2xl border border-white/10 bg-[#160b24]/90 shadow-xl shrink-0 font-mono text-center min-w-[170px]">
          <span className="block text-[10px] text-[#A4B3B6] uppercase tracking-wider font-bold">Capacidad Portante H</span>
          <span className="text-3xl font-serif font-black text-white">{H.toFixed(2)}</span>
          <span className="block text-[10px] text-[#DA7B93] mt-0.5 font-bold">
            {hasCriticalShoulder ? '⚠️ ESTADO CRÍTICO' : '✓ EQUILIBRIO BIOFÍSICO'}
          </span>
        </div>
      </div>

      {/* 3 Distinct Shoulders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shoulders.map(sh => {
          const Icon = sh.icon;
          const isExpanded = expandedShoulder === sh.id;
          const isCritical = sh.val < 0.25;

          return (
            <div 
              key={sh.id}
              className={`rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between ${sh.cardClass} ${
                isCritical ? 'ring-2 ring-rose-500 shadow-rose-950/50' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#140b20]/80 border border-white/10">
                      <Icon className={`w-5 h-5 ${sh.textColor}`} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">
                        {sh.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Índice Normalizado [0 - 1]
                      </span>
                    </div>
                  </div>
                  
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${sh.badgeBg}`}>
                    {sh.val.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                  {sh.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical ? 'bg-rose-500' : 'bg-gradient-to-r from-white/40 to-white'
                      }`}
                      style={{ width: `${Math.round(sh.val * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Collapsible details for the 4 internal variables */}
                {isExpanded && (
                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                    {sh.variables.map(v => (
                      <div key={v.key} className="p-2.5 rounded-xl bg-black/30 border border-white/10 font-mono">
                        <div className="flex justify-between items-center text-[11px] mb-0.5">
                          <span className="font-bold text-white">{v.name}</span>
                          <span className={sh.textColor}>{v.val?.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans leading-tight">
                          {v.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleShoulder(sh.id)}
                className="mt-4 pt-2.5 border-t border-white/10 text-[11px] font-mono text-slate-300 hover:text-white flex items-center justify-between w-full transition-colors"
              >
                <span>{isExpanded ? 'Ocultar 4 Variables' : 'Ver 4 Variables Detalladas'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
