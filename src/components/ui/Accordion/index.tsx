import { useState } from "react";
import { TbCaretRightFilled, TbInfoCircleFilled, TbDots } from "react-icons/tb";

import FormulaInput from "../../features/FormulaInput";
import FormulaContent from "../../features/FormulaContent";

import { useFormulaStore } from "../../../store/client/formulas.state";

import { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

import "./Accordion.scss";

function Accordion() {
  const { formulas, deleteFormula } = useFormulaStore();
  const menuRefs = useRef<Array<Menu | null>>(
    Array(formulas.length).fill(null)
  );

  const [selected, setSelected] = useState<number | null>(0);
  const [scrollHeight, setScrollHeight] = useState<string | number>(0);

  const toggleHandler = (_: unknown, index: number) => {
    const contentEl = document.querySelector(".accordion__content");

    if (!contentEl) return;

    setScrollHeight(contentEl.scrollHeight + "px");

    if (selected === index) {
      setSelected(null);
      return;
    }

    setSelected(index);
  };

  return (
    <div className="formulas">
      {formulas.map((formula, index) => (
        <div key={formula.id} className="accordion">
          <div className="accordion__header">
            <div>
              <TbCaretRightFilled
                className="arrow_icon"
                size={18}
                onClick={(e) => toggleHandler(e, index)}
              />
              <h4 className="accordion__title">Revenue</h4>
            </div>
            <div>
              <TbInfoCircleFilled size={20} />

              <Menu
                model={[
                  {
                    label: "Delete",
                    command: () => {
                      deleteFormula(formula.id);
                    },
                  },
                ]}
                popup
                ref={(el) => (menuRefs.current[index] = el)}
                id={`popup_menu_right_${index}`}
                popupAlignment="right"
              />
              <Button
                className="action-btn"
                onClick={(event) => menuRefs.current[index]?.toggle(event)}
                aria-controls={`popup_menu_right_${index}`}
                aria-haspopup
              >
                <TbDots size={20} />
              </Button>
            </div>
          </div>
          <div className="accordion__body">
            <FormulaContent totalValue={formula.totalFormulaValue} />
          </div>

          <div
            className="accordion__content"
            style={{
              maxHeight: `${selected === index ? scrollHeight : 0}`,
            }}
          >
            <FormulaInput formula={formula} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
