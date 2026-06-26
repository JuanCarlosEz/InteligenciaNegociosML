/**
 * ============================================================
 *  CONFIGURACIÓN DEL MODELO DE PREDICCIÓN
 * ============================================================
 *  Aquí se definen las opciones que se muestran en el formulario.
 *  Si tu modelo `modelo_inasistencia.pkl` fue entrenado con otras
 *  categorías, EDITA estas listas para que coincidan exactamente
 *  con las clases usadas durante el entrenamiento en Python.
 * ============================================================
 */

export const TRATAMIENTOS = [
  "Consulta General",
  "Limpieza Dental",
  "Ortodoncia",
  "Endodoncia",
  "Extracción",
  "Implante Dental",
];

export const ESPECIALIDADES = [
  "Odontología General",
  "Ortodoncia",
  "Endodoncia",
  "Cirugía Oral",
];

export const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const TURNOS = ["Mañana", "Tarde"];

export const SEXOS = ["Masculino", "Femenino"];
