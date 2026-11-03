/**
 * Daniel Santander's "Los Hombros" Mathematical and Conceptual Model
 * Geophysics + Permaculture applied to Territorial Carrying Capacity.
 * 
 * Hierarchy:
 * Level 1: Observable Variables (S1-S4, E1-E4, K1-K4, D1-D3)
 * Level 2: The Three Shoulders (S, E, K)
 * Level 3: Systemic Indices:
 *          H = (S · E · K)^(1/3) [Carrying Capacity]
 *          D = (D1 + D2 + D3) / 3 [Development Pressure]
 *          σ = D / H [Systemic Stress]
 *          Γ = ΔH / (H · Δt) [Syntropy / Entropy Trajectory]
 * Level 4: Diagnostic Traffic Light & If/Then Actionable Signals
 */

export function calculateShoulderS(vars, weights = [0.25, 0.25, 0.25, 0.25]) {
  // S1: Cohesión social (0-1)
  // S2: Capacidad institucional (0-1)
  // S3: Capital humano (0-1)
  // S4: Ausencia de violencia estructural (0-1)
  const val = (weights[0] * vars.s1) + (weights[1] * vars.s2) + (weights[2] * vars.s3) + (weights[3] * vars.s4);
  return Math.max(0.01, Math.min(1.0, val));
}

export function calculateShoulderE(vars, weights = [0.30, 0.35, 0.20, 0.15]) {
  // E1: Integridad ecosistémica / cobertura nativa (0-1)
  // E2: Disponibilidad hídrica por cuenca (0-1)
  // E3: Calidad de suelo / inverso de degradación (0-1)
  // E4: Resiliencia climática / inverso de exposición (0-1)
  const val = (weights[0] * vars.e1) + (weights[1] * vars.e2) + (weights[2] * vars.e3) + (weights[3] * vars.e4);
  return Math.max(0.01, Math.min(1.0, val));
}

export function calculateShoulderK(vars, weights = [0.25, 0.25, 0.25, 0.25]) {
  // K1: Diversificación productiva (Inverso Herfindahl) (0-1)
  // K2: Autonomía económica (% ingresos locales) (0-1)
  // K3: Distribución del ingreso (1 - Gini) (0-1)
  // K4: Balance extracción/regeneración (min(1, Treg/Text)) (0-1)
  const val = (weights[0] * vars.k1) + (weights[1] * vars.k2) + (weights[2] * vars.k3) + (weights[3] * vars.k4);
  return Math.max(0.01, Math.min(1.0, val));
}

export function calculateDevelopmentPressure(dVars) {
  // D1: Intensidad extractiva (ratio extracción / regeneración)
  // D2: Presión demográfica relativa a infraestructura
  // D3: Flujo de inversión externa como % del PIB local
  const avg = (dVars.d1 + dVars.d2 + dVars.d3) / 3;
  return parseFloat(avg.toFixed(3));
}

export function calculateHombrosFullState(territoryData, userModifiers = { pressureMod: 0, regenMod: 0 }) {
  const { variables, pressureVars, history } = territoryData;

  // Apply user interactive modifiers
  const currentVars = {
    s1: Math.min(1, Math.max(0.05, variables.s1 * (1 + userModifiers.regenMod * 0.2))),
    s2: Math.min(1, Math.max(0.05, variables.s2 * (1 + userModifiers.regenMod * 0.15))),
    s3: variables.s3,
    s4: Math.min(1, Math.max(0.05, variables.s4 * (1 + userModifiers.regenMod * 0.1))),

    e1: Math.min(1, Math.max(0.05, variables.e1 * (1 + userModifiers.regenMod * 0.3))),
    e2: Math.min(1, Math.max(0.05, variables.e2 * (1 - userModifiers.pressureMod * 0.35 + userModifiers.regenMod * 0.25))),
    e3: Math.min(1, Math.max(0.05, variables.e3 * (1 - userModifiers.pressureMod * 0.25 + userModifiers.regenMod * 0.3))),
    e4: variables.e4,

    k1: variables.k1,
    k2: Math.min(1, Math.max(0.05, variables.k2 * (1 + userModifiers.regenMod * 0.2))),
    k3: variables.k3,
    k4: Math.min(1, Math.max(0.05, variables.k4 * (1 - userModifiers.pressureMod * 0.4 + userModifiers.regenMod * 0.35)))
  };

  const currentPressure = {
    d1: Math.max(0.1, pressureVars.d1 * (1 + userModifiers.pressureMod)),
    d2: pressureVars.d2,
    d3: Math.max(0.1, pressureVars.d3 * (1 + userModifiers.pressureMod * 0.5))
  };

  // 1. Calculate the Three Shoulders
  const S = calculateShoulderS(currentVars);
  const E = calculateShoulderE(currentVars);
  const K = calculateShoulderK(currentVars);

  // 2. Critical Rule Check & Liebig Operator (Φ_crit): If any shoulder < 0.25
  const hasCriticalShoulder = S < 0.25 || E < 0.25 || K < 0.25;
  const criticalDetails = [];
  if (S < 0.25) criticalDetails.push('Hombro Social (S < 0.25)');
  if (E < 0.25) criticalDetails.push('Hombro Ambiental (E < 0.25)');
  if (K < 0.25) criticalDetails.push('Hombro Económico (K < 0.25)');

  // Geometric Mean modulated by Generalized Liebig Operator Φ_crit
  const H_base = Math.pow(S * E * K, 1 / 3);
  const minShoulder = Math.min(S, E, K);
  const phiCrit = hasCriticalShoulder ? (minShoulder / 0.25) * 0.73 : 1.0;
  const H = Math.max(0.05, H_base * phiCrit);

  // 3. Development Pressure: D = (D1 + D2 + D3) / 3
  const D = calculateDevelopmentPressure(currentPressure);

  // 4. Systemic Stress: σ = D / H
  const sigma = D / H;

  // 6. Syntropy / Entropy Indicator Γ = ΔH / (H · Δt)
  // Compare with last historical checkpoint (e.g. 2017 to 2024, dt = 7 years)
  const lastH = history && history.length >= 2 ? history[history.length - 2].H : H * 1.05;
  const dt = 7;
  const deltaH = H - lastH;
  const rawGamma = deltaH / (lastH * dt);
  const gamma = parseFloat(rawGamma.toFixed(4));

  let gammaStatus = 'estacionario';
  let gammaTitle = 'Equilibrio Dinámico';
  if (gamma > 0.03) {
    gammaStatus = 'sintropia';
    gammaTitle = 'Sintropía Activa (Gana Resiliencia)';
  } else if (gamma < -0.03) {
    gammaStatus = 'entropia';
    gammaTitle = 'Entropía Dominante (Degradación Estructural)';
  }

  // 7. Systemic Traffic Light
  let trafficLight = 'green';
  let trafficTitle = 'Margen Sostenible';
  let actionCode = 'MONITOR';

  if (hasCriticalShoulder) {
    trafficLight = 'critical_red';
    trafficTitle = 'Alerta Crítica: Ruptura de Hombro';
    actionCode = 'CRITICAL_ALERT';
  } else if (sigma < 0.70) {
    trafficLight = 'green';
    trafficTitle = 'Margen Sostenible';
    actionCode = 'SAFE';
  } else if (sigma <= 1.00) {
    trafficLight = 'amber';
    trafficTitle = 'Zona de Ajuste';
    actionCode = 'ADJUST';
  } else if (sigma <= 1.20) {
    trafficLight = 'red';
    trafficTitle = 'Sobrecarga Sistémica';
    actionCode = 'OVERLOAD';
  } else {
    trafficLight = 'black';
    trafficTitle = 'Riesgo de Colapso / Fractura';
    actionCode = 'HALT_EXTRACTION';
  }

  // 8. If/Then Actionable Signals (Lámina 21)
  const activeAlerts = [];
  if (hasCriticalShoulder) {
    activeAlerts.push({
      id: 'rule_1',
      condition: 'Hombro < 0.25',
      signal: '🔴',
      action: `Alerta crítica en ${criticalDetails.join(', ')} — Requiere intervención directa e inmediata.`,
      severity: 'critical'
    });
  }
  if (sigma > 1.20) {
    activeAlerts.push({
      id: 'rule_2',
      condition: 'σ > 1.20',
      signal: '🔴🔴',
      action: 'Detener extracción inmediatamente — El territorio no aguanta la carga externa.',
      severity: 'critical'
    });
  }
  if (gamma < -0.05) {
    activeAlerts.push({
      id: 'rule_3',
      condition: 'Γ < -0.05/año',
      signal: '🔴',
      action: 'Trayectoria de degradación confirmada — Entropía acelerada en curso.',
      severity: 'high'
    });
  }
  if (currentPressure.d1 > 2.0) {
    activeAlerts.push({
      id: 'rule_4',
      condition: 'Extracción > 2x Regeneración',
      signal: '🔴',
      action: 'Deuda ambiental acumulada — Desbalance estructural entre flujos.',
      severity: 'high'
    });
  }
  if (activeAlerts.length === 0) {
    activeAlerts.push({
      id: 'rule_5',
      condition: 'D equilibrada + H robusto',
      signal: '🟢',
      action: 'Monitorear sin intervenir — Capacidad de carga activa y resiliente.',
      severity: 'safe'
    });
  }

  return {
    S: parseFloat(S.toFixed(3)),
    E: parseFloat(E.toFixed(3)),
    K: parseFloat(K.toFixed(3)),
    H_base: parseFloat(H_base.toFixed(3)),
    phiCrit: parseFloat(phiCrit.toFixed(3)),
    H: parseFloat(H.toFixed(3)),
    D: parseFloat(D.toFixed(3)),
    sigma: parseFloat(sigma.toFixed(3)),
    gamma,
    gammaStatus,
    gammaTitle,
    trafficLight,
    trafficTitle,
    actionCode,
    hasCriticalShoulder,
    criticalDetails,
    activeAlerts,
    currentVars,
    currentPressure,
    emissionsMetrics: calculateScopeEmissionsMetrics(territoryData)
  };
}

/**
 * Scope 1, 2, and 3 Emissions & Metabolic Leakage Framework
 * 
 * Scope 1: Direct territorial emissions (transport, heating, local industry, agriculture).
 * Scope 2: Indirect grid emissions (purchased electricity, district cooling/heating).
 * Scope 3 Upstream: Embodied carbon in imported food, tech, construction, consumer goods.
 * Scope 3 Downstream: Embodied carbon in raw materials exported to global markets.
 */
export function calculateScopeEmissionsMetrics(territory) {
  const defaultEmissions = {
    scope1: 2.5,
    scope2: 1.0,
    scope3Upstream: 4.0,
    scope3Downstream: 1.5,
    localSequestration: 1.8, // tCO2e/capita absorbed by local biomass/soil
    gridCarbonIntensity: 180, // gCO2/kWh
  };

  const em = territory?.emissions || defaultEmissions;

  const s1 = em.scope1 ?? 2.5;
  const s2 = em.scope2 ?? 1.0;
  const s3Up = em.scope3Upstream ?? 4.0;
  const s3Down = em.scope3Downstream ?? 1.5;
  const sequestration = em.localSequestration ?? 1.5;

  // Territorial Footprint (Accounting standard)
  const territorialTotal = s1 + s2;

  // Real Consumption Footprint (Global Metabolic accounting)
  const consumptionTotal = s1 + s2 + s3Up;

  // Metabolic Leakage Ratio: How much of the territory's ecological debt is externalized?
  // > 2.0 indicates an Entropic Parasite (clean at home, dirty abroad)
  const outsourcingRatio = territorialTotal > 0 ? s3Up / territorialTotal : 1.0;

  // Net Metabolic Balance: Local absorption / Total consumption footprint
  // > 1.0: Syntropic Net Carbon Sink
  // 0.4 - 1.0: Transition Regime
  // < 0.4: Carbon Entropic Deficit
  const netMetabolicBalance = consumptionTotal > 0 ? sequestration / consumptionTotal : 0;

  // Clean Energy Grid Autonomy (1 = 100% renewable/zero-carbon grid, 0 = pure coal/oil)
  const cleanEnergyAutonomy = Math.max(0, Math.min(1, 1 - (s2 / Math.max(1, s1 + s2))));

  return {
    scope1: parseFloat(s1.toFixed(2)),
    scope2: parseFloat(s2.toFixed(2)),
    scope3Upstream: parseFloat(s3Up.toFixed(2)),
    scope3Downstream: parseFloat(s3Down.toFixed(2)),
    sequestration: parseFloat(sequestration.toFixed(2)),
    territorialTotal: parseFloat(territorialTotal.toFixed(2)),
    consumptionTotal: parseFloat(consumptionTotal.toFixed(2)),
    outsourcingRatio: parseFloat(outsourcingRatio.toFixed(2)),
    netMetabolicBalance: parseFloat(netMetabolicBalance.toFixed(3)),
    cleanEnergyAutonomy: parseFloat(cleanEnergyAutonomy.toFixed(2)),
    gridCarbonIntensity: em.gridCarbonIntensity || 200,
  };
}
