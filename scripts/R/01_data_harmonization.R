# ==============================================================================
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

# Serie temporal sintética histórica (2000-2025) para modelar dinámica de fases
set.seed(42)
anos <- 2000:2025
trayectorias_historicas <- expand_grid(
  territorios_raw %>% select(id, nombre, pais, S_2025 = S, K_2025 = K),
  ano = anos
) %>%
  mutate(
    # Chanco experimenta acumulación sintrópica por agroecología
    # Aconcagua experimenta degradación acelerada desde el inicio de la megasequía (2010)
    factor_tiempo = (ano - 2000) / 25,
    S_t = case_when(
      id == "chanco" ~ S_2025 * (0.85 + 0.15 * factor_tiempo),
      id == "aconcagua" ~ S_2025 * ifelse(ano < 2010, 1.35 - 0.1 * factor_tiempo, 1.25 - 0.45 * factor_tiempo),
      id == "quintero" ~ S_2025 * (1.1 - 0.2 * factor_tiempo),
      id == "copenhagen" ~ S_2025 * (0.95 + 0.05 * factor_tiempo),
      TRUE ~ S_2025 * (1.0 - 0.05 * sin(factor_tiempo * pi))
    ),
    H_t = S_t * 0.95 # proxy simplificado para trayectoria
  )

message("✓ [01_data_harmonization.R] 8 territorios armonizados con series históricas.")
