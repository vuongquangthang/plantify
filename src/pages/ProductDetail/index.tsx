import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  StarHalf,
  Heart,
  ShoppingCart,
  Zap,
  Sun,
  Droplets,
  Ruler,
  Circle,
  Leaf,
  ChevronRight,
  Box,
  Image as ImageIcon,
  Smartphone,
} from 'lucide-react';
import { products, getProductBySlug } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import { Plant3DViewer } from '../../components/ar/Plant3DViewer';
import PageHeader from '../../components/common/PageHeader';
import type { PotOption } from '../../types';

const difficultyLabel: Record<string, string> = {
  easy: 'Dễ trồng (Người mới)',
  medium: 'Cần chút kinh nghiệm',
  hard: 'Nâng cao',
};

const difficultyColor: Record<string, string> = {
  easy: 'text-green-700 bg-green-50',
  medium: 'text-amber-700 bg-amber-50',
  hard: 'text-red-700 bg-red-50',
};

const lightLabel: Record<string, string> = {
  low: 'Ánh sáng yếu / bóng râm',
  medium: 'Ánh sáng vừa phải',
  'bright-indirect': 'Ánh sáng tán xạ gián tiếp',
  direct: 'Nắng trực tiếp',
};

const wateringLabel: Record<string, string> = {
  rarely: '2–3 tuần / lần',
  weekly: 'Hàng tuần (1 lần/tuần)',
  'twice-weekly': '2 lần / tuần',
  daily: 'Hàng ngày',
};

const badgeConfig: Record<string, { label: string; cls: string }> = {
  new: { label: 'Mới về', cls: 'bg-blue-100 text-blue-700' },
  sale: { label: 'Giảm giá', cls: 'bg-red-100 text-red-600' },
  bestseller: { label: 'Bán chạy', cls: 'bg-amber-100 text-amber-700' },
  limited: { label: 'Số lượng có hạn', cls: 'bg-purple-100 text-purple-700' },
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
      {half && <StarHalf className="w-4 h-4 fill-amber-400 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </span>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success, info } = useNotification();

  const [mainImage, setMainImage] = useState(0);
  const [selectedPot, setSelectedPot] = useState<PotOption | undefined>(
    product?.potOptions?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'image' | '3d'>('image');

  const has3D = Boolean(product?.hasReal3DModel && (product?.model3D || product?.modelPath));
  const modelUrl = product?.model3D || product?.modelPath;

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-4 py-20">
        <div className="text-8xl">🌵</div>
        <h1 className="font-playfair text-3xl font-bold text-text-main">Không tìm thấy cây cảnh</h1>
        <p className="text-text-secondary text-center max-w-sm">
          Cây bạn đang tìm kiếm không tồn tại hoặc đã tạm dừng kinh doanh.
        </p>
        <Link
          to="/shop"
          className="btn-primary"
        >
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const displayPrice = product.salePrice ?? product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedPot);
    success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedPot);
    navigate('/cart');
  };

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = () => {
    toggleWishlist(product);
    if (inWishlist) {
      info(`Đã bỏ ${product.name} khỏi danh sách yêu thích`);
    } else {
      success(`Đã lưu ${product.name} vào danh sách yêu thích! 💚`);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Header cùng style đồng bộ với các tab */}
      <PageHeader
        title={product.name}
        breadcrumbs={[
          { label: 'Cửa hàng', href: '/shop' },
          { label: product.name }
        ]}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Image & 3D Visualizer ── */}
          <div className="flex flex-col gap-4">
            {/* View Mode Toggle Bar */}
            <div className="flex items-center bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-1.5 w-full">
                <button
                  type="button"
                  onClick={() => setViewMode('image')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    viewMode === 'image'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary hover:bg-sage/40'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Hình ảnh ({product.images.length})</span>
                </button>

                {has3D && (
                  <button
                    type="button"
                    onClick={() => setViewMode('3d')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      viewMode === '3d'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary hover:bg-sage/40'
                    }`}
                  >
                    <Box className="w-4 h-4" />
                    <span>Mô hình 3D 360°</span>
                  </button>
                )}
              </div>
            </div>

            {/* Display Area: Image or 3D */}
            {viewMode === '3d' ? (
              <div className="flex flex-col gap-3">
                <Plant3DViewer
                  modelUrl={has3D ? modelUrl : undefined}
                  posterUrl={product.poster3D || product.images[0]}
                  productName={product.name}
                  potColor={selectedPot?.color}
                  potName={selectedPot?.name}
                  enableAR={true}
                  height="460px"
                  onAddToCart={handleAddToCart}
                />
                <div className="flex items-center justify-end text-xs text-text-secondary px-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('image')}
                    className="text-primary hover:underline font-medium"
                  >
                    Xem lại ảnh chụp
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm aspect-square group">
                  <img
                    src={product.images[mainImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80';
                    }}
                  />
                  {product.badge && badgeConfig[product.badge] && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${badgeConfig[product.badge].cls}`}
                    >
                      {badgeConfig[product.badge].label}
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMainImage(idx)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          mainImage === idx
                            ? 'border-primary shadow-md scale-105'
                            : 'border-transparent hover:border-primary/40'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ảnh ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-6">

            {/* Name */}
            <div>
              {!product.inStock && (
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500 mb-2">
                  Hết hàng
                </span>
              )}
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-text-main leading-tight">
                {product.name}
              </h1>
              <p className="text-text-secondary mt-2 leading-relaxed">{product.shortDescription}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="font-semibold text-text-main">{product.rating}</span>
              <span className="text-text-secondary text-sm">({product.reviewCount} đánh giá từ khách hàng)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-playfair text-3xl font-bold text-primary">
                {displayPrice.toLocaleString('vi-VN')} ₫
              </span>
              {product.salePrice && (
                <span className="text-lg text-text-secondary line-through">
                  {product.price.toLocaleString('vi-VN')} ₫
                </span>
              )}
              {product.salePrice && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  -{Math.round((1 - product.salePrice / product.price) * 100)}%
                </span>
              )}
            </div>

            {/* Plant details */}
            <div className="bg-sage rounded-2xl p-5 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-secondary">Chiều cao</p>
                  <p className="text-sm font-semibold text-text-main">{product.height}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Circle className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-secondary">Đường kính chậu</p>
                  <p className="text-sm font-semibold text-text-main">{product.potDiameter}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Sun className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-secondary">Ánh sáng</p>
                  <p className="text-sm font-semibold text-text-main">{lightLabel[product.lightRequirement]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Droplets className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-secondary">Tưới nước</p>
                  <p className="text-sm font-semibold text-text-main">{wateringLabel[product.wateringFrequency]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 col-span-2">
                <Leaf className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-secondary">Mức độ chăm sóc</p>
                  <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${difficultyColor[product.difficulty]}`}>
                    {difficultyLabel[product.difficulty]}
                  </span>
                </div>
              </div>
            </div>

            {/* AR Customization Link */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sage/50 border border-primary/10">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs text-text-main font-medium">Tùy biến màu chậu & xem trong phòng thực tế?</span>
              </div>
              <Link
                to={`/ar?product=${product.slug}`}
                className="text-xs font-bold text-primary hover:underline flex-shrink-0"
              >
                Trải nghiệm trong AR →
              </Link>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-text-main">Số lượng:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2.5 text-text-main hover:bg-sage transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="px-5 py-2.5 font-semibold text-text-main min-w-[3rem] text-center border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="px-4 py-2.5 text-text-main hover:bg-sage transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-text-secondary">Đang còn {product.stockCount} cây trong vườn</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 border-2 border-primary text-primary py-3.5 rounded-xl font-semibold hover:bg-sage transition-colors disabled:opacity-50"
              >
                <Zap className="w-5 h-5" />
                Mua ngay
              </button>
              <button
                onClick={handleWishlist}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                  inWishlist
                    ? 'border-red-400 bg-red-50 text-red-500'
                    : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'
                }`}
                aria-label="Yêu thích"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* AR Experience Action */}
            <Link
              to={`/ar?product=${product.slug}`}
              className="group relative overflow-hidden flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-100"
            >
              <Smartphone className="w-4 h-4" />
              <span>Thử đặt cây trong không gian phòng (AR)</span>
            </Link>
          </div>
        </div>

        {/* ── Full Description ── */}
        <div className="mt-14 max-w-3xl">
          <h2 className="font-playfair text-2xl font-bold text-text-main mb-4">Thông tin chi tiết về loài cây</h2>
          <div className="text-text-secondary leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-playfair text-2xl font-bold text-text-main mb-6">
              Có thể bạn cũng thích
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => {
                const relPrice = p.salePrice ?? p.price;
                return (
                  <Link
                    key={p.id}
                    to={`/shop/${p.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-text-main group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-primary font-bold">
                          {relPrice.toLocaleString('vi-VN')} ₫
                        </span>
                        {p.salePrice && (
                          <span className="text-sm text-text-secondary line-through">
                            {p.price.toLocaleString('vi-VN')} ₫
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
