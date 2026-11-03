import { getAssetUrl } from '../utils/assets.js';

/**
 * Comprehensive Territories Database - HOMBROS Metabolic Platform
 * Chilean & International Cities with Scope 1, 2, 3 Emissions & Public Open Data
 * 
 * Schema per territory:
 * 1. Metadata (id, name, country, coordinates [lat, lng], tag, bioregion, description, population, artImage, artCaption, badgeAccent)
 * 2. Bio-physical resources (water, biomass, energy, care) for BasalResourceMeters & mechanics.js
 * 3. Santander's Level 1 variables (s1-s4, e1-e4, k1-k4) for ThreeShouldersBreakdown
 * 4. Santander's Pressure variables (d1-d3) for MechanicalBalance
 * 5. Scope 1, 2, and 3 Emissions profile & Metabolic Balance
 * 6. Open Data Sources with official API/portal links
 * 7. Multi-temporal Historical Series for ChancoTimeline
 * 8. Continuum Mechanics material properties (E, yield, ultimate, fracture)
 * 9. Tradable surpluses for HoneycombNetwork (El Panal)
 */

export const INITIAL_TERRITORIES = [
  // ==========================================
  // 1. CHANCO (Maule, Chile) - CASO ANCLA
  // ==========================================
  {
    id: 'chanco',
    name: 'Chanco (Maule)',
    country: 'Chile',
    coordinates: [-35.7333, -72.5333],
    tag: 'Secano Costero Agroecológico & Pesca Artesanal',
    bioregion: 'Mediterráneo Centro-Sur (Bosque Esclerófilo - Costa)',
    description: 'Municipio rural costero de la Región del Maule. Territorio ancla del modelo Hombros. Sometido a fuerte presión hídrica por monocultivo forestal de pino y eucalipto sobre cuencas de cabecera, con baja renta per cápita pero notable tejido comunitario y conocimientos ancestrales de secano.',
    population: 9500,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Ciudadela Bioclimática de Chanco: Acueductos de infiltración comunitaria, cúpulas geodésicas y regeneración del bosque nativo.',
    badgeAccent: '#15803d',

    resources: {
      water: {
        name: 'Acuífero & Cuencas Litorales',
        unit: 'm³/mes/cap',
        basalNeed: 45,
        naturalInflow: 85,
        extractiveLoad: 55,
        weight: 0.35,
      },
      biomass: {
        name: 'Suelo Vivo & Cobertura Vegetal',
        unit: 'ton MO/ha',
        basalNeed: 28,
        naturalInflow: 50,
        extractiveLoad: 42,
        weight: 0.25,
      },
      energy: {
        name: 'Autosuficiencia Energética',
        unit: 'MWh/mes',
        basalNeed: 120,
        naturalInflow: 180,
        extractiveLoad: 110,
        weight: 0.15,
      },
      care: {
        name: 'Tiempo de Cuidados & Reproducción',
        unit: 'hrs/semana/comunidad',
        basalNeed: 3500,
        naturalInflow: 5000,
        extractiveLoad: 3100,
        weight: 0.25,
      }
    },

    variables: {
      s1: 0.62, // Cohesión social comunitaria
      s2: 0.48, // Capacidad institucional municipal
      s3: 0.55, // Capital humano y saberes locales
      s4: 0.70, // Ausencia de violencia estructural

      e1: 0.32, // Integridad ecosistémica (afectada por monocultivo)
      e2: 0.38, // Disponibilidad hídrica por cuenca
      e3: 0.40, // Calidad de suelo vivo
      e4: 0.45, // Resiliencia climática costera

      k1: 0.35, // Diversificación productiva
      k2: 0.28, // Autonomía económica (% ingresos propios)
      k3: 0.62, // Distribución del ingreso (1 - Gini)
      k4: 0.38, // Balance extracción/regeneración
    },

    pressureVars: {
      d1: 1.35, // Intensidad extractiva forestal
      d2: 0.50, // Presión demográfica
      d3: 0.85, // Extracción de rentas hacia grupos forestales externos
    },

    emissions: {
      scope1: 1.6, // tCO2e/capita (biomasa leña y transporte rural)
      scope2: 0.5, // tCO2e/capita (red eléctrica nacional SIC/SEN)
      scope3Upstream: 1.2, // tCO2e/capita (bajo consumo de bienes importados)
      scope3Downstream: 4.8, // tCO2e/capita (madera y celulosa exportada procesada fuera)
      localSequestration: 3.2, // tCO2e/capita capturada por remanentes nativos y suelo
      gridCarbonIntensity: 280, // gCO2/kWh (Chile SEN mix)
      dataSource: 'MMA Chile / Inventario Nacional GEI & SINIM',
      keyInsight: 'Huella de consumo muy baja (Scope 3 = 1.2 t), pero absorbe el pasivo hídrico y de suelo del modelo forestal exportador.'
    },

    openDataSources: [
      { name: 'SINIM Chile', url: 'https://sinim.gov.cl', type: 'API / Datos Municipales', description: 'Finanzas municipales, gasto social y población comunal.' },
      { name: 'DGA / MOP', url: 'https://snia.mop.gob.cl', type: 'Red Hidrométrica', description: 'Monitoreo de caudales superficiales y pozos de monitoreo de napas.' },
      { name: 'MMA Huella Chile', url: 'https://huellachile.mma.gob.cl', type: 'Registro GEI', description: 'Factores de emisión y balances comunales de carbono.' }
    ],

    history: [
      { year: 2002, S: 0.65, E: 0.58, K: 0.48, H: 0.56, sigma: 0.62, gamma: 0.01, note: 'Secano tradicional previo a la expansión masiva forestal' },
      { year: 2017, S: 0.58, E: 0.42, K: 0.36, H: 0.44, sigma: 0.98, gamma: -0.025, note: 'Tormenta de Fuego y estrés hídrico agudo' },
      { year: 2024, S: 0.58, E: 0.36, K: 0.39, H: 0.43, sigma: 1.05, gamma: -0.003, note: 'Situación actual: Zona de sobrecarga extractiva' },
      { year: 2030, S: 0.78, E: 0.65, K: 0.62, H: 0.68, sigma: 0.58, gamma: 0.08, isProjectedHombros: true, note: 'Transición Hombros: Agroforestería sintrópica y soberanía hídrica' },
      { year: 2030, S: 0.42, E: 0.20, K: 0.22, H: 0.26, sigma: 1.45, gamma: -0.06, isProjectedBAU: true, note: 'Inercial (BAU): Colapso hídrico y éxodo rural' }
    ],

    materialProperties: {
      modulusElasticity: 1.25,
      yieldStress: 0.72,
      ultimateStress: 0.95,
      fractureStress: 1.10,
    },

    surveys: {
      "povertyMultidimensional": "28.4% de hogares (CASEN 2022)",
      "gini": "0.42 (CASEN Comunal)",
      "socialTrust": "74% confianza comunitaria y redes de apoyo vecinal",
      "perceivedSafety": "82% percepción de tranquilidad en la vida cotidiana",
      "source": "CASEN 2022 / SUBDERE / Encuesta Rural Maule"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 95,
      "greenSpaceM2PerCapita": 8.5,
      "renewableEnergyShare": "38% (Matriz SEN Centro-Sur)",
      "municipalAutonomyRate": "21% ingresos propios vs 79% Fondo Común Municipal (SINIM)",
      "airQualityPM25": "14 µg/m³ (Estación Rural Maule)",
      "keyLocalTension": "Invasión de cuencas de cabecera por monocultivo de pino/eucalipto y desecación de norias tradicionales"
},

    tradableSurplus: [
      { id: 'legumbres', name: 'Legumbres de Secano (Lentejas de Chanco)', category: 'Agroecología', baseSurplus: 120, unit: 'ton' },
      { id: 'alga_cochayuyo', name: 'Cochayuyo y Algas Silvestres Manejadas', category: 'Maritorio', baseSurplus: 85, unit: 'ton' },
      { id: 'semillas_nativas', name: 'Bancos Comunitarios de Semillas', category: 'Biodiversidad', baseSurplus: 400, unit: 'kg' }
    ]
  },

  // ==========================================
  // 2. COPENHAGUE (Dinamarca)
  // ==========================================
  {
    id: 'copenhagen',
    name: 'Copenhague',
    country: 'Dinamarca',
    coordinates: [55.6761, 12.5683],
    tag: 'Descarbonización Urbana & Paradoja de Consumo Scope 3',
    bioregion: 'Mar Báltico / Cuenca del Øresund',
    description: 'Capital danesa pionera en el plan climático CPH 2025. Ha reducido drásticamente sus emisiones territoriales (Scope 1 y 2) mediante calefacción distrital con biomasa, turbinas eólicas offshore y más de un 62% de viajes en bicicleta. Sin embargo, su estándar de vida genera una enorme huella de importación de bienes (Scope 3 = 11.8 t/capita), ejemplificando la externalización metabólica hacia el Sur Global.',
    population: 650000,
    artImage: getAssetUrl('art/solarpunk_alley.jpg'),
    artCaption: 'Ecobarrios de Copenhague: Movilidad ciclista protegida, fachadas vegetales y microrredes térmicas de distrito.',
    badgeAccent: '#0ea5e9',

    resources: {
      water: {
        name: 'Red Subterránea & Desalación Báltica',
        unit: 'm³/mes/cap',
        basalNeed: 38,
        naturalInflow: 92,
        extractiveLoad: 41,
        weight: 0.25,
      },
      biomass: {
        name: 'Corredores Verdes & Suelo Periurbano',
        unit: 'ton MO/ha',
        basalNeed: 22,
        naturalInflow: 48,
        extractiveLoad: 29,
        weight: 0.20,
      },
      energy: {
        name: 'Eólica Offshore & Red Térmica Distrital',
        unit: 'MWh/mes',
        basalNeed: 4200,
        naturalInflow: 6100,
        extractiveLoad: 3950,
        weight: 0.30,
      },
      care: {
        name: 'Estado de Bienestar & Cuidados',
        unit: 'hrs/semana/comunidad',
        basalNeed: 140000,
        naturalInflow: 185000,
        extractiveLoad: 125000,
        weight: 0.25,
      }
    },

    variables: {
      s1: 0.88, // Muy alta confianza interpersonal y cohesión
      s2: 0.94, // Máxima capacidad institucional y transparencia
      s3: 0.90, // Altísimo nivel educativo y técnico
      s4: 0.92, // Mínima violencia estructural

      e1: 0.68, // Riberas y mar recuperados, aunque presión portuaria
      e2: 0.75, // Gestión hídrica eficiente
      e3: 0.60, // Suelo sellado urbano compensado por Finger Plan
      e4: 0.82, // Protección contra marejadas y cambio climático

      k1: 0.85, // Economía terciaria, biofarmacia y tecnologías limpias
      k2: 0.82, // Alta recaudación fiscal local
      k3: 0.80, // Baja desigualdad (Gini 0.26)
      k4: 0.42, // Déficit metabólico: alto consumo importado
    },

    pressureVars: {
      d1: 0.45, // Baja intensidad extractiva local
      d2: 0.80, // Alta presión de suelo y vivienda
      d3: 1.15, // Enorme flujo de importación de bienes de consumo (Scope 3)
    },

    emissions: {
      scope1: 1.9, // tCO2e/capita (muy baja por transporte ciclista y distrital)
      scope2: 0.6, // tCO2e/capita (matriz eólica casi neutral)
      scope3Upstream: 11.8, // tCO2e/capita (alimentos importados, electrónica, aviación)
      scope3Downstream: 2.1, // tCO2e/capita (bienes y servicios exportados)
      localSequestration: 0.9, // tCO2e/capita (parques urbanos y cinturón verde)
      gridCarbonIntensity: 95, // gCO2/kWh (Energinet Dinamarca)
      dataSource: 'Københavns Kommune Open Data / Energinet DK',
      keyInsight: 'Paradoja Nórdica: Scope 1 y 2 casi neutros (2.5 t), pero Scope 3 oculto es 4.7 veces mayor (11.8 t).'
    },

    openDataSources: [
      { name: 'Open Data DK (Copenhagen)', url: 'https://www.opendata.dk', type: 'Portal Abierto CKAN', description: 'Sensores de tráfico ciclista, calidad de aire y consumo eléctrico distrital.' },
      { name: 'Energinet DataHub', url: 'https://en.energinet.dk', type: 'API Grid en Vivo', description: 'Intensidad de carbono de la red eléctrica en tiempo real cada 5 minutos.' },
      { name: 'CPH Climate Monitor', url: 'https://kk.dk/klima', type: 'Reportes Oficiales', description: 'Metas anuales de reducción de emisiones bajo el marco GHG Protocol.' }
    ],

    history: [
      { year: 2002, S: 0.82, E: 0.52, K: 0.72, H: 0.67, sigma: 0.88, gamma: 0.008, note: 'Inicio del plan de distritos de calor' },
      { year: 2017, S: 0.87, E: 0.66, K: 0.76, H: 0.76, sigma: 0.78, gamma: 0.012, note: 'Despliegue masivo eólico y Supercykelstier' },
      { year: 2024, S: 0.91, E: 0.71, K: 0.78, H: 0.79, sigma: 0.80, gamma: 0.005, note: 'Próxima a carbono neutralidad territorial Scope 1+2' }
    ],

    materialProperties: {
      modulusElasticity: 1.85,
      yieldStress: 0.88,
      ultimateStress: 1.15,
      fractureStress: 1.35,
    },

    surveys: {
      "povertyMultidimensional": "7.1% (Eurostat AROPE Dinamarca)",
      "gini": "0.26 (Danmarks Statistik)",
      "socialTrust": "88% confianza interpersonal (Eurobarometer)",
      "perceivedSafety": "91% percepción de seguridad en espacio público",
      "source": "Københavns Borgere / Eurobarometer 2023 / Danmarks Statistik"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 104,
      "greenSpaceM2PerCapita": 42,
      "renewableEnergyShare": "82% (Eólica marina y calor distrital)",
      "municipalAutonomyRate": "88% autonomía fiscal propia",
      "airQualityPM25": "7.8 µg/m³ (CPH Air Monitor)",
      "keyLocalTension": "Paradoja de sostenibilidad: baja huella física local pero masiva huella Scope 3 importada de bienes de consumo"
},

    tradableSurplus: [
      { id: 'wind_tech', name: 'Software y Patentes de Gestión Eólica', category: 'Conocimiento', baseSurplus: 500, unit: 'licencias' },
      { id: 'biopharma', name: 'Enzimas y Biotecnología Médica', category: 'Biotecnología', baseSurplus: 180, unit: 'kg' }
    ]
  },

  // ==========================================
  // 3. BARCELONA (Catalunya, España)
  // ==========================================
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'España',
    coordinates: [41.3879, 2.1699],
    tag: 'Ecología Urbana, Superilles & Estrés Hídrico Mediterráneo',
    bioregion: 'Mediterráneo Occidental (Cuencas Besòs y Llobregat)',
    description: 'Cuna de la ecología urbana moderna de la mano de Salvador Rueda y su Agència d’Ecologia Urbana. Pionera en las "Superilles" (Superbloques) que pacifican el 70% del asfalto para vegetación y cohesión ciudadana. Sin embargo, sufre una megasequía estructural en las cuencas catalanas y una tremenda presión turística sobre el parque habitacional y el consumo de recursos.',
    population: 1636000,
    artImage: getAssetUrl('art/solarpunk_vignette.png'),
    artCaption: 'Superilles Solarpunk en el Eixample: Espacio público recuperado para huertos comunitarios, pérgolas fotovoltaicas y juegos vecinales.',
    badgeAccent: '#f59e0b',

    resources: {
      water: {
        name: 'Cuencas Ter-Llobregat & Desalinizadora El Prat',
        unit: 'm³/mes/cap',
        basalNeed: 35,
        naturalInflow: 44, // Severamente mermada por sequía
        extractiveLoad: 41,
        weight: 0.40,
      },
      biomass: {
        name: 'Collserola & Biodiversidad de Arbolado Urbano',
        unit: 'ton MO/ha',
        basalNeed: 20,
        naturalInflow: 36,
        extractiveLoad: 28,
        weight: 0.15,
      },
      energy: {
        name: 'Districlima, Solar Térmica & Red Eléctrica',
        unit: 'MWh/mes',
        basalNeed: 8200,
        naturalInflow: 9800,
        extractiveLoad: 8900,
        weight: 0.25,
      },
      care: {
        name: 'Tejido Vecinal, Ateneos & Cuidados',
        unit: 'hrs/semana/comunidad',
        basalNeed: 320000,
        naturalInflow: 410000,
        extractiveLoad: 360000,
        weight: 0.20,
      }
    },

    variables: {
      s1: 0.80, // Cohesión barrial y fuerte asociacionismo
      s2: 0.78, // Fuerte capacidad de planificación urbana
      s3: 0.82, // Universidades y ecosistema de diseño/arquitectura
      s4: 0.74, // Tensión social por gentrificación y acceso a vivienda

      e1: 0.52, // Presión costera y portuaria, compensada por Collserola
      e2: 0.26, // Estrés hídrico severo en cuencas del Llobregat y Ter
      e3: 0.50, // Renaturalización urbana activa (Plan Clima 2030)
      e4: 0.48, // Vulnerabilidad extrema a olas de calor mediterráneas

      k1: 0.75, // Economía mixta pero muy sesgada al turismo/servicios
      k2: 0.65, // Dependencia de transferencias autonómicas y estatales
      k3: 0.64, // Disparidad económica entre distritos (Nou Barris vs Sarrià)
      k4: 0.35, // Importación masiva de alimentos y materiales de construcción
    },

    pressureVars: {
      d1: 1.10, // Demanda hídrica al límite físico
      d2: 1.45, // Máxima densidad urbana europea (16.000 hab/km²) + 30M turistas
      d3: 1.20, // Inversión inmobiliaria global e impacto de cruceros portuarios
    },

    emissions: {
      scope1: 2.3, // tCO2e/capita (tráfico rodado, gas natural doméstico)
      scope2: 1.1, // tCO2e/capita (red peninsular REE)
      scope3Upstream: 8.4, // tCO2e/capita (cadena de suministro turístico, vuelos, alimentos)
      scope3Downstream: 3.2, // tCO2e/capita (actividad logística del Port de Barcelona)
      localSequestration: 0.45, // tCO2e/capita (Parc Natural de Collserola)
      gridCarbonIntensity: 145, // gCO2/kWh (Red Eléctrica de España)
      dataSource: 'Open Data BCN / Agència d’Ecologia Urbana / REE',
      keyInsight: 'La densidad urbana compacta reduce la movilidad en auto, pero la crisis hídrica (E2=0.26) y el turismo masivo tensionan el metabolismo basal.'
    },

    openDataSources: [
      { name: 'Open Data BCN', url: 'https://opendata-ajuntament.barcelona.cat', type: 'API REST Abierta', description: 'Calidad del aire en tiempo real, consumo de agua potable por barrio y aforos de tráfico.' },
      { name: 'Agència Catalana de l’Aigua (ACA)', url: 'https://aca.gencat.cat', type: 'Portal Hidrológico', description: 'Capacidad de embalses del sistema Ter-Llobregat y niveles de alerta por sequía.' },
      { name: 'Dades Obertes Catalunya', url: 'https://dadesobertes.gencat.cat', type: 'Repositorio Regional', description: 'Estadísticas de residuos, renovables y flujos de materiales.' }
    ],

    history: [
      { year: 2002, S: 0.75, E: 0.60, K: 0.65, H: 0.66, sigma: 0.85, gamma: 0.006, note: 'Expansión económica pre-crisis inmobiliaria' },
      { year: 2017, S: 0.77, E: 0.48, K: 0.62, H: 0.61, sigma: 1.05, gamma: -0.010, note: 'Inicio del programa Superilles y primer ciclo de sequía' },
      { year: 2024, S: 0.79, E: 0.44, K: 0.64, H: 0.60, sigma: 1.22, gamma: -0.003, note: 'Emergencia por sequía histórica y sobrecarga turística' }
    ],

    materialProperties: {
      modulusElasticity: 1.30,
      yieldStress: 0.78,
      ultimateStress: 1.05,
      fractureStress: 1.25,
    },

    surveys: {
      "povertyMultidimensional": "21.6% en riesgo de pobreza o exclusión (Idescat)",
      "gini": "0.34 (Dades Obertes BCN)",
      "socialTrust": "72% cohesión y asociacionismo barrial",
      "perceivedSafety": "68% preocupación por saturación turística y hurtos",
      "source": "Enquesta de Serveis Municipals BCN 2023 / Idescat"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 105,
      "greenSpaceM2PerCapita": 6.8,
      "renewableEnergyShare": "24% (Matriz REE Cataluña con alta dependencia nuclear)",
      "municipalAutonomyRate": "68% ingresos propios municipales",
      "airQualityPM25": "16.5 µg/m³ (Superilles redujeron NO₂ un 25% en Sant Antoni)",
      "keyLocalTension": "Crisis de acceso habitacional por presión turística y megasequía estructural en los embalses del Ter-Llobregat"
},

    tradableSurplus: [
      { id: 'urban_design', name: 'Metodología y Software de Superilles', category: 'Conocimiento', baseSurplus: 350, unit: 'proyectos' },
      { id: 'culture_design', name: 'Diseño Circular y Arquitectura Bioclimática', category: 'Servicios', baseSurplus: 220, unit: 'estudios' }
    ]
  },

  // ==========================================
  // 4. BILBAO (Euskadi, España)
  // ==========================================
  {
    id: 'bilbao',
    name: 'Bilbao (Bizkaia)',
    country: 'España',
    coordinates: [43.2630, -2.9350],
    tag: 'Metamorfosis Post-Industrial, Ría Regenerada & Economía Social',
    bioregion: 'Cornisa Cantábrica (Valle del Ibaizabal-Nervión)',
    description: 'El caso más celebrado de regeneración urbana e industrial del mundo. Tras el colapso del acero y la construcción naval en los años 80 y la contaminación terminal de la Ría del Nervión, articuló una transición integral basada en cohesión institucional, saneamiento ecológico y desarrollo tecnológico. Conexión directa con la escuela de Economía Ecológica de la UPV/EHU (Eneko Garmendia).',
    population: 345000,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Ría del Nervión Sintrópica: Pasarelas peatonales verdes, tranvías solares y recuperación de la biodiversidad estuarina.',
    badgeAccent: '#10b981',

    resources: {
      water: {
        name: 'Consorcio de Aguas Bilbao Bizkaia (Zadorra)',
        unit: 'm³/mes/cap',
        basalNeed: 42,
        naturalInflow: 96,
        extractiveLoad: 48,
        weight: 0.30,
      },
      biomass: {
        name: 'Anillo Verde de Bilbao & Montes de Bizkaia',
        unit: 'ton MO/ha',
        basalNeed: 26,
        naturalInflow: 58,
        extractiveLoad: 35,
        weight: 0.20,
      },
      energy: {
        name: 'Cogeneración Industrial & Hidroeléctrica Norte',
        unit: 'MWh/mes',
        basalNeed: 3100,
        naturalInflow: 3900,
        extractiveLoad: 3400,
        weight: 0.30,
      },
      care: {
        name: 'Tradición Comunitaria & Cooperativismo Vasco',
        unit: 'hrs/semana/comunidad',
        basalNeed: 82000,
        naturalInflow: 115000,
        extractiveLoad: 78000,
        weight: 0.20,
      }
    },

    variables: {
      s1: 0.85, // Fuerte capital social e identidad comunitaria vasca
      s2: 0.90, // Altísima eficacia institucional (Concierto Económico)
      s3: 0.84, // FP dual de vanguardia e ingeniería avanzada
      s4: 0.88, // Sociedad pacificada y segura

      e1: 0.65, // Recuperación radical de la fauna en la Ría
      e2: 0.82, // Clima oceánico húmedo con abastecimiento garantizado
      e3: 0.62, // Suelos descontaminados de pasivos minero-siderúrgicos
      e4: 0.70, // Resiliencia a inundaciones (canal de Deusto)

      k1: 0.72, // Diversificación industrial avanzada, aeronáutica y servicios
      k2: 0.86, // Autonomía fiscal vasca única en Europa
      k3: 0.78, // Desigualdad baja (Gini 0.25, el más bajo de España)
      k4: 0.52, // Intensidad energética siderúrgica aún en descarbonización
    },

    pressureVars: {
      d1: 0.85, // Demanda energética siderúrgica y logística portuaria
      d2: 0.65, // Valle encajonado pero población estable
      d3: 0.75, // Flujos de capital regulados por políticas de cluster local
    },

    emissions: {
      scope1: 3.4, // tCO2e/capita (industria siderúrgica y transporte comarcal)
      scope2: 1.4, // tCO2e/capita (red eléctrica con alta cuota eólica gallega y nuclear)
      scope3Upstream: 7.6, // tCO2e/capita (chatarra, minerales importados y bienes de consumo)
      scope3Downstream: 5.1, // tCO2e/capita (bienes de equipo y maquinaria de exportación)
      localSequestration: 1.4, // tCO2e/capita (Anillo Verde de Bilbao y bosques autóctonos)
      gridCarbonIntensity: 135, // gCO2/kWh
      dataSource: 'Open Data Euskadi / Ihobe / Eustat',
      keyInsight: 'Bilbao demuestra que la institucionalidad cooperativa (S2=0.90) es la clave para transitar de ruina industrial a ecología urbana regenerativa.'
    },

    openDataSources: [
      { name: 'Open Data Euskadi', url: 'https://opendata.euskadi.eus', type: 'API Pública CKAN', description: 'Inventario de gases de efecto invernadero de Euskadi, calidad del agua y suelo.' },
      { name: 'Ihobe (Sociedad Pública de Gestión Ambiental)', url: 'https://www.ihobe.eus', type: 'Indicadores Ecodiseño', description: 'Estrategia de Economía Circular y Huella de Carbono comarcal.' },
      { name: 'Eustat (Instituto Vasco de Estadística)', url: 'https://www.eustat.eus', type: 'Portal Estadístico', description: 'Cuentas ambientales y de flujo de materiales (MFA) del País Vasco.' }
    ],

    history: [
      { year: 2002, S: 0.76, E: 0.42, K: 0.60, H: 0.58, sigma: 1.15, gamma: 0.015, note: 'Fase inicial del Museo Guggenheim y saneamiento de la Ría' },
      { year: 2017, S: 0.82, E: 0.64, K: 0.70, H: 0.71, sigma: 0.82, gamma: 0.014, note: 'Apertura del Canal de Deusto y consolidadión eco-tecnológica' },
      { year: 2024, S: 0.87, E: 0.70, K: 0.74, H: 0.77, sigma: 0.75, gamma: 0.007, note: 'Ecosistema industrial circular y alta estabilidad' }
    ],

    materialProperties: {
      modulusElasticity: 1.65,
      yieldStress: 0.85,
      ultimateStress: 1.10,
      fractureStress: 1.30,
    },

    surveys: {
      "povertyMultidimensional": "13.2% riesgo de exclusión (Eustat EPDS)",
      "gini": "0.25 (Eustat - el menor de España)",
      "socialTrust": "84% arraigo y capital social cooperativo",
      "perceivedSafety": "86% percepción de seguridad comunitaria",
      "source": "Eustat / Deusto Barómetro Social / Ayuntamiento de Bilbao"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 112,
      "greenSpaceM2PerCapita": 24.5,
      "renewableEnergyShare": "35% (Eólica y cogeneración industrial)",
      "municipalAutonomyRate": "89% financiamiento propio (Concierto Económico Vasco)",
      "airQualityPM25": "9.2 µg/m³ (Red de Control de Calidad del Aire de Euskadi)",
      "keyLocalTension": "Descarbonización de hornos siderúrgicos y retención de talento joven en manufactura avanzada"
},

    tradableSurplus: [
      { id: 'industrial_machinery', name: 'Maquinaria de Precisión y Robótica de Reciclaje', category: 'Tecnología', baseSurplus: 420, unit: 'equipos' },
      { id: 'environmental_remediation', name: 'Consultoría en Biorremediación de Estuarios', category: 'Conocimiento', baseSurplus: 280, unit: 'horas/mes' }
    ]
  },

  // ==========================================
  // 5. ÁMSTERDAM (Países Bajos)
  // ==========================================
  {
    id: 'amsterdam',
    name: 'Ámsterdam',
    country: 'Países Bajos',
    coordinates: [52.3676, 4.9041],
    tag: 'Economía del Donut, Hub Portuario & Circularidad al 100%',
    bioregion: 'Delta del Rin-Mosa-Escalda / Pólders Litorales',
    description: 'Primera ciudad del mundo en adoptar oficialmente el modelo de la "Economía del Donut" de Kate Raworth (2020) para operar dentro de los límites planetarios y garantizar una base social digna. Su puerto es un nodo hiper-global de carbón, combustibles y cacao, generando una colosal huella de importación y exportación de materiales (Scope 3).',
    population: 882000,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Ámsterdam Circular: Canales renaturalizados, arquitectura flotante en madera y economía donut libre de residuos.',
    badgeAccent: '#8b5cf6',

    resources: {
      water: {
        name: 'Dunas de Ámsterdam (Waternet) & Canales',
        unit: 'm³/mes/cap',
        basalNeed: 40,
        naturalInflow: 110,
        extractiveLoad: 45,
        weight: 0.25,
      },
      biomass: {
        name: 'Huertos Comunitarios & Suelos de Pólder',
        unit: 'ton MO/ha',
        basalNeed: 24,
        naturalInflow: 52,
        extractiveLoad: 31,
        weight: 0.20,
      },
      energy: {
        name: 'Parques Eólicos Marinos & Calor Residual de Data Centers',
        unit: 'MWh/mes',
        basalNeed: 5800,
        naturalInflow: 7400,
        extractiveLoad: 6200,
        weight: 0.30,
      },
      care: {
        name: 'Cooperativas Vecinales & Cuidados de Proximidad',
        unit: 'hrs/semana/comunidad',
        basalNeed: 190000,
        naturalInflow: 250000,
        extractiveLoad: 175000,
        weight: 0.25,
      }
    },

    variables: {
      s1: 0.82, // Gran cultura cívica y diversidad cosmopolita
      s2: 0.92, // Planificación de circularidad de clase mundial
      s3: 0.88, // Ecosistema fintech, diseño circular y startups
      s4: 0.85, // Fuerte seguridad jurídica y personal

      e1: 0.60, // Presión hidrológica constante por polders bajo nivel del mar
      e2: 0.80, // Filtración natural en dunas costeras de Waternet
      e3: 0.58, // Suelo muy compactado y vulnerable a hundimiento
      e4: 0.72, // Mega-infraestructura de protección de diques

      k1: 0.86, // Hub financiero, tecnológico y logístico global
      k2: 0.80, // Gran masa tributaria autónoma
      k3: 0.72, // Tensión por encarecimiento voraz de la vivienda
      k4: 0.38, // Paradoja portuaria: inmenso flujo de materias primas fósiles
    },

    pressureVars: {
      d1: 0.60, // Baja extracción territorial interna
      d2: 1.10, // Presión residencial y turística severa
      d3: 1.40, // Flujos de capital y mercancías portuarias masivas (Scope 3)
    },

    emissions: {
      scope1: 2.8, // tCO2e/capita (gas doméstico y transporte interior)
      scope2: 1.3, // tCO2e/capita (red holandesa con cuota de gas natural y solar)
      scope3Upstream: 10.5, // tCO2e/capita (importación de alimentos, ropa, construcción y electrónica)
      scope3Downstream: 14.2, // tCO2e/capita (combustibles fósiles y carga que transita por el Puerto)
      localSequestration: 0.7, // tCO2e/capita (Amsterdamse Bos y cinturones fluviales)
      gridCarbonIntensity: 210, // gCO2/kWh
      dataSource: 'Gemeente Amsterdam Open Data / CBS Netherlands / DEAL',
      keyInsight: 'Aplicación pionera del Donut: Excelente suelo social (S=0.87), pero su techo ecológico está sobrepasado por el Puerto y el Scope 3 exterior.'
    },

    openDataSources: [
      { name: 'Data Amsterdam', url: 'https://data.amsterdam.nl', type: 'API Urbana Abierta', description: 'Monitoreo de flujos de residuos circulares, energía y movilidad.' },
      { name: 'CBS Netherlands', url: 'https://opendata.cbs.nl', type: 'Oficina Central de Estadística', description: 'Huella de consumo de los hogares (Scope 3) y emisiones territoriales.' },
      { name: 'DEAL Doughnut Portrait', url: 'https://doughnuteconomics.org', type: 'Matriz Metodológica', description: 'Evaluación de las 4 lentes del Donut para la ciudad de Ámsterdam.' }
    ],

    history: [
      { year: 2002, S: 0.80, E: 0.58, K: 0.75, H: 0.70, sigma: 0.92, gamma: 0.005, note: 'Centro comercial europeo tradicional' },
      { year: 2017, S: 0.84, E: 0.64, K: 0.77, H: 0.74, sigma: 0.98, gamma: 0.008, note: 'Inicio de la estrategia circular de residuos' },
      { year: 2024, S: 0.87, E: 0.67, K: 0.78, H: 0.77, sigma: 1.03, gamma: 0.004, note: 'Implementación plena de la Estrategia Donut 2020-2025' }
    ],

    materialProperties: {
      modulusElasticity: 1.70,
      yieldStress: 0.86,
      ultimateStress: 1.12,
      fractureStress: 1.32,
    },

    surveys: {
      "povertyMultidimensional": "14.8% en umbral de pobreza urbana (CBS Netherlands)",
      "gini": "0.31 (CBS)",
      "socialTrust": "80% confianza cívica e interétnica",
      "perceivedSafety": "84% percepción de seguridad en barrios",
      "source": "Gemeente Amsterdam Burgerpeiling 2023 / CBS"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 120,
      "greenSpaceM2PerCapita": 28,
      "renewableEnergyShare": "46% (Eólica del Mar del Norte)",
      "municipalAutonomyRate": "42% ingresos tributarios locales vs transferencias nacionales",
      "airQualityPM25": "10.5 µg/m³ (GGD Amsterdam)",
      "keyLocalTension": "Crisis aguda del mercado del alquiler y colosal huella de combustibles fósiles en tránsito por el Puerto"
},

    tradableSurplus: [
      { id: 'circular_consulting', name: 'Modelos de Negocio Circulares Donut', category: 'Conocimiento', baseSurplus: 450, unit: 'horas/mes' },
      { id: 'floating_homes', name: 'Sistemas de Módulos Flotantes Sostenibles', category: 'Construcción', baseSurplus: 90, unit: 'módulos' }
    ]
  },

  // ==========================================
  // 6. BERLÍN (Alemania)
  // ==========================================
  {
    id: 'berlin',
    name: 'Berlín',
    country: 'Alemania',
    coordinates: [52.5200, 13.4050],
    tag: 'Energiewende, Cooperativas de Vivienda & Descentralización Urbana',
    bioregion: 'Llanura del Norte de Europa (Valle proglacial del Spree y Havel)',
    description: 'Capital alemana inmersa en la salida definitiva del carbón (Energiewende) y la transformación de su enorme red de calefacción urbana. Caracterizada por una vibrante cultura de autogestión, cooperativas de vivienda (Genossenschaften), huertos urbanos y el parque Tempelhofer Feld como símbolo de soberanía comunitaria sobre el suelo.',
    population: 3755000,
    artImage: getAssetUrl('art/solarpunk_alley.jpg'),
    artCaption: 'Berlín Energiewende: Centrales térmicas reconvertidas a biomasa y geotermia, techos solares masivos y movilidad peatonal libre.',
    badgeAccent: '#e11d48',

    resources: {
      water: {
        name: 'Acuíferos del Spree-Havel & Bank Filtration',
        unit: 'm³/mes/cap',
        basalNeed: 44,
        naturalInflow: 88,
        extractiveLoad: 52,
        weight: 0.30,
      },
      biomass: {
        name: 'Bosques de Grunewald & Huertos Tempelhof',
        unit: 'ton MO/ha',
        basalNeed: 28,
        naturalInflow: 64,
        extractiveLoad: 38,
        weight: 0.20,
      },
      energy: {
        name: 'Red de Calor de Distrito & Energiewende Solar',
        unit: 'MWh/mes',
        basalNeed: 18500,
        naturalInflow: 22000,
        extractiveLoad: 19800,
        weight: 0.30,
      },
      care: {
        name: 'Cultura Libre, Huertos & Solidaridad Vecinal',
        unit: 'hrs/semana/comunidad',
        basalNeed: 720000,
        naturalInflow: 920000,
        extractiveLoad: 680000,
        weight: 0.20,
      }
    },

    variables: {
      s1: 0.84, // Movimientos ciudadanos fuertes y cultura alternativa
      s2: 0.80, // Administración pública funcional aunque burocrática
      s3: 0.88, // Capital científico (Max Planck, Humboldt, startups)
      s4: 0.82, // Alta tolerancia y convivencia multicultural

      e1: 0.65, // Enorme superficie verde urbana (30% parques y agua)
      e2: 0.58, // Tensión hídrica por cese del bombeo minero de lignito en Lusacia
      e3: 0.62, // Buenas prácticas de infiltración y techos verdes
      e4: 0.68, // Resiliencia térmica urbana activa

      k1: 0.78, // Transición de ciudad subvencionada a polo de innovación digital
      k2: 0.70, // Finanzas saneadas tras décadas de austeridad
      k3: 0.68, // Presión de gentrificación y subida de alquileres
      k4: 0.48, // Descarbonización en curso de la red de gas y carbón de Vattenfall
    },

    pressureVars: {
      d1: 0.75, // Demanda térmica de invierno y transición energética
      d2: 0.95, // Crecimiento demográfico sostenido y demanda habitacional
      d3: 0.85, // Inversión inmobiliaria exterior en conflicto con cooperativas
    },

    emissions: {
      scope1: 3.2, // tCO2e/capita (calefacción fósil y tráfico urbano)
      scope2: 1.8, // tCO2e/capita (red alemana en transición con gas y carbón residual)
      scope3Upstream: 8.8, // tCO2e/capita (cadena de suministro y bienes duraderos)
      scope3Downstream: 2.8, // tCO2e/capita (servicios digitales y maquinaria ligera)
      localSequestration: 1.2, // tCO2e/capita (bosques periurbanos de Brandeburgo y parques)
      gridCarbonIntensity: 310, // gCO2/kWh (Alemania federal)
      dataSource: 'Daten Berlin / Umweltbundesamt / Vattenfall',
      keyInsight: 'El talón de Aquiles de Berlín es su calefacción invernal (Scope 1+2 = 5.0 t), compensado por una alta densidad de suelo verde autogestionado.'
    },

    openDataSources: [
      { name: 'Berlin Open Data', url: 'https://daten.berlin.de', type: 'Portal Abierto del Senado', description: 'Geodatos del Umweltatlas, balance de emisiones de distritos y calidad de aguas.' },
      { name: 'Umweltbundesamt (UBA)', url: 'https://www.umweltbundesamt.de', type: 'Agencia Federal Ambiental', description: 'Monitor del Energiewende y factores de emisión de la red eléctrica alemana.' },
      { name: 'Stromnetz Berlin', url: 'https://www.stromnetz.berlin', type: 'Datos de Red', description: 'Integración fotovoltaica en techos y microrredes de distrito.' }
    ],

    history: [
      { year: 2002, S: 0.78, E: 0.55, K: 0.58, H: 0.62, sigma: 0.82, gamma: 0.007, note: 'Época de "pobre pero sexy", amplios espacios vacíos' },
      { year: 2017, S: 0.82, E: 0.61, K: 0.69, H: 0.70, sigma: 0.85, gamma: 0.010, note: 'Votación para salvar Tempelhofer Feld y auge tech' },
      { year: 2024, S: 0.84, E: 0.63, K: 0.73, H: 0.73, sigma: 0.87, gamma: 0.005, note: 'Municipalización de la red eléctrica y ley climática 2045' }
    ],

    materialProperties: {
      modulusElasticity: 1.50,
      yieldStress: 0.82,
      ultimateStress: 1.08,
      fractureStress: 1.28,
    },

    surveys: {
      "povertyMultidimensional": "19.4% en riesgo de pobreza relativa (Statistik Berlin)",
      "gini": "0.33 (Statistik Berlin)",
      "socialTrust": "76% solidaridad vecinal y defensa de espacios públicos",
      "perceivedSafety": "74% percepción de seguridad barrial",
      "source": "Berlin Sozialstudie / Senatsverwaltung für Stadtentwicklung"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 110,
      "greenSpaceM2PerCapita": 31,
      "renewableEnergyShare": "52% (Energiewende nacional)",
      "municipalAutonomyRate": "65% ingresos propios del Estado de Berlín",
      "airQualityPM25": "12.8 µg/m³ (Senatsverwaltung für Umwelt)",
      "keyLocalTension": "Conversión urgente de las calderas de gas/carbón de la red de calor distrital y encarecimiento habitacional"
},

    tradableSurplus: [
      { id: 'open_hardware', name: 'Diseños de Hardware Libre y Tecnologías Cívicas', category: 'Conocimiento', baseSurplus: 600, unit: 'repositorios' },
      { id: 'coop_governance', name: 'Estatutos y Asesoría para Cooperativas de Suelo', category: 'Social', baseSurplus: 300, unit: 'horas/mes' }
    ]
  },

  // ==========================================
  // 7. VALLE DE ACONCAGUA (Valparaíso, Chile)
  // ==========================================
  {
    id: 'aconcagua',
    name: 'Valle de Aconcagua (Valparaíso)',
    country: 'Chile',
    coordinates: [-32.8333, -70.6000],
    tag: 'Cañón Agroalimentario, Megasequía & Energía Solar',
    bioregion: 'Valle Central Semiárido (Cuenca del Río Aconcagua)',
    description: 'Cuenca agroexportadora clave bajo megasequía prolongada y sobre-otorgamiento histórico de derechos de aprovechamiento de aguas para paltos y cítricos. Posee una de las mayores radiaciones solares del país y una encrucijada entre el extractivismo hídrico y la transición sintrópica solar.',
    population: 78000,
    artImage: getAssetUrl('art/solarpunk_alley.jpg'),
    artCaption: 'Cañón Sintrópico Aconcagua: Viaductos férreos solares, doseles fotovoltaicos y recuperación de riberas.',
    badgeAccent: '#d97706',

    resources: {
      water: {
        name: 'Río Aconcagua & Pozos de Riego',
        unit: 'm³/mes/cap',
        basalNeed: 50,
        naturalInflow: 60,
        extractiveLoad: 78, // Grave déficit
        weight: 0.45,
      },
      biomass: {
        name: 'Suelo Agrícola Fértil',
        unit: 'ton MO/ha',
        basalNeed: 30,
        naturalInflow: 45,
        extractiveLoad: 48,
        weight: 0.20,
      },
      energy: {
        name: 'Matriz Fotovoltaica & Solar',
        unit: 'MWh/mes',
        basalNeed: 800,
        naturalInflow: 1100,
        extractiveLoad: 750,
        weight: 0.15,
      },
      care: {
        name: 'Horas de Cuidado Comunitario',
        unit: 'hrs/semana/comunidad',
        basalNeed: 18000,
        naturalInflow: 22000,
        extractiveLoad: 17000,
        weight: 0.20,
      }
    },

    variables: {
      s1: 0.58,
      s2: 0.65,
      s3: 0.68,
      s4: 0.60,

      e1: 0.28,
      e2: 0.22, // Muy crítico: sobre-otorgamiento hídrico
      e3: 0.45,
      e4: 0.35,

      k1: 0.45,
      k2: 0.60,
      k3: 0.50,
      k4: 0.30,
    },

    pressureVars: {
      d1: 1.60, // Extracción masiva de agua de pozos profundos
      d2: 0.75,
      d3: 1.10, // Capitales agroindustriales externos
    },

    emissions: {
      scope1: 2.9, // tCO2e/capita (bombeo diésel de pozos y agroquímicos)
      scope2: 0.9, // tCO2e/capita (red eléctrica para riego tecnificado)
      scope3Upstream: 2.1, // tCO2e/capita (fertilizantes y plásticos de invernadero)
      scope3Downstream: 8.5, // tCO2e/capita (flete aéreo y marítimo para exportación de palta a Europa)
      localSequestration: 1.1, // tCO2e/capita
      gridCarbonIntensity: 280, // gCO2/kWh
      dataSource: 'DGA / CNR / ODEPA Chile',
      keyInsight: 'Agroexportación de agua virtual: exporta 8.5 t en Scope 3 downstream a los supermercados europeos mientras seca los comités APR locales.'
    },

    openDataSources: [
      { name: 'DGA Monitoreo de Cuencas', url: 'https://snia.mop.gob.cl', type: 'Hidrología Oficial', description: 'Nivel freático de los 4 tramos del Río Aconcagua.' },
      { name: 'ODEPA Información Agraria', url: 'https://www.odepa.gob.cl', type: 'Estadística Agropecuaria', description: 'Superficie cultivada de frutales y volúmenes de exportación.' },
      { name: 'Coordinador Eléctrico Nacional', url: 'https://www.coordinador.cl', type: 'Generación Eléctrica', description: 'Inyección de plantas solares fotovoltaicas del Valle Central.' }
    ],

    history: [
      { year: 2002, S: 0.68, E: 0.62, K: 0.55, H: 0.61, sigma: 0.70, gamma: 0.00, note: 'Pre-megasequía' },
      { year: 2017, S: 0.62, E: 0.40, K: 0.48, H: 0.49, sigma: 1.10, gamma: -0.018, note: 'Crisis hídrica aguda y camiones aljibe' },
      { year: 2024, S: 0.62, E: 0.31, K: 0.46, H: 0.44, sigma: 1.25, gamma: -0.014, note: 'Sobre-extracción de napas y tensión de riego' }
    ],

    materialProperties: {
      modulusElasticity: 0.95,
      yieldStress: 0.68,
      ultimateStress: 0.88,
      fractureStress: 1.02,
    },

    surveys: {
      "povertyMultidimensional": "20.1% de hogares (CASEN 2022)",
      "gini": "0.40 (CASEN Comunal)",
      "socialTrust": "68% solidaridad en organizaciones de regantes y APR",
      "perceivedSafety": "78% percepción de seguridad",
      "source": "CASEN 2022 / Observatorio Social MOP / Mesa Social Aconcagua"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 80,
      "greenSpaceM2PerCapita": 4.2,
      "renewableEnergyShare": "65% (Alta penetración solar fotovoltaica en Valle Central)",
      "municipalAutonomyRate": "28% ingresos propios",
      "airQualityPM25": "22.0 µg/m³ (Polvo en suspensión y quemas agrícolas estacionales)",
      "keyLocalTension": "Guerra por el agua: pozos profundos de agroexportadoras de palta vs racionamiento de agua potable humana"
},

    tradableSurplus: [
      { id: 'citricos', name: 'Limones & Naranjas Agroecológicas', category: 'Fruticultura', baseSurplus: 340, unit: 'ton' },
      { id: 'almendras', name: 'Frutos Secos y Harinas', category: 'Procesados', baseSurplus: 60, unit: 'ton' }
    ]
  },

  // ==========================================
  // 8. LOS MOLLES (Costa Norte, Chile)
  // ==========================================
  {
    id: 'los_molles',
    name: 'Los Molles (Costa Norte)',
    country: 'Chile',
    coordinates: [-32.2394, -71.5161],
    tag: 'Maritorio, Pasarelas Colgantes & Caleta Artesanal',
    bioregion: 'Hinterland Costero (Ecosistema Dunar y Humedal Estuarino)',
    description: 'Enclave costero de extraordinaria biodiversidad botánica (lúcumo silvestre) y marina, amenazado por la expansión inmobiliaria sobre su humedal urbano y campo dunar. La comunidad y los pescadores artesanales ejercen una activa defensa territorial y gobernanza comunitaria de los recursos bentónicos.',
    population: 3200,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Pasarelas del Maritorio: Arquitectura vertical en madera, linternas cálidas y custodia comunitaria del humedal costero.',
    badgeAccent: '#0284c7',

    resources: {
      water: {
        name: 'Agua Dulce Costera & APR Solar',
        unit: 'm³/mes/cap',
        basalNeed: 40,
        naturalInflow: 65,
        extractiveLoad: 42,
        weight: 0.30,
      },
      biomass: {
        name: 'Biomasa Marina & Bentónica',
        unit: 'ton captura sustentable',
        basalNeed: 35,
        naturalInflow: 80,
        extractiveLoad: 45,
        weight: 0.30,
      },
      energy: {
        name: 'Microred Eólica/Solar Marina',
        unit: 'MWh/mes',
        basalNeed: 45,
        naturalInflow: 70,
        extractiveLoad: 38,
        weight: 0.15,
      },
      care: {
        name: 'Gobernanza de Caleta & Cuidado',
        unit: 'hrs/semana/comunidad',
        basalNeed: 1200,
        naturalInflow: 2100,
        extractiveLoad: 1100,
        weight: 0.25,
      }
    },

    variables: {
      s1: 0.75,
      s2: 0.52,
      s3: 0.60,
      s4: 0.80,

      e1: 0.62,
      e2: 0.45,
      e3: 0.68,
      e4: 0.50,

      k1: 0.40,
      k2: 0.42,
      k3: 0.65,
      k4: 0.65,
    },

    pressureVars: {
      d1: 0.70,
      d2: 0.85,
      d3: 0.65,
    },

    emissions: {
      scope1: 1.4, // tCO2e/capita (botes artesanales y uso doméstico)
      scope2: 0.4, // tCO2e/capita (electrificación rural básica)
      scope3Upstream: 1.5, // tCO2e/capita
      scope3Downstream: 1.1, // tCO2e/capita (recursos marinos de consumo fresco regional)
      localSequestration: 2.1, // tCO2e/capita (humedal estuarino y bosques costeros)
      gridCarbonIntensity: 280, // gCO2/kWh
      dataSource: 'SERNAPESCA / MMA Humedales Urbanos',
      keyInsight: 'Territorio con balance metabólico positivo: su humedal y biomasa marina capturan más carbono del que su baja huella Scope 3 consume.'
    },

    openDataSources: [
      { name: 'MMA Inventario de Humedales', url: 'https://humedaleschile.mma.gob.cl', type: 'Catastro Oficial', description: 'Límites ecológicos y estatus de protección del Humedal de Los Molles.' },
      { name: 'SERNAPESCA Caletas', url: 'https://www.sernapesca.cl', type: 'Estadísticas de Pesca', description: 'Desembarques de recursos bentónicos y áreas de manejo (AMERB).' },
      { name: 'GEO-SEIA Impacto Ambiental', url: 'https://seia.sea.gob.cl', type: 'Expedientes Ambientales', description: 'Proyectos inmobiliarios sometidos a evaluación en el borde costero.' }
    ],

    history: [
      { year: 2002, S: 0.72, E: 0.75, K: 0.50, H: 0.64, sigma: 0.55, gamma: 0.005, note: 'Caleta tradicional' },
      { year: 2017, S: 0.70, E: 0.65, K: 0.52, H: 0.61, sigma: 0.72, gamma: -0.004, note: 'Inicio presión inmobiliaria sobre dunas' },
      { year: 2024, S: 0.67, E: 0.56, K: 0.53, H: 0.58, sigma: 0.85, gamma: -0.005, note: 'Defensa activa comunitaria del humedal' }
    ],

    materialProperties: {
      modulusElasticity: 1.40,
      yieldStress: 0.75,
      ultimateStress: 0.98,
      fractureStress: 1.15,
    },

    surveys: {
      "povertyMultidimensional": "18.5% (CASEN Comuna de La Ligua)",
      "gini": "0.38 (CASEN)",
      "socialTrust": "86% asociatividad en el Sindicato de Pescadores y Cabildo Vecinal",
      "perceivedSafety": "88% tranquilidad y seguridad comunitaria",
      "source": "Cabildo Ciudadano Los Molles / SERNAPESCA / CASEN"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 85,
      "greenSpaceM2PerCapita": 38,
      "renewableEnergyShare": "42% (Red SEN + paneles solares caleta)",
      "municipalAutonomyRate": "30% dependencia de La Ligua",
      "airQualityPM25": "8.5 µg/m³ (Brisa marina limpia)",
      "keyLocalTension": "Presión de loteos inmobiliarios y torres de departamentos sobre el campo dunar y el humedal urbano"
},

    tradableSurplus: [
      { id: 'mariscos', name: 'Locos y Machas de Manejo Comunitario', category: 'Maritorio', baseSurplus: 150, unit: 'ton' },
      { id: 'sal_marina', name: 'Flor de Sal Artesanal de Salinas', category: 'Minerales Blandos', baseSurplus: 90, unit: 'ton' }
    ]
  },

  // ==========================================
  // 9. QUINTERO - PUCHUNCAVÍ (Valparaíso, Chile)
  // ==========================================
  {
    id: 'quintero_puchuncavi',
    name: 'Quintero - Puchuncaví',
    country: 'Chile',
    coordinates: [-32.7833, -71.5167],
    tag: 'Zona de Sacrificio Industrial, Enclave Termoeléctrico & Fundición',
    bioregion: 'Bahía de Quintero / Borde Costero Central',
    description: 'El caso paradigmático de zona de sacrificio en Chile. Concentra 16 industrias de alto impacto en una misma bahía: 4 termoeléctricas a carbón (AES Andes), la fundición de cobre Ventanas (Codelco/ENAMI), refinerías de petróleo (ENAP) y químicos. Es el polo que provee energía barata (Scope 2) y cobre al resto del país y al mercado global, a expensas del envenenamiento crónico de niños y ancianos por SO2 y metales pesados.',
    population: 48000,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Horizonte de Transición Justa para Quintero: Desmantelamiento del carbón, descontaminación del lecho marino y restauración comunitaria.',
    badgeAccent: '#475569',

    resources: {
      water: {
        name: 'Acuíferos Subterráneos & Agua Marina Afectada',
        unit: 'm³/mes/cap',
        basalNeed: 45,
        naturalInflow: 50,
        extractiveLoad: 68,
        weight: 0.35,
      },
      biomass: {
        name: 'Suelos Intoxicados con Metales Pesados',
        unit: 'ton MO/ha',
        basalNeed: 25,
        naturalInflow: 30,
        extractiveLoad: 48,
        weight: 0.25,
      },
      energy: {
        name: 'Generación Termoeléctrica Contaminante',
        unit: 'MWh/mes',
        basalNeed: 1500,
        naturalInflow: 18000, // Enorme inyección a la red nacional
        extractiveLoad: 17200,
        weight: 0.20,
      },
      care: {
        name: 'Sobrecarga de Salud por Cáncer e Intoxicaciones',
        unit: 'hrs/semana/comunidad',
        basalNeed: 28000,
        naturalInflow: 22000, // Colapso en cuidados
        extractiveLoad: 29000,
        weight: 0.20,
      }
    },

    variables: {
      s1: 0.52, // Fractura social por dependencia de empleos tóxicos vs salud
      s2: 0.30, // Incapacidad fiscalizadora del Estado durante 50 años
      s3: 0.42, // Impacto en desarrollo cognitivo infantil por plomo/arsénico
      s4: 0.20, // Extrema violencia ambiental estructural sostenida

      e1: 0.15, // Ruptura crítica: fondo marino muerto por varamientos de carbón
      e2: 0.28, // Contaminación de napas costeras
      e3: 0.18, // Ruptura crítica: suelos agrícolas inservibles por lluvia ácida
      e4: 0.22, // Ruptura crítica: episodios recurrentes de asfixia colectiva

      k1: 0.25, // Monocultura extractiva industrial contaminante
      k2: 0.32, // Rentas exportadas a Santiago y matrices transnacionales
      k3: 0.45, // Desigualdad profunda frente a ejecutivos de empresas
      k4: 0.12, // Ruptura crítica: la tasa de extracción/daño destruye el suelo
    },

    pressureVars: {
      d1: 2.80, // Máxima intensidad de degradación industrial
      d2: 0.85,
      d3: 1.90, // Megaproyectos industriales foráneos
    },

    emissions: {
      scope1: 42.5, // tCO2e/capita (una de las mayores del mundo por termoeléctricas a carbón)
      scope2: 0.3, // tCO2e/capita (el polo es exportador neto de electricidad)
      scope3Upstream: 1.8, // tCO2e/capita (bajo consumo per cápita de los habitantes)
      scope3Downstream: 68.0, // tCO2e/capita (cobre concentrado y combustibles refinados enviados al mundo)
      localSequestration: 0.2, // tCO2e/capita (vegetación calcinada y reducida)
      gridCarbonIntensity: 650, // gCO2/kWh (polo a carbón)
      dataSource: 'SINCA / RETC / MMA / SMA Chile',
      keyInsight: 'La anatomía de una Zona de Sacrificio: Emisiones territoriales gigantescas (Scope 1 = 42.5 t) pagadas por los pulmones locales para sostener el Scope 2 del país.'
    },

    openDataSources: [
      { name: 'SINCA (Calidad del Aire)', url: 'https://sinca.mma.gob.cl', type: 'Red Continua en Vivo', description: 'Estaciones La Greda, Puchuncaví, Quintero: SO2, MP2.5, MP10 y Compuestos Orgánicos Volátiles.' },
      { name: 'RETC (Emisiones y Transferencias)', url: 'https://retc.mma.gob.cl', type: 'Registro Oficial de Contaminantes', description: 'Declaraciones juradas de metales pesados vertidos al mar y chimeneas.' },
      { name: 'Superintendencia del Medio Ambiente', url: 'https://snifa.sma.gob.cl', type: 'Expedientes Sancionatorios', description: 'Planes de Descontaminación Atmosférica (PPDA) y cierres de faena.' }
    ],

    history: [
      { year: 2002, S: 0.55, E: 0.32, K: 0.40, H: 0.41, sigma: 1.35, gamma: -0.012, note: 'Operación continua sin fiscalización de termoeléctricas' },
      { year: 2017, S: 0.45, E: 0.22, K: 0.35, H: 0.33, sigma: 1.70, gamma: -0.024, note: 'Intoxicaciones masivas de cientos de escolares' },
      { year: 2024, S: 0.38, E: 0.18, K: 0.28, H: 0.27, sigma: 1.85, gamma: -0.018, note: 'Régimen de fractura plástica irreversible: E < 0.25' }
    ],

    materialProperties: {
      modulusElasticity: 0.65,
      yieldStress: 0.55,
      ultimateStress: 0.72,
      fractureStress: 0.85,
    },

    surveys: {
      "povertyMultidimensional": "24.2% de hogares (CASEN 2022)",
      "gini": "0.41 (CASEN Comunal)",
      "socialTrust": "58% fragmentación entre trabajadores industriales y defensores de salud",
      "perceivedSafety": "42% temor permanente a episodios de asfixia y contaminación masiva",
      "source": "CASEN 2022 / Colegio Médico de Chile / Encuesta Bahía de Quintero"
},

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 90,
      "greenSpaceM2PerCapita": 3.1,
      "renewableEnergyShare": "12% local (Polo exportador neto de energía a carbón al SEN)",
      "municipalAutonomyRate": "34% ingresos municipales propios",
      "airQualityPM25": "34.5 µg/m³ (Picos recurrentes de SO₂ > 500 µg/m³ en Estación La Greda)",
      "keyLocalTension": "Cierre de la fundición Ventanas vs descontaminación de varamientos de carbón y transición justa"
},

    tradableSurplus: [
      { id: 'copper_byproduct', name: 'Escorias y Subproductos de Fundición (Pasivos)', category: 'Industrial', baseSurplus: 800, unit: 'ton' },
      { id: 'energy_surplus', name: 'Potencia Eléctrica Bruta Inyectada al SEN', category: 'Energía Excedente', baseSurplus: 12000, unit: 'MWh' }
    ]
  },

  // ==========================================
  // 10. MEDELLÍN (Antioquia, Colombia)
  // ==========================================
  {
    id: 'medellin',
    name: 'Medellín (Antioquia)',
    country: 'Colombia',
    coordinates: [6.2476, -75.5658],
    tag: 'Corredores Verdes & Red SIATA · Urbanismo Social',
    bioregion: 'Valle de Aburrá (Bosque Húmedo Premontano Tropical)',
    description: 'Valle interandino densamente poblado. Ha desplegado una red de 30 corredores verdes interconectados con más de 880.000 árboles que redujeron las islas de calor en hasta 3.5°C, auditados por la red pública de sensores meteorológicos SIATA.',
    population: 2569000,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Corredores bioclimáticos de ladera en Medellín y red pública SIATA.',
    badgeAccent: '#10b981',

    resources: {
      water: {
        name: 'Cuenca Río Medellín & Embalses EPM',
        unit: 'm³/mes/cap',
        basalNeed: 48,
        naturalInflow: 95,
        extractiveLoad: 60,
        weight: 0.30,
      },
      biomass: {
        name: 'Corredores Verdes & Laderas Vivas',
        unit: 'ton MO/ha',
        basalNeed: 26,
        naturalInflow: 58,
        extractiveLoad: 35,
        weight: 0.25,
      },
      energy: {
        name: 'Hidroelectricidad EPM & Metro Eléctrico',
        unit: 'MWh/mes',
        basalNeed: 140,
        naturalInflow: 240,
        extractiveLoad: 145,
        weight: 0.20,
      },
      care: {
        name: 'Tiempo Comunitario en Comunas & UVAs',
        unit: 'hrs/semana/comunidad',
        basalNeed: 3800,
        naturalInflow: 5200,
        extractiveLoad: 3900,
        weight: 0.25,
      }
    },

    variables: {
      s1: 0.72, // Cohesión social en comunas y mesas barriales
      s2: 0.68, // Capacidad institucional pública (EPM / Alcaldía)
      s3: 0.64, // Capital humano e innovación social
      s4: 0.58, // Seguridad ciudadana y reducción de violencia

      e1: 0.70, // Integridad biomasal por corredores verdes
      e2: 0.72, // Disponibilidad hídrica por cuencas EPM
      e3: 0.62, // Estabilidad de laderas y suelos
      e4: 0.68, // Resiliencia climática térmica (Reducción isla de calor SIATA)

      k1: 0.65, // Diversificación industrial, textil y servicios tecnológicos
      k2: 0.62, // Autonomía fiscal municipal
      k3: 0.48, // Distribución del ingreso (desafío de equidad)
      k4: 0.68, // Tasa de reposición arbórea y regeneración
    },

    pressureVars: {
      d1: 0.70, // Carga extractiva urbana
      d2: 0.85, // Densidad demográfica en cuenca confinada
      d3: 0.60, // Flujos de capital externo
    },

    emissions: {
      scope1: 2.1,
      scope2: 0.6,
      scope3Upstream: 2.8,
      scope3Downstream: 3.2,
      localSequestration: 1.8,
      gridCarbonIntensity: 140, // gCO2/kWh (Matriz hidroeléctrica colombiana)
      dataSource: 'Alcaldía de Medellín / SIATA / EPM',
      keyInsight: 'Los 30 corredores verdes enfrían la ciudad en 3.5°C y absorben material particulado en el Valle de Aburrá.'
    },

    openDataSources: [
      { name: 'SIATA Medellín', url: 'https://siata.gov.co', type: 'Red Hidrometeorológica en Tiempo Real', description: 'Monitoreo minuto a minuto de calidad del aire, radar de lluvias y temperatura superficial.' },
      { name: 'Medellín Cómo Vamos', url: 'https://www.medellincomovamos.org', type: 'Observatorio Ciudadano', description: 'Indicadores objetivos y de percepción de calidad de vida.' }
    ],

    history: [
      { year: 2015, S: 0.60, E: 0.55, K: 0.58, H: 0.58, sigma: 0.88, gamma: 0.015, note: 'Inicio de la política masiva de Corredores Verdes' },
      { year: 2024, S: 0.66, E: 0.68, K: 0.61, H: 0.65, sigma: 0.76, gamma: 0.022, note: 'Reducción comprobada de isla de calor urbana en -3.5°C' }
    ],

    materialProperties: {
      modulusElasticity: 1.45,
      yieldStress: 0.76,
      ultimateStress: 1.05,
      fractureStress: 1.25,
    },

    surveys: {
      "povertyMultidimensional": "14.8% de hogares (DANE 2023)",
      "gini": "0.51 (DANE Medellín)",
      "socialTrust": "64% redes barriales en laderas y comités comunitarios",
      "perceivedSafety": "54% (Avance sustancial desde la década de los 90)",
      "source": "DANE / Medellín Cómo Vamos / SIATA"
    },

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 110,
      "greenSpaceM2PerCapita": 4.8,
      "renewableEnergyShare": "80% (Hidroelectricidad EPM)",
      "municipalAutonomyRate": "62% ingresos propios",
      "airQualityPM25": "19.5 µg/m³ (SIATA Red en Tiempo Real)",
      "keyLocalTension": "Confinamiento topográfico del valle y episodios de inversión térmica que atrapan la polución"
    },

    tradableSurplus: [
      { id: 'bioclimatic_knowhow', name: 'Metodología de Corredores Verdes Urbanos', category: 'Conocimiento', baseSurplus: 400, unit: 'horas/mes' },
      { id: 'specialty_coffee', name: 'Café Agroforestal de Ladera', category: 'Agroecología', baseSurplus: 150, unit: 'ton' }
    ]
  },

  // ==========================================
  // 11. PARÍS (Île-de-France, Francia)
  // ==========================================
  {
    id: 'paris',
    name: 'París (Île-de-France)',
    country: 'Francia',
    coordinates: [48.8566, 2.3522],
    tag: 'La Ville du Quart-d\'Heure (15 Minutos) & Cours Oasis',
    bioregion: 'Cuenca del Sena (Templado Oceánico)',
    description: 'Capital francesa que ha transformado su morfología urbana bajo la tesis de Carlos Moreno: la Ciudad de los 15 minutos. Mide de forma auditada el tiempo de acceso a pie/bici a las 6 funciones sociales de la vida urbana y la transformación de patios escolares en refugios bioclimáticos.',
    population: 2148000,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Eje del Sena peatonalizado, ciclovías coronapistes y cours oasis.',
    badgeAccent: '#6366f1',

    resources: {
      water: {
        name: 'Cuenca del Sena & Acueducto Eau de Paris',
        unit: 'm³/mes/cap',
        basalNeed: 45,
        naturalInflow: 85,
        extractiveLoad: 55,
        weight: 0.25,
      },
      biomass: {
        name: 'Verde Urbano & Cours Oasis Escolares',
        unit: 'ton MO/ha',
        basalNeed: 20,
        naturalInflow: 38,
        extractiveLoad: 28,
        weight: 0.25,
      },
      energy: {
        name: 'Red Eléctrica Descarbonizada & Red de Frío CPCU',
        unit: 'MWh/mes',
        basalNeed: 155,
        naturalInflow: 260,
        extractiveLoad: 165,
        weight: 0.25,
      },
      care: {
        name: 'Tiempo de Vida Cívica & Cercanía Vecinal',
        unit: 'hrs/semana/comunidad',
        basalNeed: 3900,
        naturalInflow: 5500,
        extractiveLoad: 4100,
        weight: 0.25,
      }
    },

    variables: {
      s1: 0.78, // Cohesión social y vida de barrio hiperlocal
      s2: 0.85, // Capacidad institucional y gobernanza pública (Mairie de Paris)
      s3: 0.88, // Capital cultural y educativo
      s4: 0.74, // Ausencia de violencia estructural

      e1: 0.62, // Verde urbano en proceso de desasfaltado (Cours Oasis)
      e2: 0.70, // Agua potable pública remunicipalizada (Eau de Paris)
      e3: 0.55, // Suelo vivo (desafío por alta densidad histórica)
      e4: 0.72, // Resiliencia climática y reducción de tráfico automotor (-40%)

      k1: 0.82, // Alta diversificación económica y cultural
      k2: 0.78, // Autonomía fiscal metropolitana
      k3: 0.60, // Desigualdad interna intramuros vs banlieues
      k4: 0.70, // Tasa de circularidad y compras públicas responsables
    },

    pressureVars: {
      d1: 0.65, // Carga extractiva directa moderada
      d2: 0.95, // Altísima densidad demográfica (20.000 hab/km²)
      d3: 0.80, // Hub financiero global e inmobiliario
    },

    emissions: {
      scope1: 2.2, // tCO2e/capita (calefacción gas y transporte residual)
      scope2: 0.4, // tCO2e/capita (red eléctrica francesa baja en carbono por nuclear/renovable)
      scope3Upstream: 7.8, // tCO2e/capita (alta huella de consumo importado global)
      scope3Downstream: 2.5,
      localSequestration: 1.2,
      gridCarbonIntensity: 55, // gCO2/kWh (RTE Francia)
      dataSource: 'Agence Paris Climat / Insee / AirParif',
      keyInsight: 'Gran éxito en descarbonizar la movilidad interna (bicicletas superan a coches), pero con alto Scope 3 importado.'
    },

    openDataSources: [
      { name: 'Paris Open Data', url: 'https://opendata.paris.fr', type: 'Portal Abierto Municipal', description: 'Red de ciclovías, aforos peatonales, cours oasis y presupuesto cívico.' },
      { name: 'AirParif', url: 'https://www.airparif.asso.fr', type: 'Calidad del Aire', description: 'Monitoreo de dióxido de nitrógeno y partículas en toda la aglomeración.' }
    ],

    history: [
      { year: 2014, S: 0.75, E: 0.52, K: 0.75, H: 0.66, sigma: 0.98, gamma: 0.008, note: 'Inicio del Plan Bicicleta y cierre de vías de ribera del Sena' },
      { year: 2024, S: 0.81, E: 0.65, K: 0.73, H: 0.73, sigma: 0.84, gamma: 0.018, note: 'Despliegue de la Ciudad de los 15 minutos y 300 patios escolares Oasis' }
    ],

    materialProperties: {
      modulusElasticity: 1.70,
      yieldStress: 0.82,
      ultimateStress: 1.10,
      fractureStress: 1.30,
    },

    surveys: {
      "povertyMultidimensional": "15.6% (Insee Île-de-France)",
      "gini": "0.38 (Insee)",
      "socialTrust": "68% satisfacción con la vida de barrio y servicios de proximidad",
      "perceivedSafety": "71% percepción de seguridad en transporte activo",
      "source": "Insee / Agence Paris Climat / Atelier Parisien d'Urbanisme (APUR)"
    },

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 120,
      "greenSpaceM2PerCapita": 14.2,
      "renewableEnergyShare": "22% (Red de calor y frío CPCU)",
      "municipalAutonomyRate": "74% ingresos propios",
      "airQualityPM25": "13.2 µg/m³ (AirParif)",
      "keyLocalTension": "Gentrificación en el centro intramuros frente a la periferia metropolitana"
    },

    tradableSurplus: [
      { id: 'urban_planning_knowhow', name: 'Metodología Ciudad de los 15 Minutos', category: 'Conocimiento', baseSurplus: 500, unit: 'horas/mes' },
      { id: 'bioclimatic_schools', name: 'Diseño de Patios Escolares Oasis', category: 'Arquitectura', baseSurplus: 120, unit: 'proyectos' }
    ]
  },

  // ==========================================
  // 12. SINGAPUR (Ciudad-Estado, Sudeste Asiático)
  // ==========================================
  {
    id: 'singapore',
    name: 'Singapur (Ciudad-Estado)',
    country: 'Singapur',
    coordinates: [1.3521, 103.8198],
    tag: 'Green Plot Ratio (GnPR 3D) & Circularidad NEWater',
    bioregion: 'Trópico Ecuatorial del Sudeste Asiático',
    description: 'Ciudad-estado insular de extrema densidad (8.000 hab/km²). Pionera en el estándar obligatorio Green Plot Ratio (GnPR) que exige que el follaje vegetal vertical triplique la huella construida del lote, y en la producción del 40% de su agua potable mediante purificación molecular circular NEWater.',
    population: 5918000,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Supertree Grove y fachadas vegetales densas con GnPR en Marina Bay.',
    badgeAccent: '#059669',

    resources: {
      water: {
        name: 'Embalses Urbanos & Plantas NEWater',
        unit: 'm³/mes/cap',
        basalNeed: 45,
        naturalInflow: 90,
        extractiveLoad: 65,
        weight: 0.30,
      },
      biomass: {
        name: 'Follaje 3D (GnPR) & Parques Naturales',
        unit: 'ton MO/ha',
        basalNeed: 22,
        naturalInflow: 50,
        extractiveLoad: 35,
        weight: 0.25,
      },
      energy: {
        name: 'Distritos de Frío Subterráneo & Solar Flotante',
        unit: 'MWh/mes',
        basalNeed: 170,
        naturalInflow: 240,
        extractiveLoad: 175,
        weight: 0.25,
      },
      care: {
        name: 'Red de Apoyo Barrial en Bloques HDB',
        unit: 'hrs/semana/comunidad',
        basalNeed: 3800,
        naturalInflow: 5400,
        extractiveLoad: 4100,
        weight: 0.20,
      }
    },

    variables: {
      s1: 0.82, // Cohesión social en bloques públicos HDB
      s2: 0.94, // Capacidad institucional y planificación técnica
      s3: 0.92, // Capital humano de altísima cualificación
      s4: 0.90, // Ausencia total de violencia delictual común

      e1: 0.74, // Verde urbano 3D por ley GnPR
      e2: 0.78, // Autonomía hídrica circular NEWater
      e3: 0.58, // Suelo vivo limitado por extrema densidad
      e4: 0.72, // Resiliencia climática ante aumento del nivel del mar

      k1: 0.86, // Alta diversificación portuaria, biotecnológica y financiera
      k2: 0.88, // Autonomía presupuestaria de ciudad-estado soberana
      k3: 0.62, // Desigualdad interna por mano de obra migrante
      k4: 0.74, // Tasa de circularidad hídrica y de materiales
    },

    pressureVars: {
      d1: 0.80, // Demanda energética masiva por refrigeración
      d2: 1.10, // Densidad demográfica límite insular
      d3: 0.85, // Enclave financiero y comercial global
    },

    emissions: {
      scope1: 3.5,
      scope2: 2.1,
      scope3Upstream: 8.5, // Alta huella de importación agroalimentaria total
      scope3Downstream: 3.2,
      localSequestration: 1.4,
      gridCarbonIntensity: 390, // gCO2/kWh (Predominio de gas natural importado)
      dataSource: 'National Environment Agency (NEA) Singapur',
      keyInsight: 'Pioneros en biomasa vertical (GnPR > 3.0), pero altamente dependientes del comercio exterior para su soporte calórico basal.'
    },

    openDataSources: [
      { name: 'Data.gov.sg', url: 'https://data.gov.sg', type: 'Portal Nacional de Datos Abiertos', description: 'Monitoreo ambiental, transporte, biodiversidad y vivienda pública HDB.' },
      { name: 'PUB Singapore', url: 'https://www.pub.gov.sg', type: 'Agencia Nacional del Agua', description: 'Telemetría de los 4 grifos nacionales y pureza de NEWater.' }
    ],

    history: [
      { year: 2008, S: 0.78, E: 0.58, K: 0.80, H: 0.71, sigma: 0.95, gamma: 0.012, note: 'Aprobación del estándar legal obligatorio Green Plot Ratio' },
      { year: 2024, S: 0.87, E: 0.71, K: 0.82, H: 0.79, sigma: 0.86, gamma: 0.018, note: 'Producción de NEWater cubre el 40% de la demanda hídrica nacional' }
    ],

    materialProperties: {
      modulusElasticity: 1.80,
      yieldStress: 0.85,
      ultimateStress: 1.12,
      fractureStress: 1.32,
    },

    surveys: {
      "povertyMultidimensional": "8.2% (Medición de exclusión relativa HDB)",
      "gini": "0.37 (Department of Statistics Singapore)",
      "socialTrust": "81% confianza en la administración pública y seguridad",
      "perceivedSafety": "95% una de las ciudades con mayor seguridad ciudadana del mundo",
      "source": "SingStat / Ministry of Sustainability and the Environment"
    },

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 141,
      "greenSpaceM2PerCapita": 10.2,
      "renewableEnergyShare": "8% (Limitación de espacio para parques solares a gran escala)",
      "municipalAutonomyRate": "92% ingresos fiscales propios",
      "airQualityPM25": "12.8 µg/m³ (NEA Singapur)",
      "keyLocalTension": "Falta de territorio agrícola propio (importan más del 90% de sus alimentos)"
    },

    tradableSurplus: [
      { id: 'water_tech', name: 'Tecnología de Membranas NEWater', category: 'Tecnología', baseSurplus: 600, unit: 'sistemas' },
      { id: 'vertical_greening_patents', name: 'Arquitectura de Fachadas Vegetales 3D', category: 'Conocimiento', baseSurplus: 350, unit: 'diseños' }
    ]
  },

  // ==========================================
  // 13. CURITIBA (Paraná, Brasil)
  // ==========================================
  {
    id: 'curitiba',
    name: 'Curitiba (Paraná)',
    country: 'Brasil',
    coordinates: [-25.4284, -49.2733],
    tag: 'Câmbio Verde & 52 m² de Área Verde por Habitante',
    bioregion: 'Mata Atlántica & Planalto Paranaense',
    description: 'Capital ecológica pionera de Sudamérica. Diseñó el programa Câmbio Verde, donde familias canjean 4 kg de residuos reciclables por 1 kg de frutas y verduras frescas de la agricultura familiar periurbana, alcanzando 52 m² de área verde por habitante (5x la recomendación OMS).',
    population: 1963000,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Jardín Botánico de Curitiba, parques lineales inundables y red Câmbio Verde.',
    badgeAccent: '#16a34a',

    resources: {
      water: {
        name: 'Cuenca del Río Iguaçu & Parques de Retención',
        unit: 'm³/mes/cap',
        basalNeed: 45,
        naturalInflow: 92,
        extractiveLoad: 52,
        weight: 0.30,
      },
      biomass: {
        name: 'Mata Atlántica & 52 m²/hab de Parque Vivo',
        unit: 'ton MO/ha',
        basalNeed: 26,
        naturalInflow: 64,
        extractiveLoad: 32,
        weight: 0.25,
      },
      energy: {
        name: 'Red Eléctrica Limpia & Biometano',
        unit: 'MWh/mes',
        basalNeed: 135,
        naturalInflow: 220,
        extractiveLoad: 130,
        weight: 0.20,
      },
      care: {
        name: 'Solidaridad Vecinal & Trueque Câmbio Verde',
        unit: 'hrs/semana/comunidad',
        basalNeed: 3700,
        naturalInflow: 5100,
        extractiveLoad: 3800,
        weight: 0.25,
      }
    },

    variables: {
      s1: 0.74, // Cohesión social comunitaria y canje vecinal
      s2: 0.80, // Capacidad institucional histórica del IPPUC
      s3: 0.75, // Capital educativo y ambiental
      s4: 0.68, // Convivencia ciudadana

      e1: 0.80, // 52 m² de área verde protegida por habitante
      e2: 0.76, // Control de inundaciones con parques lineales
      e3: 0.72, // Protección del suelo periurbano campesino
      e4: 0.74, // Resiliencia climática ante precipitaciones extremas

      k1: 0.72, // Diversificación industrial automotriz y agroalimentaria
      k2: 0.70, // Autonomía fiscal municipal
      k3: 0.56, // Distribución del ingreso (desafío en favelas periurbanas)
      k4: 0.76, // Tasa de reciclaje y absorción de residuos en Câmbio Verde
    },

    pressureVars: {
      d1: 0.58, // Carga extractiva moderada
      d2: 0.75, // Crecimiento demográfico controlado por corredores
      d3: 0.55, // Inversión externa balanceada
    },

    emissions: {
      scope1: 1.8,
      scope2: 0.4,
      scope3Upstream: 3.1,
      scope3Downstream: 2.4,
      localSequestration: 2.2, // Alta captura por sus 30 parques y bosques de araucarias
      gridCarbonIntensity: 85, // gCO2/kWh (Matriz hidroeléctrica de Itaipú/Copel)
      dataSource: 'IPPUC / Prefeitura de Curitiba',
      keyInsight: 'El trueque de basura reciclable por comida campesina reduce la desnutrición infantil y limpia la cuenca sin burocracia monetaria.'
    },

    openDataSources: [
      { name: 'Dados Abertos Curitiba', url: 'https://dadosabertos.cwb.br', type: 'Portal Abierto Municipal', description: 'Estadísticas de Câmbio Verde, arbolado urbano y movilidad BRT.' },
      { name: 'IPPUC', url: 'https://www.ippuc.org.br', type: 'Instituto de Planeamiento', description: 'Planes maestros de uso del suelo y zonas de preservación ambiental.' }
    ],

    history: [
      { year: 1991, S: 0.65, E: 0.68, K: 0.62, H: 0.65, sigma: 0.85, gamma: 0.020, note: 'Lanzamiento del programa Câmbio Verde por Jaime Lerner' },
      { year: 2024, S: 0.76, E: 0.77, K: 0.68, H: 0.74, sigma: 0.72, gamma: 0.015, note: '52 m² de área verde por habitante consolidados en 30 parques metropolitanos' }
    ],

    materialProperties: {
      modulusElasticity: 1.55,
      yieldStress: 0.78,
      ultimateStress: 1.08,
      fractureStress: 1.28,
    },

    surveys: {
      "povertyMultidimensional": "11.2% (IBGE Paraná)",
      "gini": "0.48 (IBGE)",
      "socialTrust": "71% confianza comunitaria y orgullo por la gestión ambiental",
      "perceivedSafety": "62% percepción en áreas cívicas y transporte BRT",
      "source": "IBGE / IPPUC / Observatório de Curitiba"
    },

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 115,
      "greenSpaceM2PerCapita": 52.0,
      "renewableEnergyShare": "88% (Copel / Hidroelectricidad)",
      "municipalAutonomyRate": "68% ingresos propios",
      "airQualityPM25": "11.5 µg/m³ (Prefeitura de Curitiba)",
      "keyLocalTension": "Contención de ocupaciones informales en áreas de manantiales protegidos"
    },

    tradableSurplus: [
      { id: 'cambio_verde_methodology', name: 'Sistema de Trueque Basura-por-Alimento', category: 'Conocimiento', baseSurplus: 450, unit: 'horas/mes' },
      { id: 'yerba_mate_agroforestal', name: 'Yerba Mate Sombría Agroforestal', category: 'Agroecología', baseSurplus: 180, unit: 'ton' }
    ]
  },

  // ==========================================
  // 14. KAMIKATSU (Tokushima, Japón)
  // ==========================================
  {
    id: 'kamikatsu',
    name: 'Kamikatsu (Tokushima)',
    country: 'Japón',
    coordinates: [33.8828, 134.3414],
    tag: 'Declaración Zero Waste (45 Categorías) · Entropía Cero',
    bioregion: 'Montañas Templadas de Shikoku',
    description: 'Pueblo montañoso rural pionero en el protocolo de basura cero (Zero Waste) sin incineradores. La comunidad segrega todos los materiales en 45 categorías individuales, alcanzando una tasa de desvío de vertedero superior al 81% y una economía de reciclaje circular cerrada (Mottainai).',
    population: 1450,
    artImage: getAssetUrl('art/solarpunk_citadel.jpg'),
    artCaption: 'Centro Zero Waste de Kamikatsu construido con madera local y ventanas reutilizadas.',
    badgeAccent: '#0284c7',

    resources: {
      water: {
        name: 'Vertientes Puras de Montaña de Shikoku',
        unit: 'm³/mes/cap',
        basalNeed: 42,
        naturalInflow: 98,
        extractiveLoad: 38,
        weight: 0.30,
      },
      biomass: {
        name: 'Bosques de Coníferas Nativas & Suelo Vivo',
        unit: 'ton MO/ha',
        basalNeed: 30,
        naturalInflow: 72,
        extractiveLoad: 25,
        weight: 0.30,
      },
      energy: {
        name: 'Microhidráulica & Biomasa de Poda Local',
        unit: 'MWh/mes',
        basalNeed: 110,
        naturalInflow: 180,
        extractiveLoad: 95,
        weight: 0.20,
      },
      care: {
        name: 'Cooperación Comunitaria Intergeneracional (Yui)',
        unit: 'hrs/semana/comunidad',
        basalNeed: 3400,
        naturalInflow: 5200,
        extractiveLoad: 2900,
        weight: 0.20,
      }
    },

    variables: {
      s1: 0.90, // Altísima cohesión social y reciprocidad (Yui)
      s2: 0.85, // Capacidad institucional local directa
      s3: 0.72, // Saberes tradicionales campesinos y artesanales
      s4: 0.92, // Ausencia total de delincuencia

      e1: 0.84, // Bosque montano continuo bien conservado
      e2: 0.88, // Agua de manantial no contaminada
      e3: 0.80, // Suelo enriquecido con compostaje 100% orgánico
      e4: 0.78, // Resiliencia climática de cuenca alta

      k1: 0.58, // Diversificación moderada (economía artesanal y turismo ecológico)
      k2: 0.65, // Autonomía local basada en suficiencia comunal
      k3: 0.72, // Gran equidad distributiva interna
      k4: 0.88, // Tasa de circularidad > 81% de materiales recuperados
    },

    pressureVars: {
      d1: 0.35, // Extracción casi nula
      d2: 0.40, // Baja presión demográfica (envejecimiento rural)
      d3: 0.35, // Poca penetración de capital extractivo externo
    },

    emissions: {
      scope1: 0.8,
      scope2: 0.5,
      scope3Upstream: 2.2,
      scope3Downstream: 1.1,
      localSequestration: 4.8, // Gran capturador neto por bosques circundantes
      gridCarbonIntensity: 420, // gCO2/kWh (Red nacional japonesa)
      dataSource: 'Zero Waste Academy Kamikatsu / Tokushima Prefecture',
      keyInsight: 'La segregación en 45 categorías reduce la entropía al mínimo biofísico posible sin requerir incineración.'
    },

    openDataSources: [
      { name: 'Zero Waste Academy Kamikatsu', url: 'https://zwa.jp', type: 'Organización Comunitaria', description: 'Metodología de las 45 categorías de reciclaje y auditoría de materiales.' },
      { name: 'Tokushima Open Data', url: 'https://opendata.pref.tokushima.lg.jp', type: 'Gobierno de Prefectura', description: 'Estadísticas ambientales de cuencas y bosques comunales.' }
    ],

    history: [
      { year: 2003, S: 0.80, E: 0.72, K: 0.60, H: 0.70, sigma: 0.65, gamma: 0.025, note: 'Primera Declaración Municipal de Basura Cero de Japón' },
      { year: 2024, S: 0.84, E: 0.82, K: 0.68, H: 0.78, sigma: 0.52, gamma: 0.018, note: 'Tasa de reciclaje real supera el 81% con tienda Kuru Kuru de trueque' }
    ],

    materialProperties: {
      modulusElasticity: 1.65,
      yieldStress: 0.84,
      ultimateStress: 1.15,
      fractureStress: 1.35,
    },

    surveys: {
      "povertyMultidimensional": "5.4% (Estándar rural de Tokushima)",
      "gini": "0.31 (Tokushima Statistics)",
      "socialTrust": "92% de participación cívica en clasificación de materiales",
      "perceivedSafety": "98% paz comunitaria absoluta",
      "source": "Tokushima Prefecture / Zero Waste Academy"
    },

    complementaryMetrics: {
      "waterConsumptionLitresPerDay": 88,
      "greenSpaceM2PerCapita": 450.0,
      "renewableEnergyShare": "35% microhidráulica comunal",
      "municipalAutonomyRate": "54% ingresos propios",
      "airQualityPM25": "6.2 µg/m³ (Aire puro de montaña)",
      "keyLocalTension": "Envejecimiento demográfico acelerado y preservación del relevo generacional"
    },

    tradableSurplus: [
      { id: 'zero_waste_protocol', name: 'Manual y Certificación de 45 Categorías Zero Waste', category: 'Conocimiento', baseSurplus: 500, unit: 'manuales' },
      { id: 'craft_beer_recycled', name: 'Cerveza Artesanal con Granos de Descarte', category: 'Agroecología', baseSurplus: 80, unit: 'barriles' }
    ]
  }
];
