import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// fonts
import "@/fonts/GothamBold.ttf";
import "@/fonts/GothamBoldItalic.ttf";
import "@/fonts/GothamBook.ttf";
import "@/fonts/GothamBookItalic.ttf";
import "@/fonts/GothamLight.ttf";
import "@/fonts/GothamLightItalic.ttf";
import "@/fonts/GothamMedium.ttf";
import "@/fonts/GothamMediumItalic.ttf";

import { TokenProvider } from "./context/TokenContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <App />
  </TokenProvider>
);
