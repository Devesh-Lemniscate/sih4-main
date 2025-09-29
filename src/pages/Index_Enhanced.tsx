import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar, 
  Star, 
  Heart, 
  Shield, 
  Phone, 
  Map,
  BookOpen,
  Compass,
  CheckCircle,
  ArrowRight,
  Play,
  Clock,
  Headphones,
  Smartphone,
  Monitor,
  TreePine,
  Mountain,
  Camera,
  Award,
  Navigation,
  Globe
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import heroBackground from "@/assets/hero-background.jpg";
import marketplaceHero from "@/assets/marketplace-hero.jpg";
import aiPlanner from "@/assets/ai-planner.jpg";

const Index = () => {
  const heroCarouselData = [
    {
      id: 1,
      title: "Welcome to",
      subtitle: "Jharkhand",
      description: "Discover the land of forests, waterfalls and rich tribal culture. Experience eco-tourism, adventure and authentic local experiences.",
      image: heroBackground,
      primaryButton: "Start Your Journey",
      secondaryButton: "Watch Virtual Tour"
    },
    {
      id: 2,
      title: "Explore",
      subtitle: "Natural Wonders",
      description: "From the majestic Hundru Falls to the serene Netarhat hills, discover breathtaking landscapes and pristine wilderness.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      primaryButton: "Discover Nature",
      secondaryButton: "View AR Experience"
    },
    {
      id: 3,
      title: "Experience",
      subtitle: "Tribal Heritage",
      description: "Immerse yourself in the rich cultural tapestry of Jharkhand's indigenous communities and their time-honored traditions.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
      primaryButton: "Cultural Tours",
      secondaryButton: "Learn More"
    }
  ];

  const featuredExperiences = [
    {
      id: 1,
      title: "Netarhat Eco Retreat",
      location: "Netarhat",
      category: "Eco Tourism",
      price: "₹2,500/night",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=360&fit=crop",
      description: "Stay in eco-friendly cottages amidst lush forests with stunning valley views."
    },
    {
      id: 2,
      title: "Tribal Village Experience",
      location: "Khunti",
      category: "Cultural",
      price: "₹1,500/person",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=640&h=360&fit=crop",
      description: "Immerse in Munda tribal culture with traditional dance, food and crafts."
    },
    {
      id: 3,
      title: "Lodh Falls Trekking",
      location: "Lodh Falls",
      category: "Adventure",
      price: "₹800/person",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=640&h=360&fit=crop",
      description: "Trek to Jharkhand's highest waterfall through dense forests with local guides."
    }
  ];

  const [heroApi, setHeroApi] = useState<CarouselApi | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (!heroApi) return;
    const onSelect = () => setHeroIndex(heroApi.selectedScrollSnap());
    onSelect();
    heroApi.on("select", onSelect);
    return () => heroApi.off("select", onSelect);
  }, [heroApi]);

  return (
    <Layout>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <Carousel 
          opts={{ loop: true }} 
          className="w-full h-screen" 
          setApi={setHeroApi}
        >
          <CarouselContent>
            {heroCarouselData.map((slide, index) => (
              <CarouselItem key={slide.id}>
                <div 
                  className="h-screen flex items-center justify-center text-white relative overflow-hidden"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Animated Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse-soft" />
                  
                  <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl z-10 relative">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <TreePine className="w-4 h-4 mr-2" />
                        Discover Jharkhand
                      </Badge>
                      
                      <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight text-gradient bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        {slide.subtitle}
                      </h2>
                      
                      <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
                        {slide.description}
                      </p>
                    </motion.div>
                    
                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
                    >
                      <Button 
                        size="lg" 
                        className="tourism-button text-lg px-10 py-4 h-auto transform hover:scale-105 transition-all duration-300 shadow-2xl"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        {slide.primaryButton}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="text-lg px-10 py-4 h-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        {slide.secondaryButton}
                      </Button>
                    </motion.div>
            
                    {/* Enhanced Search Bar */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <Card className="max-w-5xl mx-auto glass-card border-white/20 shadow-2xl">
                        <CardContent className="p-8">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-3">
                              <label className="block text-sm font-semibold text-foreground">Destination</label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Where to explore?" className="pl-10 h-12 bg-white border-border/30 focus:border-primary/50" />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <label className="block text-sm font-semibold text-foreground">Check-in</label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Add dates" className="pl-10 h-12 bg-white border-border/30 focus:border-primary/50" />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <label className="block text-sm font-semibold text-foreground">Guests</label>
                              <div className="relative">
                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Add guests" className="pl-10 h-12 bg-white border-border/30 focus:border-primary/50" />
                              </div>
                            </div>
                            <div className="flex items-end">
                              <Button className="w-full h-12 tourism-button text-lg font-semibold">
                                <Search className="h-5 w-5 mr-2" />
                                Explore
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-1/4 right-10 hidden xl:block">
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0] 
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Mountain className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>

                  <div className="absolute bottom-1/4 left-10 hidden xl:block">
                    <motion.div
                      animate={{ 
                        y: [0, 15, 0],
                        x: [0, 10, 0] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 1
                      }}
                      className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    >
                      <TreePine className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroCarouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => heroApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === heroIndex ? 'bg-white scale-125 shadow-lg' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </Carousel>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-8 text-white/60 hidden lg:flex flex-col items-center"
        >
          <div className="w-px h-12 bg-white/40 mb-2" />
          <span className="text-xs font-medium tracking-widest rotate-90 origin-center">EXPLORE</span>
        </motion.div>
      </section>

      {/* Featured Experiences Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Featured Experiences</h2>
          <p className="section-subtitle">
            Discover authentic eco-tourism and cultural experiences crafted by local communities
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="tourism-card group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white shadow-lg">
                      {experience.category}
                    </Badge>
                  </div>
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 text-white px-3 py-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{experience.rating}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">{experience.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{experience.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-foreground">
                      {experience.price}
                    </div>
                    <Link to="/marketplace">
                      <Button className="tourism-button px-6">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link to="/marketplace">
            <Button size="lg" className="tourism-button px-8 py-4 text-lg">
              View All Experiences
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* AR/VR Experience Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">AR/VR Experiences</h2>
            <p className="section-subtitle">
              Explore Jharkhand like never before with cutting-edge virtual and augmented reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Virtual Trek to Netarhat Sunrise",
                tag: "VR",
                quality: "4K",
                stats: "12.5k",
                time: "8 minutes",
                rating: "4.9",
                image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=700&fit=crop",
              },
              {
                title: "AR Wildlife Safari - Betla National Park",
                tag: "AR",
                quality: "HD",
                stats: "8.7k",
                time: "12 minutes",
                rating: "4.8",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=700&fit=crop",
              },
              {
                title: "Virtual Temple Tour - Deoghar",
                tag: "VR",
                quality: "4K",
                stats: "15.2k",
                time: "15 minutes",
                rating: "4.9",
                image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&h=700&fit=crop",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative rounded-2xl overflow-hidden tourism-card group"
              >
                <div
                  className="h-64 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${card.image})` }}
                >
                  <div className="absolute left-4 top-4 flex items-center gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">{card.tag}</span>
                    <span className="px-3 py-1 rounded-full bg-black/60 text-white">{card.quality}</span>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="h-16 w-16 rounded-full bg-white/25 hover:bg-white/35 transition-colors flex items-center justify-center backdrop-blur-sm"
                    >
                      <Play className="h-8 w-8 text-white ml-1" />
                    </motion.button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {card.stats}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {card.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {card.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Headphones,
                title: "VR Headset",
                description: "Full immersion with 360° experiences",
                buttonText: "Try VR",
                gradient: "from-blue-500 to-purple-600"
              },
              {
                icon: Smartphone,
                title: "Mobile AR",
                description: "Augmented reality on your smartphone",
                buttonText: "Open AR",
                gradient: "from-purple-600 to-pink-500"
              },
              {
                icon: Monitor,
                title: "Web Preview",
                description: "360° preview in your browser",
                buttonText: "View Now",
                gradient: "from-green-500 to-blue-500"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center"
              >
                <Card className={`p-8 tourism-card bg-gradient-to-br ${item.gradient} text-white border-0`}>
                  <CardContent className="p-0">
                    <item.icon className="h-12 w-12 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-white/90 mb-6">{item.description}</p>
                    <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      {item.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Itinerary Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 lg:mb-0"
            >
              <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
                <Navigation className="w-4 h-4 mr-2" />
                AI Powered
              </Badge>
              <h2 className="text-4xl font-display font-bold text-foreground mb-6">
                Smart Itinerary Planner
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our AI creates personalized travel plans based on your preferences, budget and travel style. 
                Get the perfect mix of adventure, culture and relaxation.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Budget optimization",
                  "Local expert recommendations", 
                  "Real-time availability",
                  "Cultural insights integration"
                ].map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="text-primary mr-4 h-6 w-6 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <Link to="/itinerary">
                <Button size="lg" className="tourism-button px-8 py-4 text-lg">
                  <Map className="mr-3 h-5 w-5" />
                  Plan Your Adventure
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="tourism-card overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <img 
                    src={aiPlanner} 
                    alt="AI Itinerary Planner" 
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">Your Safety, Our Priority</h2>
            <p className="section-subtitle">
              Travel with confidence knowing you're protected by our comprehensive safety features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: "24/7 Emergency Hotline",
                description: "Instant access to local emergency services and medical help"
              },
              {
                icon: MapPin,
                title: "Real-time Location Sharing",
                description: "Share your location with family and emergency contacts"
              },
              {
                icon: Shield,
                title: "Travel Insurance",
                description: "Comprehensive coverage for all your adventures"
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="tourism-card text-center p-8 h-full">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link to="/safety">
              <Button size="lg" variant="destructive" className="px-8 py-4 text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                <Shield className="mr-3 h-5 w-5" />
                Learn More About Safety
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-primary via-primary to-accent py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-5xl font-display font-bold mb-6">
            Start Your Jharkhand Adventure Today
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers who have discovered the magic of Jharkhand's landscapes, 
            culture, and hospitality. Your adventure awaits!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-10 py-4 text-lg font-semibold">
                <Camera className="mr-3 h-5 w-5" />
                Explore Experiences
              </Button>
            </Link>
            <Link to="/itinerary">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold">
                <Map className="mr-3 h-5 w-5" />
                Plan Your Trip
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Mountain className="h-24 w-24 text-white" />
          </motion.div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <TreePine className="h-32 w-32 text-white" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
