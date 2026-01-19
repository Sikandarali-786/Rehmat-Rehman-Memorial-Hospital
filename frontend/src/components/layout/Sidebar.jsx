import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight, House, Menu } from "lucide-react";
import { GiToken } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import logOut from "../../../public/images/LogoutOutlined.png";

const menu = [
  { label: "Dashboard", icon: <House />, path: "/" },
  { label: "Patient Registration", icon: <FaUserPlus />, path: "/patientregister" },
  { label: "Patient List", icon: <FaUsers />, path: "/patientdata" },
  { label: "Booking Appointment", icon: <FaCalendarAlt />, path: "/bookingappointment" },
  { label: "Appointment List", icon: <FaUsers />, path: "/appointmentlist" },
  { label: "Token Summary", icon: <GiToken />, path: "/tokensummary" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarContent = ({ forceFull = false }) => {
    const sidebarExpanded = forceFull ? true : isOpen;

    const handleLogout = () => {
      logout();
      toast.success('Logged out successfully');
    };

    return (
      <>
        <div
          className={`h-screen flex flex-col bg-primary text-white transition-[width] duration-300 overflow-hidden ${sidebarExpanded ? "w-64" : "w-16"}`}>
          {!isMobile && (
            <button
              className="absolute top-4 -right-4 bg-muted-foreground text-white p-1 rounded-full shadow cursor-pointer z-10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {sidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          )}

          <div
            className="p-4 text-sm md:text-md font-bold border-b border-secondary cursor-pointer"
            onClick={() => navigate("/")}
          >
            {sidebarExpanded ? "🏥 Rehmat Rehman Hospital" : "🏥"}
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {menu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-4 p-3 rounded transition ${isActive ? "bg-secondary font-semibold" : "hover:bg-secondary"
                  }`
                }
              >
                <div className="text-lg">{item.icon}</div>
                {sidebarExpanded && <span className="text-base">{item.label}</span>}
              </NavLink>
            ))}
          </nav>
          <div
            className="flex items-center p-2 gap-2 text-white cursor-pointer hover:bg-primary hover:rounded-3xl mt-auto"
            onClick={handleLogout}
          >
            <img src={logOut} alt="logout" className={`w-5 h-5 transition-all duration-300`} />
            {isOpen && <span className="ml-2 transition-all duration-300">Logout</span>}
          </div>
        </div>
      </>

    );
  };

  return (
    <div className="relative">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-50"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent forceFull />
          </SheetContent>
        </Sheet>
      ) : (
        <SidebarContent />
      )}
    </div>
  );
};

export default Sidebar;