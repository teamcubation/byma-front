import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
  } from "@/components/ui/breadcrumb";
  import { useLocation } from "react-router-dom";
  
  // Define la estructura de los items del breadcrumb
  interface BreadcrumbItem {
    label: string;
    href: string;
  }

function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
    const routes: Record<string, string> = {
        "/": "Especies",
        "/abm-emisores": "Emisores",
        "/abm-gerentes": "Gerentes",
        "/abm-acdi": "ACDI"
    };
    
    // Divide la ruta actual en segmentos
    const pathnames = pathname.split("/").filter(Boolean);
    
    // Crea las rutas acumulativas
    const breadcrumbPaths = pathnames.reduce<string[]>((paths, curr) => {
        const lastPath = paths[paths.length - 1];
        return [...paths, `${lastPath}/${curr}`];
    }, [""]);
    
    // Genera los items del breadcrumb
    const items = breadcrumbPaths.map((path) => ({
        label: routes[path] || path.replace("/", ""),
        href: path || "/",
    }));
    
    // Siempre agrega "Especies" como el primer elemento
    return [{ label: "Especies", href: "/" }, ...items.slice(1)];
}
  
  export function BreadcrumbDemo() {
    const location = useLocation();
  
    // Genera los elementos del breadcrumb dinámicamente
    const breadcrumbItems = getBreadcrumbItems(location.pathname);
  
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={item.href}>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  

  