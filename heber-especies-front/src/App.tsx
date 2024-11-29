import { MisEmisores } from "./components/MisEmisores"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { MisEspecies } from "./components/especie/MisEspecies";
import MainLayout from "./MainLayout";
import { MisAcdis } from "./components/acdis/MisAcdis";
import { NuevoAcdi } from "./components/acdis/NuevoAcdi";
import { NuevoEmisor } from "./components/NuevoEmisor";
import { EditarEmisor } from "./components/EditarEmisor";
import path from "path";
import FormEspecie from "./components/especie/FormEspecie";
import { MisGerentes } from "./components/features/gerente/AbmGerentes";
import { FormGerente } from "./components/features/gerente/FormGerente";
import LoginPage from "./components/features/login/LoginPage";
import Pagina404 from "./components/features/Pagina404/Pagina404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LoginPage/>
      },
      {
        path: "/abm-especies",
        element: <MisEspecies />,
      },
      {
        path: "/edit-Especie/:id",
        element: <FormEspecie />,
      },
      {
        path: "/Form-Especie",
        element: <FormEspecie />,
      },
      {
        path: "/abm-emisores",
        element: <MisEmisores />,
      },
      {
        path: "/abm-acdis",
        element: <MisAcdis />
      },
      {
        path: "/nuevo-acdi",
        element: <NuevoAcdi />
      },
      {
        path: "/editar-acdi/:id",
        element: <NuevoAcdi />,
      },
      {
        path: "/nuevo-emisor",
        element: <NuevoEmisor />,
      }
      ,
      {
        path: "/editar-emisor/:id",
        element: <EditarEmisor />,
      },
      {
        path: "/abm-gerentes",
        element: <MisGerentes />,
      },
      {
        path: "/nuevo-gerente",
        element: <FormGerente />,
      }
      ,
      {
        path: "/editar-gerente/:id",
        element: <FormGerente />,
      },
      {
        path: "*",
        element: <Pagina404/>
      }
    ],

  }
])
export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors theme='light' duration={3000} toastOptions={{}} position="top-right" closeButton />
    </>
  )
}
