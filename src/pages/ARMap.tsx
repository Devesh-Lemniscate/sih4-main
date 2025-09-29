import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ARMapComponent from "@/components/ARMapComponent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Navigation, 
  MapPin, 
  Camera, 
  Compass, 
  Smartphone, 
  Globe,
  Layers3,
  Zap,
  Eye
} from "lucide-react";

const ARMap = () => {
  const features = [
    {
      icon: Navigation,
      title: "Smart Navigation",
      description: "AI-powered route optimization with local insights"
    },
    {
      icon: Camera,
      title: "AR Overlay",
      description: "Point your camera to discover hidden gems and stories"
    },
    {
      icon: Globe,
      title: "360° Street View",
      description: "Immersive panoramic views of destinations"
    },
    {
      icon: Layers3,
      title: "Multi-layer Info",
      description: "Historical, cultural, and practical information layers"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white">
                <Eye className="w-4 h-4 mr-2" />
                Augmented Reality
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
                AR Street View
                <span className="block text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Explorer
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Discover Jharkhand's hidden treasures through immersive augmented reality. 
                Point your camera and unlock stories, directions, and cultural insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="tourism-button px-8 py-4 text-lg">
                  <Smartphone className="mr-3 h-5 w-5" />
                  Launch AR Experience
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                  <Compass className="mr-3 h-5 w-5" />
                  View Tutorial
                </Button>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="tourism-card text-center p-6 h-full">
                    <CardContent className="p-0">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-10 hidden xl:block">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-24 h-24 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center"
            >
              <MapPin className="w-10 h-10 text-primary" />
            </motion.div>
          </div>

          <div className="absolute bottom-20 left-10 hidden xl:block">
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                x: [0, 10, 0] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5
              }}
              className="w-20 h-20 rounded-full bg-accent/10 backdrop-blur-sm flex items-center justify-center"
            >
              <Camera className="w-8 h-8 text-accent" />
            </motion.div>
          </div>
        </section>

        {/* AR Map Component */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-6xl mx-auto"
            >
              <Card className="tourism-card overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <ARMapComponent />
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card className="p-6 glass-card text-center">
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">Mobile First</h4>
                  <p className="text-sm text-muted-foreground">
                    Optimized for smartphone cameras and sensors
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 glass-card text-center">
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">Real-time</h4>
                  <p className="text-sm text-muted-foreground">
                    Live information updates and crowd-sourced data
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 glass-card text-center">
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">Offline Ready</h4>
                  <p className="text-sm text-muted-foreground">
                    Download maps for offline exploration
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ARMap;
