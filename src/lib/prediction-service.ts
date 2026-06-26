/**
 * ============================================================
 *  SERVICIO DE PREDICCIÓN  —  PUNTO DE INTEGRACIÓN DEL MODELO
 * ============================================================
 *
 *  >>> AQUÍ SE CONECTA EL MODELO REAL `modelo_inasistencia.pkl` <<<
 *
 *  Estado actual: se usa una SIMULACIÓN basada en reglas
 *  ponderadas. Para usar el modelo real entrenado en Python:
 *
 *  1) Exponer el modelo desde un backend (FastAPI / Flask):
 *
 *       # app.py
 *       import joblib
 *       modelo = joblib.load("modelo_inasistencia.pkl")
 *
 *       @app.post("/predict")
 *       def predict(data: PacienteInput):
 *           proba = modelo.predict_proba([[...features...]])[0]
 *           return {"prob_asistencia": float(proba[1])}
 *
 *  2) Reemplazar el cuerpo de `predecirAsistencia` por:
 *
 *       const res = await fetch("https://TU-API/predict", {
 *         method: "POST",
 *         headers: { "Content-Type": "application/json" },
 *         body: JSON.stringify(input),
 *       });
 *       const { prob_asistencia } = await res.json();
 *       return { willAttend: prob_asistencia >= 0.5,
 *                probability: prob_asistencia };
 *
 * ============================================================
 */

export type PacienteInput = {
  edad: number;
  sexo: string;
  tratamiento: string;
  especialidad: string;
  dia: string;
  turno: string;
};

export type PredictionResult = {
  willAttend: boolean;
  probability: number; // probabilidad de la clase predicha (0-1)
};

export async function predecirAsistencia(
  input: PacienteInput,
): Promise<PredictionResult> {
  // --- INICIO BLOQUE SIMULADO (reemplazar por llamada al backend) ---
  await new Promise((r) => setTimeout(r, 700));

  let score = 0.55;
  if (input.turno === "Tarde") score -= 0.12;
  if (input.dia === "Sábado" || input.dia === "Lunes") score -= 0.08;
  if (input.tratamiento === "Ortodoncia" || input.tratamiento === "Limpieza Dental") score += 0.1;
  if (input.tratamiento === "Extracción") score -= 0.05;
  if (input.edad < 18 || input.edad > 60) score -= 0.07;
  score += (Math.random() - 0.5) * 0.15;
  score = Math.max(0.05, Math.min(0.95, score));

  return { willAttend: score >= 0.5, probability: score };
  // --- FIN BLOQUE SIMULADO ---
}
