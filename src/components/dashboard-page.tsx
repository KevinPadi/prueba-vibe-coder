import { useGlobalContext } from "@/context/GlobalContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IndicatorCard } from "./indicator-card"
import EconomicChart from "./economic-chart"

export function DashboardPage() {
  const { dailyData, isLoading, error } = useGlobalContext()

  console.log(dailyData)

  const getIndicatorCards = () => {
    if (!dailyData) return []

    const indicators = [
      { code: "dolar", title: "Dólar Observado", color: "emerald", description: "CLP" },
      { code: "bitcoin", title: "Bitcoin", color: "amber", description: "USD" },
      { code: "euro", title: "Euro", color: "sky", description: "CLP" },
      { code: "uf", title: "UF", color: "rose", description: "CLP" },
      { code: "utm", title: "UTM", color: "purple", description: "CLP" },
    ]

    return indicators.map(({ code, title, color, description }) => ({
      code,
      title,
      color,
      description,
      value: `$${Number(dailyData[code]?.valor).toLocaleString("es-CL")}`,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Indicadores Económicos</h2>
        </div>

        {isLoading ? (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array(5).fill(0).map((_, i) => (
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
          </section>
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
            {dailyData?.map((indicator) => (
              <IndicatorCard key={indicator.codigo} indicator={indicator} />
            ))}
          </div>
        )}

        <section className="grid gap-4">
          <EconomicChart />
        </section>
      </div>
    </div>
  )
}
