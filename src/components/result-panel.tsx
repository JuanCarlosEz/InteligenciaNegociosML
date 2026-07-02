/**
 * ============================================================
 *  PANEL DE RESULTADOS DE LA PREDICCIÓN (MEJORADO)
 * ============================================================
 *  Muestra la predicción, probabilidades, gráficos y 
 *  recomendaciones personalizadas basadas en el resultado.
 * ============================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  Lightbulb,
  Phone,
  Bell,
  Clock,
  MessageSquare,
  Shield
} from "lucide-react";
import type { ResultadoPrediccion } from "@/lib/prediccion";

interface ResultPanelProps {
  result: ResultadoPrediccion | null;
  loading: boolean;
}

export function ResultPanel({ result, loading }: ResultPanelProps) {
  if (loading) {
    return (
      <Card className="border-border/70 bg-gradient-to-br from-blue-50/50 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600 animate-spin" />
            Analizando...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-3 bg-gradient-to-r from-blue-400/60 to-blue-200/20 rounded-full animate-pulse"></div>
            <div className="h-3 bg-gradient-to-r from-blue-400/60 to-blue-200/20 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-3 bg-gradient-to-r from-blue-400/60 to-blue-200/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Procesando datos del modelo...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="border-border/70 bg-gradient-to-br from-slate-50 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-slate-400" />
            Resultados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-6 text-center">
            <div className="mb-3 opacity-40">
              <TrendingUp className="h-10 w-10 mx-auto text-slate-400" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Completa el formulario y haz clic en "Predecir Asistencia"
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              para obtener una predicción personalizada
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isAsistiendo = result.prediccion === 0; // 0 = asistirá
  
  // Colores y estilos según predicción
  const iconColor = isAsistiendo ? "text-green-600" : "text-amber-600";
  const bgColor = isAsistiendo ? "bg-green-50" : "bg-amber-50";
  const borderColor = isAsistiendo ? "border-green-300" : "border-amber-300";
  const gradientBg = isAsistiendo 
    ? "from-green-50/80 to-emerald-50/40" 
    : "from-amber-50/80 to-orange-50/40";

  return (
    <Card className={`border-2 ${borderColor} bg-gradient-to-br ${gradientBg} shadow-lg`}>
      {/* --- HEADER CON PREDICCIÓN PRINCIPAL --- */}
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          {isAsistiendo ? (
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle2 className={`h-6 w-6 ${iconColor}`} />
            </div>
          ) : (
            <div className="p-2 bg-amber-100 rounded-full">
              <AlertCircle className={`h-6 w-6 ${iconColor}`} />
            </div>
          )}
          <span>Predicción</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* --- ETIQUETA PRINCIPAL MEJORADA --- */}
        <div className={`rounded-lg p-4 ${bgColor} border-l-4 ${borderColor}`}>
          <p className={`text-lg font-bold ${iconColor} leading-tight`}>
            {result.etiqueta}
          </p>
        </div>

        {/* --- SECCIÓN DE PROBABILIDADES MEJORADA --- */}
        <div className="space-y-5">
          {/* Asistencia */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">Probabilidad de Asistencia</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-green-600">{result.probabilidadAsistir}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-sm">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${result.probabilidadAsistir}%` }}
              ></div>
            </div>
          </div>

          {/* Inasistencia */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">Riesgo de Inasistencia</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-amber-600">{result.probabilidadNoAsistir}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-sm">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${result.probabilidadNoAsistir}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* --- INDICADOR DE CONFIANZA --- */}
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
          <Shield className="h-4 w-4 text-blue-600" />
          <p className="text-xs text-blue-700">
            <span className="font-semibold">Confianza del modelo:</span> Basada en datos históricos de {result.probabilidadAsistir > 70 ? "alta" : result.probabilidadAsistir > 40 ? "media" : "baja"} precisión
          </p>
        </div>

        {/* --- RECOMENDACIONES PERSONALIZADAS --- */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-sm text-gray-800">Recomendaciones</h3>
          </div>

          <div className="space-y-2">
            {isAsistiendo ? (
              // RECOMENDACIONES PARA ASISTENCIA PROBABLE
              <>
                <RecommendationItem
                  icon={<Bell className="h-4 w-4" />}
                  title="Confirmación Preventiva"
                  description="Realizar confirmación de cita 24 horas antes para maximizar la asistencia"
                  color="blue"
                />
                <RecommendationItem
                  icon={<MessageSquare className="h-4 w-4" />}
                  title="Recordatorio Amable"
                  description="Enviar recordatorio por SMS o WhatsApp el día anterior a la cita"
                  color="green"
                />
                <RecommendationItem
                  icon={<Clock className="h-4 w-4" />}
                  title="Aprovechar Disponibilidad"
                  description="Este paciente es confiable. Considerar agendarlo en horarios premium o citas prioritarias"
                  color="emerald"
                />
              </>
            ) : (
              // RECOMENDACIONES PARA INASISTENCIA PROBABLE
              <>
                <RecommendationItem
                  icon={<Phone className="h-4 w-4" />}
                  title="Confirmación Fuerte"
                  description="Llamada telefónica directa para confirmar la cita y resolver dudas"
                  color="amber"
                />
                <RecommendationItem
                  icon={<MessageSquare className="h-4 w-4" />}
                  title="Seguimiento Intensivo"
                  description="Contacto múltiple: SMS, email y llamada. Recordatorios 48h, 24h y 2h antes"
                  color="orange"
                />
                <RecommendationItem
                  icon={<Lightbulb className="h-4 w-4" />}
                  title="Investigar Barreras"
                  description="Preguntar sobre obstáculos (transporte, horario, costo) y ofrecer soluciones"
                  color="red"
                />
              </>
            )}
          </div>
        </div>

        {/* --- NOTA TÉCNICA --- */}
        <div className="text-xs text-muted-foreground border-t pt-3 space-y-1">
          <p className="font-medium">ℹ️ Información del Modelo</p>
          <p>
            Predicción basada en modelo de Machine Learning (Árbol de Decisión) entrenado con datos históricos de pacientes de la clínica dental.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Componente auxiliar para mostrar recomendaciones individuales
 */
interface RecommendationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "green" | "emerald" | "amber" | "orange" | "red";
}

function RecommendationItem({ icon, title, description, color }: RecommendationItemProps) {
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };

  const iconColorMap = {
    blue: "text-blue-600",
    green: "text-green-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    orange: "text-orange-600",
    red: "text-red-600",
  };

  return (
    <div className={`p-3 rounded-lg border ${colorMap[color]}`}>
      <div className="flex gap-3">
        <div className={`flex-shrink-0 ${iconColorMap[color]} mt-0.5`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs opacity-90 mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  );
}