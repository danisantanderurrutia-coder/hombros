# ==============================================================================
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

message("✓ [00_setup_environment.R] Entorno, paletas y tema canónico cargados.")
