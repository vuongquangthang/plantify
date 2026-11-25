import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from 'lucide-react';
import logoImg from '../../assets/logo.jpg';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-[#28643E] text-white shadow-xs font-semibold'
        : 'text-text-main hover:bg-[#28643E]/10 hover:text-[#28643E]'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 py-2'
            : 'bg-cream/95 backdrop-blur-sm border-b border-[#28643E]/10 py-2.5 sm:py-3'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group flex-shrink-0 py-0.5"
              title="PLANTIFY – Phủ Xanh Không Gian"
            >
              <img
                src={logoImg}
                alt="PLANTIFY Logo"
                className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <NavLink to="/" className={navLinkClass}>
                Trang chủ
              </NavLink>
              <NavLink to="/shop" className={navLinkClass}>
                Cửa hàng
              </NavLink>
              <NavLink to="/ar" className={navLinkClass}>
                Trải nghiệm AR
              </NavLink>
              <NavLink to="/plant-finder" className={navLinkClass}>
                Tìm cây phù hợp
              </NavLink>
              <NavLink to="/plant-care" className={navLinkClass}>
                Chăm sóc cây
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                Về chúng tôi
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Liên hệ
              </NavLink>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-full text-text-main hover:bg-sage/70 transition-colors"
                aria-label="Tìm kiếm"
                title="Tìm kiếm cây cảnh"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/account?tab=wishlist"
                className="p-2.5 rounded-full text-text-main hover:bg-sage/70 transition-colors relative"
                aria-label="Sản phẩm yêu thích"
                title="Sản phẩm yêu thích"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2.5 rounded-full text-text-main hover:bg-sage/70 transition-colors relative"
                aria-label="Giỏ hàng"
                title="Giỏ hàng"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <Link
                to="/account"
                className="p-2.5 rounded-full text-text-main hover:bg-sage/70 transition-colors flex items-center gap-2"
                aria-label="Tài khoản"
                title={isAuthenticated ? 'Tài khoản của tôi' : 'Đăng nhập / Đăng ký'}
              >
                {isAuthenticated && user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-primary/20"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full text-text-main hover:bg-sage/70 transition-colors"
                aria-label="Mở menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Quick Search Dropdown */}
          {searchOpen && (
            <div className="pt-3 pb-2 border-t border-gray-100 mt-3 animate-fadeIn">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm cây theo tên, đặc điểm, loại phòng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-24 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                />
                <Search className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-dark transition-colors"
                >
                  Tìm kiếm
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-gray-200 shadow-xl px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto z-50">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-text-main hover:bg-sage rounded-lg"
              >
                Trang chủ
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-text-main hover:bg-sage rounded-lg"
              >
                Tất cả cây cảnh
              </Link>
              <Link
                to="/ar"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-text-main hover:bg-sage rounded-lg"
              >
                Trải nghiệm AR
              </Link>
              <Link
                to="/plant-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-text-main hover:bg-sage rounded-lg"
              >
                Tìm cây phù hợp (Quiz)
              </Link>
              <Link
                to="/plant-care"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-text-main hover:bg-sage rounded-lg"
              >
                Cẩm nang & Chăm sóc cây
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-text-main hover:bg-sage rounded-lg"
              >
                Về chúng tôi
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-text-main hover:bg-sage rounded-lg"
              >
                Liên hệ & Hỗ trợ
              </Link>
            </nav>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 text-text-main text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-primary" /> Giỏ hàng
                </span>
                <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full font-bold">
                  {cartCount}
                </span>
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-text-main text-sm font-medium"
              >
                <User className="w-4 h-4 text-primary" /> {isAuthenticated ? 'Tài khoản của tôi' : 'Đăng nhập / Đăng ký'}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
