import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { UserMenu } from "./usermenu";
import { Breadcrumbs } from "./breadcrumbs";
import { FiSidebar } from "react-icons/fi";
import { HiOutlineCollection } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";
import { useAuth } from "@/hooks/Auth";


export function Navbar() {
      const { user, isAuthenticated } = useAuth();
      return (
            <div className="md:pl-14 pt-2">
                  <header className="sticky top-0 z-30 flex h-14 items-center md:justify-end justify-between py-2 gap-4 border-b bg-background px-5 md:static md:h-auto md:border-0 md:bg-transparent md:px-6">
                        <Sheet>
                              <SheetTrigger asChild>
                                    <Button size="icon" variant="outline" className="md:hidden">
                                          <FiSidebar className="h-5 w-5" />
                                          <span className="sr-only">Toggle Menu</span>
                                    </Button>
                              </SheetTrigger>
                              <SheetContent side="left" className="md:max-w-xs">
                                    <nav className="grid gap-6 text-lg font-medium">
                                          <Link
                                                to="/"
                                                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                                                <span className="sr-only">Todo Kita</span>

                                          </Link>
                                    </nav>
                                    <nav className="grid mt-5 text-lg font-medium">
                                          <Link to="/" className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-lg">
                                                <HiOutlineCollection className="h-5 w-5" />
                                                Todo
                                          </Link>
                                          {/* <Link to="/trash" className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-lg">
                                                <HiOutlineTrash className="h-5 w-5" />
                                                Trash
                                          </Link> */}
                                    </nav>
                              </SheetContent>
                        </Sheet>
                        {/* <Breadcrumbs /> */}
                        <div className="flex items-center gap-3">
                              {isAuthenticated && user && (
                                    <div className="block text-right">
                                          <p className="text-xs font-semibold">{user.name}</p>
                                          <p className="block text-xs">{user.email}</p>
                                    </div>
                              )}
                              <UserMenu />
                        </div>
                  </header>
            </div>
      )
}