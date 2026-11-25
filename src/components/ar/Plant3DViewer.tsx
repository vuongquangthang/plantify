import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Smartphone,
  AlertCircle,
  HelpCircle,
  Sparkles,
  QrCode,
  X,
  CheckCircle2,
  Leaf,
} from 'lucide-react';
import { ARQRCodeModal } from './ARQRCodeModal';

// Declare TypeScript intrinsic elements for <model-viewer>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export interface PotColorPreset {
  id: string;
  name: string;
  hex: string;
}

export const POT_COLOR_PRESETS: PotColorPreset[] = [
  { id: 'white', name: 'Trắng sứ', hex: '#FFFFFF' },
  { id: 'terracotta', name: 'Đất nung', hex: '#C46A30' },
  { id: 'black', name: 'Đen nhám', hex: '#2D2D2D' },
  { id: 'sage', name: 'Xanh Sage', hex: '#6F956E' },
  { id: 'gold', name: 'Vàng kim', hex: '#C9A84C' },
];

export interface Plant3DViewerProps {
  modelUrl?: string;
  posterUrl?: string;
  productName: string;
  enableAR?: boolean;
  onLoadingChange?: (loading: boolean) => void;
  className?: string;
  autoRotateDefault?: boolean;
  onAddToCart?: () => void;
  showControlsBar?: boolean;
  potColor?: string;
  potName?: string;
  height?: string;
  showPotColorPicker?: boolean;
  onPotColorChange?: (colorHex: string, colorName: string) => void;
}

// Convert hex color to RGBA normalized array [r, g, b, a]
function hexToRgba(hex: string): [number, number, number, number] {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((x) => x + x).join('');
  }
  const num = parseInt(c, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
    1.0,
  ];
}

export const Plant3DViewer: React.FC<Plant3DViewerProps> = ({
  modelUrl,
  posterUrl,
  productName,
  enableAR = true,
  onLoadingChange,
  className = '',
  autoRotateDefault = true,
  onAddToCart,
  showControlsBar = true,
  potColor,
  potName,
  height = '500px',
  showPotColorPicker = false,
  onPotColorChange,
}) => {
  const modelViewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotateDefault);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [currentPotColor, setCurrentPotColor] = useState<string>(potColor || '#FFFFFF');

  useEffect(() => {
    if (potColor) {
      setCurrentPotColor(potColor);
    }
  }, [potColor]);

  // Check WebXR AR support
  useEffect(() => {
    let isMounted = true;
    if (typeof navigator !== 'undefined' && 'xr' in navigator) {
      (navigator as any).xr
        ?.isSessionSupported?.('immersive-ar')
        ?.then((supported: boolean) => {
          if (isMounted) setArSupported(supported);
        })
        ?.catch(() => {
          if (isMounted) setArSupported(false);
        });
    } else {
      // Check iOS Quick Look support
      const a = document.createElement('a');
      const iosAr = a.relList && a.relList.supports && a.relList.supports('ar');
      setArSupported(Boolean(iosAr));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Fade out interaction hint after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Reset states when modelUrl changes
  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    setLoadingProgress(0);
    onLoadingChange?.(true);
  }, [modelUrl, onLoadingChange]);

  // Model-viewer event listeners
  useEffect(() => {
    const el = modelViewerRef.current;
    if (!el) return;

    const handleProgress = (event: any) => {
      const progress = Math.round((event.detail?.totalProgress ?? 0) * 100);
      setLoadingProgress(progress);
    };

    const handleLoad = () => {
      setIsLoading(false);
      setLoadingProgress(100);
      onLoadingChange?.(false);
      // Apply initial pot color if defined
      if (potColor) {
        applyPotColor(potColor);
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onLoadingChange?.(false);
    };

    el.addEventListener('progress', handleProgress);
    el.addEventListener('load', handleLoad);
    el.addEventListener('error', handleError);

    return () => {
      el.removeEventListener('progress', handleProgress);
      el.removeEventListener('load', handleLoad);
      el.removeEventListener('error', handleError);
    };
  }, [modelUrl, onLoadingChange, potColor]);

  // Dynamic pot color update via model-viewer material API
  const applyPotColor = useCallback(
    (colorHex: string) => {
      const el = modelViewerRef.current;
      if (!el || !el.model) return;

      try {
        const materials = el.model.materials;
        if (!materials || !materials.length) return;

        const rgba = hexToRgba(colorHex);

        const isPlantFoliage = (name: string) => {
          const n = name.toLowerCase();
          return (
            n.includes('leaf') ||
            n.includes('leaves') ||
            n.includes('hojas') ||
            n.includes('stem') ||
            n.includes('tallo') ||
            n.includes('tierra') ||
            n.includes('soil') ||
            n.includes('pothos')
          );
        };

        // Strategy 1: Explicit matching for pot, ceramic, chậu, planter, vase, stand
        let targetMaterials = materials.filter((m: any) => {
          const n = (m.name || '').toLowerCase();
          return (
            n.includes('pot') ||
            n.includes('ceramic') ||
            n.includes('chậu') ||
            n.includes('planter') ||
            n.includes('vase')
          );
        });

        // Strategy 2: Model-specific naming
        // Peace Lily (plant.glb): 'Black' is the pot ceramic body
        if (targetMaterials.length === 0) {
          const blackMat = materials.find((m: any) => m.name === 'Black');
          if (blackMat) targetMaterials.push(blackMat);
        }

        // Monstera: 'material' is the pot mesh
        if (targetMaterials.length === 0) {
          const potMat = materials.find((m: any) => m.name === 'material');
          if (potMat) targetMaterials.push(potMat);
        }

        // Fiddle Leaf Fig (indoor_plant.glb): 'plant' is the pot/basket, while 'Leaf2' is leaves
        if (targetMaterials.length === 0) {
          const potMat = materials.find(
            (m: any) => m.name === 'plant' && !isPlantFoliage(m.name)
          );
          if (potMat) targetMaterials.push(potMat);
        }

        // Strategy 3: General fallback: any non-foliage material
        if (targetMaterials.length === 0) {
          targetMaterials = materials.filter(
            (m: any) => !isPlantFoliage(m.name || '')
          );
        }

        targetMaterials.forEach((potMat: any) => {
          if (potMat && potMat.pbrMetallicRoughness) {
            potMat.pbrMetallicRoughness.setBaseColorFactor(rgba);
            // Enhanced sheen: Gold metallic factor vs ceramic matte glaze
            if (colorHex.toUpperCase() === '#C9A84C') {
              potMat.pbrMetallicRoughness.setMetallicFactor?.(0.85);
              potMat.pbrMetallicRoughness.setRoughnessFactor?.(0.25);
            } else {
              potMat.pbrMetallicRoughness.setMetallicFactor?.(0.08);
              potMat.pbrMetallicRoughness.setRoughnessFactor?.(0.45);
            }
          }
        });
      } catch (err) {
        console.warn('Could not update pot material color:', err);
      }
    },
    []
  );

  useEffect(() => {
    if (currentPotColor && !isLoading && !hasError) {
      applyPotColor(currentPotColor);
    }
  }, [currentPotColor, isLoading, hasError, applyPotColor]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Controls Actions
  const handleToggleAutoRotate = () => {
    const el = modelViewerRef.current;
    if (el) {
      el.autoRotate = !isAutoRotating;
      setIsAutoRotating(!isAutoRotating);
    }
  };

  const handleResetCamera = () => {
    const el = modelViewerRef.current;
    if (el) {
      el.cameraOrbit = '0deg 75deg 105%';
      el.fieldOfView = 'auto';
      el.jumpCameraToGoal();
    }
  };

  const handleZoom = (inOut: 'in' | 'out') => {
    const el = modelViewerRef.current;
    if (el) {
      const currentOrbit = el.getCameraOrbit();
      if (currentOrbit) {
        const radiusDelta = inOut === 'in' ? -0.15 : 0.15;
        const newRadius = Math.max(0.4, currentOrbit.radius * (1 + radiusDelta));
        el.cameraOrbit = `${currentOrbit.theta}rad ${currentOrbit.phi}rad ${newRadius}m`;
      }
    }
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleLaunchAR = () => {
    const el = modelViewerRef.current;
    if (el && el.canActivateAR) {
      el.activateAR();
    } else {
      // On desktop or devices without WebXR sensors, show QR Code dialog
      setShowQrModal(true);
    }
  };

  // ── 1. FALLBACK UI (No model or loading failed) ──
  if (!modelUrl || hasError) {
    return (
      <div
        ref={containerRef}
        style={{ minHeight: height }}
        className={`relative flex flex-col items-center justify-center p-6 bg-cream/80 border border-primary/10 rounded-2xl overflow-hidden text-center select-none ${className}`}
      >
        <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center mb-4 text-primary shadow-sm">
          <Leaf className="w-8 h-8" />
        </div>

        <h3 className="font-serif text-lg font-bold text-text-main mb-1">
          {productName}
        </h3>
        <p className="text-sm text-text-secondary max-w-md mb-4 leading-relaxed font-medium">
          {hasError
            ? 'Không thể tải tệp mô hình 3D lúc này. Bạn vẫn có thể ngắm cây qua thư viện ảnh chất lượng cao bên dưới.'
            : 'Mô hình 3D của sản phẩm đang được cập nhật.'}
        </p>

        {posterUrl && (
          <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-md ring-2 ring-primary/10 mb-4 bg-white">
            <img
              src={posterUrl}
              alt={productName}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 right-2 text-center text-[11px] bg-dark-forest/70 backdrop-blur-sm text-white py-0.5 rounded-full">
              Ảnh thực tế của cây
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-text-secondary bg-white/80 px-3.5 py-2 rounded-xl border border-primary/10">
          <AlertCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <span>Mô hình 3D thực tế hiện sẵn sàng cho: Trầu Bà Nam Mỹ, Lan Ý, Trầu Bà Vàng, Kim Tiền & Bàng Singapore.</span>
        </div>
      </div>
    );
  }

  // ── 2. REAL 3D VIEWER ──
  return (
    <div
      ref={containerRef}
      style={{ minHeight: height }}
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-sage/30 via-cream/40 to-sage/20 border border-primary/10 shadow-inner group ${className}`}
    >
      {/* ── model-viewer Web Component ── */}
      <model-viewer
        ref={modelViewerRef}
        src={modelUrl}
        poster={posterUrl}
        alt={`Mô hình 3D cây ${productName}`}
        camera-controls
        auto-rotate={isAutoRotating}
        auto-rotate-delay="1000"
        rotation-per-second="20deg"
        camera-orbit="0deg 75deg 105%"
        min-camera-orbit="auto auto 40%"
        max-camera-orbit="auto auto 200%"
        field-of-view="auto"
        shadow-intensity="1.2"
        shadow-softness="0.75"
        exposure="1.05"
        touch-action="pan-y"
        interaction-prompt="none"
        ar={enableAR}
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="auto"
        ar-placement="floor"
        style={{
          width: '100%',
          height: '100%',
          minHeight: height,
          outline: 'none',
          backgroundColor: 'transparent',
          display: 'block',
        }}
      >
        {/* Custom Loading Slot */}
        {isLoading && (
          <div
            slot="poster"
            className="absolute inset-0 flex flex-col items-center justify-center bg-cream/90 backdrop-blur-sm z-20"
          >
            <div className="relative w-16 h-16 flex items-center justify-center mb-3">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <Leaf className="w-7 h-7 text-primary animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-text-main mb-1">
              Đang tải mô hình 3D...
            </p>
            <p className="text-xs text-text-secondary mb-3">
              {loadingProgress > 0 ? `${loadingProgress}%` : 'Chuẩn bị hiển thị tán lá & chậu'}
            </p>
            {/* Progress bar */}
            <div className="w-48 h-1.5 bg-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}
      </model-viewer>

      {/* ── Top Left: Live Status Badge ── */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-primary/10 text-xs font-medium text-primary">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Mô hình 3D thực tế</span>
        </span>
        {potName && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-primary/10 text-xs text-text-secondary">
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/10"
              style={{ backgroundColor: currentPotColor || '#ffffff' }}
            />
            <span>Chậu: {potName}</span>
          </span>
        )}
      </div>

      {/* ── Top Right: AR Quick Action ── */}
      {enableAR && (
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={handleLaunchAR}
            title="Thử đặt cây trong không gian phòng bằng thực tế ảo AR"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary hover:bg-dark-forest text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Smartphone className="w-4 h-4" />
            <span>Thử AR trong phòng</span>
          </button>
        </div>
      )}

      {/* ── Center Bottom: Gentle Interaction Hint ── */}
      {showHint && !isLoading && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-700 bg-dark-forest/75 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <HelpCircle className="w-3.5 h-3.5 text-sage" />
          <span>Kéo để xoay 360° • Cuộn để thu phóng</span>
        </div>
      )}

      {/* ── Bottom Controls Toolbar ── */}
      {showControlsBar && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-primary/10">
          {/* Auto-rotate Toggle */}
          <button
            type="button"
            onClick={handleToggleAutoRotate}
            title={isAutoRotating ? 'Tạm dừng xoay' : 'Tự động xoay 360°'}
            className={`p-2 rounded-xl transition-all ${
              isAutoRotating
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-text-secondary hover:bg-sage/40'
            }`}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={handleResetCamera}
            title="Đặt lại góc nhìn mặc định"
            className="p-2 rounded-xl text-text-secondary hover:bg-sage/40 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-primary/15 my-auto mx-0.5" />

          {/* Zoom In */}
          <button
            type="button"
            onClick={() => handleZoom('in')}
            title="Phóng to để ngắm chi tiết lá"
            className="p-2 rounded-xl text-text-secondary hover:bg-sage/40 transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={() => handleZoom('out')}
            title="Thu nhỏ để xem tổng quan dáng cây"
            className="p-2 rounded-xl text-text-secondary hover:bg-sage/40 transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Quick Pot Color Switcher (Only when showPotColorPicker is enabled) */}
          {showPotColorPicker && (
            <>
              <div className="w-[1px] h-4 bg-primary/15 my-auto mx-0.5" />
              <div className="flex items-center gap-1.5 px-1" title="Đổi màu chậu 3D">
                {POT_COLOR_PRESETS.map((p) => (
                  <button
                    key={p.hex}
                    type="button"
                    onClick={() => {
                      setCurrentPotColor(p.hex);
                      applyPotColor(p.hex);
                      onPotColorChange?.(p.hex, p.name);
                    }}
                    title={`Đổi màu chậu: ${p.name}`}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-transform hover:scale-125 ${
                      currentPotColor.toUpperCase() === p.hex.toUpperCase()
                        ? 'border-primary ring-2 ring-primary/40 scale-110'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: p.hex,
                      outline: p.hex === '#FFFFFF' ? '1px solid #d1d5db' : undefined,
                    }}
                  />
                ))}
              </div>
            </>
          )}

          <div className="w-[1px] h-4 bg-primary/15 my-auto mx-0.5" />

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Xem toàn màn hình'}
            className="p-2 rounded-xl text-text-secondary hover:bg-sage/40 transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* ── QR CODE MODAL FOR NON-AR DESKTOP DEVICES ── */}
      <ARQRCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        productName={productName}
        modelUrl={modelUrl}
      />
    </div>
  );
};

export default Plant3DViewer;
