import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Compass, Menu, User, AlertTriangle, LogOut, UserCircle2, NotebookPen, Settings, Search, MapPin } from "lucide-react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  fullName?: string;
  profileImage?: string;
  avatar?: string;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Hotels", href: "/hotels" },
  { name: "AI Planner", href: "/itinerary", badge: "AI" },
  { name: "AR Maps", href: "/ar-map", badge: "NEW" },
  { name: "Discover", href: "/recommendations" },
  { name: "Events", href: "/events" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      const user = raw ? JSON.parse(raw) : null;
      setAuthUser(user);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    setAuthUser(null);
    navigate("/");
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-border/30 sticky top-0 z-50 backdrop-blur-xl bg-white/90 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center min-w-0 flex-1">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
                className="relative"
              >
                <MapPin className="h-9 w-9 text-primary group-hover:text-accent transition-colors duration-300 drop-shadow-lg" />
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-accent/20 transition-all duration-300 scale-150"></div>
              </motion.div>
              <div className="ml-3">
                <span className="text-xl font-display font-bold text-gradient bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Jharkhand
                </span>
                <div className="text-[10px] text-muted-foreground/80 font-medium tracking-[0.2em] uppercase">
                  Tourism
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:ml-6 xl:ml-8 lg:flex lg:space-x-1 min-w-0">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`relative inline-flex items-center px-2 xl:px-3 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group whitespace-nowrap ${
                      isActivePath(item.href)
                        ? "text-white bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25 scale-105"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 hover:shadow-md"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {item.name}
                      {item.badge && (
                        <motion.span 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`px-2 py-1 text-[10px] font-bold rounded-full leading-none shadow-lg border ${
                            item.badge === "AI" 
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-300"
                              : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300"
                          }`}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </span>
                    {!isActivePath(item.href) && (
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Actions: Search | SOS | Login/Profile */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-3 flex-shrink-0">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input 
                placeholder="Discover..." 
                className="w-48 xl:w-64 pl-10 pr-3 py-2 bg-white/70 border-border/40 focus:border-primary/60 focus:bg-white/90 transition-all duration-300 rounded-xl shadow-sm focus:shadow-lg text-sm" 
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link to="/safety">
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 font-semibold px-3 xl:px-4 rounded-xl border-0 text-sm"
                >
                  <AlertTriangle className="h-4 w-4 xl:mr-1" />
                  <span className="hidden xl:inline">SOS</span>
                </Button>
              </Link>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-xl blur opacity-20 -z-10"
              />
            </motion.div>
            
            {authUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      className="relative h-10 w-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 p-0"
                    >
                      {authUser.profileImage ? (
                        <img src={authUser.profileImage} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-primary" />
                      )}
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-0 glass-card border-border/30 shadow-xl mr-2">
                  {/* User Profile Header */}
                  <div className="bg-gradient-to-r from-primary/90 to-accent/90 p-4 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                        {authUser.profileImage ? (
                          <img src={authUser.profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <UserCircle2 className="h-7 w-7 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white drop-shadow-sm truncate">{authUser.fullName || "User"}</h3>
                        <p className="text-white/90 text-sm drop-shadow-sm truncate">{authUser.email || "user@example.com"}</p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* Quick Actions */}
                  <div className="p-2">
                    <Link to="/journal">
                      <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 hover:text-foreground rounded-lg p-3 text-foreground/80 transition-all duration-200">
                        <NotebookPen className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                        <span className="font-medium">Travel Journal</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/profile">
                      <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 hover:text-foreground rounded-lg p-3 text-foreground/80 transition-all duration-200">
                        <UserCircle2 className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                        <span className="font-medium">Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 hover:text-foreground rounded-lg p-3 text-foreground/80 transition-all duration-200" asChild>
                      <Link to="/settings">
                        <Settings className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                        <span className="font-medium">Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <DropdownMenuItem className="cursor-pointer hover:bg-red-50 focus:bg-red-50 rounded-lg p-3 text-red-600 hover:text-red-700 transition-all duration-200" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span className="font-medium">Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login">
                  <Button variant="outline" className="bg-white/50 hover:bg-white/80 border-primary/30 hover:border-primary/60 text-primary font-semibold px-3 xl:px-4 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-sm">
                    <User className="h-4 w-4 xl:mr-2" />
                    <span className="hidden xl:inline">Sign In</span>
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile SOS */}
            <Link to="/safety">
              <Button variant="destructive" size="sm" className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
                <AlertTriangle className="h-4 w-4" />
              </Button>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <Menu className="h-6 w-6 text-primary" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[380px] bg-white/95 backdrop-blur-xl">
                <div className="flex flex-col space-y-6 pt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 pb-6 border-b border-border/30">
                    <MapPin className="h-8 w-8 text-primary" />
                    <div>
                      <span className="text-xl font-display font-bold text-gradient">Jharkhand</span>
                      <div className="text-[10px] text-muted-foreground font-medium tracking-[0.2em] uppercase">Tourism</div>
                    </div>
                  </div>
                  
                  {/* Mobile Search */}
                  <div className="px-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <Input placeholder="Discover Jharkhand..." className="pl-10 bg-white/70 border-border/40 rounded-xl" />
                    </div>
                  </div>
                  
                  {/* Mobile Navigation */}
                  <div className="space-y-2">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            isActivePath(item.href)
                              ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {item.name}
                            {item.badge && (
                              <span className={`px-2 py-1 text-[10px] font-bold rounded-full shadow-lg border ${
                                item.badge === "AI" 
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-300"
                                  : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300"
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Mobile Actions */}
                  <div className="pt-6 border-t border-border/30 space-y-3">
                    <Link to="/safety" onClick={() => setIsOpen(false)}>
                      <Button variant="destructive" className="w-full justify-start bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl">
                        <AlertTriangle className="h-4 w-4 mr-3" />
                        Emergency SOS
                      </Button>
                    </Link>
                    
                    {authUser ? (
                      <>
                        <Link to="/journal" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start rounded-xl border-primary/30 hover:bg-primary/5">
                            <NotebookPen className="h-4 w-4 mr-3" />
                            Travel Journal
                          </Button>
                        </Link>
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                          <Button className="w-full justify-start bg-gradient-to-r from-primary to-accent text-white rounded-xl">
                            <User className="h-4 w-4 mr-3" />
                            {authUser.fullName || "Profile"}
                          </Button>
                        </Link>
                        <Link to="/settings" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start rounded-xl border-primary/30 hover:bg-primary/5">
                            <Settings className="h-4 w-4 mr-3" />
                            Settings
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-red-600 hover:bg-red-50 border-red-200 rounded-xl" 
                          onClick={() => { handleLogout(); setIsOpen(false); }}
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-start bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold">
                          <User className="h-4 w-4 mr-3" />
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}