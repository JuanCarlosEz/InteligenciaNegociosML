// src/lib/prediccion.ts
import { score }    from './modeloArbol';
import { ENCODERS } from './encoders';
import { DIAS_SEMANA_MAP, MESES_MAP } from './prediction-config';

export interface DatosPaciente {
  edad:        number;
  sexo:        string;
  distrito:    string;
  tratamiento: string;
  metodoPago:  string;
  especialidad:string;
  turno:       string;
  mes:         string;  // AHORA: nombre del mes en español (Enero, Febrero, ...)
  diaSemana:   string;  // AHORA: nombre del día en español (Lunes, Martes, ...)
  monto:       number;
}

export interface ResultadoPrediccion {
  prediccion:            0 | 1;
  etiqueta:              string;
  probabilidadAsistir:   number;
  probabilidadNoAsistir: number;
}

/**
 * Normaliza un string removiendo espacios extras y manejando caracteres especiales
 */
function normalizar(valor: string): string {
  return valor
    .trim()                          // Remover espacios al inicio/final
    .toLowerCase()                   // Convertir a minúsculas
    .replace(/\s+/g, ' ');          // Normalizar espacios múltiples a uno
}

/**
 * Codifica un valor categórico a su número correspondiente
 */
function codificar(campo: string, valor: string): number {
  const mapa = ENCODERS[campo];
  if (!mapa) {
    throw new Error(`Campo "${campo}" no encontrado`);
  }

  // Buscar el valor en el mapa (comparación insensible a mayúsculas)
  const valorNormalizado = normalizar(valor);
  
  for (const [clave, codigo] of Object.entries(mapa)) {
    if (normalizar(clave) === valorNormalizado) {
      return codigo;
    }
  }

  // Si no encuentra, mostrar error con opciones disponibles
  throw new Error(
    `"${valor}" no válido para ${campo}. Opciones: ${Object.keys(mapa).join(', ')}`
  );
}

/**
 * Convierte un día en español a inglés (Lunes → Monday)
 */
function convertirDiaAlIngles(diaSemanaEspanol: string): string {
  const diaIngles = DIAS_SEMANA_MAP[diaSemanaEspanol];
  if (!diaIngles) {
    throw new Error(
      `Día "${diaSemanaEspanol}" no válido. Opciones: ${Object.keys(DIAS_SEMANA_MAP).join(', ')}`
    );
  }
  return diaIngles;
}

/**
 * Convierte un mes en español a número (Enero → 1)
 */
function convertirMesANumero(mesEspanol: string): number {
  const mesNumero = MESES_MAP[mesEspanol];
  if (mesNumero === undefined) {
    throw new Error(
      `Mes "${mesEspanol}" no válido. Opciones: ${Object.keys(MESES_MAP).join(', ')}`
    );
  }
  return mesNumero;
}

export function predecir(datos: DatosPaciente): ResultadoPrediccion {
  // Convertir día y mes de español a inglés/número
  const diaSemanaIngles = convertirDiaAlIngles(datos.diaSemana);
  const mesNumero = convertirMesANumero(datos.mes);

  // El orden DEBE coincidir con el de X en Python
  const entrada: number[] = [
    datos.edad,                              // index 0 — Edad
    codificar('Sexo',          datos.sexo),  // index 1 — Sexo_cod
    codificar('Distrito',      datos.distrito),// index 2 — Distrito_cod
    codificar('Tratamiento',   datos.tratamiento), // index 3
    codificar('Metodo_pago',   datos.metodoPago),  // index 4
    codificar('Especialidad',  datos.especialidad), // index 5
    codificar('Turno',         datos.turno),  // index 6
    mesNumero,                               // index 7 — Mes (convertido a número)
    codificar('Dia_Semana',    diaSemanaIngles), // index 8 (convertido a inglés)
    datos.monto,                             // index 9 — Monto
  ];

  const probs      = score(entrada);        // [prob_asiste, prob_no_asiste]
  const prediccion = probs[1] > probs[0] ? 1 : 0;

  return {
    prediccion,
    etiqueta: prediccion === 0
      ? '✅ El paciente ASISTIRÁ a su cita'
      : '⚠️ RIESGO: El paciente NO ASISTIRÁ a su cita',
    probabilidadAsistir:   Math.round(probs[0] * 100),
    probabilidadNoAsistir: Math.round(probs[1] * 100),
  };
}