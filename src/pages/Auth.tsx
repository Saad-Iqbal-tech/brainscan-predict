import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Brain, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        await signup(email, password);
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
      }
      navigate("/dashboard");
    } catch (error: any) {
      let message = "An error occurred. Please try again.";
      
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please login instead.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (error.code === "auth/user-not-found") {
        message = "No account found with this email. Please sign up.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-credential") {
        message = "Invalid credentials. Please check your email and password.";
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
          <div className="mb-8 p-6 rounded-full bg-primary-foreground/10 backdrop-blur-sm animate-pulse-glow">
            <Brain className="h-20 w-20 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl font-display font-bold text-primary-foreground mb-4">
            Neuro AI
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-md">
            Advanced Brain Tumor Detection powered by Artificial Intelligence
          </p>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-3xl font-bold text-primary-foreground">99%</p>
              <p className="text-sm text-primary-foreground/70">Accuracy Rate</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-3xl font-bold text-primary-foreground">&lt;5s</p>
              <p className="text-sm text-primary-foreground/70">Analysis Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-3 rounded-xl gradient-accent">
              <Brain className="h-8 w-8 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Neuro AI
            </h1>
          </div>

          <div className="medical-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Sign up to start detecting brain tumors"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background border-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-background border-input"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium gradient-accent hover:opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-medium hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
