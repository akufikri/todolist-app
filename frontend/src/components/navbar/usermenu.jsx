import { useLogout } from "@/hooks/Auth";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { HiUser } from "react-icons/hi2";


export function UserMenu() {
      const { handleLogout } = useLogout();
      return (
            <>
                  <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                              <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                              >
                                    <HiUser className="text-2xl text-gray-500" />
                              </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                  </DropdownMenu>
            </>
      )
}