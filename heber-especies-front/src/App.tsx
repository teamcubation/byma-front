import { MisEmisores } from "./components/MisEmisores"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { MisEspecies } from "./components/MisEspecies";
import MainLayout from "./MainLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MisEspecies />,
      },
      {
        path: "/abm-emisores",
        element: <MisEmisores />,
      },
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
