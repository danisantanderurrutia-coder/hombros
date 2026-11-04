# ==============================================================================
# 07_kit_audita_tu_cuenca.R
# Script Canónico del Paper 2: Kit Audita tu Propia Cuenca
# Protocolo de Auditoría Biofísica Comunitaria, Gemelo Digital y Ensayo de Tracción SEIA 2.0
# Autor: Daniel Santander Urrutia (Geofísico & Permacultor) • Proyecto Hombros
# Noviembre 2026 • R v4.5.2 • tidyverse / jsonlite
# ==============================================================================

suppressPackageStartupMessages({
  library(tidyverse)
  library(jsonlite)
})

message("======================================================================")
message("   HOMBROS · KIT AUDITA TU PROPIA CUENCA (PROTOCOLO SEIA 2.0)        ")
message("   Motor de Ensayo de Tracción Territorial y Dictamen Pre-Inversional ")
message("======================================================================")

# ------------------------------------------------------------------------------
# 1. FUNCIONES CANÓNICAS DE EVALUACIÓN BIOFÍSICA
# ------------------------------------------------------------------------------

#' Calcula la Capacidad Portante no compensatoria con corte de Liebig
calc_hombros_capacity <- function(E, S, K, critical_threshold = 0.25) {
  has_critical <- (E < critical_threshold) | (S < critical_threshold) | (K < critical_threshold)
  H_base <- (E * S * K)^(1/3)
  
  min_val <- min(E, S, K)
  phi_crit <- ifelse(has_critical, (min_val / critical_threshold) * 0.73, 1.0)
  H_effective <- H_base * phi_crit
  
  critical_name <- case_when(
    E < critical_threshold ~ "Ambiental / Ecosistémico (E)",
    S < critical_threshold ~ "Social (S)",
    K < critical_threshold ~ "Económico (K)",
    TRUE ~ "Ninguno (Solvente)"
  )
  
  list(
    H_base = round(H_base, 3),
    H_effective = round(H_effective, 3),
    phi_crit = round(phi_crit, 3),
    has_critical = has_critical,
    critical_shoulder = critical_name
  )
}

#' Calcula la Tensión Sistémica de Cauchy (sigma = D / (H * (1 + kappa)))
calc_cauchy_stress <- function(D, H, kappa = 0.0, yield_stress = 0.85, fracture_stress = 1.25) {
  H_damped <- max(0.04, H * (1 + kappa))
  sigma <- round(D / H_damped, 3)
  
  regime <- case_when(
    sigma < yield_stress ~ "Elástico Reversible (Seguro)",
    sigma <= 1.00 ~ "Límite de Fluencia (Yield / Fatiga)",
    sigma <= fracture_stress ~ "Plástico e Histéresis (Daño Estructural)",
    TRUE ~ "Fractura Catastrófica (Zona de Sacrificio)"
  )
  
  rating <- case_when(
    sigma < 0.65 ~ "AAA",
    sigma < yield_stress ~ "AA",
    sigma <= 1.00 ~ "B",
    sigma <= fracture_stress ~ "C",
    TRUE ~ "D"
  )
  
  list(sigma = sigma, regime = regime, rating = rating)
}

#' Ensayo de Tracción SEIA 2.0 ante Proyecto de Inversión
run_seia_traction_test <- function(basin_baseline, project_profile) {
  # baseline
  E0 <- basin_baseline$E
  S0 <- basin_baseline$S
  K0 <- basin_baseline$K
  D0 <- basin_baseline$D
  kappa0 <- basin_baseline$kappa %||% 0.0
  
  base_cap <- calc_hombros_capacity(E0, S0, K0)
  base_stress <- calc_cauchy_stress(D0, base_cap$H_effective, kappa0)
  
  # incremental load
  delta_D <- project_profile$delta_D %||% 0.25
  delta_E <- project_profile$delta_E %||% -0.05
  delta_S <- project_profile$delta_S %||% 0.0
  delta_K <- project_profile$delta_K %||% 0.05
  
  E_proj <- max(0.01, E0 + delta_E)
  S_proj <- max(0.01, S0 + delta_S)
  K_proj <- max(0.01, K0 + delta_K)
  D_proj <- D0 + delta_D
  
  proj_cap <- calc_hombros_capacity(E_proj, S_proj, K_proj)
  proj_stress <- calc_cauchy_stress(D_proj, proj_cap$H_effective, kappa0)
  
  # Legal Safeguard Ex-Ante Verdict
  is_legally_blocked <- (base_stress$sigma >= 1.00) || (base_cap$has_critical)
  is_project_inadmissible <- is_legally_blocked || (proj_stress$sigma > 0.85)
  
  verdict <- case_when(
    is_legally_blocked ~ "RECHAZO EX-ANTE: Moratoria Legal Pre-Inversional (Cuenca hiper-estresada σ0 ≥ 1.00 o Liebig < 0.25)",
    is_project_inadmissible ~ "INADMISIBLE: El proyecto supera el Límite de Fluencia Elástica (σ_proj > 0.85)",
    TRUE ~ "ADMISIBLE CON SALVAGUARDA: El proyecto opera dentro del margen de resiliencia elástica"
  )
  
  tibble(
    proyecto = project_profile$name,
    sigma_basal = base_stress$sigma,
    rating_basal = base_stress$rating,
    sigma_proyectado = proj_stress$sigma,
    rating_proyectado = proj_stress$rating,
    delta_sigma = round(proj_stress$sigma - base_stress$sigma, 3),
    dictamen_legal = verdict,
    admisible = !is_project_inadmissible
  )
}

# ------------------------------------------------------------------------------
# 2. CASO PILOTO: CUENCA DEL RÍO LONGAVÍ - BULLILEO (AGRITWIN)
# ------------------------------------------------------------------------------

longavi_basin <- list(
  name = "Cuenca Río Longaví - Bullileo (AgriTwin)",
  region = "Maule Sur, Chile",
  superficie_ha = 122070,
  poblacion = 21400,
  aprs = c("Bullileo", "Retiro Centro", "Copihue", "Romeral", "Villaseca"),
  E = 0.58, # Hombro Ambiental (Acuífero + Embalse Bullileo + remanentes nativos)
  S = 0.64, # Hombro Social (Comités APR + saberes campesinos de riego)
  K = 0.52, # Hombro Económico (Agricultura familiar + apicultura secano)
  D = 0.44, # Presión basal moderada-alta por monocultivo aguas abajo
  kappa = 0.38 # Coeficiente de gobernanza vecinal y acoplamiento panal
)

# Arquetipos de Proyectos de Inversión a Auditar
project_archetypes <- list(
  list(name = "1. Monocultivo Frutal Intensivo (Avellano/Cerezo)", delta_D = 0.42, delta_E = -0.16, delta_S = -0.04, delta_K = 0.08),
  list(name = "2. Megaminería / Tranques de Relave Cabecera",   delta_D = 0.95, delta_E = -0.32, delta_S = -0.18, delta_K = 0.12),
  list(name = "3. Loteo Periurbano Inmobiliario (5.000 m2)",     delta_D = 0.38, delta_E = -0.12, delta_S = -0.06, delta_K = 0.04),
  list(name = "4. Parque Agro-Solar Sintrópico con Keyline",     delta_D = 0.08, delta_E = +0.12, delta_S = +0.08, delta_K = 0.15)
)

message("\n[1] Evaluando Caso Piloto Cuenca Longaví - Bullileo...")
baseline_cap <- calc_hombros_capacity(longavi_basin$E, longavi_basin$S, longavi_basin$K)
baseline_stress <- calc_cauchy_stress(longavi_basin$D, baseline_cap$H_effective, longavi_basin$kappa)

message(sprintf("   * Capacidad Portante H: %.3f (Rating: %s)", baseline_cap$H_effective, baseline_stress$rating))
message(sprintf("   * Tensión Basal sigma0: %.3f (%s)", baseline_stress$sigma, baseline_stress$regime))

# Ejecutar Ensayo de Tracción para los 4 arquetipos
traction_results <- map_dfr(project_archetypes, ~run_seia_traction_test(longavi_basin, .x))

print(knitr::kable(
  traction_results %>% select(proyecto, sigma_basal, sigma_proyectado, delta_sigma, rating_proyectado, admisible),
  col.names = c("Proyecto Auditado", "σ Basal", "σ Proyectado", "Δσ", "Rating Final", "¿Admisible?"),
  caption = "Tabla 1: Resultados del Ensayo de Tracción SEIA 2.0 en Cuenca Río Longaví"
))

# ------------------------------------------------------------------------------
# 3. MODELACIÓN MACROFISCAL DE INACCIÓN Y TRANSFERENCIA REGRESIVA
# ------------------------------------------------------------------------------

calc_macrofiscal_roi <- function(familias_aljibe = 1200, ha_riesgo_fuego = 1800, ha_sintropicas = 2500) {
  costo_aljibe_familia_ano <- 1450 # USD/familia/año
  costo_fuego_ha_ano <- 920        # USD/ha/año
  costo_inversion_sintropica_ha <- 1350 # USD/ha (inversión única en 10 años)
  
  gasto_anual_aljibes <- familias_aljibe * costo_aljibe_familia_ano
  gasto_anual_fuegos <- ha_riesgo_fuego * costo_fuego_ha_ano
  costo_anual_inaccion <- gasto_anual_aljibes + gasto_anual_fuegos
  
  inversion_sintropica_total <- ha_sintropicas * costo_inversion_sintropica_ha
  perdidas_evitadas_10anos <- costo_anual_inaccion * 10 * 0.75 # 75% mitigado
  roi_10anos <- ((perdidas_evitadas_10anos - inversion_sintropica_total) / inversion_sintropica_total) * 100
  
  # Transferencia Regresiva Modelada
  gasto_publico_aljibes <- gasto_anual_aljibes * 0.882 # FNDR + SENAPRED + FCM
  copago_familias_rurales <- gasto_anual_aljibes * 0.118 # Compra particular / endeudamiento
  aporte_privado_monocultivos <- 0.0 # 0% aporte fiscal directo a mitigación
  
  list(
    costo_anual_inaccion_usd = costo_anual_inaccion,
    inversion_sintropica_total_usd = inversion_sintropica_total,
    roi_10anos_percent = round(roi_10anos, 1),
    transferencia_regresiva = list(
      erario_publico_percent = 88.2,
      hogares_rurales_percent = 11.8,
      grandes_monocultivos_percent = 0.0
    )
  )
}

macro_roi <- calc_macrofiscal_roi()

message("\n[2] Modelación de ROI Biofísico y Transferencia Regresiva:")
message(sprintf("   * Costo Anual de Inacción: $%s USD/año", format(macro_roi$costo_anual_inaccion_usd, big.mark = ",")))
message(sprintf("   * Inversión Sintrópica Total (2.500 ha): $%s USD", format(macro_roi$inversion_sintropica_total_usd, big.mark = ",")))
message(sprintf("   * Retorno Biofísico a 10 años (ROI): +%.1f%%", macro_roi$roi_10anos_percent))
message(sprintf("   * Financiamiento de Camiones Aljibe: 88.2%% Erario Público | 11.8%% Hogares Campesinos | 0.0%% Monocultivos"))

# ------------------------------------------------------------------------------
# 4. EXPORTACIÓN DEL DICTAMEN DE AUDITORÍA A FORMATO JSON ABIERTO
# ------------------------------------------------------------------------------

audit_report <- list(
  protocolo = "HOMBROS SEIA 2.0 · Kit Audita tu Propia Cuenca",
  version = "1.0-canonica",
  fecha_emision = format(Sys.time(), "%Y-%m-%d %H:%M:%S"),
  cuenca = longavi_basin,
  linea_base = list(
    capacidad_H = baseline_cap$H_effective,
    tension_sigma = baseline_stress$sigma,
    rating = baseline_stress$rating,
    regimen = baseline_stress$regime
  ),
  ensayo_traccion = traction_results,
  macrofiscal_inaccion = macro_roi,
  aviso_epistemologico = "Estimacion modelada de politica fiscal territorial (no constituye extraccion de declaraciones tributarias individuales bajo secreto del SII)."
)

output_json_path <- "scripts/R/dictamen_audita_tu_cuenca_longavi.json"
write_json(audit_report, output_json_path, pretty = TRUE, auto_unbox = TRUE)
message(sprintf("\n✓ Dictamen Pre-Inversional exportado exitosamente a: %s", output_json_path))
message("✓ [07_kit_audita_tu_cuenca.R] Ejecución completa sin errores.")
