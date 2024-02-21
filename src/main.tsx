import React from "react";
import ReactDOM from "react-dom/client";
import SearchTextProvider from "./providers/SearchTextProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchTextProvider>
      <RouterProvider router={router} />
    </SearchTextProvider>
  </React.StrictMode>
);
