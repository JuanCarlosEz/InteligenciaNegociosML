import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";
import type { PredictionResult } from "@/lib/prediction-service";

interface Props {
  result: PredictionResult | null;
  loading: boolean;
}

export function ResultPanel({ result, loading }: Props) {

  // --- Estado: cargando ---
  if (loading) {
    return (
      <Card className="border-border/70 h-full flex flex-col items-center justify-center min-h-[320px]">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Ejecutando modelo de IA...</p>
        </div>
      </Card>
    );
  }

  // --- Estado: sin predicción ---
  if (!result) {
    return (
      <Card className="border-border/70 h-full flex flex-col items-center justify-center min-h-[320px]">
        <div className="flex flex-col items-center gap-3 p-8 text-center">
          <Clock className="h-12 w-12 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">Sin predicción aún</p>
          <p className="text-sm text-muted-foreground/70">
            Complete el formulario y presione "Predecir Asistencia".
          </p>
        </div>
      </Card>
    );
  }

  // Colores y textos según predicción
  const asistio = result.prediccion === 1;
  const colorBg    = asistio ? "bg-emerald-50 dark:bg-emerald-950/30"
                              : "bg-red-50 dark:bg-red-950/30";
  const colorBorde = asistio ? "border-emerald-200 dark:border-emerald-800"
                              : "border-red-200 dark:border-red-800";
  const colorTexto = asistio ? "text-emerald-700 dark:text-emerald-400"
                              : "text-red-700 dark:text-red-400";
  const Icono = asistio ? CheckCircle2 : XCircle;

  const badgeRiesgo: Record<string, string> = {
    bajo:  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    medio: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    alto:  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <Card className="border-border/70 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Resultado de la predicción</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 flex-1">

        {/* Resultado principal */}
        <div className={`rounded-xl border p-5 ${colorBg} ${colorBorde}`}>
          <div className="flex items-start gap-3">
            <Icono className={`h-8 w-8 shrink-0 mt-0.5 ${colorTexto}`} />
            <div>
              <p className={`text-base font-semibold leading-snug ${colorTexto}`}>
                {asistio ? "El paciente asistirá" : "El paciente NO asistirá"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Basado en el modelo de Árbol de Decisiones
              </p>
            </div>
          </div>
        </div>

        {/* Nivel de riesgo */}
        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
          <span className="text-sm font-medium">Nivel de riesgo</span>
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeRiesgo[result.nivelRiesgo]}`}>
            {result.nivelRiesgo === "alto" && <AlertTriangle className="h-3 w-3" />}
            {result.nivelRiesgo}
          </span>
        </div>

        {/* Barras de probabilidad */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Probabilidades del modelo</p>

          {/* Asistirá */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>✅ Asistirá</span>
              <span className="font-semibold text-foreground">
                {result.probAsistir}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${result.probAsistir}%` }}
              />
            </div>
          </div>

          {/* No asistirá */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>❌ No asistirá</span>
              <span className="font-semibold text-foreground">
                {result.probNoAsistir}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-red-500 transition-all duration-700"
                style={{ width: `${result.probNoAsistir}%` }}
              />
            </div>
          </div>
        </div>

        {/* Costo del tratamiento */}
        <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Costo del tratamiento</span>
            <span className="font-semibold">S/ {result.costo.toFixed(2)}</span>
          </div>
        </div>

        {/* Recomendación */}
        {!asistio && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 dark:border-yellow-800 dark:bg-yellow-950/30">
            <p className="text-xs font-medium text-yellow-800 dark:text-yellow-300">
              💡 Recomendación
            </p>
            <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
              Se sugiere llamar al paciente para confirmar y recordar la cita.
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
