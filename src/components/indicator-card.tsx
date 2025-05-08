import { DollarSignIcon, EuroIcon, Bitcoin, ChartAreaIcon, ReceiptIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IndicatorProps {
  indicator: {
    codigo: string; // Cambiado para coincidir con los datos filtrados
    nombre: string;
    valor: number;
    unidad_medida: string;
    fecha: string;
  };
}

export function IndicatorCard({ indicator }: IndicatorProps) {
  const { nombre, valor, unidad_medida, fecha, codigo } = indicator;

  const getColorClass = () => {
    switch (codigo) {
      case "dolar":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400";
      case "euro":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400";
      case "bitcoin":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400";
      case "uf":
        return "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400";
      case "utm":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getCurrencyIcon = () => {
    switch (codigo) {
      case "dolar":
        return <DollarSignIcon className="size-5" />;
      case "euro":
        return <EuroIcon className="size-5" />;
      case "bitcoin":
        return <Bitcoin className="size-5" />;
      case "uf":
        return <ChartAreaIcon className="size-5" />;
      case "utm":
        return <ReceiptIcon className="size-5" />;
      default:
        return <span className="text-lg">💰</span>;
    }
  };

  return (
    <Card className="overflow-hidden border-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{nombre}</CardTitle>
        <div className={`rounded-full p-1 ${getColorClass()}`}>{getCurrencyIcon()}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valor.toLocaleString("es-CL")} {unidad_medida}</div>
        <div className="flex items-center">
          <CardDescription className="ml-2 text-xs text-muted-foreground">
            Última actualización: {new Date(fecha).toLocaleDateString("es-CL")}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
