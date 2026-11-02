import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitCompare, Layers, Compass, Trees, Factory, Building2, 
  ShieldCheck, AlertTriangle, ArrowRight, BookOpen, ExternalLink, 
  CheckCircle2, Sparkles, Scale, Activity, BarChart3, Info, HeartHandshake, Leaf,
  Droplets, Wind, Globe, Terminal, FileText, Download, Check
} from 'lucide-react';

export const DEEP_DIVE_CASES = [
  {
    id: 'copenhagen',
    name: 'Copenhague (Dinamarca)',
    badge: '🇩🇰 Dinamarca · Metrópoli Báltica',
    frameworkTitle: 'Economía del Donut (Doughnut City Portrait) + CPH 2025',
    frameworkType: 'Doughnut Economics (Kate Raworth / DEAL) & C40',
    tagline: 'Liderazgo en descarbonización local frente a la exportación de huella de Alcance 3',
    status: 'amber',
    statusLabel: 'Zona de Ajuste · Fatiga por Consumo Importado',
    sigma: 0.94,
    fs: 1.06,
    hombros: { S: 0.88, E: 0.72, K: 0.82, H: 0.80, D: 0.75 },
    nativeMetrics: [
      {
        dimension: 'Alimentación Orgánica Pública',
        val: '90%',
        target: '100% orgánico en escuelas y hospitales',
        status: 'safe',
        type: 'Suelo Social (Donut)',
        desc: 'Compras públicas circulares sin pesticidas agroquímicos.'
      },
      {
        dimension: 'Movilidad Activa en Bicicleta',
        val: '62%',
        target: '> 50% de viajes diarios a trabajo/estudio',
        status: 'safe',
        type: 'Suelo Social (Donut)',
        desc: 'Red de superciclovías distritales y desincentivo vehicular.'
      },
      {
        dimension: 'Calefacción Distrital Descarbonizada',
        val: '84%',
        target: '100% neutral al 2025 (biomasa certificada + eólica)',
        status: 'safe',
        type: 'Techo Ecológico (Donut)',
        desc: 'Sistema centralizado HOFOR con recuperación de calor residual.'
      },
      {
        dimension: 'Huella de Consumo Alcance 3 (Scope 3)',
        val: '8.4 tCO2e/cap',
        target: '< 2.5 tCO2e/cap (Límite Planetario 1.5°C)',
        status: 'overshoot',
        type: 'Techo Ecológico (Donut - Overshoot)',
        desc: 'Importaciones masivas de tecnología, vestuario, alimentación y aviación.'
      },
      {
        dimension: 'Construcción Circular en Nordhavn',
        val: 'Cert. DGNB Oro',
        target: 'Circularidad de materiales > 45%',
        status: 'safe',
        type: 'Metabolismo Urbano',
        desc: 'Auditoría de ciclo de vida (LCA) en todo nuevo barrio portuario.'
      }
    ],
    epistemicCritique: {
      strength: 'El Donut de Copenhague visibiliza con rigor el suelo social y logra una matriz energética y de movilidad ejemplar.',
      blindspot: 'No modeliza la física acumulada de fatiga de materiales: la neutralidad local en Alcance 1 y 2 enmascara que su alta renta per cápita transfiere la presión extractiva al Sur Global.',
      hombrosSolution: 'Hombros integra la importación de bienes como vector de carga externa (D₃) y calcula el esfuerzo cortante real sobre la periferia proveedora.'
    }
  },
  {
    id: 'amsterdam',
    name: 'Ámsterdam (Países Bajos)',
    badge: '🇳🇱 Países Bajos · Ciudad Circular',
    frameworkTitle: 'Amsterdam City Doughnut & Circularity Monitor',
    frameworkType: 'Doughnut Economics Action Lab (DEAL) · Modelo Pionero',
    tagline: 'Reducción del 50% de materias primas vírgenes al 2030 y arquitectura biobasada',
    status: 'amber',
    statusLabel: 'Zona de Ajuste · Transición Circular en Marcha',
    sigma: 0.92,
    fs: 1.09,
    hombros: { S: 0.85, E: 0.65, K: 0.80, H: 0.76, D: 0.70 },
    nativeMetrics: [
      {
        dimension: 'Reducción Materias Primas Vírgenes',
        val: '-20%',
        target: '-50% al 2030 (vs línea base 2018)',
        status: 'safe',
        type: 'Techo Ecológico (Donut)',
        desc: 'Prohibición paulatina de materiales de construcción vírgenes en licitaciones.'
      },
      {
        dimension: 'Vivienda Asequible / Derecho al Techo',
        val: 'Déficit 18%',
        target: '40% vivienda social protegida por barrio',
        status: 'deficit',
        type: 'Suelo Social (Donut - Déficit)',
        desc: 'Presión especulativa inmobiliaria global que tensiona el suelo social.'
      },
      {
        dimension: 'Separación y Reciclaje Orgánico',
        val: '68%',
        target: '100% digestión anaeróbica y compostaje',
        status: 'safe',
        type: 'Metabolismo Circular',
        desc: 'Recuperación de biogás para la flota de transporte metropolitano.'
      },
      {
        dimension: 'Descarbonización Portuaria',
        val: '34%',
        target: 'Eliminación total del carbón al 2030 en Port of Amsterdam',
        status: 'warning',
        type: 'Techo Ecológico',
        desc: 'El puerto sigue canalizando combustibles fósiles hacia el Rin.'
      }
    ],
    epistemicCritique: {
      strength: 'Ha sido el primer gobierno local en institucionalizar el marco del Donut en ordenanzas vinculantes de contratación pública.',
      blindspot: 'Carece de una formulación matemática que penalice la sustitución débil cuando el mercado inmobiliario privatiza el suelo.',
      hombrosSolution: 'Hombros demuestra mediante la media geométrica que el crecimiento financiero (K) no puede compensar el déficit en el hombro social (S) ni la degradación del suelo (E).'
    }
  },
  {
    id: 'chanco',
    name: 'Chanco / Secano Costero (Maule, Chile)',
    badge: '🇨🇱 Chile · Agroecología & Pesca Artesanal',
    frameworkTitle: 'Buen Vivir (Küme Mogen) & Soberanía de Secano',
    frameworkType: 'Ontología Biocéntrica Campesina e Indígena',
    tagline: 'Resistencia comunitaria frente al monocultivo forestal pirófito de pino y eucalipto',
    status: 'red',
    statusLabel: 'Sobrecarga Plástica · Estrés Hídrico por Desierto Verde',
    sigma: 1.05,
    fs: 0.95,
    hombros: { S: 0.58, E: 0.36, K: 0.39, H: 0.43, D: 0.45 },
    nativeMetrics: [
      {
        dimension: 'Tiempo Comunitario de Minga y Cuidados',
        val: '32 hrs/sem/comunidad',
        target: '> 30 hrs de reproducción no mercantilizada',
        status: 'safe',
        type: 'Küme Mogen (Dimensión Social)',
        desc: 'Faenas colectivas para reparación de caminos, zanjas de infiltración y cosechas.'
      },
      {
        dimension: 'Soberanía de Semillas Nativas (Trafkintu)',
        val: '78%',
        target: '> 75% variedades criollas no patentadas',
        status: 'safe',
        type: 'Küme Mogen (Autonomía de Vida)',
        desc: 'Red comunitaria de intercambio libre de semillas de legumbres y maíz de secano.'
      },
      {
        dimension: 'Gestión Comunitaria del Agua (Comités APR)',
        val: '92% cobertura rural',
        target: '100% agua potable en manos de cooperativas',
        status: 'safe',
        type: 'Küme Mogen (Gobernanza del Agua / Ko)',
        desc: 'Gobernanza vecinal del agua para consumo humano frente a derechos agroforestales.'
      },
      {
        dimension: 'Integridad del Itrofill Mogen (Biodiversidad)',
        val: '22% bosque nativo',
        target: '> 60% cobertura esclerófila continua',
        status: 'deficit',
        type: 'Küme Mogen (Ecosistemas Vivos)',
        desc: '64% de la superficie comunal ocupada por monocultivo forestal pirófito exótico.'
      },
      {
        dimension: 'Recarga Freática de Pozos Profundos',
        val: '-42% caudal',
        target: 'Balance neutro extracción / infiltración',
        status: 'overshoot',
        type: 'Límite Biofísico de Cuenca',
        desc: 'Abatimiento severo de napas subterráneas por eucaliptos en cabecera de cuenca.'
      }
    ],
    epistemicCritique: {
      strength: 'El Buen Vivir aporta la comprensión del territorio como tejido vivo relacional donde el agua (Ko) y el bosque son sujetos sagrados inalienables.',
      blindspot: 'Históricamente ha carecido de un instrumental cuantitativo-fiscal que traduzca el daño ecológico en cuotas ecológicamente vinculantes para frenar a las corporaciones.',
      hombrosSolution: 'Hombros formaliza el Küme Mogen: convierte el tiempo de cuidados en consumo metabólico basal y modela el monocultivo como una deformación plástica irreversible.'
    }
  },
  {
    id: 'quintero_puchuncavi',
    name: 'Quintero - Puchuncaví (Chile)',
    badge: '🇨🇱 Chile · Complejo Industrial Ventanas',
    frameworkTitle: 'Matriz PRAS (MMA) & Registro RETC',
    frameworkType: 'Programa de Recuperación Ambiental y Social (MMA Chile)',
    tagline: 'Zona de sacrificio: 50 años de acumulación de pasivos tóxicos y fundición de cobre',
    status: 'critical_red',
    statusLabel: 'Fractura Estructural · Zona de Fatiga Crítica',
    sigma: 1.62,
    fs: 0.62,
    hombros: { S: 0.45, E: 0.22, K: 0.52, H: 0.37, D: 0.60 },
    nativeMetrics: [
      {
        dimension: 'Emisiones de Dióxido de Azufre (SO2)',
        val: '12.400 ton/año',
        target: '< 1.500 ton/año (Estándar OMS)',
        status: 'overshoot',
        type: 'RETC (Emisiones Atmosféricas)',
        desc: 'Picos recurrentes que provocan intoxicaciones masivas en escuelas locales.'
      },
      {
        dimension: 'Concentración de Arsénico y Plomo en Suelo',
        val: '3.8x norma',
        target: '< 1.0x límite de referencia residencial',
        status: 'overshoot',
        type: 'PRAS (Pasivo de Suelos)',
        desc: 'Acumulación histórica irreversible de metales pesados en los primeros 30 cm de suelo.'
      },
      {
        dimension: 'Salud Pulmonar Infantil',
        val: 'Prevalencia 34%',
        target: '< 10% media nacional',
        status: 'deficit',
        type: 'PRAS (Vulnerabilidad en Salud)',
        desc: 'Asma obstructiva crónica y daño neurocognitivo en la población pediátrica.'
      },
      {
        dimension: 'Afectación a la Pesca Artesanal de Bahía',
        val: '-70% biomasa',
        target: 'Recuperación de bancos naturales de mariscos',
        status: 'deficit',
        type: 'PRAS (Biodiversidad Marina)',
        desc: 'Tomas de agua de refrigeración marina y derrames de carbón en la playa.'
      }
    ],
    epistemicCritique: {
      strength: 'El PRAS cataloga 120 indicadores específicos de contaminación y daño a la salud de forma transparente.',
      blindspot: 'Opera bajo la ontología de la compensación reactiva: las empresas pagan multas económicas pero el daño tóxico acumulado es irreparable.',
      hombrosSolution: 'Hombros demuestra que cuando el Hombro Ambiental cae bajo 0.25 (E = 0.22), la capacidad de carga colapsa sin importar el PIB industrial, activando la regla de cese inmediato de faenas.'
    }
  },
  {
    id: 'berlin',
    name: 'Berlín (Alemania)',
    badge: '🇩🇪 Alemania · Capital Bioclimática',
    frameworkTitle: 'BFF (Biotopflächenfaktor) & Umweltatlas Berlin',
    frameworkType: 'Factor de Superficie de Biotopo & Planificación de Suelos',
    tagline: 'Instrumento legal pionero que exige suelo ecológicamente activo por metro cuadrado construido',
    status: 'green',
    statusLabel: 'Zona Segura · Alta Resiliencia Hídrica y de Suelo',
    sigma: 0.68,
    fs: 1.47,
    hombros: { S: 0.82, E: 0.78, K: 0.76, H: 0.79, D: 0.54 },
    nativeMetrics: [
      {
        dimension: 'Factor de Superficie de Biotopo (BFF)',
        val: '0.64',
        target: '≥ 0.60 en todo desarrollo residencial denso',
        status: 'safe',
        type: 'BFF Berlín (Suelo Vivo)',
        desc: 'Ponderación matemática de permeabilidad, cubiertas verdes y muros vegetales.'
      },
      {
        dimension: 'Índice de Sellado de Suelo (Versiegelung)',
        val: '33%',
        target: '< 35% de superficie urbana total sellada',
        status: 'safe',
        type: 'Umweltatlas Berlin',
        desc: 'Protección estricta de cuencas de infiltración hacia el río Spree y lagos.'
      },
      {
        dimension: 'Cooperativas de Energía Ciudadana (BürgerEnergie)',
        val: '180 MWp',
        target: '35% de techos solares comunitarios al 2035',
        status: 'safe',
        type: 'Autonomía Energética (K)',
        desc: 'Propiedad cooperativa de plantas fotovoltaicas en colegios y edificios públicos.'
      },
      {
        dimension: 'Nivel Freático de Aguas Subterráneas',
        val: 'Estable (±5%)',
        target: 'Recarga natural ≥ Extracciones municipales',
        status: 'safe',
        type: 'Umweltatlas Hidrología',
        desc: 'Monitoreo continuo de 1.000 pozos piezométricos en tiempo real.'
      }
    ],
    epistemicCritique: {
      strength: 'El BFF es el mejor ejemplo global de un estándar microfísico del suelo exigible por ley en cualquier licencia de edificación.',
      blindspot: 'Se enfoca intensamente en la dimensión biofísica del lote, pero es ciego a la presión de la gentrificación y a la financiarización de la vivienda.',
      hombrosSolution: 'Hombros utiliza el BFF como fuente empírica directa de E₁ y E₃, pero lo conecta obligatoriamente con la cohesión comunitaria (S) y la distribución del ingreso (K).'
    }
  },
  {
    id: 'barcelona',
    name: 'Barcelona (Cataluña, España)',
    badge: '🇪🇸 España · Superilles & ASPB',
    frameworkTitle: 'Superilles & Agència de Salut Pública (ASPB)',
    frameworkType: 'Urbanismo Ecosistémico (Salvador Rueda) & Salud Comunitaria',
    tagline: 'Peatonalización radical, confort acústico e inversión de la prioridad del automóvil',
    status: 'amber',
    statusLabel: 'Zona de Ajuste · Éxito Peatonal vs. Gentrificación Verde',
    sigma: 0.88,
    fs: 1.14,
    hombros: { S: 0.82, E: 0.68, K: 0.78, H: 0.76, D: 0.67 },
    nativeMetrics: [
      {
        dimension: 'Reducción de Tráfico Rodado de Paso',
        val: '-82%',
        target: 'Eliminación del tráfico pasante en interior de superilles',
        status: 'safe',
        type: 'Urbanismo Ecosistémico',
        desc: 'Calles pacificadas a 10 km/h con preferencia peatonal absoluta.'
      },
      {
        dimension: 'Espacio Público Ganado al Asfalto',
        val: '+33.400 m²',
        target: '1 millón de m² al 2030 en la trama Cerdà',
        status: 'safe',
        type: 'Salud Urbana (ASPB)',
        desc: 'Transformación de cruces vehiculares en plazas comunitarias verdes.'
      },
      {
        dimension: 'Atenuación del Ruido Ambiental',
        val: '-5 dB(A)',
        target: '< 65 dB(A) diurno en todas las manzanas pacificadas',
        status: 'safe',
        type: 'Salud Ambiental (ASPB)',
        desc: 'Reducción comprobada del estrés neuroacústico en vecinos residentes.'
      },
      {
        dimension: 'Confort Bioclimático / Isla de Calor',
        val: '-1.5°C',
        target: '-2.0°C en ejes verdes del Eixample',
        status: 'safe',
        type: 'Resiliencia Térmica',
        desc: 'Mayor evapotranspiración por suelo drenante y arbolado maduro.'
      }
    ],
    epistemicCritique: {
      strength: 'Demuestra que es posible recuperar el espacio urbano comunal sin demoler edificios, reduciendo la morbilidad cardiovascular por ruido y NO2.',
      blindspot: 'El aumento de habitabilidad genera gentrificación verde si no está blindado por vivienda pública o cooperativas de alquiler protegido.',
      hombrosSolution: 'Hombros pondera el Hombro Social (S) y la distribución del ingreso (K₃), advirtiendo si la mejora ambiental (E) desplaza a la población originaria por estrés de renta.'
    }
  },
  {
    id: 'medellin',
    name: 'Medellín (Antioquia, Colombia)',
    badge: '🇨🇴 Colombia · Corredores Verdes & SIATA',
    frameworkTitle: 'Corredores Verdes & Red SIATA (Urbanismo Social)',
    frameworkType: 'Bioclimatología Interandina & Red Pública SIATA',
    tagline: 'Enfriamiento microclimático de 3.5°C con 30 corredores arbóreos y cohesión en laderas',
    status: 'amber',
    statusLabel: 'Zona de Ajuste · Enfriamiento Urbano en Cuenca Confinada',
    sigma: 0.76,
    fs: 1.32,
    hombros: { S: 0.66, E: 0.68, K: 0.61, H: 0.65, D: 0.49 },
    nativeMetrics: [
      {
        dimension: 'Descenso Térmico en Islas de Calor',
        val: '-3.5°C',
        target: 'Reducción de 3.0°C en los 30 corredores viales principales',
        status: 'safe',
        type: 'Bioclimática SIATA',
        desc: 'Auditado por la red de sensores meteorológicos superficiales SIATA.'
      },
      {
        dimension: 'Árboles y Palmeras Sembradas',
        val: '880.000 árboles',
        target: '1 millón de individuos arbóreos nativos en la cuenca',
        status: 'safe',
        type: 'Biomasa Urbana',
        desc: 'Conexión biológica continua entre cerros tutelares y el río Medellín.'
      },
      {
        dimension: 'Absorción Foliar de Contaminantes',
        val: '-18% ozono',
        target: 'Reducción de precursores fotoquímicos en horas punta',
        status: 'safe',
        type: 'Calidad del Aire (SIATA)',
        desc: 'Follaje denso que intercepta material particulado y reduce radiación solar.'
      },
      {
        dimension: 'Movilidad Eléctrica en Ladera (Metrocable)',
        val: '6 líneas activas',
        target: '100% integración tarifaria y alimentadores no fósiles',
        status: 'safe',
        type: 'Urbanismo Social',
        desc: 'Transporte aéreo por cable que ahorra 2 horas diarias de traslado a familias de comunas.'
      }
    ],
    epistemicCritique: {
      strength: 'Pionera en el Sur Global en conectar la regeneración biofísica con la justicia espacial y la reducción del calor extremo en sectores vulnerables.',
      blindspot: 'El confinamiento topográfico del valle genera episodios estacionales de inversión térmica severa que atrapan la polución industrial.',
      hombrosSolution: 'Hombros modeliza la cuenca atmosférica confinada como un volumen basal finito, limitando la carga vehicular permitida durante la inversión térmica.'
    }
  },
  {
    id: 'paris',
    name: 'París (Île-de-France, Francia)',
    badge: '🇫🇷 Francia · Ciudad de los 15 Minutos',
    frameworkTitle: 'La Ville du Quart-d\'Heure (15 Minutos) & Cours Oasis',
    frameworkType: 'Hiperproximidad Urbana (Carlos Moreno / Mairie de Paris)',
    tagline: 'Acceso en 15 minutos a pie/bici a las 6 funciones urbanas esenciales y desasfaltado de escuelas',
    status: 'amber',
    statusLabel: 'Zona de Ajuste · Gran Éxito Interno vs. Alto Scope 3 Global',
    sigma: 0.84,
    fs: 1.19,
    hombros: { S: 0.81, E: 0.65, K: 0.73, H: 0.73, D: 0.61 },
    nativeMetrics: [
      {
        dimension: 'Índice de Proximidad a 6 Funciones Vitales',
        val: '94%',
        target: '100% de la población con acceso < 15 min a pie/bici',
        status: 'safe',
        type: 'Hiperproximidad (Moreno)',
        desc: 'Habitar, trabajar, aprovisionarse, cuidarse, educarse y descansar en proximidad.'
      },
      {
        dimension: 'Transformación de Patios Escolares (Cours Oasis)',
        val: '300 colegios',
        target: '100% de escuelas públicas transformadas al 2026',
        status: 'safe',
        type: 'Refugios Bioclimáticos',
        desc: 'Desasfaltado de patios con suelo natural, sombra arbórea y apertura barrial.'
      },
      {
        dimension: 'Descenso del Tráfico Automotor Interno',
        val: '-40%',
        target: 'Reducción sostenida del vehículo privado en la trama intramuros',
        status: 'safe',
        type: 'Movilidad Activa',
        desc: 'Plan Bicicleta y peatonalización completa de los muelles del Sena.'
      },
      {
        dimension: 'Emisiones de Alcance 3 por Consumo Importado',
        val: '7.8 tCO2e/cap',
        target: '< 2.5 tCO2e/cap (Meta Acuerdos de París)',
        status: 'overshoot',
        type: 'Scope 3 (Overshoot Global)',
        desc: 'Alta huella de carbono embebida en productos importados, aviación y moda.'
      }
    ],
    epistemicCritique: {
      strength: 'Revolucionó el planeamiento urbano global al redefinir la ciudad desde el tiempo y la proximidad humana, liberando el asfalto escolar.',
      blindspot: 'La ciudad intramuros transfiere gran parte de su metabolismo de servicios y residuos a la periferia desfavorecida de las banlieues.',
      hombrosSolution: 'Hombros amplía la escala de análisis a la totalidad de la biorregión de la cuenca del Sena para evitar el efecto de segregación centro/periferia.'
    }
  },
  {
    id: 'aconcagua',
    name: 'Valle de Aconcagua (Valparaíso, Chile)',
    badge: '🇨🇱 Chile · Cuenca Agroexportadora',
    frameworkTitle: 'Balance Hídrico DGA & Agua Virtual Exportada',
    frameworkType: 'Hidrometría de Cuenca & Huella Hídrica Agroexportadora',
    tagline: 'Sobreotorgamiento de derechos consuntivos de agua y monocultivo de palta en laderas',
    status: 'red',
    statusLabel: 'Sobrecarga Plástica · Sobreexplotación Hídrica Estructural',
    sigma: 1.12,
    fs: 0.89,
    hombros: { S: 0.52, E: 0.28, K: 0.45, H: 0.40, D: 0.45 },
    nativeMetrics: [
      {
        dimension: 'Déficit Hídrico de Cuenca',
        val: '-55% recarga',
        target: 'Balance neutro entre extracción y recarga anual',
        status: 'overshoot',
        type: 'DGA / Balance Hidrológico',
        desc: 'Extracciones de derechos de agua superan en más del doble la capacidad natural.'
      },
      {
        dimension: 'Agua Virtual Exportada en Paltos',
        val: '1.000 l/kg fruta',
        target: 'Tope máximo de extracción para exportación',
        status: 'overshoot',
        type: 'Huella Hídrica de Exportación',
        desc: 'Drenaje sistemático de cuencas de cabecera exportado hacia mercados del Norte Global.'
      },
      {
        dimension: 'Comités APR con Racionamiento Hídrico',
        val: '14 comités',
        target: '0 comités dependientes de camiones aljibe',
        status: 'deficit',
        type: 'Derecho Humano al Agua',
        desc: 'Poblaciones rurales sin agua potable directa por secado de napas superficiales.'
      },
      {
        dimension: 'Decretos de Escasez Hídrica Continua',
        val: '14 años seguidos',
        target: 'Recuperación de la sustentabilidad de la cuenca',
        status: 'deficit',
        type: 'Emergencia Climática MOP',
        desc: 'Régimen permanente de excepción por agotamiento estructural del acuífero.'
      }
    ],
    epistemicCritique: {
      strength: 'La DGA y el MOP disponen de una de las mejores redes de telemetría de caudales y pozos de monitoreo piezométrico de Sudamérica.',
      blindspot: 'El Código de Aguas histórico mercantilizó los derechos de agua, separándolos de la tierra y priorizando el lucro agroexportador sobre el consumo humano.',
      hombrosSolution: 'Hombros demuestra que el agua (E₂) no es sustituible por divisas de exportación (K), activando la regla de restricción inmediata cuando el acuífero entra en régimen plástico.'
    }
  },
  {
    id: 'bilbao',
    name: 'Bilbao (Bizkaia, España)',
    badge: '🇪🇸 Euskadi · Regeneración Ría & Ihobe',
    frameworkTitle: 'Ihobe / SEEA-EA & Regeneración Post-Industrial',
    frameworkType: 'Contabilidad del Capital Natural & Agencia Vasca de Medio Ambiente',
    tagline: 'Biorremediación de la Ría del Nervión, saneamiento de suelos pesados y ecodiseño',
    status: 'green',
    statusLabel: 'Zona Segura · Recuperación Resiliente de la Ría',
    sigma: 0.74,
    fs: 1.35,
    hombros: { S: 0.84, E: 0.70, K: 0.78, H: 0.77, D: 0.57 },
    nativeMetrics: [
      {
        dimension: 'Oxígeno Disuelto en la Ría del Nervión',
        val: '> 80% saturación',
        target: '> 70% para soporte de vida acuática y pesca',
        status: 'safe',
        type: 'Ihobe / Calidad de Aguas',
        desc: 'Recuperación radical de un estuario que en los años 80 era biológicamente muerto.'
      },
      {
        dimension: 'Descontaminación de Suelos Pesados',
        val: '> 320 hectáreas',
        target: '100% de suelos industriales inventariados saneados',
        status: 'safe',
        type: 'Ihobe / Pasivos de Suelo',
        desc: 'Biorremediación y confinamiento de metales pesados de la siderurgia histórica.'
      },
      {
        dimension: 'Huella de Carbono Municipal (Udalsarea)',
        val: '-38%',
        target: '-45% al 2030 (vs línea base 2005)',
        status: 'safe',
        type: 'Mitigación Climática',
        desc: 'Reducción de emisiones industriales y electrificación del tranvía/metro.'
      },
      {
        dimension: 'Reconversión del Empleo Siderúrgico',
        val: '90% absorbido',
        target: 'Transición justa sin expulsión demográfica',
        status: 'safe',
        type: 'Hombro Social & Económico',
        desc: 'Paso exitoso de la metalurgia pesada a servicios avanzados, diseño y cultura.'
      }
    ],
    epistemicCritique: {
      strength: 'Ejemplo mundial de restauración biofísica de un estuario totalmente anóxico y desindustrialización planificada.',
      blindspot: 'Sigue manteniendo alta dependencia de cadenas de suministro automotrices y químicas globales.',
      hombrosSolution: 'Hombros audita la sintropía neta del territorio verificando que la tasa de recuperación de la ría supere la generación de nuevos pasivos.'
    }
  },
  {
    id: 'los_molles',
    name: 'Los Molles (Costa Norte, Chile)',
    badge: '🇨🇱 Chile · Humedales Costeros & Borde Mar',
    frameworkTitle: 'Ley de Humedales Urbanos & Bosque Esclerófilo Costero',
    frameworkType: 'Protección de Humedales Costeros (Ley 21.202) & Ecosistemas Frágiles',
    tagline: 'Presión inmobiliaria sobre humedal estuarino y bosque esclerófilo relictual de laderas',
    status: 'red',
    statusLabel: 'Sobrecarga Plástica · Conflicto Inmobiliario sobre Humedal',
    sigma: 1.08,
    fs: 0.93,
    hombros: { S: 0.60, E: 0.38, K: 0.42, H: 0.46, D: 0.50 },
    nativeMetrics: [
      {
        dimension: 'Superficie Protegida del Humedal Estuario',
        val: '16.4 ha declaradas',
        target: 'Protección total de la cuenca estuarina (90 ha)',
        status: 'warning',
        type: 'Ley 21.202 / MMA',
        desc: 'Declaratoria ministerial lograda tras larga movilización comunitaria vecinal.'
      },
      {
        dimension: 'Riesgo de Inundación por Tsunami y Marejada',
        val: '100% en zona de inundación',
        target: '0 edificaciones residenciales en cota de inundación SHOA',
        status: 'overshoot',
        type: 'Riesgo de Desastre SHOA',
        desc: 'Edificios levantados sobre cono de deyección y paleocauce del estero.'
      },
      {
        dimension: 'Fragmentación de Bosque Esclerófilo Relictual',
        val: '-35% cobertura',
        target: 'Preservación de biomasa esclerófila costera',
        status: 'deficit',
        type: 'CONAF / Catastro',
        desc: 'Tala no autorizada de lucumillos y chaguales para urbanización turística.'
      },
      {
        dimension: 'Déficit Hídrico Estival por Turismo',
        val: '-60% presión',
        target: 'Suficiencia para consumo permanente de pescadores',
        status: 'overshoot',
        type: 'Estrés de Capacidad de Carga',
        desc: 'Multiplicación por 10 de la población en enero y febrero que seca los pozos locales.'
      }
    ],
    epistemicCritique: {
      strength: 'La Ley 21.202 de Humedales Urbanos otorga una herramienta legal ciudadana para frenar la destrucción de cuencas litorales.',
      blindspot: 'La especulación inmobiliaria utiliza resquicios legales y la debilidad de los planes reguladores comunales para rellenar los humedales antes de su declaratoria.',
      hombrosSolution: 'Hombros modela el humedal como un amortiguador elástico no lineal contra tsunamis y marejadas; su eliminación destruye el módulo elástico del territorio.'
    }
  },
  {
    id: 'singapore',
    name: 'Singapur (Ciudad-Estado)',
    badge: '🇸🇬 Singapur · Green Plot Ratio & NEWater',
    frameworkTitle: 'Green Plot Ratio (GnPR 3D) & Singapore Green Plan 2030',
    frameworkType: 'Estándar Legal de Biomasa Vertical & Reciclaje Molecular',
    tagline: 'Obligación por ley de multiplicar por 3x el área vegetal del edificio y agua circular NEWater',
    status: 'amber',
    statusLabel: 'Zona de Ajuste · Alta Circularidad Interna vs Dependencia Alimentaria',
    sigma: 0.86,
    fs: 1.16,
    hombros: { S: 0.87, E: 0.71, K: 0.82, H: 0.79, D: 0.68 },
    nativeMetrics: [
      {
        dimension: 'Green Plot Ratio Vertical (GnPR)',
        val: '3.4x huella',
        target: '≥ 3.0x densidad de follaje vegetal (LAI) en nuevos rascacielos',
        status: 'safe',
        type: 'Estándar Legal GnPR',
        desc: 'Densidad tridimensional de biomasa que enfría fachadas y retiene escorrentías monzónicas.'
      },
      {
        dimension: 'Autonomía Hídrica Circular (NEWater)',
        val: '40% suministro',
        target: '55% de la demanda nacional cubierta por reciclaje de aguas residuales al 2030',
        status: 'safe',
        type: 'PUB Singapore / Circularidad',
        desc: 'Microfiltración, ósmosis inversa y desinfección ultravioleta a escala metropolitana.'
      },
      {
        dimension: 'Enfriamiento de Distrito Marina Bay',
        val: '-40% energía',
        target: 'Red centralizada subterránea de agua helada más grande del mundo',
        status: 'safe',
        type: 'Eficiencia Metabólica',
        desc: 'Sustitución de miles de equipos de aire acondicionado individuales por circuito central.'
      },
      {
        dimension: 'Dependencia Alimentaria del Exterior',
        val: '90% importado',
        target: 'Estrategia 30x30 (producir el 30% localmente con granjas verticales al 2030)',
        status: 'overshoot',
        type: 'Vulnerabilidad Basal',
        desc: 'Fragilidad extrema de soporte vital calórico ante disrupciones de comercio global.'
      }
    ],
    epistemicCritique: {
      strength: 'Singapur demostró cómo una metrópoli de alta densidad puede obligar a la arquitectura a regenerar biomasa 3D mediante leyes urbanas vinculantes.',
      blindspot: 'Su modelo híper-tecnológico depende críticamente del gas natural importado y de cadenas agroalimentarias externas.',
      hombrosSolution: 'Hombros audita el soporte calórico basal: advierte que una falla en los flujos externos de entrada (Inflow) desploma la elasticidad territorial a pesar del capital financiero.'
    }
  },
  {
    id: 'curitiba',
    name: 'Curitiba (Paraná, Brasil)',
    badge: '🇧🇷 Brasil · Câmbio Verde & Áreas Verdes',
    frameworkTitle: 'Programa Câmbio Verde & 52 m² de Área Verde',
    frameworkType: 'Metabolismo Urbano Popular & Agroecología de Cuenca',
    tagline: 'Canje de residuos reciclables por frutas campesinas y mitigación de inundaciones con 30 parques',
    status: 'green',
    statusLabel: 'Zona Segura · Metabolismo Circular y Alta Biocapacidad',
    sigma: 0.72,
    fs: 1.38,
    hombros: { S: 0.76, E: 0.77, K: 0.68, H: 0.74, D: 0.53 },
    nativeMetrics: [
      {
        dimension: 'Área Verde Pública Protegida',
        val: '52 m²/hab',
        target: '> 12 m²/hab (OMS recomienda 9 m²/hab)',
        status: 'safe',
        type: 'Biomasa & Drenaje Natural',
        desc: '30 parques metropolitanos diseñados como lagos de retención de crecidas del río Iguaçu.'
      },
      {
        dimension: 'Canje Nutricional Câmbio Verde',
        val: '4 kg x 1 kg',
        target: '100% de favelas y zonas periféricas con acceso a canje semanal de alimentos',
        status: 'safe',
        type: 'Soberanía Alimentaria & Residuos',
        desc: '4 kg de basura reciclable se canjean por 1 kg de hortalizas de agricultores familiares.'
      },
      {
        dimension: 'Reciclaje Domiciliario de Residuos',
        val: '70% cobertura',
        target: 'Cero residuos reciclables en rellenos sanitarios',
        status: 'safe',
        type: 'Metabolismo Circular',
        desc: 'Programa pionero "Lixo que não é Lixo" activo desde hace más de 30 años.'
      },
      {
        dimension: 'Preservación de Manantiales Periurbanos',
        val: 'Zona de Mananciais',
        target: 'Contención absoluta de loteos clandestinos en cabeceras de cuenca',
        status: 'warning',
        type: 'Protección Hídrica',
        desc: 'Tensión permanente entre especulación del suelo y reserva hídrica metropolitana.'
      }
    ],
    epistemicCritique: {
      strength: 'Câmbio Verde es el mejor ejemplo sudamericano de desmercantilización: une la limpieza de la cuenca con la nutrición infantil y la economía campesina sin mediación bancaria.',
      blindspot: 'El modelo no resolvió la brecha de desigualdad estructural de ingresos entre el centro planificado y la periferia metropolitana.',
      hombrosSolution: 'Hombros demuestra cómo el trueque no monetario fortalece el Hombro Social (S₁) y la soberanía biótica (K₄) elevando el módulo elástico del territorio.'
    }
  },
  {
    id: 'kamikatsu',
    name: 'Kamikatsu (Tokushima, Japón)',
    badge: '🇯🇵 Japón · Declaración Zero Waste',
    frameworkTitle: 'Protocolo Zero Waste de 45 Categorías (Mottainai)',
    frameworkType: 'Metabolismo Material Cerrado & Entropía Cero sin Incineración',
    tagline: 'Segregación comunitaria en 45 flujos con > 81% de reciclaje real y tienda de trueque Kuru Kuru',
    status: 'green',
    statusLabel: 'Zona Segura · Mínima Entropía Material Mundial',
    sigma: 0.52,
    fs: 1.92,
    hombros: { S: 0.84, E: 0.82, K: 0.68, H: 0.78, D: 0.40 },
    nativeMetrics: [
      {
        dimension: 'Tasa Real de Desvío de Vertedero',
        val: '81.2%',
        target: '100% basura cero sin incineración industrial',
        status: 'safe',
        type: 'Economía Circular Pura',
        desc: 'Auditoría estricta de materiales que evita la quema de plásticos y metales.'
      },
      {
        dimension: 'Categorías de Segregación en Origen',
        val: '45 categorías',
        target: 'Separación meticulosa de metales, vidrios, plásticos y textiles',
        status: 'safe',
        type: 'Metabolismo de Materiales',
        desc: 'Los vecinos lavan y clasifican sus propios descartes en la estación cívica central.'
      },
      {
        dimension: 'Compostaje Orgánico Domiciliario',
        val: '98% hogares',
        target: '100% de la fracción orgánica reintegrada al suelo montano',
        status: 'safe',
        type: 'Suelo Vivo & Sintropía',
        desc: 'Subsidio municipal a máquinas de compostaje eléctrico y biodigestores.'
      },
      {
        dimension: 'Sostenibilidad Demográfica Rural',
        val: '-1.8% anual',
        target: 'Estabilización poblacional con atracción de jóvenes agroecológicos',
        status: 'deficit',
        type: 'Vulnerabilidad Generacional',
        desc: 'El 50% de la población supera los 65 años, tensionando el recambio generacional.'
      }
    ],
    epistemicCritique: {
      strength: 'Demuestra empíricamente la viabilidad de la entropía cero material a escala comunal con gobernanza descentralizada.',
      blindspot: 'La gran dedicación horaria a la clasificación requiere un tejido social muy cohesionado que es difícil de escalar a metrópolis alienadas.',
      hombrosSolution: 'Hombros formaliza la cultura del Mottainai como una reducción radical de la disipación entrópica, disminuyendo la carga D₁ al mínimo biofísico posible.'
    }
  }
];

export const BUEN_VIVIR_METHODOLOGY = {
  title: 'Protocolo de Integración Formal de Métricas del Buen Vivir (Sumak Kawsay / Küme Mogen)',
  subtitle: 'De la filosofía biocéntrica a la medición matemática rigurosa en el Modelo Hombros',
  pillars: [
    {
      id: 'cuidados',
      title: '1. Tiempo Social de Cuidados y Minga (S₁)',
      concept: 'El trabajo no remunerado de reproducción comunitaria es el soporte metabólico fundamental de cualquier sociedad.',
      formalMetric: 'Horas semanales dedicadas a cuidados intergeneracionales, preparación comunitaria de alimentos y faenas colectivas (minga) por habitante.',
      formula: 's_1 = \\min\\left(1, \\frac{\\text{Horas Comunitarias Semanales}}{\\text{Umbral Basal de Reproducción Vital (25 hrs/sem/hogar)}}\\right)',
      source: 'Encuestas Territoriales de Uso del Tiempo Comunitario / Encuesta de Cuidados Locales'
    },
    {
      id: 'semillas',
      title: '2. Soberanía de Semillas y Redes Trafkintu (K₂)',
      concept: 'La autonomía agroalimentaria se mide en la capacidad del territorio de sembrar sin depender de semillas híbridas o patentadas por transnacionales.',
      formalMetric: 'Porcentaje de semillas y propágulos utilizados que provienen de variedades tradicionales reproducidas localmente o intercambiadas en trafkintu.',
      formula: 'k_2 = \\frac{\\text{Variedades Criollas Custodiadas en Cuenca}}{\\text{Total de Variedades Agrícolas Sembradas}}',
      source: 'Registros de Redes de Semillas Libres / Catastro de Huertos Familiares INDAP'
    },
    {
      id: 'ko',
      title: '3. Inviolabilidad del Agua Sagrada (Ko) y Gestión APR (E₂)',
      concept: 'El agua es concebida como un ser vivo interconectado con la cuenca (Itrofill Mogen), no como un derecho consuntivo transable en el mercado.',
      formalMetric: 'Ratio entre el caudal garantizado para consumo humano y caudal ecológico comunal respecto a las extracciones de gran escala.',
      formula: 'e_2 = \\frac{Q_{\\text{APR}} + Q_{\\text{ecológico}}}{Q_{\\text{extracción consuntiva comercial}} + Q_{\\text{APR}}}',
      source: 'Monitoreo de Comités APR / DGA / Aforos Comunitarios de Vertientes'
    },
    {
      id: 'itrofill',
      title: '4. Integridad del Itrofill Mogen (Todas las Vidas) (E₁)',
      concept: 'La riqueza del territorio reside en la coexistencia de múltiples especies nativas, en contraposición al monocultivo biológicamente estéril.',
      formalMetric: 'Superficie de bosque nativo esclerófilo / higrófilo y humedales protegidos respecto a plantaciones de especies exóticas invasoras.',
      formula: 'e_1 = \\frac{\\text{Superficie Bosque Nativo (ha)}}{\\text{Superficie Nativo (ha)} + \\text{Superficie Monocultivo Forestal Exótico (ha)}}',
      source: 'Geoportal CONAF / Teledetección Satelital Sentinel-2 / Mapas Bioculturales'
    }
  ],
  institutionalPrecedents: [
    {
      name: 'SENPLADES (Ecuador) · Índice del Buen Vivir Urbano y Rural (IBV)',
      year: '2013-2017',
      focus: 'Primer índice estadístico oficial de un Estado. Evaluó 6 dimensiones: Soberanía Alimentaria, Hábitat, Tiempo de Vida, Redes de Apoyo y Armonía con la Naturaleza.',
      relevance: 'Demostró formalmente que el Buen Vivir es cuantificable sin recurrir a la lógica monetaria del PIB.'
    },
    {
      name: 'UDAPE (Bolivia) · Indicadores del Vivir Bien',
      year: '2014',
      focus: 'Métricas de complementariedad y equilibrio biocéntrico con la Pachamama.',
      relevance: 'Estableció umbrales de no-afectación a los ciclos biológicos de las cuencas andinas.'
    },
    {
      name: 'HOMBROS (Santander & EHU) · El Tensor Mecánico Biocéntrico',
      year: 'Presente',
      focus: 'Traducción de los principios del Küme Mogen a un tensor de mecánica de medios continuos y resistencia de materiales.',
      relevance: 'Resuelve el déficit de modelización: impone la regla matemática de no-sustituibilidad donde un daño al Itrofill Mogen no puede ser pagado con transferencias monetarias.'
    }
  ]
};

export default function DeepDiveCasesView({ 
  selectedTerritoryId, 
  setSelectedTerritoryId, 
  onNavigateToMap 
}) {
  const [internalSelectedId, setInternalSelectedId] = useState('copenhagen');
  const [showMethodology, setShowMethodology] = useState(false);

  const activeCaseId = selectedTerritoryId || internalSelectedId;
  const handleSelectCase = (id) => {
    if (setSelectedTerritoryId) {
      setSelectedTerritoryId(id);
    }
    setInternalSelectedId(id);
    setShowMethodology(false);
  };

  const activeCase = DEEP_DIVE_CASES.find(c => c.id === activeCaseId) || DEEP_DIVE_CASES[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bio-hud-panel shadow-2xl border border-emerald-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-bio-deep border-cyan-500/40 text-cyan-300">
                BENCHMARK EMPÍRICO & MARCOS TESTEADOS
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300">
                11 CASOS TERRITORIALES (100% SINCRONIZADOS CON MAPA MUNDI)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-white">
              Contraste de Métricas: Marcos Locales vs. Modelo Hombros
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Auditoría comparativa y epistemológica entre las herramientas de gestión territorial ya testeadas 
              (<strong>Economía del Donut</strong> en Copenhague y Ámsterdam, <strong>Buen Vivir / Küme Mogen</strong> en Chanco, 
              <strong>Matriz PRAS</strong> en Quintero, <strong>BFF</strong> en Berlín, <strong>Superilles</strong> en Barcelona, 
              <strong>Corredores Verdes</strong> en Medellín y <strong>Ciudad de los 15 Minutos</strong> en París) 
              frente a la formulación unificada de mecánica de medios continuos de Hombros.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {onNavigateToMap && (
              <button
                onClick={() => onNavigateToMap(activeCase.id)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-mono font-bold bg-bio-deep hover:bg-bio-surface text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-md shadow-cyan-950/40"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Ver Datos Crudos en Mapa</span>
              </button>
            )}

            {/* Toggle Button for Buen Vivir Methodology Modal/Section */}
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-bold transition-all border ${
                showMethodology
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/50'
                  : 'bg-bio-deep hover:bg-bio-surface text-emerald-300 border-emerald-500/40 hover:border-emerald-300'
              }`}
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>{showMethodology ? 'Cerrar Metodología Buen Vivir' : 'Ver Protocolo Formal Buen Vivir'}</span>
            </button>
          </div>
        </div>

        {/* Territory Selector Tabs (All 11 synchronized) */}
        <div className="mt-8 pt-6 border-t border-emerald-500/20 flex flex-wrap gap-2">
          {DEEP_DIVE_CASES.map(c => {
            const isSelected = activeCaseId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleSelectCase(c.id)}
                className={`text-xs px-3.5 py-2 rounded-2xl border transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-serif font-bold border-cyan-400 shadow-lg shadow-cyan-950/50 ring-2 ring-cyan-400/40'
                    : 'bg-bio-deep/90 text-slate-300 hover:text-white hover:bg-bio-surface border-emerald-500/20 font-medium'
                }`}
              >
                <span>{c.name.split('(')[0].trim()}</span>
                <span className="text-[9px] font-mono opacity-80 py-0.5 px-1.5 rounded bg-black/40">
                  {c.frameworkTitle.split('(')[0].slice(0, 16)}...
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Section: Buen Vivir Methodology when opened */}
      <AnimatePresence>
        {showMethodology && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 sm:p-8 rounded-3xl bio-hud-panel border-2 border-emerald-500/50 shadow-2xl space-y-6 overflow-hidden"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-emerald-500/20">
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40">
                <Leaf className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                  MANIFIESTO METODOLÓGICO Y CUANTITATIVO
                </span>
                <h2 className="text-xl font-bold font-serif text-white">
                  {BUEN_VIVIR_METHODOLOGY.title}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {BUEN_VIVIR_METHODOLOGY.subtitle}
                </p>
              </div>
            </div>

            {/* 4 Pillars of Buen Vivir Formalization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {BUEN_VIVIR_METHODOLOGY.pillars.map(p => (
                <div key={p.id} className="p-5 rounded-2xl bg-bio-deep/90 border border-emerald-500/30 space-y-3 shadow-inner">
                  <h3 className="font-serif font-bold text-sm text-emerald-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{p.concept}"
                  </p>
                  
                  <div className="p-3 rounded-xl bg-bio-void/80 border border-emerald-500/20 text-xs font-mono space-y-1.5">
                    <span className="text-[10px] uppercase text-cyan-300 font-bold block">Definición Operativa:</span>
                    <p className="text-slate-200 text-[11px] leading-tight">{p.formalMetric}</p>
                    <div className="mt-2 pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-400">
                      <code>{p.formula}</code>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Fuente empírica: {p.source}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Precedents Comparison Table */}
            <div className="mt-6 pt-5 border-t border-emerald-500/20">
              <h3 className="font-serif font-bold text-sm text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Precedentes de Medición Institucional: Del Estado a la Mecánica Territorial
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {BUEN_VIVIR_METHODOLOGY.institutionalPrecedents.map((inst, i) => (
                  <div key={i} className="p-4 rounded-xl bg-bio-deep/70 border border-emerald-500/20 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <strong className="text-white font-serif">{inst.name}</strong>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-bold">{inst.year}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-snug">{inst.focus}</p>
                    <p className="text-cyan-300 text-[10px] font-mono pt-1">Impacto: {inst.relevance}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Comparative Case Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The Native Framework Metrics */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bio-hud-panel border border-emerald-500/20 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-500/20">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  MARCO NATIVO TESTEADO EN EL TERRITORIO
                </span>
                <h2 className="text-2xl font-bold font-serif text-white mt-0.5">
                  {activeCase.frameworkTitle}
                </h2>
                <p className="text-xs text-slate-300 mt-1 font-mono">
                  {activeCase.frameworkType}
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-bio-deep border border-emerald-500/30 text-emerald-300 self-start sm:self-center font-bold">
                {activeCase.badge}
              </span>
            </div>

            <p className="text-xs text-emerald-100/80 italic font-serif leading-relaxed">
              "{activeCase.tagline}"
            </p>

            {/* List of Native Quantitative Metrics */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                Métricas e Indicadores Observables:
              </span>

              {activeCase.nativeMetrics.map((m, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-bio-deep/90 border border-emerald-500/20 space-y-2 hover:border-emerald-400/50 transition-all shadow-inner"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-serif font-bold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        m.status === 'safe' 
                          ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' 
                          : m.status === 'warning'
                            ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                            : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                      }`}></span>
                      {m.dimension}
                    </span>
                    <span className="font-mono text-[10px] text-cyan-300 px-2 py-0.5 rounded bg-bio-void border border-cyan-500/30">
                      {m.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono py-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Lectura Empírica:</span>
                      <strong className={`text-base font-black ${
                        m.status === 'safe' ? 'text-emerald-300' : 'text-rose-400'
                      }`}>
                        {m.val}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Objetivo / Umbral:</span>
                      <span className="text-slate-300 text-xs font-medium">{m.target}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300/80 leading-snug">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Translation to Hombros Mechanical Tensor */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bio-hud-panel border border-cyan-500/30 shadow-xl space-y-5">
            <div className="pb-4 border-b border-emerald-500/20">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                FORMULACIÓN EN EL MODELO HOMBROS
              </span>
              <h3 className="text-xl font-bold font-serif text-white mt-0.5">
                Tensor Mecánico & Capacidad Portante
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                H = (S · E · K)⅓ · σ = D / H · FS = H / D
              </p>
            </div>

            {/* Readouts of the Three Shoulders */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-bio-deep/90 border border-cyan-500/30">
                <span className="text-[10px] font-mono text-cyan-300 block font-bold">Hombro S</span>
                <span className="text-lg font-mono font-black text-white">{activeCase.hombros.S.toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-2xl bg-bio-deep/90 border border-emerald-500/30">
                <span className="text-[10px] font-mono text-emerald-300 block font-bold">Hombro E</span>
                <span className={`text-lg font-mono font-black ${activeCase.hombros.E < 0.25 ? 'text-rose-400' : 'text-white'}`}>
                  {activeCase.hombros.E.toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-bio-deep/90 border border-teal-500/30">
                <span className="text-[10px] font-mono text-teal-300 block font-bold">Hombro K</span>
                <span className="text-lg font-mono font-black text-white">{activeCase.hombros.K.toFixed(2)}</span>
              </div>
            </div>

            {/* Global H and Sigma Badges */}
            <div className="p-4 rounded-2xl bg-bio-deep/90 border border-emerald-500/30 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300">Capacidad Portante H:</span>
                <strong className="text-base text-emerald-300 font-black">{activeCase.hombros.H.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300">Presión de Carga D:</span>
                <strong className="text-base text-rose-300 font-black">{activeCase.hombros.D.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-emerald-500/20">
                <span className="text-white font-bold">Tensión Sistémica σ = D/H:</span>
                <strong className={`text-lg font-black ${
                  activeCase.sigma > 1.0 ? 'text-rose-400' : activeCase.sigma > 0.7 ? 'text-amber-300' : 'text-emerald-300'
                }`}>
                  {activeCase.sigma.toFixed(2)}
                </strong>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300">Factor de Seguridad FS:</span>
                <strong className="text-cyan-300 font-bold">{activeCase.fs.toFixed(2)}</strong>
              </div>
            </div>

            {/* Status Verdict */}
            <div className={`p-4 rounded-2xl border text-xs ${
              activeCase.status === 'green'
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                : activeCase.status === 'amber'
                  ? 'bg-amber-950/70 border-amber-500/50 text-amber-200'
                  : 'bg-rose-950/80 border-rose-500/70 text-rose-200'
            }`}>
              <strong className="block font-serif text-sm font-bold mb-1 text-white">
                Diagnóstico Hombros: {activeCase.statusLabel}
              </strong>
              <p className="leading-relaxed text-[11px] opacity-90">
                {activeCase.status === 'green' && 'El organismo territorial absorbe las presiones dentro de su régimen elástico seguro sin acumular fatiga.'}
                {activeCase.status === 'amber' && 'El territorio está en su límite elástico de servicio. Las fluctuaciones climáticas o de mercado pueden precipitar daño permanente.'}
                {activeCase.status === 'red' && 'La carga extractiva ha superado el límite de fluencia (Yield Point). Se acumulan pasivos ambientales irreversibles de suelo y agua.'}
                {activeCase.status === 'critical_red' && 'Alerta de fractura sistémica: uno de los hombros está por debajo de 0.25. La capacidad portante se ha derrumbado.'}
              </p>
            </div>

            {/* Epistemic Synthesis Dialogue Box */}
            <div className="p-4 rounded-2xl bg-bio-void/90 border border-emerald-500/30 space-y-3 text-xs">
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
                Síntesis Epistemológica Doctoral:
              </span>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div>
                  <strong className="text-emerald-400 block font-serif">Aporte del marco local:</strong>
                  <p className="text-slate-300">{activeCase.epistemicCritique.strength}</p>
                </div>
                <div>
                  <strong className="text-amber-400 block font-serif">Límite o punto ciego:</strong>
                  <p className="text-slate-300">{activeCase.epistemicCritique.blindspot}</p>
                </div>
                <div>
                  <strong className="text-cyan-300 block font-serif">Resolución del Modelo Hombros:</strong>
                  <p className="text-slate-200 font-medium">{activeCase.epistemicCritique.hombrosSolution}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
