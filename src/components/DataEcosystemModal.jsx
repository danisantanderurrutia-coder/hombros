import React, { useState } from 'react';
import { Database, ExternalLink, Layers, CheckCircle2, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function DataEcosystemModal() {
  const { isAtlas } = useTheme();
  const [selectedSource, setSelectedSource] = useState('conaf');

  const sources = [
    {
      id: 'conaf',
      name: 'CONAF · Catastro Vegetacional',
      tag: 'Hombro Ambiental (E₁)',
      icon: '🌲',
      vars: ['Cobertura de bosque nativo', 'Superficie de plantaciones de pino/eucalipto', 'Pérdida de biomasa por incendios'],
      freq: 'Actualización periódica / Catastro de Uso del Suelo',
      desc: 'Permite calcular la integridad ecosistémica (E₁) midiendo la relación entre bosque esclerófilo nativo remanente y monocultivos forestales exóticos.'
    },
    {
      id: 'dga',
      name: 'DGA · Dirección General de Aguas',
      tag: 'Hombro Ambiental (E₂)',
      icon: '💧',
      vars: ['Caudales de cuencas hidrográficas', 'Disponibilidad hídrica per cápita (m³/año)', 'Decretos de escasez hídrica'],
      freq: 'Monitoreo mensual de pozos y estaciones fluviométricas',
      desc: 'Aporta los datos para evaluar el estrés del acuífero (E₂), comparando la recarga natural con los derechos de aprovechamiento de agua otorgados.'
    },
    {
      id: 'casen',
      name: 'CASEN · Encuesta de Caracterización Socioeconómica',
      tag: 'Hombro Social & Económico (S₃, K₃)',
      icon: '👥',
      vars: ['Escolaridad promedio', 'Acceso a salud', 'Coeficiente de Gini comunal (Distribución del ingreso)'],
      freq: 'Bianual / Trienal por Ministerio de Desarrollo Social',
      desc: 'Provee la métrica de capital humano (S₃) y el indicador de equidad distributiva 1 − Gini (K₃) sin caer en la trampa reduccionista de la pobreza como mera carencia de ingresos.'
    },
    {
      id: 'sinim',
      name: 'SINIM · Sistema Nacional de Información Municipal',
      tag: 'Hombro Social & Económico (S₂, K₂)',
      icon: '🏛️',
      vars: ['Autonomía de ingresos propios vs Fondo Común Municipal', 'Eficiencia del gasto municipal', 'Presupuesto per cápita'],
      freq: 'Anual por SUBDERE',
      desc: 'Permite medir qué tan autónoma es la economía local (K₂) y cuál es la capacidad institucional de autogobierno del municipio (S₂).'
    },
    {
      id: 'sii',
      name: 'SII · Servicio de Impuestos Internos',
      tag: 'Hombro Económico (K₁)',
      icon: '📊',
      vars: ['Facturación por rubro económico', 'Número de empresas por sector', 'Índice de Herfindahl-Hirschman'],
      freq: 'Anual por estadísticas comunales de empresas',
      desc: 'Calcula la diversificación productiva (K₁). Revela si el territorio depende de un solo monocultivo extractivo o si cuenta con un tejido económico resiliente.'
    },
    {
      id: 'shoa',
      name: 'SHOA / SENAPRED · Gestión de Riesgos',
      tag: 'Hombro Ambiental (E₄)',
      icon: '🌊',
      vars: ['Cartas de inundación por tsunami (CITSU)', 'Mapas de remoción en masa e incendios forestales', 'Vulnerabilidad costera'],
      freq: 'Cartografía oficial de riesgo',
      desc: 'Determina la vulnerabilidad física y climática del borde costero y cuenca (E₄), alertando sobre amenazas externas recurrentes.'
    },
    {
      id: 'sentinel',
      name: 'Sentinel / Landsat · Teledetección Satelital',
      tag: 'Monitoreo Espacial Continuo',
      icon: '🛰️',
      vars: ['Índice de Vegetación de Diferencia Normalizada (NDVI)', 'Humedad de suelo (NDWI)', 'Evolución multitemporal de parcelas'],
      freq: 'Pasada cada 5 a 10 días',
      desc: 'Monitoreo en tiempo real de la tasa de degradación del suelo (E₃) y velocidad sintrópica (Γ), permitiendo auditar la recuperación biótica sin intermediarios burocráticos.'
    }
  ];

  const active = sources.find(s => s.id === selectedSource) || sources[0];

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 shadow-xl border ${
      isAtlas ? 'glass-panel-atlas' : 'greenhouse-panel'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-solarpunk-brass/25">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-amber-100 text-amber-900 border-amber-300">
            Ecosistema de Información Pública & Telemetría Satelital (Tier 1–3)
          </span>
          <h3 className={`text-xl font-bold tracking-tight mt-1 ${
            isAtlas ? 'font-serif text-atlas-ink' : 'font-serif text-solarpunk-leaf'
          }`}>
            Fuentes de Datos Reales para Calibrar los Hombros
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            El modelo no inventa datos teóricos: se nutre de los registros públicos del Estado de Chile y teledetección satelital
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-solarpunk-brass/35 text-stone-700 shadow-sm">
          <Database className="w-4 h-4 text-emerald-700" />
          <span>7 Fuentes Públicas Integradas</span>
        </div>
      </div>

      {/* Grid: Source pills vs Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Source selector column */}
        <div className="lg:col-span-5 space-y-2">
          {sources.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSource(s.id)}
              className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                s.id === selectedSource
                  ? 'bg-amber-100/90 border-amber-400 shadow-sm text-amber-950 font-bold'
                  : 'bg-white/80 border-stone-200 text-stone-700 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{s.icon}</span>
                <div>
                  <div className="text-xs font-serif leading-tight">{s.name}</div>
                  <span className="text-[9px] font-mono opacity-70 block">{s.tag}</span>
                </div>
              </div>
              <span className="text-xs text-stone-400">→</span>
            </button>
          ))}
        </div>

        {/* Source details panel */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white/95 border border-solarpunk-brass/35 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{active.icon}</span>
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-900">{active.name}</h4>
                  <span className="text-[10px] font-mono text-amber-800 font-semibold">{active.tag}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-600">
                Oficial Chile
              </span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed mt-3">
              {active.desc}
            </p>

            <div className="mt-4 space-y-2">
              <div className="text-[11px] font-mono font-bold text-stone-800 uppercase">
                Variables que alimenta en el Modelo:
              </div>
              <ul className="space-y-1">
                {active.vars.map((v, i) => (
                  <li key={i} className="text-xs text-stone-600 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-[10px] font-mono text-stone-500">
            <span>Frecuencia: {active.freq}</span>
            <span className="text-amber-800 font-semibold">Datos Abiertos del Estado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
