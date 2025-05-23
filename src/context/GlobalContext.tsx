import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";

type SerieItem = {
  fecha: string;
  valor: number;
};

type Indicator = {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: string;
  valor: number;
};

interface GlobalContextProps {
  dailyData: Indicator[] | null;
  indicatorData: SerieItem[] | null;
  fetchDataByIndicator: (economicIndicator: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("usePagesContext must be used within PageProvider");
  return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [dailyData, setDailyData] = useState<Indicator[] | null>(null);
  const [indicatorData, setIndicatorData] = useState<SerieItem[] | null>(null);
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
      setIndicatorData(result.serie);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

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

        // Transformar el objeto en un array de indicadores
        const filteredIndicators = ["dolar", "euro", "bitcoin", "uf", "utm"];
        const transformedData: Indicator[] = filteredIndicators.map((key) => result[key]);
        console.log(transformedData)
        setDailyData(transformedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchDataByIndicator("dolar");
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        dailyData,
        indicatorData,
        isLoading,
        error,
        fetchDataByIndicator,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;