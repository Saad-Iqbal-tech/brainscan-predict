import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Brain,
  Scan,
  Clock,
  LogOut,
  User,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSoonClick = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is under development. Stay tuned!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-display font-semibold text-foreground">
              Neuro AI
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground truncate max-w-[200px]">
                {user?.email}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">
            Welcome to Neuro AI
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload an MRI scan and get instant AI-powered brain tumor analysis.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Predict Tumor Card */}
          <div
            onClick={() => navigate("/predict")}
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
          >
            <div className="flex flex-col h-full">
              <div className="p-3 rounded-xl bg-primary w-fit mb-5">
                <Scan className="h-8 w-8 text-primary-foreground" />
              </div>

              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Predict Tumor
              </h3>
              <p className="text-muted-foreground mb-5 flex-grow text-sm">
                Upload an MRI brain scan image and our AI will analyze it to
                detect potential tumors.
              </p>

              <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                Start Analysis
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div
            onClick={handleSoonClick}
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer opacity-60"
          >
            <div className="flex flex-col h-full">
              <div className="p-3 rounded-xl bg-secondary w-fit mb-5">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>

              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Coming Soon
              </h3>
              <p className="text-muted-foreground mb-5 flex-grow text-sm">
                More features are being developed including reports and
                history tracking.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs w-fit">
                <Clock className="h-3 w-3" />
                In Development
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3">
                <p className="text-2xl font-display font-bold text-primary">AI</p>
                <p className="text-xs text-muted-foreground mt-1">Powered</p>
              </div>
              <div className="text-center p-3">
                <p className="text-2xl font-display font-bold text-primary">Fast</p>
                <p className="text-xs text-muted-foreground mt-1">Analysis</p>
              </div>
              <div className="text-center p-3">
                <p className="text-2xl font-display font-bold text-primary">Secure</p>
                <p className="text-xs text-muted-foreground mt-1">Data</p>
              </div>
              <div className="text-center p-3">
                <p className="text-2xl font-display font-bold text-primary">Free</p>
                <p className="text-xs text-muted-foreground mt-1">To Use</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
