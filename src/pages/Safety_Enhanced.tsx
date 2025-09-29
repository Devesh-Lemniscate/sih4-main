import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { 
  sendSOSAlert, 
  getCurrentLocation, 
  shareLocationWithContacts,
  getSOSHistory,
  updateSOSStatus,
  type LocationData,
  type EmergencyContact,
  type SOSAlert
} from "@/lib/sosApi";
import { 
  AlertTriangle,
  Phone,
  MapPin,
  Shield,
  Users,
  Clock,
  Heart,
  Wifi,
  Navigation,
  Camera,
  Lock,
  CheckCircle,
  Info,
  PhoneCall,
  MessageSquare,
  Share2,
  Download,
  UserCheck,
  Ambulance,
  Building,
  ShieldCheck,
  MapIcon,
  Zap,
  Bell
} from "lucide-react";

const Safety = () => {
  const [sosActive, setSosActive] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", number: "", relationship: "" });
  const [locationSharing, setLocationSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [sosHistory, setSosHistory] = useState<SOSAlert[]>([]);
  const [loading, setLoading] = useState(false);

  // Load emergency contacts from localStorage on component mount
  useEffect(() => {
    try {
      const authUser = localStorage.getItem("auth_user");
      let contacts: EmergencyContact[] = [];
      
      if (authUser) {
        const user = JSON.parse(authUser);
        if (user.emergencyContactName && user.emergencyContactPhone && user.emergencyContactRelation) {
          const primaryContact: EmergencyContact = {
            id: 1,
            name: user.emergencyContactName,
            number: user.emergencyContactPhone,
            relationship: user.emergencyContactRelation
          };
          contacts.push(primaryContact);
        }
      }
      
      // Load additional contacts
      const additionalContacts = localStorage.getItem("additional_emergency_contacts");
      if (additionalContacts) {
        const parsed = JSON.parse(additionalContacts);
        contacts = [...contacts, ...parsed];
      }
      
      setEmergencyContacts(contacts);
    } catch (error) {
      console.error("Error loading emergency contacts:", error);
    }
  }, []);

  const emergencyServices = [
    {
      name: "Police Emergency",
      number: "100",
      icon: Shield,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      description: "For immediate police assistance"
    },
    {
      name: "Medical Emergency", 
      number: "108",
      icon: Ambulance,
      color: "bg-gradient-to-br from-red-600 to-red-700",
      description: "Ambulance and medical help"
    },
    {
      name: "Fire Department",
      number: "101",
      icon: Phone,
      color: "bg-gradient-to-br from-orange-600 to-orange-700",
      description: "Fire emergencies and rescue"
    },
    {
      name: "Tourist Helpline",
      number: "1363",
      icon: Building,
      color: "bg-gradient-to-br from-forest-600 to-forest-700",
      description: "Tourism-related assistance"
    }
  ];

  const safetyTips = [
    {
      icon: MapPin,
      title: "Share Your Location",
      description: "Always share your real-time location with trusted contacts when exploring."
    },
    {
      icon: Users,
      title: "Travel in Groups",
      description: "Explore tourist destinations with companions whenever possible."
    },
    {
      icon: Camera,
      title: "Document Your Journey",
      description: "Take photos of locations and send them to family/friends."
    },
    {
      icon: Wifi,
      title: "Stay Connected",
      description: "Keep your phone charged and ensure network connectivity."
    },
    {
      icon: Lock,
      title: "Secure Belongings",
      description: "Keep valuables safe and be aware of your surroundings."
    },
    {
      icon: Navigation,
      title: "Know Your Route",
      description: "Plan your routes and inform others about your travel plans."
    }
  ];

  // Copy existing functions from original Safety.tsx
  const handleSOSAlert = async () => {
    if (sosActive) {
      setSosActive(false);
      return;
    }

    setLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      
      const alertData = {
        location,
        timestamp: new Date(),
        contacts: emergencyContacts
      };
      
      await sendSOSAlert(alertData);
      setSosActive(true);
      
      // Share location with contacts
      if (emergencyContacts.length > 0) {
        await shareLocationWithContacts(location, emergencyContacts);
      }
      
    } catch (error) {
      console.error("Error sending SOS alert:", error);
      alert("Failed to send SOS alert. Please try again or call emergency services directly.");
    } finally {
      setLoading(false);
    }
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.number) {
      const contact: EmergencyContact = {
        id: Date.now(),
        ...newContact
      };
      
      const updatedContacts = [...emergencyContacts, contact];
      setEmergencyContacts(updatedContacts);
      
      // Save to localStorage
      const additionalContacts = updatedContacts.filter((_, index) => index > 0); // Exclude primary contact
      localStorage.setItem("additional_emergency_contacts", JSON.stringify(additionalContacts));
      
      setNewContact({ name: "", number: "", relationship: "" });
      setShowAddContact(false);
    }
  };

  const removeContact = (id: number) => {
    const updatedContacts = emergencyContacts.filter(contact => contact.id !== id);
    setEmergencyContacts(updatedContacts);
    
    const additionalContacts = updatedContacts.filter((_, index) => index > 0);
    localStorage.setItem("additional_emergency_contacts", JSON.stringify(additionalContacts));
  };

  const toggleLocationSharing = () => {
    setLocationSharing(!locationSharing);
    if (!locationSharing) {
      getCurrentLocation().then(setCurrentLocation);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Enhanced Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-16 bg-gradient-to-r from-forest-600 to-forest-700 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
            <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500" />
          </div>
          
          <div className="relative container mx-auto px-6 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
            >
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-medium">Your Safety is Our Priority</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Travel Safe,
              <span className="block text-terracotta-300">Explore Fearless</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Advanced safety features and emergency assistance to ensure your Jharkhand adventure is both thrilling and secure.
            </motion.p>
          </div>
        </motion.section>

        <div className="container mx-auto px-6 py-12">
          {/* SOS Emergency Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12"
          >
            <Card className="tourism-card border-0 shadow-2xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="section-title">Emergency SOS</CardTitle>
                <p className="text-muted-foreground">Quick access to emergency services</p>
              </CardHeader>
              <CardContent className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSOSAlert}
                  disabled={loading}
                  className={`relative w-48 h-48 rounded-full border-8 mx-auto mb-6 transition-all duration-300 ${
                    sosActive
                      ? "bg-red-600 border-red-400 shadow-red-500/50 animate-pulse"
                      : "bg-gradient-to-br from-red-500 to-red-600 border-red-300 hover:shadow-red-500/30"
                  } shadow-2xl`}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white">
                    {loading ? (
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
                    ) : (
                      <>
                        <AlertTriangle className="h-16 w-16 mb-2" />
                        <span className="text-xl font-bold">
                          {sosActive ? "ACTIVE" : "SOS"}
                        </span>
                      </>
                    )}
                  </div>
                </motion.button>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {sosActive 
                    ? "SOS Alert Active - Help is on the way" 
                    : "Press and hold to send emergency alert"
                  }
                </p>
                
                {sosActive && (
                  <Alert className="mb-4 border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      Emergency alert sent to your contacts and local authorities.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Emergency Services Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="section-title text-center mb-8">Emergency Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencyServices.map((service, index) => (
                <motion.div
                  key={service.number}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="tourism-card hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={() => window.open(`tel:${service.number}`)}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${service.color}`}>
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                      <div className="text-2xl font-bold text-forest-600 mb-2">{service.number}</div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Safety Features Tabs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Tabs defaultValue="contacts" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="contacts" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Emergency Contacts
                </TabsTrigger>
                <TabsTrigger value="location" className="flex items-center gap-2">
                  <MapIcon className="h-4 w-4" />
                  Location Sharing
                </TabsTrigger>
                <TabsTrigger value="tips" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Safety Tips
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contacts">
                <Card className="tourism-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Emergency Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {emergencyContacts.length > 0 ? (
                      <div className="space-y-4">
                        {emergencyContacts.map((contact) => (
                          <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-semibold">{contact.name}</h4>
                              <p className="text-sm text-muted-foreground">{contact.number}</p>
                              <Badge variant="secondary" className="mt-1">{contact.relationship}</Badge>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeContact(contact.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No emergency contacts added yet.
                      </p>
                    )}

                    {showAddContact ? (
                      <div className="mt-6 p-4 border rounded-lg space-y-4">
                        <Input
                          placeholder="Name"
                          value={newContact.name}
                          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        />
                        <Input
                          placeholder="Phone Number"
                          value={newContact.number}
                          onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                        />
                        <Input
                          placeholder="Relationship"
                          value={newContact.relationship}
                          onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                        />
                        <div className="flex gap-2">
                          <Button onClick={addEmergencyContact}>Add Contact</Button>
                          <Button variant="outline" onClick={() => setShowAddContact(false)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => setShowAddContact(true)} className="mt-4">
                        Add Emergency Contact
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location">
                <Card className="tourism-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Location Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">Real-time Location Sharing</h4>
                        <p className="text-sm text-muted-foreground">Share your live location with emergency contacts</p>
                      </div>
                      <Button
                        onClick={toggleLocationSharing}
                        variant={locationSharing ? "default" : "outline"}
                      >
                        {locationSharing ? "Stop Sharing" : "Start Sharing"}
                      </Button>
                    </div>

                    {currentLocation && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm"><strong>Current Location:</strong></p>
                        <p className="text-sm text-muted-foreground">
                          Lat: {currentLocation.latitude.toFixed(6)}, 
                          Lng: {currentLocation.longitude.toFixed(6)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Updated: {new Date(currentLocation.timestamp).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {safetyTips.map((tip, index) => (
                    <motion.div
                      key={tip.title}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="tourism-card h-full">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-forest-500 to-forest-600 rounded-full flex items-center justify-center">
                            <tip.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold mb-2">{tip.title}</h3>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Safety;
