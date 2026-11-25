import React, { useState } from 'react';
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

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
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
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col ${className}`}
    >
      {/* Image Area */}
      <Link to={`/shop/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] bg-sage/40 relative overflow-hidden">
          {/* Badge */}
          {badge && (
            <span
              className={`absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.classes}`}
            >
              {badge.label}
            </span>
          )}
          {/* Discount badge */}
          {discount && (
            <span className="absolute top-3 right-3 z-10 text-xs font-semibold px-2 py-1 rounded-full bg-red-500 text-white">
              -{discount}%
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-10 right-3 z-10 p-2 rounded-full shadow transition-all duration-200 ${
              isWishlisted
                ? 'bg-red-50 text-red-500'
                : 'bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100'
            } hover:scale-110`}
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
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                onLoad={() => setIsImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  isImgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          )}

          {/* 3D Model available indicator */}
          {has3D && (
            <span className="absolute bottom-3 right-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-dark-forest/80 backdrop-blur-sm text-emerald-300 flex items-center gap-1 shadow-sm">
              <Box className="w-3 h-3" />
              <span>3D</span>
            </span>
          )}

          {/* Try AR overlay */}
          <button
            onClick={handleArClick}
            className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary hover:text-white"
          >
            <Box className="w-3.5 h-3.5" />
            {has3D ? 'Xem 3D / AR' : 'Thử AR'}
          </button>
        </div>
      </Link>

      {/* Info Area */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Name */}
        <Link to={`/shop/${product.slug}`} className="group/title">
          <h3 className="font-medium text-text-main text-sm leading-snug line-clamp-2 group-hover/title:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-text-secondary">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-semibold text-primary">{formatVND(displayPrice)}</span>
          {product.salePrice && (
            <span className="text-xs text-text-secondary line-through">
              {formatVND(product.price)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label="Thêm vào giỏ hàng"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
              inCart
                ? 'bg-sage text-primary border border-primary/20'
                : product.inStock
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {!product.inStock ? 'Hết hàng' : inCart ? 'Đã thêm' : 'Thêm vào giỏ'}
          </button>
        </div>
      </div>
    </div>
  );
}
