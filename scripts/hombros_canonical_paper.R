# ==============================================================================
# HOMBROS: MODELACIÓN CONTINUA DEL METABOLISMO TERRITORIAL & SINTROPÍA
# Script Canónico de Benchmark, Validación Empírica y Reproducibilidad en R
# Autor: Daniel Santander Urrutia (Geofísico & Permacultor) • Noviembre 2026
# Estilo de Validación IMRAD • R v4.5.2 • tidyverse / ggplot2
# ==============================================================================

suppressPackageStartupMessages({
  library(tidyverse)
  library(ggplot2)
  library(scales)
})

# ------------------------------------------------------------------------------
# 1. FUNCIONES MATEMÁTICAS FUNDAMENTALES DEL MODELO HOMBROS
# ------------------------------------------------------------------------------

#' Cálculo de Capacidad Portante Estructural (H)
#' @description Media geométrica estricta no-compensatoria de los 3 hombros (S, E, K)
#' con Operador de Liebig Generalizado ante quiebre crítico (min < 0.25).
calc_hombros <- function(E, S, K, critical_threshold = 0.25) {
  has_critical <- (E < critical_threshold) | (S < critical_threshold) | (K < critical_threshold)
  H_base <- (E * S * K)^(1/3)
  
  # Operador de Liebig Generalizado
  min_val <- min(E, S, K)
  phi_crit <- ifelse(has_critical, (min_val / critical_threshold) * 0.73, 1.0)
  H_effective <- H_base * phi_crit
  
  tibble(
    H_base = round(H_base, 3),
    H_effective = round(H_effective, 3),
    has_critical = has_critical,
    critical_shoulder = case_when(
      E < critical_threshold ~ "Ambiental (E)",
      S < critical_threshold ~ "Social (S)",
      K < critical_threshold ~ "Económico (K)",
      TRUE ~ "Ninguno"
    )
  )
}

#' Cálculo de Tensión Sistémica Uniaxial (sigma = D / H)
#' @param D Presión de desarrollo (media de D1: extractiva, D2: demográfica, D3: exógena)
#' @param H Capacidad portante efectiva
calc_sigma <- function(D, H, yield_stress = 0.85, fracture_stress = 1.25) {
  sigma <- D / max(0.05, H)
  regime <- case_when(
    sigma < yield_stress ~ "Elástico Reversible",
    sigma <= 1.00 ~ "Límite de Fluencia (Yield)",
    sigma <= fracture_stress ~ "Plástico / Histéresis",
    TRUE ~ "Fractura / Colapso Catastrófico"
  )
  traffic_light <- case_when(
    sigma < yield_stress ~ "Verde (Seguro)",
    sigma <= 1.00 ~ "Amarillo (Alerta)",
    sigma <= fracture_stress ~ "Naranja (Daño Plástico)",
    TRUE ~ "Rojo / Negro (Fractura Total)"
  )
  tibble(
    sigma = round(sigma, 3),
    regime = regime,
    traffic_light = traffic_light,
    is_yield = sigma >= yield_stress,
    is_fracture = sigma >= fracture_stress
  )
}

#' Ciclaje Sintrópico / Derivada Temporal (Gamma)
#' @description Gamma = Delta_H / (H * Delta_t)
calc_gamma <- function(H_t0, H_t1, delta_t_years = 7) {
  delta_H <- H_t1 - H_t0
  gamma <- delta_H / (H_t0 * delta_t_years)
  trajectory <- case_when(
    gamma > 0.005 ~ "Acumulación Sintrópica (+)",
    gamma >= -0.005 ~ "Estacionario / Dinámica Neutra",
    TRUE ~ "Disipación Entrópica (-)"
  )
  tibble(
    gamma = round(gamma, 4),
    trajectory = trajectory
  )
}

# ------------------------------------------------------------------------------
# 2. BANCO DE DATOS EMPÍRICOS: 8 TERRITORIOS (CHILE & EUROPA)
# E: Hombro Ambiental, S: Hombro Social, K: Hombro Económico
# ------------------------------------------------------------------------------

territorios_df <- tribble(
  ~id, ~nombre, ~pais, ~tipo, ~E, ~S, ~K, ~D1, ~D2, ~D3, ~scope1, ~scope2, ~scope3_up, ~scope3_down, ~gini, ~confianza_social,
  "chanco", "Chanco (Maule)", "Chile", "Rural / Secano Costero", 0.78, 0.68, 0.62, 0.40, 0.35, 0.60, 1.8, 0.4, 1.1, 8.4, 0.46, 0.68,
  "aconcagua", "Valle de Aconcagua", "Chile", "Agrícola / Cobre", 0.42, 0.60, 0.58, 0.85, 0.55, 0.64, 2.8, 1.2, 1.8, 12.6, 0.44, 0.52,
  "quintero", "Quintero-Puchuncaví", "Chile", "Zona de Sacrificio", 0.22, 0.48, 0.52, 1.05, 0.65, 0.76, 14.5, 4.2, 3.1, 18.2, 0.48, 0.35,
  "copenhagen", "Copenhague", "Dinamarca", "Metrópolis Post-Carbono", 0.52, 0.92, 0.88, 0.45, 0.95, 0.82, 1.9, 0.8, 8.8, 1.8, 0.26, 0.84,
  "barcelona", "Barcelona", "España", "Metrópolis Mediterránea", 0.45, 0.82, 0.68, 0.40, 0.82, 1.15, 2.4, 1.1, 5.9, 2.4, 0.34, 0.58,
  "bilbao", "Bilbao (Bizkaia)", "España", "Post-Industrial / Cuenca", 0.55, 0.80, 0.72, 0.45, 0.75, 0.78, 2.6, 1.4, 4.7, 3.5, 0.29, 0.71,
  "amsterdam", "Ámsterdam", "Países Bajos", "Hub Logístico / Delta", 0.48, 0.88, 0.82, 0.42, 0.88, 0.98, 2.0, 1.1, 8.2, 2.1, 0.31, 0.79,
  "berlin", "Berlín", "Alemania", "Federal / Polinuclear", 0.58, 0.85, 0.70, 0.40, 0.82, 0.82, 2.5, 1.2, 4.4, 1.9, 0.32, 0.65
)

# ------------------------------------------------------------------------------
# 3. EJECUCIÓN DEL MODELO HOMBROS & MATRIZ COMPARATIVA
# ------------------------------------------------------------------------------

benchmark_results <- territorios_df %>%
  rowwise() %>%
  mutate(
    # Hombros
    hombros = list(calc_hombros(E, S, K)),
    H = hombros$H_effective,
    has_critical = hombros$has_critical,
    critical_col = hombros$critical_shoulder,
    
    # Presión de Desarrollo D (media ortogonal)
    D = round((D1 + D2 + D3) / 3, 3),
    
    # Tensión Sistémica
    mechanics = list(calc_sigma(D, H)),
    sigma = mechanics$sigma,
    regime = mechanics$regime,
    traffic_light = mechanics$traffic_light,
    
    # Emisiones Totales Convencionales vs Protocolo Hombros (con Scope 3 imputado)
    emisiones_territoriales = round(scope1 + scope2, 1),
    emisiones_hombros_metabolico = round(scope1 + scope2 + scope3_up, 1),
    ratio_externalizacion = round((scope3_up / (scope1 + scope2 + scope3_up)) * 100, 1)
  ) %>%
  ungroup()

print(knitr::kable(
  benchmark_results %>% select(nombre, pais, H, D, sigma, regime, emisiones_territoriales, scope3_up, ratio_externalizacion),
  col.names = c("Territorio", "País", "Capacidad (H)", "Presión (D)", "Tensión (σ)", "Régimen Mecánico", "Alc. 1+2 (t)", "Alc. 3 (t)", "Ratio Ext (%)"),
  caption = "Tabla 1: Benchmark Multiterritorial Canónico HOMBROS (N=8)"
))

# ------------------------------------------------------------------------------
# 4. GRÁFICO REPRODUCIBLE EN GGPLOT2: CURVA DE TENSIÓN VS EMISIONES METABÓLICAS
# ------------------------------------------------------------------------------

p1 <- ggplot(benchmark_results, aes(x = sigma, y = emisiones_hombros_metabolico, color = pais, label = nombre)) +
  geom_vline(xintercept = 0.85, linetype = "dashed", color = "#D83F87", alpha = 0.7) +
  geom_vline(xintercept = 1.00, linetype = "dotdash", color = "#facc15", alpha = 0.7) +
  geom_vline(xintercept = 1.25, linetype = "dotted", color = "#ef4444", alpha = 0.9) +
  geom_point(aes(size = D), alpha = 0.85) +
  geom_text(vjust = -0.8, size = 3.3, fontface = "bold", show.legend = FALSE) +
  scale_color_manual(values = c("Chile" = "#D83F87", "Dinamarca" = "#376E6F", "España" = "#DA7B93", "Países Bajos" = "#8D69A6", "Alemania" = "#2F4454")) +
  annotate("text", x = 0.86, y = 20, label = "Yield (σ = 0.85)", color = "#D83F87", hjust = 0, size = 2.8, fontface = "italic") +
  annotate("text", x = 1.26, y = 20, label = "Fractura (σ = 1.25)", color = "#ef4444", hjust = 0, size = 2.8, fontface = "italic") +
  labs(
    title = "HOMBROS · Tensión Sistémica (σ) vs Huella Metabólica Total (t CO2e)",
    subtitle = "Demostración de la Paradoja de Transferencia Entrópica Scope 3 (Chile vs Europa)",
    x = "Tensión Sistémica σ = D / H",
    y = "Emisiones Metabólicas Totales (Alcance 1 + 2 + 3 Upstream) [t CO2e/hab/año]",
    size = "Presión (D)",
    color = "País"
  ) +
  theme_minimal(base_family = "sans") +
  theme(
    plot.background = element_rect(fill = "#140a1d", color = NA),
    panel.background = element_rect(fill = "#1d122b", color = "#44318D"),
    text = element_text(color = "#f8fafc"),
    axis.text = element_text(color = "#A4B3B6"),
    panel.grid.major = element_line(color = "#ffffff15"),
    panel.grid.minor = element_blank(),
    legend.position = "bottom"
  )

# Guardar figura de alta resolución
dir.create("public/docs", showWarnings = FALSE, recursive = TRUE)
ggsave("public/docs/figura_1_benchmark_hombros.png", p1, width = 10, height = 6, dpi = 300)
message("✓ Script Canónico de Validación R compilado con éxito. Gráfico guardado en public/docs/figura_1_benchmark_hombros.png")
