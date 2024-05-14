import { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";

import {
  IFormulaState,
  useFormulaStore,
} from "../../../store/client/formulas.state";

import { IFormula, useGetFormulas } from "../../../store/server/queries";
import { operators } from "../../../lib/constants";
import InputTag from "../InputTag";

function FormulaInput({ formula }: { formula: IFormulaState }) {
  const { formulasData } = useGetFormulas();

  const { setSelectedFormulas, calculateFormula } = useFormulaStore();
  const [filteredFormulas, setFilteredFormulas] = useState<IFormula[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    if (!formulasData?.length) return;

    const { query } = event;
    let newFilteredFormulas: IFormula[];

    if (operators.includes(query)) {
      setSelectedFormulas(formula.id, [
        ...formula.selectedFormulas,
        {
          name: query,
          category: "operator",
          value: query,
        },
      ]);

      if (
        event.originalEvent &&
        event.originalEvent.target instanceof HTMLInputElement
      ) {
        event.originalEvent.target.value = "";
      }
      return;
    }

    if (!query.trim().length) {
      newFilteredFormulas = [...formulasData];
    } else {
      newFilteredFormulas = formulasData.filter((formula: IFormula) => {
        return formula.name.toLowerCase().startsWith(query.toLowerCase());
      });
    }
    setFilteredFormulas(newFilteredFormulas);
  };

  return (
    <AutoComplete
      field="name"
      multiple
      value={formula.selectedFormulas}
      forceSelection={true}
      completeMethod={search}
      suggestions={filteredFormulas}
      onChange={(e) => setSelectedFormulas(formula.id, e.value)}
      selectedItemTemplate={(option) => (
        <InputTag id={formula.id} option={option} />
      )}
      style={{ width: "100%", padding: "1.5rem 3rem" }}
      onBlur={() => calculateFormula(formula.id)}
      color="secondary"
    />
  );
}

export default FormulaInput;
