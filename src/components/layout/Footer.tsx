import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-primary-dark text-white/90 pt-12 pb-8 border-t border-primary/30">
      {/* Main footer contents */}
      <div className="container-custom pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group" title="PLANTIFY">
              <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm transition-transform group-hover:scale-105">
                <img
                  src={logoImg}
                  alt="PLANTIFY Logo"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-emerald-300 font-semibold tracking-wider uppercase">
              Phủ Xanh Không Gian, Sống Trọn Đam Mê.
            </p>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              PLANTIFY kết hợp tình yêu thiên nhiên với công nghệ thực tế ảo WebXR hiện đại.
              Giúp bạn dễ dàng ngắm nhìn cây cảnh trong chính căn phòng của mình trước khi đặt mua.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-sm font-semibold text-white mb-2">Đăng ký nhận mã giảm 10% đơn hàng đầu tiên</h5>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-300 text-sm py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cảm ơn bạn! Mã giảm giá 10% của bạn là <strong>WELCOME15</strong></span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Nhập email của bạn..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Đăng ký</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Danh mục cây cảnh</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link to="/shop?category=desk-plants" className="hover:text-white transition-colors">
                  Cây để bàn làm việc
                </Link>
              </li>
              <li>
                <Link to="/shop?category=indoor-plants" className="hover:text-white transition-colors">
                  Cây trồng trong nhà
                </Link>
              </li>
              <li>
                <Link to="/shop?category=air-purifying" className="hover:text-white transition-colors">
                  Cây lọc không khí
                </Link>
              </li>
              <li>
                <Link to="/shop?category=feng-shui" className="hover:text-white transition-colors">
                  Cây phong thủy tài lộc
                </Link>
              </li>
              <li>
                <Link to="/shop?category=easy-care" className="hover:text-white transition-colors">
                  Cây dễ chăm sóc
                </Link>
              </li>
              <li>
                <Link to="/shop?category=decorative" className="hover:text-white transition-colors">
                  Cây cảnh dáng lớn ấn tượng
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link to="/ar" className="hover:text-emerald-300 text-emerald-400 font-medium transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Trải nghiệm AR
                </Link>
              </li>
              <li>
                <Link to="/plant-finder" className="hover:text-white transition-colors">
                  Trắc nghiệm tìm cây
                </Link>
              </li>
              <li>
                <Link to="/plant-care" className="hover:text-white transition-colors">
                  Cẩm nang & Kinh nghiệm
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Tài khoản của tôi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Câu hỏi thường gặp & Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>45 Tràng Tiền, Hoàn Kiếm, Hà Nội, Việt Nam</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+84 24 3828 8899</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>care@plantify.vn</span>
              </li>
            </ul>

            <div className="mt-5">
              <h5 className="text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                Theo dõi Plantify
              </h5>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label="Youtube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-custom pt-8 border-t border-white/10 text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Công ty Cổ phần PLANTIFY Việt Nam. Bản quyền đã được bảo hộ.</p>
        <div className="flex items-center gap-6">
          <Link to="/contact" className="hover:text-white transition-colors">
            Chính sách bảo mật
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Điều khoản dịch vụ
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Chính sách vận chuyển & Đổi trả
          </Link>
        </div>
      </div>
    </footer>
  );
}
