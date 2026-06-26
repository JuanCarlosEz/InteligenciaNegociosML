/**
 * ============================================================
 *  PANEL DE RESULTADO DE LA PREDICCIÓN
 * ============================================================
 *  Muestra el resultado devuelto por `predecirAsistencia`.
 *  EDITA AQUÍ los textos de recomendaciones, colores y formato
 *  de los porcentajes mostrados al usuario.
 * ============================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, CalendarClock } from "lucide-react";
import type { PredictionResult } from "@/lib/prediction-service";

export function ResultPanel({ result, loading }: { result: PredictionResult | null; loading: boolean }) {
  // --- ESTADO INICIAL (sin predicción aún) ---
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

  // --- ESTADO CARGANDO ---
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

  // --- RESULTADO: ALTA PROBABILIDAD DE ASISTENCIA (VERDE) ---
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
          {/* EDITA AQUÍ las recomendaciones para el caso de asistencia */}
          <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
            <p className="font-medium">Recomendación</p>
            <p className="mt-1 text-muted-foreground">Mantener cita programada.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // --- RESULTADO: RIESGO DE INASISTENCIA (ROJO) ---
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
        {/* EDITA AQUÍ las recomendaciones para el caso de inasistencia */}
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
