import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Brain,
  Upload,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
} from "lucide-react";

interface PredictionResult {
  username: string;
  predicted_class: "tumor" | "notumor";
  confidence: number;
}

const API_BASE_URL = "https://braintumorapi-production.up.railway.app";

const Predict = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an MRI image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: PredictionResult = await response.json();
      setResult(data);

      toast({
        title: "Analysis Complete",
        description: "Your MRI scan has been analyzed successfully.",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gradient-accent">
                <Brain className="h-5 w-5 text-accent-foreground" />
              </div>
              <h1 className="text-lg font-display font-semibold text-foreground">
                Tumor Detection
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">
              Brain Tumor Detection
            </h2>
            <p className="text-muted-foreground">
              Upload an MRI brain scan image for AI-powered analysis
            </p>
          </div>

          <div className="grid gap-8">
            {/* Upload Section */}
            <div className="medical-card p-8 animate-slide-up">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Upload MRI Scan
              </h3>

              {!selectedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-secondary">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-secondary aspect-video flex items-center justify-center">
                    <img
                      src={previewUrl!}
                      alt="MRI Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                    <button
                      onClick={clearFile}
                      className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                    >
                      <X className="h-4 w-4 text-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-foreground truncate flex-1">
                      {selectedFile.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <Button
                onClick={handlePredict}
                disabled={!selectedFile || loading}
                className="w-full mt-6 h-12 text-base font-medium gradient-accent hover:opacity-90 transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    Analyze Scan
                  </>
                )}
              </Button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="medical-card p-8 animate-scale-in">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Analysis Results
                </h3>

                <div className="space-y-6">
                  {/* Prediction Status */}
                  <div
                    className={`p-6 rounded-xl ${
                      result.predicted_class === "tumor"
                        ? "bg-destructive/10 border border-destructive/20"
                        : "bg-medical-success/10 border border-medical-success/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {result.predicted_class === "tumor" ? (
                        <AlertCircle className="h-12 w-12 text-destructive" />
                      ) : (
                        <CheckCircle className="h-12 w-12 text-medical-success" />
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Detection Result
                        </p>
                        <p
                          className={`text-2xl font-display font-bold ${
                            result.predicted_class === "tumor"
                              ? "text-destructive"
                              : "text-medical-success"
                          }`}
                        >
                          {result.predicted_class === "tumor"
                            ? "Tumor Detected"
                            : "No Tumor Detected"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary">
                      <p className="text-sm text-muted-foreground mb-1">
                        Confidence Level
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-display font-bold text-foreground">
                          {(result.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full gradient-accent transition-all duration-500"
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-secondary">
                      <p className="text-sm text-muted-foreground mb-1">
                        Analyzed By
                      </p>
                      <p className="text-lg font-medium text-foreground truncate">
                        {user?.email || "Guest User"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={clearFile}
                      className="flex-1"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New Analysis
                    </Button>
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="flex-1"
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Predict;
