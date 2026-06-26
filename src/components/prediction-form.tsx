/**
 * ============================================================
 *  PESTAÑA "PREDICCIÓN"  —  FORMULARIO DE ENTRADA
 * ============================================================
 *  Recopila los datos del paciente y llama al servicio
 *  `predecirAsistencia` (ver src/lib/prediction-service.ts).
 *
 *  Para cambiar las OPCIONES de los selectores (tratamientos,
 *  especialidades, días, turnos) edita: src/lib/prediction-config.ts
 *
 *  Para conectar el MODELO REAL (.pkl) edita:
 *  src/lib/prediction-service.ts
 * ============================================================
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, UserRound } from "lucide-react";
import { ResultPanel } from "@/components/result-panel";
import {
  predecirAsistencia,
  type PredictionResult,
} from "@/lib/prediction-service";
import {
  TRATAMIENTOS, ESPECIALIDADES, DIAS, TURNOS, SEXOS,
} from "@/lib/prediction-config";

export function PredictionForm() {
  // --- ESTADO DEL FORMULARIO ---
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [dia, setDia] = useState("");
  const [turno, setTurno] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const ready = edad && sexo && tratamiento && especialidad && dia && turno;

  // --- HANDLER: ENVÍO AL MODELO ---
  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    const r = await predecirAsistencia({
      edad: Number(edad),
      sexo, tratamiento, especialidad, dia, turno,
    });
    setResult(r);
    setLoading(false);
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
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Edad">
              <Input type="number" min={0} max={120} value={edad}
                onChange={(e) => setEdad(e.target.value)} placeholder="Ej. 32" />
            </Field>
            <SelectField label="Sexo" value={sexo} onChange={setSexo} options={SEXOS} />
            <SelectField label="Tratamiento" value={tratamiento} onChange={setTratamiento} options={TRATAMIENTOS} />
            <SelectField label="Especialidad" value={especialidad} onChange={setEspecialidad} options={ESPECIALIDADES} />
            <SelectField label="Día de la semana" value={dia} onChange={setDia} options={DIAS} />
            <SelectField label="Turno" value={turno} onChange={setTurno} options={TURNOS} />
          </div>

          <Button onClick={handlePredict} disabled={!ready || loading}
            className="w-full" size="lg"
            style={{ background: "var(--gradient-hero)" }}>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function SelectField({ label, value, onChange, options }:
  { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Field label={label}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </Field>
  );
}
