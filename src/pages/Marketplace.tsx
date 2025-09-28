import { useState, useEffect } from "react";
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
import { CartProvider } from "@/contexts/CartContext";
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
  Camera,
  Music,
  Palette,
  Compass,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import marketplaceHero from "@/assets/marketplace-hero.jpg";

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"products" | "artisans" | "services">("products");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
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
    },
  ];

  const products = [
    {
      id: 1,
      title: "Traditional Dhokra Elephant",
      description: "Handcrafted bronze metal casting by tribal artisans using ancient lost-wax technique from Khunti district",
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
      description: "Premium quality Tussar silk saree with traditional Santhali tribal motifs and golden threads from Chaibasa",
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
    },
    {
      id: 3,
      title: "Bamboo Home Decor Set",
      description: "Eco-friendly bamboo items including baskets, lamps, and wall hangings",
      price: "₹1,800",
      originalPrice: "₹2,100",
      rating: 4.6,
      reviews: 156,
      vendor: "Green Bamboo Crafts",
      location: "Ranchi",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      verified: true,
      category: "home-decor",
      tags: ["Sustainable", "Modern", "Bamboo"]
    },
    {
      id: 4,
      title: "Organic Forest Honey",
      description: "Pure forest honey collected by tribal communities from pristine forests",
      price: "₹450/jar",
      originalPrice: null,
      rating: 4.9,
      reviews: 92,
      vendor: "Forest Honey Collective",
      location: "Gumla",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      verified: true,
      category: "food",
      tags: ["Organic", "Natural", "Tribal"]
    },
    {
      id: 5,
      title: "Sohrai Painting Artwork",
      description: "Traditional Sohrai wall painting artwork on canvas depicting tribal life and nature from Hazaribagh",
      price: "₹1,500",
      originalPrice: "₹1,800",
      rating: 4.7,
      reviews: 156,
      vendor: "Tribal Art Collective",
      location: "Hazaribagh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      verified: true,
      category: "handicrafts",
      tags: ["Cultural", "Sohrai Art", "Tribal Painting", "Traditional"]
    },
    {
      id: 6,
      title: "Handmade Terracotta Pottery",
      description: "Traditional terracotta pots and decorative items made by skilled potters",
      price: "₹600",
      originalPrice: "₹750",
      rating: 4.7,
      reviews: 134,
      vendor: "Clay Art Studio",
      location: "Jamshedpur",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      verified: true,
      category: "handicrafts",
      tags: ["Terracotta", "Traditional", "Functional"]
    },
    {
      id: 7,
      title: "Paitkar Painting Scroll",
      description: "Traditional Paitkar scroll painting depicting tribal mythology and stories from Dumka district",
      price: "₹2,200",
      originalPrice: "₹2,800",
      rating: 4.8,
      reviews: 89,
      vendor: "Tribal Art Collective",
      location: "Dumka",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      verified: true,
      category: "handicrafts",
      tags: ["Paitkar", "Scroll Painting", "Tribal Mythology", "Traditional"]
    },
    {
      id: 8,
      title: "Tribal Silver Jewelry Set",
      description: "Authentic Santhali tribal jewelry made with silver and traditional beads from Gumla district",
      price: "₹1,100",
      originalPrice: "₹1,400",
      rating: 4.6,
      reviews: 167,
      vendor: "Tribal Jewelry Co.",
      location: "Gumla",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      verified: true,
      category: "jewelry",
      tags: ["Silver", "Tribal", "Santhali", "Traditional"]
    },
    {
      id: 9,
      title: "Tribal Cooking Experience",
      description: "Learn authentic Santhali recipes with local families in their homes",
      price: "₹800/person",
      originalPrice: null,
      rating: 4.9,
      reviews: 87,
      vendor: "Santhali Cultural Center",
      location: "Dumka",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      verified: true,
      category: "experiences",
      tags: ["Cultural", "Food", "Group Activity"]
    },
    {
      id: 10,
      title: "Pottery Workshop Experience",
      description: "2-hour hands-on pottery making session with master craftsmen",
      price: "₹600/person",
      originalPrice: null,
      rating: 4.8,
      reviews: 67,
      vendor: "Clay Art Studio",
      location: "Jamshedpur",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      verified: true,
      category: "experiences",
      tags: ["Art", "Hands-on", "Creative"]
    },
    {
      id: 11,
      title: "Bamboo Wind Chimes",
      description: "Musical wind chimes made from bamboo with traditional tribal designs",
      price: "₹950",
      originalPrice: "₹1,200",
      rating: 4.4,
      reviews: 45,
      vendor: "Bamboo Crafts Co.",
      location: "Chaibasa",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      verified: true,
      category: "home-decor",
      tags: ["Musical", "Bamboo", "Decorative"]
    },
    {
      id: 12,
      title: "Lac Bangles Set",
      description: "Traditional lac bangles handcrafted by tribal artisans with natural colors and traditional designs",
      price: "₹350/set",
      originalPrice: "₹450/set",
      rating: 4.7,
      reviews: 112,
      vendor: "Tribal Craft Co.",
      location: "Hazaribagh",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      verified: true,
      category: "jewelry",
      tags: ["Lac", "Bangles", "Tribal", "Handcrafted"]
    },
    {
      id: 13,
      title: "Traditional Santhali Shawl",
      description: "Warm handwoven shawl with intricate Santhali tribal patterns and natural wool",
      price: "₹2,800",
      originalPrice: "₹3,200",
      rating: 4.6,
      reviews: 95,
      vendor: "Santhali Weavers Union",
      location: "Dumka",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      verified: true,
      category: "textiles",
      tags: ["Wool", "Traditional", "Warm"]
    },
    {
      id: 14,
      title: "Tribal Stone Carving",
      description: "Hand-carved stone artifacts depicting tribal mythology and cultural symbols",
      price: "₹1,500",
      originalPrice: "₹1,800",
      rating: 4.7,
      reviews: 73,
      vendor: "Stone Art Collective",
      location: "Hazaribagh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      verified: true,
      category: "handicrafts",
      tags: ["Stone", "Mythology", "Cultural"]
    },
    {
      id: 15,
      title: "Kurum Tribal Pottery",
      description: "Traditional Kurum tribal pottery made by skilled potters using ancient techniques from Ranchi",
      price: "₹180/piece",
      originalPrice: "₹220/piece",
      rating: 4.8,
      reviews: 156,
      vendor: "Tribal Pottery Co.",
      location: "Ranchi",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      verified: true,
      category: "handicrafts",
      tags: ["Kurum", "Pottery", "Tribal", "Traditional"]
    },
    {
      id: 16,
      title: "Bamboo Furniture Set",
      description: "Eco-friendly bamboo furniture including chairs, tables, and storage units",
      price: "₹8,500",
      originalPrice: "₹10,000",
      rating: 4.5,
      reviews: 42,
      vendor: "Bamboo Furniture Works",
      location: "Chaibasa",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      verified: true,
      category: "home-decor",
      tags: ["Furniture", "Eco-friendly", "Modern"]
    },
    {
      id: 17,
      title: "Traditional Folk Dance Workshop",
      description: "Learn authentic Santhali and Munda folk dances from master performers",
      price: "₹1,200/person",
      originalPrice: null,
      rating: 4.9,
      reviews: 68,
      vendor: "Cultural Arts Center",
      location: "Dumka",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      verified: true,
      category: "experiences",
      tags: ["Dance", "Cultural", "Traditional"]
    },
    {
      id: 18,
      title: "Santhali Tribal Textile",
      description: "Handwoven Santhali tribal textile with traditional geometric patterns and natural dyes from Dumka",
      price: "₹1,800",
      originalPrice: "₹2,200",
      rating: 4.6,
      reviews: 89,
      vendor: "Santhali Weavers",
      location: "Dumka",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      verified: true,
      category: "textiles",
      tags: ["Santhali", "Handwoven", "Traditional", "Geometric"]
    },
    {
      id: 19,
      title: "Forest Honey Soap",
      description: "Natural soap made with forest honey and organic herbs from tribal areas",
      price: "₹120/piece",
      originalPrice: "₹150/piece",
      rating: 4.7,
      reviews: 134,
      vendor: "Natural Care Products",
      location: "Gumla",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      verified: true,
      category: "food",
      tags: ["Natural", "Honey", "Organic"]
    },
    {
      id: 20,
      title: "Bamboo Wall Art",
      description: "Decorative wall hangings made from bamboo with tribal geometric patterns",
      price: "₹650",
      originalPrice: "₹800",
      rating: 4.4,
      reviews: 67,
      vendor: "Bamboo Art Studio",
      location: "Chaibasa",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      verified: true,
      category: "home-decor",
      tags: ["Wall Art", "Bamboo", "Geometric"]
    },
    {
      id: 21,
      title: "Traditional Weaving Workshop",
      description: "Learn handloom weaving techniques from master weavers using traditional methods",
      price: "₹900/person",
      originalPrice: null,
      rating: 4.8,
      reviews: 54,
      vendor: "Handloom Heritage Center",
      location: "Chaibasa",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      verified: true,
      category: "experiences",
      tags: ["Weaving", "Handloom", "Traditional"]
    },
    {
      id: 22,
      title: "Tribal Wooden Bowls",
      description: "Hand-carved wooden bowls made from local timber with traditional tribal motifs",
      price: "₹450",
      originalPrice: "₹550",
      rating: 4.5,
      reviews: 91,
      vendor: "Wood Craft Collective",
      location: "Hazaribagh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      verified: true,
      category: "handicrafts",
      tags: ["Wooden", "Hand-carved", "Functional"]
    },
    {
      id: 23,
      title: "Organic Rice Collection",
      description: "Premium organic rice varieties grown by tribal farmers using traditional methods",
      price: "₹280/kg",
      originalPrice: "₹320/kg",
      rating: 4.8,
      reviews: 178,
      vendor: "Organic Rice Co.",
      location: "Gumla",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      verified: true,
      category: "food",
      tags: ["Organic", "Rice", "Traditional"]
    },
    {
      id: 24,
      title: "Tribal Brass Lamps",
      description: "Traditional brass oil lamps with intricate tribal designs for home decoration",
      price: "₹750",
      originalPrice: "₹900",
      rating: 4.6,
      reviews: 76,
      vendor: "Brass Art Works",
      location: "Khunti",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      verified: true,
      category: "home-decor",
      tags: ["Brass", "Traditional", "Decorative"]
    },
    {
      id: 25,
      title: "Cultural Photography Tour",
      description: "Guided photography tour capturing tribal culture, festivals, and daily life",
      price: "₹1,500/person",
      originalPrice: null,
      rating: 4.9,
      reviews: 45,
      vendor: "Cultural Photography Tours",
      location: "Ranchi",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      verified: true,
      category: "experiences",
      tags: ["Photography", "Cultural", "Guided"]
    },
    {
      id: 26,
      title: "Tribal Cotton Kurtas",
      description: "Comfortable cotton kurtas with traditional tribal embroidery and natural dyes",
      price: "₹1,200",
      originalPrice: "₹1,500",
      rating: 4.7,
      reviews: 123,
      vendor: "Cotton Craft Co.",
      location: "Dhanbad",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      verified: true,
      category: "textiles",
      tags: ["Cotton", "Embroidery", "Comfortable"]
    },
    {
      id: 27,
      title: "Forest Honey Face Cream",
      description: "Natural face cream made with forest honey and herbal extracts from tribal areas",
      price: "₹350/tube",
      originalPrice: "₹420/tube",
      rating: 4.6,
      reviews: 98,
      vendor: "Natural Beauty Products",
      location: "Gumla",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      verified: true,
      category: "food",
      tags: ["Natural", "Beauty", "Honey"]
    },
    {
      id: 28,
      title: "Bamboo Kitchen Set",
      description: "Complete kitchen set including spoons, spatulas, and serving bowls made from bamboo",
      price: "₹1,100",
      originalPrice: "₹1,300",
      rating: 4.5,
      reviews: 87,
      vendor: "Bamboo Kitchen Works",
      location: "Chaibasa",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      verified: true,
      category: "home-decor",
      tags: ["Kitchen", "Bamboo", "Complete Set"]
    },
    {
      id: 29,
      title: "Tribal Music Workshop",
      description: "Learn traditional tribal musical instruments and folk songs from local musicians",
      price: "₹1,000/person",
      originalPrice: null,
      rating: 4.8,
      reviews: 62,
      vendor: "Tribal Music Academy",
      location: "Dumka",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      verified: true,
      category: "experiences",
      tags: ["Music", "Traditional", "Instruments"]
    },
    {
      id: 30,
      title: "Handwoven Tribal Blanket",
      description: "Warm and cozy blanket with traditional tribal patterns, perfect for cold weather",
      price: "₹3,200",
      originalPrice: "₹3,800",
      rating: 4.7,
      reviews: 145,
      vendor: "Tribal Textile Works",
      location: "Hazaribagh",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      verified: true,
      category: "textiles",
      tags: ["Blanket", "Warm", "Traditional"]
    }
  ];

  const categories = [
    { id: "all", name: "All Items", count: products.length },
    { id: "handicrafts", name: "Handicrafts", count: products.filter(p => p.category === "handicrafts").length },
    { id: "textiles", name: "Textiles", count: products.filter(p => p.category === "textiles").length },
    { id: "experiences", name: "Experiences", count: products.filter(p => p.category === "experiences").length },
    { id: "food", name: "Food & Spices", count: products.filter(p => p.category === "food").length },
    { id: "home-decor", name: "Home Decor", count: products.filter(p => p.category === "home-decor").length },
    { id: "jewelry", name: "Jewelry", count: products.filter(p => p.category === "jewelry").length }
  ];

  const artisans = [
    {
      id: 1,
      name: "Rajesh Munda",
      bio: "Master craftsman specializing in traditional Dhokra metal casting from Khunti district. With over 20 years of experience, Rajesh creates stunning bronze artifacts using ancient lost-wax technique passed down through generations of Munda tribe.",
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
    },
    {
      id: 2,
      name: "Priya Devi",
      bio: "Expert weaver creating beautiful Tussar silk sarees with traditional Santhali tribal motifs from Chaibasa. Her work has been featured in several fashion shows across India and she has trained over 50 young weavers in traditional handloom techniques.",
      specialty: "Tussar Silk Weaving",
      location: "Chaibasa",
      rating: 4.8,
      reviews: 203,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 18,
      servicesCount: 2,
      joinedDate: "2019-08-22",
      verified: true
    },
    {
      id: 3,
      name: "Suresh Oraon",
      bio: "Forest honey collector and organic products specialist. Suresh works with tribal communities to sustainably harvest forest products while preserving traditional knowledge and supporting local livelihoods.",
      specialty: "Organic Forest Products",
      location: "Gumla",
      rating: 4.9,
      reviews: 92,
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 12,
      servicesCount: 1,
      joinedDate: "2021-03-10",
      verified: true
    },
    {
      id: 4,
      name: "Meera Singh",
      bio: "Professional photographer specializing in cultural and wildlife photography. Meera captures the essence of Jharkhand's natural beauty and tribal culture, with her work published in National Geographic.",
      specialty: "Cultural Photography",
      location: "Ranchi",
      rating: 4.7,
      reviews: 156,
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 0,
      servicesCount: 4,
      joinedDate: "2020-11-05",
      verified: true
    },
    {
      id: 5,
      name: "Lakshmi Devi",
      bio: "Traditional folk dance performer and instructor specializing in Santhali and Munda folk dances. She has performed at international cultural festivals and teaches authentic cultural expressions.",
      specialty: "Folk Dance Performance",
      location: "Dumka",
      rating: 4.8,
      reviews: 67,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 0,
      servicesCount: 2,
      joinedDate: "2021-06-15",
      verified: true
    },
    {
      id: 6,
      name: "Ram Kumar",
      bio: "Master potter creating traditional clay artifacts and conducting pottery workshops. Ram teaches ancient pottery techniques to preserve cultural heritage and has been featured in pottery exhibitions.",
      specialty: "Traditional Pottery",
      location: "Jamshedpur",
      rating: 4.6,
      reviews: 89,
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 15,
      servicesCount: 3,
      joinedDate: "2020-09-12",
      verified: true
    },
    {
      id: 7,
      name: "Vikram Singh",
      bio: "Local heritage guide with deep knowledge of Jharkhand's historical sites, temples, and cultural landmarks. Vikram provides authentic cultural experiences and has guided over 1000 tourists.",
      specialty: "Heritage Tourism",
      location: "Deoghar",
      rating: 4.9,
      reviews: 234,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 0,
      servicesCount: 5,
      joinedDate: "2019-12-01",
      verified: true
    },
    {
      id: 8,
      name: "Sunita Oraon",
      bio: "Expert in tribal jewelry making using traditional techniques with silver and natural materials. Her jewelry has been showcased in fashion weeks and she supports women's empowerment through craft training.",
      specialty: "Tribal Jewelry",
      location: "Hazaribagh",
      rating: 4.7,
      reviews: 145,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 22,
      servicesCount: 2,
      joinedDate: "2020-05-20",
      verified: true
    },
    {
      id: 9,
      name: "Anil Mahato",
      bio: "Bamboo craftsman creating eco-friendly home decor and functional items. Anil specializes in sustainable bamboo products and has trained communities in bamboo craft techniques.",
      specialty: "Bamboo Crafts",
      location: "Chaibasa",
      rating: 4.5,
      reviews: 78,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 18,
      servicesCount: 1,
      joinedDate: "2021-02-14",
      verified: true
    },
    {
      id: 10,
      name: "Rekha Devi",
      bio: "Master of traditional wooden mask making used in tribal festivals. Rekha creates authentic ceremonial masks and teaches the cultural significance of these traditional art forms.",
      specialty: "Wooden Mask Making",
      location: "Hazaribagh",
      rating: 4.6,
      reviews: 56,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 12,
      servicesCount: 2,
      joinedDate: "2021-08-10",
      verified: true
    },
    {
      id: 11,
      name: "Arjun Soren",
      bio: "Master stone carver creating intricate tribal sculptures and architectural elements. Arjun's work adorns temples and cultural centers across Jharkhand, preserving ancient carving traditions.",
      specialty: "Stone Carving",
      location: "Hazaribagh",
      rating: 4.7,
      reviews: 89,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 16,
      servicesCount: 2,
      joinedDate: "2020-07-15",
      verified: true
    },
    {
      id: 12,
      name: "Kavita Mahato",
      bio: "Expert in traditional Santhali textile weaving and embroidery from Dumka district. Kavita creates stunning shawls and garments with intricate tribal patterns, supporting women's economic empowerment through traditional craft preservation.",
      specialty: "Santhali Textile Weaving",
      location: "Dumka",
      rating: 4.8,
      reviews: 112,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 20,
      servicesCount: 3,
      joinedDate: "2019-11-20",
      verified: true
    },
    {
      id: 13,
      name: "Birendra Oraon",
      bio: "Forest products specialist and organic farming expert. Birendra works with tribal communities to sustainably harvest and process forest products while promoting organic agriculture.",
      specialty: "Organic Agriculture",
      location: "Gumla",
      rating: 4.6,
      reviews: 78,
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 14,
      servicesCount: 2,
      joinedDate: "2021-01-10",
      verified: true
    },
    {
      id: 14,
      name: "Suman Devi",
      bio: "Traditional folk music performer and teacher specializing in Santhali and Munda musical instruments. Suman has performed at international festivals and teaches traditional music to young people.",
      specialty: "Folk Music",
      location: "Dumka",
      rating: 4.9,
      reviews: 95,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 0,
      servicesCount: 4,
      joinedDate: "2020-04-12",
      verified: true
    },
    {
      id: 15,
      name: "Ravi Kumar",
      bio: "Master bamboo furniture maker creating sustainable and modern furniture pieces. Ravi combines traditional techniques with contemporary design to create unique bamboo furniture.",
      specialty: "Bamboo Furniture",
      location: "Chaibasa",
      rating: 4.5,
      reviews: 67,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 22,
      servicesCount: 2,
      joinedDate: "2021-05-08",
      verified: true
    },
    {
      id: 16,
      name: "Geeta Singh",
      bio: "Professional cultural tour guide specializing in tribal heritage and natural history. Geeta provides immersive cultural experiences and has guided over 500 international tourists.",
      specialty: "Cultural Tourism",
      location: "Ranchi",
      rating: 4.8,
      reviews: 178,
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 0,
      servicesCount: 6,
      joinedDate: "2019-09-15",
      verified: true
    },
    {
      id: 17,
      name: "Manoj Mahato",
      bio: "Traditional brass and copper craftsman creating beautiful metal artifacts and utensils. Manoj uses ancient techniques to create functional and decorative metal items.",
      specialty: "Metal Crafts",
      location: "Khunti",
      rating: 4.6,
      reviews: 84,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 19,
      servicesCount: 2,
      joinedDate: "2020-12-03",
      verified: true
    },
    {
      id: 18,
      name: "Poonam Devi",
      bio: "Expert in traditional tribal cooking and food preservation techniques. Poonam teaches authentic tribal recipes and food preparation methods to preserve culinary heritage.",
      specialty: "Tribal Cuisine",
      location: "Gumla",
      rating: 4.7,
      reviews: 103,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 0,
      servicesCount: 3,
      joinedDate: "2021-03-25",
      verified: true
    },
    {
      id: 19,
      name: "Santosh Kumar",
      bio: "Master wood carver creating traditional tribal furniture and decorative items. Santosh specializes in carving intricate tribal motifs and cultural symbols into wood.",
      specialty: "Wood Carving",
      location: "Hazaribagh",
      rating: 4.5,
      reviews: 76,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 17,
      servicesCount: 2,
      joinedDate: "2020-08-18",
      verified: true
    },
    {
      id: 20,
      name: "Rita Oraon",
      bio: "Traditional herbal medicine practitioner and natural product specialist. Rita creates natural health products using traditional knowledge and forest herbs.",
      specialty: "Herbal Medicine",
      location: "Gumla",
      rating: 4.8,
      reviews: 91,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 13,
      servicesCount: 2,
      joinedDate: "2020-06-30",
      verified: true
    },
    {
      id: 21,
      name: "Amit Kumar",
      bio: "Professional wildlife photographer and nature guide specializing in Jharkhand's diverse wildlife. Amit's photographs have been featured in wildlife magazines and conservation publications.",
      specialty: "Wildlife Photography",
      location: "Hazaribagh",
      rating: 4.9,
      reviews: 127,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 0,
      servicesCount: 5,
      joinedDate: "2019-10-22",
      verified: true
    },
    {
      id: 22,
      name: "Sushila Devi",
      bio: "Master weaver specializing in traditional cotton and silk textiles with tribal patterns. Sushila creates beautiful fabrics using traditional handloom techniques and natural dyes.",
      specialty: "Handloom Weaving",
      location: "Dhanbad",
      rating: 4.7,
      reviews: 118,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 21,
      servicesCount: 3,
      joinedDate: "2020-02-14",
      verified: true
    },
    {
      id: 23,
      name: "Rajesh Kumar",
      bio: "Traditional bamboo basket maker creating functional and decorative baskets. Rajesh uses age-old techniques to create beautiful and durable bamboo products.",
      specialty: "Bamboo Basketry",
      location: "Chaibasa",
      rating: 4.4,
      reviews: 59,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 15,
      servicesCount: 1,
      joinedDate: "2021-07-05",
      verified: true
    },
    {
      id: 24,
      name: "Meera Devi",
      bio: "Expert in traditional tribal pottery and ceramic arts. Meera creates beautiful pottery items using traditional techniques and teaches pottery making to preserve cultural heritage.",
      specialty: "Ceramic Arts",
      location: "Jamshedpur",
      rating: 4.6,
      reviews: 82,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 18,
      servicesCount: 3,
      joinedDate: "2020-11-28",
      verified: true
    },
    {
      id: 25,
      name: "Vikash Singh",
      bio: "Professional adventure tour guide specializing in trekking and nature exploration. Vikash leads exciting adventure tours through Jharkhand's forests and hills.",
      specialty: "Adventure Tourism",
      location: "Ranchi",
      rating: 4.8,
      reviews: 156,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 0,
      servicesCount: 4,
      joinedDate: "2019-12-10",
      verified: true
    },
    {
      id: 26,
      name: "Kamla Devi",
      bio: "Traditional tribal jewelry designer creating unique pieces with silver, beads, and natural materials. Kamla's designs blend traditional aesthetics with contemporary fashion.",
      specialty: "Tribal Jewelry Design",
      location: "Hazaribagh",
      rating: 4.7,
      reviews: 94,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 24,
      servicesCount: 2,
      joinedDate: "2020-09-17",
      verified: true
    },
    {
      id: 27,
      name: "Ramesh Oraon",
      bio: "Forest honey expert and beekeeping specialist. Ramesh manages sustainable beekeeping operations and produces high-quality forest honey while supporting local communities.",
      specialty: "Beekeeping",
      location: "Gumla",
      rating: 4.9,
      reviews: 87,
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 11,
      servicesCount: 1,
      joinedDate: "2021-04-12",
      verified: true
    },
    {
      id: 28,
      name: "Sunita Mahato",
      bio: "Traditional Sohrai and Paitkar painting artist from Dumka district. Sunita creates beautiful paintings depicting tribal life, nature, and mythology. Her artwork has been exhibited in galleries and cultural centers across India.",
      specialty: "Sohrai & Paitkar Painting",
      location: "Dumka",
      rating: 4.6,
      reviews: 73,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 16,
      servicesCount: 2,
      joinedDate: "2020-10-05",
      verified: true
    },
    {
      id: 29,
      name: "Ajay Kumar",
      bio: "Traditional musical instrument maker creating authentic tribal instruments. Ajay crafts traditional drums, flutes, and string instruments using traditional methods and materials.",
      specialty: "Musical Instruments",
      location: "Dumka",
      rating: 4.8,
      reviews: 68,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isFeatured: true,
      productsCount: 12,
      servicesCount: 3,
      joinedDate: "2020-03-20",
      verified: true
    },
    {
      id: 30,
      name: "Pushpa Devi",
      bio: "Master of traditional tribal textile dyeing using natural dyes and traditional techniques. Pushpa creates beautiful colored fabrics using age-old dyeing methods.",
      specialty: "Natural Dyeing",
      location: "Chaibasa",
      rating: 4.7,
      reviews: 105,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      isFeatured: false,
      productsCount: 19,
      servicesCount: 2,
      joinedDate: "2020-01-08",
      verified: true
    }
  ];

  const services = [
    {
      id: 1,
      serviceName: "Cultural Photography Session",
      description: "Professional photography session capturing traditional tribal culture, festivals, and daily life. Perfect for documenting your Jharkhand experience with stunning visuals.",
      pricePerHour: 1500,
      artisanId: 4,
      artisanName: "Meera Singh",
      artisanImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      artisanRating: 4.7,
      artisanLocation: "Ranchi",
      category: "Photography",
      duration: "2-4 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      tags: ["Photography", "Cultural", "Professional"]
    },
    {
      id: 2,
      serviceName: "Traditional Folk Dance Performance",
      description: "Experience authentic Santhali and Munda folk dances performed by local artists. Learn basic steps and understand the cultural significance of these traditional art forms.",
      pricePerHour: 800,
      artisanId: 5,
      artisanName: "Lakshmi Devi",
      artisanImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      artisanRating: 4.8,
      artisanLocation: "Dumka",
      category: "Folk Art",
      duration: "1-2 hours",
      maxParticipants: 15,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      tags: ["Dance", "Cultural", "Performance"]
    },
    {
      id: 3,
      serviceName: "Pottery Making Workshop",
      description: "Hands-on pottery workshop where you'll learn traditional techniques from master craftsmen. Create your own clay artifacts to take home and learn about the cultural heritage.",
      pricePerHour: 600,
      artisanId: 6,
      artisanName: "Ram Kumar",
      artisanImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      artisanRating: 4.6,
      artisanLocation: "Jamshedpur",
      category: "Craft Instruction",
      duration: "2-3 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Pottery", "Hands-on", "Creative"]
    },
    {
      id: 4,
      serviceName: "Local Heritage Tour Guide",
      description: "Expert local guide for heritage sites, temples, and cultural landmarks. Learn about Jharkhand's rich history and traditions with personalized storytelling.",
      pricePerHour: 500,
      artisanId: 7,
      artisanName: "Vikram Singh",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.9,
      artisanLocation: "Deoghar",
      category: "Local Guide",
      duration: "4-6 hours",
      maxParticipants: 10,
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400&h=300&fit=crop",
      tags: ["Heritage", "Tour", "Cultural"]
    },
    {
      id: 5,
      serviceName: "Tribal Cooking Class",
      description: "Learn authentic tribal recipes with local families in their traditional kitchens. Experience the warmth of tribal hospitality while mastering traditional cooking techniques.",
      pricePerHour: 400,
      artisanId: 3,
      artisanName: "Suresh Oraon",
      artisanImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      artisanRating: 4.9,
      artisanLocation: "Gumla",
      category: "Cultural Experience",
      duration: "3-4 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      tags: ["Cooking", "Cultural", "Traditional"]
    },
    {
      id: 6,
      serviceName: "Bamboo Craft Workshop",
      description: "Learn traditional bamboo crafting techniques from master craftsmen. Create beautiful eco-friendly items while understanding sustainable practices.",
      pricePerHour: 450,
      artisanId: 9,
      artisanName: "Anil Mahato",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.5,
      artisanLocation: "Chaibasa",
      category: "Craft Instruction",
      duration: "2-3 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      tags: ["Bamboo", "Eco-friendly", "Hands-on"]
    },
    {
      id: 7,
      serviceName: "Tribal Jewelry Making",
      description: "Create authentic tribal jewelry using traditional techniques with silver and natural materials. Learn the cultural significance of each piece.",
      pricePerHour: 700,
      artisanId: 8,
      artisanName: "Sunita Oraon",
      artisanImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      artisanRating: 4.7,
      artisanLocation: "Hazaribagh",
      category: "Craft Instruction",
      duration: "3-4 hours",
      maxParticipants: 5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Jewelry", "Silver", "Traditional"]
    },
    {
      id: 8,
      serviceName: "Wildlife Photography Tour",
      description: "Capture Jharkhand's diverse wildlife with expert guidance. Visit national parks and wildlife sanctuaries with professional photography tips.",
      pricePerHour: 1200,
      artisanId: 4,
      artisanName: "Meera Singh",
      artisanImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      artisanRating: 4.7,
      artisanLocation: "Ranchi",
      category: "Photography",
      duration: "6-8 hours",
      maxParticipants: 4,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      tags: ["Wildlife", "Photography", "Nature"]
    },
    {
      id: 9,
      serviceName: "Traditional Mask Making",
      description: "Learn the art of traditional wooden mask making used in tribal festivals. Understand the cultural significance and create your own ceremonial mask.",
      pricePerHour: 550,
      artisanId: 10,
      artisanName: "Rekha Devi",
      artisanImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      artisanRating: 4.6,
      artisanLocation: "Hazaribagh",
      category: "Craft Instruction",
      duration: "4-5 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Mask Making", "Wooden", "Cultural"]
    },
    {
      id: 10,
      serviceName: "Dhokra Metal Casting Workshop",
      description: "Master the ancient art of Dhokra metal casting with traditional lost-wax technique. Create beautiful bronze artifacts under expert guidance.",
      pricePerHour: 800,
      artisanId: 1,
      artisanName: "Rajesh Munda",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.9,
      artisanLocation: "Khunti",
      category: "Craft Instruction",
      duration: "5-6 hours",
      maxParticipants: 4,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Metal Casting", "Bronze", "Traditional"]
    },
    {
      id: 11,
      serviceName: "Textile Weaving Experience",
      description: "Experience traditional handloom weaving techniques with master weavers. Learn about different fabrics and create your own textile piece.",
      pricePerHour: 500,
      artisanId: 2,
      artisanName: "Priya Devi",
      artisanImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      artisanRating: 4.8,
      artisanLocation: "Chaibasa",
      category: "Craft Instruction",
      duration: "3-4 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      tags: ["Weaving", "Textile", "Handloom"]
    },
    {
      id: 12,
      serviceName: "Forest Honey Collection Tour",
      description: "Join tribal communities in sustainable honey collection from pristine forests. Learn about traditional beekeeping and forest conservation.",
      pricePerHour: 300,
      artisanId: 3,
      artisanName: "Suresh Oraon",
      artisanImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      artisanRating: 4.9,
      artisanLocation: "Gumla",
      category: "Cultural Experience",
      duration: "4-5 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      tags: ["Honey", "Forest", "Sustainable"]
    },
    {
      id: 13,
      serviceName: "Stone Carving Workshop",
      description: "Learn traditional stone carving techniques from master craftsmen. Create beautiful sculptures and decorative items using ancient methods.",
      pricePerHour: 650,
      artisanId: 11,
      artisanName: "Arjun Soren",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.7,
      artisanLocation: "Hazaribagh",
      category: "Craft Instruction",
      duration: "4-5 hours",
      maxParticipants: 5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Stone Carving", "Sculpture", "Traditional"]
    },
    {
      id: 14,
      serviceName: "Santhali Textile Workshop",
      description: "Master the art of Santhali textile weaving and embroidery. Learn traditional patterns and create beautiful handwoven fabrics.",
      pricePerHour: 600,
      artisanId: 12,
      artisanName: "Kavita Mahato",
      artisanImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      artisanRating: 4.8,
      artisanLocation: "Dumka",
      category: "Craft Instruction",
      duration: "3-4 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      tags: ["Santhali", "Weaving", "Embroidery"]
    },
    {
      id: 15,
      serviceName: "Organic Farming Experience",
      description: "Learn sustainable organic farming techniques from tribal farmers. Experience traditional agriculture methods and forest product harvesting.",
      pricePerHour: 350,
      artisanId: 13,
      artisanName: "Birendra Oraon",
      artisanImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      artisanRating: 4.6,
      artisanLocation: "Gumla",
      category: "Cultural Experience",
      duration: "4-6 hours",
      maxParticipants: 10,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      tags: ["Organic", "Farming", "Sustainable"]
    },
    {
      id: 16,
      serviceName: "Traditional Folk Music Class",
      description: "Learn traditional Santhali and Munda musical instruments and folk songs. Experience the rich musical heritage of Jharkhand's tribal communities.",
      pricePerHour: 500,
      artisanId: 14,
      artisanName: "Suman Devi",
      artisanImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      artisanRating: 4.9,
      artisanLocation: "Dumka",
      category: "Cultural Experience",
      duration: "2-3 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      tags: ["Music", "Traditional", "Instruments"]
    },
    {
      id: 17,
      serviceName: "Bamboo Furniture Making",
      description: "Create beautiful and sustainable bamboo furniture pieces. Learn traditional techniques combined with modern design principles.",
      pricePerHour: 700,
      artisanId: 15,
      artisanName: "Ravi Kumar",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.5,
      artisanLocation: "Chaibasa",
      category: "Craft Instruction",
      duration: "5-6 hours",
      maxParticipants: 4,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      tags: ["Bamboo", "Furniture", "Sustainable"]
    },
    {
      id: 18,
      serviceName: "Cultural Heritage Tour",
      description: "Explore Jharkhand's rich cultural heritage with expert guides. Visit historical sites, temples, and cultural centers with detailed explanations.",
      pricePerHour: 400,
      artisanId: 16,
      artisanName: "Geeta Singh",
      artisanImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      artisanRating: 4.8,
      artisanLocation: "Ranchi",
      category: "Cultural Experience",
      duration: "6-8 hours",
      maxParticipants: 12,
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400&h=300&fit=crop",
      tags: ["Heritage", "Cultural", "Tour"]
    },
    {
      id: 19,
      serviceName: "Metal Craft Workshop",
      description: "Learn traditional brass and copper metalworking techniques. Create beautiful metal artifacts and decorative items using ancient methods.",
      pricePerHour: 600,
      artisanId: 17,
      artisanName: "Manoj Mahato",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.6,
      artisanLocation: "Khunti",
      category: "Craft Instruction",
      duration: "3-4 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Metal", "Brass", "Copper"]
    },
    {
      id: 20,
      serviceName: "Tribal Cuisine Masterclass",
      description: "Master authentic tribal cooking techniques and recipes. Learn traditional food preparation methods and cultural significance of tribal cuisine.",
      pricePerHour: 450,
      artisanId: 18,
      artisanName: "Poonam Devi",
      artisanImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      artisanRating: 4.7,
      artisanLocation: "Gumla",
      category: "Cultural Experience",
      duration: "4-5 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      tags: ["Cooking", "Tribal", "Traditional"]
    },
    {
      id: 21,
      serviceName: "Wood Carving Workshop",
      description: "Learn traditional wood carving techniques and create beautiful tribal furniture and decorative items. Master the art of carving intricate tribal motifs.",
      pricePerHour: 550,
      artisanId: 19,
      artisanName: "Santosh Kumar",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.5,
      artisanLocation: "Hazaribagh",
      category: "Craft Instruction",
      duration: "4-5 hours",
      maxParticipants: 5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Wood Carving", "Furniture", "Traditional"]
    },
    {
      id: 22,
      serviceName: "Herbal Medicine Workshop",
      description: "Learn traditional herbal medicine and natural healing techniques. Discover the medicinal properties of forest herbs and plants.",
      pricePerHour: 400,
      artisanId: 20,
      artisanName: "Rita Oraon",
      artisanImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      artisanRating: 4.8,
      artisanLocation: "Gumla",
      category: "Cultural Experience",
      duration: "3-4 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      tags: ["Herbal", "Medicine", "Natural"]
    },
    {
      id: 23,
      serviceName: "Wildlife Photography Expedition",
      description: "Professional wildlife photography expedition with expert guidance. Capture stunning images of Jharkhand's diverse wildlife and natural beauty.",
      pricePerHour: 1000,
      artisanId: 21,
      artisanName: "Amit Kumar",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.9,
      artisanLocation: "Hazaribagh",
      category: "Photography",
      duration: "8-10 hours",
      maxParticipants: 3,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      tags: ["Wildlife", "Photography", "Expedition"]
    },
    {
      id: 24,
      serviceName: "Handloom Weaving Masterclass",
      description: "Master traditional handloom weaving techniques with expert weavers. Learn about different fabrics, patterns, and create your own textile masterpiece.",
      pricePerHour: 550,
      artisanId: 22,
      artisanName: "Sushila Devi",
      artisanImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      artisanRating: 4.7,
      artisanLocation: "Dhanbad",
      category: "Craft Instruction",
      duration: "4-5 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      tags: ["Handloom", "Weaving", "Textile"]
    },
    {
      id: 25,
      serviceName: "Bamboo Basketry Workshop",
      description: "Learn traditional bamboo basket making techniques. Create beautiful and functional baskets using age-old methods and natural materials.",
      pricePerHour: 400,
      artisanId: 23,
      artisanName: "Rajesh Kumar",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.4,
      artisanLocation: "Chaibasa",
      category: "Craft Instruction",
      duration: "3-4 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      tags: ["Bamboo", "Basketry", "Traditional"]
    },
    {
      id: 26,
      serviceName: "Ceramic Arts Workshop",
      description: "Explore traditional ceramic arts and pottery techniques. Create beautiful ceramic items using traditional methods and glazing techniques.",
      pricePerHour: 500,
      artisanId: 24,
      artisanName: "Meera Devi",
      artisanImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      artisanRating: 4.6,
      artisanLocation: "Jamshedpur",
      category: "Craft Instruction",
      duration: "3-4 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Ceramic", "Pottery", "Arts"]
    },
    {
      id: 27,
      serviceName: "Adventure Trekking Tour",
      description: "Exciting trekking adventure through Jharkhand's forests and hills. Experience nature's beauty while learning about local flora and fauna.",
      pricePerHour: 600,
      artisanId: 25,
      artisanName: "Vikash Singh",
      artisanImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      artisanRating: 4.8,
      artisanLocation: "Ranchi",
      category: "Adventure",
      duration: "6-8 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400&h=300&fit=crop",
      tags: ["Trekking", "Adventure", "Nature"]
    },
    {
      id: 28,
      serviceName: "Tribal Jewelry Design Workshop",
      description: "Design and create unique tribal jewelry pieces. Learn traditional techniques and modern design principles to create stunning jewelry.",
      pricePerHour: 650,
      artisanId: 26,
      artisanName: "Kamla Devi",
      artisanImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      artisanRating: 4.7,
      artisanLocation: "Hazaribagh",
      category: "Craft Instruction",
      duration: "3-4 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Jewelry", "Design", "Traditional"]
    },
    {
      id: 29,
      serviceName: "Beekeeping Experience",
      description: "Learn sustainable beekeeping techniques and honey production. Experience the fascinating world of bees and forest honey collection.",
      pricePerHour: 350,
      artisanId: 27,
      artisanName: "Ramesh Oraon",
      artisanImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      artisanRating: 4.9,
      artisanLocation: "Gumla",
      category: "Cultural Experience",
      duration: "4-5 hours",
      maxParticipants: 6,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      tags: ["Beekeeping", "Honey", "Sustainable"]
    },
    {
      id: 30,
      serviceName: "Folk Art Painting Workshop",
      description: "Learn traditional folk art painting techniques. Create beautiful paintings depicting tribal life, culture, and natural beauty of Jharkhand.",
      pricePerHour: 450,
      artisanId: 28,
      artisanName: "Sunita Mahato",
      artisanImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      artisanRating: 4.6,
      artisanLocation: "Dumka",
      category: "Craft Instruction",
      duration: "3-4 hours",
      maxParticipants: 8,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      tags: ["Painting", "Folk Art", "Cultural"]
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
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.artisanName.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 9);


  // Handler functions
  const handleAddToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
    // In a real app, you'd make an API call here
    console.log(`Added product ${productId} to cart`);
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
    // In a real app, you'd navigate to artisan profile page
    console.log(`View profile for artisan ${artisanId}`);
  };

  const handleHireArtisan = (artisanId: number) => {
    // In a real app, you'd navigate to artisan services or booking page
    console.log(`Hire artisan ${artisanId}`);
  };

  const handleBookService = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (bookingData: any) => {
    // In a real app, you'd make an API call to create the booking
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
    <CartProvider>
      <Layout>
      {/* Hero Section - Carousel */}
      <div className="h-64 relative">
        <Carousel 
          opts={{ loop: true }} 
          className="w-full h-full" 
          setApi={(api) => setHeroApi(api)}
        >
          <CarouselContent>
            {heroCarouselData.map((slide) => (
              <CarouselItem key={slide.id}>
                <div 
                  className="h-64 flex items-center justify-center text-white relative"
                  style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="px-8 py-3"
                      onClick={() => {
                        if (slide.buttonLink === "#products") setActiveTab("products");
                        else if (slide.buttonLink === "#artisans") setActiveTab("artisans");
                        else if (slide.buttonLink === "#services") setActiveTab("services");
                        // Note: hotels tab not available in marketplace
                      }}
                    >
                      {slide.buttonText}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows */}
          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 h-12 w-12" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 h-12 w-12" />
        </Carousel>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroCarouselData.map((_, i) => (
            <button
              key={i}
              onClick={() => heroApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-3 rounded-full transition-all ${
                heroIndex === i ? "bg-white w-8" : "bg-white/50 w-3"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Cart */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === "products" ? "default" : "ghost"}
              onClick={() => setActiveTab("products")}
              className="px-6"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Products ({products.length})
            </Button>
            <Button
              variant={activeTab === "artisans" ? "default" : "ghost"}
              onClick={() => setActiveTab("artisans")}
              className="px-6"
            >
              <Users className="h-4 w-4 mr-2" />
              Artisans ({artisans.length})
            </Button>
            <Button
              variant={activeTab === "services" ? "default" : "ghost"}
              onClick={() => setActiveTab("services")}
              className="px-6"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Hire Services ({services.length})
            </Button>
          </div>
          
          {/* Cart Button */}
          <Button
            variant="outline"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder={`Search for ${activeTab}...`}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
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
        </div>

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
                <Card key={artisan.id} className="travel-card">
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
    </CartProvider>
  );
};

export default Marketplace;