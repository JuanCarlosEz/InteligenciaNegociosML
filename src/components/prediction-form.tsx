/**
 * ============================================================
 *  PESTAÑA "PREDICCIÓN"  —  FORMULARIO DE ENTRADA
 * ============================================================
 *  Recopila los datos del paciente y llama a la función
 *  `predecir` (ver src/lib/prediccion.ts).
 *  
 *  VALIDACIONES INCLUIDAS:
 *  - No permite campos vacíos
 *  - Edad mínima: 5 años
 *  - Edad máxima: 120 años
 *  - Monto debe ser positivo
 * ============================================================
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, UserRound, AlertCircle, CheckCircle2 } from "lucide-react";
import { ResultPanel } from "@/components/result-panel";
import {
  predecir,
  type DatosPaciente,
  type ResultadoPrediccion,
} from "@/lib/prediccion";
import {
  SEXOS,
  DISTRITOS,
  TRATAMIENTOS,
  METODOS_PAGO,
  ESPECIALIDADES,
  TURNOS,
  DIAS_SEMANA_DISPLAY,
  MESES_DISPLAY
} from "@/lib/prediction-config";

// Constantes de validación
const EDAD_MINIMA = 5;
const EDAD_MAXIMA = 120;

export function PredictionForm() {
  // --- ESTADO DEL FORMULARIO ---
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [distrito, setDistrito] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [turno, setTurno] = useState("");
  const [mes, setMes] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [monto, setMonto] = useState("");
  
  const [result, setResult] = useState<ResultadoPrediccion | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- FUNCIONES AUXILIARES PARA LIMPIAR ERRORES ---
  
  /**
   * Limpia un error específico del objeto de errores
   * Elimina completamente la clave (no solo la deja vacía)
   */
  function limpiarError(campo: string) {
    if (errors[campo]) {
      const { [campo]: _, ...resto } = errors;
      setErrors(resto);
    }
  }

  /**
   * Limpia múltiples errores a la vez
   */
  function limpiarErrores(...campos: string[]) {
    let nuevosErrores = { ...errors };
    campos.forEach(campo => {
      delete nuevosErrores[campo];
    });
    setErrors(nuevosErrores);
  }

  // --- VALIDACIONES ---
  
  /**
   * Valida que un campo no esté vacío
   */
  function validarNoVacio(campo: string, valor: string): string | null {
    if (!valor || valor.trim() === "") {
      return `${campo} es obligatorio`;
    }
    return null;
  }

  /**
   * Valida la edad
   */
  function validarEdad(edadStr: string): string | null {
    if (!edadStr || edadStr.trim() === "") {
      return "Edad es obligatoria";
    }

    const edadNum = Number(edadStr);

    // Verificar que es un número válido
    if (isNaN(edadNum)) {
      return "Edad debe ser un número válido";
    }

    // Verificar que no sea negativa
    if (edadNum < 0) {
      return "Edad no puede ser negativa";
    }

    // Verificar que sea mayor o igual a 5
    if (edadNum < EDAD_MINIMA) {
      return `Edad debe ser mayor o igual a ${EDAD_MINIMA} años`;
    }

    // Verificar que no supere 120
    if (edadNum > EDAD_MAXIMA) {
      return `Edad no puede superar ${EDAD_MAXIMA} años`;
    }

    return null;
  }

  /**
   * Valida el monto
   */
  function validarMonto(montoStr: string): string | null {
    if (!montoStr || montoStr.trim() === "") {
      return "Monto es obligatorio";
    }

    const montoNum = Number(montoStr);

    if (isNaN(montoNum)) {
      return "Monto debe ser un número válido";
    }

    if (montoNum < 0) {
      return "Monto no puede ser negativo";
    }

    if (montoNum === 0) {
      return "Monto debe ser mayor a 0";
    }

    return null;
  }

  /**
   * Valida TODO el formulario
   */
  function validarFormulario(): boolean {
    const nuevosErrores: Record<string, string> = {};

    // Validar edad (con lógica especial)
    const errorEdad = validarEdad(edad);
    if (errorEdad) nuevosErrores.edad = errorEdad;

    // Validar campos obligatorios simples
    if (validarNoVacio("Sexo", sexo)) nuevosErrores.sexo = "Sexo es obligatorio";
    if (validarNoVacio("Distrito", distrito)) nuevosErrores.distrito = "Distrito es obligatorio";
    if (validarNoVacio("Tratamiento", tratamiento)) nuevosErrores.tratamiento = "Tratamiento es obligatorio";
    if (validarNoVacio("Método de Pago", metodoPago)) nuevosErrores.metodoPago = "Método de Pago es obligatorio";
    if (validarNoVacio("Especialidad", especialidad)) nuevosErrores.especialidad = "Especialidad es obligatoria";
    if (validarNoVacio("Turno", turno)) nuevosErrores.turno = "Turno es obligatorio";
    if (validarNoVacio("Mes de la Cita", mes)) nuevosErrores.mes = "Mes de la Cita es obligatorio";
    if (validarNoVacio("Día de la Cita", diaSemana)) nuevosErrores.diaSemana = "Día de la Cita es obligatorio";

    // Validar monto (con lógica especial)
    const errorMonto = validarMonto(monto);
    if (errorMonto) nuevosErrores.monto = errorMonto;

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  // --- VERIFICAR SI FORMULARIO ESTÁ LISTO VISUALMENTE ---
  const todosLlenosVisualmente = edad && sexo && distrito && tratamiento && metodoPago && 
                                especialidad && turno && mes && diaSemana && monto;

  // --- HANDLER: ENVÍO AL MODELO ---
  const handlePredict = async () => {
    // Validar antes de hacer predicción
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const datos: DatosPaciente = {
        edad: Number(edad),
        sexo,
        distrito,
        tratamiento,
        metodoPago,
        especialidad,
        turno,
        mes,
        diaSemana,
        monto: Number(monto),
      };

      const r = predecir(datos);
      setResult(r);
    } catch (err) {
      setErrors({
        apiError: err instanceof Error ? err.message : "Error desconocido"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* --- FORMULARIO --- */}
      <Card className="border-border/70 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-primary" />
            Predicción de Asistencia de Pacientes
          </CardTitle>
          <CardDescription>
            Ingrese los datos requeridos para obtener una predicción del modelo de Machine Learning.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          
          {/* --- FILA 1: Edad, Sexo --- */}
          <div className="grid gap-5 md:grid-cols-2">
            <Field 
              label="Edad" 
              error={errors.edad}
              required
            >
              <Input 
                type="number" 
                min={EDAD_MINIMA} 
                max={EDAD_MAXIMA} 
                value={edad}
                onChange={(e) => {
                  setEdad(e.target.value);
                  // Limpiar error completamente cuando el usuario corrige
                  limpiarError("edad");
                }}
                placeholder="Ej. 32" 
                className={errors.edad ? "border-red-500 focus:ring-red-500" : ""}
              />
            </Field>
            <SelectField 
              label="Sexo" 
              value={sexo} 
              onChange={(val) => {
                setSexo(val);
                limpiarError("sexo");
              }}
              options={SEXOS}
              error={errors.sexo}
              required
            />
          </div>

          {/* --- FILA 2: Distrito, Especialidad --- */}
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField 
              label="Distrito" 
              value={distrito} 
              onChange={(val) => {
                setDistrito(val);
                limpiarError("distrito");
              }}
              options={DISTRITOS}
              error={errors.distrito}
              required
            />
            <SelectField 
              label="Especialidad" 
              value={especialidad} 
              onChange={(val) => {
                setEspecialidad(val);
                limpiarError("especialidad");
              }}
              options={ESPECIALIDADES}
              error={errors.especialidad}
              required
            />
          </div>

          {/* --- FILA 3: Tratamiento, Método de Pago --- */}
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField 
              label="Tratamiento" 
              value={tratamiento} 
              onChange={(val) => {
                setTratamiento(val);
                limpiarError("tratamiento");
              }}
              options={TRATAMIENTOS}
              error={errors.tratamiento}
              required
            />
            <SelectField 
              label="Método de Pago" 
              value={metodoPago} 
              onChange={(val) => {
                setMetodoPago(val);
                limpiarError("metodoPago");
              }}
              options={METODOS_PAGO}
              error={errors.metodoPago}
              required
            />
          </div>

          {/* --- FILA 4: Turno, Día de Semana --- */}
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField 
              label="Turno" 
              value={turno} 
              onChange={(val) => {
                setTurno(val);
                limpiarError("turno");
              }}
              options={TURNOS}
              error={errors.turno}
              required
            />
            <SelectField 
              label="Día de la Cita" 
              value={diaSemana} 
              onChange={(val) => {
                setDiaSemana(val);
                limpiarError("diaSemana");
              }}
              options={DIAS_SEMANA_DISPLAY}
              error={errors.diaSemana}
              required
            />
          </div>

          {/* --- FILA 5: Mes, Monto --- */}
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField 
              label="Mes de la Cita" 
              value={mes} 
              onChange={(val) => {
                setMes(val);
                limpiarError("mes");
              }}
              options={MESES_DISPLAY}
              error={errors.mes}
              required
            />
            <Field 
              label="Monto (S/)" 
              error={errors.monto}
              required
            >
              <Input 
                type="number" 
                min={0} 
                step={0.01}
                value={monto}
                onChange={(e) => {
                  setMonto(e.target.value);
                  // Limpiar error completamente cuando el usuario corrige
                  limpiarError("monto");
                }}
                placeholder="Ej. 150.00"
                className={errors.monto ? "border-red-500 focus:ring-red-500" : ""}
              />
            </Field>
          </div>

          {/* --- ERRORES GLOBALES --- */}
          {errors.apiError && (
            <div className="rounded-md bg-red-50 p-3 flex gap-2 items-start">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">{errors.apiError}</div>
            </div>
          )}


          {/* --- BOTÓN DE PREDICCIÓN --- */}
          <Button 
            onClick={handlePredict} 
            disabled={!todosLlenosVisualmente || Object.keys(errors).length > 0 || loading}
            className="w-full" 
            size="lg"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Brain className="mr-2 h-4 w-4" />
            {loading ? "Analizando..." : "Predecir Asistencia"}
          </Button>
        </CardContent>
      </Card>

      {/* --- PANEL DE RESULTADO --- */}
      <div className="lg:col-span-2">
        <ResultPanel result={result} loading={loading} />
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}

function Field({ label, children, error, required }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
}

function SelectField({ 
  label, 
  value, 
  onChange, 
  options,
  error,
  required
}: SelectFieldProps) {
  return (
    <Field label={label} error={error} required={required}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={error ? "border-red-500 focus:ring-red-500" : ""}>
          <SelectValue placeholder="Seleccione..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}