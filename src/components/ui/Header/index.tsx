import SquareRootIcon from "../../../assets/icons/square-root-2.svg";
import Plus from "../../../assets/icons/plus.svg";

import "./Header.scss";
import { useFormulaStore } from "../../../store/client/formulas.state";

function Header() {
  const { addNewFormula } = useFormulaStore();

  return (
    <div className="header">
      <div className="header__text-box">
        <img src={SquareRootIcon} alt="Square Root Icon" />
        <h3>Formulas (2)</h3>
      </div>

      <div
        className="header__plus-box"
        onClick={() =>
          addNewFormula({
            id: Math.random(),
            totalFormulaValue: 0,
            selectedFormulas: [],
          })
        }
      >
        <img className="header__plus" src={Plus} alt="Plus Icon" />
      </div>
    </div>
  );
}

export default Header;
