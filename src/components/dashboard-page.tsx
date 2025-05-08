"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { IndicatorCard } from "./indicator-card"
import EconomicChart from "./economic-chart"

interface Indicator {
  codigo: string
  nombre: string
  unidad_medida: string
  fecha: string
  valor: number
  serie: Array<{
    fecha: string
    valor: number
  }>
}

interface ApiResponse {
  uf: Indicator
  ivp: Indicator
  dolar: Indicator
  dolar_intercambio: Indicator
  euro: Indicator
  ipc: Indicator
  utm: Indicator
  imacec: Indicator
  tpm: Indicator
  libra_cobre: Indicator
  tasa_desempleo: Indicator
  bitcoin: Indicator
  [key: string]: Indicator
}

export function DashboardPage() {
  const [indicators, setIndicators] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://mindicador.cl/api")
        if (!response.ok) {
          throw new Error("Error al obtener datos de la API")
        }
        const data: ApiResponse = await response.json()
        setIndicators(data)
        setError(null)
      } catch (err) {
        setError("Error al cargar los indicadores económicos")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getIndicatorCards = () => {
    if (!indicators) return []

    return [
      {
        code: "dolar",
        title: "Dólar Observado",
        value: `$${indicators.dolar.valor.toLocaleString("es-CL")}`,
        change: calculateChange(indicators.dolar),
        trend: calculateTrend(indicators.dolar),
        description: "CLP",
        color: "emerald",
      },
      {
        code: "bitcoin",
        title: "Bitcoin",
        value: `$${indicators.bitcoin.valor.toLocaleString("es-CL")}`,
        change: calculateChange(indicators.bitcoin),
        trend: calculateTrend(indicators.bitcoin),
        description: "USD",
        color: "amber",
      },
      {
        code: "euro",
        title: "Euro",
        value: `$${indicators.euro.valor.toLocaleString("es-CL")}`,
        change: calculateChange(indicators.euro),
        trend: calculateTrend(indicators.euro),
        description: "CLP",
        color: "sky",
      },
      {
        code: "uf",
        title: "UF",
        value: `$${indicators.uf.valor.toLocaleString("es-CL")}`,
        change: calculateChange(indicators.uf),
        trend: calculateTrend(indicators.uf),
        description: "CLP",
        color: "rose",
      },
      {
        code: "utm",
        title: "UTM",
        value: `$${indicators.utm.valor.toLocaleString("es-CL")}`,
        change: calculateChange(indicators.utm),
        trend: calculateTrend(indicators.utm),
        description: "CLP",
        color: "purple",
      },
    ]
  }

  const calculateChange = (indicator: Indicator) => {
    if (!indicator.serie || indicator.serie.length < 2) return "0.0%"

    const currentValue = indicator.valor
    const previousValue = indicator.serie[1]?.valor || 0

    if (previousValue === 0) return "0.0%"

    const change = ((currentValue - previousValue) / previousValue) * 100
    return `${change > 0 ? "+" : ""}${change.toFixed(2)}%`
  }

  const calculateTrend = (indicator: Indicator): "up" | "down" | "neutral" => {
      if (!indicator.serie || indicator.serie.length < 2) return "neutral"
  
      const currentValue = indicator.valor
      const previousValue = indicator.serie[1]?.valor || 0
  
      if (currentValue > previousValue) return "up"
      if (currentValue < previousValue) return "down"
      return "neutral"
    }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Indicadores Económicos</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-20 animate-pulse rounded bg-muted"></div>
                    <div className="mt-2 h-4 w-32 animate-pulse rounded bg-muted"></div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : error ? (
          <Card className="p-6 text-center text-destructive">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
              Reintentar
            </button>
          </Card>
        ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {getIndicatorCards().map(({ ...indicator }) => (
              <IndicatorCard key={indicator.code} indicator={indicator} />
            ))}
            </div>
        )}

        <div className="grid gap-4">
          <EconomicChart />
        </div>
      </div>
    </div>
  )
}
