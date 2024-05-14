import { useQuery } from "@tanstack/react-query";

export interface IFormula {
  id?: string;
  name: string;
  category: string;
  value: number | string;
  inputs?: string;
}

async function getFormulas(): Promise<IFormula[]> {
  try {
    const res = await fetch(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );
    const data: IFormula[] = await res.json();
    return data;
  } catch (error) {
    throw new Error("Something went wrong 🫤");
  }
}

export function useGetFormulas() {
  const {
    data: formulasData,
    isLoading,
    error,
  } = useQuery<IFormula[]>({
    queryKey: ["formulas"],
    queryFn: getFormulas,
  });

  return { formulasData, isLoading, error };
}
