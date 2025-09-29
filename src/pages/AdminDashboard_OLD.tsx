import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { approveArtisan, getPendingArtisans } from "@/lib/mockApi";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Shield, 
  Activity, 
  Palette, 
  TrendingUp,
  RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const res = await getPendingArtisans();
    if (res.success) setPending(res.artisans);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleApprove = async (email: string) => {
    setLoading(true);
    const res = await approveArtisan(email);
    if (res.success) {
      await refresh();
      alert("Artisan approved");
    } else {
      alert(res.message || "Failed to approve");
    }
    setLoading(false);
  };

  const stats = [
    { title: "Total Artisans", value: "156", icon: Users, color: "from-blue-500 to-blue-600" },
    { title: "Pending Approval", value: pending.length.toString(), icon: Clock, color: "from-orange-500 to-orange-600" },
    { title: "Active Products", value: "2,341", icon: Palette, color: "from-green-500 to-green-600" },
    { title: "Monthly Revenue", value: "₹4.2L", icon: TrendingUp, color: "from-purple-500 to-purple-600" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground text-lg">Manage artisan approvals and platform oversight</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="tourism-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-r ${stat.color} p-6 text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                          <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <stat.icon className="h-8 w-8 text-white/80" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Pending Artisans Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="tourism-card shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-foreground">Pending Artisan Approvals</h2>
                      <p className="text-muted-foreground">Review and approve new artisan registrations</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={refresh} 
                    disabled={loading}
                    className="px-6 py-3"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>

                {pending.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">All Caught Up!</h3>
                    <p className="text-muted-foreground">No pending artisan approvals at this time.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {pending.map((artisan, index) => (
                      <motion.div
                        key={artisan.email}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 border border-border/30 rounded-xl bg-gradient-to-r from-white to-secondary/20 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-4">
                                <Users className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">{artisan.name}</h3>
                                <p className="text-muted-foreground">{artisan.email}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                                <p className="text-foreground">{artisan.phone}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Specialization</label>
                                <p className="text-foreground">{artisan.specialization}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Location</label>
                                <p className="text-foreground">{artisan.location}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Experience</label>
                                <p className="text-foreground">{artisan.experience} years</p>
                              </div>
                            </div>

                            {artisan.bio && (
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Bio</label>
                                <p className="text-foreground text-sm leading-relaxed">{artisan.bio}</p>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending Approval
                              </Badge>
                              <Badge variant="outline">
                                {artisan.specialization}
                              </Badge>
                            </div>
                          </div>

                          <div className="ml-6">
                            <Button
                              onClick={() => handleApprove(artisan.email)}
                              disabled={loading}
                              className="tourism-button px-6 py-3"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve Artisan
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="tourism-card text-center p-6">
              <CardContent className="p-0">
                <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Platform Analytics</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  View detailed insights and performance metrics
                </p>
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="tourism-card text-center p-6">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Manage Users</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Oversee user accounts and permissions
                </p>
                <Button variant="outline" className="w-full">
                  Manage Users
                </Button>
              </CardContent>
            </Card>

            <Card className="tourism-card text-center p-6">
              <CardContent className="p-0">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">System Settings</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Configure platform settings and preferences
                </p>
                <Button variant="outline" className="w-full">
                  Open Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
                {pending.map((artisan) => (
                  <div key={artisan.email} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{artisan.fullName}</h3>
                        <p className="text-sm text-muted-foreground">{artisan.email}</p>
                        <p className="text-sm text-muted-foreground">{artisan.phone}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{artisan.specialization}</Badge>
                          <Badge variant="outline">{artisan.experience} years</Badge>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleApprove(artisan.email)}
                        disabled={loading}
                        size="sm"
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
