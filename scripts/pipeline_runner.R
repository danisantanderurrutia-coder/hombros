# ==============================================================================
# PIPELINE_RUNNER.R
# Orquestador Maestro de Investigación · Proyecto HOMBROS
# Ejecución modular completa del Benchmark, Modelos y Figuras Canónicas
# Autor: Daniel Santander Urrutia (Geofísico & Permacultor) • Noviembre 2026
# R v4.5.2 • tidyverse / ggplot2 / scales
# ==============================================================================

cat("\n")
cat("=================================================================\n")
cat("   HOMBROS CANONICAL RESEARCH PIPELINE · EJECUCIÓN MODULAR v1.0  \n")
cat("=================================================================\n\n")

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

# 8. Módulo Práctico Paper 2: Kit Audita tu Cuenca & Ensayo de Tracción SEIA 2.0
source("scripts/R/07_kit_audita_tu_cuenca.R")

elapsed <- round(difftime(Sys.time(), start_time, units = "secs"), 2)

cat("\n=================================================================\n")
cat(sprintf("✓ PIPELINE HOMBROS COMPLETADO CON ÉXITO EN %s SEGUNDOS\n", elapsed))
cat("  - Figuras exportadas a: scripts/figures/ y public/docs/figures/\n")
cat("  - Benchmark disponible en: public/docs/PAPER_CIENTIFICO_HOMBROS_METODOLOGIA_Y_GAPS.md\n")
cat("=================================================================\n\n")
