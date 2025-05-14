
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Bell, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold text-lg">
            License Manager
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link to="/applications" className="text-sm font-medium hover:underline">
              Applications
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className="flex-col items-start">
                <div className="font-medium">{user?.name || "User"}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="md:hidden">
        <nav className="flex px-4 overflow-auto pb-3 gap-4">
          <Link to="/" className="text-sm font-medium hover:underline whitespace-nowrap">
            Dashboard
          </Link>
          <Link to="/applications" className="text-sm font-medium hover:underline whitespace-nowrap">
            Applications
          </Link>
        </nav>
      </div>
    </header>
  );
}
