import { FiInfo } from "react-icons/fi";

import { formatCurrentDate } from "../../../lib/utils";

function FormulaContent({ totalValue }: { totalValue: number | null }) {
  return (
    <>
      {totalValue === null && (
        <div className="accordion__error-box">
          <FiInfo size={25} color="red" />
          <span>#ERROR</span>
        </div>
      )}

      {totalValue !== null && <span>{totalValue}</span>}

      <div className="accordion__date-box">
        <div className="accordion__date">{formatCurrentDate()}</div>
      </div>
    </>
  );
}

export default FormulaContent;
