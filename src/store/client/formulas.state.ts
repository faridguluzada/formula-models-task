import { create } from "zustand";
import { IFormula } from "../server/queries";
import { evaluate } from "mathjs";

export interface IFormulaState {
  id: number;
  selectedFormulas: IFormula[];
  totalFormulaValue: null | number;
}

export interface IFormulaStore {
  formulas: IFormulaState[];
  addNewFormula: (formula: IFormulaState) => void;
  deleteFormula: (index: number) => void;
  setSelectedFormulas: (id: number, selectedFormulas: IFormula[]) => void;
  updateFormulaValue: (
    formulaId: number,
    { id, value }: { id: string; value: string }
  ) => void;
  calculateFormula: (id: number) => void;
}

export const useFormulaStore = create<IFormulaStore>((set, get) => ({
  formulas: [
    {
      id: 1,
      totalFormulaValue: 0,
      selectedFormulas: [],
    },
  ],

  addNewFormula: (formula: IFormulaState) => {
    set((state) => ({
      formulas: [...state.formulas, formula],
    }));
  },

  deleteFormula: (id: number) => {
    set((state) => ({
      formulas: state.formulas.filter((formula) => formula.id !== id),
    }));
  },

  setSelectedFormulas: (id: number, selectedFormulas: IFormula[]) =>
    set((state) => ({
      formulas: state.formulas.map((formula) =>
        formula.id === id ? { ...formula, selectedFormulas } : formula
      ),
    })),

  updateFormulaValue: (formulaId: number, { id, value }) =>
    set((state) => ({
      formulas: state.formulas.map((formula) =>
        formula.id === formulaId
          ? {
              ...formula,
              selectedFormulas: formula.selectedFormulas.map(
                (selectedFormula) =>
                  selectedFormula.id === id
                    ? {
                        ...selectedFormula,
                        value,
                      }
                    : selectedFormula
              ),
            }
          : formula
      ),
    })),

  calculateFormula: (id: number) => {
    const formula = get().formulas.find((f) => f.id === id);
    if (!formula || !formula.selectedFormulas.length) {
      set((state) => ({
        formulas: state.formulas.map((formula) =>
          formula.id === id ? { ...formula, totalFormulaValue: null } : formula
        ),
      }));
      return;
    }

    let calcValue = "";
    formula.selectedFormulas.forEach((selectedFormula) => {
      calcValue += ` ${selectedFormula.value}`;
    });

    try {
      const totalValue = evaluate(calcValue);
      set((state) => ({
        formulas: state.formulas.map((formula) =>
          formula.id === id
            ? { ...formula, totalFormulaValue: totalValue }
            : formula
        ),
      }));
    } catch (error) {
      set((state) => ({
        formulas: state.formulas.map((formula) =>
          formula.id === id ? { ...formula, totalFormulaValue: null } : formula
        ),
      }));
    }
  },
}));
