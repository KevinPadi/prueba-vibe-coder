import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGlobalContext } from "@/context/GlobalContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bitcoin, ChartArea, DollarSign, Euro, Receipt } from "lucide-react";

const chartConfig = {
  desktop: {
    label: "Valor",
    color: "oklch(68.5% 0.169 237.323)",
  }
} satisfies ChartConfig

export default function EconomicChart() {
  const { fetchDataByIndicator, indicatorData } = useGlobalContext()

    interface ChartData {
    fecha: string;
    valor: number;
  }

  const data: ChartData[] | undefined = indicatorData?.map((item) => ({
    fecha: new Date(item.fecha).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
    }),
    valor: item.valor,
  }));
  
  const handleFetchData = (indicator:string) => {
    fetchDataByIndicator(indicator)
  }

  return (
    <Card>  
      <CardHeader className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <div className="flex flex-col justify-between">
          <CardTitle>Tendencias de Indicadores</CardTitle>
          <CardDescription>
            Valores históricos de el último año
          </CardDescription>
        </div>
        <Select defaultValue="dolar" onValueChange={(value) => handleFetchData(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecciona un Indicador" />
          </SelectTrigger>
          <SelectContent  >
            <SelectItem value="dolar">
              <DollarSign />
              Dolar
            </SelectItem>
            <SelectItem value="euro">
              <Euro />  
              Euro
            </SelectItem>
            <SelectItem value="bitcoin">
              <Bitcoin />
              Bitcoin
            </SelectItem>
            <SelectItem value="uf">
              <ChartArea />  
              UF
            </SelectItem>
            <SelectItem value="utm">
              <Receipt />
              UTM
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
      <ChartContainer config={chartConfig} className="max-h-96 w-full">
          <AreaChart
            accessibilityLayer
            data={data && data}
            margin={{
              left: 12,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              reversed
              dataKey="fecha"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <YAxis interval="preserveStartEnd" tickCount={7} domain={[(dataMin: number) => dataMin - 10, (dataMax: number) => dataMax + 10]} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="valor"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
