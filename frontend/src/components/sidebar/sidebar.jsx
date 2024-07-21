import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import { HiOutlineCollection, HiOutlineTrash } from "react-icons/hi";
import { TbNotes } from "react-icons/tb";
export function Sidebar() {
      return (
            <TooltipProvider>
                  <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex">
                        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                              <Link
                                    to="/"
                                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                              >
                                    <span className="sr-only">Acme Inc</span>
                                    <TbNotes />
                              </Link>
                              <Tooltip>
                                    <TooltipTrigger asChild>
                                          <Link
                                                to="/"
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                          >
                                                <HiOutlineCollection className="h-5 w-5" />
                                                <span className="sr-only">Todo</span>
                                          </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">Todo</TooltipContent>
                              </Tooltip>
                              {/* <Tooltip>
                                    <TooltipTrigger asChild>
                                          <Link
                                                to="/trash"
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                          >
                                                <HiOutlineTrash className="h-5 w-5" />
                                                <span className="sr-only">Trash</span>
                                          </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">Trash</TooltipContent>
                              </Tooltip> */}
                        </nav>

                  </aside>
            </TooltipProvider>
      );
}