import { DollarSignIcon, EuroIcon, Bitcoin, ChartAreaIcon, ReceiptIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface IndicatorProps {
  indicator: {
    code: string
    title: string
    value: string
    change: string
    trend: "up" | "down" | "neutral"
    description: string
    color: string
  }
}

export function IndicatorCard({ indicator }: IndicatorProps) {
  const { title, value, description, color } = indicator

  const getColorClass = () => {
    switch (color) {
      case "emerald":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
      case "rose":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"
      case "amber":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
      case "sky":
        return "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400"
      case "purple":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getCurrencyIcon = () => {
    switch (indicator.title) {
      case "Dólar Observado":
        return <DollarSignIcon className="size-5" />
      case "Euro":
        return <EuroIcon className="size-5" />
      case "Bitcoin":
        return <Bitcoin className="size-5" />
      case "UF":
        return <ChartAreaIcon className="size-5" />
      case "UTM":
        return <ReceiptIcon className="size-5" />
      default:
        return <span className="text-lg">💰</span>
    }
  }

  return (
    <Card className="overflow-hidden border-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`rounded-full p-1 ${getColorClass()}`}>{getCurrencyIcon()}</div>
        
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center">
          <CardDescription className="ml-2 text-xs text-muted-foreground">{description}</CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
