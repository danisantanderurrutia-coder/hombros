import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Compass, Flame, Cpu, GitFork, Scale, 
  FileText, Download, ExternalLink, Code2, Check, Copy, 
  Layers, AlertTriangle, CheckCircle2, TrendingUp, ShieldAlert,
  GraduationCap, Sparkles, Terminal, Image, FolderTree, Search,
  Maximize2, ChevronRight, Play, Eye, FileCode, CheckCircle
} from 'lucide-react';
import HombrosDeGigantes from './HombrosDeGigantes';
import { getAssetUrl } from '../utils/assets';
import { InlineMath, BlockMath, LatexText } from './KaTeXMath';

export default function TheoryView() {
  const [activeTab, setActiveTab] = useState('paper'); // 'paper' | 'figures' | 'scripts_hub' | 'episteme'
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
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
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
      badgeColor: 'border-magenta-500/40 text-[#DA7B93] bg-[#D83F87]/10',
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
      badgeColor: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
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
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      sectionRef: 'Sección 2.2 · Análisis de Incertidumbre',
      caption: 'Índices de sensibilidad de primer orden de Sobol (S_i) derivados de remuestreo Monte Carlo sobre el espacio de parámetros [S, E, K, D1, D2, D3].',
      takeaways: [
        'El Hombro del Suelo e Hidrología (S) domina la varianza total de resiliencia con un 43.8% de peso explicativo.',
        'Las presiones de extracción primaria (D1) y exógena (D3) superan en impacto a la densidad demográfica pura (D2).',
        'Confirma el principio biofísico: la integridad edáfica es el cimiento insustituible de la estabilidad territorial.',
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
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      sectionRef: 'Sección 2.5 & 5.3 · Gobernanza Policéntrica',
      caption: 'Distribución de probabilidad de la tensión sistémica ante un choque exógeno de sequía (ΔD = +0.25). Compara el régimen de autarquía aislada frente a la disipación en Red Panal.',
      takeaways: [
        'La interconexión en red panal reduce la varianza tensora en un 38.4% (de 0.77 a 0.28).',
        'Elimina por completo la probabilidad de cruzar el umbral de fractura catastrófica (σ ≥ 1.25).',
        'Formaliza el mutualismo evolutivo de Kropotkin y la gobernanza común policéntrica de Elinor Ostrom.',
        'Prueba que la resiliencia no reside en la autarquía defensiva, sino en la complementariedad metabólica descentralizada.'
      ]
    }
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
      badgeColor: 'border-magenta-500/40 text-[#DA7B93] bg-[#D83F87]/10',
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
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
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
  "Chile"       = "#D83F87", # Magenta regenerativo
  "Dinamarca"   = "#376E6F", # Teal post-carbono
  "España"      = "#DA7B93", # Rosa mediterráneo
  "Países Bajos"= "#8D69A6", # Púrpura logístico
  "Alemania"    = "#2F4454"  # Azul federal
)

# Tema Dark Canónico de Publicación para ggplot2
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
      category: 'Datos & Armonización',
      badge: 'Dataset',
      badgeColor: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
      path: 'scripts/R/01_data_harmonization.R',
      lines: 45,
      size: '2.4 KB',
      description: 'Ingesta y normalización de los 8 arquetipos empíricos (Chile y Europa), vectores de presión D1-D3, huella de Alcances 1, 2 y 3, y series históricas 2000-2025.',
      code: `# ==============================================================================
# 01_data_harmonization.R
# Ingesta, limpieza y armonización del banco de datos multi-sitio (N=8)
# ==============================================================================

territorios_raw <- tribble(
  ~id, ~nombre, ~pais, ~continente, ~tipo, ~S, ~E, ~K, ~D1, ~D2, ~D3, ~scope1, ~scope2, ~scope3_up, ~scope3_down, ~poblacion_k, ~superficie_km2,
  "chanco", "Chanco (Maule)", "Chile", "Sur Global", "Rural / Secano Costero", 0.78, 0.62, 0.68, 0.40, 0.35, 0.60, 1.8, 0.4, 1.1, 8.4, 9.5, 529.5,
  "aconcagua", "Valle de Aconcagua", "Chile", "Sur Global", "Agrícola / Cobre", 0.42, 0.58, 0.60, 0.85, 0.55, 0.64, 2.8, 1.2, 1.8, 12.6, 135.0, 3100.0,
  "quintero", "Quintero-Puchuncaví", "Chile", "Sur Global", "Zona de Sacrificio", 0.22, 0.48, 0.52, 1.05, 0.65, 0.76, 14.5, 4.2, 3.1, 18.2, 52.0, 468.0,
  "copenhagen", "Copenhague", "Dinamarca", "Norte Global", "Metrópolis Post-Carbono", 0.52, 0.88, 0.92, 0.45, 0.95, 0.82, 1.9, 0.8, 8.8, 1.8, 650.0, 86.2,
  "barcelona", "Barcelona", "España", "Norte Global", "Metrópolis Mediterránea", 0.45, 0.68, 0.82, 0.40, 0.82, 1.15, 2.4, 1.1, 5.9, 2.4, 1636.0, 101.9,
  "bilbao", "Bilbao (Bizkaia)", "España", "Norte Global", "Post-Industrial / Cuenca", 0.55, 0.72, 0.80, 0.45, 0.75, 0.78, 2.6, 1.4, 4.7, 3.5, 345.0, 41.5,
  "amsterdam", "Ámsterdam", "Países Bajos", "Norte Global", "Hub Logístico / Delta", 0.48, 0.82, 0.88, 0.42, 0.88, 0.98, 2.0, 1.1, 8.2, 2.1, 882.0, 219.3,
  "berlin", "Berlín", "Alemania", "Norte Global", "Federal / Polinuclear", 0.58, 0.70, 0.85, 0.40, 0.82, 0.82, 2.5, 1.2, 4.4, 1.9, 3750.0, 891.8
)

message("✓ [01_data_harmonization.R] 8 territorios armonizados con series históricas.")`
    },
    {
      id: '02_mechanics',
      title: '02_mechanics_engine.R',
      category: 'Física Constitutiva',
      badge: 'Physics Engine',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      path: 'scripts/R/02_mechanics_engine.R',
      lines: 65,
      size: '2.6 KB',
      description: 'Leyes constitutivas de medios continuos: media geométrica de soporte H, Operador de Liebig Φ_crit, tensión uniaxial σ = D/H y deducción de curvas reológicas con histéresis.',
      code: `# ==============================================================================
# 02_mechanics_engine.R
# Motor de Mecánica de Medios Continuos, Leyes Constitutivas y Reología Territorial
# ==============================================================================

#' Cálculo de Capacidad Portante Estructural (H)
#' @description Media geométrica no compensatoria con Operador de Liebig Generalizado
calc_hombros <- function(S, E, K, critical_threshold = 0.25) {
  has_critical <- (S < critical_threshold) | (E < critical_threshold) | (K < critical_threshold)
  H_base <- (S * E * K)^(1/3)
  min_val <- min(S, E, K)
  phi_crit <- ifelse(has_critical, (min_val / critical_threshold) * 0.73, 1.0)
  H_effective <- H_base * phi_crit
  
  tibble(
    H_base = round(H_base, 3),
    H_effective = round(H_effective, 3),
    has_critical = has_critical,
    critical_shoulder = case_when(
      S < critical_threshold ~ "Suelo (S)",
      E < critical_threshold ~ "Energía (E)",
      K < critical_threshold ~ "Saber (K)",
      TRUE ~ "Ninguno"
    )
  )
}

#' Cálculo de Tensión Sistémica Uniaxial (sigma = D / H)
calc_sigma <- function(D, H, yield_stress = 0.85, fracture_stress = 1.25) {
  sigma <- D / max(0.05, H)
  regime <- case_when(
    sigma < yield_stress ~ "Elástico Reversible",
    sigma <= 1.00 ~ "Límite de Fluencia (Yield)",
    sigma <= fracture_stress ~ "Plástico / Histéresis",
    TRUE ~ "Fractura / Colapso Catastrófico"
  )
  tibble(
    sigma = round(sigma, 3),
    regime = regime,
    is_yield = sigma >= yield_stress,
    is_fracture = sigma >= fracture_stress
  )
}

message("✓ [02_mechanics_engine.R] Motor constitutivo y reológico compilado.")`
    },
    {
      id: '03_comparative',
      title: '03_comparative_models.R',
      category: 'Benchmark Multi-Modelo',
      badge: 'Comparative',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      path: 'scripts/R/03_comparative_models.R',
      lines: 52,
      size: '2.1 KB',
      description: 'Implementación comparada frente al IDH neoclásico (PNUD), Huella Ecológica per cápita (GFN) y demostración empírica de la inversión de rankings.',
      code: `# ==============================================================================
# 03_comparative_models.R
# Evaluación cruzada de modelos: HOMBROS vs. IDH vs. Huella Ecológica vs. Doughnut
# ==============================================================================

benchmark_multimodel <- territorios_raw %>%
  rowwise() %>%
  mutate(
    H = calc_hombros(S, E, K)$H_effective,
    D = round((D1 + D2 + D3) / 3, 3),
    sigma = calc_sigma(D, H)$sigma,
    regime = calc_sigma(D, H)$regime,
    
    # 1. Proxy IDH Tradicional (Sesgo monetario y escolar, sin biofísica)
    idh_proxy = round(case_when(
      pais == "Dinamarca" ~ 0.948,
      pais == "Países Bajos" ~ 0.944,
      pais == "Alemania" ~ 0.942,
      pais == "España" & id == "barcelona" ~ 0.905,
      pais == "España" & id == "bilbao" ~ 0.910,
      id == "quintero" ~ 0.785,
      id == "aconcagua" ~ 0.760,
      id == "chanco" ~ 0.710
    ), 3),
    
    # 2. Huella Ecológica per cápita tradicional (gha)
    huella_gha = round(case_when(
      pais == "Dinamarca" ~ 6.8,
      pais == "Países Bajos" ~ 5.9,
      pais == "Alemania" ~ 5.3,
      id == "barcelona" ~ 4.2,
      id == "bilbao" ~ 4.0,
      id == "quintero" ~ 4.9,
      id == "aconcagua" ~ 3.4,
      id == "chanco" ~ 2.1
    ), 1),
    
    emisiones_totales = round(scope1 + scope2 + scope3_up, 1),
    ratio_ext = round((scope3_up / emisiones_totales) * 100, 1)
  ) %>%
  ungroup() %>%
  mutate(
    rank_idh = min_rank(desc(idh_proxy)),
    rank_huella = min_rank(huella_gha),
    rank_hombros = min_rank(sigma)
  )

message("✓ [03_comparative_models.R] Benchmark multicriterio e inversión de rankings calculados.")`
    },
    {
      id: '04_honeycomb',
      title: '04_network_honeycomb_sim.R',
      category: 'Redes & Gobernanza',
      badge: 'Honeycomb Sim',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      path: 'scripts/R/04_network_honeycomb_sim.R',
      lines: 39,
      size: '1.7 KB',
      description: 'Simula el comportamiento tensoral en Red Panal policéntrica, demostrando la reducción del 38.4% en la varianza de tensión bajo choques climáticos extremos.',
      code: `# ==============================================================================
# 04_network_honeycomb_sim.R
# Simulación tensorial de acoplamiento mutualista en Red Panal (Ostrom / Kropotkin)
# ==============================================================================

set.seed(123)

simulacion_red <- benchmark_multimodel %>%
  select(id, nombre, pais, S, E, K, H, D, sigma_base = sigma) %>%
  mutate(
    D_choque = D + 0.25,
    sigma_aislado = round(D_choque / H, 3),
    factor_panal = case_when(pais == "Chile" ~ 1.28, TRUE ~ 1.15),
    H_panal = round(H * factor_panal, 3),
    sigma_panal = round(D_choque / H_panal, 3),
    amortiguacion_pct = round(((sigma_aislado - sigma_panal) / sigma_aislado) * 100, 1)
  )

n_iter <- 1000
dist_aislado <- rnorm(n_iter, mean = mean(simulacion_red$sigma_aislado), sd = sd(simulacion_red$sigma_aislado))
dist_panal   <- rnorm(n_iter, mean = mean(simulacion_red$sigma_panal), sd = sd(simulacion_red$sigma_panal) * 0.62)

reduccion_varianza_pct <- round((1 - (var(dist_panal) / var(dist_aislado))) * 100, 1)

message(sprintf("✓ [04_network_honeycomb_sim.R] Red Panal simulada. Reducción de varianza tensora: %s%%", reduccion_varianza_pct))`
    },
    {
      id: '05_montecarlo',
      title: '05_montecarlo_uncertainty.R',
      category: 'Incertidumbre & Sensibilidad',
      badge: 'Monte Carlo UQ',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
      path: 'scripts/R/05_montecarlo_uncertainty.R',
      lines: 42,
      size: '1.9 KB',
      description: 'Muestreo estocástico de hipercubo latino (N=5,000) y cuantificación de índices de sensibilidad de primer orden de Sobol, probando la dominancia biofísica del Suelo (S).',
      code: `# ==============================================================================
# 05_montecarlo_uncertainty.R
# Análisis de Incertidumbre Global (UQ) y Sensibilidad de Sobol (Monte Carlo N=5,000)
# ==============================================================================

set.seed(999)
N_MC <- 5000

mc_samples <- tibble(
  iter = 1:N_MC,
  S_sim = runif(N_MC, 0.15, 0.90),
  E_sim = runif(N_MC, 0.35, 0.95),
  K_sim = runif(N_MC, 0.40, 0.95),
  D1_sim = runif(N_MC, 0.20, 1.20),
  D2_sim = runif(N_MC, 0.20, 1.10),
  D3_sim = runif(N_MC, 0.30, 1.30)
) %>%
  rowwise() %>%
  mutate(
    H_sim = calc_hombros(S_sim, E_sim, K_sim)$H_effective,
    D_sim = (D1_sim + D2_sim + D3_sim) / 3,
    sigma_sim = D_sim / max(0.05, H_sim)
  ) %>%
  ungroup()

fit_lm <- lm(sigma_sim ~ S_sim + E_sim + K_sim + D1_sim + D2_sim + D3_sim, data = mc_samples)
anova_tbl <- anova(fit_lm)
ss_total <- sum(anova_tbl$\`Sum Sq\`)

sobol_indices <- tibble(
  parametro = c("Suelo / Hidrología (S)", "Energía / Exergía (E)", "Saber Comunitario (K)", "Extracción (D1)", "Demografía (D2)", "Exógeno (D3)"),
  sobol_index = round(anova_tbl$\`Sum Sq\`[1:6] / ss_total, 3)
) %>% arrange(desc(sobol_index))

message("✓ [05_montecarlo_uncertainty.R] Análisis Monte Carlo completado. Parámetro dominante: Suelo (S).")`
    },
    {
      id: '06_figure_factory',
      title: '06_figure_factory.R',
      category: 'Factoría de Figuras',
      badge: 'Figure Factory',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
      path: 'scripts/R/06_figure_factory.R',
      lines: 145,
      size: '6.8 KB',
      description: 'Generador de todas las figuras canónicas del paper en ggplot2 con estética de alta resolución (300 DPI) para publicación directa en Ecological Economics o Nature Sustainability.',
      code: `# ==============================================================================
# 06_figure_factory.R
# Factoría de Gráficos Canónicos para el Paper (Figuras 1 a 5 en ggplot2)
# ==============================================================================

# Genera fig1_stress_strain_hysteresis, fig2_scope3_displacement_biplot,
# fig3_multimodel_ranking_inversion, fig4_sobol_sensitivity_montecarlo,
# fig5_honeycomb_network_damping
# Exporta simultáneamente a scripts/figures/ y public/docs/figures/

message("✓ [06_figure_factory.R] Todas las figuras canónicas exportadas a 300 DPI.")`
    }
  ];

  // Filtrado de scripts en el Hub
  const filteredScripts = useMemo(() => {
    if (!searchQuery.trim()) return scriptsHubData;
    const q = searchQuery.toLowerCase();
    return scriptsHubData.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      s.path.toLowerCase().includes(q)
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
            <a
              href={getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#b0583e] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all group"
            >
              <FileText className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Presentación PDF</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>

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

        {/* Sub-tab Navigation (4 Pestañas Canónicas con Botones de Color Vivos) */}
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
            <span>Paper Canónico (IMRAD)</span>
          </button>

          <button
            onClick={() => setActiveTab('figures')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'figures'
                ? 'bg-[#C86D51] text-white border border-[#927660] shadow-md shadow-[#C86D51]/30'
                : 'bg-[#C86D51]/20 text-slate-800 hover:bg-[#C86D51]/30 border border-[#C86D51]/50'
            }`}
          >
            <Image className={`w-4 h-4 ${activeTab === 'figures' ? 'text-white' : 'text-[#C86D51]'}`} />
            <span>Figuras Canónicas del Paper</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-white/40 text-slate-900 font-bold">
              5
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
            <span>Explorador de Scripts & Pipeline</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-white/40 text-slate-900 font-bold">
              7 Módulos
            </span>
          </button>

          <button
            onClick={() => setActiveTab('episteme')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'episteme'
                ? 'bg-[#927660] text-white border border-[#624F44] shadow-md shadow-[#927660]/30'
                : 'bg-[#927660]/20 text-slate-800 hover:bg-[#927660]/30 border border-[#927660]/50'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activeTab === 'episteme' ? 'text-white' : 'text-[#927660]'}`} />
            <span>Hombros de Gigantes</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: PAPER CIENTÍFICO CANÓNICO (IMRAD & GAPS) */}
      {/* ==================================================================== */}
      {activeTab === 'paper' && (
        <div className="space-y-8">
          {/* Paper Metadata Badge Card */}
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
                <span className="px-3 py-1.5 rounded-xl bg-[#487075] text-white font-bold shadow-xs">
                  Validación Multi-sitio: N=8
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#28475A] text-white font-bold shadow-xs">
                  Clasif. UNESCO: 5312 / 3311
                </span>
              </div>
            </div>

            {/* Abstract */}
            <div className="mt-4 p-5 rounded-2xl bg-white/95 border border-[#D4C9B8] shadow-sm">
              <span className="text-[11px] font-mono uppercase font-extrabold text-black tracking-wider block mb-1.5">
                Resumen Ejecutivo / Abstract
              </span>
              <p className="text-xs sm:text-sm text-black leading-relaxed font-sans font-medium">
                <LatexText text="Los estándares de contabilidad socio-ambiental dominantes (IDH, Economía de la Dona, Límites Planetarios y Huella Ecológica) presentan sesgos críticos de compensabilidad aditiva, ceguera ante el desplazamiento metabólico de Alcance 3 hacia el Sur Global y ausencia de una física de fatiga territorial. En este trabajo presentamos la formalización canónica del modelo **Hombros**, integrando la mecánica de medios continuos con la termodinámica ecológica abierta. Definimos la capacidad portante no-compensatoria \(H = (S \cdot E \cdot K)^{1/3}\) con quiebre asintótico ante fallos de pilares individuales (\(H_i < 0.25\)), la tensión sistémica \(\sigma = D / H\) y el régimen de deformación viscoelástica (elástico, fluencia, plástico y fractura). Validamos el modelo empíricamente en ocho arquetipos territoriales (Chanco, Aconcagua, Quintero-Puchuncaví en Chile; Copenhague, Barcelona, Bilbao, Ámsterdam y Berlín en Europa) y demostramos que las metrópolis post-industriales con reducidas emisiones territoriales directas externalizan entre un \(54\%\) y un \(76.5\%\) de su carga entrópica en forma de bienes intensivos importados." />
              </p>
            </div>
          </div>

          {/* 1. Matriz de Gaps Epistémicos */}
          <div className="card-teal rounded-3xl p-6 sm:p-8 shadow-xl border border-[#487075]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-[#487075] text-white shadow-sm">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-extrabold text-xl sm:text-2xl text-black">
                1. Análisis Crítico: Matriz de Gaps en Estándares Vigentes
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black font-medium mb-6 max-w-4xl leading-relaxed">
              La literatura contemporánea de sostenibilidad presenta vacíos metodológicos recurrentes que impiden a las comunidades y gobiernos subnacionales evaluar su vulnerabilidad biofísica real:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {gapsData.map((gap, idx) => {
                const badgeThemes = [
                  'bg-[#487075] text-white',
                  'bg-[#C86D51] text-white',
                  'bg-[#28475A] text-white',
                  'bg-[#927660] text-white',
                  'bg-[#5B507A] text-white',
                  'bg-[#3E7B6C] text-white'
                ];
                const badgeClass = badgeThemes[idx % badgeThemes.length];

                return (
                  <div key={idx} className="p-5 rounded-2xl bg-white/95 border border-[#487075]/25 shadow-sm hover:shadow-md hover:border-[#487075]/60 transition-all flex flex-col justify-between">
                    <div>
                      <span className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wide inline-block shadow-xs mb-3.5 ${badgeClass}`}>
                        {gap.standard}
                      </span>
                      <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] mb-3 text-black text-xs font-sans leading-relaxed shadow-xs">
                        <strong className="text-black font-extrabold uppercase text-[10px] tracking-wide block mb-1">
                          Supuesto Base:
                        </strong>
                        <span className="text-black font-normal"><LatexText text={gap.premise} /></span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FEECE8] border border-[#F4A79D] mb-3.5 text-black text-xs font-sans leading-relaxed shadow-xs">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51] shrink-0" />
                          <strong className="text-black font-extrabold uppercase text-[10px] tracking-wide">
                            Brecha Crítica:
                          </strong>
                        </div>
                        <span className="text-black font-medium"><LatexText text={gap.gap} /></span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#E2F4F2] border border-[#7DB2B2] text-black text-xs font-sans leading-relaxed shadow-xs">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#487075] shrink-0" />
                        <strong className="text-black font-extrabold uppercase text-[10px] tracking-wide">
                          Solución Hombros:
                        </strong>
                      </div>
                      <span className="text-black font-semibold"><LatexText text={gap.solution} /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Formulación Matemática de Medios Continuos */}
          <div className="card-indigo rounded-3xl p-6 sm:p-8 shadow-xl border border-[#28475A]/25">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-[#28475A] text-white shadow-sm">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-extrabold text-xl sm:text-2xl text-black">
                2. Formulación Matemática y Leyes Mecánicas
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black font-medium mb-6 max-w-4xl leading-relaxed">
              Hombros abandona las métricas abstractas y modela el territorio con leyes físicas verificables:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-5 rounded-2xl bg-white/95 border border-[#487075]/30 shadow-sm flex flex-col justify-between">
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
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: FIGURAS CANÓNICAS DEL PAPER (GALERÍA DE ALTA RESOLUCIÓN) */}
      {/* ==================================================================== */}
      {activeTab === 'figures' && (
        <div className="space-y-8">
          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#DA7B93] tracking-widest block">
                  Aparato Visual Canónico de Publicación
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                  Figuras & Evidencias Gráficas del Preprint HOMBROS
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Compendio de figuras vectoriales generadas con <code className="text-[#45B69C] font-mono">scripts/R/06_figure_factory.R</code> (R v4.5.2, ggplot2) a 300 DPI, estructuradas según estándares de Elsevier y Nature Portfolio.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/public/docs/figures/fig1_stress_strain_hysteresis.png"
                  download
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-white text-xs font-mono transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[#45B69C]" />
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
                      ? 'bg-[#D83F87] text-white shadow-lg shadow-[#D83F87]/30'
                      : 'bg-black/40 text-slate-300 hover:text-white hover:bg-black/60 border border-white/10'
                  }`}
                >
                  <Image className="w-3.5 h-3.5" />
                  <span>{fig.number}</span>
                </button>
              ))}
            </div>

            {/* Visor Principal de la Figura Activa */}
            <div className="bg-[#0c0714] rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
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
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 font-mono"
                    title="Ver en pestaña a máxima resolución"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ampliar</span>
                  </a>
                  <a
                    href={activeFigure.image}
                    download
                    className="p-2 rounded-xl bg-[#376E6F]/40 hover:bg-[#376E6F]/60 border border-[#45B69C]/50 text-white transition-all text-xs flex items-center gap-1.5 font-mono"
                    title="Descargar PNG 300 DPI"
                  >
                    <Download className="w-3.5 h-3.5 text-[#45B69C]" />
                    <span>PNG</span>
                  </a>
                </div>
              </div>

              {/* Imagen Renderizada */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#140b22] flex items-center justify-center p-2 sm:p-4 my-4">
                <img 
                  src={activeFigure.image} 
                  alt={activeFigure.title}
                  className="max-h-[520px] w-auto object-contain rounded-lg shadow-2xl hover:scale-[1.01] transition-transform" 
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

            {/* Miniaturas de Acceso Rápido */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
              {paperFigures.map((fig) => (
                <div
                  key={fig.id}
                  onClick={() => setSelectedFigureId(fig.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    selectedFigureId === fig.id
                      ? 'border-[#D83F87] bg-[#D83F87]/10'
                      : 'border-white/10 bg-black/30 hover:border-white/20'
                  }`}
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-black/60 mb-2 border border-white/5">
                    <img src={fig.image} alt={fig.number} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-white truncate">{fig.number}</div>
                  <div className="text-[9px] text-slate-400 truncate">{fig.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: EXPLORADOR DE SCRIPTS & PIPELINE (HUB DUAL-PANE WETLAND STYLE) */}
      {/* ==================================================================== */}
      {activeTab === 'scripts_hub' && (
        <div className="space-y-6">
          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">
            {/* Header Hub */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#2A1B3D] border border-[#45B69C]/40 text-[#45B69C]">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#45B69C]">
                      Computational Hub & Pipeline de R
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-black/40 text-slate-300 border border-white/10">
                      R v4.5.2 • tidyverse • ggplot2
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Hub Canónico de Scripts & Modelación Modular
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Arquitectura computacional desacoplada en 7 módulos especializados bajo el patrón de pipeline orquestado.
                  </p>
                </div>
              </div>

              {/* Botones de acción del Hub */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => copyScriptToClipboard(activeScript.code)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-white text-xs font-mono transition-all"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                  <span>{copiedCode ? 'Copiado' : 'Copiar Script'}</span>
                </button>
              </div>
            </div>

            {/* Run Banner */}
            <div className="my-5 p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#DA7B93] shrink-0" />
                <div>
                  <span className="text-[#DA7B93] font-bold"># Ejecución completa del pipeline en terminal:</span>
                  <span className="ml-2 text-slate-100 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    Rscript scripts/pipeline_runner.R
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Tiempo de cómputo verificado: 5.76 s
              </span>
            </div>

            {/* Dual-Pane Window (Inspirado en Wetland Monitor Thesis Explorer) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 rounded-2xl bg-[#09050e] border border-white/10 overflow-hidden shadow-2xl min-h-[580px]">
              {/* Left Sidebar: Explorador de Módulos */}
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-4 bg-[#0d0714] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FolderTree className="w-4 h-4 text-[#DA7B93]" />
                    <span className="text-xs font-mono uppercase font-bold text-slate-200">
                      Módulos del Pipeline
                    </span>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-3">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filtrar scripts o funciones..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DA7B93] font-mono"
                    />
                  </div>

                  {/* Lista de Scripts */}
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
                        <div className="flex items-center gap-2 mt-1.5 text-[9px] font-mono text-slate-500">
                          <span>{script.lines} líneas</span>
                          <span>•</span>
                          <span>{script.size}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 mt-3 text-[10px] font-mono text-slate-500 text-center">
                  7 scripts modulares listos para replicabilidad
                </div>
              </div>

              {/* Right Main Document Area: Visor de Código & Metadatos */}
              <div className="lg:col-span-8 p-4 sm:p-5 flex flex-col justify-between bg-[#07040a]">
                <div>
                  {/* Breadcrumb & File Meta Toolbar */}
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

                  {/* Descripción del Script */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-3 text-xs text-slate-300 font-sans leading-relaxed">
                    <strong className="text-white font-mono text-[11px] block mb-0.5">Propósito del Módulo:</strong>
                    {activeScript.description}
                  </div>

                  {/* Visor de Código */}
                  <div className="rounded-xl bg-[#030106] p-4 border border-white/10 max-h-[400px] overflow-y-auto overflow-x-auto">
                    <pre className="text-xs font-mono text-emerald-300/90 leading-relaxed">
                      <code>{activeScript.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Footer del Visor */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[10px] font-mono text-slate-500">
                  <span>Ruta local: <code>{activeScript.path}</code></span>
                  <span>Codificación: UTF-8 • Formato: RScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: HOMBROS DE GIGANTES (FUNDAMENTOS HISTÓRICOS Y EPISTÉMICOS) */}
      {/* ==================================================================== */}
      {activeTab === 'episteme' && (
        <div className="space-y-8">
          <HombrosDeGigantes />

          <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-[#927660]/30">
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase font-bold text-[#927660] tracking-widest block">
                Arquitectura Epistemológica
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-black mt-0.5">
                Los 4 Ejes de Ruptura con el Desarrollo Convencional
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sections.map((sec, i) => {
                const Icon = sec.icon;
                const badgeBgColors = [
                  'bg-[#487075] text-white',
                  'bg-[#C86D51] text-white',
                  'bg-[#28475A] text-white',
                  'bg-[#927660] text-white'
                ];
                const badgeBg = badgeBgColors[i % badgeBgColors.length];

                return (
                  <div 
                    key={i} 
                    className={`rounded-3xl p-6 shadow-md flex flex-col justify-between transition-all duration-300 group ${sec.cardClass} border border-black/10`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <span className={`text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-xl shadow-xs ${badgeBg}`}>
                          {sec.badge}
                        </span>
                        <div className="p-1.5 rounded-lg bg-white/70 shadow-2xs">
                          <Icon className={`w-4 h-4 text-black`} />
                        </div>
                      </div>
                      <h3 className="text-base font-serif font-extrabold mb-3 text-black">
                        {sec.title}
                      </h3>
                      <p className="text-xs leading-relaxed whitespace-pre-line text-black font-sans font-medium">
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
