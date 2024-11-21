import { MisEmisores } from "./components/MisEmisores"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NuevoEmisor } from "./components/NuevoEmisor";
import { Toaster } from "./components/ui/sonner";
import { MisEspecies } from "./components/especie/MisEspecies";


export const App = () => {
  return (
    <>
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<MisEspecies />} />

          <Route path="/nuevoEmisor" element={<NuevoEmisor />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors theme='light' toastOptions={{}} position="top-right" closeButton />
    </>
  )
}
