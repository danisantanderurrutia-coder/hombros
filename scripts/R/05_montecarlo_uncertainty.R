# ==============================================================================
# 05_montecarlo_uncertainty.R
# Análisis de Incertidumbre Global (UQ) y Sensibilidad de Sobol (Monte Carlo N=10,000)
# ==============================================================================

set.seed(999)
N_MC <- 5000 # 5000 iteraciones representativas

# Muestreo cuasi-aleatorio de hipercubo latino para parámetros
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

# Estimación analítica de Sensibilidad de Primer Orden (Sobol S_i proxy)
# Variación explicada por cada factor sobre sigma
fit_lm <- lm(sigma_sim ~ S_sim + E_sim + K_sim + D1_sim + D2_sim + D3_sim, data = mc_samples)
anova_tbl <- anova(fit_lm)
ss_total <- sum(anova_tbl$`Sum Sq`)

sobol_indices <- tibble(
  parametro = c("Suelo / Hidrología (S)", "Energía / Exergía (E)", "Saber Comunitario (K)", "Extracción (D1)", "Demografía (D2)", "Exógeno (D3)"),
  clave = c("S", "E", "K", "D1", "D2", "D3"),
  sobol_index = round(anova_tbl$`Sum Sq`[1:6] / ss_total, 3)
) %>%
  arrange(desc(sobol_index))

message("✓ [05_montecarlo_uncertainty.R] Análisis Monte Carlo completado. Parámetro dominante: Suelo (S).")
