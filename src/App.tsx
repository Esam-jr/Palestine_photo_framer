import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Download,
  Image as ImageIcon,
  Heart,
  Github,
} from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "./components/ImageUpload";
import FrameSelector from "./components/FrameSelector";
import ImageCanvas from "./components/ImageCanvas";
import PalestineFlag from "./components/PalestineFlag";
import ParticleBackground from "./components/ParticleBackground";
import { Toaster } from "react-hot-toast";

export interface Frame {
  id: string;
  name: string;
  imageUrl: string;
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadFrames = async () => {
      const frameFiles: Record<string, string> = {
        "frame1.png":
          "https://ik.imagekit.io/wu2csfu8g/palastine/frame1.png?updatedAt=1753522196715",
        "frame2.png":
          "https://ik.imagekit.io/wu2csfu8g/palastine/frame2.png?updatedAt=1753522197849",
        "frame3.png":
          "https://ik.imagekit.io/wu2csfu8g/palastine/frame3.png?updatedAt=1753522198393",
        "frame4.png":
          "https://ik.imagekit.io/wu2csfu8g/palastine/frame4.png?updatedAt=1753522196342",
        "frame5.png":
          "https://ik.imagekit.io/wu2csfu8g/palastine/frame5.png?updatedAt=1753522195939",
        "frame6.png":
          "https://ik.imagekit.io/wu2csfu8g/palastine/frame6.png?updatedAt=1753522197548",
      };

      const loadedFrames: Frame[] = [];

      for (const [file, imageUrl] of Object.entries(frameFiles)) {
        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            loadedFrames.push({
              id: file.replace(".png", ""),
              name: file
                .replace(".png", "")
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()),
              imageUrl,
            });
          }
        } catch (error) {
          console.log(`Frame ${file} not found`);
        }
      }

      setFrames(loadedFrames);
    };

    loadFrames();
  }, []);

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
  };

  const handleFrameSelect = (frame: Frame) => {
    setSelectedFrame(frame);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `palestine-framed-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-black text-white px-4 py-3 rounded-lg shadow-lg max-w-sm w-full`}
      >
        <div>
          <p className="font-bold text-lg">📥 Downloaded Successfully!</p>
          <p className="text-sm mt-1 leading-snug">
            Remember <strong>Palestine</strong> with your duas 🤲
          </p>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-black text-white">
        <header className="relative bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <PalestineFlag className="w-12 h-8" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    Palestine Profile Framer
                  </h1>
                  <p className="text-sm text-gray-400 hidden sm:block">
                    Frame your profile with Palestinian pride
                  </p>
                </div>
              </div>
              <div className="w-8 h-8  flex items-center justify-center">
                <img
                  src="/photos/TRC.png"
                  alt="Logo"
                  className="w-12 h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-12 sm:py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
          <ParticleBackground />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:space-y-0">
              {/* Left Column - Hero Text */}
              <div className="text-center lg:text-left">
                <div className="mb-8">
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-white to-green-500 bg-clip-text text-transparent leading-tight">
                    Frame Your Profile
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 mb-4 leading-relaxed">
                    Add beautiful Palestinian-inspired frames to your photos
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    Upload your image, choose a frame, and download your
                    masterpiece
                  </p>
                </div>

                {/* Palestine Flag Colors Accent */}
                <div className="flex justify-center lg:justify-start space-x-2 mb-8">
                  <div className="w-8 h-2 bg-black border border-gray-600"></div>
                  <div className="w-8 h-2 bg-white"></div>
                  <div className="w-8 h-2 bg-green-600"></div>
                  <div className="w-8 h-2 bg-red-600"></div>
                </div>
              </div>

              {/* Right Column - Hero Image */}
              <div className="order-last">
                <div className="relative">
                  {/* Placeholder for hero image - to be added later */}
                  <img
                    src="https://ik.imagekit.io/wu2csfu8g/palastine/hero.png?updatedAt=1753522197425"
                    alt="Logo"
                    className="w-[30rem] h-auto "
                    loading="lazy"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-600 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-600 rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 -right-6 w-4 h-4 bg-white rounded-full opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 sm:p-6 shadow-2xl">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-green-500" />
                Upload Your Photo
              </h3>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>

            {/* Main Content - Side by Side Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Frame Selection */}
              <div className="order-2 lg:order-1">
                {frames.length > 0 && (
                  <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 sm:p-6 shadow-2xl h-full">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
                      Choose Your Frame
                    </h3>
                    <FrameSelector
                      frames={frames}
                      selectedFrame={selectedFrame}
                      onFrameSelect={handleFrameSelect}
                    />
                  </div>
                )}
              </div>

              {/* Right Column - Preview */}
              <div className="order-1 lg:order-2">
                <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 sm:p-6 shadow-2xl h-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Live Preview
                    </h3>
                    {uploadedImage && selectedFrame && (
                      <button
                        onClick={handleDownload}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Download </span>
                        {selectedFrame.id === "frame1" ||
                        selectedFrame.id === "frame3"
                          ? "Profile Picture"
                          : "Framed Photo"}
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    {uploadedImage ? (
                      <ImageCanvas
                        ref={canvasRef}
                        imageUrl={uploadedImage}
                        frame={selectedFrame}
                      />
                    ) : (
                      <div className="aspect-video bg-gray-800 rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
                          <p className="text-gray-400 font-medium text-sm sm:text-base px-4">
                            Upload a photo to see the magic
                          </p>
                          <p className="text-gray-500 text-xs sm:text-sm mt-1 px-4">
                            JPEG or PNG files supported
                          </p>
                          {selectedFrame && (
                            <p className="text-gray-500 text-xs mt-2 px-4 leading-relaxed">
                              {selectedFrame.id === "frame1" ||
                              selectedFrame.id === "frame3"
                                ? "Circular frames create perfect profile pictures"
                                : selectedFrame.id === "frame2"
                                ? "Frame will cover the full image with bottom-left alignment"
                                : selectedFrame.id === "frame4"
                                ? "Frame will be positioned at the bottom center of your image"
                                : selectedFrame.id === "frame5" ||
                                  selectedFrame.id === "frame6"
                                ? "Frame will be positioned at the bottom right of your image"
                                : "Frame will be positioned at the bottom center of your image"}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section className="py-16 bg-gradient-to-r from-red-900/20 via-black to-green-900/20 border-y border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 via-white to-green-500 bg-clip-text text-transparent">
                Support Palestine
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-2 px-4">
                Help those in need with your donation
              </p>
              <p className="text-gray-400 text-sm px-4">
                Every contribution makes a difference
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <a
                href="https://www.healpalestine.org/donate/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 hover:border-red-600 transition-all duration-500 hover:shadow-lg hover:shadow-red-600/25 transform hover:scale-105 overflow-hidden"
                style={{
                  backgroundImage:
                    "url(https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-red-400 transition-colors text-sm sm:text-base">
                        Heal Palestine
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Medical Aid
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Providing medical aid and healthcare support to Palestinians
                    in need.
                  </p>
                </div>
              </a>

              {/* PCRF */}
              <a
                href="https://www.pcrf.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 hover:border-green-600 transition-all duration-500 hover:shadow-lg hover:shadow-green-600/25 transform hover:scale-105 overflow-hidden"
                style={{
                  backgroundImage:
                    "url(https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=400)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors text-sm sm:text-base">
                        PCRF
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Children's Relief
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Palestine Children's Relief Fund - Supporting children and
                    families.
                  </p>
                </div>
              </a>

              {/* Islamic Relief */}
              <a
                href="https://islamic-relief.org/appeals/palestine-emergency-appeal/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 hover:border-white transition-all duration-500 hover:shadow-lg hover:shadow-white/25 transform hover:scale-105 sm:col-span-2 lg:col-span-1 overflow-hidden"
                style={{
                  backgroundImage:
                    "url(https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-current" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-gray-300 transition-colors text-sm sm:text-base">
                        Islamic Relief
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Emergency Appeal
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Emergency relief and humanitarian aid for Palestine crisis.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="relative flex flex-col items-center sm:flex-row sm:justify-center sm:items-center">
              <div className="text-center">
                <div className="flex justify-center items-center space-x-2 mb-3 sm:mb-4">
                  <Heart className="w-5 h-5 text-red-600 fill-current" />
                  <span className="text-gray-400 text-sm sm:text-base">
                    Made with love for Palestine
                  </span>
                  <Heart className="w-5 h-5 text-red-600 fill-current" />
                </div>
                <p className="text-gray-500 text-xs sm:text-sm px-4">
                  Represent Palestine by framing your profile • Inspire unity
                </p>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
                <a
                  href="https://github.com/Esam-jr/Palestine_photo_framer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
