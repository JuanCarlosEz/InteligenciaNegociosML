import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Activity, Brain, Stethoscope, Database, Target, AlertTriangle,
  CheckCircle2, Sparkles, CalendarClock, UserRound,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Predicción de Inasistencia | Arte Dental" },
      { name: "description", content: "Sistema inteligente de predicción de inasistencia de pacientes para Clínica Odontológica Arte Dental." },
    ],
  }),
  component: Index,
});

type PredictionResult = {
  willAttend: boolean;
  probability: number;
};

function Index() {
  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-soft)" }}>
      <header className="border-b border-border bg-card/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-5">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-soft)" }}
          >
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Arte Dental</h1>
            <p className="text-xs text-muted-foreground">Sistema Inteligente de Predicción</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 md:w-[480px]">
            <TabsTrigger value="info">Información del Proyecto</TabsTrigger>
            <TabsTrigger value="predict">Predicción</TabsTrigger>
          </TabsList>

          <TabsContent value="info"><ProjectInfo /></TabsContent>
          <TabsContent value="predict"><PredictionForm /></TabsContent>
        </Tabs>

        <footer className="mt-16 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Proyecto Universitario · Machine Learning · Random Forest
        </footer>
      </main>
    </div>
  );
}

function ProjectInfo() {
  return (
    <div className="space-y-8">
      <section
        className="overflow-hidden rounded-2xl p-8 md:p-12 text-primary-foreground"
        style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-soft)" }}
      >
        <Badge className="mb-4 bg-white/20 text-primary-foreground hover:bg-white/20">
          <Sparkles className="mr-1 h-3 w-3" /> Machine Learning Aplicado
        </Badge>
        <h2 className="text-3xl font-bold md:text-4xl">
          Sistema Inteligente de Predicción de Inasistencia de Pacientes
        </h2>
        <p className="mt-3 text-lg opacity-90">Clínica Odontológica Arte Dental</p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard icon={<Stethoscope className="h-5 w-5" />} title="Sobre la Empresa">
          La Clínica Odontológica Arte Dental brinda servicios especializados de salud bucal,
          incluyendo consultas, limpiezas dentales, tratamientos preventivos y procedimientos
          especializados.
        </InfoCard>

        <InfoCard icon={<AlertTriangle className="h-5 w-5" />} title="Problema Identificado">
          La clínica presenta inasistencias de pacientes a las citas programadas, generando
          espacios desaprovechados y disminución de la productividad.
        </InfoCard>

        <InfoCard icon={<Brain className="h-5 w-5" />} title="Solución Propuesta">
          Se implementó un modelo de Machine Learning basado en Random Forest capaz de predecir
          la probabilidad de asistencia o inasistencia de los pacientes utilizando datos históricos.
        </InfoCard>

        <InfoCard icon={<Target className="h-5 w-5" />} title="Objetivo">
          Optimizar la programación de citas y apoyar la toma de decisiones mediante predicciones
          basadas en datos.
        </InfoCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-5 w-5 text-primary" /> Tecnologías Utilizadas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {["Python", "Google Colab", "Scikit-Learn", "Random Forest", "ML Supervisado"].map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full px-3 py-1">{t}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-5 w-5 text-primary" /> Variables del Modelo
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {["Edad", "Sexo", "Tratamiento", "Especialidad", "Día de la semana", "Turno"].map((t) => (
              <Badge key={t} variant="outline" className="rounded-full border-primary/30 px-3 py-1 text-primary">{t}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Card className="border-border/70 transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            {icon}
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-muted-foreground">{children}</CardContent>
    </Card>
  );
}

const TRATAMIENTOS = ["Consulta General", "Limpieza Dental", "Ortodoncia", "Endodoncia", "Extracción", "Implante Dental"];
const ESPECIALIDADES = ["Odontología General", "Ortodoncia", "Endodoncia", "Cirugía Oral"];
const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const TURNOS = ["Mañana", "Tarde"];

function PredictionForm() {
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [dia, setDia] = useState("");
  const [turno, setTurno] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const ready = edad && sexo && tratamiento && especialidad && dia && turno;

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    // Simulación. Reemplazar con llamada al backend que cargue modelo_inasistencia.pkl
    // y use modelo.predict() / modelo.predict_proba().
    await new Promise((r) => setTimeout(r, 700));
    const e = Number(edad);
    let score = 0.55;
    if (turno === "Tarde") score -= 0.12;
    if (dia === "Sábado" || dia === "Lunes") score -= 0.08;
    if (tratamiento === "Ortodoncia" || tratamiento === "Limpieza Dental") score += 0.1;
    if (tratamiento === "Extracción") score -= 0.05;
    if (e < 18 || e > 60) score -= 0.07;
    score += (Math.random() - 0.5) * 0.15;
    score = Math.max(0.05, Math.min(0.95, score));
    setResult({ willAttend: score >= 0.5, probability: score });
    setLoading(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
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
            <SelectField label="Sexo" value={sexo} onChange={setSexo}
              options={["Masculino", "Femenino"]} />
            <SelectField label="Tratamiento" value={tratamiento} onChange={setTratamiento}
              options={TRATAMIENTOS} />
            <SelectField label="Especialidad" value={especialidad} onChange={setEspecialidad}
              options={ESPECIALIDADES} />
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

function ResultPanel({ result, loading }: { result: PredictionResult | null; loading: boolean }) {
  if (!result && !loading) {
    return (
      <Card className="h-full border-dashed border-border/70 bg-card/50">
        <CardContent className="flex h-full flex-col items-center justify-center py-16 text-center">
          <CalendarClock className="mb-4 h-12 w-12 text-muted-foreground/60" />
          <p className="text-sm text-muted-foreground">
            Complete el formulario y presione <strong>Predecir Asistencia</strong> para ver el resultado.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Procesando con Random Forest...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const r = result!;
  const pct = (r.probability * 100).toFixed(1);
  const attendPct = r.willAttend ? pct : (100 - r.probability * 100).toFixed(1);

  if (r.willAttend) {
    return (
      <Card className="h-full border-2" style={{ borderColor: "var(--color-success)" }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6" style={{ color: "var(--color-success)" }} />
            <CardTitle className="text-lg">Alta probabilidad de asistencia</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl p-5 text-center"
            style={{ background: "color-mix(in oklab, var(--success) 12%, transparent)" }}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Probabilidad de asistencia</p>
            <p className="mt-1 text-4xl font-bold" style={{ color: "var(--color-success)" }}>{pct}%</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
            <p className="font-medium">Recomendación</p>
            <p className="mt-1 text-muted-foreground">Mantener cita programada.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-2 border-destructive">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <CardTitle className="text-lg">Riesgo de inasistencia</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl p-5 text-center"
          style={{ background: "color-mix(in oklab, var(--destructive) 10%, transparent)" }}>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Probabilidad de inasistencia</p>
          <p className="mt-1 text-4xl font-bold text-destructive">{pct}%</p>
          <p className="mt-1 text-xs text-muted-foreground">Asistencia estimada: {attendPct}%</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
          <p className="font-medium">Recomendaciones</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>• Enviar recordatorio.</li>
            <li>• Confirmar asistencia telefónicamente.</li>
            <li>• Considerar reprogramación preventiva.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
