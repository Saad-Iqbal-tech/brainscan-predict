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
  Activity,
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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl gradient-accent">
              <Brain className="h-6 w-6 text-accent-foreground" />
            </div>
            <h1 className="text-xl font-display font-semibold text-foreground">
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
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            Welcome to <span className="text-gradient">Neuro AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced brain tumor detection using state-of-the-art artificial
            intelligence. Upload an MRI scan and get instant analysis.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Predict Tumor Card */}
          <div
            onClick={() => navigate("/predict")}
            className="medical-card-interactive group p-8 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex flex-col h-full">
              <div className="p-4 rounded-2xl gradient-accent w-fit mb-6 group-hover:shadow-glow transition-shadow">
                <Scan className="h-10 w-10 text-accent-foreground" />
              </div>

              <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                Predict Tumor
              </h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Upload an MRI brain scan image and our AI will analyze it to
                detect potential tumors with high accuracy.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4 text-medical-success" />
                  <span>High Accuracy</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Instant Results</span>
                </div>
              </div>

              <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                Start Analysis
                <ArrowRight className="h-5 w-5 ml-2" />
              </div>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div
            onClick={handleSoonClick}
            className="medical-card-interactive group p-8 animate-slide-up opacity-70"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex flex-col h-full">
              <div className="p-4 rounded-2xl bg-secondary w-fit mb-6">
                <Clock className="h-10 w-10 text-muted-foreground" />
              </div>

              <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                More advanced features are being developed including detailed
                reports, history tracking, and multi-scan analysis.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-warning/10 text-medical-warning text-sm">
                  <Clock className="h-3 w-3" />
                  In Development
                </div>
              </div>

              <div className="flex items-center text-muted-foreground font-medium">
                Stay Tuned
                <ArrowRight className="h-5 w-5 ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="medical-card p-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-primary">AI</p>
                <p className="text-sm text-muted-foreground mt-1">Powered</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-primary">Fast</p>
                <p className="text-sm text-muted-foreground mt-1">Analysis</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-primary">Secure</p>
                <p className="text-sm text-muted-foreground mt-1">Data</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-primary">Free</p>
                <p className="text-sm text-muted-foreground mt-1">To Use</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
