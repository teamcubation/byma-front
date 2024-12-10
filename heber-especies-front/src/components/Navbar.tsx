import { LogOut, MenuIcon, MountainIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import "./style/Navbar.css"

const navItems = [
    {
        label: "ABM Acdis",
        href: "/abm-acdis",
    },
    {
        label: "ABM Especies",
        href: "/abm-especies",
    },
    {
        label: "ABM Emisores",
        href: "/abm-emisores",
    },
    {
        label: "ABM Gerentes",
        href: "/abm-gerentes",
    },
    {
        label: "ABM Billeteras",
        href: "/abm-billeteras",
    },
]
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="custom-bg-nav flex items-center justify-between px-4 py-2 "> {/* border-b-2 bg-white dark:bg-gray-800 */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="src/components/images/logo-byma-fondos.png" className="h-150 w-40" />
                </Link>
                <div className="hidden md:flex gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            {item.label}
                        </Link>
                    ))}
                    {
                        window.localStorage.getItem('accessToken') && (
                            <Button variant="outline" size="icon" onClick={() => {
                                window.localStorage.clear();
                                navigate("/");
                            }}>
                                <LogOut size={24} strokeWidth={2} />
                            </Button>
                        )
                    }
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="grid w-[200px] p-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="text-sm font-medium hover:underline underline-offset-4"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default Navbar