import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Box, ImageOff } from 'lucide-react';
import type { Product } from '../../types';
import { formatVND, calcDiscountPercent } from '../../utils/format';
import { getBadgeInfo } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const getLightLabel = (light: string) => {
  switch (light) {
    case 'low':
      return '☀️ Ít sáng';
    case 'medium':
      return '☀️ Sáng vừa';
    case 'bright-indirect':
      return '☀️ Tán xạ';
    case 'direct':
      return '☀️ Nắng trực tiếp';
    default:
      return '☀️ Trong nhà';
  }
};

const getWateringLabel = (freq: string) => {
  switch (freq) {
    case 'rarely':
      return '💧 2–3 tuần/lần';
    case 'weekly':
      return '💧 1 lần/tuần';
    case 'twice-weekly':
      return '💧 2 lần/tuần';
    default:
      return '💧 Khi khô đất';
  }
};

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(product.images[0]);
  const [imgError, setImgError] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    setImgSrc(product.images[0]);
    setImgError(false);
    setIsImgLoaded(false);
  }, [product.images]);

  const handleImageError = () => {
    if (imgSrc === product.images[0] && product.images[1]) {
      setImgSrc(product.images[1]);
    } else {
      setImgError(true);
    }
  };

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success } = useNotification();

  const badge = getBadgeInfo(product.badge);
  const isWishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const has3D = Boolean(product.hasReal3DModel && (product.model3D || product.modelPath));

  const displayPrice = product.salePrice ?? product.price;
  const discount = product.salePrice
    ? calcDiscountPercent(product.price, product.salePrice)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!isWishlisted) {
      success(`Đã thêm ${product.name} vào danh sách yêu thích!`);
    }
  };

  const handleArClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/ar?product=${product.slug}`);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 ${className}`}
    >
      {/* Image Area */}
      <Link to={`/shop/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] bg-sage/40 relative overflow-hidden">
          {/* Badge top-left */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
            {badge && (
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${badge.classes}`}
              >
                {badge.label}
              </span>
            )}
            {discount && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white shadow-xs">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist button - ALWAYS VISIBLE on both mobile and desktop */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-all duration-200 ${
              isWishlisted
                ? 'bg-red-50 text-red-500 ring-1 ring-red-200'
                : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
            } active:scale-95 hover:scale-105`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
          </button>

          {/* Plant image */}
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center bg-sage/30">
              <ImageOff className="w-12 h-12 text-primary-light/40" />
            </div>
          ) : (
            <>
              {!isImgLoaded && (
                <div className="absolute inset-0 bg-sage/40 animate-pulse" />
              )}
              <img
                src={imgSrc}
                alt={product.name}
                loading="lazy"
                onLoad={() => setIsImgLoaded(true)}
                onError={handleImageError}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  isImgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          )}

          {/* 3D Model available indicator */}
          {has3D && (
            <span className="absolute bottom-2.5 left-2.5 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#143924]/85 backdrop-blur-sm text-emerald-300 flex items-center gap-1 shadow-sm">
              <Box className="w-3 h-3 text-emerald-400" />
              <span>3D Thực tế</span>
            </span>
          )}
        </div>
      </Link>

      {/* Info Area */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* 2 Micro-tags from products.ts */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#5C675E] font-medium">
          <span className="inline-flex items-center gap-1 bg-sage/70 px-2 py-0.5 rounded-md">
            {getLightLabel(product.lightRequirement)}
          </span>
          <span className="inline-flex items-center gap-1 bg-sage/70 px-2 py-0.5 rounded-md">
            {getWateringLabel(product.wateringFrequency)}
          </span>
        </div>

        {/* Name */}
        <Link to={`/shop/${product.slug}`} className="group/title">
          <h3 className="font-semibold text-text-main text-sm leading-snug line-clamp-2 group-hover/title:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Review count */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-text-secondary font-medium">
            ★ {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-primary">
            {formatVND(displayPrice)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-text-secondary line-through font-medium">
              {formatVND(product.price)}
            </span>
          )}
        </div>

        {/* Action Buttons: 70% Primary Add to cart, 30% Secondary 3D/AR (Always visible on mobile & desktop) */}
        <div className="flex items-center gap-2 mt-2 pt-1 border-t border-gray-50">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label="Thêm vào giỏ hàng"
            className={`flex-[7] min-w-0 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
              inCart
                ? 'bg-sage text-primary border border-primary/30'
                : product.inStock
                ? 'bg-[#28643E] text-white hover:bg-[#193D2A] shadow-sm hover:shadow'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">
              {!product.inStock ? 'Hết hàng' : inCart ? 'Đã thêm' : 'Thêm vào giỏ'}
            </span>
          </button>

          {has3D ? (
            <button
              type="button"
              onClick={handleArClick}
              title="Ướm thử chậu cây trong không gian phòng bằng AR"
              className="flex-[3] min-w-0 flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-bold border border-[#28643E]/30 text-[#28643E] hover:bg-sage/70 bg-white transition-all active:scale-95"
            >
              <Box className="w-3.5 h-3.5 flex-shrink-0 text-[#28643E]" />
              <span className="truncate">3D/AR</span>
            </button>
          ) : (
            <Link
              to={`/shop/${product.slug}`}
              title="Xem thông tin chi tiết cây cảnh"
              className="flex-[3] min-w-0 flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold border border-gray-200 text-text-secondary hover:text-primary hover:bg-sage/40 transition-colors"
            >
              <span className="truncate">Chi tiết</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
