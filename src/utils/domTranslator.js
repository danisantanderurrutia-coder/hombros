/**
 * Global Bilingual DOM Text-Node & Attribute Translator (ES <-> EN)
 *
 * Complementa las traducciones declarativas de react-i18next (Navbar, Landing,
 * Hero, Trípode, Mapa Satelital, Kit Banner, Modal Filosofía y TabHeaderBanner)
 * traduciendo en tiempo real todos los textos de las vistas profundas
 * (Think Tank, CORE, Atlas, Auditoría Biofísica, Artículos & Policy, Marco Epistémico)
 * sin alterar la jerarquía del DOM ni interferir con fórmulas KaTeX o bloques de código R.
 */

const EXACT_DICTIONARY = {
  // Think Tank View
  'THINK TANK & INCUBADORA TERRITORIAL': 'TERRITORIAL THINK TANK & INCUBATOR',
  'SUR GLOBAL · TRANSDISCIPLINAR': 'GLOBAL SOUTH · TRANSDISCIPLINARY',
  'De la autopsia extractiva a la': 'From extractive autopsy to',
  'seguridad integral y el cuidado de la vida': 'integral security and the care of life',
  'Descargar Presentación Oficial (PDF)': 'Download Official Presentation (PDF)',
  'Ver Propuesta de Ley & Policy': 'View Legislative Proposal & Policy',
  'Kit Audita tu Cuenca': 'Audit Your Watershed Kit',
  'Filosofía de los Hombros': 'Philosophy of Shoulders',
  'PROPÓSITO FUNDACIONAL': 'FOUNDATIONAL PURPOSE',
  'Nuestra Misión': 'Our Mission',
  'PENSAMIENTO + ACCIÓN': 'THOUGHT + ACTION',
  'HORIZONTE CIVILIZATORIO': 'CIVILIZATIONAL HORIZON',
  'Nuestra Visión': 'Our Vision',
  'SOBERANÍA BIOFÍSICA': 'BIOPHYSICAL SOVEREIGNTY',
  'DIRECCIÓN CIENTÍFICA & BIOFÍSICA': 'SCIENTIFIC & BIOPHYSICAL DIRECTION',
  'Geofísica de Cuencas & Modelación de No-Equilibrio': 'Watershed Geophysics & Non-Equilibrium Modeling',
  'CUIDADO COLECTIVO & SALUD COMUNITARIA': 'COLLECTIVE CARE & COMMUNITY HEALTH',
  'Psicología Comunitaria & Duelo Socioambiental': 'Community Psychology & Socio-Environmental Grief',
  'SEGURIDAD INTEGRAL & TEJIDO BARRIAL': 'INTEGRAL SECURITY & NEIGHBORHOOD FABRIC',
  'Sociología de la Seguridad Vecinal & Gobernanza Local': 'Neighborhood Security Sociology & Local Governance',
  'Modelación Territorial & Diagnóstico Transdisciplinar': 'Territorial Modeling & Transdisciplinary Diagnosis',
  'CIENCIA DE FRONTERA & BIOFÍSICA': 'FRONTIER SCIENCE & BIOPHYSICS',
  'Instrumentos de Planificación, Regulación & Políticas Públicas': 'Planning Instruments, Regulation & Public Policy',
  'INCIDENCIA NORMATIVA & GOBERNANZA': 'REGULATORY ADVOCACY & GOVERNANCE',
  'Incubadora de Proyectos & Ecotecnologías Territoriales': 'Project Incubator & Territorial Ecotechnologies',
  'ACCIÓN DIRECTA & SOBERANÍA MATERIAL': 'DIRECT ACTION & MATERIAL SOVEREIGNTY',
  'Cohesión Psicosocial, Seguridad Vecinal & Salud Comunitaria': 'Psychosocial Cohesion, Neighborhood Security & Community Health',
  'CUIDADO COLECTIVO & TEJIDO PROTECTOR': 'COLLECTIVE CARE & PROTECTIVE FABRIC',
  'AgriTwin: Gemelo Digital Vecinal de Cuenca': 'AgriTwin: Community Watershed Digital Twin',
  'EN PILOTAJE · TECNOLOGÍA ABIERTA': 'PILOT PHASE · OPEN TECHNOLOGY',
  'Agroforestería Sintrópica & Bosques de Agua': 'Syntropic Agroforestry & Water Forests',
  'TERRENO · RESTAURACIÓN PRODUCTIVA': 'FIELD · PRODUCTIVE RESTORATION',
  'Red Panal de Amortiguación Vecinal (APRs)': 'Community Damping Honeycomb Network (RWCs)',
  'GOBERNANZA COMÚN · BIENES COLECTIVOS': 'COMMONS GOVERNANCE · COLLECTIVE GOODS',

  // CORE Dashboard Subtabs & Labels
  'Capacidad Portante (H)': 'Carrying Capacity (H)',
  'Trípode & Hombros': 'Tripod & Shoulders',
  'Territorio como Cuerpo': 'Territory as a Body',
  'Corporeidad & 3D': 'Embodiment & 3D',
  'Tensión Sistémica (σ)': 'Systemic Stress (σ)',
  'Reología & Cargas': 'Rheology & Loads',
  'Tasa Sintrópica (Γ)': 'Syntropic Rate (Γ)',
  'Metabolismo Basal': 'Basal Metabolism',
  'Simulador Prospectivo': 'Forecasting Simulator',
  'Dinámica a 36 Meses': '36-Month Dynamics',
  'Organismo Integrado': 'Integrated Organism',
  'Vista Holística': 'Holistic View',
  'Zona Segura y Sintrópica (Régimen Elástico)': 'Safe & Syntropic Zone (Elastic Regime)',
  'Tensión Elástica (Fatiga Absorbible)': 'Elastic Stress (Absorbable Fatigue)',
  'Deformación Plástica (Daño Estructural / Histéresis)': 'Plastic Deformation (Structural Damage / Hysteresis)',
  'Punto de Fractura y Colapso Metabólico': 'Fracture Point and Metabolic Collapse',

  // World Territories Map (Atlas) Subtabs
  'Cartografía Satelital': 'Satellite Cartography',
  'Mapa Plano & Datos': 'Flat Map & Data',
  'Semáforo & Ciudades': 'Traffic Light & Cities',
  'Protocolos & Mapa': 'Protocols & Map',
  'Contraste de Modelos': 'Model Comparison',
  'Benchmarking & Casos': 'Benchmarking & Cases',
  'Desplazamiento Scope 3': 'Scope 3 Displacement',
  'Metabolismo & Deuda': 'Metabolism & Debt',
  'El Panal Territorial': 'The Territorial Honeycomb',
  'Red P2P & Resiliencia': 'P2P Network & Resilience',
  'Fuentes de Datos': 'Open Data Sources',
  'Geoportales & Registros': 'Geoportals & Records',
  '🛰️ Satélite HD Fotográfico': '🛰️ Photographic HD Satellite',
  '🌌 Bio-Digital Nocturno': '🌌 Night Bio-Digital',
  '🏔️ Relieve & Cuencas': '🏔️ Relief & Watersheds',

  // Metabolic Audit View Subtabs
  'Kit: Audita tu Cuenca': 'Kit: Audit Your Watershed',
  'Consola Integral Comunitaria': 'Integral Community Console',
  'Hipótesis & Variables [0, 1]': 'Hypotheses & Variables [0, 1]',
  'Calibración & Cuenca': 'Calibration & Watershed',
  'Ensayo de Tracción SEIA 2.0': 'EIA 2.0 Traction Test',
  'Carga Pre-Inversión': 'Pre-Investment Load',
  'Rating & Salvaguarda': 'Rating & Safeguard',
  'Dictamen Vinculante': 'Binding Ruling',
  'ROI Biofísico vs. Inacción': 'Biophysical ROI vs. Inaction',
  'Gasto Sísifo vs. Sintropía': 'Sisyphus Spending vs. Syntropy',

  // Theory View (Marco Epistémico)
  'Biblioteca & Papers': 'Library & Papers',
  'Lector Editorial': 'Editorial Reader',
  'Presentación Oficial (PDF)': 'Official Presentation (PDF)',
  'Galería de Figuras Canónicas': 'Canonical Figures Gallery',
  'Explorador de Scripts (Hub)': 'Scripts Explorer (Hub)',
  'Hombros de Gigantes': 'Shoulders of Giants',
  'Elástico Reversible': 'Reversible Elastic',
  'Fractura Hídrica': 'Water Fracture',
  'Zona de Sacrificio Total': 'Total Sacrifice Zone',
  'Fluencia Asintótica': 'Asymptotic Yielding',
  'Plástico / Turístico': 'Plastic / Tourist',
  'Fluencia Controlada': 'Controlled Yielding',
  'Plástico / Dependiente': 'Plastic / Dependent',
  'Fluencia Estable': 'Stable Yielding'
};

// Phrase pairs sorted longest-first for composite/partial text nodes
const PHRASE_REPLACEMENTS = [
  ['Sistema de Evaluación de Impacto Ambiental', 'Environmental Impact Assessment System'],
  ['Cláusula de Salvaguarda Pre-Inversional', 'Pre-Investment Safeguard Clause'],
  ['Mecánica de Medios Continuos', 'Continuum Mechanics'],
  ['mecánica de medios continuos', 'continuum mechanics'],
  ['Capacidad Portante de Liebig', 'Liebig Carrying Capacity'],
  ['Capacidad Portante', 'Carrying Capacity'],
  ['capacidad portante', 'carrying capacity'],
  ['Tensión Sistémica', 'Systemic Stress'],
  ['tensión sistémica', 'systemic stress'],
  ['Tasa Sintrópica', 'Syntropic Rate'],
  ['tasa sintrópica', 'syntropic rate'],
  ['Hombro Ecológico', 'Ecological Shoulder'],
  ['Hombro Ambiental', 'Ecological Shoulder'],
  ['Hombro Social', 'Social Shoulder'],
  ['Hombro Económico', 'Economic Shoulder'],
  ['Hombro Capital', 'Capital Shoulder'],
  ['hombros basales', 'basal shoulders'],
  ['Tres Hombros', 'Three Shoulders'],
  ['tres hombros', 'three shoulders'],
  ['Ensayo de Tracción', 'Traction Test'],
  ['ensayo de tracción', 'traction test'],
  ['Semáforo Biofísico', 'Biophysical Traffic Light'],
  ['semáforo biofísico', 'biophysical traffic light'],
  ['Auditoría Biofísica', 'Biophysical Audit'],
  ['auditoría biofísica', 'biophysical audit'],
  ['Atlas Territorial', 'Territorial Atlas'],
  ['Marco Epistémico', 'Epistemic Framework'],
  ['Artículos & Policy', 'Articles & Policy'],
  ['Red Panal', 'Honeycomb Network'],
  ['red panal', 'honeycomb network'],
  ['Gemelo Digital', 'Digital Twin'],
  ['gemelo digital', 'digital twin'],
  ['Límite de Fluencia', 'Yield Limit'],
  ['límite de fluencia', 'yield limit'],
  ['Punto de Fractura', 'Fracture Point'],
  ['Deformación Plástica', 'Plastic Deformation'],
  ['deformación plástica', 'plastic deformation'],
  ['Régimen Elástico', 'Elastic Regime'],
  ['régimen elástico', 'elastic regime'],
  ['Colapso Extractivo', 'Extractive Collapse'],
  ['Equilibrio Basal', 'Basal Equilibrium'],
  ['Resiliencia Territorial', 'Territorial Resilience'],
  ['Plenitud Sintrópica', 'Syntropic Fullness'],
  ['Ley de Liebig', "Liebig's Law"],
  ['Castigo Liebig', 'Liebig Penalty'],
  ['penalización Liebig', 'Liebig penalty'],
  ['Costo de Inacción', 'Cost of Inaction'],
  ['Inversión Sintrópica', 'Syntropic Investment'],
  ['Comités APR', 'RWC Committees'],
  ['camiones aljibe', 'water trucks'],
  ['Camiones Aljibe', 'Water Trucks'],
  ['Reforma Legislativa', 'Legislative Reform'],
  ['Paper Práctico & Manual Comunal', 'Practical Paper & Municipal Manual'],
  ['min de lectura', 'min read'],
  ['Noviembre 2026', 'November 2026'],
  ['Agosto 2025', 'August 2025'],
  ['Investigador Principal', 'Principal Investigator'],
  ['Autor Principal', 'Lead Author'],
  ['Cuenca Río Longaví', 'Longaví River Basin'],
  ['Cuenca del Río Longaví', 'Longaví River Basin'],
  ['Valle de Aconcagua', 'Aconcagua Valley'],
  ['Países Bajos', 'Netherlands'],
  ['Dinamarca', 'Denmark'],
  ['Alemania', 'Germany'],
  ['España', 'Spain'],
  ['Chile Central', 'Central Chile'],
  ['Europa', 'Europe'],
  ['Figura ', 'Figure '],
  ['Sección ', 'Section '],
  ['Ecuación Fundamental ', 'Fundamental Equation '],
  ['Módulos', 'Modules'],
  ['Variables', 'Variables'],
  ['Población', 'Population'],
  ['Territorio', 'Territory'],
  ['Cuencas', 'Watersheds'],
  ['Cuenca', 'Watershed'],
  ['Descargar', 'Download'],
  ['Explorar', 'Explore'],
  ['Reiniciar', 'Reset'],
  ['Cerrar', 'Close'],
  ['Volver', 'Back'],
  ['Abrir', 'Open']
].sort((a, b) => b[0].length - a[0].length);

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA']);

const originalNodeText = new WeakMap();
const lastAppliedTranslation = new WeakMap();
const trackedTextNodes = new Set();

const originalElementAttrs = new WeakMap();
const trackedAttrElements = new Set();

function shouldSkipNode(node) {
  let curr = node.parentElement;
  while (curr) {
    if (SKIP_TAGS.has(curr.tagName)) return true;
    if (curr.classList && (curr.classList.contains('katex') || curr.classList.contains('no-translate'))) {
      return true;
    }
    curr = curr.parentElement;
  }
  return false;
}

export function translateStringToEnglish(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length < 2) return raw;

  // 1. Exact dictionary match
  if (EXACT_DICTIONARY[trimmed]) {
    return raw.replace(trimmed, EXACT_DICTIONARY[trimmed]);
  }

  // 2. Phrase replacements
  let result = raw;
  for (let i = 0; i < PHRASE_REPLACEMENTS.length; i++) {
    const [esPhrase, enPhrase] = PHRASE_REPLACEMENTS[i];
    if (result.includes(esPhrase)) {
      result = result.split(esPhrase).join(enPhrase);
    }
  }
  return result;
}

export function applyDomTranslation(lang) {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('root');
  if (!root) return;

  const isEn = lang && lang.startsWith('en');

  if (!isEn) {
    // Restore any tracked nodes that were translated by the DOM translator
    trackedTextNodes.forEach((textNode) => {
      if (originalNodeText.has(textNode) && textNode.nodeValue === lastAppliedTranslation.get(textNode)) {
        textNode.nodeValue = originalNodeText.get(textNode);
      }
    });
    trackedAttrElements.forEach((el) => {
      const saved = originalElementAttrs.get(el);
      if (saved) {
        if (saved.title && el.getAttribute('title') === saved.translatedTitle) {
          el.setAttribute('title', saved.title);
        }
        if (saved.placeholder && el.getAttribute('placeholder') === saved.translatedPlaceholder) {
          el.setAttribute('placeholder', saved.placeholder);
        }
      }
    });
    return;
  }

  // Walk all text nodes in #root
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  let node = walker.nextNode();
  while (node) {
    if (!shouldSkipNode(node)) {
      const currentVal = node.nodeValue;
      if (currentVal && currentVal.trim().length > 1) {
        // If currentVal is different from our last applied translation, update original baseline
        if (currentVal !== lastAppliedTranslation.get(node)) {
          originalNodeText.set(node, currentVal);
        }
        const sourceText = originalNodeText.get(node) || currentVal;
        const translated = translateStringToEnglish(sourceText);
        if (translated !== currentVal) {
          lastAppliedTranslation.set(node, translated);
          node.nodeValue = translated;
          trackedTextNodes.add(node);
        }
      }
    }
    node = walker.nextNode();
  }

  // Translate title & placeholder attributes
  const elementsWithAttrs = root.querySelectorAll('[title], [placeholder]');
  elementsWithAttrs.forEach((el) => {
    const saved = originalElementAttrs.get(el) || {};
    const title = el.getAttribute('title');
    if (title) {
      if (title !== saved.translatedTitle) {
        saved.title = title;
      }
      const trTitle = translateStringToEnglish(saved.title);
      if (trTitle !== title) {
        saved.translatedTitle = trTitle;
        el.setAttribute('title', trTitle);
        originalElementAttrs.set(el, saved);
        trackedAttrElements.add(el);
      }
    }
    const placeholder = el.getAttribute('placeholder');
    if (placeholder) {
      if (placeholder !== saved.translatedPlaceholder) {
        saved.placeholder = placeholder;
      }
      const trPlaceholder = translateStringToEnglish(saved.placeholder);
      if (trPlaceholder !== placeholder) {
        saved.translatedPlaceholder = trPlaceholder;
        el.setAttribute('placeholder', trPlaceholder);
        originalElementAttrs.set(el, saved);
        trackedAttrElements.add(el);
      }
    }
  });
}
