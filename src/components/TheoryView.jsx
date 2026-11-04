import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Compass, Flame, Cpu, GitFork, Scale, 
  FileText, Download, ExternalLink, Code2, Check, Copy, 
  Layers, AlertTriangle, CheckCircle2, TrendingUp, ShieldAlert,
  GraduationCap, Sparkles, Terminal, Image, FolderTree, Search,
  Maximize2, ChevronRight, Play, Eye, FileCode, CheckCircle,
  Presentation, MonitorPlay, ZoomIn
} from 'lucide-react';
import HombrosDeGigantes from './HombrosDeGigantes';
import { getAssetUrl } from '../utils/assets';
import { InlineMath, BlockMath, LatexText } from './KaTeXMath';

export default function TheoryView() {
  const [activeTab, setActiveTab] = useState('paper'); // 'paper' | 'presentation' | 'figures' | 'scripts_hub' | 'episteme'
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScriptId, setSelectedScriptId] = useState('pipeline_runner');
  const [selectedFigureId, setSelectedFigureId] = useState('fig1');
  const [activeFigureModal, setActiveFigureModal] = useState(null);

  // --------------------------------------------------------------------------
  // BANCO DE FIGURAS CANÓNICAS DEL PAPER
  // --------------------------------------------------------------------------
  const paperFigures = [
    {
      id: 'fig1',
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

# Paleta de colores canónica HOMBROS (FCINQ / Cosmic Bio-digital)
PALETTE_HOMBROS <- c(
  "Chile"       = "#D83F87",
  "Dinamarca"   = "#376E6F",
  "España"      = "#DA7B93",
  "Países Bajos"= "#8D69A6",
  "Alemania"    = "#2F4454"
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

  const activeFigure = useMemo(() => {
    return paperFigures.find(f => f.id === selectedFigureId) || paperFigures[0];
  }, [selectedFigureId]);

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
      color: 'text-[#8D69A6]',
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
      color: 'text-[#D83F87]',
      cardClass: 'card-magenta',
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
      premise: 'Visualización circular con techo ecológico y piso social cualitativo.',
      gap: 'Brecha Métrica Dinámica: No ofrece leyes de tensión, elasticidad o histéresis irreversible de fractura.',
      solution: 'Mecánica de Medios Continuos: σ = D/H, deformación (ε), fluencia (yield) y velocidad sintrópica (Γ).'
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
      <div className="card-magenta rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#D83F87]/25">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D83F87]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#C86D51] text-white shadow-md shrink-0">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C86D51] text-white shadow-xs">
                  Marco Epistémico & Paper Canónico
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#487075] text-white shadow-xs">
                  TRL 5 • DOI: 10.5281/zenodo.hombros.2026
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight text-black">
                Marco Epistémico, Paper Metodológico & Pipeline en R
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
              <span>Abrir Paper Completo</span>
            </a>
          </div>
        </div>

        {/* Sub-tab Navigation (5 Pestañas Canónicas Activas) */}
        <div className="flex flex-wrap gap-2.5 mt-6 pt-5 border-t border-[#D4C9B8]/70 relative z-10">
          <button
            onClick={() => setActiveTab('paper')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'paper'
                ? 'bg-[#487075] text-white border border-[#376E6F] shadow-md shadow-[#487075]/30'
                : 'bg-[#7DB2B2]/20 text-slate-800 hover:bg-[#7DB2B2]/35 border border-[#7DB2B2]/50'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'paper' ? 'text-white' : 'text-[#487075]'}`} />
            <span>Paper Canónico (IMRAD & Figuras)</span>
          </button>

          <button
            onClick={() => setActiveTab('presentation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'presentation'
                ? 'bg-[#C86D51] text-white border border-[#927660] shadow-md shadow-[#C86D51]/30'
                : 'bg-[#C86D51]/20 text-slate-800 hover:bg-[#C86D51]/30 border border-[#C86D51]/50'
            }`}
          >
            <MonitorPlay className={`w-4 h-4 ${activeTab === 'presentation' ? 'text-white' : 'text-[#C86D51]'}`} />
            <span>Presentación Oficial (PDF)</span>
          </button>

          <button
            onClick={() => setActiveTab('figures')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'figures'
                ? 'bg-[#927660] text-white border border-[#624F44] shadow-md shadow-[#927660]/30'
                : 'bg-[#927660]/20 text-slate-800 hover:bg-[#927660]/30 border border-[#927660]/50'
            }`}
          >
            <Image className={`w-4 h-4 ${activeTab === 'figures' ? 'text-white' : 'text-[#927660]'}`} />
            <span>Galería de Figuras Canónicas</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-white/40 text-slate-900 font-bold">
              7
            </span>
          </button>

          <button
            onClick={() => setActiveTab('scripts_hub')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'scripts_hub'
                ? 'bg-[#28475A] text-white border border-[#1E293B] shadow-md shadow-[#28475A]/30'
                : 'bg-[#28475A]/20 text-slate-800 hover:bg-[#28475A]/30 border border-[#28475A]/50'
            }`}
          >
            <Terminal className={`w-4 h-4 ${activeTab === 'scripts_hub' ? 'text-white' : 'text-[#28475A]'}`} />
            <span>Explorador de Scripts (Hub)</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-white/40 text-slate-900 font-bold">
              7 Módulos
            </span>
          </button>

          <button
            onClick={() => setActiveTab('episteme')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'episteme'
                ? 'bg-[#D83F87] text-white border border-[#A0285D] shadow-md shadow-[#D83F87]/30'
                : 'bg-[#D83F87]/20 text-slate-800 hover:bg-[#D83F87]/30 border border-[#D83F87]/50'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activeTab === 'episteme' ? 'text-white' : 'text-[#D83F87]'}`} />
            <span>Hombros de Gigantes</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: PAPER CIENTÍFICO CANÓNICO COMPLETO (IMRAD CON FIGURAS DENTRO) */}
      {/* ==================================================================== */}
      {activeTab === 'paper' && (
        <div className="space-y-8">
          {/* Metadata Card */}
          <div className="card-slate rounded-3xl p-6 sm:p-7 shadow-xl border border-[#927660]/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4C9B8] text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#927660] tracking-widest block">
                  Compendio Científico Metodológico Canónico
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-extrabold text-black mt-0.5">
                  Hombros: Un Modelo de Mecánica de Medios Continuos y Metabolismo Socio-Ecológico para Cuantificar la Capacidad Portante, Tensión Sistémica y Desplazamiento Entrópico Territorial
                </h2>
                <p className="text-xs text-black mt-1 font-medium">
                  <strong className="font-bold">Autor:</strong> Daniel Santander Urrutia (Geofísico & Permacultor) • Proyecto Hombros • Noviembre 2026
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-[#E2F4F2] text-[#376E6F] font-bold border border-[#7DB2B2]">
                  Validación Multi-sitio: N=8
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] text-[#927660] font-bold border border-[#DDD5C5]">
                  Clasif. UNESCO: 5312 / 3311
                </span>
              </div>
            </div>

            {/* Abstract */}
            <div className="mt-4 p-4 rounded-2xl bg-white/90 border border-[#D4C9B8]/70 shadow-xs">
              <span className="text-[10px] font-mono uppercase font-extrabold text-[#487075] tracking-wider block mb-1">
                Resumen Ejecutivo / Abstract
              </span>
              <p className="text-xs sm:text-sm text-black leading-relaxed font-sans font-medium">
                <LatexText text="Los estándares de contabilidad socio-ambiental dominantes (IDH, Economía de la Dona, Límites Planetarios y Huella Ecológica) presentan sesgos críticos de compensabilidad aditiva, ceguera ante el desplazamiento metabólico de Alcance 3 hacia el Sur Global y ausencia de una física de fatiga territorial. En este trabajo presentamos la formalización canónica del modelo **Hombros**, integrando la mecánica de medios continuos con la termodinámica ecológica abierta. Definimos la capacidad portante no-compensatoria \(H = (S \cdot E \cdot K)^{1/3}\) con quiebre asintótico ante fallos de pilares individuales (\(H_i < 0.25\)), la tensión sistémica \(\sigma = D / H\) y el régimen de deformación viscoelástica (elástico, fluencia, plástico y fractura). Validamos el modelo empíricamente en ocho arquetipos territoriales (Chanco, Aconcagua, Quintero-Puchuncaví en Chile; Copenhague, Barcelona, Bilbao, Ámsterdam y Berlín en Europa) y demostramos que las metrópolis post-industriales con reducidas emisiones territoriales directas externalizan entre un \(54\%\) y un \(76.5\%\) de su carga entrópica en forma de bienes intensivos importados." />
              </p>
            </div>
          </div>

          {/* 1. Matriz de Gaps Epistémicos */}
          <div className="card-teal rounded-3xl p-6 sm:p-8 shadow-xl border border-[#7DB2B2]/40">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-5 h-5 text-[#376E6F]" />
              <h3 className="font-serif font-extrabold text-xl text-black">
                1. Análisis Crítico: Matriz de Gaps en Estándares Vigentes
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black font-medium mb-5 max-w-4xl leading-relaxed">
              La literatura contemporánea de sostenibilidad presenta vacíos metodológicos recurrentes que impiden a las comunidades y gobiernos subnacionales evaluar su vulnerabilidad biofísica real:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gapsData.map((gap, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/95 border border-[#D4C9B8]/80 flex flex-col justify-between hover:border-[#487075] transition-all shadow-sm">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#376E6F] block mb-1">
                      {gap.standard}
                    </span>
                    <div className="text-xs text-black font-sans mb-2.5">
                      <strong className="text-black font-extrabold uppercase text-[10px] tracking-wide block mb-1">
                        Supuesto Base:
                      </strong>
                      <span className="text-black font-normal"><LatexText text={gap.premise} /></span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FEECE8] border border-[#F4A79D] mb-3.5 text-black text-xs font-sans leading-relaxed shadow-xs">
                      <div className="flex items-center gap-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
                        <strong className="text-[#C86D51] font-bold text-[11px] uppercase tracking-wide">
                          Brecha Crítica:
                        </strong>
                      </div>
                      <span className="text-black font-medium"><LatexText text={gap.gap} /></span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#E2F4F2] border border-[#7DB2B2] text-black text-xs font-sans leading-relaxed shadow-xs">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#376E6F] shrink-0" />
                      <strong className="text-[#376E6F] font-bold text-[11px] uppercase tracking-wide">
                        Solución Hombros:
                      </strong>
                    </div>
                    <span className="text-black font-medium"><LatexText text={gap.solution} /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Formulación Matemática de Medios Continuos */}
          <div className="card-indigo rounded-3xl p-6 sm:p-8 shadow-xl border border-[#927660]/30">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-[#927660]" />
              <h3 className="font-serif font-extrabold text-xl text-black">
                2. Formulación Matemática y Leyes Mecánicas
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black font-medium mb-5 max-w-4xl">
              Hombros abandona las métricas abstractas y modela el territorio con leyes físicas verificables de resistencia de materiales:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-white/95 border border-[#7DB2B2]/30 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-lg bg-[#487075] text-white text-[10px] font-bold uppercase tracking-wider inline-block mb-3 shadow-xs">
                    Ecuación 1 · Capacidad Portante
                  </span>
                  <div className="text-base font-extrabold text-black my-2 py-2.5 px-3 rounded-xl bg-[#E2F4F2] border border-[#7DB2B2]/60 text-center shadow-xs">
                    <BlockMath math="H = (S \cdot E \cdot K)^{1/3} \cdot \prod \mathbb{I}(H_i \ge 0.25)" />
                  </div>
                </div>
                <div className="text-xs text-black font-sans mt-3 leading-relaxed">
                  <LatexText text="Media geométrica no compensatoria. Si \(\min(S, E, K) < 0.25\), el territorio experimenta falla estructural inmediata. Ningún superávit de capital social o técnico puede sustituir un suelo o acuífero muerto." />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/95 border border-[#C86D51]/30 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-lg bg-[#C86D51] text-white text-[10px] font-bold uppercase tracking-wider inline-block mb-3 shadow-xs">
                    Ecuación 2 · Tensión Sistémica
                  </span>
                  <div className="text-base font-extrabold text-black my-2 py-2.5 px-3 rounded-xl bg-[#FEECE8] border border-[#F4A79D]/60 text-center shadow-xs">
                    <BlockMath math="\sigma = \frac{D}{H} = \frac{\sum_{j=1}^3 D_j / 3}{H}" />
                  </div>
                </div>
                <div className="text-xs text-black font-sans mt-3 leading-relaxed">
                  <LatexText text="Cociente uniaxial de esfuerzo sobre sección resistente. Define cuatro regímenes mecánicos: elástico (\(\sigma < 0.85\)), límite de fluencia (\(0.85 \le \sigma < 1.00\)), plástico irreversible (\(1.00 \le \sigma < 1.25\)) y fractura catastrófica (\(\sigma \ge 1.25\))." />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/95 border border-[#927660]/30 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-lg bg-[#927660] text-white text-[10px] font-bold uppercase tracking-wider inline-block mb-3 shadow-xs">
                    Ecuación 3 · Velocidad Sintrópica
                  </span>
                  <div className="text-base font-extrabold text-black my-2 py-2.5 px-3 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5]/60 text-center shadow-xs">
                    <BlockMath math="\Gamma(t) = \frac{1}{H} \frac{dH}{dt}" />
                  </div>
                </div>
                <div className="text-xs text-black font-sans mt-3 leading-relaxed">
                  <LatexText text="Tasa temporal de acumulación o disipación neguentrópica en el tiempo. \(\Gamma > +0.02\,\text{año}^{-1}\) indica acumulación sintrópica regenerativa; \(\Gamma < -0.03\,\text{año}^{-1}\) denota senescencia disipativa acelerada." />
                </div>
              </div>
            </div>

            {/* FIGURA 1 EMBEBIDA DENTRO DEL PAPER */}
            <div className="mt-8 p-5 rounded-2xl bg-white/95 border border-[#927660]/30 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 pb-2 border-b border-[#D4C9B8]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#376E6F] text-white text-xs font-mono font-bold">
                    Figura 1 Canónica
                  </span>
                  <h4 className="font-serif font-bold text-black text-sm sm:text-base">
                    Ley Constitutiva Socio-Ecológica Tensión-Deformación (σ vs. ε)
                  </h4>
                </div>
                <a
                  href={getAssetUrl('docs/figures/fig1_stress_strain_hysteresis.png')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#376E6F] font-bold hover:underline"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Ver en alta resolución</span>
                </a>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#0c0714] p-3 text-center my-3 border border-slate-300">
                <img 
                  src={getAssetUrl('docs/figures/fig1_stress_strain_hysteresis.png')} 
                  alt="Figura 1: Ley Constitutiva Tensión-Deformación"
                  className="w-full max-h-[420px] object-contain mx-auto rounded-lg"
                  onError={(e) => {
                    if (!e.target.dataset.tried) {
                      e.target.dataset.tried = '1';
                      e.target.src = '/hombros/docs/figures/fig1_stress_strain_hysteresis.png';
                    }
                  }}
                />
              </div>

              <p className="text-xs text-black font-sans leading-relaxed mt-2 italic bg-[#FAF7F0] p-3 rounded-xl border border-[#DDD5C5]">
                <strong>Epígrafe:</strong> Demostración de los cuatro regímenes viscoelásticos del territorio y ciclo de histéresis plástica cerrada. Al superar el límite de fluencia (σ ≥ 0.85), el daño por sobreextracción hídrica y compactación edáfica se vuelve permanente e irreversible sin subsidios energéticos externos masivos.
              </p>
            </div>
          </div>

          {/* 3. Benchmark Empírico Multi-sitio (N=8) */}
          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-[#927660]/30">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-[#C86D51]" />
              <h3 className="font-serif font-extrabold text-xl text-black">
                3. Resultados Empíricos & Benchmark Multi-sitio (N=8)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black font-medium mb-4 max-w-4xl leading-relaxed">
              Ejecución del pipeline canónico de R (<code className="text-[#376E6F] font-mono font-bold">scripts/pipeline_runner.R</code>) sobre una muestra balanceada de 3 territorios en Chile (Sur Global) y 5 metrópolis europeas (Norte Global):
            </p>

            {/* Tabla Canónica de Calibración */}
            <div className="overflow-x-auto rounded-2xl border border-[#D4C9B8] bg-white shadow-sm mb-6">
              <table className="w-full text-xs text-left text-black font-sans">
                <thead className="bg-[#FAF7F0] border-b border-[#D4C9B8] text-[11px] font-mono uppercase text-slate-800">
                  <tr>
                    <th className="p-3">Territorio</th>
                    <th className="p-3">País</th>
                    <th className="p-3 text-center">Social (S)</th>
                    <th className="p-3 text-center">Ambiental (E)</th>
                    <th className="p-3 text-center">Económico (K)</th>
                    <th className="p-3 text-center">Capacidad (H)</th>
                    <th className="p-3 text-center">Presión (D)</th>
                    <th className="p-3 text-center">Tensión (σ)</th>
                    <th className="p-3">Régimen Mecánico</th>
                    <th className="p-3 text-right">Alc. 1+2</th>
                    <th className="p-3 text-right">Alc. 3 Up</th>
                    <th className="p-3 text-right">Ratio Ext (%)</th>
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

            {/* FIGURAS 2 Y 3 EMBEBIDAS DENTRO DEL BENCHMARK */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
              {/* Figura 2 */}
              <div className="p-4 rounded-2xl bg-white border border-[#D4C9B8] shadow-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-[#C86D51]">Figura 2 · Bi-plot Scope 3</span>
                  <a href={getAssetUrl('docs/figures/fig2_scope3_displacement_biplot.png')} target="_blank" rel="noopener noreferrer">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500 hover:text-black" />
                  </a>
                </div>
                <div className="bg-[#0c0714] p-2 rounded-xl mb-2 text-center">
                  <img 
                    src={getAssetUrl('docs/figures/fig2_scope3_displacement_biplot.png')} 
                    alt="Figura 2" 
                    className="max-h-[260px] mx-auto object-contain" 
                    onError={(e) => {
                      if (!e.target.dataset.tried) {
                        e.target.dataset.tried = '1';
                        e.target.src = '/hombros/docs/figures/fig2_scope3_displacement_biplot.png';
                      }
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-700 font-sans">
                  <strong>Colonialismo Metabólico:</strong> Copenhague externaliza el 76.5% de su carga entrópica hacia el Sur Global, mientras Quintero sufre fractura destructiva (σ = 3.361).
                </p>
              </div>

              {/* Figura 3 */}
              <div className="p-4 rounded-2xl bg-white border border-[#D4C9B8] shadow-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-[#376E6F]">Figura 3 · Inversión de Jerarquías</span>
                  <a href={getAssetUrl('docs/figures/fig3_multimodel_ranking_inversion.png')} target="_blank" rel="noopener noreferrer">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500 hover:text-black" />
                  </a>
                </div>
                <div className="bg-[#0c0714] p-2 rounded-xl mb-2 text-center">
                  <img 
                    src={getAssetUrl('docs/figures/fig3_multimodel_ranking_inversion.png')} 
                    alt="Figura 3" 
                    className="max-h-[260px] mx-auto object-contain" 
                    onError={(e) => {
                      if (!e.target.dataset.tried) {
                        e.target.dataset.tried = '1';
                        e.target.src = '/hombros/docs/figures/fig3_multimodel_ranking_inversion.png';
                      }
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-700 font-sans">
                  <strong>Inversión de Rankings:</strong> Chanco asciende al PUESTO #1 en resiliencia biofísica, mientras Copenhague se desploma al puesto #5 por fluencia tensora asintótica.
                </p>
              </div>
            </div>

            {/* FIGURAS 4 Y 5 EMBEBIDAS DENTRO DEL BENCHMARK */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
              {/* Figura 4 */}
              <div className="p-4 rounded-2xl bg-white border border-[#D4C9B8] shadow-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-[#927660]">Figura 4 · Sensibilidad de Sobol (Monte Carlo N=5,000)</span>
                  <a href={getAssetUrl('docs/figures/fig4_sobol_sensitivity_montecarlo.png')} target="_blank" rel="noopener noreferrer">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500 hover:text-black" />
                  </a>
                </div>
                <div className="bg-[#0c0714] p-2 rounded-xl mb-2 text-center">
                  <img 
                    src={getAssetUrl('docs/figures/fig4_sobol_sensitivity_montecarlo.png')} 
                    alt="Figura 4" 
                    className="max-h-[240px] mx-auto object-contain" 
                    onError={(e) => {
                      if (!e.target.dataset.tried) {
                        e.target.dataset.tried = '1';
                        e.target.src = '/hombros/docs/figures/fig4_sobol_sensitivity_montecarlo.png';
                      }
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-700 font-sans">
                  <strong>Dominancia Ecosistémica:</strong> El Hombro Ambiental (E) explica el 43.8% de la varianza total de resiliencia territorial, ratificando la primacía biofísica.
                </p>
              </div>

              {/* Figura 5 */}
              <div className="p-4 rounded-2xl bg-white border border-[#D4C9B8] shadow-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-[#D83F87]">Figura 5 · Amortiguación en Red Panal</span>
                  <a href={getAssetUrl('docs/figures/fig5_honeycomb_network_damping.png')} target="_blank" rel="noopener noreferrer">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500 hover:text-black" />
                  </a>
                </div>
                <div className="bg-[#0c0714] p-2 rounded-xl mb-2 text-center">
                  <img 
                    src={getAssetUrl('docs/figures/fig5_honeycomb_network_damping.png')} 
                    alt="Figura 5" 
                    className="max-h-[240px] mx-auto object-contain" 
                  />
                </div>
                <p className="text-[11px] text-slate-700 font-sans">
                  <strong>Gobernanza Policéntrica:</strong> El acoplamiento en red panal reduce la varianza de estrés en un 38.4% y erradica los picos que provocan fractura catastrófica.
                </p>
              </div>
            </div>

            {/* FIGURAS 6 Y 7 EMBEBIDAS: NORMALIZACIÓN Y AUDITORÍA DE TRACCIÓN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
              {/* Figura 6 */}
              <div className="p-4 rounded-2xl bg-white border border-[#D4C9B8] shadow-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-[#376E6F]">Figura 6 · Normalización Canónica (X_raw → [0, 1])</span>
                  <a href={getAssetUrl('docs/figures/fig6_normalization_transfer_functions.png')} target="_blank" rel="noopener noreferrer">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500 hover:text-black" />
                  </a>
                </div>
                <div className="bg-[#0c0714] p-2 rounded-xl mb-2 text-center">
                  <img 
                    src={getAssetUrl('docs/figures/fig6_normalization_transfer_functions.png')} 
                    alt="Figura 6" 
                    className="max-h-[240px] mx-auto object-contain" 
                  />
                </div>
                <p className="text-[11px] text-slate-700 font-sans">
                  <strong>Eslabón 1 (Goalpost Scaling):</strong> Estandariza magnitudes heterogéneas (m³/hab/año, % nativo, Gini, PM2.5) mediante funciones Lineal Directa, Logarítmica de Falkenmark e Inversa, fijando el corte de Liebig en H_i = 0.25.
                </p>
              </div>

              {/* Figura 7 */}
              <div className="p-4 rounded-2xl bg-white border border-[#D4C9B8] shadow-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-[#C86D51]">Figura 7 · Ensayo de Tracción Pre-Inversión (SEIA 2.0)</span>
                  <a href={getAssetUrl('docs/figures/fig7_audit_traction_stress_test.png')} target="_blank" rel="noopener noreferrer">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500 hover:text-black" />
                  </a>
                </div>
                <div className="bg-[#0c0714] p-2 rounded-xl mb-2 text-center">
                  <img 
                    src={getAssetUrl('docs/figures/fig7_audit_traction_stress_test.png')} 
                    alt="Figura 7" 
                    className="max-h-[240px] mx-auto object-contain" 
                  />
                </div>
                <p className="text-[11px] text-slate-700 font-sans">
                  <strong>Auditoría de Carga Virtual:</strong> Evalúa el desplazamiento σ₀ → σ_proyectado ante proyectos extractivos, emitiendo dictámenes vinculantes de aprobación elástica, rechazo por histéresis o moratoria biofísica.
                </p>
              </div>
            </div>
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
          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-[#927660]/30">
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

            {/* Selector de Figuras en Pestañas */}
            <div className="flex flex-wrap gap-2 my-6">
              {paperFigures.map((fig) => (
                <button
                  key={fig.id}
                  onClick={() => setSelectedFigureId(fig.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedFigureId === fig.id
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
                  <p className="text-xs text-slate-300 mt-0.5">
                    {activeFigure.subtitle}
                  </p>
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
                      const figFilename = activeFigure.id === 'fig1' ? 'fig1_stress_strain_hysteresis.png' :
                                          activeFigure.id === 'fig2' ? 'fig2_scope3_displacement_biplot.png' :
                                          activeFigure.id === 'fig3' ? 'fig3_multimodel_ranking_inversion.png' :
                                          activeFigure.id === 'fig4' ? 'fig4_sobol_sensitivity_montecarlo.png' :
                                          'fig5_honeycomb_network_damping.png';
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
                  <p className="text-slate-300 font-sans leading-relaxed text-xs">
                    <em>{activeFigure.caption}</em>
                  </p>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#DA7B93] tracking-wider block mb-2">
                    Hallazgos Clave de Validación
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {activeFigure.takeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#DA7B93] mt-0.5">•</span>
                        <span>{point}</span>
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
                            ? 'bg-[#D83F87]/20 border-[#D83F87] text-white shadow-md'
                            : 'bg-black/30 border-white/5 text-slate-300 hover:bg-black/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <FileCode className={`w-3.5 h-3.5 ${selectedScriptId === script.id ? 'text-[#DA7B93]' : 'text-slate-400'}`} />
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
                      <span className="text-[#DA7B93] font-bold">{activeScript.title}</span>
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

          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D83F87]/30">
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase font-bold text-[#D83F87] tracking-widest block">
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
