import React, { useEffect, useRef, useState } from 'react';
import { Camera, ArrowLeft, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../types';

export interface DirectARLauncherProps {
  product: Product;
  potColor?: string;
  onExit: () => void;
}

export const DirectARLauncher: React.FC<DirectARLauncherProps> = ({
  product,
  potColor,
  onExit,
}) => {
  const modelViewerRef = useRef<any>(null);
  const [modelReady, setModelReady] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [statusText, setStatusText] = useState('Đang khởi động camera AR...');

  const modelUrl = product.model3D || product.modelPath;

  const triggerAR = () => {
    const el = modelViewerRef.current;
    const isAndroid = /android/i.test(navigator.userAgent);

    // 1. If model-viewer can activate AR directly (WebXR / Quick Look)
    if (el && el.canActivateAR) {
      try {
        el.activateAR();
        setHasLaunched(true);
        setStatusText('Camera AR đang hoạt động');
        return;
      } catch (err) {
        console.warn('Native activateAR failed:', err);
      }
    }

    // 2. Android Scene Viewer direct intent fallback
    if (isAndroid && modelUrl) {
      const fullGlbUrl = new URL(modelUrl, window.location.href).href;
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        fullGlbUrl
      )}&mode=ar_only&resizable=true#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
        window.location.href
      )};end;`;
      window.location.href = intentUrl;
      setHasLaunched(true);
      return;
    }

    // 3. Fallback attempt
    if (el?.activateAR) {
      try {
        el.activateAR();
        setHasLaunched(true);
      } catch (e) {
        setStatusText('Vui lòng chạm nút bên dưới để mở camera');
      }
    }
  };

  useEffect(() => {
    const el = modelViewerRef.current;
    if (!el) return;

    const handleLoad = () => {
      setModelReady(true);
      // Auto-launch AR camera immediately on model ready
      setTimeout(() => {
        triggerAR();
      }, 200);
    };

    el.addEventListener('load', handleLoad);
    return () => el.removeEventListener('load', handleLoad);
  }, [modelUrl]);

  return (
    <div className="fixed inset-0 z-50 bg-[#142318] text-white flex flex-col justify-between p-5 sm:p-6 overflow-hidden">
      {/* Background hidden/standalone model-viewer */}
      <model-viewer
        ref={modelViewerRef}
        src={modelUrl}
        poster={product.poster3D || product.images[0]}
        alt={product.name}
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="auto"
        ar-placement="floor"
        camera-controls
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Vào 3D Studio</span>
        </button>

        <span className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> Chế độ AR Trực tiếp
        </span>
      </div>

      {/* Center Action */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto max-w-sm mx-auto px-4">
        <div className="relative w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-5 shadow-2xl">
          <Camera className="w-10 h-10 text-emerald-400 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <h1 className="font-playfair text-2xl sm:text-3xl font-bold mb-2">
          {product.name}
        </h1>
        <p className="text-xs text-gray-300 leading-relaxed mb-6">
          {statusText}
        </p>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={triggerAR}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-3 transition-transform active:scale-95 animate-bounce"
        >
          <Smartphone className="w-5 h-5" />
          <span>CHẠM ĐỂ MỞ CAMERA AR</span>
        </button>

        <div className="flex items-center gap-2 mt-5 text-[11px] text-emerald-300/80 bg-white/5 px-3 py-1.5 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tỉ lệ chuẩn 1:1 • Tự động nhận diện sàn</span>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 text-center text-[11px] text-gray-400 max-w-xs mx-auto">
        Hướng camera về phía sàn nhà hoặc mặt bàn phẳng để đặt cây vào phòng thực tế.
      </div>
    </div>
  );
};

export default DirectARLauncher;
