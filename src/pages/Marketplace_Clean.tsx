import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/marketplace/ProductCard";
import ArtisanCard from "@/components/marketplace/ArtisanCard";
import ServiceCard from "@/components/marketplace/ServiceCard";
import BookingModal from "@/components/marketplace/BookingModal";
import ProductDetailModal from "@/components/marketplace/ProductDetailModal";
import Cart from "@/components/marketplace/Cart";
import { useCart } from "@/contexts/CartContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { 
  Search, 
  Filter, 
  Star, 
  Heart, 
  ShoppingCart, 
  MapPin,
  Verified,
  Grid3X3,
  List,
  SortAsc,
  Users,
  Calendar,
  Award,
  Handshake,
  Palette
} from "lucide-react";

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addToCart, getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"products" | "artisans" | "services">("products");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Hero carousel state
  const [heroApi, setHeroApi] = useState<CarouselApi | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroCarouselData = [
    {
      id: 1,
      title: "Discover Authentic",
      subtitle: "Jharkhand Crafts",
      description: "Explore handcrafted treasures from local artisans",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
      buttonText: "Shop Now",
      buttonLink: "#products"
    },
    {
      id: 2,
      title: "Meet Master",
      subtitle: "Artisans",
      description: "Connect with skilled craftspeople preserving traditions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
      buttonText: "View Profiles",
      buttonLink: "#artisans"
    },
    {
      id: 3,
      title: "Hire Local",
      subtitle: "Experts",
      description: "Book photography, workshops, and cultural experiences",
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&h=600&fit=crop",
      buttonText: "Book Services",
      buttonLink: "#services"
    }
  ];

  // Sample data - in a real app this would come from an API
  const products = [
    {
      id: 1,
      title: "Traditional Dhokra Elephant",
      description: "Handcrafted bronze metal casting by tribal artisans",
      price: "₹1,200",
      originalPrice: "₹1,500",
      rating: 4.8,
      reviews: 124,
      vendor: "Munda Craft Collective",
      location: "Khunti",
      image: "https://www.artisansoul.in/cdn/shop/products/Untitleddesign_25_800x.png?v=1634885936?w=400&h=300&fit=crop",
      verified: true,
      category: "handicrafts",
      tags: ["Eco-friendly", "Fair Trade", "Handmade", "Dhokra Art"]
    },
    {
      id: 2,
      title: "Handwoven Tussar Silk Saree",
      description: "Premium quality Tussar silk saree with traditional Santhali tribal motifs",
      price: "₹3,500",
      originalPrice: "₹4,200",
      rating: 4.7,
      reviews: 203,
      vendor: "Jharkhand Silk Weavers",
      location: "Chaibasa",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      verified: true,
      category: "textiles",
      tags: ["Handwoven", "Premium", "Traditional", "Tussar Silk"]
    }
    // Add more products as needed
  ];

  const categories = [
    { id: "all", name: "All Items", count: products.length },
    { id: "handicrafts", name: "Handicrafts", count: products.filter(p => p.category === "handicrafts").length },
    { id: "textiles", name: "Textiles", count: products.filter(p => p.category === "textiles").length },
  ];

  const artisans = [
    {
      id: 1,
      name: "Rajesh Munda",
      bio: "Master craftsman specializing in traditional Dhokra metal casting",
      specialty: "Dhokra Metal Casting",
      location: "Khunti",
      rating: 4.9,
      reviews: 124,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 25,
      servicesCount: 3,
      joinedDate: "2020-01-15",
      verified: true
    }
  ];

  const services = [
    {
      id: 1,
      serviceName: "Cultural Photography Session",
      description: "Professional photography session capturing traditional tribal culture",
      pricePerHour: 1500,
      artisanId: 1,
      artisanName: "Meera Singh",
      artisanImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      artisanRating: 4.7,
      artisanLocation: "Ranchi",
      category: "Photography",
      duration: "2-4 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      tags: ["Photography", "Cultural", "Professional"]
    }
  ];

  // Filtering logic
  const filteredProducts = selectedCategory === "all" 
    ? products.slice(0, 12) 
    : products.filter(product => product.category === selectedCategory).slice(0, 12);

  const filteredArtisans = artisans.filter(artisan => 
    artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artisan.location.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 12);

  const filteredServices = services.filter(service =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 9);

  // Handler functions
  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleViewDetails = (productId: number) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setIsProductDetailModalOpen(true);
  };

  const handleViewArtisanProfile = (artisanId: number) => {
    console.log(`View profile for artisan ${artisanId}`);
  };

  const handleHireArtisan = (artisanId: number) => {
    console.log(`Hire artisan ${artisanId}`);
  };

  const handleBookService = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (bookingData: any) => {
    console.log('Booking confirmed:', bookingData);
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  // Hero carousel useEffect
  useEffect(() => {
    if (!heroApi) return;
    const onSelect = () => setHeroIndex(heroApi.selectedScrollSnap());
    onSelect();
    heroApi.on("select", onSelect);
    return () => {
      heroApi.off("select", onSelect);
    };
  }, [heroApi]);

  return (
    <Layout>
      {/* Enhanced Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Carousel 
          opts={{ loop: true }} 
          className="w-full h-full" 
          setApi={(api) => setHeroApi(api)}
        >
          <CarouselContent>
            {heroCarouselData.map((slide, index) => (
              <CarouselItem key={slide.id}>
                <div 
                  className="h-96 flex items-center justify-center text-white relative overflow-hidden"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse-soft" />
                  
                  <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl z-10 relative">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <Handshake className="w-4 h-4 mr-2" />
                        Local Marketplace
                      </Badge>
                      
                      <h1 className="text-4xl md:text-6xl font-display font-bold mb-3 leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-gradient bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        {slide.subtitle}
                      </h2>
                      
                      <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                        {slide.description}
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Button 
                        size="lg" 
                        className="tourism-button text-lg px-10 py-4 h-auto transform hover:scale-105 transition-all duration-300 shadow-2xl"
                        onClick={() => {
                          if (slide.buttonLink === "#products") setActiveTab("products");
                          else if (slide.buttonLink === "#artisans") setActiveTab("artisans");
                          else if (slide.buttonLink === "#services") setActiveTab("services");
                        }}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        {slide.buttonText}
                      </Button>
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
                      className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Palette className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 h-14 w-14 backdrop-blur-sm" />
          <CarouselNext className="right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 h-14 w-14 backdrop-blur-sm" />
        </Carousel>

        {/* Custom Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
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
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header with Cart */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div className="flex space-x-2 bg-white p-2 rounded-xl shadow-lg border border-border/30 w-fit">
            <Button
              variant={activeTab === "products" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("products")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "products" 
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" 
                  : "hover:bg-secondary/50"
              }`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Products
            </Button>
            <Button
              variant={activeTab === "artisans" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("artisans")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "artisans" 
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" 
                  : "hover:bg-secondary/50"
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Artisans
            </Button>
            <Button
              variant={activeTab === "services" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("services")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "services" 
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" 
                  : "hover:bg-secondary/50"
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Services
            </Button>
          </div>
          
          {/* Cart Button */}
          <Button
            variant="outline"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 relative"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs px-1.5 py-0.5 min-w-[20px] text-center">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder={`Search for ${activeTab}...`}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              
              {activeTab === "products" && (
              <div className="flex rounded-lg border border-input">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              )}
            </div>
          </div>

          {/* Category Filter - Only for Products */}
          {activeTab === "products" && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="h-9"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
          )}
        </motion.div>

        {/* Tab Content */}
        {activeTab === "products" && (
        <div className={`grid gap-4 ${viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
          : "grid-cols-1"
        }`}>
          {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(product.id)}
              />
            ))}
        </div>
        )}

        {activeTab === "artisans" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredArtisans.map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={artisan}
                onViewProfile={handleViewArtisanProfile}
                onHire={handleHireArtisan}
              />
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={handleBookService}
                onViewArtisan={handleViewArtisanProfile}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More {activeTab === "products" ? "Products" : activeTab === "artisans" ? "Artisans" : "Services"}
          </Button>
        </div>

        {/* Featured Artisans Section - Only show on products tab */}
        {activeTab === "products" && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Artisans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {artisans.filter(artisan => artisan.isFeatured).map((artisan) => (
              <Card key={artisan.id} className="tourism-card">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <img 
                      src={artisan.profileImage}
                      alt={artisan.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                    {artisan.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <Verified className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-yellow-500 text-white text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{artisan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{artisan.specialty}</p>
                  <div className="flex items-center justify-center text-xs text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{artisan.location}</span>
                    <span className="mx-2">•</span>
                    <span>{artisan.productsCount} products</span>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{artisan.rating}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleViewArtisanProfile(artisan.id)}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={selectedService}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isProductDetailModalOpen}
        onClose={() => setIsProductDetailModalOpen(false)}
        product={selectedProduct}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
      />

      {/* Cart Modal */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </Layout>
  );
};

export default Marketplace;
