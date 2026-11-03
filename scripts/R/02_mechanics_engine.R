# ==============================================================================
# 02_mechanics_engine.R
# Motor de Mecánica de Medios Continuos, Leyes Constitutivas y Auditoría de Tracción
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
      S < critical_threshold ~ "Social (S)",
      E < critical_threshold ~ "Ambiental (E)",
      K < critical_threshold ~ "Económico (K)",
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

#' Generación de la Curva Reológica Tensión-Deformación (sigma vs epsilon)
calc_reology_curve <- function(E_modulus = 1.2, sigma_y = 0.85, sigma_ult = 1.25) {
  eps_elastic <- seq(0, sigma_y / E_modulus, length.out = 40)
  sig_elastic <- eps_elastic * E_modulus
  
  eps_plastic <- seq(max(eps_elastic), 1.2, length.out = 60)
  sig_plastic <- sigma_y + 0.40 * (eps_plastic - max(eps_elastic))^0.45
  
  eps_unload_start <- 0.95
  sig_unload_start <- sigma_y + 0.40 * (eps_unload_start - max(eps_elastic))^0.45
  eps_unload <- seq(eps_unload_start, 0.45, length.out = 40)
  sig_unload <- pmax(0, sig_unload_start - E_modulus * 1.1 * (eps_unload_start - eps_unload))
  
  bind_rows(
    tibble(epsilon = eps_elastic, sigma = sig_elastic, branch = "Carga Elástica (Reversible)", regime = "Elástico"),
    tibble(epsilon = eps_plastic, sigma = sig_plastic, branch = "Fluencia & Deformación Plástica", regime = "Plástico"),
    tibble(epsilon = eps_unload, sigma = sig_unload, branch = "Histéresis / Daño Permanente", regime = "Histéresis")
  )
}

#' Auditoría de Ensayo de Tracción Territorial Pre-Inversión (Stress-Test Biofísico)
#' @description Evalúa un proyecto de inversión midiendo el desplazamiento sigma_0 -> sigma_proj
audit_territorial_traction <- function(df_territorios, delta_D = 0.18, delta_E_impact = -0.05) {
  df_territorios %>%
    rowwise() %>%
    mutate(
      H_0 = calc_hombros(S, E, K)$H_effective,
      D_0 = round((D1 + D2 + D3) / 3, 3),
      sigma_0 = round(D_0 / H_0, 3),
      E_proj = pmax(0.05, E + delta_E_impact),
      H_proj = calc_hombros(S, E_proj, K)$H_effective,
      D_proj = round(D_0 + delta_D, 3),
      sigma_proj = round(D_proj / H_proj, 3),
      dictamen = case_when(
        sigma_proj < 0.85 ~ "APROBADO (Margen Elástico)",
        sigma_proj <= 1.00 ~ "CONDICIONADO (Mitigación Simétrica)",
        sigma_proj <= 1.25 ~ "RECHAZADO (Deformación Plástica)",
        TRUE ~ "MORATORIA TOTAL (Fractura de Cuenca)"
      )
    ) %>%
    ungroup()
}

message("✓ [02_mechanics_engine.R] Motor constitutivo, reológico y de auditoría compilado.")
