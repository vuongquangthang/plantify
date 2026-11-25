import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  CheckCircle2,
  Copy,
  Check,
  X,
  Wifi,
  QrCode,
  ExternalLink,
} from 'lucide-react';

export interface ARQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productSlug?: string;
  urlPath?: string;
  modelUrl?: string;
}

export const ARQRCodeModal: React.FC<ARQRCodeModalProps> = ({
  isOpen,
  onClose,
  productName,
  productSlug,
  urlPath,
  modelUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [customIp, setCustomIp] = useState('192.168.1.100');
  const [useLocalIp, setUseLocalIp] = useState(true);

  // Compute target URL directly into AR Mode
  const computeTargetUrl = () => {
    if (typeof window === 'undefined') return 'http://192.168.1.100:3000/ar?direct_ar=1';
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : '';
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const host = isLocalhost && useLocalIp ? customIp : hostname;

    let targetPath = urlPath;
    if (!targetPath) {
      const slug = productSlug || 'zz-plant';
      targetPath = `/ar?product=${slug}&direct_ar=1`;
    } else if (!targetPath.includes('direct_ar=1')) {
      targetPath += (targetPath.includes('?') ? '&' : '?') + 'direct_ar=1';
    }

    return `${protocol}//${host}${port}${targetPath}`;
  };

  const targetUrl = computeTargetUrl();

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Compact Fixed Header */}
        <div className="relative px-5 py-4 sm:px-6 sm:py-4 border-b border-gray-100 bg-white flex-shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#28643E] flex items-center justify-center shadow-inner flex-shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <h3 className="font-['Playfair_Display'] text-base sm:text-lg font-bold text-[#26352B] truncate">
                Quét mã QR mở AR trên điện thoại
              </h3>
              <p className="font-['Be_Vietnam_Pro'] text-[11px] sm:text-xs text-text-secondary truncate mt-0.5">
                {productName ? (
                  <>Ướm thử cây <strong className="text-primary">{productName}</strong> tỉ lệ 1:1 vào phòng</>
                ) : (
                  <>Dùng camera điện thoại quét mã để bắt đầu trải nghiệm</>
                )}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-text-main hover:bg-sage/40 transition-all flex-shrink-0"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* QR Code Card */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#FAF9F4] rounded-2xl border border-emerald-900/10">
            <div className="p-3 bg-white rounded-2xl shadow-md border border-gray-100 mb-2.5">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(
                  targetUrl
                )}`}
                alt="Mã QR mở AR trên điện thoại"
                className="w-40 h-40 object-contain mx-auto"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-[#28643E] font-medium">
              <QrCode className="w-4 h-4" />
              <span>Quét mã là <strong>mở thẳng Camera AR</strong> trên điện thoại</span>
            </div>
          </div>

          {/* URL Box & Copy */}
          <div>
            <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5 text-left">
              Đường dẫn mở AR trực tiếp:
            </label>
            <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-xl">
              <input
                type="text"
                readOnly
                value={targetUrl}
                className="flex-1 bg-transparent text-xs text-text-main font-mono px-2 py-1 outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#28643E] hover:bg-[#193D2A] text-white text-xs font-semibold transition-all shadow-sm flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            {/* Wi-Fi note for localhost */}
            {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
              <div className="flex items-start gap-2 mt-2 px-1 text-[11px] text-[#788278]">
                <Wifi className="w-3.5 h-3.5 text-[#28643E] flex-shrink-0 mt-0.5" />
                <span>
                  Đang dùng IP mạng LAN: <strong className="text-text-main">{customIp}</strong>. Điện thoại và máy tính cần kết nối cùng mạng Wi-Fi.
                </span>
              </div>
            )}
          </div>

          {/* Device Guidelines */}
          <div className="space-y-2.5 text-left bg-emerald-50/70 border border-emerald-200/60 p-3.5 rounded-2xl text-xs text-[#26352B]">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#28643E] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#193D2A]">Dành cho iPhone / iPad (iOS):</strong>
                <p className="text-text-secondary text-[11px] mt-0.5">
                  Mở ứng dụng <strong>Camera</strong> quét mã và mở bằng <strong>Safari</strong>. Trình duyệt sẽ tự động kích hoạt tính năng AR Quick Look để soi trực tiếp cây xuống sàn.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-emerald-200/50">
              <CheckCircle2 className="w-4 h-4 text-[#28643E] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#193D2A]">Dành cho điện thoại Android:</strong>
                <p className="text-text-secondary text-[11px] mt-0.5">
                  Quét bằng Camera hoặc <strong>Google Lens</strong>, mở bằng <strong>Google Chrome</strong> để kích hoạt Google Scene Viewer / WebXR.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-cream/40 flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-text-main text-xs font-bold transition-colors"
          >
            Đóng
          </button>
          <a
            href={targetUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-primary/30 text-primary hover:bg-sage/40 text-xs font-semibold transition-colors"
          >
            <span>Mở tab mới</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
