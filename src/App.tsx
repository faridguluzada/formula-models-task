import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./components/ui/AppLayout";
import { PrimeReactProvider } from "primereact/api";
import "./scss/main.scss";

import "primereact/resources/themes/lara-light-cyan/theme.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <AppLayout />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
