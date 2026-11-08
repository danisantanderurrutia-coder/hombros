import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, ExternalLink, Globe, Layers, Search, 
  Satellite, Server, ShieldCheck, CheckCircle2, ArrowRight,
  TrendingUp, Activity, Cpu, Sparkles, Filter
} from 'lucide-react';

export default function DataSourcesView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState('conaf');

  const sources = [
    // --- CHILEAN SOURCES ---
    {
      id: 'conaf',
      region: 'chile',
      category: 'ambiental',
      name: 'CONAF · Catastro Vegetacional',
      tag: 'Hombro Ambiental (E₁)',
      badge: '🇨🇱 Chile · Forestal',
      icon: '🌲',
      hombroTarget: 'E₁ (Integridad Ecosistémica)',
      vars: ['Cobertura de bosque nativo esclerófilo', 'Superficie de monocultivo pino/eucalipto', 'Pérdida de biomasa por incendios forestales'],
      freq: 'Actualización periódica / Catastro de Uso del Suelo',
      url: 'https://sit.conaf.cl',
      apiType: 'Geoportal WMS / Shapefiles',
      desc: 'Permite calcular con precisión la integridad ecosistémica (E₁) midiendo la relación de superficie entre bosque esclerófilo nativo remanente y monocultivos forestales exóticos que consumen las cabeceras de cuenca.'
    },
    {
      id: 'dga',
      region: 'chile',
      category: 'ambiental',
      name: 'DGA · Dirección General de Aguas',
      tag: 'Hombro Ambiental (E₂)',
      badge: '🇨🇱 Chile · Hídrico',
      icon: '💧',
      hombroTarget: 'E₂ (Disponibilidad Hídrica)',
      vars: ['Caudales de cuencas hidrográficas en tiempo real', 'Disponibilidad hídrica per cápita (m³/año)', 'Decretos de escasez hídrica y derechos de aprovechamiento'],
      freq: 'Monitoreo mensual de pozos y estaciones fluviométricas',
      url: 'https://snia.mop.gob.cl',
      apiType: 'Portal SNIA / Informes Hidrométricos',
      desc: 'Aporta los datos empíricos para evaluar el estrés del acuífero (E₂), comparando la recarga natural hidrológica con el sobre-otorgamiento de derechos consuntivos y el estrés de los comités de agua potable rural (APR).'
    },
    {
      id: 'sinca',
      region: 'chile',
      category: 'ambiental',
      name: 'SINCA / MMA · Calidad del Aire en Tiempo Real',
      tag: 'Hombro Ambiental & Presión (E₄, D₁)',
      badge: '🇨🇱 Chile · Atmosférico',
      icon: '🏭',
      hombroTarget: 'E₄ (Resiliencia Climática) & D₁ (Intensidad Tóxica)',
      vars: ['Dióxido de azufre (SO₂)', 'Material Particulado fino (MP2.5 y MP10)', 'Compuestos Orgánicos Volátiles (COVs) y ozono troposférico'],
      freq: 'Transmisión continua cada hora (Red en vivo)',
      url: 'https://sinca.mma.gob.cl',
      apiType: 'API REST Pública / Datos Abiertos',
      desc: 'Fundamental para la calibración de zonas de sacrificio como Quintero-Puchuncaví. Monitorea en vivo las estaciones de La Greda, Ventanas y Puchuncaví, alertando cuando los episodios de intoxicación superan los umbrales de emergencia.'
    },
    {
      id: 'retc',
      region: 'chile',
      category: 'presion',
      name: 'RETC / MMA · Registro de Emisiones y Contaminantes',
      tag: 'Presión Extractiva (D₁) & Scope 1',
      badge: '🇨🇱 Chile · Emisiones',
      icon: '⚠️',
      hombroTarget: 'D₁ (Presión Extractiva) & Scope 1 Territorial',
      vars: ['Emisiones directas de chimeneas industriales', 'Metales pesados vertidos al mar y suelos', 'Residuos peligrosos declarados'],
      freq: 'Declaración jurada anual obligatoria',
      url: 'https://retc.mma.gob.cl',
      apiType: 'Registro Oficial del Estado',
      desc: 'Base para estimar la carga de Scope 1 en enclaves industriales y mineros. Registra la transferencia de arsénico, plomo y mercurio generados por fundiciones y termoeléctricas.'
    },
    {
      id: 'casen',
      region: 'chile',
      category: 'social',
      name: 'CASEN · Encuesta Socioeconómica',
      tag: 'Hombro Social & Económico (S₃, K₃)',
      badge: '🇨🇱 Chile · Social',
      icon: '👥',
      hombroTarget: 'S₃ (Capital Humano) & K₃ (1 - Gini)',
      vars: ['Escolaridad promedio y alfabetización', 'Acceso a salud y previsión', 'Coeficiente de Gini comunal y distribución de ingresos'],
      freq: 'Bianual / Trienal por Ministerio de Desarrollo Social',
      url: 'https://observatorio.ministeriodesarrollosocial.gob.cl/encuesta-casen',
      apiType: 'Microdatos abiertos / Tabulados',
      desc: 'Provee la métrica de capital humano y saberes (S₃) y la distribución del ingreso 1 − Gini (K₃) sin caer en la trampa reduccionista de medir la pobreza únicamente como carencia de ingresos monetarios.'
    },
    {
      id: 'sinim',
      region: 'chile',
      category: 'economico',
      name: 'SINIM · Sistema Nacional de Información Municipal',
      tag: 'Hombro Social & Económico (S₂, K₂)',
      badge: '🇨🇱 Chile · Municipal',
      icon: '🏛️',
      hombroTarget: 'S₂ (Capacidad Institucional) & K₂ (Autonomía Fiscal)',
      vars: ['Ingresos propios municipales vs dependencia del Fondo Común (FCM)', 'Gasto social por habitante', 'Inversión pública comunal'],
      freq: 'Anual por SUBDERE',
      url: 'https://sinim.gov.cl',
      apiType: 'Portal de Reportes Estadísticos',
      desc: 'Permite medir con rigor el grado de autonomía financiera territorial (K₂) y la capacidad institucional del gobierno local (S₂) para implementar planes de contingencia y transición ecológica.'
    },
    {
      id: 'sii',
      region: 'chile',
      category: 'economico',
      name: 'SII · Servicio de Impuestos Internos',
      tag: 'Hombro Económico (K₁)',
      badge: '🇨🇱 Chile · Productivo',
      icon: '📊',
      hombroTarget: 'K₁ (Diversificación Productiva)',
      vars: ['Facturación de ventas por rubro económico', 'Número de empresas por sector productivo', 'Índice de Herfindahl-Hirschman comunal'],
      freq: 'Anual por Estadísticas Comunales de Empresas',
      url: 'https://www.sii.cl/sobre_el_sii/estadisticas_de_empresas.html',
      apiType: 'Datasets Abiertos XLSX/CSV',
      desc: 'Determina si la matriz económica del territorio es diversa y resiliente (red de cooperativas, pesca, agroecología) o si está monopolizada por una sola industria extractiva de pino o cobre.'
    },
    {
      id: 'ciren',
      region: 'chile',
      category: 'ambiental',
      name: 'CIREN · Centro de Información de Recursos Naturales',
      tag: 'Hombro Ambiental (E₃)',
      badge: '🇨🇱 Chile · Suelos',
      icon: '🌱',
      hombroTarget: 'E₃ (Calidad de Suelo Vivo)',
      vars: ['Clases de capacidad de uso de suelos agrícolas', 'Niveles de erosión actual y potencial', 'Aptitud agroclimática'],
      freq: 'Actualización por cuencas y regiones',
      url: 'https://www.ciren.cl',
      apiType: 'Visualizador IDE Minagri',
      desc: 'Aporta la cartografía agrológica para evaluar la degradación y erosión del suelo vivo (E₃), crucial en el Secano de Chanco y en los suelos erosionados de los cerros de Aconcagua.'
    },

    // --- INTERNATIONAL & EUROPEAN SOURCES ---
    {
      id: 'opendata_bcn',
      region: 'europe',
      category: 'urbano',
      name: 'Open Data BCN · Ajuntament de Barcelona',
      tag: 'Ecología Urbana & Superilles',
      badge: '🇪🇸 España · Barcelona',
      icon: '🏙️',
      hombroTarget: 'S₁ (Cohesión), E₁ (Verde Urbano) & Scope 1-3',
      vars: ['Aforos de tráfico y pacificación de calles', 'Consumo de agua por habitante y barrio', 'Calidad del aire en estaciones urbanas'],
      freq: 'Sensores en tiempo real y datasets diarios',
      url: 'https://opendata-ajuntament.barcelona.cat',
      apiType: 'API REST Abierta / Formato JSON/GeoJSON',
      desc: 'Datos abiertos de vanguardia que miden el impacto del modelo de Superilles (Superbloques) de Salvador Rueda, la densidad de verde por habitante y la respuesta ciudadana ante el calor extremo.'
    },
    {
      id: 'energinet_dk',
      region: 'europe',
      category: 'energia',
      name: 'Energinet DataHub (Dinamarca / CPH)',
      tag: 'Descarbonización Eléctrica & Scope 2',
      badge: '🇩🇰 Dinamarca · Copenhague',
      icon: '⚡',
      hombroTarget: 'K₂ (Autonomía) & Scope 2 (Grid Factor)',
      vars: ['Intensidad de carbono de la red eléctrica (g CO₂/kWh)', 'Generación eólica y solar en tiempo real', 'Emisiones de calor distrital CPH 2025'],
      freq: 'Actualización en vivo cada 5 minutos',
      url: 'https://en.energinet.dk',
      apiType: 'API Pública de Streaming Energético',
      desc: 'Permite auditar la descarbonización territorial de Copenhague en tiempo real y alimentar con precisión matemática el cálculo de emisiones Scope 2 y el desacople fósil.'
    },
    {
      id: 'opendata_euskadi',
      region: 'europe',
      category: 'industrial',
      name: 'Open Data Euskadi & Ihobe (Bilbao)',
      tag: 'Economía Circular & Biorremediación',
      badge: '🇪🇸 Euskadi · Bilbao',
      icon: '🌊',
      hombroTarget: 'S₂ (Institucionalidad), E₁ & Scope 1-2',
      vars: ['Inventario comarcal de gases de efecto invernadero', 'Cuentas de flujo de materiales (MFA)', 'Índices de recuperación ecológica de la Ría'],
      freq: 'Actualización anual y continua de calidad de agua',
      url: 'https://opendata.euskadi.eus',
      apiType: 'API CKAN Pública / Catálogos Abiertos',
      desc: 'El repositorio que documenta la transición post-industrial de Bilbao. Provee los datos de flujos de materiales que nutren los estudios de economía ecológica de la UPV/EHU (Eneko Garmendia).'
    },
    {
      id: 'data_amsterdam',
      region: 'europe',
      category: 'circular',
      name: 'Data Amsterdam & DEAL (Economía del Donut)',
      tag: 'Límites Planetarios & Circularidad',
      badge: '🇳🇱 Países Bajos · Ámsterdam',
      icon: '🍩',
      hombroTarget: 'S (Base Social), E (Techo Ecológico) & Scope 3',
      vars: ['Flujos de materiales del Puerto de Ámsterdam', 'Huella de consumo de los hogares (Scope 3 importado)', 'Monitoreo de residuos y circularidad al 100%'],
      freq: 'Monitoreo anual de la Estrategia Donut 2020-2025',
      url: 'https://data.amsterdam.nl',
      apiType: 'API Urbana de Datos Abiertos',
      desc: 'Plataforma oficial que rastrea cómo Ámsterdam opera dentro de los límites planetarios de Kate Raworth, visibilizando la gran huella Scope 3 que su puerto importa del resto del mundo.'
    },
    {
      id: 'berlin_daten',
      region: 'europe',
      category: 'energia',
      name: 'Berlin Open Data & Umweltatlas',
      tag: 'Energiewende & Acuíferos Urbanos',
      badge: '🇩🇪 Alemania · Berlín',
      icon: '🛡️',
      hombroTarget: 'E₂ (Aguas Urbanas), E₃ (Suelos) & Scope 1-2',
      vars: ['Geodatos del Umweltatlas de calidad de suelo y acuíferos', 'Redes de calor urbano y transición fuera del lignito', 'Espacio verde comunitario por habitante'],
      freq: 'Catastro geográfico continuo y reportes semestrales',
      url: 'https://daten.berlin.de',
      apiType: 'Portal de Datos Abiertos del Senado de Berlín',
      desc: 'Suministra los datos de descarbonización de la red térmica de distrito de Vattenfall y la preservación de los corredores biológicos urbanos de Tempelhofer Feld y Grunewald.'
    },

    // --- SATELLITE & GLOBAL SENSING ---
    {
      id: 'copernicus_sentinel',
      region: 'satellite',
      category: 'espacial',
      name: 'Copernicus Sentinel-2 & Landsat-9',
      tag: 'Teledetección Satelital Continua',
      badge: '🛰️ Global · Satelital',
      icon: '🛰️',
      hombroTarget: 'Γ (Velocidad Sintrópica) & E₁, E₃',
      vars: ['Índice de Vegetación de Diferencia Normalizada (NDVI)', 'Índice de Estrés Hídrico de Suelo (NDWI)', 'Humedad superficial y biomasa foliar'],
      freq: 'Pasada orbital cada 5 días (Resolución 10m/pixel)',
      url: 'https://dataspace.copernicus.eu',
      apiType: 'Copernicus Data Space API / OData / STAC',
      desc: 'Permite auditar de forma completamente independiente y sin sesgo político la velocidad sintrópica (Γ = ΔH / (H · Δt)): si una cuenca está ganando biomasa viva o sufriendo desertificación acelerada.'
    }
  ];

  const filteredSources = useMemo(() => {
    return sources.filter(s => {
      const matchesCategory = 
        selectedCategory === 'all' || 
        (selectedCategory === 'chile' && s.region === 'chile') ||
        (selectedCategory === 'europe' && s.region === 'europe') ||
        (selectedCategory === 'satellite' && s.region === 'satellite');

      const matchesSearch = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.hombroTarget.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [sources, selectedCategory, searchQuery]);

  const activeSource = sources.find(s => s.id === selectedSourceId) || sources[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 animate-fade-in"
    >
      
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-[#D4C9B8] text-slate-900">
        <div className="h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51]" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 pt-1">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 border bg-[#487075]/10 text-[#487075] border-[#487075]/30">
              <Database className="w-3.5 h-3.5 text-[#487075]" />
              Ecosistema Oficial de Datos Públicos & APIs
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Observabilidad Territorial & Calibración Empírica
            </h1>
            <p className="mt-2 text-xs sm:text-sm max-w-3xl leading-relaxed text-slate-700">
              El modelo HOMBROS no formula hipótesis abstractas: <strong className="text-[#C86D51]">cada una de las 12 variables observables (S, E, K)</strong>, 
              las presiones extractivas (D) y las emisiones Scope 1, 2 y 3 se calibran contra <strong className="text-slate-900 font-semibold">registros públicos abiertos, 
              APIs gubernamentales en tiempo real y teledetección satelital continua</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl border bg-[#FAF7F0] border-[#D4C9B8] text-slate-800 shadow-xs shrink-0 font-mono text-xs">
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Fuentes Integradas</span>
            <span className="text-2xl font-serif font-bold text-[#1B4332]">{sources.length} Portales Oficiales</span>
            <span className="block text-[10px] text-[#C86D51] mt-0.5 font-medium">Chile · Europa · Satélites Copernicus</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-6 pt-5 border-t border-[#D4C9B8]/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Todas las Fuentes' },
              { id: 'chile', label: '🇨🇱 Chile (8)' },
              { id: 'europe', label: '🇪🇺 Europa (5)' },
              { id: 'satellite', label: '🛰️ Satélites (1)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 text-xs rounded-xl font-mono font-medium transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#487075] text-white font-bold border border-[#376E6F] shadow-xs'
                    : 'bg-[#FAF7F0] text-slate-700 hover:bg-white border border-[#D4C9B8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar variable, fuente o API..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-[#D4C9B8] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#487075] font-mono shadow-2xs"
            />
          </div>

        </div>
      </div>

      {/* Main Grid: Source Selector (Left) + Detailed Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sources Cards List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-[#DA7B93] uppercase tracking-wider font-bold">
              {filteredSources.length} Fuentes encontradas
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Haz clic para auditar la ficha técnica
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSources.map((source, index) => {
              const isSelected = source.id === selectedSourceId;
              const sourceCardThemes = ['card-rose', 'card-teal', 'card-indigo', 'card-slate', 'card-plum', 'card-rose'];
              const cardClass = sourceCardThemes[index % sourceCardThemes.length];

              return (
                <div
                  key={source.id}
                  onClick={() => setSelectedSourceId(source.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${cardClass} ${
                    isSelected ? 'ring-2 ring-white scale-102 shadow-2xl' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-2xl filter drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">{source.icon}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-black/40 border-white/20 text-white">
                        {source.badge}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-sm text-white leading-snug">
                      {source.name}
                    </h3>
                    
                    <span className="inline-block mt-1 text-[11px] font-mono font-semibold text-[#A4B3B6]">
                      {source.hombroTarget}
                    </span>

                    <p className="text-xs text-slate-200 line-clamp-2 mt-1.5 leading-relaxed font-sans">
                      {source.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{source.apiType.split(' / ')[0]}</span>
                    <span className="text-white font-bold flex items-center gap-1 group">
                      Detalles <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Inspector for Selected Source (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="card-teal rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-2xl bg-black/40 border border-white/15 shadow-inner">
                  {activeSource.icon}
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#376E6F] font-bold block">
                    Ficha Técnica de Calibración
                  </span>
                  <h2 className="text-xl font-serif font-bold text-white leading-tight">
                    {activeSource.name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Target Variable Banner */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-1 mb-5">
              <div className="flex items-center gap-1.5 text-[#376E6F] font-bold font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#376E6F]" />
                <span>Variable Asignada en el Modelo Hombros:</span>
              </div>
              <p className="font-mono font-semibold text-white text-sm">
                {activeSource.hombroTarget}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                  Metodología & Función en el Modelo
                </span>
                <p className="leading-relaxed text-slate-300 bg-bio-void/60 p-3 rounded-2xl border border-emerald-500/20 font-sans">
                  {activeSource.desc}
                </p>
              </div>

              {/* Observable Variables Captured */}
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold block mb-1.5">
                  Variables Específicas que Extrae
                </span>
                <ul className="space-y-1.5">
                  {activeSource.vars.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-xl bg-bio-card/70 border border-emerald-500/20 text-slate-200 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-bio-void/70 border border-emerald-500/20 font-mono text-[11px]">
                  <span className="text-slate-400 block text-[9px] uppercase">Frecuencia de Actualización</span>
                  <strong className="text-slate-100 block mt-0.5">{activeSource.freq}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-bio-void/70 border border-emerald-500/20 font-mono text-[11px]">
                  <span className="text-slate-400 block text-[9px] uppercase">Tipo de Interfaz / Protocolo</span>
                  <strong className="text-cyan-300 block mt-0.5">{activeSource.apiType}</strong>
                </div>
              </div>

              {/* External Portal Button */}
              <a
                href={activeSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-950/40 group"
              >
                <span>Acceder al Portal Oficial / API Abierta</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>
        </div>

      </div>

    </motion.div>
  );
}
