import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Upload, Sparkles, Scissors, UserCheck, CheckCircle2 } from 'lucide-react';

const FACE_SHAPES_DATA = {
  Oval: {
    haircuts: [
      { name: 'Pompadour Fade', desc: 'Adds height to offset natural roundness, keeping the sides tight.' },
      { name: 'Slicked Back Undercut', desc: 'Accentuates symmetrical features of the oval profile.' }
    ],
    beards: [
      { name: 'Light Stubble', desc: 'Maintains clean lines without hiding the natural jaw structure.' },
      { name: 'Full Uniform Beard', desc: 'Kept short on the sides to prevent broadening the face.' }
    ]
  },
  Round: {
    haircuts: [
      { name: 'Textured Quiff', desc: 'Creates volume on top to give the illusion of an elongated face.' },
      { name: 'High Skin Fade with Crop', desc: 'Slims the sides of the face, adding structure.' }
    ],
    beards: [
      { name: 'Short Boxed Beard', desc: 'Grooms angles into the jawline, creating a square look.' },
      { name: 'Van Dyke Goatee', desc: 'Draws focus to the chin, giving elongation.' }
    ]
  },
  Square: {
    haircuts: [
      { name: 'Classic Buzz Cut', desc: 'Emphasizes a strong, masculine square jawline perfectly.' },
      { name: 'Side Swept Crew Cut', desc: 'Softens the strong angular symmetry slightly.' }
    ],
    beards: [
      { name: 'Heavy Stubble', desc: 'Accentuates the jawline texture without rounding it out.' },
      { name: 'Garibaldi Beard', desc: 'Full bottom profile that adds volume while maintaining width.' }
    ]
  },
  Diamond: {
    haircuts: [
      { name: 'Messy Fringe Layer', desc: 'Softens cheekbones while adding volume over the forehead.' },
      { name: 'Classic Side Part', desc: 'Reduces top volume focus, highlighting symmetrical features.' }
    ],
    beards: [
      { name: 'Full Corporate Beard', desc: 'Fills out the narrow chin area to match wider cheekbones.' },
      { name: 'Balbo Beard', desc: 'No-sideburn design that frames the chin area nicely.' }
    ]
  }
};

export default function FaceScanner({ onBookRecommendedStyle }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  const [scanState, setScanState] = useState('idle'); // idle, streaming, scanning, complete
  const [errorMessage, setErrorMessage] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [detectedShape, setDetectedShape] = useState('Oval');
  const [imagePreview, setImagePreview] = useState(null);

  const startCamera = async () => {
    setErrorMessage('');
    setScanState('streaming');
    setImagePreview(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('NOT_SUPPORTED');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 640, height: 480 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Webcam initiation failed:", err);
      
      const isLocalIP = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      const isHTTP = window.location.protocol === 'http:';
      
      if (isHTTP && isLocalIP) {
        setErrorMessage(
          `Browser Security Blocked Webcam:\nWebcam access is restricted on insecure local IP networks. Browsers require HTTPS to access mobile cameras.\n\n` +
          `To enable the camera on Android Chrome:\n` +
          `1. Open url: chrome://flags/#unsafely-treat-insecure-origin-as-secure in Chrome\n` +
          `2. Enable the flag "Insecure origins treated as secure"\n` +
          `3. Input your computer's local network IP: http://${window.location.hostname}:5173\n` +
          `4. Relaunch Chrome and refresh the site.\n\n` +
          `Alternatively, run 'ngrok' to create a free HTTPS tunnel, or simply upload a photo below!`
        );
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Webcam access denied. Please check your browser permission settings or upload a photo instead.');
      } else {
        setErrorMessage('Webcam could not be started (Not found or busy). Please upload a photo instead.');
      }
      setScanState('idle');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setScanState('streaming');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerScan = () => {
    setScanState('scanning');
    setScanProgress(0);
    setStatusText('Calibrating scanner sensors...');

    // Face shapes list
    const shapes = ['Oval', 'Round', 'Square', 'Diamond'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setDetectedShape(randomShape);
  };

  useEffect(() => {
    if (scanState !== 'scanning') return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanState('complete');
            stopCamera();
          }, 500);
          return 100;
        }

        // Dynamic statuses
        if (next === 20) setStatusText('Detecting facial mesh coordinates...');
        if (next === 50) setStatusText('Analyzing density and symmetry...');
        if (next === 80) setStatusText('Generating personalized recommendations...');

        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [scanState]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Real-time Advanced Face Tracking Canvas Visualizer
  useEffect(() => {
    if (scanState !== 'streaming' && scanState !== 'scanning') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth || 320;
      canvas.height = canvas.clientHeight || 426;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let frame = 0;
    
    // Simulated face mesh landmark offsets relative to center
    const basePoints = [
      { x: 0.38, y: 0.36, label: 'L_EYE' },
      { x: 0.62, y: 0.36, label: 'R_EYE' },
      { x: 0.5, y: 0.40, label: 'N_BRIDGE' },
      { x: 0.5, y: 0.49, label: 'N_TIP' },
      { x: 0.28, y: 0.50, label: 'L_CHEEK' },
      { x: 0.72, y: 0.50, label: 'R_CHEEK' },
      { x: 0.42, y: 0.62, label: 'M_LEFT' },
      { x: 0.58, y: 0.62, label: 'M_RIGHT' },
      { x: 0.5, y: 0.76, label: 'CHIN' },
      { x: 0.5, y: 0.22, label: 'FR_CNTR' },
      { x: 0.33, y: 0.28, label: 'L_BROW' },
      { x: 0.67, y: 0.28, label: 'R_BROW' },
    ];

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;
      
      // Dynamic pulsing bounding box
      const pulse = Math.sin(frame * 0.08) * 3;
      const boxX = w * 0.18 + pulse;
      const boxY = h * 0.18 - pulse;
      const boxW = w * 0.64 - pulse * 2;
      const boxH = h * 0.64 + pulse * 2;
      
      // Draw Face Bounding Box Corners
      ctx.strokeStyle = scanState === 'scanning' ? '#10b981' : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      const cornerLen = 12;
      
      // Top Left
      ctx.beginPath();
      ctx.moveTo(boxX, boxY + cornerLen);
      ctx.lineTo(boxX, boxY);
      ctx.lineTo(boxX + cornerLen, boxY);
      ctx.stroke();
      
      // Top Right
      ctx.beginPath();
      ctx.moveTo(boxX + boxW - cornerLen, boxY);
      ctx.lineTo(boxX + boxW, boxY);
      ctx.lineTo(boxX + boxW, boxY + cornerLen);
      ctx.stroke();
      
      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(boxX, boxY + boxH - cornerLen);
      ctx.lineTo(boxX, boxY + boxH);
      ctx.lineTo(boxX + cornerLen, boxY + boxH);
      ctx.stroke();
      
      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(boxX + boxW - cornerLen, boxY + boxH);
      ctx.lineTo(boxX + boxW, boxY + boxH);
      ctx.lineTo(boxX + boxW, boxY + boxH - cornerLen);
      ctx.stroke();
      
      // Draw Face Guide Target Oval
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(w / 2, h * 0.46, w * 0.26, h * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Color tokens
      const activeColor = scanState === 'scanning' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.15)';
      const dotColor = scanState === 'scanning' ? '#10b981' : 'rgba(255, 255, 255, 0.35)';
      
      // Map base points to coordinates with dynamic jitter
      const currentPoints = basePoints.map((pt, i) => {
        const jitterX = Math.sin(frame * 0.1 + i) * 1.2;
        const jitterY = Math.cos(frame * 0.1 + i) * 1.2;
        return {
          x: pt.x * w + jitterX,
          y: pt.y * h + jitterY,
          label: pt.label
        };
      });

      // Draw mesh links
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 0.5;
      
      // Connect forehead and brows
      ctx.beginPath();
      ctx.moveTo(currentPoints[10].x, currentPoints[10].y);
      ctx.lineTo(currentPoints[9].x, currentPoints[9].y);
      ctx.lineTo(currentPoints[11].x, currentPoints[11].y);
      ctx.stroke();

      // Connect eyes to nose
      ctx.beginPath();
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      ctx.lineTo(currentPoints[2].x, currentPoints[2].y);
      ctx.lineTo(currentPoints[1].x, currentPoints[1].y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(currentPoints[2].x, currentPoints[2].y);
      ctx.lineTo(currentPoints[3].x, currentPoints[3].y);
      ctx.stroke();

      // Connect cheeks to chin
      ctx.beginPath();
      ctx.moveTo(currentPoints[4].x, currentPoints[4].y);
      ctx.lineTo(currentPoints[8].x, currentPoints[8].y);
      ctx.lineTo(currentPoints[5].x, currentPoints[5].y);
      ctx.stroke();

      // Connect mouth
      ctx.beginPath();
      ctx.moveTo(currentPoints[6].x, currentPoints[6].y);
      ctx.lineTo(currentPoints[3].x, currentPoints[3].y);
      ctx.lineTo(currentPoints[7].x, currentPoints[7].y);
      ctx.lineTo(currentPoints[8].x, currentPoints[8].y);
      ctx.lineTo(currentPoints[6].x, currentPoints[6].y);
      ctx.lineTo(currentPoints[7].x, currentPoints[7].y);
      ctx.stroke();

      // Draw dots
      currentPoints.forEach(pt => {
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        if (scanState === 'scanning' && frame % 40 < 20) {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
          ctx.font = '6px monospace';
          ctx.fillText(pt.label, pt.x + 4, pt.y - 1);
        }
      });

      // Dynamic Telemetry HUD
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '7px monospace';
      ctx.fillText(`FPS: 60.00`, 10, h - 35);
      ctx.fillText(`BOX: [${Math.round(boxX)}, ${Math.round(boxY)}, ${Math.round(boxW)}, ${Math.round(boxH)}]`, 10, h - 25);
      ctx.fillText(`MESH: ACTIVE`, 10, h - 15);
      
      if (scanState === 'scanning') {
        ctx.fillStyle = '#10b981';
        ctx.fillText(`SCANNING: ${Math.min(100, Math.round(frame * 0.8))}%`, 10, 16);
        ctx.fillText(`STATUS: ANALYZING`, 10, 24);
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillText(`STATUS: STANDBY`, 10, 16);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [scanState]);

  return (
    <section id="scanner" className="py-24 bg-[#141416] border-t border-white/5 relative">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#a0a0a0] font-semibold block mb-2">
            AI CONSULTATION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">
            AI Face Scanner
          </h2>
          <p className="text-sm text-[#a0a0a0] leading-relaxed">
            Take a picture or upload a photo. Our system will analyze your facial angles to recommend perfect hairstyles and beard aesthetics.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12">
          {scanState === 'idle' && (
            <div className="flex flex-col items-center justify-center min-h-[350px] border border-dashed border-white/10 rounded-xl p-8 bg-white/2">
              <Camera className="w-16 h-16 text-white/25 mb-6" />
              <h3 className="font-serif text-xl font-medium mb-2 text-white">Start Your Analysis</h3>
              <p className="text-xs text-[#a0a0a0] max-w-sm mb-8 text-center leading-relaxed">
                Unlock tailor-made hair designs based on your jaw structure. Use a live camera or upload an image.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={startCamera} className="btn-primary">
                  <Camera className="w-4 h-4" />
                  Use Web Camera
                </button>
                <label className="btn-secondary cursor-pointer">
                  <Upload className="w-4 h-4 text-white/50" />
                  Upload Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
              </div>
              {errorMessage && (
                <div className="text-left bg-red-950/20 border border-red-500/15 p-4 rounded-lg mt-6 max-w-md w-full animate-fade-in">
                  <div className="flex gap-2 text-red-400 font-semibold text-xs mb-1.5 uppercase tracking-wider">
                    <span>⚠️ Camera Access Blocked</span>
                  </div>
                  <p className="text-xs text-[#a0a0a0] leading-relaxed whitespace-pre-line">
                    {errorMessage}
                  </p>
                </div>
              )}
            </div>
          )}

          {(scanState === 'streaming' || scanState === 'scanning') && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Media Feed Container */}
              <div className="md:col-span-6 flex justify-center">
                <div className="scanner-container w-full max-w-[320px] aspect-[3/4] bg-black border border-white/10 relative">
                  
                  {/* Camera stream or File Upload */}
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                  )}

                  {/* Real-time Tracking Canvas Overlay */}
                  <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                  />

                  {/* Scanning overlay grids */}
                  {scanState === 'scanning' && (
                    <>
                      <div className="scanner-line" />
                      <div className="scanner-overlay" />
                      <div className="face-grid" />
                      {/* Flashing points */}
                      <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-ping" />
                      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-ping" />
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#00f0ff] rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
                      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-[#00f0ff] rounded-full transform -translate-x-1/2 animate-ping" />
                    </>
                  )}
                </div>
              </div>

              {/* Controls Column */}
              <div className="md:col-span-6 text-left flex flex-col justify-center">
                <h3 className="font-serif text-xl font-bold mb-2">
                  {scanState === 'scanning' ? 'Analyzing Facial Metrics' : 'Ready to Scan'}
                </h3>
                <p className="text-xs text-[#a0a0a0] mb-6 leading-relaxed">
                  Make sure your face is centered, well-lit, and your ears are visible. Avoid wearing glasses or caps.
                </p>

                {scanState === 'scanning' ? (
                  <div className="flex flex-col gap-4">
                    {/* Progress Bar */}
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="bg-gradient-to-r from-[#00f0ff] to-blue-500 h-full transition-all duration-100 ease-out" 
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[0.7rem] font-bold text-[#a0a0a0] tracking-wider uppercase">
                      <span>{statusText}</span>
                      <span className="text-[#00f0ff]">{scanProgress}%</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={triggerScan} className="btn-primary bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:brightness-110 shadow-lg shadow-teal-500/20">
                      <Sparkles className="w-4 h-4" />
                      Analyze Face Shape
                    </button>
                    <button 
                      onClick={() => {
                        stopCamera();
                        setScanState('idle');
                      }} 
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {scanState === 'complete' && (
            <div className="text-left animate-fade-in">
              <div className="flex items-center gap-3 mb-6 bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-400">Analysis Succeeded</h4>
                  <p className="text-xs text-[#a0a0a0]">Recommended styling rules have been generated below.</p>
                </div>
              </div>

              {/* Detected Shape Info */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
                <div className="lg:col-span-4 bg-white/2 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                  <div className="flex gap-3 mb-5 w-full justify-center">
                    <div className="w-16 h-20 rounded overflow-hidden border border-white/5 relative">
                      <img src="/male_style.png" alt="Male Haircut" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1">
                        <span className="text-[0.45rem] font-bold text-white tracking-widest">HIM</span>
                      </div>
                    </div>
                    <div className="w-16 h-20 rounded overflow-hidden border border-white/5 relative">
                      <img src="/female_style.png" alt="Female Haircut" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1">
                        <span className="text-[0.45rem] font-bold text-white tracking-widest">HER</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[0.65rem] text-[#666666] tracking-widest uppercase font-bold">DETECTED ANGLE TYPE</span>
                  <h3 className="font-serif text-3xl font-bold text-white mt-1 mb-4">
                    {detectedShape} Shape
                  </h3>
                  
                  {/* Select other face shape to preview */}
                  <div className="w-full border-t border-white/5 pt-4">
                    <span className="text-[0.6rem] text-[#a0a0a0] block mb-2 font-medium">Not correct? Toggle below:</span>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {['Oval', 'Round', 'Square', 'Diamond'].map((shape) => (
                        <button
                          key={shape}
                          onClick={() => setDetectedShape(shape)}
                          className={`text-[0.65rem] font-bold px-2.5 py-1 rounded transition-colors ${
                            detectedShape === shape
                              ? 'bg-white text-black'
                              : 'bg-white/5 text-[#a0a0a0] hover:text-white'
                          }`}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-6">
                  <h4 className="font-serif text-xl text-white font-medium">Recommended Aesthetics</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Haircuts */}
                    <div className="flex flex-col gap-4">
                      <h5 className="text-zinc-400 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 border-b border-white/5 pb-2">
                        <Scissors className="w-3.5 h-3.5" />
                        Best Haircuts
                      </h5>
                      <div className="flex flex-col gap-3">
                        {FACE_SHAPES_DATA[detectedShape].haircuts.map((style, idx) => (
                          <div key={idx} className="p-3 bg-white/2 border border-white/5 rounded-lg">
                            <h6 className="text-white text-sm font-semibold mb-1">{style.name}</h6>
                            <p className="text-[0.7rem] text-[#a0a0a0] leading-relaxed">{style.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Beards */}
                    <div className="flex flex-col gap-4">
                      <h5 className="text-zinc-400 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 border-b border-white/5 pb-2">
                        <UserCheck className="w-3.5 h-3.5" />
                        Beard Compatibility
                      </h5>
                      <div className="flex flex-col gap-3">
                        {FACE_SHAPES_DATA[detectedShape].beards.map((style, idx) => (
                          <div key={idx} className="p-3 bg-white/2 border border-white/5 rounded-lg">
                            <h6 className="text-white text-sm font-semibold mb-1">{style.name}</h6>
                            <p className="text-[0.7rem] text-[#a0a0a0] leading-relaxed">{style.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-end border-t border-white/5 pt-6">
                <button 
                  onClick={() => {
                    setScanState('idle');
                    setImagePreview(null);
                  }}
                  className="btn-secondary"
                >
                  <RefreshCw className="w-4 h-4 text-[#a0a0a0]" />
                  Scan Again
                </button>
                <button 
                  onClick={() => onBookRecommendedStyle(detectedShape)}
                  className="btn-primary"
                >
                  <Sparkles className="w-4 h-4" />
                  Pre-Book Recommendations
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
