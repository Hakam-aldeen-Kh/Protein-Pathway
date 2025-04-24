import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";


import "./styles/index.css";
import "./styles/global.css";

import AppRouter from "./routes/AppRouter.jsx";
import AuthProvider from "./constants/AuthProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
