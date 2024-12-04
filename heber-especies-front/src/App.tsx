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
import { SuscripcionList } from "./components/suscripcion/SuscripcionList";
import { NuevaSuscripcion } from "./components/suscripcion/NuevaSuscripcion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/abm-especies",
        element: <MisEspecies />,
      }, {
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
        element: <MisAcdis/>
      },
      {
        path: "/nuevo-acdi",
        element: <NuevoAcdi/>
      },
      {
        path: "/editar-acdi/:id",
        element: <NuevoAcdi/>,
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
      },
      {
        path: "/editar-gerente/:id",
        element: <FormGerente />,
      },
      {
        path: "/abm-suscripciones",
        element: <SuscripcionList />,
      },
      {
        path:"/nueva-suscripcion",
        element: <NuevaSuscripcion />
      },
      {
        path:"/editar-suscripcion/:id",
        element: <NuevaSuscripcion />
      }
    ],
    
  }
])
export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors theme='light' toastOptions={{}} position="top-right" closeButton />
    </>
  )
}
