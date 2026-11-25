import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Box,
  ShoppingCart,
  BookmarkPlus,
  CheckCircle2,
  Leaf,
  QrCode,
  ArrowRight,
  Sun,
  Droplets,
  Ruler,
} from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { Plant3DViewer, POT_COLOR_PRESETS } from '../../components/ar/Plant3DViewer';
import { ARQRCodeModal } from '../../components/ar/ARQRCodeModal';
import { DirectARLauncher } from '../../components/ar/DirectARLauncher';
import PageHeader from '../../components/common/PageHeader';
import type { Product, PotOption } from '../../types';

const formatVND = (n: number) => n.toLocaleString('vi-VN') + ' ₫';

type ARStudioMode = '3d' | 'ar';

export default function ARExperience() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success, info } = useNotification();

  const initialSlug = searchParams.get('product');

  // Find initially selected product
  const initialProduct = initialSlug
    ? products.find((p) => p.slug === initialSlug)
    : undefined;

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    initialProduct ?? products[0]
  );
  const [mode, setMode] = useState<ARStudioMode>('3d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPot, setSelectedPot] = useState<PotOption>({
    id: POT_COLOR_PRESETS[0].id,
    name: POT_COLOR_PRESETS[0].name,
    color: POT_COLOR_PRESETS[0].hex,
  });
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showQrForAR, setShowQrForAR] = useState(false);

  // Detect WebXR AR support
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
      const a = document.createElement('a');
      const iosAr = a.relList && a.relList.supports && a.relList.supports('ar');
      setArSupported(Boolean(iosAr));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Keep pot preset selection when product changes
  useEffect(() => {
    if (selectedProduct && !selectedPot) {
      setSelectedPot({
        id: POT_COLOR_PRESETS[0].id,
        name: POT_COLOR_PRESETS[0].name,
        color: POT_COLOR_PRESETS[0].hex,
      });
    }
  }, [selectedProduct?.id, selectedPot]);

  // Update URL param when product changes
  useEffect(() => {
    if (selectedProduct) {
      navigate(`/ar?product=${selectedProduct.slug}`, { replace: true });
    }
  }, [selectedProduct?.slug, navigate]);

  // Handle switching to AR mode: if AR unsupported, keep in 3D and prompt QR
  const handleSelectMode = (newMode: ARStudioMode) => {
    if (newMode === 'ar' && arSupported === false) {
      setShowQrForAR(true);
      return;
    }
    setMode(newMode);
  };

  const sortedAndFilteredProducts = [...products]
    .sort((a, b) => {
      const a3D = a.hasReal3DModel ? 1 : 0;
      const b3D = b.hasReal3DModel ? 1 : 0;
      return b3D - a3D;
    })
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, quantity, selectedPot);
    success(`Đã thêm ${selectedProduct.name} (Chậu ${selectedPot?.name}) vào giỏ hàng! 🌿`);
  };

  const handleSaveDesign = () => {
    if (!selectedProduct) return;
    info(`Đã lưu thiết kế ${selectedProduct.name} (${selectedPot?.name}) vào bộ sưu tập của bạn!`);
  };

  const hasReal3D = Boolean(selectedProduct?.hasReal3DModel && (selectedProduct.model3D || selectedProduct.modelPath));
  const modelUrl = selectedProduct?.model3D || selectedProduct?.modelPath;

  const isDirectAR = searchParams.get('direct_ar') === '1' || searchParams.get('ar') === '1';

  if (isDirectAR && selectedProduct) {
    return (
      <DirectARLauncher
        product={selectedProduct}
        potColor={selectedPot?.color}
        onExit={() => {
          navigate(`/ar?product=${selectedProduct.slug}`, { replace: true });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* ── Hero Header ── */}
      <PageHeader
        title="Trải Nghiệm Thực Tế Tăng Cường (AR)"
        breadcrumbs={[{ label: 'Trải nghiệm AR' }]}
      />

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-8 items-start">

          {/* ══ LEFT SIDEBAR: CÂY CẢNH & TÙY BIẾN ══ */}
          <div className="flex flex-col gap-5">

            {/* BƯỚC 1: Chọn cây cảnh */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-sage/70 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h2 className="font-bold text-text-main text-sm">Chọn cây cảnh</h2>
                </div>
                <span className="text-[11px] text-text-secondary">{products.length} cây trong vườn</span>
              </div>

              {/* Tìm kiếm */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Tìm tên cây hoặc đặc điểm…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-sage/40 rounded-xl border-0 outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-text-secondary"
                  />
                </div>
              </div>

              {/* Danh sách cây dạng lưới mini */}
              <div className="p-2.5 grid grid-cols-2 gap-2 max-h-72 overflow-y-auto">
                {sortedAndFilteredProducts.length === 0 ? (
                  <div className="col-span-2 text-center py-6 text-text-secondary text-xs">
                    Không tìm thấy cây phù hợp
                  </div>
                ) : (
                  sortedAndFilteredProducts.map((p) => {
                    const isSelected = selectedProduct?.id === p.id;
                    const has3DAvailable = p.hasReal3DModel && (p.model3D || p.modelPath);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProduct(p)}
                        className={`relative rounded-xl overflow-hidden text-left border-2 transition-all p-1.5 flex flex-col justify-between ${
                          isSelected
                            ? 'border-primary bg-sage/30 shadow-sm'
                            : 'border-transparent bg-cream/40 hover:border-primary/30'
                        }`}
                      >
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-1.5 bg-white">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                          {has3DAvailable && (
                            <span className="absolute top-1 left-1 bg-dark-forest/80 backdrop-blur-sm text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                              <Box className="w-2.5 h-2.5" /> 3D
                            </span>
                          )}
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] font-semibold text-text-main truncate leading-tight">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-primary font-bold mt-0.5">
                          {formatVND(p.salePrice ?? p.price)}
                        </p>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* BƯỚC 2: Tùy biến kiểu chậu */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-sage/70 px-4 py-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                <h2 className="font-bold text-text-main text-sm">Tùy biến màu & chất liệu chậu</h2>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-text-secondary">Chậu đã chọn:</span>
                  <span className="text-xs font-bold text-primary">{selectedPot?.name}</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {POT_COLOR_PRESETS.map((opt) => {
                    const isSelected = selectedPot?.color?.toUpperCase() === opt.hex.toUpperCase();
                    return (
                      <button
                        key={opt.hex}
                        type="button"
                        onClick={() => setSelectedPot({ id: opt.id, name: opt.name, color: opt.hex })}
                        title={opt.name}
                        className={`relative w-10 h-10 rounded-full border-4 transition-all shadow-sm hover:scale-110 flex items-center justify-center ${
                          isSelected
                            ? 'border-primary scale-110 shadow-md ring-2 ring-primary/20'
                            : 'border-gray-200'
                        }`}
                        style={{
                          backgroundColor: opt.hex,
                          outline:
                            opt.hex === '#FFFFFF'
                              ? '1px solid #e5e7eb'
                              : undefined,
                        }}
                      >
                        {isSelected && (
                          <span className={`w-2 h-2 rounded-full ${opt.hex === '#FFFFFF' ? 'bg-primary' : 'bg-white'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-text-secondary mt-3">
                  Màu sắc chậu được đồng bộ tự động với không gian 3D Studio bên phải.
                </p>
              </div>
            </div>

            {/* BƯỚC 3: Thao tác đặt mua */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-sage/70 px-4 py-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                <h2 className="font-bold text-text-main text-sm">Đặt mua chậu cây này</h2>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {selectedProduct && (
                  <div className="flex items-center gap-3 bg-cream rounded-xl p-2.5 border border-primary/10">
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-text-main text-xs truncate">
                        {selectedProduct.name}
                      </p>
                      <p className="text-[11px] text-text-secondary truncate">
                        Chậu: {selectedPot?.name}
                      </p>
                      <p className="text-primary font-bold text-xs mt-0.5">
                        {formatVND(selectedProduct.salePrice ?? selectedProduct.price)}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!selectedProduct}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-dark-forest transition-colors disabled:opacity-50 shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Thêm vào giỏ hàng
                </button>

                <button
                  type="button"
                  onClick={handleSaveDesign}
                  className="w-full flex items-center justify-center gap-1.5 text-text-secondary hover:text-text-main py-1.5 text-xs font-medium transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  Lưu cấu hình này
                </button>
              </div>
            </div>
          </div>

          {/* ══ RIGHT MAIN STAGE: 3D VIEWER & STUDIO ══ */}
          <div className="flex flex-col gap-5">

            {/* Mode Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMode('3d')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    mode === '3d'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary hover:bg-sage/40'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>Interactive 3D Studio</span>
                </button>
              </div>

              {/* QR Code Quick Button */}
              <button
                type="button"
                onClick={() => setShowQrForAR(true)}
                className="flex items-center gap-2 text-xs font-semibold text-primary px-3.5 py-2 rounded-xl bg-sage/40 hover:bg-sage/70 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>Xem AR trên điện thoại</span>
              </button>
            </div>

            {/* 3D Visualizer Canvas */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6">
              {selectedProduct ? (
                <div>
                  <Plant3DViewer
                    modelUrl={hasReal3D ? modelUrl : undefined}
                    posterUrl={selectedProduct.poster3D || selectedProduct.images[0]}
                    productName={selectedProduct.name}
                    potColor={selectedPot?.color}
                    potName={selectedPot?.name}
                    showPotColorPicker={true}
                    onPotColorChange={(hex, name) => {
                      setSelectedPot({ id: hex, name, color: hex });
                    }}
                    enableAR={true}
                    height="520px"
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ) : (
                <div className="min-h-[420px] flex items-center justify-center text-center p-8 bg-cream/50 rounded-2xl">
                  <div>
                    <Leaf className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-text-main">Vui lòng chọn một chậu cây để bắt đầu trải nghiệm</p>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Plant Botanical Specifications Card */}
            {selectedProduct && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-playfair font-bold text-2xl text-text-main mb-1">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-text-secondary max-w-xl leading-relaxed">
                      {selectedProduct.shortDescription}
                    </p>
                  </div>

                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="font-playfair text-2xl font-bold text-primary">
                      {formatVND(selectedProduct.salePrice ?? selectedProduct.price)}
                    </p>
                    {selectedProduct.salePrice && (
                      <p className="text-xs text-text-secondary line-through">
                        {formatVND(selectedProduct.price)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick botanical specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-cream border border-primary/10">
                    <span className="text-text-secondary flex items-center gap-1 mb-1">
                      <Ruler className="w-3.5 h-3.5 text-primary" /> Chiều cao
                    </span>
                    <span className="font-bold text-text-main">{selectedProduct.height}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-cream border border-primary/10">
                    <span className="text-text-secondary flex items-center gap-1 mb-1">
                      <Sun className="w-3.5 h-3.5 text-amber-500" /> Ánh sáng
                    </span>
                    <span className="font-bold text-text-main truncate block">
                      {selectedProduct.lightRequirement === 'low'
                        ? 'Chịu bóng / Ít sáng'
                        : selectedProduct.lightRequirement === 'bright-indirect'
                        ? 'Tán xạ gián tiếp'
                        : 'Sáng tự nhiên'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-cream border border-primary/10">
                    <span className="text-text-secondary flex items-center gap-1 mb-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" /> Tưới nước
                    </span>
                    <span className="font-bold text-text-main">
                      {selectedProduct.wateringFrequency === 'rarely'
                        ? '2-3 tuần / lần'
                        : '1 lần / tuần'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-cream border border-primary/10">
                    <span className="text-text-secondary flex items-center gap-1 mb-1">
                      <Leaf className="w-3.5 h-3.5 text-primary" /> Chăm sóc
                    </span>
                    <span className="font-bold text-text-main">
                      {selectedProduct.difficulty === 'easy' ? 'Rất dễ trồng' : 'Trung bình'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2">
                  <Link
                    to={`/shop/${selectedProduct.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Xem bài hướng dẫn chăm sóc chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── QR CODE DIALOG MODAL ── */}
      <ARQRCodeModal
        isOpen={showQrForAR}
        onClose={() => setShowQrForAR(false)}
        productName={selectedProduct?.name}
        productSlug={selectedProduct?.slug}
        modelUrl={modelUrl}
      />
    </div>
  );
}
