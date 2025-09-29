import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import HotelBookingModal from "@/components/marketplace/HotelBookingModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { 
  Search, 
  Filter, 
  Star, 
  Heart, 
  MapPin,
  Verified,
  Grid3X3,
  List,
  SortAsc,
  Users,
  Camera,
  Music,
  Palette,
  Compass,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  TreePine,
  Mountain,
  Home,
  Sparkles,
  PartyPopper,
  Baby,
  Briefcase,
  Heart as HeartIcon,
  Eye,
  Building,
  Crown,
  Coffee
} from "lucide-react";

const Hotels = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isHotelBookingModalOpen, setIsHotelBookingModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const hotels = [
    {
      id: 1,
      name: "Radisson Blu Hotel Ranchi",
      description: "5-star luxury hotel in the heart of Ranchi with modern amenities, fine dining, and business facilities",
      price: 8500,
      originalPrice: 9500,
      rating: 4.5,
      reviews: 1247,
      location: "Ranchi",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      amenities: ["WiFi", "Pool", "Restaurant", "Spa", "Parking", "Business Center", "Fitness Center"],
      category: "Luxury",
      airbnbCategory: "Business",
      verified: true,
      distance: "1.2 km from city center",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Hotel Presidency Ranchi",
      description: "Modern business hotel offering comfort and convenience with excellent hospitality services",
      price: 4500,
      originalPrice: 5200,
      rating: 4.2,
      reviews: 892,
      location: "Ranchi",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      amenities: ["WiFi", "Restaurant", "Parking", "Room Service", "Conference Hall"],
      category: "Business",
      airbnbCategory: "Business",
      verified: true,
      distance: "0.8 km from city center"
    },
    {
      id: 3,
      name: "Jungle Resort Betla National Park",
      description: "Eco-friendly forest resort perfect for wildlife enthusiasts and nature lovers seeking adventure",
      price: 3200,
      originalPrice: 3800,
      rating: 4.3,
      reviews: 567,
      location: "Betla National Park",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      amenities: ["Nature Walks", "Safari", "Campfire", "Wildlife Photography", "Local Cuisine"],
      category: "Nature",
      airbnbCategory: "Wildlife",
      verified: true,
      distance: "Inside national park"
    }
  ];

  const categories = [
    { id: "all", name: "All Hotels", icon: Building },
    { id: "luxury", name: "Luxury", icon: Crown },
    { id: "business", name: "Business", icon: Briefcase },
    { id: "nature", name: "Nature Resorts", icon: TreePine },
    { id: "heritage", name: "Heritage", icon: Award }
  ];

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           hotel.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "reviews": return b.reviews - a.reviews;
      default: return 0;
    }
  });

  const toggleFavorite = (hotelId: number) => {
    setFavorites(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const handleBooking = (hotel: any) => {
    setSelectedHotel(hotel);
    setIsHotelBookingModalOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Enhanced Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-20 bg-gradient-to-r from-forest-600 via-forest-700 to-terracotta-600 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" />
            <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500" />
          </div>
          
          <div className="relative container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                  <Building className="h-5 w-5" />
                  <span className="text-sm font-medium">Premium Accommodations</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Discover Your
                  <span className="block text-terracotta-300">Perfect Stay</span>
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  From luxury hotels in Ranchi to eco-resorts in the wilderness, find accommodations that match your Jharkhand adventure style.
                </p>

                {/* Enhanced Search Bar */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-forest-600" />
                      <Input
                        placeholder="Search hotels, locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 border-0 bg-white/90 text-gray-900 placeholder:text-gray-600"
                      />
                    </div>
                    <Button size="lg" className="h-12 px-8 bg-terracotta-600 hover:bg-terracotta-700">
                      <Search className="mr-2 h-5 w-5" />
                      Search Hotels
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop" 
                    alt="Luxury Hotel" 
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -top-6 -left-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">4.8 Rating</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-terracotta-600/90 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-white">
                      <div className="text-sm">Starting from</div>
                      <div className="text-2xl font-bold">₹3,200</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <div className="container mx-auto px-6 py-12">
          {/* Category Filter & Controls */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-forest-600 to-forest-700 text-white shadow-lg"
                        : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm border"
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="font-medium">{category.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="reviews">Most Reviewed</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hotels Grid/List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={viewMode === "grid" 
              ? "grid md:grid-cols-2 xl:grid-cols-3 gap-8" 
              : "space-y-6"
            }
          >
            {sortedHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="tourism-card group overflow-hidden hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-64 object-cover"
                    />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(hotel.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${
                        favorites.includes(hotel.id) 
                          ? "text-red-500 fill-current" 
                          : "text-gray-600"
                      }`} />
                    </button>

                    {/* Verified Badge */}
                    {hotel.verified && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 hover:bg-green-700 text-white">
                          <Verified className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-terracotta-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                      <div className="text-sm">From</div>
                      <div className="text-xl font-bold">₹{hotel.price.toLocaleString()}</div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {hotel.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{hotel.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">({hotel.reviews} reviews)</div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-2">{hotel.description}</p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 3).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hotel.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleBooking(hotel)} 
                        className="flex-1 bg-forest-600 hover:bg-forest-700"
                      >
                        Book Now
                      </Button>
                      <Button variant="outline" size="sm" className="px-4">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {sortedHotels.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Building className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or explore different categories.
              </p>
            </motion.div>
          )}
        </div>

        {/* Hotel Booking Modal */}
        {isHotelBookingModalOpen && selectedHotel && (
          <HotelBookingModal
            isOpen={isHotelBookingModalOpen}
            onClose={() => {
              setIsHotelBookingModalOpen(false);
              setSelectedHotel(null);
            }}
            hotel={selectedHotel}
          />
        )}
      </div>
    </Layout>
  );
};

export default Hotels;
