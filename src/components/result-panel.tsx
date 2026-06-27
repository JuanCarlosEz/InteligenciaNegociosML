/**
 * ============================================================
 *  PANEL DE RESULTADOS DE LA PREDICCIÓN
 * ============================================================
 *  Muestra la predicción, probabilidades y un gráfico visual.
 * ============================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import type { ResultadoPrediccion } from "@/lib/prediccion";

interface ResultPanelProps {
  result: ResultadoPrediccion | null;
  loading: boolean;
}

export function ResultPanel({ result, loading }: ResultPanelProps) {
  if (loading) {
    return (
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Analizando...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-primary/40 to-transparent rounded animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-primary/40 to-transparent rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            Resultados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Completa el formulario y haz clic en "Predecir Asistencia" para ver los resultados.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isAssending = result.prediccion === 0; // 0 = asistirá
  const iconColor = isAssending ? "text-green-600" : "text-amber-600";
  const bgColor = isAssending ? "bg-green-50" : "bg-amber-50";

  return (
    <Card className={`border-2 ${isAssending ? "border-green-200" : "border-amber-200"}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isAssending ? (
            <CheckCircle2 className={`h-6 w-6 ${iconColor}`} />
          ) : (
            <AlertCircle className={`h-6 w-6 ${iconColor}`} />
          )}
          Predicción
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* --- ETIQUETA PRINCIPAL --- */}
        <div className={`rounded-lg p-4 ${bgColor}`}>
          <p className={`text-lg font-semibold ${iconColor}`}>
            {result.etiqueta}
          </p>
        </div>

        {/* --- PROBABILIDADES --- */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Probabilidad de Asistencia</span>
              <span className="text-sm font-bold text-green-600">{result.probabilidadAsistir}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${result.probabilidadAsistir}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Probabilidad de Inasistencia</span>
              <span className="text-sm font-bold text-amber-600">{result.probabilidadNoAsistir}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${result.probabilidadNoAsistir}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* --- NOTA DE CONFIANZA --- */}
        <div className="text-xs text-muted-foreground border-t pt-3">
          <p>
            Predicción basada en modelo de Machine Learning entrenado con datos históricos de pacientes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}