import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
;
import 'bootstrap/dist/css/bootstrap.css';



import App from "./App";
import Payment from "./components/Payment";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Payment />
  </StrictMode>
);
