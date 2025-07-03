import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routerApp from "./routes";
import { RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routerApp} />
    <Toaster position="top-right" />
  </StrictMode>
);
