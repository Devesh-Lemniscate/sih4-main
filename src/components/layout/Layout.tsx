import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const hideNavbarPaths = ["/login"]; // Hide navbar on login/signup page
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  return (
    <div className="min-h-screen bg-background">
      {shouldShowNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
}