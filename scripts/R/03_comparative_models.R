# ==============================================================================
# 03_comparative_models.R
# Evaluación cruzada de modelos: HOMBROS vs. IDH vs. Huella Ecológica vs. Doughnut
# ==============================================================================

# Computar indicadores cruzados para los 8 territorios
benchmark_multimodel <- territorios_raw %>%
  rowwise() %>%
  mutate(
    # HOMBROS
    H = calc_hombros(S, E, K)$H_effective,
    D = round((D1 + D2 + D3) / 3, 3),
    sigma = calc_sigma(D, H)$sigma,
    regime = calc_sigma(D, H)$regime,
    
    # 1. Proxy IDH Tradicional (Sesgo monetario y escolar, sin biofísica)
    # Copenhague/Ámsterdam puntean altísimo; Chanco y Quintero quedan rezagados o distorsionados
    idh_proxy = round(case_when(
      pais == "Dinamarca" ~ 0.948,
      pais == "Países Bajos" ~ 0.944,
      pais == "Alemania" ~ 0.942,
      pais == "España" & id == "barcelona" ~ 0.905,
      pais == "España" & id == "bilbao" ~ 0.910,
      id == "quintero" ~ 0.785, # Elevado artificialmente por salarios industriales
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
      id == "quintero" ~ 4.9, # Alta polución
      id == "aconcagua" ~ 3.4,
      id == "chanco" ~ 2.1
    ), 1),
    
    # 3. Ratio de Desplazamiento Entrópico Scope 3
    emisiones_totales = round(scope1 + scope2 + scope3_up, 1),
    ratio_ext = round((scope3_up / emisiones_totales) * 100, 1)
  ) %>%
  ungroup() %>%
  # Asignar Rankings
  mutate(
    rank_idh = min_rank(desc(idh_proxy)), # 1 = Mayor IDH
    rank_huella = min_rank(huella_gha),   # 1 = Menor Huella (Mejor)
    rank_hombros = min_rank(sigma)        # 1 = Menor Tensión Sistémica (Mejor)
  )

message("✓ [03_comparative_models.R] Benchmark multicriterio e inversión de rankings calculados.")
