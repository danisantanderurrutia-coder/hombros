/**
 * Prototypical Territorial Organism (El Organismo Prototípico Universal)
 * Generic, pedagogical sandbox for Daniel Santander's Hombros Model.
 * Desacoplado de estudios de caso particulares para facilitar la manipulación de variables.
 */

export const PROTOTYPICAL_PRESETS = [
  {
    id: 'sintropico',
    name: '🌿 Biorregión Sintrópica Balanceada',
    badge: 'Régimen Seguro (Verde)',
    tag: 'Autosustento, regeneración biomasal activa y alta cohesión',
    variables: {
      s1: 0.80, s2: 0.75, s3: 0.82, s4: 0.85, // S = 0.805
      e1: 0.78, e2: 0.74, e3: 0.80, e4: 0.75, // E = 0.769
      k1: 0.72, k2: 0.70, k3: 0.75, k4: 0.72, // K = 0.722
    },
    pressureVars: {
      d1: 0.50, d2: 0.60, d3: 0.55 // D = 0.55
    },
    resources: {
      water: { name: 'Acuíferos y Cuenca Hidrológica', unit: 'm³/mes/cap', basalNeed: 40, naturalInflow: 90, extractiveLoad: 45, weight: 0.35 },
      biomass: { name: 'Suelo Vivo y Biomasa Forestal', unit: 'ton MO/ha', basalNeed: 25, naturalInflow: 60, extractiveLoad: 35, weight: 0.25 },
      energy: { name: 'Autonomía Energética Solar/Eólica', unit: 'MWh/mes', basalNeed: 150, naturalInflow: 250, extractiveLoad: 140, weight: 0.20 },
      care: { name: 'Tiempo Social de Cuidados Comunitarios', unit: 'hrs/semana', basalNeed: 4000, naturalInflow: 6500, extractiveLoad: 3800, weight: 0.20 }
    },
    materialProperties: {
      modulusElasticity: 1.60,
      yieldStress: 0.80,
      ultimateStress: 1.10,
      fractureStress: 1.30,
    },
    description: 'El territorio modelo: la regeneración biótica y el cuidado comunitario superan holgadamente la extracción. Sus hombros operan con holgura elástica sin deuda ambiental.'
  },
  {
    id: 'extractivo',
    name: '🏭 Enclave Primario-Extractivo',
    badge: 'Sobrecarga / Plasticidad (Rojo)',
    tag: 'Monocultivo intensivo, subsidio externo y vaciamiento hídrico',
    variables: {
      s1: 0.52, s2: 0.40, s3: 0.48, s4: 0.55, // S ≈ 0.48
      e1: 0.28, e2: 0.24, e3: 0.32, e4: 0.30, // E ≈ 0.28
      k1: 0.30, k2: 0.25, k3: 0.45, k4: 0.20, // K ≈ 0.30
    },
    pressureVars: {
      d1: 1.85, d2: 0.70, d3: 1.40 // D ≈ 1.32
    },
    resources: {
      water: { name: 'Acuíferos y Cuenca Hidrológica', unit: 'm³/mes/cap', basalNeed: 45, naturalInflow: 50, extractiveLoad: 72, weight: 0.40 },
      biomass: { name: 'Suelo Vivo y Biomasa Forestal', unit: 'ton MO/ha', basalNeed: 28, naturalInflow: 35, extractiveLoad: 46, weight: 0.25 },
      energy: { name: 'Autonomía Energética Solar/Eólica', unit: 'MWh/mes', basalNeed: 140, naturalInflow: 130, extractiveLoad: 160, weight: 0.15 },
      care: { name: 'Tiempo Social de Cuidados Comunitarios', unit: 'hrs/semana', basalNeed: 4200, naturalInflow: 3800, extractiveLoad: 4400, weight: 0.20 }
    },
    materialProperties: {
      modulusElasticity: 0.85,
      yieldStress: 0.65,
      ultimateStress: 0.85,
      fractureStress: 1.00,
    },
    description: 'La tasa de extracción supera en más de 2x la capacidad de regeneración. El territorio ha superado el límite de fluencia (yield point) acumulando pasivos irreversibles.'
  },
  {
    id: 'metropolis',
    name: '🏙️ Metrópolis Hiper-Consumidora',
    badge: 'Deuda Externa Scope 3 (Ámbar)',
    tag: 'Riqueza financiera y técnica alta, pero parasitando recursos lejanos',
    variables: {
      s1: 0.82, s2: 0.90, s3: 0.88, s4: 0.85, // S ≈ 0.86
      e1: 0.48, e2: 0.55, e3: 0.45, e4: 0.60, // E ≈ 0.52
      k1: 0.85, k2: 0.80, k3: 0.70, k4: 0.35, // K ≈ 0.68
    },
    pressureVars: {
      d1: 0.60, d2: 1.25, d3: 1.35 // D ≈ 1.06
    },
    resources: {
      water: { name: 'Acuíferos y Cuenca Hidrológica', unit: 'm³/mes/cap', basalNeed: 42, naturalInflow: 65, extractiveLoad: 58, weight: 0.30 },
      biomass: { name: 'Suelo Vivo y Biomasa Forestal', unit: 'ton MO/ha', basalNeed: 22, naturalInflow: 38, extractiveLoad: 32, weight: 0.20 },
      energy: { name: 'Autonomía Energética Solar/Eólica', unit: 'MWh/mes', basalNeed: 520, naturalInflow: 620, extractiveLoad: 580, weight: 0.30 },
      care: { name: 'Tiempo Social de Cuidados Comunitarios', unit: 'hrs/semana', basalNeed: 15000, naturalInflow: 18000, extractiveLoad: 16500, weight: 0.20 }
    },
    materialProperties: {
      modulusElasticity: 1.45,
      yieldStress: 0.82,
      ultimateStress: 1.08,
      fractureStress: 1.25,
    },
    description: 'Capacidad institucional y social muy sólida, pero con severa desconexión biofísica: su alto nivel de vida se sostiene tercerizando la degradación hacia periferias distantes.'
  },
  {
    id: 'fractura_critica',
    name: '⚠️ Fractura de Hombro Crítico (E < 0.25)',
    badge: 'Ruptura Inminente (Negro)',
    tag: 'Demostración de la regla no compensatoria: la media geométrica colapsa',
    variables: {
      s1: 0.70, s2: 0.65, s3: 0.75, s4: 0.70, // S ≈ 0.70 (Aceptable)
      e1: 0.15, e2: 0.18, e3: 0.20, e4: 0.22, // E ≈ 0.18 (CRÍTICO: Ruptura ecosistémica)
      k1: 0.90, k2: 0.85, k3: 0.80, k4: 0.88, // K ≈ 0.86 (Muy alto capital financiero)
    },
    pressureVars: {
      d1: 1.50, d2: 0.80, d3: 1.10 // D ≈ 1.13
    },
    resources: {
      water: { name: 'Acuíferos y Cuenca Hidrológica', unit: 'm³/mes/cap', basalNeed: 45, naturalInflow: 25, extractiveLoad: 55, weight: 0.45 },
      biomass: { name: 'Suelo Vivo y Biomasa Forestal', unit: 'ton MO/ha', basalNeed: 28, naturalInflow: 18, extractiveLoad: 35, weight: 0.25 },
      energy: { name: 'Autonomía Energética Solar/Eólica', unit: 'MWh/mes', basalNeed: 180, naturalInflow: 220, extractiveLoad: 170, weight: 0.15 },
      care: { name: 'Tiempo Social de Cuidados Comunitarios', unit: 'hrs/semana', basalNeed: 4500, naturalInflow: 5200, extractiveLoad: 4200, weight: 0.15 }
    },
    materialProperties: {
      modulusElasticity: 0.65,
      yieldStress: 0.50,
      ultimateStress: 0.70,
      fractureStress: 0.85,
    },
    description: 'Demostración matemática de la regla de Daniel Santander: Aunque el Hombro Económico sea K = 0.86 y el Social S = 0.70, el colapso del Hombro Ambiental (E = 0.18 < 0.25) desmorona el sistema. El dinero no compra un acuífero destruido.'
  }
];

export const VARIABLE_METADATA = {
  s1: { name: 'Cohesión Social Comunitaria', shoulder: 'S', weight: 0.25, desc: 'Densidad del tejido vecinal, confianza interpersonal y asociatividad de base.' },
  s2: { name: 'Capacidad Institucional', shoulder: 'S', weight: 0.25, desc: 'Autonomía de gestión del gobierno local, transparencia y planes de adaptación.' },
  s3: { name: 'Capital Humano & Saberes', shoulder: 'S', weight: 0.25, desc: 'Conocimientos agroecológicos, saberes técnicos comunitarios y nivel formativo.' },
  s4: { name: 'Paz / Ausencia de Violencia', shoulder: 'S', weight: 0.25, desc: 'Seguridad territorial y ausencia de despojos violentos o violencia estructural.' },

  e1: { name: 'Integridad Ecosistémica', shoulder: 'E', weight: 0.30, desc: 'Cobertura biológica nativa remanente vs monocultivos y áreas degradadas.' },
  e2: { name: 'Disponibilidad Hídrica', shoulder: 'E', weight: 0.35, desc: 'Balance entre recarga natural del acuífero y derechos consuntivos concedidos.' },
  e3: { name: 'Calidad de Suelo Vivo', shoulder: 'E', weight: 0.20, desc: 'Contenido de materia orgánica, actividad microbiana y resistencia a la erosión.' },
  e4: { name: 'Resiliencia Climática', shoulder: 'E', weight: 0.15, desc: 'Capacidad de amortiguación frente a olas de calor, marejadas, sequías e incendios.' },

  k1: { name: 'Diversificación Productiva', shoulder: 'K', weight: 0.25, desc: 'Inverso de Herfindahl: pluralidad de rubros frente al riesgo de monocultivo.' },
  k2: { name: 'Autonomía Económica Local', shoulder: 'K', weight: 0.25, desc: 'Porcentaje de riqueza reinvertida en el territorio frente a fuga de capitales.' },
  k3: { name: 'Equidad Distributiva (1-Gini)', shoulder: 'K', weight: 0.25, desc: 'Justicia en el reparto del valor económico generado por la comunidad.' },
  k4: { name: 'Tasa Regeneración/Extracción', shoulder: 'K', weight: 0.25, desc: 'Relación biofísica entre tasa de reposición material y ritmo de explotación.' },

  d1: { name: 'Intensidad Extractiva', shoulder: 'D', desc: 'Presión directa de explotación sobre biomasa, agua, minerales y suelos.' },
  d2: { name: 'Presión Demográfica', shoulder: 'D', desc: 'Carga de habitantes y población flotante turística sobre la infraestructura vital.' },
  d3: { name: 'Fuga de Renta / Dependencia Externa', shoulder: 'D', desc: 'Inversión extractiva externa sin reinversión local y huella importada.' }
};
