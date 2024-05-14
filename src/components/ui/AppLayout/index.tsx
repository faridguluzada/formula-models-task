import Accordion from "../Accordion";
import Header from "../Header";

import "./AppLayout.scss";

function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <Accordion />
    </div>
  );
}

export default AppLayout;
