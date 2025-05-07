import { createContext, useState, useEffect, useContext } from "react"
import type { ReactNode } from "react"

interface GlobalContextProps {
  dailyData: any;
  indicatorData: any;
  fetchDataByIndicator: (economicIndicator: string) => Promise<void>
  isLoading: boolean;
  error: string | null;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) throw new Error("usePagesContext must be used within PageProvider")
  return context
}

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [dailyData, setDailyData] = useState(null);
  const [indicatorData, setIndicatorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataByIndicator = async (economicIndicator: string) => {
    setError(null);
    try {
      const response = await fetch(`https://mindicador.cl/api/${economicIndicator}/2025`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
      const result = await response.json();
      console.log(result.serie)
      setIndicatorData(result.serie);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://mindicador.cl/api");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        const result = await response.json();
        setDailyData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData()
    fetchDataByIndicator("dolar")
  }, []);

  return (
    <GlobalContext.Provider value={{ dailyData, indicatorData, isLoading, error, fetchDataByIndicator, }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;