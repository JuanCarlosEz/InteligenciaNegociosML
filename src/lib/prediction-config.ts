/**
 * ============================================================
 *  CONFIGURACIÓN: OPCIONES PARA LOS SELECTORES
 * ============================================================
 *  Edita aquí las listas de opciones disponibles en el formulario.
 * ============================================================
 */

// ======================== DÍAS EN ESPAÑOL ========================
export const DIAS_SEMANA_DISPLAY = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];

// Mapeo interno: de español a inglés (lo que espera el modelo)
export const DIAS_SEMANA_MAP: Record<string, string> = {
  "Lunes": "Monday",
  "Martes": "Tuesday",
  "Miércoles": "Wednesday",
  "Jueves": "Thursday",
  "Viernes": "Friday",
  "Sábado": "Saturday",
  "Domingo": "Sunday"
};

// ======================== MESES EN ESPAÑOL ========================
export const MESES_DISPLAY = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

// Mapeo interno: de nombre español a número (lo que espera el modelo)
export const MESES_MAP: Record<string, number> = {
  "Enero": 1,
  "Febrero": 2,
  "Marzo": 3,
  "Abril": 4,
  "Mayo": 5,
  "Junio": 6,
  "Julio": 7,
  "Agosto": 8,
  "Septiembre": 9,
  "Octubre": 10,
  "Noviembre": 11,
  "Diciembre": 12
};

// ======================== OTROS ========================
export const SEXOS = ["F", "M"];

export const DISTRITOS = [
  "Acobamba", "Acolla", "Apata", "Canchayllo", "Chacapampa",
  "Chicche", "Chilca", "Chongos Bajo", "Chupaca", "Chupuro",
  "Colca", "Concepcion", "Cullhuas", "El Mantaro", "El Tambo",
  "Hualhuas", "Huancan", "Huancayo", "Huancán", "Huaripampa",
  "Huertas", "Ingenio", "Janjaillo", "Jauja", "Julcan", "Julcán",
  "Leonor Ordonez", "Leonor Ordóñez", "Llocllapampa", "Marco",
  "Masma", "Masma Chicche", "Mito", "Molinos", "Monobamba",
  "Muquiyauyo", "Nueve De Julio", "Orcotuna", "Paca", "Pancan",
  "Pancán", "Parco", "Pariahuanca", "Pilcomayo", "Pomucocha",
  "Pucará", "Quilcas", "Ricran", "Ricrán", "San Agustín",
  "San Agustín De Cajas", "San Jeronimo", "Santa Rosa", "Sapallanga",
  "Sausa", "Saño", "Sicaya", "Sincos", "Tunan Marca", "Viques",
  "Yauli", "Yauyos"
];

export const TRATAMIENTOS = [
  "Blanqueamiento Dental",
  "Consulta General",
  "Curación Dental",
  "Endodoncia",
  "Extracción Dental",
  "Implante Dental",
  "Limpieza Dental",
  "Ortodoncia"
];

export const METODOS_PAGO = [
  "Efectivo",
  "Plin",
  "Tarjeta",
  "Yape"
];

export const ESPECIALIDADES = [
  "Endodoncia",
  "Odontopediatría",
  "Ortodoncia",
  "Rehabilitación Oral"
];

export const TURNOS = ["Mañana", "Tarde"];