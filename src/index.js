import React from "react";
import { createRoot, history } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
