import { MenuIcon, MountainIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"

const navItems = [
    {
        label: "ABM Especies",
        href: "/",
    },
    {
        label: "ABM Emisores",
        href: "/abm-emisores",
    },
    {
        label: "ABM Acdis",
        href: "/abm-acdis",
    },
]
const Navbar = () => {
    return (
        <>
            <div className="flex items-center justify-between px-4 py-2 border-b-2 bg-white dark:bg-gray-800">
                <Link to="/" className="flex items-center gap-2">
                    <MountainIcon className="h-6 w-6" />
                    <span className="text-lg font-semibold">Byma Fondos</span>
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