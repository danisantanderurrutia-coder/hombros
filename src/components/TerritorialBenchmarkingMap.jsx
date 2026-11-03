import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, AlertCircle, ShieldAlert, CheckCircle2, ChevronRight, Activity, Filter, Info, Sparkles, Building2, Droplets, Mountain } from 'lucide-react';
import { InlineMath, LatexText } from './KaTeXMath';

export const BENCHMARK_CITIES = [
  // =========================================================================
  // EUROPA: 10 CAPITALES METABÓLICAS
  // =========================================================================
  {
    id: 'madrid',
    name: 'Madrid',
    region: 'Europa',
    country: 'España',
    coords: { x: 22, y: 76 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Zona de Ajuste · Estrés Hídrico Estival',
    sigma: 0.94,
    H: 0.58,
    S: 0.72,
    E: 0.44,
    K: 0.65,
    diagnosis: 'Alta dependencia de los embalses del río Lozoya y cuenca del Tajo. Su huella material de consumo excede en un 62% la biocapacidad regional; depende de importaciones de agua virtual del sur peninsular.',
    remedy: 'Plan de choque de regeneración del río Manzanares y reducción forzosa del consumo suntuario estival.'
  },
  {
    id: 'paris',
    name: 'París',
    region: 'Europa',
    country: 'Francia',
    coords: { x: 36, y: 52 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga Sistémica · Metabolismo Lineal',
    sigma: 1.12,
    H: 0.52,
    S: 0.68,
    E: 0.38,
    K: 0.62,
    diagnosis: 'Densidad metabólica extrema en Île-de-France. Externaliza el 68% de su huella de carbono y el 81% de su huella hídrica aguas arriba (Scope 3) hacia países de la cuenca mediterránea y África.',
    remedy: 'Descentralización bio-regional y moratoria al crecimiento de infraestructura de consumo lineal.'
  },
  {
    id: 'london',
    name: 'Londres',
    region: 'Europa',
    country: 'Reino Unido',
    coords: { x: 30, y: 42 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga Sistémica · Fragilidad de Cuenca',
    sigma: 1.18,
    H: 0.49,
    S: 0.65,
    E: 0.35,
    K: 0.59,
    diagnosis: 'La cuenca del Támesis sufre sobre-extracción crítica en acuíferos de tiza. Las fugas de la red superan el 22% del caudal mientras su dependencia de cadenas globales de alimentos bordea el 84%.',
    remedy: 'Renaturalización masiva de llanuras de inundación y penalización tributaria a bienes importados de alta entropía.'
  },
  {
    id: 'brussels',
    name: 'Bruselas',
    region: 'Europa',
    country: 'Bélgica',
    coords: { x: 41, y: 46 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Zona de Ajuste · Cuello de Botella Logístico',
    sigma: 0.98,
    H: 0.56,
    S: 0.71,
    E: 0.42,
    K: 0.64,
    diagnosis: 'Corazón administrativo con alta densidad de transporte fósil. Capacidad de absorción de residuos superada; sufre islas de calor estivales y contaminación atmosférica por material particulado.',
    remedy: 'Transición obligatoria a corredores ecológicos urbanos y soberanía alimentaria con Flandes y Valonia.'
  },
  {
    id: 'amsterdam',
    name: 'Ámsterdam',
    region: 'Europa',
    country: 'Países Bajos',
    coords: { x: 43, y: 40 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga Entrópica · Puerto Desplazador',
    sigma: 1.15,
    H: 0.53,
    S: 0.76,
    E: 0.36,
    K: 0.68,
    diagnosis: 'Presenta una paradoja verde: alta movilidad en bicicleta pero el puerto de Ámsterdam-Róterdam importa millones de toneladas de soya y carbón, externalizando un 72.6% de carga entrópica al Sur Global.',
    remedy: 'Fiscalización estricta de emisiones Scope 3 en puerto y restauración de polders para retención hídrica natural.'
  },
  {
    id: 'berlin',
    name: 'Berlín',
    region: 'Europa',
    country: 'Alemania',
    coords: { x: 58, y: 39 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Zona de Ajuste · Sequía en la Cuenca del Spree',
    sigma: 0.92,
    H: 0.61,
    S: 0.74,
    E: 0.48,
    K: 0.68,
    diagnosis: 'El cese de la minería de lignito en Lusacia reduce el caudal del río Spree en hasta un 50%. A pesar de amplias zonas verdes, enfrenta desecación de napas y déficit hídrico sostenido.',
    remedy: 'Reutilización circular de aguas grises en escala de distrito e infiltración biológica obligatoria en nuevos desarrollos.'
  },
  {
    id: 'copenhagen',
    name: 'Copenhague',
    region: 'Europa',
    country: 'Dinamarca',
    coords: { x: 54, y: 28 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Falsa Sostenibilidad Territorial · Scope 3',
    sigma: 0.96,
    H: 0.60,
    S: 0.82,
    E: 0.42,
    K: 0.71,
    diagnosis: 'Modelo municipal "cero emisiones" directo, pero posee el mayor ratio de externalización de la UE (76.5% de su huella real de consumo ocurre en otros continentes donde se producen sus bienes).',
    remedy: 'Adopción del estándar Hombros para auditar el metabolismo biofísico completo incluyendo importaciones.'
  },
  {
    id: 'stockholm',
    name: 'Estocolmo',
    region: 'Europa',
    country: 'Suecia',
    coords: { x: 64, y: 18 },
    trafficLight: 'green',
    actionCode: 'SAFE',
    actionTitle: 'Margen Seguro · Matriz Hídrica & Forestal',
    sigma: 0.68,
    H: 0.73,
    S: 0.81,
    E: 0.68,
    K: 0.71,
    diagnosis: 'Amplia reserva biológica en el lago Mälaren y archipiélago. Mantiene factor de seguridad estructural (\(\sigma < 0.70\)), aunque el consumo per cápita de materiales electrónicos presiona cadenas minerales críticas.',
    remedy: 'Preservación estricta de turberas y aceleración de talleres comunitarios de reparación de hardware.'
  },
  {
    id: 'vienna',
    name: 'Viena',
    region: 'Europa',
    country: 'Austria',
    coords: { x: 61, y: 56 },
    trafficLight: 'green',
    actionCode: 'SAFE',
    actionTitle: 'Margen Seguro · Protección de Cabeceras Alpinas',
    sigma: 0.71,
    H: 0.72,
    S: 0.84,
    E: 0.64,
    K: 0.70,
    diagnosis: 'El agua potable proviene directamente de manantiales alpinos protegidos por ley forestal desde 1873. Fuerte cohesión social y transporte público masivo amortiguan los impactos del Danubio.',
    remedy: 'Monitoreo de retroceso de glaciares alpinos y protección ante olas de calor extremas.'
  },
  {
    id: 'rome',
    name: 'Roma',
    region: 'Europa',
    country: 'Italia',
    coords: { x: 53, y: 76 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga Sistémica · Fugas & Vulnerabilidad Hídrica',
    sigma: 1.09,
    H: 0.54,
    S: 0.66,
    E: 0.41,
    K: 0.61,
    diagnosis: 'La red de acueductos pierde más del 40% del agua potable. El lago Bracciano y el río Tíber exhiben eutrofización severa en verano provocada por calor extremo y residuos no tratados.',
    remedy: 'Renovación integral de conductos hidráulicos y moratoria a monocultivos regados en la periferia del Lazio.'
  },

  // =========================================================================
  // CHILE CENTRAL: REGIÓN DE VALPARAÍSO (5 CIUDADES)
  // =========================================================================
  {
    id: 'valparaiso_chile',
    name: 'Valparaíso',
    region: 'Valparaíso',
    country: 'Chile',
    coords: { x: 22, y: 22 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga en Ladera · Incendios & Precarización',
    sigma: 1.22,
    H: 0.44,
    S: 0.52,
    E: 0.32,
    K: 0.55,
    diagnosis: 'Quebradas invadidas por plantaciones de pino y eucalipto altamente inflamables. Redes de agua precarias en los cerros y desarticulación del puerto respecto al bienestar de la comunidad local.',
    remedy: 'Erradicación de monocultivos en cabeceras de quebradas y reemplazo por bosque esclerófilo con terrazas de retención.'
  },
  {
    id: 'vina_del_mar',
    name: 'Viña del Mar',
    region: 'Valparaíso',
    country: 'Chile',
    coords: { x: 26, y: 17 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Zona de Ajuste · Cuenca del Estero Marga Marga',
    sigma: 0.97,
    H: 0.55,
    S: 0.65,
    E: 0.42,
    K: 0.62,
    diagnosis: 'Impermeabilización masiva del suelo urbano y pérdida del cauce natural del estero. Vulnerabilidad alta ante marejadas y temporales intensificados por el cambio climático.',
    remedy: 'Des-impermeabilización de pavimentos, restauración del lecho del estero y jardines de lluvia urbanos.'
  },
  {
    id: 'quillota',
    name: 'Quillota',
    region: 'Valparaíso',
    country: 'Chile',
    coords: { x: 38, y: 21 },
    trafficLight: 'critical_red',
    actionCode: 'CRITICAL_ALERT',
    actionTitle: 'Fractura Crítica Hídrica · Monocultivo de Paltos',
    sigma: 1.48,
    H: 0.38,
    S: 0.58,
    E: 0.22,
    K: 0.52,
    diagnosis: 'Hombro Ambiental fracturado (\(E = 0.22 < 0.25\)). Sobre-otorgamiento del 300% de los derechos de agua del río Aconcagua para paltos de exportación en laderas áridas, secando pozos de APR comunitarios.',
    remedy: 'Revisión y caducidad de derechos de agua sobre-otorgados; reconversión agroecológica de laderas a secano.'
  },
  {
    id: 'san_antonio',
    name: 'San Antonio',
    region: 'Valparaíso',
    country: 'Chile',
    coords: { x: 19, y: 46 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga Portuaria · Desembocadura del Maipo',
    sigma: 1.16,
    H: 0.48,
    S: 0.56,
    E: 0.36,
    K: 0.57,
    diagnosis: 'El proyecto del megapuerto amenaza el humedal Ojos de Mar y la biodiversidad estuarina del río Maipo. Saturación vial de camiones pesados y sacrificio de la pesca artesanal.',
    remedy: 'Blindaje legal permanente de la desembocadura y humedales; canon portuario reinvertido en saneamiento comunal.'
  },
  {
    id: 'los_andes',
    name: 'Los Andes',
    region: 'Valparaíso',
    country: 'Chile',
    coords: { x: 56, y: 16 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga Minera · Cabecera del Aconcagua',
    sigma: 1.28,
    H: 0.45,
    S: 0.59,
    E: 0.28,
    K: 0.60,
    diagnosis: 'Codelco Andina y faenas mineras destruyen glaciares de roca en la alta cordillera. El agua que desciende hacia el valle arrastra metales pesados y sulfatos que degradan los suelos agrícolas.',
    remedy: 'Ley de protección absoluta de glaciares y restricción inmediata al vaciado de relaves en zonas cordilleranas.'
  },

  // =========================================================================
  // CHILE CENTRAL: REGIÓN METROPOLITANA (5 CIUDADES / NODOS)
  // =========================================================================
  {
    id: 'santiago_centro',
    name: 'Santiago Centro',
    region: 'Metropolitana',
    country: 'Chile',
    coords: { x: 48, y: 38 },
    trafficLight: 'critical_red',
    actionCode: 'CRITICAL_ALERT',
    actionTitle: 'Hiper-Extracción & Isla de Calor Extrema',
    sigma: 1.54,
    H: 0.42,
    S: 0.62,
    E: 0.21,
    K: 0.66,
    diagnosis: 'Hombro ambiental en falla crítica (\(E = 0.21\)). Edificación en altura indiscriminada sin sombra ni arbolado crea islas de calor de hasta 8°C sobre la media, con dependencia total de flujos foráneos.',
    remedy: 'Plan de arbolado nativo denso, techos verdes obligatorios y moratoria inmediata a megatorres habitacionales.'
  },
  {
    id: 'maipu',
    name: 'Maipú',
    region: 'Metropolitana',
    country: 'Chile',
    coords: { x: 40, y: 43 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga de Acuífero · SMAPA en Tensión',
    sigma: 1.19,
    H: 0.51,
    S: 0.68,
    E: 0.35,
    K: 0.58,
    diagnosis: 'Alberga la única sanitaria municipal (SMAPA), pero la sobre-extracción industrial y las pérdidas históricas de la red han deprimido los niveles freáticos a más de 120 metros de profundidad.',
    remedy: 'Inyección de presupuesto estatal para reparar fugas de SMAPA y recarga artificial de napas con aguas lluvias.'
  },
  {
    id: 'puente_alto',
    name: 'Puente Alto',
    region: 'Metropolitana',
    country: 'Chile',
    coords: { x: 55, y: 45 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Zona de Ajuste · Cuello de Presión Demográfica',
    sigma: 0.99,
    H: 0.55,
    S: 0.64,
    E: 0.41,
    K: 0.63,
    diagnosis: 'Comuna más poblada de Chile con escasa área verde por habitante. Depende del canal San Carlos y río Maipo; la presión inmobiliaria fragmenta el piedemonte cordillerano protector.',
    remedy: 'Parque periurbano cordillerano para recarga de acuíferos y fomento a huertos comunitarios barriales.'
  },
  {
    id: 'melipilla',
    name: 'Melipilla',
    region: 'Metropolitana',
    country: 'Chile',
    coords: { x: 26, y: 52 },
    trafficLight: 'critical_red',
    actionCode: 'CRITICAL_ALERT',
    actionTitle: 'Emergencia Hídrica · Agotamiento de Pozos APR',
    sigma: 1.42,
    H: 0.40,
    S: 0.55,
    E: 0.23,
    K: 0.54,
    diagnosis: 'Hombro ambiental en ruptura (\(E = 0.23\)). Megaplanteos agroindustriales y criaderos porcinos intensivos succionan la cuenca baja del Maipo; cientos de familias dependen de camiones aljibe.',
    remedy: 'Cierre de pozos ilegales, redistribución prioritaria hacia consumo humano y agroforestería campesina.'
  },
  {
    id: 'talagante',
    name: 'Talagante / Peñaflor',
    region: 'Metropolitana',
    country: 'Chile',
    coords: { x: 36, y: 50 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Zona de Ajuste · Conurbación & Pérdida de Suelo',
    sigma: 0.95,
    H: 0.58,
    S: 0.66,
    E: 0.44,
    K: 0.67,
    diagnosis: 'Suelos agrícolas de clase I y II están siendo convertidos aceleradamente en parcelas de agrado y loteos residenciales, destruyendo el cinturón verde que alimenta a la capital.',
    remedy: 'Prohibición estricta de subdivisión de suelos agrícolas fértiles y creación de cinturón agroecológico protegido.'
  },

  // =========================================================================
  // CHILE CENTRAL: REGIÓN DE O'HIGGINS (5 CIUDADES)
  // =========================================================================
  {
    id: 'rancagua',
    name: 'Rancagua',
    region: 'O\'Higgins',
    country: 'Chile',
    coords: { x: 46, y: 64 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga Minera & Humo · Fundición Caletones',
    sigma: 1.25,
    H: 0.49,
    S: 0.65,
    E: 0.31,
    K: 0.66,
    diagnosis: 'La cuenca atmosférica de Cachapoal retiene el humo de la fundición Caletones y emisiones de la Carretera del Cobre. Contaminación del río Cachapoal por efluentes mineros y agroquímicos.',
    remedy: 'Modernización tecnológica de fundición a norma europea y monitoreo comunitario continuo de efluentes.'
  },
  {
    id: 'rengo',
    name: 'Rengo',
    region: 'O\'Higgins',
    country: 'Chile',
    coords: { x: 48, y: 72 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Zona de Ajuste · Cuenca del Río Claro',
    sigma: 0.89,
    H: 0.62,
    S: 0.68,
    E: 0.51,
    K: 0.69,
    diagnosis: 'Valle frutícola dinámico con buena retención en la precordillera, pero el sobrebombeo en temporada estival para cerezas y uvas de exportación está reduciendo los caudales mínimos del río Claro.',
    remedy: 'Zanjas de infiltración keyline en cabeceras de cuenca y fomento al riego por goteo con energía solar.'
  },
  {
    id: 'san_fernando',
    name: 'San Fernando',
    region: 'O\'Higgins',
    country: 'Chile',
    coords: { x: 44, y: 80 },
    trafficLight: 'amber',
    actionCode: 'ADJUST',
    actionTitle: 'Zona de Ajuste · Cuenca del Tinguiririca',
    sigma: 0.86,
    H: 0.65,
    S: 0.70,
    E: 0.55,
    K: 0.71,
    diagnosis: 'El río Tinguiririca conserva aún caudales nivales importantes, pero sufre periódicamente crecidas torrenciales destructivas por lluvias con isoterma cero alta alternadas con sequías estivales.',
    remedy: 'Reforestación nativa de riveras y diques de retención bio-mecánicos de bajo impacto.'
  },
  {
    id: 'santa_cruz',
    name: 'Santa Cruz',
    region: 'O\'Higgins',
    country: 'Chile',
    coords: { x: 32, y: 82 },
    trafficLight: 'red',
    actionCode: 'OVERLOAD',
    actionTitle: 'Sobrecarga Vitivinícola · Valle de Colchagua',
    sigma: 1.14,
    H: 0.53,
    S: 0.63,
    E: 0.39,
    K: 0.68,
    diagnosis: 'El monocultivo de vid para vinos de exportación acapara los derechos de agua subterránea. Pequeños agricultores y comunidades campesinas tradicionales ven secar sus norias basales.',
    remedy: 'Transición a viticultura regenerativa y syntrópica sin arado ni pesticidas; cuotas de equidad hídrica.'
  },
  {
    id: 'pichilemu',
    name: 'Pichilemu',
    region: 'O\'Higgins',
    country: 'Chile',
    coords: { x: 14, y: 76 },
    trafficLight: 'green',
    actionCode: 'SAFE',
    actionTitle: 'Margen Seguro · Biorregión del Secano Costero',
    sigma: 0.66,
    H: 0.71,
    S: 0.74,
    E: 0.67,
    K: 0.73,
    diagnosis: 'Laguna de Cáhuil y salinas ancestrales operan con técnicas sostenibles de bajísima entropía. La comunidad costera mantiene factor de seguridad elástico favorable frente a los valles interiores.',
    remedy: 'Protección patrimonial de las salineras de Cáhuil y límite a la especulación inmobiliaria en el borde costero.'
  }
];

export default function TerritorialBenchmarkingMap({ onSelectCity, selectedCityId }) {
  const [activeRegion, setActiveRegion] = useState('chile_central'); // 'europa' | 'chile_central'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'green' | 'amber' | 'red' | 'critical'

  // Filter cities by selected region
  const regionCities = useMemo(() => {
    if (activeRegion === 'europa') {
      return BENCHMARK_CITIES.filter(c => c.region === 'Europa');
    } else {
      return BENCHMARK_CITIES.filter(c => c.region !== 'Europa');
    }
  }, [activeRegion]);

  // Apply optional traffic light status filter
  const displayedCities = useMemo(() => {
    if (statusFilter === 'all') return regionCities;
    if (statusFilter === 'green') return regionCities.filter(c => c.trafficLight === 'green');
    if (statusFilter === 'amber') return regionCities.filter(c => c.trafficLight === 'amber');
    if (statusFilter === 'red') return regionCities.filter(c => c.trafficLight === 'red');
    if (statusFilter === 'critical') return regionCities.filter(c => c.trafficLight === 'critical_red');
    return regionCities;
  }, [regionCities, statusFilter]);

  // Active city inspection object
  const activeCity = useMemo(() => {
    return BENCHMARK_CITIES.find(c => c.id === selectedCityId) || regionCities[0];
  }, [selectedCityId, regionCities]);

  return (
    <div className="space-y-5">
      {/* Top Region Navigation & Filter Bar */}
      <div className="p-4 rounded-3xl bg-white/95 border border-[#927660]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Region Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase text-black mr-1 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#487075]" /> Territorio:
          </span>
          <button
            onClick={() => setActiveRegion('chile_central')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 shadow-xs ${
              activeRegion === 'chile_central'
                ? 'bg-[#C86D51] text-white shadow-md'
                : 'bg-[#FAF7F0] text-black hover:bg-[#F2ECE1] border border-[#DDD5C5]'
            }`}
          >
            <span>🇨🇱 Chile Central</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-white/30 text-white font-mono">
              15 Ciudades (Valpo · RM · O'Higgins)
            </span>
          </button>

          <button
            onClick={() => setActiveRegion('europa')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 shadow-xs ${
              activeRegion === 'europa'
                ? 'bg-[#487075] text-white shadow-md'
                : 'bg-[#FAF7F0] text-black hover:bg-[#F2ECE1] border border-[#DDD5C5]'
            }`}
          >
            <span>🇪🇺 Europa Metabólica</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-white/30 text-white font-mono">
              10 Capitales
            </span>
          </button>
        </div>

        {/* Traffic Light Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-[10px] text-black font-bold uppercase mr-1">Filtrar:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
              statusFilter === 'all' ? 'bg-[#28475A] text-white' : 'text-black hover:bg-black/5'
            }`}
          >
            Todos ({regionCities.length})
          </button>
          <button
            onClick={() => setStatusFilter('green')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
              statusFilter === 'green' ? 'bg-[#487075] text-white' : 'text-[#487075] hover:bg-[#E2F4F2]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#487075]" /> Seguro
          </button>
          <button
            onClick={() => setStatusFilter('amber')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
              statusFilter === 'amber' ? 'bg-[#D4A373] text-white' : 'text-[#927660] hover:bg-[#FAF7F0]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#D4A373]" /> Ajuste
          </button>
          <button
            onClick={() => setStatusFilter('red')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
              statusFilter === 'red' ? 'bg-[#C86D51] text-white' : 'text-[#C86D51] hover:bg-[#FEECE8]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C86D51]" /> Sobrecarga
          </button>
          <button
            onClick={() => setStatusFilter('critical')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
              statusFilter === 'critical' ? 'bg-[#991B1B] text-white' : 'text-[#991B1B] hover:bg-rose-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#991B1B] animate-ping" /> Crítico
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Diagnostic Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ===================================================================
            SVG CARTOGRAPHIC MAP CANVAS (7/12)
            =================================================================== */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-white/95 border border-[#927660]/30 shadow-xl relative overflow-hidden">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#D4C9B8] mb-3">
            <div>
              <h3 className="font-serif font-extrabold text-black text-sm sm:text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C86D51]" />
                {activeRegion === 'europa' ? 'Cartografía de Capitales Europeas' : 'Cartografía de Cuencas: Chile Central'}
              </h3>
              <p className="text-[11px] text-black font-medium">
                Haz clic en cualquier ciudad o en su semáforo para abrir el diagnóstico biofísico
              </p>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-black font-bold">
              {displayedCities.length} nodos visibles
            </span>
          </div>

          {/* Map Vector Canvas */}
          <div className="relative w-full aspect-[4/3] bg-[#F7F4EC] rounded-2xl border border-[#DDD5C5] overflow-hidden select-none shadow-inner">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                {/* Solarpunk Topo Grid Pattern */}
                <pattern id="cartoGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(146, 118, 96, 0.08)" strokeWidth="0.5" />
                </pattern>
                <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Grid Background */}
              <rect width="100" height="100" fill="url(#cartoGrid)" />

              {/* STYLIZED REGIONAL GEOGRAPHY BACKGROUND */}
              {activeRegion === 'europa' ? (
                // Stylized Europe Outline Paths
                <g opacity="0.35" fill="none" stroke="#487075" strokeWidth="0.8">
                  {/* Iberian Peninsula */}
                  <path d="M 12,90 L 12,75 L 26,72 L 28,88 Z" fill="#E8F1F1" />
                  {/* France & Low Countries */}
                  <path d="M 28,72 L 32,50 L 46,42 L 46,62 L 32,68 Z" fill="#E8F1F1" />
                  {/* British Isles */}
                  <path d="M 26,45 L 28,34 L 35,36 L 33,48 Z" fill="#E8F1F1" />
                  {/* Central Europe / Germany */}
                  <path d="M 46,42 L 66,35 L 68,62 L 48,64 Z" fill="#E8F1F1" />
                  {/* Italy Peninsula */}
                  <path d="M 48,68 L 56,84 L 62,80 L 52,66 Z" fill="#E8F1F1" />
                  {/* Scandinavia */}
                  <path d="M 50,28 L 60,12 L 72,15 L 66,32 Z" fill="#E8F1F1" />
                  {/* Waterways / Danube / Rhine indicator */}
                  <path d="M 40,46 Q 52,56 65,58" stroke="#7DB2B2" strokeWidth="1" strokeDasharray="1,1" />
                </g>
              ) : (
                // Stylized Chile Central Geography (Valparaíso - RM - O'Higgins)
                <g fill="none">
                  {/* Pacific Ocean Shading (Left) */}
                  <rect x="0" y="0" width="16" height="100" fill="#E4F1F1" opacity="0.6" />
                  <line x1="16" y1="0" x2="16" y2="100" stroke="#7DB2B2" strokeWidth="1" strokeDasharray="2,2" />

                  {/* Coastal Range (Cordillera de la Costa) */}
                  <path d="M 30,0 L 28,100" stroke="#DDD5C5" strokeWidth="6" opacity="0.5" />

                  {/* Central Valley (Depresión Intermedia) */}
                  <rect x="34" y="0" width="28" height="100" fill="#FAF6EE" opacity="0.4" />

                  {/* Andes Mountain Range (Cordillera de los Andes - Right) */}
                  <path d="M 65,0 L 68,100" stroke="#C8D4D6" strokeWidth="12" opacity="0.4" />
                  <path d="M 68,0 L 72,100" stroke="#A8BDBF" strokeWidth="8" opacity="0.3" />

                  {/* Principal Rivers: Aconcagua (Top), Maipo-Mapocho (Center), Cachapoal-Tinguiririca (Bottom) */}
                  {/* Río Aconcagua */}
                  <path d="M 65,16 Q 45,18 16,20" stroke="#7DB2B2" strokeWidth="1.2" strokeLinecap="round" />
                  <text x="18" y="14" className="text-[3px] font-mono font-bold fill-[#487075]">Río Aconcagua</text>

                  {/* Río Maipo & Mapocho */}
                  <path d="M 65,42 Q 45,46 16,48" stroke="#7DB2B2" strokeWidth="1.4" strokeLinecap="round" />
                  <text x="18" y="44" className="text-[3px] font-mono font-bold fill-[#487075]">Río Maipo</text>

                  {/* Río Cachapoal & Tinguiririca */}
                  <path d="M 65,70 Q 42,76 16,78" stroke="#7DB2B2" strokeWidth="1.2" strokeLinecap="round" />
                  <text x="18" y="72" className="text-[3px] font-mono font-bold fill-[#487075]">Río Cachapoal</text>

                  {/* Region Labels */}
                  <text x="6" y="8" className="text-[3.5px] font-serif font-extrabold fill-[#28475A]">OCÉANO PACÍFICO</text>
                  <text x="76" y="8" className="text-[3.5px] font-serif font-extrabold fill-[#28475A]">CORDILLERA DE LOS ANDES</text>
                  <text x="86" y="22" className="text-[3.2px] font-mono font-bold fill-[#C86D51]">REG. VALPARAÍSO</text>
                  <text x="86" y="48" className="text-[3.2px] font-mono font-bold fill-[#C86D51]">REG. METROPOLITANA</text>
                  <text x="86" y="78" className="text-[3.2px] font-mono font-bold fill-[#C86D51]">REG. O'HIGGINS</text>
                </g>
              )}

              {/* RENDER INTERACTIVE CITIES & CLICKABLE SEMAPHORES */}
              {displayedCities.map((city) => {
                const isSelected = selectedCityId === city.id;
                const { x, y } = city.coords;

                // Color mapping for physical traffic light
                const lampColor = 
                  city.trafficLight === 'green' ? '#487075' :
                  city.trafficLight === 'amber' ? '#D4A373' :
                  city.trafficLight === 'red' ? '#C86D51' :
                  '#991B1B';

                return (
                  <g
                    key={city.id}
                    onClick={() => onSelectCity(city.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring on selected city */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="4.5"
                        fill="none"
                        stroke={lampColor}
                        strokeWidth="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Map Node Pin */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? "3" : "2.2"}
                      fill={isSelected ? "#1E293B" : "#FFFFFF"}
                      stroke={lampColor}
                      strokeWidth={isSelected ? "1.2" : "0.8"}
                      filter="url(#nodeShadow)"
                      className="transition-all duration-200 group-hover:scale-125"
                    />

                    {/* Inner Node Dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r="1.2"
                      fill={lampColor}
                    />

                    {/* CLICKABLE MINI PHYSICAL TRAFFIC LIGHT HOUSING */}
                    <g transform={`translate(${x + 3.5}, ${y - 4})`} filter="url(#nodeShadow)">
                      {/* Traffic Light Background Housing (Mini Capsule) */}
                      <rect
                        x="0"
                        y="0"
                        width="8"
                        height="8"
                        rx="2"
                        fill="#1E293B"
                        stroke="#D4C9B8"
                        strokeWidth="0.4"
                      />

                      {/* 3 Physical Traffic Light Lamps (Red / Amber / Green) */}
                      {/* Red Lamp */}
                      <circle
                        cx="4"
                        cy="2"
                        r="1"
                        fill={city.trafficLight === 'red' || city.trafficLight === 'critical_red' ? '#EF4444' : '#451A1A'}
                        className={city.trafficLight === 'critical_red' ? 'animate-pulse' : ''}
                      />
                      {/* Amber Lamp */}
                      <circle
                        cx="4"
                        cy="4"
                        r="1"
                        fill={city.trafficLight === 'amber' ? '#F59E0B' : '#45321A'}
                      />
                      {/* Green Lamp */}
                      <circle
                        cx="4"
                        cy="6"
                        r="1"
                        fill={city.trafficLight === 'green' ? '#10B981' : '#1A3326'}
                      />
                    </g>

                    {/* CITY NAME LABEL (SHADOWED & HIGH CONTRAST) */}
                    <g transform={`translate(${x + 12.5}, ${y + 0.8})`}>
                      <rect
                        x="-1"
                        y="-3"
                        width={city.name.length * 2.3 + 2}
                        height="4.8"
                        rx="1"
                        fill="#FFFFFF"
                        opacity="0.88"
                        stroke={isSelected ? lampColor : "#DDD5C5"}
                        strokeWidth="0.3"
                      />
                      <text
                        x="0"
                        y="0"
                        className={`text-[2.6px] font-sans font-bold select-none ${
                          isSelected ? 'fill-black font-extrabold' : 'fill-slate-900'
                        }`}
                      >
                        {city.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Legend Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-[#D4C9B8] text-[11px] font-mono text-black font-medium">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" /> Estados Biofísicos:
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#487075]" /> Seguro (\(\sigma &lt; 0.70\))
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" /> Ajuste (\(0.70 \le \sigma \le 1.00\))
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51]" /> Sobrecarga (\(\sigma &gt; 1.00\))
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B]" /> Falla (\(H_i &lt; 0.25\))
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            DETAILED INSPECTION PANEL: "¿QUÉ PASA CON ELLOS?" (5/12)
            =================================================================== */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white/95 border border-[#927660]/30 shadow-xl space-y-4">
          
          {/* Header of Active City */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#D4C9B8]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FAF7F0] border border-[#DDD5C5] text-black">
                  {activeCity.country} · {activeCity.region}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase text-white shadow-xs ${
                  activeCity.trafficLight === 'green' ? 'bg-[#487075]' :
                  activeCity.trafficLight === 'amber' ? 'bg-[#D4A373]' :
                  activeCity.trafficLight === 'red' ? 'bg-[#C86D51]' :
                  'bg-[#991B1B]'
                }`}>
                  {activeCity.actionCode}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-black">
                {activeCity.name}
              </h3>
              <p className="text-xs text-black font-medium mt-0.5">
                {activeCity.actionTitle}
              </p>
            </div>
          </div>

          {/* Core Numerical Indicators (H, sigma, S, E, K) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5]">
              <span className="text-[10px] font-bold text-black uppercase block mb-0.5">Capacidad (H):</span>
              <strong className="text-base text-black font-black">
                {activeCity.H.toFixed(2)}
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-[#FEECE8] border border-[#F4A79D]">
              <span className="text-[10px] font-bold text-black uppercase block mb-0.5">Tensión (σ):</span>
              <strong className="text-base text-[#C86D51] font-black">
                {activeCity.sigma.toFixed(2)}
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-[#E2F4F2] border border-[#7DB2B2] col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-black uppercase block mb-0.5">Trípode [S·E·K]:</span>
              <div className="text-[11px] text-black font-bold">
                [{activeCity.S.toFixed(2)} · {activeCity.E.toFixed(2)} · {activeCity.K.toFixed(2)}]
              </div>
            </div>
          </div>

          {/* Section: ¿QUÉ PASA CON ELLOS? */}
          <div className="p-4 rounded-2xl bg-[#FFF9EE] border border-[#E9D7A5] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wide">
              <Info className="w-4 h-4 text-[#C86D51]" />
              <span>¿Qué pasa con {activeCity.name}? (Diagnóstico Biofísico)</span>
            </div>
            <p className="text-xs text-black leading-relaxed font-sans font-medium">
              <LatexText text={activeCity.diagnosis} />
            </p>
          </div>

          {/* Section: Directriz de Gobernanza del Semáforo */}
          <div className="p-4 rounded-2xl bg-[#E2F4F2] border border-[#7DB2B2] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-[#487075]" />
              <span>Directriz de Intervención del Semáforo:</span>
            </div>
            <p className="text-xs text-black leading-relaxed font-sans font-semibold">
              <LatexText text={activeCity.remedy} />
            </p>
          </div>

          {/* Quick Switch to next city */}
          <div className="pt-2 border-t border-[#D4C9B8]">
            <span className="text-[10px] font-mono uppercase font-bold text-black block mb-2">
              Explorar otras ciudades de la región:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              {regionCities.map(c => (
                <button
                  key={c.id}
                  onClick={() => onSelectCity(c.id)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition-all ${
                    c.id === activeCity.id
                      ? 'bg-[#28475A] text-white shadow-xs'
                      : 'bg-[#FAF7F0] text-black hover:bg-[#EAE4D5] border border-[#DDD5C5]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
