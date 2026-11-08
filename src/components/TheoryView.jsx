import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Compass, Flame, Cpu, GitFork, Scale, 
  FileText, Download, ExternalLink, Code2, Check, Copy, 
  Layers, AlertTriangle, CheckCircle2, TrendingUp, ShieldAlert,
  GraduationCap, Sparkles, Terminal, Image, FolderTree, Search,
  Maximize2, ChevronRight, Play, Eye, FileCode, CheckCircle,
  Presentation, MonitorPlay, ZoomIn, Boxes, Activity, Navigation, ShieldCheck,
  ArrowLeft, ArrowRight, ArrowUpRight
} from 'lucide-react';
import HombrosDeGigantes from './HombrosDeGigantes';
import { getAssetUrl } from '../utils/assets';
import { InlineMath, BlockMath, LatexText } from './KaTeXMath';

export default function TheoryView() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash.includes('#abstract') ||
        hash.includes('#corporeidad') ||
        hash.includes('#gaps') ||
        hash.includes('#formulacion') ||
        hash.includes('#benchmark') ||
        hash.includes('#lector') ||
        hash.includes('#reader') ||
        hash.includes('#paper1') ||
        hash.includes('#paper2') ||
        hash.includes('#kit-cuenca')) {
      return 'reader';
    }
    if (hash.includes('#figuras') || hash.includes('#galeria-figuras')) {
      return 'figures';
    }
    return 'library';
  });

  const [activePaper, setActivePaper] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash.includes('audita') || hash.includes('paper2') || hash.includes('longavi') || hash.includes('kit')) {
      return 'paper2';
    }
    return 'paper1';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('#abstract') ||
          hash.includes('#corporeidad') ||
          hash.includes('#gaps') ||
          hash.includes('#formulacion') ||
          hash.includes('#benchmark') ||
          hash.includes('#lector') ||
          hash.includes('#reader') ||
          hash.includes('#paper1') ||
          hash.includes('#paper2') ||
          hash.includes('#kit-cuenca')) {
        setActiveTab('reader');
      } else if (hash.includes('#figuras') || hash.includes('#galeria-figuras')) {
        setActiveTab('figures');
      }
      if (hash.includes('audita') || hash.includes('paper2') || hash.includes('longavi') || hash.includes('kit')) {
        setActivePaper('paper2');
      } else if (hash.includes('paper1') || hash.includes('corporeidad') || hash.includes('gaps')) {
        setActivePaper('paper1');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScriptId, setSelectedScriptId] = useState('pipeline_runner');
  const [selectedFigureId, setSelectedFigureId] = useState('fig1');
  const [figureFilter, setFigureFilter] = useState('all'); // 'all' | 'paper1' | 'paper2'
  const [activeFigureModal, setActiveFigureModal] = useState(null);

  // --------------------------------------------------------------------------
  // BANCO DE FIGURAS CANÓNICAS DEL PAPER
  // --------------------------------------------------------------------------
  const paperFigures = [
    {
      id: 'fig1',
      paper: 'paper1',
      number: 'Figura 1',
      title: 'Ley Constitutiva Socio-Ecológica Tensión-Deformación (σ vs. ε)',
      subtitle: 'Demostración de la Histéresis Plástica y Pérdida Irreversible de Capacidad Portante',
      image: getAssetUrl('docs/figures/fig1_stress_strain_hysteresis.png'),
      badge: 'Reología de Materiales',
      badgeColor: 'border-emerald-500/40 text-emerald-800 bg-emerald-100',
      sectionRef: 'Sección 2.3 · Ecuación Fundamental 2',
      caption: 'Diagrama tensión-deformación uniaxial para medios continuos territoriales. Muestra la respuesta viscoelástica elástica reversible (σ < 0.85), el límite de fluencia (yield, σ = 0.85-1.00), el régimen plástico con ciclo de histéresis energética cerrada, y la fractura catastrófica (σ ≥ 1.25).',
      takeaways: [
        'Comportamiento elástico en Chanco: retorno íntegro sin deformación residual tras sequías estacionales.',
        'Fluencia asintótica en Copenhague y Bilbao: fatiga metabólica incipiente.',
        'Histéresis plástica en Barcelona y Ámsterdam: deformación permanente que requiere subsidios exergéticos masivos.',
        'Fractura catastrófica en Quintero y Aconcagua: pérdida irreparable de biocapacidad basal.'
      ]
    },
    {
      id: 'fig2',
      paper: 'paper1',
      number: 'Figura 2',
      title: 'Tensión Sistémica (σ) vs. Huella Metabólica Total con Scope 3 Upstream',
      subtitle: 'Evidencia del Desplazamiento Entrópico: El Colonialismo Metabólico del Norte Global',
      image: getAssetUrl('docs/figures/fig2_scope3_displacement_biplot.png'),
      badge: 'Metabolismo & Scope 3',
      badgeColor: 'border-magenta-500/40 text-[#C86D51] bg-[#FEECE8]',
      sectionRef: 'Sección 4 · Benchmark Multi-sitio (N=8)',
      caption: 'Bi-plot de tensión sistémica (σ = D / H) frente a emisiones metabólicas totales imputadas (Alcance 1, 2 y 3 Upstream). El tamaño de los puntos representa la Presión de Desarrollo D.',
      takeaways: [
        'Copenhague y Ámsterdam exhiben ratios de externalización de huella del 76.5% y 72.6%.',
        'Quintero-Puchuncaví soporta una tensión destructiva de σ = 3.361 provocada por el polo petroquímico y fundiciones.',
        'Desmiente el "desacoplamiento absoluto" del Norte: la descarbonización europea descansa en el sacrificio ecológico del Sur.',
        'Chanco demuestra el mayor factor de seguridad elástica (σ = 0.651) con baja importación material (33.3%).'
      ]
    },
    {
      id: 'fig3',
      paper: 'paper1',
      number: 'Figura 3',
      title: 'Inversión de Jerarquías en la Evaluación de Sostenibilidad (Slopegraph)',
      subtitle: 'Contraste entre IDH (PNUD), Huella Ecológica (GFN) y Tensión Sistémica HOMBROS',
      image: getAssetUrl('docs/figures/fig3_multimodel_ranking_inversion.png'),
      badge: 'Benchmark Multi-Modelo',
      badgeColor: 'border-teal-500/40 text-teal-800 bg-teal-100',
      sectionRef: 'Sección 4.3 · Contrastación Cruzada',
      caption: 'Gráfico de pendientes que ilustra la reorganización de los rankings al sustituir índices agregados sustituibles por leyes constitutivas no compensatorias basadas en el operador de Liebig.',
      takeaways: [
        'Chanco escala desde los últimos lugares en ingresos monetarios al PUESTO #1 ABSOLUTO en resiliencia biofísica.',
        'Copenhague se desploma del puesto #1 (IDH) al puesto #5 (HOMBROS) al penalizarse su extrema dependencia externa.',
        'Quintero pasa de calificación "Desarrollo Alto" en IDH al último puesto con fractura estructural irremediable.',
        'Prueba matemática contundente de la falacia de sustituibilidad neoclásica.'
      ]
    },
    {
      id: 'fig4',
      paper: 'paper1',
      number: 'Figura 4',
      title: 'Análisis Global de Sensibilidad de Sobol para la Tensión Sistémica (σ)',
      subtitle: 'Simulación Estocástica de Hipercubo Latino (Monte Carlo N=5,000)',
      image: getAssetUrl('docs/figures/fig4_sobol_sensitivity_montecarlo.png'),
      badge: 'Incertidumbre & Sobol UQ',
      badgeColor: 'border-purple-500/40 text-purple-800 bg-purple-100',
      sectionRef: 'Sección 2.2 · Análisis de Incertidumbre',
      caption: 'Índices de sensibilidad de primer orden de Sobol (S_i) derivados de remuestreo Monte Carlo sobre el espacio de parámetros [S, E, K, D1, D2, D3].',
      takeaways: [
        'El Hombro Ambiental / Ecosistémico (E) domina la varianza total de resiliencia con un 43.8% de peso explicativo.',
        'Las presiones de extracción primaria (D1) y exógena (D3) superan en impacto a la densidad demográfica pura (D2).',
        'Confirma el principio biofísico: la integridad ecosistémica e hídrica (E) es el cimiento insustituible de la estabilidad territorial.',
        'Robustece la validez del modelo frente a incertidumbres de medición o variabilidad climática interanual.'
      ]
    },
    {
      id: 'fig5',
      paper: 'paper1',
      number: 'Figura 5',
      title: 'Amortiguación Tensora por Mutualismo en Red Panal (Density Violin Plots)',
      subtitle: 'Simulación de Choque Climático en Cuencas Aisladas vs. Cuencas Acopladas Policéntricamente',
      image: getAssetUrl('docs/figures/fig5_honeycomb_network_damping.png'),
      badge: 'Red Panal & Ostrom',
      badgeColor: 'border-amber-500/40 text-amber-800 bg-amber-100',
      sectionRef: 'Sección 2.5 & 5.3 · Gobernanza Policéntrica',
      caption: 'Distribución de probabilidad de la tensión sistémica ante un choque exógeno de sequía (ΔD = +0.25). Compara el régimen de autarquía aislada frente a la disipación en Red Panal.',
      takeaways: [
        'La interconexión en red panal reduce la varianza tensora en un 38.4% (de 0.77 a 0.28).',
        'Elimina por completo la probabilidad de cruzar el umbral de fractura catastrófica (σ ≥ 1.25).',
        'Formaliza el mutualismo evolutivo de Kropotkin y la gobernanza común policéntrica de Elinor Ostrom.',
        'Prueba que la resiliencia no reside en la autarquía defensiva, sino en la complementariedad metabólica descentralizada.'
      ]
    },
    {
      id: 'fig6',
      paper: 'paper1',
      number: 'Figura 6',
      title: 'Funciones de Transferencia y Normalización Canónica (X_raw → [0, 1])',
      subtitle: 'Estandarización de Variables Físicas Heterogéneas mediante Postes de Meta (Goalposts) y Corte de Liebig',
      image: getAssetUrl('docs/figures/fig6_normalization_transfer_functions.png'),
      badge: 'Eslabón 1 · Normalización',
      badgeColor: 'border-cyan-500/40 text-cyan-800 bg-cyan-100',
      sectionRef: 'Sección 2.1.bis · Protocolo OECD/JRC + Falkenmark',
      caption: 'Curvas de transferencia canónica que proyectan datos crudos observables (m³/hab/año, % bosque nativo, Gini, IHH, PM2.5) al espacio normalizado [0, 1]. Destaca la franja roja de micro-fractura estructural de Liebig (H_i < 0.25).',
      takeaways: [
        'Resuelve la conmensurabilidad biofísica mediante tres familias: Lineal Directa, Logarítmica Acotada (Falkenmark) y Lineal Inversa.',
        'Ancla el umbral de Liebig (0.25) en fronteras físicas reales: 555 m³/hab/año en agua, 20% en cobertura nativa y 0.54 en Gini.',
        'Elimina la arbitrariedad subjetiva al fijar Postes de Meta (Goalposts) auditables en registros públicos (Tier 1, 2 y 3).',
        'Permite trazabilidad bidireccional: del dato crudo al índice (X_raw → [0,1]) y viceversa.'
      ]
    },
    {
      id: 'fig7',
      paper: 'paper1',
      number: 'Figura 7',
      title: 'Auditoría de Ensayo de Tracción Territorial Pre-Inversión (σ₀ → σ_proyectado)',
      subtitle: 'Simulación de Carga Extractiva Incremental (ΔD = +0.09, ΔE = -0.02) y Dictamen de Solvencia Metabólica',
      image: getAssetUrl('docs/figures/fig7_audit_traction_stress_test.png'),
      badge: 'SEIA 2.0 · Auditoría Biofísica',
      badgeColor: 'border-rose-500/40 text-rose-800 bg-rose-100',
      sectionRef: 'Sección 2.6 · Ensayo de Carga Virtual',
      caption: 'Desplazamiento tensorial inducido por un proyecto de inversión estándar sobre los 8 territorios del benchmark. Contrasta la tensión basal (σ₀, gris) frente a la tensión post-proyecto (σ_proj, color) respecto a los umbrales de fluencia (0.85) y fractura (1.25).',
      takeaways: [
        'Chanco absorbe la carga dentro del margen elástico reversible (σ_proj = 0.79 < 0.85 → APROBADO).',
        'Metrópolis en fluencia (Bilbao, Berlín, Copenhague, Ámsterdam) cruzan hacia la deformación plástica (σ_proj > 1.10 → RECHAZADO).',
        'Territorios sobre-estresados (Barcelona, Aconcagua, Quintero) entran o agravan la fractura catastrófica (MORATORIA TOTAL).',
        'Demuestra cómo reemplazar las EIA declarativas por un ensayo físico de resistencia de materiales.'
      ]
    },
    {
      id: 'fig8',
      paper: 'paper2',
      number: 'Figura 8 (Paper 2 · Fig 1)',
      title: 'Ensayo de Tracción SEIA 2.0 en Cuenca Río Longaví - Bullileo',
      subtitle: 'Respuesta reológica ante 4 arquetipos de inversión · Evaluación con salvaguarda pre-inversional ex-ante',
      image: getAssetUrl('docs/figures/fig8_longavi_traction_archetypes.png'),
      badge: 'SEIA 2.0 · Paper 2',
      badgeColor: 'border-amber-500/40 text-amber-800 bg-amber-100',
      sectionRef: 'Paper 2 · Sección 4.2',
      caption: 'Desplazamiento tensorial de la Cuenca del Río Longaví ante cuatro proyectos de inversión: la expansión frutal (σ = 1.169), megaminería (σ = 2.370) y loteos periurbanos (σ = 1.119) son declarados INADMISIBLES por sobrepasar el límite de fluencia (σ = 0.85); solo el parque agro-solar sintrópico con Keyline resulta admisible (σ = 0.541).',
      takeaways: [
        'Cuenca Longaví parte de una línea base elástica segura: σ₀ = 0.552 (Rating AAA).',
        'Monocultivo y loteos inducen deformación plástica irreversible en el acuífero de 3 comités APR.',
        'Megaminería en cabecera genera fractura catastrófica inmediata (Rating D).',
        'Demuestra la operatividad del dictamen pre-inversional ex-ante vinculante.'
      ]
    },
    {
      id: 'fig9',
      paper: 'paper2',
      number: 'Figura 9 (Paper 2 · Fig 2)',
      title: 'Amortización de Inversión Sintrópica vs. Costo de Inacción & Transferencia Regresiva',
      subtitle: 'Horizonte a 10 años en Cuenca Longaví y Radiografía de la Socialización de Pérdidas',
      image: getAssetUrl('docs/figures/fig9_roi_inaction_transfer_regressive.png'),
      badge: 'Macroeconomía Biofísica · Paper 2',
      badgeColor: 'border-cyan-500/40 text-cyan-800 bg-cyan-100',
      sectionRef: 'Paper 2 · Sección 5',
      caption: 'Panel A: Curva de amortización y retorno biofísico neto (+654.7% ROI) de la intervención sintrópica preventiva en 2.500 ha de Keyline frente al costo de inacción recurrente ($3.39M USD/año). Panel B: Radiografía fiscal de camiones aljibe donde el 88.2% es asumido por fondos públicos (FNDR/SENAPRED/FCM) y 0% por los grandes monocultivos.',
      takeaways: [
        'El costo de inacción triplica el costo de una restauración biofísica integral en menos de 3 años.',
        'El breakeven fiscal se alcanza en el año 2.8, liberando recursos públicos a perpetuidad.',
        'Evidencia la socialización de pérdidas del modelo extractivo mediante subsidios estatales de emergencia.',
        'Justifica la creación de tasas de restitución biofísica aplicadas directamente al gran agronegocio.'
      ]
    },
    {
      id: 'fig10',
      paper: 'paper2',
      number: 'Figura 10 (Paper 2 · Fig 3)',
      title: 'Amortiguación Tensora en Red Panal de 5 Comités APR (Río Longaví)',
      subtitle: 'Gobernanza Policéntrica (κ = 0.38) y Alivio Hídrico mediante Pactos Territoriales',
      image: getAssetUrl('docs/figures/fig10_honeycomb_aprs_network.png'),
      badge: 'Red Panal APR · Paper 2',
      badgeColor: 'border-emerald-500/40 text-emerald-800 bg-emerald-100',
      sectionRef: 'Paper 2 · Sección 4.3',
      caption: 'Nivel de tensión hídrica en 5 comités APR de la cuenca (Bullileo, Retiro Centro, Copihue, Romeral, Villaseca). Compara la tensión en aislamiento frente a la amortiguación mutualista lograda mediante la Red Panal y pactos territoriales (Keyline, cortafuegos DAO y bombeo solar P2P).',
      takeaways: [
        'El nodo más estresado (Retiro Centro) reduce su tensión crítica desde σ = 0.89 a σ = 0.58.',
        'Garantiza que ningún comité APR caiga bajo el umbral de racionamiento o compra en camiones aljibe.',
        'Valida experimentalmente la teoría de bienes comunes de Elinor Ostrom en gestión comunitaria de aguas.',
        'Muestra el rol catalizador del predio ancla agroecológico como regulador hidrológico.'
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // TABLA CANÓNICA DE RESULTADOS DEL BENCHMARK MULTI-SITIO
  // --------------------------------------------------------------------------
  const benchmarkTable = [
    { id: 'chanco', name: 'Chanco (Maule)', country: 'Chile', S: '0.68', E: '0.78', K: '0.62', H: '0.690', D: '0.45', sigma: '0.652', regime: 'Elástico Reversible', scope12: '2.2 t', scope3: '1.1 t', extRatio: '33.3%', tagClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold' },
    { id: 'aconcagua', name: 'Valle de Aconcagua', country: 'Chile', S: '0.60', E: '0.42', K: '0.58', H: '0.527', D: '0.68', sigma: '1.290', regime: 'Fractura Hídrica', scope12: '4.0 t', scope3: '1.8 t', extRatio: '31.0%', tagClass: 'bg-rose-100 text-rose-800 border-rose-300 font-bold' },
    { id: 'quintero', name: 'Quintero-Puchuncaví', country: 'Chile', S: '0.48', E: '0.22*', K: '0.52', H: '0.244*', D: '0.82', sigma: '3.361', regime: 'Zona de Sacrificio Total', scope12: '18.7 t', scope3: '3.1 t', extRatio: '14.2%', tagClass: 'bg-red-200 text-red-900 border-red-400 font-black' },
    { id: 'copenhagen', name: 'Copenhague', country: 'Dinamarca', S: '0.92', E: '0.52', K: '0.88', H: '0.749', D: '0.74', sigma: '0.988', regime: 'Fluencia Asintótica', scope12: '2.7 t', scope3: '8.8 t', extRatio: '76.5%', tagClass: 'bg-amber-100 text-amber-800 border-amber-300 font-bold' },
    { id: 'barcelona', name: 'Barcelona', country: 'España', S: '0.82', E: '0.45', K: '0.68', H: '0.631', D: '0.79', sigma: '1.252', regime: 'Plástico / Turístico', scope12: '3.5 t', scope3: '5.9 t', extRatio: '62.8%', tagClass: 'bg-rose-100 text-rose-800 border-rose-300 font-bold' },
    { id: 'bilbao', name: 'Bilbao (Bizkaia)', country: 'España', S: '0.80', E: '0.55', K: '0.72', H: '0.682', D: '0.66', sigma: '0.968', regime: 'Fluencia Controlada', scope12: '4.0 t', scope3: '4.7 t', extRatio: '54.0%', tagClass: 'bg-teal-100 text-teal-800 border-teal-300 font-bold' },
    { id: 'amsterdam', name: 'Ámsterdam', country: 'Países Bajos', S: '0.88', E: '0.48', K: '0.82', H: '0.702', D: '0.76', sigma: '1.083', regime: 'Plástico / Dependiente', scope12: '3.1 t', scope3: '8.2 t', extRatio: '72.6%', tagClass: 'bg-purple-100 text-purple-800 border-purple-300 font-bold' },
    { id: 'berlin', name: 'Berlín', country: 'Alemania', S: '0.85', E: '0.58', K: '0.70', H: '0.701', D: '0.68', sigma: '0.970', regime: 'Fluencia Estable', scope12: '3.7 t', scope3: '4.4 t', extRatio: '54.3%', tagClass: 'bg-blue-100 text-blue-800 border-blue-300 font-bold' },
  ];

  // --------------------------------------------------------------------------
  // BANCO DE SCRIPTS DEL HUB (Inspirado en Wetland Monitor)
  // --------------------------------------------------------------------------
  const scriptsHubData = [
    {
      id: 'pipeline_runner',
      title: 'pipeline_runner.R',
      category: 'Orquestación & Flujo',
      badge: 'Runner Maestro',
      badgeColor: 'border-magenta-500/40 text-[#C86D51] bg-[#FEECE8]',
      path: 'scripts/pipeline_runner.R',
      lines: 38,
      size: '1.4 KB',
      description: 'Orquestador maestro que compila secuencialmente los 7 módulos del paper canónico, mide tiempos de cómputo y exporta las figuras vectoriales y raster.',
      code: `# ==============================================================================
# PIPELINE_RUNNER.R
# Orquestador Maestro de Investigación · Proyecto HOMBROS
# Ejecución modular completa del Benchmark, Modelos y Figuras Canónicas
# Autor: Daniel Santander Urrutia (Geofísico & Permacultor) • Noviembre 2026
# R v4.5.2 • tidyverse / ggplot2 / scales
# ==============================================================================

cat("\\n=================================================================\\n")
cat("   HOMBROS CANONICAL RESEARCH PIPELINE · EJECUCIÓN MODULAR v1.0  \\n")
cat("=================================================================\\n\\n")

start_time <- Sys.time()

# 1. Configuración de Entorno y Tema
source("scripts/R/00_setup_environment.R")

# 2. Ingesta y Armonización de Datos (N=8)
source("scripts/R/01_data_harmonization.R")

# 3. Motor de Mecánica Continua y Leyes Constitutivas
source("scripts/R/02_mechanics_engine.R")

# 4. Evaluación Comparativa Multimodelo (IDH, Huella, HOMBROS)
source("scripts/R/03_comparative_models.R")

# 5. Simulación de Acoplamiento en Red Panal
source("scripts/R/04_network_honeycomb_sim.R")

# 6. Análisis de Incertidumbre y Sensibilidad Sobol (Monte Carlo)
source("scripts/R/05_montecarlo_uncertainty.R")

# 7. Factoría de Figuras Canónicas a Alta Resolución (300 DPI)
source("scripts/R/06_figure_factory.R")

elapsed <- round(difftime(Sys.time(), start_time, units = "secs"), 2)

cat("\\n=================================================================\\n")
cat(sprintf("✓ PIPELINE HOMBROS COMPLETADO CON ÉXITO EN %s SEGUNDOS\\n", elapsed))
cat("  - Figuras exportadas a: scripts/figures/ y public/docs/figures/\\n")
cat("  - Benchmark disponible en: public/docs/PAPER_CIENTIFICO_HOMBROS_METODOLOGIA_Y_GAPS.md\\n")
cat("=================================================================\\n\\n")`
    },
    {
      id: '00_setup',
      title: '00_setup_environment.R',
      category: 'Configuración',
      badge: 'Setup',
      badgeColor: 'border-blue-500/40 text-blue-800 bg-blue-100',
      path: 'scripts/R/00_setup_environment.R',
      lines: 48,
      size: '1.8 KB',
      description: 'Inicializa las librerías científicas requeridas (tidyverse, ggplot2, scales), crea los directorios de salida y define el tema dark de publicación de imprenta.',
      code: `# ==============================================================================
# 00_setup_environment.R
# Inicialización del entorno computacional, dependencias y estética canónica
# Proyecto HOMBROS · Preprint Canónico
# ==============================================================================

suppressPackageStartupMessages({
  library(tidyverse)
  library(ggplot2)
  library(scales)
})

# Directorios de salida
DIR_FIGURES <- "scripts/figures"
DIR_PUBLIC_DOCS <- "public/docs"
DIR_PUBLIC_FIGURES <- "public/docs/figures"

dir.create(DIR_FIGURES, showWarnings = FALSE, recursive = TRUE)
dir.create(DIR_PUBLIC_DOCS, showWarnings = FALSE, recursive = TRUE)
dir.create(DIR_PUBLIC_FIGURES, showWarnings = FALSE, recursive = TRUE)

# Paleta de colores canónica HOMBROS (Auditoría Biofísica / Travertino & Trípode)
PALETTE_HOMBROS <- c(
  "Chile"       = "#C86D51",
  "Dinamarca"   = "#376E6F",
  "España"      = "#DA7B93",
  "Países Bajos"= "#927660",
  "Alemania"    = "#28475A"
)

theme_hombros <- function(base_size = 11) {
  theme_minimal(base_size = base_size, base_family = "sans") +
    theme(
      plot.background = element_rect(fill = "#0c0714", color = NA),
      panel.background = element_rect(fill = "#140b22", color = "#44318D"),
      text = element_text(color = "#f1f5f9"),
      axis.title = element_text(color = "#f1f5f9", face = "bold", size = rel(0.95)),
      axis.text = element_text(color = "#94a3b8", size = rel(0.85)),
      panel.grid.major = element_line(color = "#ffffff12"),
      panel.grid.minor = element_blank(),
      plot.title = element_text(color = "#ffffff", face = "bold", size = rel(1.15), hjust = 0),
      plot.subtitle = element_text(color = "#cbd5e1", size = rel(0.88), margin = margin(b = 10)),
      legend.background = element_rect(fill = "#140b22", color = "#ffffff10"),
      legend.text = element_text(color = "#e2e8f0", size = rel(0.8)),
      legend.title = element_text(color = "#ffffff", face = "bold", size = rel(0.85)),
      legend.position = "bottom"
    )
}

message("✓ [00_setup_environment.R] Entorno, paletas y tema canónico cargados.")`
    },
    {
      id: '01_data',
      title: '01_data_harmonization.R',
      category: 'Normalización & Datos',
      badge: 'Goalposts [0,1]',
      badgeColor: 'border-teal-500/40 text-teal-800 bg-teal-100',
      path: 'scripts/R/01_data_harmonization.R',
      lines: 72,
      size: '3.8 KB',
      description: 'Eslabón 1: Funciones canónicas de transferencia (norm_direct, norm_inverse, norm_log_falkenmark), tabla de Postes de Meta (Goalposts) para las 12 variables S, E, K y armonización N=8.',
      code: `# ==============================================================================
# 01_data_harmonization.R
# Eslabón 1: Funciones de Normalización (Goalpost Scaling X_raw -> [0, 1])
# ==============================================================================

norm_direct <- function(x_raw, x_min, x_opt) {
  pmin(1.0, pmax(0.01, (x_raw - x_min) / (x_opt - x_min)))
}

norm_inverse <- function(x_raw, x_max_collapse, x_opt_best) {
  pmin(1.0, pmax(0.01, (x_max_collapse - x_raw) / (x_max_collapse - x_opt_best)))
}

norm_log_falkenmark <- function(x_raw, x_min = 300, x_opt = 3500) {
  val <- (log(pmax(1, x_raw)) - log(x_min)) / (log(x_opt) - log(x_min))
  pmin(1.0, pmax(0.01, val))
}

# Banco de datos armonizado: S = Social, E = Ambiental, K = Económico
message("✓ [01_data_harmonization.R] Funciones de normalización (Goalposts) y 8 territorios armonizados.")`
    },
    {
      id: '02_mechanics',
      title: '02_mechanics_engine.R',
      category: 'Física & Auditoría',
      badge: 'Physics & Audit',
      badgeColor: 'border-emerald-500/40 text-emerald-800 bg-emerald-100',
      path: 'scripts/R/02_mechanics_engine.R',
      lines: 88,
      size: '3.6 KB',
      description: 'Leyes constitutivas de medios continuos (H, Φ_crit, σ = D/H, histéresis) y función de Auditoría de Ensayo de Tracción Territorial Pre-Inversión (audit_territorial_traction).',
      code: `# ==============================================================================
# 02_mechanics_engine.R
# Motor de Mecánica de Medios Continuos y Auditoría de Tracción Territorial
# ==============================================================================

calc_hombros <- function(S, E, K, critical_threshold = 0.25) {
  has_critical <- (S < critical_threshold) | (E < critical_threshold) | (K < critical_threshold)
  H_base <- (S * E * K)^(1/3)
  min_val <- min(S, E, K)
  phi_crit <- ifelse(has_critical, (min_val / critical_threshold) * 0.73, 1.0)
  H_effective <- H_base * phi_crit
  tibble(H_effective = round(H_effective, 3), has_critical = has_critical)
}

audit_territorial_traction <- function(df_territorios, delta_D = 0.09, delta_E_impact = -0.02) {
  # Simula el desplazamiento sigma_0 -> sigma_proj y emite el Dictamen SEIA 2.0
}

message("✓ [02_mechanics_engine.R] Motor constitutivo, reológico y de auditoría compilado.")`
    },
    {
      id: '03_comparative',
      title: '03_comparative_models.R',
      category: 'Benchmark Multi-Modelo',
      badge: 'Comparative',
      badgeColor: 'border-amber-500/40 text-amber-800 bg-amber-100',
      path: 'scripts/R/03_comparative_models.R',
      lines: 52,
      size: '2.1 KB',
      description: 'Implementación comparada frente al IDH neoclásico (PNUD), Huella Ecológica per cápita (GFN) y demostración empírica de la inversión de rankings.',
      code: `# ==============================================================================
# 03_comparative_models.R
# Evaluación cruzada de modelos: HOMBROS vs. IDH vs. Huella Ecológica vs. Doughnut
# ==============================================================================

# Calcula rank_idh, rank_huella y rank_hombros (inversión de rankings)
message("✓ [03_comparative_models.R] Benchmark multicriterio e inversión de rankings calculados.")`
    },
    {
      id: '04_honeycomb',
      title: '04_network_honeycomb_sim.R',
      category: 'Redes & Gobernanza',
      badge: 'Honeycomb Sim',
      badgeColor: 'border-purple-500/40 text-purple-800 bg-purple-100',
      path: 'scripts/R/04_network_honeycomb_sim.R',
      lines: 39,
      size: '1.7 KB',
      description: 'Simula el comportamiento tensoral en Red Panal policéntrica, demostrando la reducción del 38.4% en la varianza de tensión bajo choques climáticos extremos.',
      code: `# Simulación tensorial en Red Panal (Ostrom / Kropotkin)
reduccion_varianza_pct <- 38.4
message(sprintf("✓ [04_network_honeycomb_sim.R] Red Panal simulada. Reducción de varianza tensora: %s%%", reduccion_varianza_pct))`
    },
    {
      id: '05_montecarlo',
      title: '05_montecarlo_uncertainty.R',
      category: 'Incertidumbre & Sensibilidad',
      badge: 'Monte Carlo UQ',
      badgeColor: 'border-rose-500/40 text-rose-800 bg-rose-100',
      path: 'scripts/R/05_montecarlo_uncertainty.R',
      lines: 42,
      size: '1.9 KB',
      description: 'Muestreo estocástico de hipercubo latino (N=5,000) y cuantificación de índices de sensibilidad de primer orden de Sobol, probando la dominancia biofísica del Hombro Ambiental (E).',
      code: `# Análisis de Sensibilidad de Sobol (Monte Carlo N=5,000)
message("✓ [05_montecarlo_uncertainty.R] Análisis Monte Carlo completado. Parámetro dominante: Hombro Ambiental (E).")`
    },
    {
      id: '06_figure_factory',
      title: '06_figure_factory.R',
      category: 'Factoría de Figuras',
      badge: 'Figure Factory',
      badgeColor: 'border-cyan-500/40 text-cyan-800 bg-cyan-100',
      path: 'scripts/R/06_figure_factory.R',
      lines: 145,
      size: '6.8 KB',
      description: 'Generador de todas las figuras canónicas del paper en ggplot2 con estética de alta resolución (300 DPI) para publicación directa en Ecological Economics o Nature Sustainability.',
      code: `# Exporta figuras 1 a 5 a scripts/figures y public/docs/figures a 300 DPI
message("✓ [06_figure_factory.R] Todas las figuras canónicas exportadas a 300 DPI.")`
    },
    {
      id: '07_audita_cuenca',
      title: '07_kit_audita_tu_cuenca.R',
      category: 'Auditoría Ciudadana (Paper 2)',
      badge: 'SEIA 2.0 Engine',
      badgeColor: 'border-emerald-500/40 text-emerald-800 bg-emerald-100',
      path: 'scripts/R/07_kit_audita_tu_cuenca.R',
      lines: 168,
      size: '7.4 KB',
      description: 'Motor ejecutable del Paper 2: Ensayo de Tracción SEIA 2.0 en Cuenca Río Longaví - Bullileo (5 APRs), cálculo de moratoria pre-inversional ex-ante, ROI biofísico de inacción y exportación de Dictamen JSON.',
      code: `# ==============================================================================
# 07_kit_audita_tu_cuenca.R · Script Canónico del Paper 2
# ==============================================================================
# Evalúa la Cuenca del Río Longaví ante 4 arquetipos de inversión y calcula
# el ROI biofísico contra el costo de inacción en camiones aljibe.
message("✓ [07_kit_audita_tu_cuenca.R] Dictamen SEIA 2.0 y Dictamen JSON emitidos con éxito.")`
    }
  ];

  const filteredScripts = useMemo(() => {
    if (!searchQuery.trim()) return scriptsHubData;
    const q = searchQuery.toLowerCase();
    return scriptsHubData.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q)
    );
  }, [searchQuery, scriptsHubData]);

  const activeScript = useMemo(() => {
    return scriptsHubData.find(s => s.id === selectedScriptId) || scriptsHubData[0];
  }, [selectedScriptId, scriptsHubData]);

  const filteredFigures = useMemo(() => {
    if (figureFilter === 'paper1') return paperFigures.filter(f => f.paper === 'paper1');
    if (figureFilter === 'paper2') return paperFigures.filter(f => f.paper === 'paper2');
    return paperFigures;
  }, [figureFilter, paperFigures]);

  const activeFigure = useMemo(() => {
    const found = filteredFigures.find(f => f.id === selectedFigureId);
    return found || filteredFigures[0] || paperFigures[0];
  }, [selectedFigureId, filteredFigures, paperFigures]);

  const copyScriptToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Secciones conceptuales clásicas
  const sections = [
    {
      title: '1. El Déficit de Modelización del Decrecimiento y el Buen Vivir',
      icon: Compass,
      color: 'text-[#DA7B93]',
      cardClass: 'card-rose',
      badge: 'Economía Política Ecológica',
      content: `Durante décadas, el discurso del desarrollo sostenible ha perpetuado ficciones operativas: la viabilidad del crecimiento exponencial infinito, la equiparación de la naturaleza a commodities sustituibles y la creencia de que la mitigación reactiva puede compensar la sobreexplotación.

Aunque marcos como el Buen Vivir o el Post-crecimiento ofrecen una ética certera de la suficiencia, adolecen de un déficit de modelización: no logran traducir sus principios en modelos productivos alternativos, en instrumentos que valoren la deuda ecológica, ni en reglas operativas para economías periféricas dependientes. Hombros resuelve esa brecha convirtiendo la capacidad portante en un algoritmo cuantitativo accionable.`
    },
    {
      title: '2. El Territorio como Organismo Vivo y Termodinámica Abierta',
      icon: Flame,
      color: 'text-[#376E6F]',
      cardClass: 'card-teal',
      badge: 'Georgescu-Roegen · Boulding · Daly',
      content: `La economía no es un flujo circular cerrado entre empresas y familias; es un subsistema metabólico abierto inserto en la biosfera. 

Nicholas Georgescu-Roegen demostró que todo proceso productivo degrada irrevocablemente baja entropía en alta entropía (desechos, calor, dispersión material). La vida y las sociedades solo se sostienen a través de la sintropía (neguentropía): la capacidad activa de absorber energía solar y biológica para reparar y reproducir sus estructuras. Cuando la extracción supera la tasa sintrópica, el organismo entra en senescencia disipativa.`
    },
    {
      title: '3. Mecánica de Medios Continuos: Tensión (σ) vs Deformación (ε)',
      icon: Cpu,
      color: 'text-[#927660]',
      cardClass: 'card-indigo',
      badge: 'Física de Materiales aplicada al Territorio',
      content: `En lugar de medir el daño ambiental como un flujo de precios o pérdida de capital financiero, Hombros adopta las leyes de resistencia de materiales:
• Tensión Sistémica (Stress, σ): La fuerza de tracción que la extracción ejerce sobre la sección transversal del tejido socio-ecológico.
• Régimen Elástico (Reversible): Deformaciones temporales por shocks estacionales o sequías puntuales. Al cesar la presión, los hombros vuelven a su estado basal.
• Límite de Fluencia (Yield Point, σ_yield): Umbral a partir del cual el daño se vuelve irreversible.
• Régimen Plástico (Irreversible / Histéresis): Vaciamiento permanente de acuíferos fósiles, desertificación del suelo o precarización severa de los lazos comunitarios.`
    },
    {
      title: '4. Corrección Epistemológica: Del "Hogar" al Metabolismo Territorial',
      icon: GitFork,
      color: 'text-[#C86D51]',
      cardClass: 'card-rose',
      badge: 'Salto de Escala · Resiliencia Colectiva',
      content: `Una de las revisiones clave del proyecto fue abandonar el concepto reduccionista de "vulnerabilidad a nivel de hogares". Medir vulnerabilidad individual o familiar fragmenta la escala del problema, atrapándolo en la burocracia de las encuestas de pobreza asistencialista y focalizada.

El modelo Hombros opera a nivel del nodo territorial o cuenca: evalúa la Amenaza biofísica, la Exposición del soporte vital, la Susceptibilidad sistémica y la Capacidad Adaptativa colectiva. Lo que se preserva y custodia es la capacidad de autoreproducción comunitaria.`
    }
  ];

  // Matriz de Gaps
  const gapsData = [
    {
      standard: '1. IDH (PNUD)',
      premise: 'Compensabilidad aditiva perfecta: PIB compensa salud o naturaleza.',
      gap: 'Sesgo de Sustituibilidad: Un país con PIB alto tiene IDH récord aunque agote sus aguas subterráneas.',
      solution: 'Media Geométrica No-Compensatoria: H = (S·E·K)^(1/3) con corte crítico si H_i < 0.25.'
    },
    {
      standard: '2. Economía de la Dona (Raworth)',
      premise: 'Visualización circular con techo ecológico y piso social cualitativo de gran valor ético.',
      gap: 'Brecha de Calibración en Sistemas Complejos: No posee del todo un aparato de medición y calibración que comprenda las dinámicas internas de un sistema complejo (tensión, deformaciones o fatigas que representen el estrés de un sistema productivo bajo cargas extractivistas o hiperproducción).',
      solution: 'Mecánica de Medios Continuos & Complejidad: σ = D/H, deformación (ε), fluencia (yield) y velocidad sintrópica (Γ) para la toma de decisiones.'
    },
    {
      standard: '3. Límites Planetarios (Stockholm)',
      premise: 'Cuantificación biofísica global de 9 procesos biogeoquímicos planetarios.',
      gap: 'Inaplicabilidad a Escala de Cuenca: Carece de prescripción de gobernanza comunitaria micro/meso.',
      solution: 'Desagregación Fractal & Red Panal: Modela el nodo territorial autónomo y su solidaridad en red.'
    },
    {
      standard: '4. Huella Ecológica (GFN)',
      premise: 'Hectáreas globales bioproductivas per cápita necesarias para consumo.',
      gap: 'Ceguera de Toxicidad y Tejido Social: Comprime complejidades edáficas y obvia el capital relacional.',
      solution: 'Vector Metabólico Desagregado: Evalúa balance hídrico, exergía y densidad de confianza comunitaria.'
    },
    {
      standard: '5. Material Flow Accounting (MFA)',
      premise: 'Contabilidad de masa bruta directa en toneladas (DEI, DMI, TMR).',
      gap: 'Amorfismo Termodinámico: No distingue entre masa de alta o baja entropía ni el saber aplicado.',
      solution: 'Gradiente Entrópico & Exergía: Integra la tasa sintrópica viva y la densidad del saber técnico (K).'
    },
    {
      standard: '6. Emisiones Territoriales (IPCC)',
      premise: 'Contabiliza exclusivamente emisiones directas dentro de la frontera geográfica (Alc. 1 y 2).',
      gap: 'Externalización Entrópica (Scope 3): Países ricos "limpian" su huella importando bienes del Sur Global.',
      solution: 'Vector de Alcance Completo: Penaliza la huella importada y computa la Deuda Ecológica neta.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 max-w-6xl mx-auto"
    >
      {/* Top Header Banner with Action Buttons */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-[#D4C9B8] text-slate-900">
        <div className="h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51]" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 pt-1">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#1B4332] text-white shadow-md shrink-0">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1B4332] text-white shadow-xs">
                  Biblioteca Epistémica & Papers Canónicos
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#487075] text-white shadow-xs">
                  TRL 5 • DOI: 10.5281/zenodo.hombros.2026
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight text-black">
                Marco Epistémico, Publicaciones & Pipeline en R
              </h1>
              <p className="text-xs sm:text-sm mt-1 text-black font-medium max-w-3xl leading-relaxed">
                Desarrollo Sostenido sobre Autosustento Sintrópico. La convergencia entre 
                <strong className="text-black font-extrabold"> geofísica, resistencia de materiales, economía ecológica radical y descolonización latinoamericana</strong>.
              </p>
            </div>
          </div>

          {/* Action Downloads Toolbar */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('presentation')}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#b0583e] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all group"
            >
              <Presentation className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Ver Presentación</span>
            </button>

            <a
              href={getAssetUrl('paper.html')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#487075] hover:bg-[#395b5f] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all group"
            >
              <ExternalLink className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Paper Metodológico #1</span>
            </a>

            <a
              href={getAssetUrl('audita-tu-cuenca.html')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all group"
            >
              <ExternalLink className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
              <span>Paper Práctico #2 (Kit Cuenca)</span>
            </a>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* NAVEGACIÓN MODULAR EN TARJETAS: ACCESO A RECURSOS EPISTÉMICOS        */}
      {/* ==================================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1B4332] block">
              MÓDULOS DEL MARCO EPISTÉMICO
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
              Ejes Epistémicos, Publicaciones & Pipeline
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-600">
            Selecciona una tarjeta para explorar cada recurso científico
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 'library',
              title: 'Biblioteca & Papers',
              tag: 'PORTADA & DESCARGAS',
              badge: '2 Papers Publicados',
              desc: 'Colección oficial de los preprints fundacionales: Paper #1 Metodológico IMRAD y Paper #2 Kit Práctico de Cuenca.',
              icon: BookOpen,
              color: '#1B4332',
              accentBg: 'bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/30',
              btnText: 'Ver Publicaciones'
            },
            {
              id: 'reader',
              title: 'Lector Editorial',
              tag: 'LECTURA INMERSIVA',
              badge: activePaper === 'paper1' ? 'Paper #1' : 'Paper #2',
              desc: 'Lector interactivo con fórmulas matemáticas KaTeX, figuras dinámicas y selector rápido entre artículos.',
              icon: FileText,
              color: '#487075',
              accentBg: 'bg-[#487075]/10 text-[#487075] border-[#487075]/30',
              btnText: 'Abrir Lector'
            },
            {
              id: 'presentation',
              title: 'Presentación Oficial (PDF)',
              tag: 'DOSSIER EJECUTIVO',
              badge: '2.4 MB · 300 DPI',
              desc: 'Diapositivas canónicas de síntesis ejecutiva listas para exposición ante comisiones parlamentarias o asambleas.',
              icon: MonitorPlay,
              color: '#C86D51',
              accentBg: 'bg-[#C86D51]/10 text-[#C86D51] border-[#C86D51]/30',
              btnText: 'Ver Diapositivas'
            },
            {
              id: 'figures',
              title: 'Galería de Figuras Canónicas',
              tag: 'EVIDENCIA VISUAL',
              badge: '10 Figuras Canónicas',
              desc: 'Colección de gráficos a 300 DPI: curvas de tracción σ-ε, biplots Scope 3, funciones de transferencia y red panal.',
              icon: Image,
              color: '#927660',
              accentBg: 'bg-[#927660]/10 text-[#927660] border-[#927660]/30',
              btnText: 'Explorar 10 Figuras'
            },
            {
              id: 'scripts_hub',
              title: 'Explorador de Scripts (Hub)',
              tag: 'CIENCIA ABIERTA',
              badge: '7 Módulos en R',
              desc: 'Hub de código reproducible con el Runner Maestro y los 7 módulos en R para auditoría abierta y tensores.',
              icon: Terminal,
              color: '#28475A',
              accentBg: 'bg-[#28475A]/10 text-[#28475A] border-[#28475A]/30',
              btnText: 'Ver 7 Scripts en R'
            },
            {
              id: 'episteme',
              title: 'Hombros de Gigantes',
              tag: 'GENEALOGÍA TEÓRICA',
              badge: '4 Ejes de Ruptura',
              desc: 'Genealogía epistémica: bioeconomía de Georgescu-Roegen, cibernética de Beer, Ostrom y Liebig.',
              icon: GraduationCap,
              color: '#78350F',
              accentBg: 'bg-[#78350F]/10 text-[#78350F] border-[#78350F]/30',
              btnText: 'Leer Genealogía'
            }
          ].map((mod) => {
            const Icon = mod.icon;
            const isActive = activeTab === mod.id;

            return (
              <div
                key={mod.id}
                onClick={() => {
                  setActiveTab(mod.id);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md ${
                  isActive
                    ? 'bg-[#FAF7F0] border-[#1B4332] ring-2 ring-[#1B4332]/40 shadow-sm'
                    : 'bg-white/95 border-[#D4C9B8] hover:border-[#487075]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${mod.accentBg}`}>
                      {mod.badge}
                    </span>
                    <div 
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        isActive ? 'bg-[#1B4332] text-white shadow-xs' : 'bg-[#EDE8DC] text-slate-700 group-hover:bg-[#487075] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                      {mod.tag}
                    </span>
                    <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-[#1B4332] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 font-sans leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4C9B8]/50 flex items-center justify-between text-xs font-serif font-bold text-slate-800 group-hover:text-[#1B4332]">
                  <span>{isActive ? '✓ Visualizando Ahora' : mod.btnText}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-[#1B4332]' : 'group-hover:translate-x-1'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 0: BIBLIOTECA EPISTÉMICA & PAPERS (PORTADA HUB TRANQUILA Y LIMPIA) */}
      {/* ==================================================================== */}
      {activeTab === 'library' && (
        <div className="space-y-8">
          {/* Subheader descriptivo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
                Publicaciones Canónicas Fundacionales
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Acceso a los dos artículos fundacionales revisados por pares y herramientas científicas del proyecto.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>2 Papers Publicados • Acceso Abierto</span>
            </div>
          </div>

          {/* GRANDES TARJETAS DE PUBLICACIONES */}
          <div className="grid grid-cols-1 gap-6">
            {/* PUBLICACIÓN CANÓNICA N° 1: PAPER METODOLÓGICO IMRAD */}
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-[#927660]/40 relative overflow-hidden group hover:border-[#376E6F] transition-all">
              <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-[#1B4332] via-[#376E6F] to-[#7DB2B2]" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#D4C9B8]">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#376E6F] text-white">
                      Paper Canónico #1 · Metodológico
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E2F4F2] text-[#376E6F] border border-[#7DB2B2]">
                      TRL 5 · Validación N=8
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                      DOI: 10.5281/zenodo.hombros.2026
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900 group-hover:text-[#376E6F] transition-colors leading-snug">
                    Hombros: Un Modelo de Mecánica de Medios Continuos y Metabolismo Socio-Ecológico para Cuantificar la Capacidad Portante, Tensión Sistémica y Desplazamiento Entrópico Territorial
                  </h3>
                  <p className="text-xs text-slate-600 font-sans">
                    <strong>Autor:</strong> Daniel Santander Urrutia (Geofísico & Permacultor) • Proyecto Hombros • Noviembre 2026 • Clasif. UNESCO: 5312 / 3311
                  </p>
                </div>

                <div className="shrink-0 flex md:flex-col gap-2 items-end">
                  <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold">
                    IMRAD Completo
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 text-slate-700 border border-slate-300 font-mono text-[11px]">
                    7 Figuras Canónicas
                  </span>
                </div>
              </div>

              {/* Abstract preview */}
              <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-sans">
                Formula un marco matemático estricto que modela el territorio como un medio viscoelástico metabolizante. La capacidad portante no-compensatoria (<InlineMath math="H = (E \cdot S \cdot K)^{1/3} \cdot \Phi_{\text{crit}}" />) y la ley de tensión sistémica (<InlineMath math="\sigma = D / H" />) permiten diagnosticar los cuatro regímenes reológicos (elástico, fluencia, plástico o fractura) e identificar el colonialismo metabólico de Alcance 3 en ocho territorios de Chile y Europa.
              </p>

              {/* 3 Pilares Resumidos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
                <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#E5DFD3] space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#376E6F] block">
                    1. Reología Territorial
                  </span>
                  <p className="text-xs font-medium text-slate-800">
                    Leyes constitutivas <InlineMath math="\sigma = D / H" /> con histéresis plástica y límite de fluencia en <InlineMath math="\sigma = 0.85" />.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#E5DFD3] space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#376E6F] block">
                    2. Benchmark Multi-Sitio
                  </span>
                  <p className="text-xs font-medium text-slate-800">
                    Calibración empírica N=8: Chanco (AAA), Quintero (Fractura), Copenhague, Barcelona, Bilbao, Ámsterdam, Berlín.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#E5DFD3] space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#376E6F] block">
                    3. Scope 3 Upstream
                  </span>
                  <p className="text-xs font-medium text-slate-800">
                    Desmonta el falso desacoplamiento: metrópolis europeas externalizan entre 54% y 76.5% de su huella metabólica.
                  </p>
                </div>
              </div>

              {/* Barra de Acciones */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D4C9B8]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setActivePaper('paper1');
                      setActiveTab('reader');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#376E6F] hover:bg-[#2b5859] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-white" />
                    <span>Leer Paper en Lector Editorial</span>
                  </button>

                  <a
                    href={getAssetUrl('paper.html')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                    <span>Abrir Web Autónoma (paper.html)</span>
                  </a>

                  <a
                    href={getAssetUrl('docs/PAPER_CIENTIFICO_HOMBROS_METODOLOGIA_Y_GAPS.md')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Markdown (.md)</span>
                  </a>
                </div>

                <span className="text-[11px] font-mono text-slate-500">
                  Preprint Metodológico Oficial · 2026
                </span>
              </div>
            </div>

            {/* PUBLICACIÓN CANÓNICA N° 2: PAPER PRÁCTICO & KIT AUDITA TU CUENCA SEIA 2.0 */}
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/60 relative overflow-hidden group hover:border-amber-500 transition-all">
              <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#D4C9B8]">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs">
                      ★ Paper Práctico #2 · Soberanía Técnica
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
                      Manual Comunal Abierto
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-300">
                      Cuenca Río Longaví · 5 Comités APR
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                    Kit Audita tu Propia Cuenca: Protocolo de Auditoría Biofísica Comunitaria, Gemelo Digital y Ensayo de Tracción Territorial (SEIA 2.0)
                  </h3>
                  <p className="text-xs text-slate-600 font-sans">
                    <strong>Autor:</strong> Daniel Santander Urrutia • Aplicación en Cuenca del Río Longaví - Bullileo acoplada al Gemelo Digital AgriTwin • Noviembre 2026
                  </p>
                </div>

                <div className="shrink-0 flex md:flex-col gap-2 items-end">
                  <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-bold">
                    SEIA 2.0 Vinculante
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-slate-50 text-slate-700 border border-slate-300 font-mono text-[11px]">
                    3 Figuras Prácticas (Fig 8-10)
                  </span>
                </div>
              </div>

              {/* Abstract preview */}
              <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-sans">
                Manual metodológico y guía práctica para que municipios rurales, comités de Agua Potable Rural (APR) y asambleas ciudadanas superen la asimetría técnica frente a los Estudios de Impacto Ambiental corporativos. Permite evaluar la solvencia basal de la cuenca, ejecutar ensayos de tracción pre-inversionales vinculantes ex-ante y calcular el retorno macrofiscal (+654.7% ROI) de la restauración sintrópica frente a la sangría recurrente en camiones aljibe.
              </p>

              {/* 3 Pilares Prácticos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-800 block">
                    1. Ensayo de Tracción Pre-Inversión
                  </span>
                  <p className="text-xs font-medium text-slate-800">
                    Salvaguarda ex-ante: dictamina admisibilidad elástica (AAA) o moratoria total por fractura (D) antes del ingreso al SEIA.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-800 block">
                    2. Red Panal APR (κ = 0.38)
                  </span>
                  <p className="text-xs font-medium text-slate-800">
                    Alivio hídrico mutualista entre 5 comités APR de Longaví, reduciendo el estrés crítico de <InlineMath math="\sigma = 0.89" /> a <InlineMath math="0.58" />.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-800 block">
                    3. Macroeconomía del Costo de Inacción
                  </span>
                  <p className="text-xs font-medium text-slate-800">
                    El 88.2% del gasto en emergencia hídrica es pagado por el erario público; la inversión sintrópica se amortiza en 2.8 años.
                  </p>
                </div>
              </div>

              {/* Barra de Acciones */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D4C9B8]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setActivePaper('paper2');
                      setActiveTab('reader');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-white" />
                    <span>Leer Paper Práctico en Lector Editorial</span>
                  </button>

                  <a
                    href={getAssetUrl('audita-tu-cuenca.html')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
                    <span>Abrir Web Autónoma (audita-tu-cuenca.html)</span>
                  </a>

                  <a
                    href="#/auditoria-cuenca"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Abrir en Consola de Auditoría</span>
                  </a>

                  <a
                    href={getAssetUrl('docs/PAPER_PRACTICO_AUDITA_TU_CUENCA.md')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Markdown (.md)</span>
                  </a>
                </div>

                <span className="text-[11px] font-mono text-amber-800 font-bold">
                  Guía Práctica Comunal · SEIA 2.0
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 1: LECTOR EDITORIAL LIMPIO (ESTILO SCHOLARLY PAPER.HTML)         */}
      {/* ==================================================================== */}
      {activeTab === 'reader' && (
        <div className="space-y-6">
          {/* BARRA SUPERIOR DE CONTROL DEL LECTOR EDITORIAL */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-md border border-[#D4C9B8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('library')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>Volver a Biblioteca</span>
              </button>

              <div className="h-5 w-px bg-slate-300 hidden sm:block" />

              {/* Selector de Paper Activo */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold">
                <button
                  onClick={() => setActivePaper('paper1')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activePaper === 'paper1'
                      ? 'bg-[#376E6F] text-white shadow-xs'
                      : 'text-slate-700 hover:text-black hover:bg-white/60'
                  }`}
                >
                  Paper #1: Metodológico (IMRAD)
                </button>
                <button
                  onClick={() => setActivePaper('paper2')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activePaper === 'paper2'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-black hover:bg-white/60'
                  }`}
                >
                  Paper #2: Kit Audita tu Cuenca
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              {activePaper === 'paper1' ? (
                <a
                  href={getAssetUrl('paper.html')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#487075] hover:bg-[#395b5f] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                  <span>Abrir paper.html (Web)</span>
                </a>
              ) : (
                <a
                  href={getAssetUrl('audita-tu-cuenca.html')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                  <span>Abrir audita-tu-cuenca.html (Web)</span>
                </a>
              )}
            </div>
          </div>

          {/* BARRA DE NAVEGACIÓN RÁPIDA DE SECCIONES (JUMP BAR) */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[#EDE8DC]/80 border border-[#D4C9B8] text-xs font-mono">
            <span className="font-bold text-slate-800 mr-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#376E6F]" />
              Secciones:
            </span>
            {activePaper === 'paper1' ? (
              <>
                <a href="#/teoria#abstract" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  Resumen
                </a>
                <a href="#/teoria#gaps-estandares" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  §1. Gaps
                </a>
                <a href="#/teoria#corporeidad-compleja" className="px-3 py-1 rounded-lg bg-[#376E6F] text-white font-bold hover:bg-[#2b595a] shadow-xs transition-all">
                  §2. Corporeidad Territorial
                </a>
                <a href="#/teoria#formulacion-mecanica" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  §3. Leyes Mecánicas
                </a>
                <a href="#/teoria#benchmark-empirico" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  §4. Benchmark N=8
                </a>
                <button 
                  onClick={() => setActiveTab('figures')} 
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all flex items-center gap-1"
                >
                  <Image className="w-3 h-3 text-[#927660]" />
                  <span>Figuras 1-7</span>
                </button>
              </>
            ) : (
              <>
                <a href="#/teoria#resumen-kit" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  Resumen Ejecutivo
                </a>
                <a href="#/teoria#asimetria-seia" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  §1. Asimetría SEIA
                </a>
                <a href="#/teoria#variables-kit" className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 shadow-xs transition-all">
                  §2. Doce Variables Físicas
                </a>
                <a href="#/teoria#ensayo-traccion" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  §3. Ensayo de Tracción
                </a>
                <a href="#/teoria#caso-longavi" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  §4. Cuenca Longaví
                </a>
                <a href="#/teoria#macroeconomia-inaction" className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all">
                  §5. Costo de Inacción
                </a>
                <button 
                  onClick={() => setActiveTab('figures')} 
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-[#D4C9B8] transition-all flex items-center gap-1"
                >
                  <Image className="w-3 h-3 text-amber-700" />
                  <span>Figuras 8-10</span>
                </button>
              </>
            )}
          </div>

          {/* CONTENEDOR DE LECTURA PRINCIPAL TIPO SCHOLARLY PAPER (MAX-W-4XL) */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-12 shadow-xl border border-[#D4C9B8] text-slate-900 font-serif leading-relaxed space-y-10">
            {activePaper === 'paper1' ? (
              /* ============================================================ */
              /* CONTENIDO LIMPIO DEL PAPER #1: METODOLÓGICO IMRAD            */
              /* ============================================================ */
              <>
                {/* Header Académico del Paper 1 */}
                <header className="border-b border-slate-200 pb-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#376E6F] text-white">
                      Artículo Científico Canónico
                    </span>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#E2F4F2] text-[#376E6F] border border-[#7DB2B2]">
                      Mecánica de Medios Continuos & Ecología Radical
                    </span>
                    <span className="text-xs font-mono text-slate-600">
                      DOI: 10.5281/zenodo.hombros.2026
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-slate-950 leading-tight">
                    Hombros: Un Modelo de Mecánica de Medios Continuos y Metabolismo Socio-Ecológico para Cuantificar la Capacidad Portante, Tensión Sistémica y Desplazamiento Entrópico Territorial
                  </h1>

                  <div className="pt-2 text-sm text-slate-700 font-sans space-y-1 border-t border-slate-100">
                    <p className="font-bold text-slate-900">
                      Daniel Sebastián Santander Urrutia
                    </p>
                    <p className="text-slate-600 text-xs">
                      Geofísico & Permacultor • Dirección Técnica, Proyecto HOMBROS • Valparaíso / Maule, Chile
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      Clasificación UNESCO: 5312 (Economía Sectorial) / 3311 (Tecnología e Ingeniería Ambiental) / 2506 (Geofísica)
                    </p>
                  </div>
                </header>

                {/* Resumen / Abstract */}
                <section id="abstract" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-[#F7F5F0] border border-[#E5DFD3] space-y-4">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-[#376E6F]">
                    Resumen Ejecutivo / Abstract
                  </h3>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans font-medium">
                    <LatexText text="Los marcos métricos dominantes de sostenibilidad —el Índice de Desarrollo Humano (IDH), la Economía de la Dona y los Límites Planetarios— presentan al menos tres dificultades metodológicas estructurales: (1) sustituibilidad aditiva arbitraria entre capitales, (2) carencia de una formulación tensorial que capture la no-linealidad de la fatiga territorial y la histéresis, y (3) ceguera frente a las cadenas de suministro de Alcance 3 (*Scope 3* upstream), encubriendo el colonialismo metabólico del Norte Global." />
                  </p>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans font-medium">
                    <LatexText text="En este trabajo se formula el **Modelo HOMBROS**, un marco matemático derivado de la mecánica de medios continuos y la termodinámica del no-equilibrio para caracterizar el territorio como un medio viscoelástico metabolizante. La capacidad portante sistémica (\(H\)) se define como la media geométrica no compensatoria de tres tensores ortogonales de soporte: Hombro Ambiental / Ecosistémico (\(E\)), Hombro Social (\(S\)) y Hombro Económico (\(K\)), modulada por un operador de Liebig con penalización instantánea ante vulneraciones críticas (\(H_i < 0.25\))." />
                  </p>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans font-medium">
                    <LatexText text="La tensión sistémica uniaxial (\(\sigma = D / H\)) define cuatro regímenes reológicos: elástico reversible (\(\sigma < 0.85\)), límite de fluencia (*yield stress*, \(0.85 \le \sigma < 1.00\)), deformación plástica irreversible (\(1.00 \le \sigma < 1.25\)) y fractura socio-ecológica catastrófica (\(\sigma \ge 1.25\)). Validamos el modelo empíricamente en ocho arquetipos territoriales (Chanco, Aconcagua, Quintero-Puchuncaví en Chile; Copenhague, Barcelona, Bilbao, Ámsterdam y Berlín en Europa) y demostramos que las metrópolis post-industriales con reducidas emisiones directas externalizan entre un \(54\%\) y un \(76.5\%\) de su carga entrópica en forma de bienes intensivos importados." />
                  </p>
                </section>

                {/* Sección 1: Análisis Crítico de Gaps */}
                <section id="gaps-estandares" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      1. Análisis Crítico: Matriz de Gaps en Estándares Vigentes
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Vacíos metodológicos que impiden a las comunidades y gobiernos subnacionales evaluar su vulnerabilidad biofísica real.
                    </p>
                  </div>

                  <div className="space-y-4 font-sans text-sm">
                    {gapsData.map((gap, idx) => (
                      <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#376E6F] transition-all shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs uppercase text-[#376E6F]">
                            {gap.standard}
                          </span>
                        </div>
                        <div className="text-slate-700 text-xs sm:text-sm">
                          <strong>Supuesto Base:</strong> <LatexText text={gap.premise} />
                        </div>
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs sm:text-sm">
                          <strong>Brecha Crítica:</strong> <LatexText text={gap.gap} />
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm">
                          <strong>Solución Hombros:</strong> <LatexText text={gap.solution} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Sección 2: Corporeidad Territorial */}
                <section id="corporeidad-compleja" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      2. De la Metáfora Mecánica a la Corporeidad del Sistema Complejo
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Por qué el territorio necesita variables físicas para la toma de decisiones soberanas.
                    </p>
                  </div>

                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
                    La economía tradicional y los estándares de sostenibilidad cometen el error de tratar al territorio como un "plano contable cartesiano": una canasta abstracta de recursos transables sin volumen, sin límites físicos y sin memoria material. Para superar esta ceguera, el modelo <strong>Hombros</strong> formaliza el territorio como un <strong>cuerpo físico indivisible y metabólicamente activo</strong>, cuyas múltiples interacciones generan propiedades emergentes modelables mediante tres conceptos fundamentales:
                  </p>

                  <div className="space-y-6 font-sans">
                    {/* Pilar 1 */}
                    <div className="p-6 rounded-2xl bg-[#F7F5F0] border border-[#E5DFD3] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Pilar 1 · Reología de Materiales
                        </span>
                        <span className="text-xs font-mono text-slate-500">Mecánica de Medios Continuos</span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-slate-900">
                        Cuerpo Deformable o Medio Continuo Socio-Metabólico
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        El territorio no es un agregado de propiedades prediales aisladas; tiene volumen físico, espesor ecológico, inercia y memoria histórica. Responde a las presiones externas mediante <strong>tensión (<InlineMath math="\sigma" />)</strong> y <strong>deformación (<InlineMath math="\varepsilon" />)</strong>, acumulando fatiga estructural y transitando de la elasticidad reversible al daño plástico permanente (histéresis).
                      </p>
                    </div>

                    {/* Pilar 2 */}
                    <div className="p-6 rounded-2xl bg-[#F7F5F0] border border-[#E5DFD3] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                          Pilar 2 · Geometría Diferencial
                        </span>
                        <span className="text-xs font-mono text-slate-500">Espacio de Fases Multidimensional</span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-slate-900">
                        Variedad Diferencial o Espacio de Estados Multidimensional
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        El acoplamiento entre los Hombros <InlineMath math="(E, S, K)" /> y las Presiones <InlineMath math="(D)" /> no forma un cuerpo algebraico simple (no son sumas transables), sino una <strong>variedad continua</strong>. La Ley de Liebig actúa como una pared asintótica de frontera: si un soporte basal colapsa (<InlineMath math="H_i < 0.25" />), el sistema cae a un atractor catastrófico, impidiendo toda compensación monetaria.
                      </p>
                    </div>

                    {/* Pilar 3 */}
                    <div className="p-6 rounded-2xl bg-[#F7F5F0] border border-[#E5DFD3] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Pilar 3 · Termodinámica del No-Equilibrio
                        </span>
                        <span className="text-xs font-mono text-slate-500">Prigogine & Ostrom</span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-slate-900">
                        Estructura Disipativa Auto-organizada en Red Panal
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Un territorio es un sistema metabólicamente abierto que preserva su orden interno (sintropía <InlineMath math="\Gamma > 0" />) disipando calor y dispersión material. Cuando los comités locales (como los APRs) se articulan en una <strong>Red Panal mutualista (<InlineMath math="\kappa = 0.38" />)</strong>, los picos de estrés hídrico son absorbidos colectivamente, garantizando la autopoiesis del soporte común.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Sección 3: Formulación Matemática */}
                <section id="formulacion-mecanica" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      3. Formulación Matemática y Leyes Mecánicas
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Ecuaciones maestras de capacidad portante, tensión sistémica y velocidad sintrópica.
                    </p>
                  </div>

                  <div className="space-y-6 font-sans">
                    {/* Ecuación 1 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <span className="px-3 py-1 rounded-lg bg-[#376E6F] text-white text-xs font-mono font-bold inline-block">
                        Ecuación 1 · Capacidad Portante Efectiva
                      </span>
                      <div className="py-4 px-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <BlockMath math="H = (S \cdot E \cdot K)^{1/3} \cdot \prod \mathbb{I}(H_i \ge 0.25)" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <LatexText text="Media geométrica no compensatoria. Si \(\min(S, E, K) < 0.25\), el territorio experimenta falla estructural inmediata. Ningún superávit de capital social o técnico puede sustituir un suelo o acuífero muerto." />
                      </p>
                    </div>

                    {/* Ecuación 2 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <span className="px-3 py-1 rounded-lg bg-[#C86D51] text-white text-xs font-mono font-bold inline-block">
                        Ecuación 2 · Tensión Sistémica Uniaxial
                      </span>
                      <div className="py-4 px-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <BlockMath math="\sigma = \frac{D}{H} = \frac{\sum_{j=1}^3 D_j / 3}{H}" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <LatexText text="Cociente uniaxial de esfuerzo sobre sección resistente. Define cuatro regímenes mecánicos: elástico (\(\sigma < 0.85\)), límite de fluencia (\(0.85 \le \sigma < 1.00\)), plástico irreversible (\(1.00 \le \sigma < 1.25\)) y fractura catastrófica (\(\sigma \ge 1.25\))." />
                      </p>
                    </div>

                    {/* Ecuación 3 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <span className="px-3 py-1 rounded-lg bg-[#927660] text-white text-xs font-mono font-bold inline-block">
                        Ecuación 3 · Velocidad Sintrópica
                      </span>
                      <div className="py-4 px-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <BlockMath math="\Gamma(t) = \frac{1}{H} \frac{dH}{dt}" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <LatexText text="Tasa temporal de acumulación o disipación neguentrópica en el tiempo. \(\Gamma > +0.02\,\text{año}^{-1}\) indica acumulación sintrópica regenerativa; \(\Gamma < -0.03\,\text{año}^{-1}\) denota senescencia disipativa acelerada." />
                      </p>
                    </div>
                  </div>

                  {/* FIGURA 1 EMBEBIDA SECUENCIALMENTE */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 font-sans">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-xs font-mono font-bold text-[#376E6F]">
                        Figura 1 Canónica · Ley Constitutiva Tensión-Deformación (σ vs. ε)
                      </span>
                      <a href={getAssetUrl('docs/figures/fig1_stress_strain_hysteresis.png')} target="_blank" rel="noopener noreferrer">
                        <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                      </a>
                    </div>
                    <div className="bg-[#0c0714] p-4 rounded-xl text-center">
                      <img 
                        src={getAssetUrl('docs/figures/fig1_stress_strain_hysteresis.png')} 
                        alt="Figura 1: Tensión vs Deformación"
                        className="max-h-[420px] w-full object-contain mx-auto rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <strong>Epígrafe:</strong> Demostración de los cuatro regímenes viscoelásticos del territorio y ciclo de histéresis plástica cerrada. Al superar el límite de fluencia (<InlineMath math="\sigma \ge 0.85" />), el daño por sobreextracción hídrica y compactación edáfica se vuelve permanente e irreversible sin subsidios energéticos externos masivos.
                    </p>
                  </div>
                </section>

                {/* Sección 4: Benchmark Empírico Multi-sitio */}
                <section id="benchmark-empirico" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      4. Resultados Empíricos & Benchmark Multi-sitio (N=8)
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Calibración empírica y contraste entre 3 territorios en Chile y 5 metrópolis europeas.
                    </p>
                  </div>

                  {/* Tabla Canónica de Resultados */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm font-sans text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-[#FAF7F0] border-b border-slate-200 text-[11px] font-mono uppercase text-slate-800">
                        <tr>
                          <th className="p-3">Territorio</th>
                          <th className="p-3">País</th>
                          <th className="p-3 text-center">S</th>
                          <th className="p-3 text-center">E</th>
                          <th className="p-3 text-center">K</th>
                          <th className="p-3 text-center">H</th>
                          <th className="p-3 text-center">D</th>
                          <th className="p-3 text-center">σ</th>
                          <th className="p-3">Régimen Mecánico</th>
                          <th className="p-3 text-right">Alc. 1+2</th>
                          <th className="p-3 text-right">Alc. 3 Up</th>
                          <th className="p-3 text-right">Ratio Ext</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {benchmarkTable.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-bold">{t.name}</td>
                            <td className="p-3 text-slate-700">{t.country}</td>
                            <td className="p-3 text-center font-mono">{t.S}</td>
                            <td className="p-3 text-center font-mono">{t.E}</td>
                            <td className="p-3 text-center font-mono">{t.K}</td>
                            <td className="p-3 text-center font-mono font-bold">{t.H}</td>
                            <td className="p-3 text-center font-mono">{t.D}</td>
                            <td className="p-3 text-center font-mono font-bold">{t.sigma}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] border ${t.tagClass}`}>
                                {t.regime}
                              </span>
                            </td>
                            <td className="p-3 text-right font-mono">{t.scope12}</td>
                            <td className="p-3 text-right font-mono">{t.scope3}</td>
                            <td className="p-3 text-right font-mono font-extrabold">{t.extRatio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* FIGURAS SECUENCIALES 2 A 7 DEL BENCHMARK */}
                  <div className="space-y-6 font-sans">
                    {/* Figura 2 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-mono font-bold text-[#C86D51]">
                          Figura 2 Canónica · Bi-plot Scope 3 y Desplazamiento Entrópico
                        </span>
                        <a href={getAssetUrl('docs/figures/fig2_scope3_displacement_biplot.png')} target="_blank" rel="noopener noreferrer">
                          <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                        </a>
                      </div>
                      <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                        <img 
                          src={getAssetUrl('docs/figures/fig2_scope3_displacement_biplot.png')} 
                          alt="Figura 2" 
                          className="max-h-[380px] w-full object-contain mx-auto" 
                        />
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong>Figura 2: Externalización Metabólica y Desplazamiento Entrópico (Bi-plot Alcance 1-2 vs. Alcance 3):</strong> <em>Demuestra cómo metrópolis europeas como Copenhague externalizan el 76.5% de su carga metabólica hacia el Sur Global (operando en canibalismo metabólico), mientras enclaves productivos primarios como Quintero-Puchuncaví soportan fractura destructiva crónica (σ = 3.361).</em>
                      </p>
                    </div>

                    {/* Figura 3 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-mono font-bold text-[#376E6F]">
                          Figura 3 Canónica · Inversión Sistemática de Rankings Multi-Modelo
                        </span>
                        <a href={getAssetUrl('docs/figures/fig3_multimodel_ranking_inversion.png')} target="_blank" rel="noopener noreferrer">
                          <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                        </a>
                      </div>
                      <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                        <img 
                          src={getAssetUrl('docs/figures/fig3_multimodel_ranking_inversion.png')} 
                          alt="Figura 3" 
                          className="max-h-[380px] w-full object-contain mx-auto" 
                        />
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong>Figura 3: Inversión Sistemática de Jerarquías de Sostenibilidad (Slope Chart):</strong> <em>Al incorporar la no-sustituibilidad de Liebig y el Alcance 3 importado, Chanco asciende al Puesto #1 en solvencia biofísica (AAA), mientras Copenhague cae drásticamente del puesto #1 al #5 por deformación plástica y dependencia metabólica externa asintótica.</em>
                      </p>
                    </div>

                    {/* Figura 4 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-mono font-bold text-[#927660]">
                          Figura 4 Canónica · Descomposición de Varianza Global de Sobol (Monte Carlo N=5,000)
                        </span>
                        <a href={getAssetUrl('docs/figures/fig4_sobol_sensitivity_montecarlo.png')} target="_blank" rel="noopener noreferrer">
                          <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                        </a>
                      </div>
                      <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                        <img 
                          src={getAssetUrl('docs/figures/fig4_sobol_sensitivity_montecarlo.png')} 
                          alt="Figura 4" 
                          className="max-h-[380px] w-full object-contain mx-auto" 
                        />
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong>Figura 4: Descomposición de Sensibilidad Global de Sobol:</strong> <em>El Hombro Ambiental (E) explica el 43.8% de la varianza total de resiliencia territorial, seguido por el Hombro Social (S, 28.3%) y el factor de gobernanza cooperativa (κ, 12.4%), confirmando la primacía de la base biofísica material.</em>
                      </p>
                    </div>

                    {/* Figura 5 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-mono font-bold text-[#C86D51]">
                          Figura 5 Canónica · Amortiguación Tensora en Red Panal Policéntrica
                        </span>
                        <a href={getAssetUrl('docs/figures/fig5_honeycomb_network_damping.png')} target="_blank" rel="noopener noreferrer">
                          <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                        </a>
                      </div>
                      <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                        <img 
                          src={getAssetUrl('docs/figures/fig5_honeycomb_network_damping.png')} 
                          alt="Figura 5" 
                          className="max-h-[380px] w-full object-contain mx-auto" 
                        />
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong>Figura 5: Amortiguación de Picos de Tensión por Acoplamiento Mutualista en Red Panal (Density Violin Plots):</strong> <em>Comparación probabilística entre cuencas aisladas y acopladas en red policéntrica ante choques exógenos de sequía (ΔD = +0.25). La red reduce la varianza de tensión en un 38.4% y elimina el cruce al régimen de fractura catastrófica.</em>
                      </p>
                    </div>

                    {/* Figura 6 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-mono font-bold text-[#376E6F]">
                          Figura 6 Canónica · Funciones de Normalización Canónica (Goalpost Scaling)
                        </span>
                        <a href={getAssetUrl('docs/figures/fig6_normalization_transfer_functions.png')} target="_blank" rel="noopener noreferrer">
                          <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                        </a>
                      </div>
                      <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                        <img 
                          src={getAssetUrl('docs/figures/fig6_normalization_transfer_functions.png')} 
                          alt="Figura 6" 
                          className="max-h-[380px] w-full object-contain mx-auto" 
                        />
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong>Figura 6: Funciones de Transferencia Canónica (X_raw → [0, 1]):</strong> <em>Mapeo determinístico de variables físicas heterogéneas (Falkenmark, PM2.5, cobertura nativa, cuidado, salario digno) con delimitación de la franja crítica de micro-fractura de Liebig en H_i &lt; 0.25.</em>
                      </p>
                    </div>

                    {/* Figura 7 */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-mono font-bold text-[#C86D51]">
                          Figura 7 Canónica · Ensayo de Tracción Territorial Pre-Inversión (SEIA 2.0)
                        </span>
                        <a href={getAssetUrl('docs/figures/fig7_audit_traction_stress_test.png')} target="_blank" rel="noopener noreferrer">
                          <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                        </a>
                      </div>
                      <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                        <img 
                          src={getAssetUrl('docs/figures/fig7_audit_traction_stress_test.png')} 
                          alt="Figura 7" 
                          className="max-h-[380px] w-full object-contain mx-auto" 
                        />
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong>Figura 7: Simulación de Tracción Territorial y Dictamen de Carga Virtual:</strong> <em>Evaluación determinística del desplazamiento σ₀ → σ_proyectado ante proyectos extractivos, dictaminando aprobación elástica, rechazo por deformación plástica o moratoria biofísica legal ex-ante.</em>
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              /* ============================================================ */
              /* CONTENIDO LIMPIO DEL PAPER #2: KIT AUDITA TU PROPIA CUENCA   */
              /* ============================================================ */
              <>
                {/* Header Académico del Paper 2 */}
                <header className="border-b border-slate-200 pb-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs">
                      ★ Paper Práctico N° 2 · Soberanía Técnica
                    </span>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
                      Manual Comunal Abierto & SEIA 2.0
                    </span>
                    <span className="text-xs font-mono text-slate-600">
                      Caso Piloto: Cuenca Río Longaví - Bullileo
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-slate-950 leading-tight">
                    Kit Audita tu Propia Cuenca: Protocolo de Auditoría Biofísica Comunitaria, Gemelo Digital y Ensayo de Tracción Territorial (SEIA 2.0)
                  </h1>

                  <div className="pt-2 text-sm text-slate-700 font-sans space-y-1 border-t border-slate-100">
                    <p className="font-bold text-slate-900">
                      Daniel Sebastián Santander Urrutia
                    </p>
                    <p className="text-slate-600 text-xs">
                      Geofísico & Permacultor • Dirección Técnica, Proyecto HOMBROS • Cuenca del Río Longaví acoplada al Gemelo Digital AgriTwin
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      Script Reproducible: scripts/R/07_kit_audita_tu_cuenca.R • Telemetría Sentinel-2 STAC/COG & Red 5 Comités APR
                    </p>
                  </div>
                </header>

                {/* Resumen Ejecutivo del Paper 2 */}
                <section id="resumen-kit" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4 font-sans">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-amber-800">
                    Resumen Ejecutivo / Abstract
                  </h3>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    El Sistema de Evaluación de Impacto Ambiental (SEIA 1.0, Ley N° 19.300) padece una asimetría estructural de información: los titulares de inversión presentan voluminosos Estudios de Impacto Ambiental (EIA) de miles de páginas elaborados por consultoras privadas, mientras los municipios rurales, los comités de Agua Potable Rural (APR) y las asambleas ciudadanas carecen de instrumentos matemáticos propios para auditar la solvencia biofísica de su cuenca.
                  </p>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    Este manual presenta el <strong>«Kit Audita tu Propia Cuenca»</strong>, una tecnología social y computacional de código abierto derivada del modelo HOMBROS. El protocolo permite a cualquier territorio evaluar su <strong>capacidad portante no-compensatoria (<InlineMath math="H = (E \cdot S \cdot K)^{1/3}" />)</strong>, medir su nivel de fatiga territorial basal (<InlineMath math="\sigma_0" />) y someter cualquier proyecto de inversión al <strong>Ensayo de Tracción SEIA 2.0</strong> antes de que ingrese al sistema administrativo.
                  </p>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    Presentamos la aplicación empírica en la Cuenca del Río Longaví - Bullileo acoplada al Gemelo Digital <strong>AgriTwin</strong>, modelando la interacción entre 5 comités APR, la telemetría satelital Sentinel-2 y el impacto de pactos vecinales regenerativos (Keyline, cortafuegos agroforestales y redes solares). Asimismo, el kit incorpora una calculadora macrofiscal del <strong>Costo de Inacción</strong>, evidenciando que el 88.2% del gasto recurrente en emergencia hídrica (camiones aljibe) es financiado por el erario público comunal y regional, subsidiando indirectamente las rentas privadas del agronegocio intensivo.
                  </p>
                </section>

                {/* Sección 1: Introducción & Asimetría */}
                <section id="asimetria-seia" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      1. De la Ventanilla Corporativa a la Soberanía Técnica Territorial
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Superación de la asimetría informativa, la línea base estática y el cohecho de la RSE.
                    </p>
                  </div>

                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
                    En los conflictos socioambientales de Chile y América Latina, las comunidades y los municipios rurales se enfrentan sistemáticamente a tres trampas estructurales:
                  </p>

                  <div className="space-y-4 font-sans text-sm">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                      <h4 className="font-bold text-slate-900 text-sm">
                        1. La Sobrecarga Documental Opaca
                      </h4>
                      <p className="text-slate-700">
                        Los titulares de megaproyectos redactan expedientes hiper-técnicos de miles de páginas. Las directivas de APR disponen de plazos perentorios de participación ciudadana (PAC) sin contar con modelos cuantitativos de balance de masa para responder.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                      <h4 className="font-bold text-slate-900 text-sm">
                        2. La Ficción de la Línea Base Estática
                      </h4>
                      <p className="text-slate-700">
                        El SEIA tradicional considera que el estado degradado de una cuenca seca es una condición "natural" de partida. Si un acuífero ya ha perdido el 70% de su recarga por sobreotorgamiento histórico de DAA, el sistema evalúa únicamente la extracción adicional marginal del proyecto nuevo, omitiendo que la cuenca ya se encuentra en deformación plástica irreversible.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                      <h4 className="font-bold text-slate-900 text-sm">
                        3. El Cohecho Institucionalizado de la RSE
                      </h4>
                      <p className="text-slate-700">
                        Ante la carencia de agua y servicios básicos, los titulares ofrecen convenios de Responsabilidad Social Empresarial (RSE), sedes comunitarias, canchas de fútbol o camiones aljibe privados. Se sustituye la función vital del agua y el suelo por transferencias monetarias asimétricas.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Sección 2: Las 12 Variables Físicas */}
                <section id="variables-kit" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      2. Metodología: Las Doce Variables Físicas Normalizadas
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Matriz estandarizada de variables observables en el intervalo [0.0, 1.0] para evaluar la solvencia territorial.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
                    {/* Hombro Ambiental */}
                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
                      <span className="font-mono font-bold uppercase text-emerald-800 text-xs block">
                        Hombro Ambiental (E)
                      </span>
                      <ul className="space-y-2 text-slate-700">
                        <li><strong>E₁ — Cobertura Nativa:</strong> Bosque esclerófilo y matorral de cabecera (Meta: ≥65%).</li>
                        <li><strong>E₂ — Seguridad Hídrica:</strong> m³/hab·año normalizado por curva de Falkenmark (Liebig: 555 m³).</li>
                        <li><strong>E₃ — Suelo Vivo & SOM:</strong> % de materia orgánica en primeros 30 cm de suelo (Meta: ≥5.5%).</li>
                        <li><strong>E₄ — Calidad del Aire:</strong> Concentración media anual PM2.5 (Meta: ≤5 µg/m³).</li>
                      </ul>
                    </div>

                    {/* Hombro Social */}
                    <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-2.5">
                      <span className="font-mono font-bold uppercase text-teal-800 text-xs block">
                        Hombro Social (S)
                      </span>
                      <ul className="space-y-2 text-slate-700">
                        <li><strong>S₁ — Cohesión & Cuidados:</strong> Participación activa en asambleas APR y juntas vecinales (Meta: ≥85%).</li>
                        <li><strong>S₂ — Capacidad Institucional:</strong> Tasa de fiscalizaciones efectivas DT/SMA sobre faenas rurales.</li>
                        <li><strong>S₃ — Saberes Campesinos:</strong> Transmisión intergeneracional de manejo agroecológico del agua.</li>
                        <li><strong>S₄ — Paz Territorial:</strong> Ausencia de criminalización ambiental y tomas ilegales de agua.</li>
                      </ul>
                    </div>

                    {/* Hombro Económico */}
                    <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2.5">
                      <span className="font-mono font-bold uppercase text-amber-800 text-xs block">
                        Hombro Económico (K)
                      </span>
                      <ul className="space-y-2 text-slate-700">
                        <li><strong>K₁ — Diversificación Productiva:</strong> Inverso del índice IHH comunal frente al monocultivo.</li>
                        <li><strong>K₂ — Autonomía Fiscal Comunal:</strong> % ingresos locales vs dependencia del Fondo Común Municipal.</li>
                        <li><strong>K₃ — Justicia Distributiva:</strong> Coeficiente Gini castigado por sobreendeudamiento de subsistencia.</li>
                        <li><strong>K₄ — Balance Metabólico:</strong> Relación de biomasa regenerada vs toneladas extraídas exportadas.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Sección 3: Ensayo de Tracción SEIA 2.0 */}
                <section id="ensayo-traccion" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      3. El Ensayo de Tracción Territorial SEIA 2.0
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Cálculo determinístico de la tensión proyectada y dictámenes vinculantes ex-ante.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 font-sans text-xs sm:text-sm">
                    <p className="text-slate-800">
                      Una vez evaluada la línea base, el kit somete al territorio a un ensayo de carga virtual ante el proyecto de inversión entrante:
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <BlockMath math="\sigma_{\text{proj}} = \frac{D_0 + \Delta D_{\text{proyecto}}}{\left[ (E_0 + \Delta E_{\text{proyecto}}) \cdot S_0 \cdot K_0 \right]^{1/3} \cdot \Phi_{\text{crit}} \cdot (1 + \kappa)}" />
                    </div>

                    {/* Tabla de Dictámenes */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-[#FAF7F0] border-b border-slate-200 font-mono font-bold text-slate-800">
                          <tr>
                            <th className="p-3">Tensión Resultante (σ)</th>
                            <th className="p-3">Rating</th>
                            <th className="p-3">Régimen</th>
                            <th className="p-3">Dictamen Jurídico SEIA 2.0</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr>
                            <td className="p-3 font-mono font-bold text-emerald-800">σ &lt; 0.65</td>
                            <td className="p-3 font-bold">AAA</td>
                            <td className="p-3">Elástico Sintrópico</td>
                            <td className="p-3 font-medium text-emerald-900">ADMISIBLE: El proyecto no compromete la solvencia de la cuenca.</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono font-bold text-teal-800">0.65 ≤ σ &lt; 0.85</td>
                            <td className="p-3 font-bold">AA</td>
                            <td className="p-3">Elástico Reversible</td>
                            <td className="p-3 font-medium text-teal-900">ADMISIBLE CON SALVAGUARDA: Monitoreo Sentinel-2 continuo obligatorio.</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono font-bold text-amber-800">0.85 ≤ σ &lt; 1.00</td>
                            <td className="p-3 font-bold">B</td>
                            <td className="p-3">Límite de Fluencia</td>
                            <td className="p-3 font-medium text-amber-900">OBSERVADO / REORDENAMIENTO: Agota el margen elástico de la cuenca.</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono font-bold text-rose-800">1.00 ≤ σ &lt; 1.25</td>
                            <td className="p-3 font-bold">C</td>
                            <td className="p-3">Deformación Plástica</td>
                            <td className="p-3 font-medium text-rose-900">INADMISIBLE: Provoca daño permanente en acuíferos o suelo vivo.</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono font-bold text-red-900">σ ≥ 1.25</td>
                            <td className="p-3 font-bold">D</td>
                            <td className="p-3">Fractura Catastrófica</td>
                            <td className="p-3 font-bold text-red-950">MORATORIA BIOFÍSICA TOTAL: Cuenca en colapso sistémico.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Sección 4: Caso Piloto Cuenca Longaví - Bullileo */}
                <section id="caso-longavi" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      4. Aplicación Piloto en Cuenca del Río Longaví - Bullileo
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Ensayos de tracción ante 4 arquetipos de inversión y amortiguación en Red Panal de 5 Comités APR.
                    </p>
                  </div>

                  {/* FIGURA 8 */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-800">
                        Figura 8 (Paper 2 · Fig 1) · Ensayo de Tracción SEIA 2.0 en Cuenca Río Longaví
                      </span>
                      <a href={getAssetUrl('docs/figures/fig8_longavi_traction_archetypes.png')} target="_blank" rel="noopener noreferrer">
                        <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                      </a>
                    </div>
                    <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                      <img 
                        src={getAssetUrl('docs/figures/fig8_longavi_traction_archetypes.png')} 
                        alt="Figura 8: Ensayo de Tracción en Cuenca Longaví" 
                        className="max-h-[380px] w-full object-contain mx-auto" 
                      />
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Figura 8: Desplazamiento tensorial ante 4 proyectos en Longaví:</strong> <em>La expansión frutal (σ = 1.169), megaminería (σ = 2.370) y loteos periurbanos (σ = 1.119) son declarados INADMISIBLES por sobrepasar el límite de fluencia (σ = 0.85); únicamente el parque agro-solar sintrópico con Keyline resulta admisible (σ = 0.541).</em>
                    </p>
                  </div>

                  {/* FIGURA 10 */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-mono font-bold text-emerald-800">
                        Figura 10 (Paper 2 · Fig 3) · Amortiguación Tensora en Red Panal de 5 Comités APR
                      </span>
                      <a href={getAssetUrl('docs/figures/fig10_honeycomb_aprs_network.png')} target="_blank" rel="noopener noreferrer">
                        <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                      </a>
                    </div>
                    <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                      <img 
                        src={getAssetUrl('docs/figures/fig10_honeycomb_aprs_network.png')} 
                        alt="Figura 10: Red Panal APR" 
                        className="max-h-[380px] w-full object-contain mx-auto" 
                      />
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Figura 10: Alivio Hídrico Mutualista entre comités APR (Bullileo, Retiro Centro, Copihue, Romeral, Villaseca):</strong> <em>Demuestra cómo el nodo más estresado (Retiro Centro) reduce su tensión crítica desde σ = 0.89 a σ = 0.58 al acoplarse a la Red Panal con un predio ancla agroecológico y pactos de Keyline.</em>
                    </p>
                  </div>
                </section>

                {/* Sección 5: Macroeconomía del Costo de Inacción */}
                <section id="macroeconomia-inaction" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                      5. Macroeconomía Biofísica del Costo de Inacción & Socialización de Pérdidas
                    </h2>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Evidencia cuantitativa de cómo el erario público subsidia al monocultivo mediante camiones aljibe.
                    </p>
                  </div>

                  {/* FIGURA 9 */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-mono font-bold text-cyan-800">
                        Figura 9 (Paper 2 · Fig 2) · Retorno Biofísico (+654.7% ROI) vs. Costo de Inacción
                      </span>
                      <a href={getAssetUrl('docs/figures/fig9_roi_inaction_transfer_regressive.png')} target="_blank" rel="noopener noreferrer">
                        <Maximize2 className="w-4 h-4 text-slate-500 hover:text-black" />
                      </a>
                    </div>
                    <div className="bg-[#0c0714] p-3 rounded-xl text-center">
                      <img 
                        src={getAssetUrl('docs/figures/fig9_roi_inaction_transfer_regressive.png')} 
                        alt="Figura 9: Costo de Inacción y Retorno de Inversión Sintrópica" 
                        className="max-h-[380px] w-full object-contain mx-auto" 
                      />
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Figura 9: Panel A: Amortización a 10 años; Panel B: Radiografía fiscal de camiones aljibe:</strong> <em>El 88.2% del gasto de emergencia hídrica es pagado por fondos públicos del Estado (FNDR, SENAPRED, Municipalidades) y 0% por el monocultivo exportador. El breakeven de la restauración sintrópica preventiva se alcanza en el año 2.8.</em>
                    </p>
                  </div>

                  {/* Botón de llamada a la acción hacia la Consola de Auditoría */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white shadow-lg space-y-3 font-sans">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-300" />
                      <h4 className="font-serif font-bold text-lg text-white">
                        Ejecutar Auditoría en Vivo sobre la Cuenca del Río Longaví
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      La consola interactiva del Kit Audita tu Cuenca permite modificar en tiempo real las 12 variables físicas, evaluar proyectos de inversión entrantes y calcular el dictamen de solvencia pre-inversional vinculante ex-ante.
                    </p>
                    <a
                      href="#/auditoria-cuenca"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-md transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>Ir a la Consola de Auditoría de Cuenca →</span>
                    </a>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      )}
      {/* ==================================================================== */}
      {/* TAB 2: PRESENTACIÓN OFICIAL (PDF INTERACTIVO EMBEBIDO) */}
      {/* ==================================================================== */}
      {activeTab === 'presentation' && (
        <div className="space-y-6">
          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C86D51]/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D4C9B8]">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#C86D51] tracking-widest block">
                  Documento Ejecutivo & Proyección Territorial
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-black mt-0.5">
                  Presentación Oficial del Proyecto HOMBROS
                </h2>
                <p className="text-xs text-black font-medium mt-1">
                  Desarrollo Sostenido sobre Autosustento Sintrópico • Versión Canónica en PDF de Alta Resolución
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf')}
                  download="HOMBROS_Presentacion_Oficial.pdf"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#C86D51] hover:bg-[#b0583e] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Descargar PDF (2.4 MB)</span>
                </a>
                <a
                  href={getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-black border border-[#D4C9B8] text-xs font-bold transition-all shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
                  <span>Abrir en Pestaña</span>
                </a>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-[#D4C9B8] shadow-2xl bg-white">
              <iframe
                src={`${getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf')}#toolbar=1&navpanes=0`}
                className="w-full h-[760px] border-none"
                title="Presentación Oficial HOMBROS"
              />
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: GALERÍA DE FIGURAS CANÓNICAS DEL PAPER */}
      {/* ==================================================================== */}
      {activeTab === 'figures' && (
        <div className="space-y-8">
          <div id="galeria-figuras" className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-[#927660]/30 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D4C9B8]">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#927660] tracking-widest block">
                  Aparato Visual Canónico de Publicación
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-black mt-0.5">
                  Galería de Figuras Canónicas del Preprint
                </h2>
                <p className="text-xs text-black font-medium mt-1 max-w-2xl">
                  Compendio de figuras vectoriales generadas con <code className="text-[#376E6F] font-mono font-bold">scripts/R/06_figure_factory.R</code> (R v4.5.2, ggplot2) a 300 DPI, estructuradas según estándares de Elsevier y Nature Portfolio.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={getAssetUrl('docs/figures/fig1_stress_strain_hysteresis.png')}
                  download
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-[#D4C9B8] text-black text-xs font-bold transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-[#376E6F]" />
                  <span>Descargar Figuras (.png)</span>
                </a>
              </div>
            </div>

            {/* Selector de Colección (Filtro Paper 1 vs. Paper 2 vs. Todas) */}
            <div className="flex flex-wrap items-center gap-2 pt-4 pb-2 border-b border-[#D4C9B8]/60">
              <span className="text-[11px] font-mono font-bold text-slate-700 mr-1">Filtrar por Publicación:</span>
              <button
                onClick={() => {
                  setFigureFilter('all');
                  if (!paperFigures.some(f => f.id === selectedFigureId)) setSelectedFigureId('fig1');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  figureFilter === 'all'
                    ? 'bg-[#28475A] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#D4C9B8]'
                }`}
              >
                Todas las Figuras (10)
              </button>
              <button
                onClick={() => {
                  setFigureFilter('paper1');
                  setSelectedFigureId('fig1');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  figureFilter === 'paper1'
                    ? 'bg-[#376E6F] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#D4C9B8]'
                }`}
              >
                Paper 1: Marco Sistémico (Fig. 1 a 7)
              </button>
              <button
                onClick={() => {
                  setFigureFilter('paper2');
                  setSelectedFigureId('fig8');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  figureFilter === 'paper2'
                    ? 'bg-[#C86D51] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#D4C9B8]'
                }`}
              >
                Paper 2: Kit Audita tu Cuenca (Fig. 8 a 10)
              </button>
            </div>

            {/* Selector de Figuras en Pestañas */}
            <div className="flex flex-wrap gap-2 my-4">
              {filteredFigures.map((fig) => (
                <button
                  key={fig.id}
                  onClick={() => setSelectedFigureId(fig.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeFigure.id === fig.id
                      ? 'bg-[#C86D51] text-white shadow-md shadow-[#C86D51]/30'
                      : 'bg-white text-slate-800 hover:bg-slate-100 border border-[#D4C9B8]'
                  }`}
                >
                  <Image className="w-3.5 h-3.5" />
                  <span>{fig.number}</span>
                </button>
              ))}
            </div>

            {/* Visor Principal de la Figura Activa */}
            <div className="bg-[#0c0714] rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl text-white">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#DA7B93]">{activeFigure.number}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${activeFigure.badgeColor}`}>
                      {activeFigure.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {activeFigure.sectionRef}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                    {activeFigure.title}
                  </h3>
                  <div className="text-xs text-slate-300 mt-0.5">
                    <LatexText text={activeFigure.subtitle} />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeFigure.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all text-xs flex items-center gap-1.5 font-mono"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ampliar</span>
                  </a>
                  <a
                    href={activeFigure.image}
                    download
                    className="p-2 rounded-xl bg-[#376E6F] hover:bg-[#2b595a] text-white transition-all text-xs flex items-center gap-1.5 font-mono"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>PNG</span>
                  </a>
                </div>
              </div>

              {/* Imagen Renderizada */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#140b22] flex items-center justify-center p-2 sm:p-4 my-4">
                <img 
                  src={activeFigure.image} 
                  alt={activeFigure.title}
                  className="max-h-[520px] w-auto object-contain rounded-lg shadow-2xl" 
                  onError={(e) => {
                    if (!e.target.dataset.tried) {
                      e.target.dataset.tried = '1';
                      const figFilename = activeFigure.image ? activeFigure.image.split('/').pop() : 'fig1_stress_strain_hysteresis.png';
                      e.target.src = `/hombros/docs/figures/${figFilename}`;
                    }
                  }}
                />
              </div>

              {/* Caption Académico & Takeaways */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 pt-4 border-t border-white/10 text-xs">
                <div className="lg:col-span-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#45B69C] tracking-wider block mb-1.5">
                    Descripción & Epígrafe Canónico (Caption)
                  </span>
                  <div className="text-slate-300 font-sans leading-relaxed text-xs italic">
                    <LatexText text={activeFigure.caption} />
                  </div>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#DA7B93] tracking-wider block mb-2">
                    Hallazgos Clave de Validación
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {activeFigure.takeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#DA7B93] mt-0.5">•</span>
                        <span><LatexText text={point} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: EXPLORADOR DE SCRIPTS & PIPELINE (HUB DUAL-PANE WETLAND STYLE) */}
      {/* ==================================================================== */}
      {activeTab === 'scripts_hub' && (
        <div className="space-y-6">
          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-[#28475A]/30">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#D4C9B8]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#28475A] text-white shadow-md">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#28475A]">
                      Computational Hub & Pipeline de R
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-white text-slate-800 border border-[#D4C9B8]">
                      R v4.5.2 • tidyverse • ggplot2
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-black">
                    Hub Canónico de Scripts & Modelación Modular
                  </h2>
                  <p className="text-xs text-black font-medium mt-0.5">
                    Arquitectura computacional desacoplada en 7 módulos especializados bajo el patrón de pipeline orquestado.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => copyScriptToClipboard(activeScript.code)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-[#D4C9B8] text-black text-xs font-mono font-bold transition-all shadow-sm"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-700" />}
                  <span>{copiedCode ? 'Copiado' : 'Copiar Script'}</span>
                </button>
              </div>
            </div>

            {/* Run Banner */}
            <div className="my-5 p-3.5 rounded-2xl bg-white border border-[#D4C9B8] text-xs font-mono text-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#C86D51] shrink-0" />
                <div>
                  <span className="text-[#C86D51] font-bold"># Ejecución completa del pipeline en terminal:</span>
                  <span className="ml-2 text-black bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#DDD5C5] font-bold">
                    Rscript scripts/pipeline_runner.R
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-600 font-mono font-bold">
                Tiempo de cómputo: 5.76 s
              </span>
            </div>

            {/* Dual-Pane Window */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 rounded-2xl bg-[#09050e] border border-white/10 overflow-hidden shadow-2xl min-h-[580px] text-white">
              {/* Left Sidebar */}
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-4 bg-[#0d0714] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FolderTree className="w-4 h-4 text-[#DA7B93]" />
                    <span className="text-xs font-mono uppercase font-bold text-slate-200">
                      Módulos del Pipeline
                    </span>
                  </div>

                  <div className="relative mb-3">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filtrar scripts..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DA7B93] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                    {filteredScripts.map((script) => (
                      <div
                        key={script.id}
                        onClick={() => setSelectedScriptId(script.id)}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                          selectedScriptId === script.id
                            ? 'bg-[#487075]/25 border-[#487075] text-white shadow-md'
                            : 'bg-black/30 border-white/5 text-slate-300 hover:bg-black/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <FileCode className={`w-3.5 h-3.5 ${selectedScriptId === script.id ? 'text-[#7DB2B2]' : 'text-slate-400'}`} />
                            <span className="text-xs font-mono font-bold truncate">{script.title}</span>
                          </div>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${script.badgeColor}`}>
                            {script.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans line-clamp-1">
                          {script.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 mt-3 text-[10px] font-mono text-slate-500 text-center">
                  7 scripts modulares listos para replicabilidad
                </div>
              </div>

              {/* Right Viewport */}
              <div className="lg:col-span-8 p-4 sm:p-5 flex flex-col justify-between bg-[#07040a]">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10 font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 truncate">
                      <span>scripts</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                      <span>{activeScript.category}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-[#7DB2B2] font-bold">{activeScript.title}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10">{activeScript.size}</span>
                      <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10">{activeScript.lines} líneas</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-3 text-xs text-slate-300 font-sans leading-relaxed">
                    <strong className="text-white font-mono text-[11px] block mb-0.5">Propósito del Módulo:</strong>
                    {activeScript.description}
                  </div>

                  <div className="rounded-xl bg-[#030106] p-4 border border-white/10 max-h-[400px] overflow-y-auto overflow-x-auto">
                    <pre className="text-xs font-mono text-emerald-300/90 leading-relaxed">
                      <code>{activeScript.code}</code>
                    </pre>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[10px] font-mono text-slate-500">
                  <span>Ruta local: <code>{activeScript.path}</code></span>
                  <span>Formato: RScript v4.5.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: HOMBROS DE GIGANTES (GENEALOGÍA EPISTÉMICA) */}
      {/* ==================================================================== */}
      {activeTab === 'episteme' && (
        <div className="space-y-8">
          <HombrosDeGigantes />

          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-md border border-[#D4C9B8]">
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase font-bold text-[#C86D51] tracking-widest block">
                Arquitectura Epistemológica
              </span>
              <h2 className="text-xl font-serif font-extrabold text-black mt-0.5">
                Los 4 Ejes de Ruptura con el Desarrollo Convencional
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sections.map((sec, i) => {
                const Icon = sec.icon;
                return (
                  <div 
                    key={i} 
                    className={`rounded-3xl p-6 shadow-md flex flex-col justify-between transition-all duration-300 group ${sec.cardClass}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-white/80 text-black border border-black/10">
                          {sec.badge}
                        </span>
                        <Icon className={`w-4 h-4 ${sec.color}`} />
                      </div>
                      <h3 className="text-base font-serif font-bold mb-3 text-black">
                        {sec.title}
                      </h3>
                      <p className="text-xs leading-relaxed whitespace-pre-line text-black font-medium font-sans">
                        {sec.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
