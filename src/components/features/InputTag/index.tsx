import { useState } from "react";
import { useFormulaStore } from "../../../store/client/formulas.state";

import "./InputTag.scss";

interface ITag {
  id?: string;
  name: string;
  value: number;
  category: string;
}

function InputTag({ id, option }: { id: number; option: ITag }) {
  const { id: optionId, category, name, value } = option;

  const { updateFormulaValue, calculateFormula } = useFormulaStore();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div className="tag">
      {category === "operator" && <p className="tag__name">{name}</p>}
      {category !== "operator" && (
        <>
          <p className="tag__name">{name}</p> |
          {!isEdit ? (
            <p className="tag__value" onClick={() => setIsEdit(true)}>
              [{value}]
            </p>
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) =>
                updateFormulaValue(id, {
                  id: optionId as string,
                  value: e.target.value,
                })
              }
              style={{ width: "40px" }}
              autoFocus={true}
              onBlur={() => {
                setIsEdit(false);
                calculateFormula(id);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default InputTag;
