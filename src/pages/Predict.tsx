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
      <header className="border-b border-border bg-card sticky top-0 z-50">
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
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Tumor Detection
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Brain Tumor Detection
            </h2>
            <p className="text-muted-foreground text-sm">
              Upload an MRI brain scan for AI analysis
            </p>
          </div>

          <div className="grid gap-6">
            {/* Upload Section */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-base font-semibold text-foreground mb-4">
                Upload MRI Scan
              </h3>

              {!selectedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-full bg-secondary">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center">
                    <img
                      src={previewUrl!}
                      alt="MRI Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                    <button
                      onClick={clearFile}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
                    >
                      <X className="h-4 w-4 text-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground truncate flex-1">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
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
                className="w-full mt-5 h-11"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze Scan
                  </>
                )}
              </Button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-base font-semibold text-foreground mb-5">
                  Analysis Results
                </h3>

                <div className="space-y-5">
                  {/* Prediction Status */}
                  <div
                    className={`p-5 rounded-lg ${
                      result.predicted_class === "tumor"
                        ? "bg-destructive/10 border border-destructive/20"
                        : "bg-green-500/10 border border-green-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {result.predicted_class === "tumor" ? (
                        <AlertCircle className="h-10 w-10 text-destructive" />
                      ) : (
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      )}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Detection Result
                        </p>
                        <p
                          className={`text-xl font-display font-bold ${
                            result.predicted_class === "tumor"
                              ? "text-destructive"
                              : "text-green-600"
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
                    <div className="p-4 rounded-lg bg-secondary">
                      <p className="text-xs text-muted-foreground mb-1">
                        Confidence Level
                      </p>
                      <p className="text-xl font-display font-bold text-foreground">
                        {(result.confidence * 100).toFixed(1)}%
                      </p>
                      <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary">
                      <p className="text-xs text-muted-foreground mb-1">
                        Analyzed By
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {user?.email || "Guest User"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
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
