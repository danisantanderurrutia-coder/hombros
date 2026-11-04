/**
 * HOMBROS Canonical Normalization Engine (Del Dato Crudo al Espacio [0, 1])
 * Basado en el protocolo OECD/JRC Handbook on Constructing Composite Indicators,
 * EPI (Yale/Columbia) y Umbrales Biofísicos de Liebig (Santander, 2026).
 *
 * Resuelve el eslabón metodológico entre el Dato Bruto Observable (X_raw)
 * en unidades físicas/sociales reales y el Índice Normalizado Adimensional [0, 1].
 *
 * Tres tipos de Funciones de Transferencia (Goalpost Scaling):
 * 1. DIRECT_LINEAR: Más valor crudo = Mayor capacidad portante (ej. % bosque nativo).
 * 2. INVERSE_LINEAR: Más valor crudo = Menor capacidad portante (ej. Gini, IHH, erosión).
 * 3. LOG_BOUNDED: Escala logarítmica para variables con asimetría extrema (ej. m³ agua/hab/año).
 */

export const NORMALIZATION_GOALPOSTS = {
  // ===========================================================================
  // HOMBRO SOCIAL (S): Cohesión, Instituciones, Capital Humano, Paz Territorial
  // ===========================================================================
  s1: {
    id: 's1',
    code: 'S₁',
    shoulder: 'S',
    shoulderName: 'Hombro Social (S)',
    name: 'Cohesión Social Comunitaria y Cuidados',
    rawMetricName: 'Tasa de Confianza Vecinal, Tejido de Cuidados y Participación en Comités de Base (APRs, Juntas, Cooperativas)',
    unit: '% población activa',
    polarity: 'DIRECT_LINEAR',
    formulaLatex: 'S_1 = \\text{clamp}_{[0,1]}\\left(\\frac{X_{\\text{raw}} - 10\\%}{85\\% - 10\\%}\\right)',
    goalposts: {
      collapseMin: 10,    // 0.00: Atomización social extrema / anomia / desarticulación por endeudamiento
      liebigCrit: 28.75,  // 0.25: Umbral crítico de fractura comunitaria y crisis de cuidados
      syntropicOpt: 85,   // 1.00: Tejido cooperativo, custodia colectiva del agua y minga consolidada
    },
    defaultRawExample: 62, // Chanco: ~62% -> 0.69
    dataTier: 'Tier 2 (Encuesta Comunal / CASEN Social / Registro APR)',
    officialSources: ['CASEN (Módulo Participación y Redes)', 'Catastro de Comités APR y Cooperativas Campesinas', 'Encuesta Barómetro Local'],
    rationale: 'Mide la densidad de articulación solidaria comunitaria y redes de cuidado mutuo. Por debajo del 10% la acción colectiva para gestionar bienes comunes (Ostrom) se disuelve bajo el peso del endeudamiento individual; sobre el 85% alcanza soberanía comunitaria.'
  },
  s2: {
    id: 's2',
    code: 'S₂',
    shoulder: 'S',
    shoulderName: 'Hombro Social (S)',
    name: 'Capacidad Institucional y Fiscalización Laboral-Ambiental',
    rawMetricName: 'Ejecución Presupuestaria Local, Fiscalización de Ordenanzas y Defensa de Bienes Comunes',
    unit: 'Índice SINIM (0-100 pts)',
    polarity: 'DIRECT_LINEAR',
    formulaLatex: 'S_2 = \\text{clamp}_{[0,1]}\\left(\\frac{X_{\\text{raw}} - 20}{95 - 20}\\right)',
    goalposts: {
      collapseMin: 20,    // 0.00: Municipio fallido / captura corporativa / sin fiscalización laboral
      liebigCrit: 38.75,  // 0.25: Umbral crítico de parálisis administrativa y desprotección rural
      syntropicOpt: 95,   // 1.00: Gestión municipal autónoma, transparente y fiscalizadora
    },
    defaultRawExample: 56,
    dataTier: 'Tier 3 (Registro Administrativo Auditado)',
    officialSources: ['SINIM (SUBDERE)', 'Dirección del Trabajo (Fiscalización Agrícola)', 'Contraloría General / Transparencia Municipal'],
    rationale: 'Mide la eficacia del gobierno local y servicios públicos para ejecutar presupuestos, fiscalizar condiciones laborales de temporada y defender ordenanzas de protección de cuencas sin sujeción a intereses corporativos.'
  },
  s3: {
    id: 's3',
    code: 'S₃',
    shoulder: 'S',
    shoulderName: 'Hombro Social (S)',
    name: 'Trabajo Digno, Saberes Locales y Empleo Rural',
    rawMetricName: 'Índice Integrado de Escolaridad/Saberes y Tasa de Formalidad y Estabilidad Laboral (Inverso de Asalarización Precaria)',
    unit: 'Puntos equiv. (0-16)',
    polarity: 'DIRECT_LINEAR',
    formulaLatex: 'S_3 = \\text{clamp}_{[0,1]}\\left(\\frac{X_{\\text{raw}} - 4.0}{15.0 - 4.0}\\right)',
    goalposts: {
      collapseMin: 4.0,   // 0.00: Superexplotación temporera, analfabetismo y despojo de saberes tradicionales
      liebigCrit: 6.75,   // 0.25: Umbral de precarización laboral y vulnerabilidad cognitiva
      syntropicOpt: 15.0, // 1.00: Trabajo rural digno, estabilidad laboral y retención de saberes agroecológicos
    },
    defaultRawExample: 10.1,
    dataTier: 'Tier 2 (Censo / CASEN Trabajo / ENE-INE)',
    officialSources: ['INE (Encuesta Nacional de Empleo - Informalidad Rural)', 'CASEN / MINEDUC', 'Catastro de Saberes Campesinos y Agroecológicos'],
    rationale: 'Corrige el sesgo credencialista tradicional penalizando la informalidad laboral agraria, el subempleo temporero de temporada y la pérdida de oficios bioculturales campesinos.'
  },
  s4: {
    id: 's4',
    code: 'S₄',
    shoulder: 'S',
    shoulderName: 'Hombro Social (S)',
    name: 'Paz Territorial y Ausencia de Violencia',
    rawMetricName: 'Tasa de Delitos de Mayor Connotación Social y Conflictos Socioambientales Activos',
    unit: 'Eventos / 10.000 hab',
    polarity: 'INVERSE_LINEAR',
    formulaLatex: 'S_4 = \\text{clamp}_{[0,1]}\\left(\\frac{450 - X_{\\text{raw}}}{450 - 20}\\right)',
    goalposts: {
      collapseMin: 450,   // 0.00: Violencia estructural aguda / zona en conflicto severo
      liebigCrit: 342.5,  // 0.25: Umbral crítico de inseguridad y despojo
      syntropicOpt: 20,   // 1.00: Paz territorial y convivencia segura
    },
    defaultRawExample: 149,
    dataTier: 'Tier 3 (Estadísticas Oficiales / INDH)',
    officialSources: ['CEAD Subsecretaría Prevención del Delito', 'Mapa de Conflictos Socioambientales INDH', 'Eurostat Crime Statistics'],
    rationale: 'Polaridad inversa: a menor tasa de violencia y conflictividad extractiva, mayor es la integridad del tejido social (S₄ → 1.0).'
  },

  // ===========================================================================
  // HOMBRO ECOSISTÉMICO / AMBIENTAL (E): Bosque, Agua, Suelo, Clima
  // ===========================================================================
  e1: {
    id: 'e1',
    code: 'E₁',
    shoulder: 'E',
    shoulderName: 'Hombro Ambiental (E)',
    name: 'Integridad Ecosistémica y Cobertura Nativa',
    rawMetricName: 'Proporción de Vegetación Nativa y Corredores Biológicos vs. Superficie de Cuenca',
    unit: '% superficie nativa',
    polarity: 'DIRECT_LINEAR',
    formulaLatex: 'E_1 = \\text{clamp}_{[0,1]}\\left(\\frac{X_{\\text{raw}} - 5\\%}{65\\% - 5\\%}\\right)',
    goalposts: {
      collapseMin: 5,     // 0.00: Ecocidio / sustitución total por pavimento o monocultivo
      liebigCrit: 20,     // 0.25: Umbral de fragmentación crítica de hábitat (Rockström)
      syntropicOpt: 65,   // 1.00: Matriz biodiversa regenerativa (>65% cobertura funcional)
    },
    defaultRawExample: 24.2,
    dataTier: 'Tier 3 (Teledetección Satelital + Catastro)',
    officialSources: ['CONAF Catastro Vegetacional', 'Copernicus Sentinel-2 (NDVI)', 'European Environment Agency (CORINE Land Cover)'],
    rationale: 'Anclado en los umbrales de integridad de la biosfera (Steffen et al., 2015): cuando el remanente nativo cae bajo el 20%, colapsa la polinización y regulación hidrológica.'
  },
  e2: {
    id: 'e2',
    code: 'E₂',
    shoulder: 'E',
    shoulderName: 'Hombro Ambiental (E)',
    name: 'Seguridad Hídrica de Cuenca',
    rawMetricName: 'Disponibilidad Hídrica Renovable Neta tras Caudal Ecológico (Índice Falkenmark)',
    unit: 'm³ / hab / año',
    polarity: 'LOG_BOUNDED',
    formulaLatex: 'E_2 = \\text{clamp}_{[0,1]}\\left(\\frac{\\ln(X_{\\text{raw}}) - \\ln(300)}{\\ln(3500) - \\ln(300)}\\right)',
    goalposts: {
      collapseMin: 300,   // 0.00: Escasez hídrica absoluta (<500 m³ Falkenmark + agotamiento napa)
      liebigCrit: 555,    // 0.25: Umbral de emergencia hídrica estructural
      syntropicOpt: 3500, // 1.00: Holgura hidrológica y recarga de acuífero asegurada
    },
    defaultRawExample: 760,
    dataTier: 'Tier 3 (Estaciones Fluviométricas y Pozos)',
    officialSources: ['DGA / Red Hidrométrica SNIA', 'Copernicus NDWI', 'Water Exploitation Index (WEI+ EEA)'],
    rationale: 'Usa transformación logarítmica sobre los umbrales hidro-climáticos de Falkenmark: penaliza severamente la caída bajo 1.000 m³/hab/año y satura sobre 3.500 m³/hab/año.'
  },
  e3: {
    id: 'e3',
    code: 'E₃',
    shoulder: 'E',
    shoulderName: 'Hombro Ambiental (E)',
    name: 'Calidad de Suelo Vivo y Carbono Edáfico',
    rawMetricName: 'Contenido de Materia Orgánica del Suelo (SOM) libre de Contaminación por Metales',
    unit: '% Materia Orgánica',
    polarity: 'DIRECT_LINEAR',
    formulaLatex: 'E_3 = \\text{clamp}_{[0,1]}\\left(\\frac{X_{\\text{raw}} - 0.8\\%}{5.5\\% - 0.8\\%}\\right) \\cdot (1 - \\text{Tox}_{\\text{metal}})',
    goalposts: {
      collapseMin: 0.8,   // 0.00: Suelo mineralizado muerto, desertificado o tóxico
      liebigCrit: 1.98,   // 0.25: Umbral crítico de pérdida de estructura edáfica (<2% SOM)
      syntropicOpt: 5.5,  // 1.00: Suelo vivo sintrópico de alta retención hídrica
    },
    defaultRawExample: 2.68,
    dataTier: 'Tier 2 (Cartografía Agrológica / Muestreo)',
    officialSources: ['CIREN Estudios Agrológicos', 'LUCAS Topsoil Survey (JRC Europa)', 'SINCA / MMA Suelos Contaminados'],
    rationale: 'En edafología agrícola, menos de 2% de materia orgánica desestabiliza los agregados del suelo y dispara la erosión; en zonas como Quintero se penaliza además por deposición de arsénico/cobre.'
  },
  e4: {
    id: 'e4',
    code: 'E₄',
    shoulder: 'E',
    shoulderName: 'Hombro Ambiental (E)',
    name: 'Calidad Atmosférica y Resiliencia Climática',
    rawMetricName: 'Concentración Media Anual de Material Particulado Fino (PM2.5) y Exposición Térmica',
    unit: 'µg/m³ PM2.5 equiv.',
    polarity: 'INVERSE_LINEAR',
    formulaLatex: 'E_4 = \\text{clamp}_{[0,1]}\\left(\\frac{50 - X_{\\text{raw}}}{50 - 5}\\right)',
    goalposts: {
      collapseMin: 50,    // 0.00: Zona saturada / emergencia tóxica crónica (10x guía OMS)
      liebigCrit: 38.75,  // 0.25: Umbral de daño respiratorio y vulnerabilidad climática
      syntropicOpt: 5,    // 1.00: Estándar óptimo OMS (≤ 5 µg/m³) y amortiguación térmica
    },
    defaultRawExample: 18,
    dataTier: 'Tier 3 (Sensores en Tiempo Real)',
    officialSources: ['SINCA Ministerio del Medio Ambiente', 'ARClim (Atlas de Riesgos Climáticos)', 'European Air Quality Index (EEA)'],
    rationale: 'Polaridad inversa calibrada con la directriz de la OMS (5 µg/m³ = 1.0) y niveles de saturación tóxica (50 µg/m³ = 0.0).'
  },

  // ===========================================================================
  // HOMBRO ECONÓMICO (K): Diversificación, Autonomía, Equidad, Balance Biótico
  // ===========================================================================
  k1: {
    id: 'k1',
    code: 'K₁',
    shoulder: 'K',
    shoulderName: 'Hombro Económico (K)',
    name: 'Diversificación Productiva Territorial',
    rawMetricName: 'Índice de Concentración Sectorial de Herfindahl-Hirschman (IHH Comunal)',
    unit: 'IHH (1.000 a 10.000)',
    polarity: 'INVERSE_LINEAR',
    formulaLatex: 'K_1 = \\text{clamp}_{[0,1]}\\left(\\frac{8000 - \\text{IHH}}{8000 - 1200}\\right)',
    goalposts: {
      collapseMin: 8000,  // 0.00: Monopolio extractivo absoluto (Company Town / Monocultivo)
      liebigCrit: 6300,   // 0.25: Dependencia extrema de un solo commodity
      syntropicOpt: 1200, // 1.00: Matriz económica policéntrica y altamente diversificada
    },
    defaultRawExample: 5620,
    dataTier: 'Tier 3 (Estadísticas Tributarias)',
    officialSources: ['SII Estadísticas de Empresas por Rubro', 'Banco Central Cuentas Regionales', 'Eurostat Structural Business Statistics'],
    rationale: 'En economía industrial, un IHH > 2.500 indica alta concentración; sobre 6.300 el territorio queda rehen de un único enclave (forestal, minero o turístico).'
  },
  k2: {
    id: 'k2',
    code: 'K₂',
    shoulder: 'K',
    shoulderName: 'Hombro Económico (K)',
    name: 'Autonomía Económica y Fiscal Local',
    rawMetricName: 'Proporción de Ingresos Propios Permanentes y Reinversión Cooperativa Local',
    unit: '% autonomía local',
    polarity: 'DIRECT_LINEAR',
    formulaLatex: 'K_2 = \\text{clamp}_{[0,1]}\\left(\\frac{X_{\\text{raw}} - 5\\%}{80\\% - 5\\%}\\right)',
    goalposts: {
      collapseMin: 5,     // 0.00: Dependencia asistencialista total (>95% subsidio externo)
      liebigCrit: 23.75,  // 0.25: Fragilidad presupuestaria crónica
      syntropicOpt: 80,   // 1.00: Soberanía fiscal y retención del excedente en la cuenca
    },
    defaultRawExample: 26,
    dataTier: 'Tier 3 (Finanzas Municipales)',
    officialSources: ['SINIM (Ingresos Propios vs. FCM)', 'OCDE Fiscal Decentralisation Database'],
    rationale: 'Evalúa si la riqueza generada en el territorio permanece para financiar bienes públicos locales o si el municipio depende pasivamente de transferencias centrales.'
  },
  k3: {
    id: 'k3',
    code: 'K₃',
    shoulder: 'K',
    shoulderName: 'Hombro Económico (K)',
    name: 'Justicia Distributiva y Ausencia de Endeudamiento de Subsistencia',
    rawMetricName: 'Coeficiente Gini Re-escalado y Ratio de Deuda de Subsistencia de los Hogares Rurales',
    unit: 'Coeficiente Gini (0-1)',
    polarity: 'INVERSE_LINEAR',
    formulaLatex: 'K_3 = \\text{clamp}_{[0,1]}\\left(\\frac{0.65 - \\text{Gini}}{0.65 - 0.22}\\right)',
    goalposts: {
      collapseMin: 0.65,  // 0.00: Hiper-desigualdad oligárquica, sobreendeudamiento usurario familiar y despojo
      liebigCrit: 0.54,   // 0.25: Umbral de fractura distributiva y asfixia crediticia en hogares
      syntropicOpt: 0.22, // 1.00: Equidad distributiva óptima, soberanía económica familiar y trabajo cooperativo
    },
    defaultRawExample: 0.42,
    dataTier: 'Tier 2 (Encuesta de Ingresos / Impuestos / CMF Endeudamiento)',
    officialSources: ['CASEN / MDSF', 'Comisión para el Mercado Financiero (Endeudamiento Rural)', 'World Inequality Database (WID)'],
    rationale: 'Re-escala el Coeficiente de Gini penalizando la concentración oligárquica del excedente y la bancarización usuraria de la subsistencia que obliga a las familias campesinas a endeudarse para cubrir canasta básica y agua.'
  },
  k4: {
    id: 'k4',
    code: 'K₄',
    shoulder: 'K',
    shoulderName: 'Hombro Económico (K)',
    name: 'Balance Metabólico Regeneración / Extracción',
    rawMetricName: 'Tasa de Reposición Biótica e Inversión Regenerativa sobre Extracción Bruta',
    unit: 'Ratio T_reg / T_ext',
    polarity: 'DIRECT_LINEAR',
    formulaLatex: 'K_4 = \\text{clamp}_{[0,1]}\\left(\\frac{X_{\\text{raw}} - 0.10}{1.10 - 0.10}\\right)',
    goalposts: {
      collapseMin: 0.10,  // 0.00: Minería ecológica pura (se extrae 10x lo que se regenera)
      liebigCrit: 0.35,   // 0.25: Déficit metabólico severo
      syntropicOpt: 1.10, // 1.00: Economía sintrópica (regenera 10% más de lo que extrae)
    },
    defaultRawExample: 0.48,
    dataTier: 'Tier 2 (Cuentas de Flujo de Materiales MFA)',
    officialSources: ['Cuentas Ambientales Banco Central / MMA', 'Eurostat Material Flow Accounts (MFA)', 'Global Footprint Network (Biocapacidad / Huella)'],
    rationale: 'Conecta directamente la economía con la Primera y Segunda Ley de la Termodinámica: mide si el aparato productivo repone o devora su base material.'
  },

  // ===========================================================================
  // VECTORES DE PRESIÓN DE DESARROLLO (D): Escala [0.0, 2.5]
  // ===========================================================================
  d1: {
    id: 'd1',
    code: 'D₁',
    shoulder: 'D',
    shoulderName: 'Vector de Presión (D)',
    name: 'Intensidad Extractiva Primaria',
    rawMetricName: 'Extracción Material Doméstica y Carga Tóxica Industrial por Hectárea Bioproductiva',
    unit: 'ton / ha / año',
    polarity: 'PRESSURE_LINEAR',
    formulaLatex: 'D_1 = \\text{clamp}_{[0,2.5]}\\left(\\frac{X_{\\text{raw}}}{12.0}\\right)',
    goalposts: {
      collapseMin: 0,     // 0.00: Sin presión extractiva industrial
      liebigCrit: 12.0,   // 1.00: Capacidad de asimilación nominal (12 ton/ha/año)
      syntropicOpt: 30.0, // 2.50: Sobrecarga extractiva extrema (complejo industrial/minero)
    },
    defaultRawExample: 16.2,
    dataTier: 'Tier 3 (RETC / MFA)',
    officialSources: ['RETC Ministerio del Medio Ambiente', 'SERNAGEOMIN / CONAF Cosecha Forestal', 'Eurostat Domestic Material Consumption'],
    rationale: 'A diferencia de los hombros [0, 1], las presiones D se normalizan en [0, 2.5], donde 1.0 representa la carga nominal de diseño de la cuenca.'
  },
  d2: {
    id: 'd2',
    code: 'D₂',
    shoulder: 'D',
    shoulderName: 'Vector de Presión (D)',
    name: 'Presión Demográfica y Sellado de Suelo',
    rawMetricName: 'Densidad de Población Equivalente y Porcentaje de Impermeabilización Urbana',
    unit: '% suelo sellado equiv.',
    polarity: 'PRESSURE_LINEAR',
    formulaLatex: 'D_2 = \\text{clamp}_{[0,2.5]}\\left(\\frac{X_{\\text{raw}}}{40\\%}\\right)',
    goalposts: {
      collapseMin: 0,     // 0.00: Territorio rural de baja densidad sin sellado
      liebigCrit: 40,     // 1.00: Urbanización consolidada (40% impermeabilización)
      syntropicOpt: 100,  // 2.50: Hiper-densificación e impermeabilización total
    },
    defaultRawExample: 20,
    dataTier: 'Tier 3 (Catastro Urbano / Satelital)',
    officialSources: ['INE / MINVU', 'Copernicus Imperviousness Layer', 'Eurostat Urban Atlas'],
    rationale: 'Cuantifica la presión física de la infraestructura urbana y habitacional sobre el ciclo de infiltración del agua y el suelo de la cuenca.'
  },
  d3: {
    id: 'd3',
    code: 'D₃',
    shoulder: 'D',
    shoulderName: 'Vector de Presión (D)',
    name: 'Presión Exógena, Fuga de Renta y Huella Scope 3',
    rawMetricName: 'Huella de Consumo Importado (Scope 3 Upstream) + Carga Turística / Financiera Externa',
    unit: 'tCO₂e Scope 3 + Fuga equiv.',
    polarity: 'PRESSURE_LINEAR',
    formulaLatex: 'D_3 = \\text{clamp}_{[0,2.5]}\\left(\\frac{X_{\\text{raw}}}{6.0}\\right)',
    goalposts: {
      collapseMin: 0,     // 0.00: Metabolismo autocontenido sin externalización ni fuga
      liebigCrit: 6.0,    // 1.00: Presión exógena moderada (6 tCO₂e/cap o equivalente extractivo)
      syntropicOpt: 15.0, // 2.50: Hiper-consumo importador o enclave turístico/portuario masivo
    },
    defaultRawExample: 5.1,
    dataTier: 'Tier 2 (Tablas Input-Output Multirregionales MRIO)',
    officialSources: ['C40 Consumption-Based Emissions', 'EXIOBASE / Eora MRIO', 'SERNATUR Flujos Flotantes / Aduanas'],
    rationale: 'Captura las dos caras del metabolismo global: en el Norte Global mide la huella importada (Scope 3) y el turismo masivo; en el Sur Global mide la succión de rentas por corporaciones foráneas.'
  }
};

/**
 * Convierte cualquier Dato Crudo (rawVal) en su Score Normalizado [0, 1] (o [0, 2.5] para D)
 * usando los Postes de Meta (Goalposts) canónicos del estándar HOMBROS.
 */
export function normalizeRawValue(varId, rawVal) {
  const spec = NORMALIZATION_GOALPOSTS[varId];
  if (!spec) return 0.5;

  const x = parseFloat(rawVal);
  if (isNaN(x)) return 0.5;

  const { collapseMin, syntropicOpt } = spec.goalposts;

  if (spec.polarity === 'DIRECT_LINEAR') {
    const norm = (x - collapseMin) / (syntropicOpt - collapseMin);
    return parseFloat(Math.max(0.01, Math.min(1.0, norm)).toFixed(3));
  }

  if (spec.polarity === 'INVERSE_LINEAR') {
    // collapseMin is the WORST (highest) value; syntropicOpt is the BEST (lowest) value
    const norm = (collapseMin - x) / (collapseMin - syntropicOpt);
    return parseFloat(Math.max(0.01, Math.min(1.0, norm)).toFixed(3));
  }

  if (spec.polarity === 'LOG_BOUNDED') {
    const safeX = Math.max(1, x);
    const minLog = Math.log(Math.max(1, collapseMin));
    const maxLog = Math.log(Math.max(2, syntropicOpt));
    const norm = (Math.log(safeX) - minLog) / (maxLog - minLog);
    return parseFloat(Math.max(0.01, Math.min(1.0, norm)).toFixed(3));
  }

  if (spec.polarity === 'PRESSURE_LINEAR') {
    // Scales from [0, syntropicOpt] -> [0.05, 2.50] where liebigCrit maps to 1.0
    const norm = x / spec.goalposts.liebigCrit;
    return parseFloat(Math.max(0.05, Math.min(2.5, norm)).toFixed(3));
  }

  return 0.5;
}

/**
 * Función Inversa: Dado un Score Normalizado [0, 1] actual en un territorio,
 * deduce el Valor Físico Crudo Equivalente (X_raw) según el estándar HOMBROS.
 * Permite auditar cualquier territorio del modelo en sus unidades físicas originales.
 */
export function denormalizeScoreToRaw(varId, score) {
  const spec = NORMALIZATION_GOALPOSTS[varId];
  if (!spec) return score;

  const s = parseFloat(score);
  if (isNaN(s)) return 0;

  const { collapseMin, syntropicOpt, liebigCrit } = spec.goalposts;

  if (spec.polarity === 'DIRECT_LINEAR') {
    const raw = collapseMin + s * (syntropicOpt - collapseMin);
    return parseFloat(raw.toFixed(2));
  }

  if (spec.polarity === 'INVERSE_LINEAR') {
    const raw = collapseMin - s * (collapseMin - syntropicOpt);
    return parseFloat(raw.toFixed(2));
  }

  if (spec.polarity === 'LOG_BOUNDED') {
    const minLog = Math.log(Math.max(1, collapseMin));
    const maxLog = Math.log(Math.max(2, syntropicOpt));
    const raw = Math.exp(minLog + s * (maxLog - minLog));
    return Math.round(raw);
  }

  if (spec.polarity === 'PRESSURE_LINEAR') {
    const raw = s * liebigCrit;
    return parseFloat(raw.toFixed(1));
  }

  return s;
}
