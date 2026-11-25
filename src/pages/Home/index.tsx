import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Camera,
  Star,
  ArrowRight,
  Sparkles,
  Shield,
  Headphones,
  ShoppingBag,
  Mail,
  CheckCircle,
  Monitor,
  Wind,
  Flower2,
  Sun,
  Palette,
  Facebook,
  Instagram,
  Twitter,
  QrCode,
  Smartphone,
} from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import { Plant3DViewer } from '../../components/ar/Plant3DViewer';
import { ARQRCodeModal } from '../../components/ar/ARQRCodeModal';
import { getFeaturedProducts } from '../../data/products';
import heroRightImg from '../../assets/heroright.jpg';
import heroLeftImg from '../../assets/heroleft.jpg';

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const [showARQr, setShowARQr] = useState(false);

  return (
    <section className="bg-[#BFDCBA]/40 min-h-[calc(100dvh-72px)] lg:h-[calc(100dvh-72px)] flex flex-col justify-center py-2 sm:py-3 lg:py-4 px-3 sm:px-5 lg:px-6">
      <div className="w-full max-w-[1600px] mx-auto h-full flex-1 flex flex-col">
        {/* Outer Card Container */}
        <div className="relative w-full h-full flex-1 flex flex-col justify-between rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-2xl bg-gradient-to-r from-[#143924] via-[#1E5235] to-[#7EA976] border border-white/20">

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch flex-1 min-h-0">

            {/* Left Column (Text & Capsule CTA) */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 xl:p-14 z-20 flex flex-col justify-center">
              {/* Sub-label */}
              <p className="text-white/80 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3 font-['Be_Vietnam_Pro']">
                Thiên Nhiên Đến Tận Nhà
              </p>

              {/* Main Headline */}
              <h1 className="font-['Be_Vietnam_Pro'] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4 sm:mb-5">
                Mang Thiên Nhiên
                <br />
                Lại Gần Hơn
              </h1>

              {/* Description */}
              <p className="font-['Be_Vietnam_Pro'] text-white/85 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed mb-6 sm:mb-8">
                Biến ngôi nhà của bạn thành ốc đảo bình yên với những chậu cây cảnh được tuyển chọn kỹ lưỡng.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Capsule CTA Button */}
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-[#E9A443] bg-black/15 hover:bg-black/30 text-white font-semibold text-sm transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-95"
                >
                  <span>Khám phá ngay</span>
                  <span className="w-9 h-9 rounded-full bg-[#E9A443] text-[#143924] flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-sm font-bold">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </Link>

                {/* Secondary AR Link */}
                <Link
                  to="/ar"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
                >
                  <Camera className="w-4 h-4 text-[#E9A443]" />
                  <span>Trải nghiệm AR</span>
                </Link>

                {/* Direct QR Modal trigger for mobile AR */}
                <button
                  type="button"
                  onClick={() => setShowARQr(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md border border-white/25 transition-all shadow-sm hover:scale-105 active:scale-95"
                  title="Quét mã QR mở AR trên điện thoại"
                >
                  <QrCode className="w-4 h-4 text-[#E9A443]" />
                  <span>Quét QR mở AR</span>
                </button>
              </div>
            </div>

          {/* Right Column (Hero Plant Image clipped to Curved Arch) */}
          <div className="lg:col-span-6 relative flex items-stretch justify-end h-full min-h-[320px] lg:min-h-0 self-stretch">
            {/* Arch frame with image clipped along the curved border */}
            <div className="relative w-full lg:w-[94%] h-full min-h-[320px] lg:min-h-0 bg-[#9EC796] rounded-t-[28px] lg:rounded-t-none lg:rounded-tl-[140px] xl:rounded-tl-[190px] overflow-hidden shadow-2xl flex items-center justify-center">
              <img
                src={heroRightImg}
                alt="Cây cảnh nội thất cao cấp - Plantify"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="relative z-30 flex flex-col md:flex-row items-stretch mt-auto flex-shrink-0">
          {/* Bottom Left Leaf Tile */}
          <div className="flex items-end justify-center w-48 sm:w-60 lg:w-72 h-20 sm:h-24 lg:h-28 bg-[#9EC796] rounded-tr-[36px] sm:rounded-tr-[48px] overflow-hidden flex-shrink-0 relative shadow-inner">
            <img
              src={heroLeftImg}
              alt="Cây cảnh góc trái tươi mát"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Bottom Dark Quote & Social Bar */}
          <div className="flex-1 bg-[#122E1F] rounded-t-2xl md:rounded-t-none md:rounded-tl-3xl px-6 py-3 sm:px-8 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-['Be_Vietnam_Pro'] text-white/80 text-xs sm:text-sm leading-relaxed max-w-xl text-center sm:text-left">
              Khám phá những chậu cây dễ chăm sóc, được chọn lọc kỹ càng giúp làm bừng sáng không gian sống, nâng cao cảm xúc và tiếp thêm năng lượng tích cực cho mọi góc nhà.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white hover:bg-white/10 flex items-center justify-center transition-colors text-xs"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white hover:bg-white/10 flex items-center justify-center transition-colors text-xs"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white hover:bg-white/10 flex items-center justify-center transition-colors text-xs"
                title="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* AR QR Code Modal for Mobile Phone */}
        <ARQRCodeModal
          isOpen={showARQr}
          onClose={() => setShowARQr(false)}
          urlPath="/ar"
        />
      </div>
    </div>
  </section>
);
};

// ── Shop By Category ──────────────────────────────────────────────────────────
const categories = [
  {
    slug: 'desk-plants',
    name: 'Cây để bàn',
    emoji: '🪴',
    description: 'Xinh xắn, thanh lọc góc làm việc',
    bg: 'bg-[#EAF2E7]',
  },
  {
    slug: 'indoor-plants',
    name: 'Cây trong nhà',
    emoji: '🌿',
    description: 'Mảng xanh mát lành cho tổ ấm',
    bg: 'bg-[#E8F4EA]',
  },
  {
    slug: 'air-purifying',
    name: 'Lọc không khí',
    emoji: '💨',
    description: 'Hút độc tố, nhả oxy trong lành',
    bg: 'bg-[#E8F0F4]',
  },
  {
    slug: 'feng-shui',
    name: 'Cây phong thủy',
    emoji: '☯️',
    description: 'Chiêu tài đón lộc, bình an cát tường',
    bg: 'bg-[#F4EEE8]',
  },
  {
    slug: 'easy-care',
    name: 'Dễ chăm sóc',
    emoji: '⭐',
    description: 'Bền bỉ, thích hợp cho người bận rộn',
    bg: 'bg-[#F4F4E8]',
  },
  {
    slug: 'decorative',
    name: 'Cây dáng lớn',
    emoji: '🎨',
    description: 'Tạo điểm nhấn nội thất sang trọng',
    bg: 'bg-[#F4E8EE]',
  },
];

const ShopByCategory: React.FC = () => (
  <section className="py-20 bg-[#FAF9F4]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="font-['Be_Vietnam_Pro'] text-sm font-semibold tracking-widest uppercase text-[#28643E] mb-3">
          Bộ sưu tập thực vật
        </p>
        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B]">
          Mua theo danh mục
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/shop?category=${cat.slug}`}
            className={`group ${cat.bg} rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:scale-105 hover:shadow-md transition-all duration-300`}
          >
            <span className="text-4xl">{cat.emoji}</span>
            <div>
              <p className="font-['Be_Vietnam_Pro'] font-semibold text-[#26352B] text-sm">
                {cat.name}
              </p>
              <p className="font-['Be_Vietnam_Pro'] text-xs text-[#788278] mt-1 leading-snug">
                {cat.description}
              </p>
            </div>
            <span className="text-[#28643E] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// ── Best Sellers ──────────────────────────────────────────────────────────────
const BestSellers: React.FC = () => {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <p className="font-['Be_Vietnam_Pro'] text-sm font-semibold tracking-widest uppercase text-[#28643E] mb-3">
              Được yêu thích nhất
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B]">
              Sản phẩm bán chạy
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-['Be_Vietnam_Pro'] font-semibold text-[#28643E] hover:text-[#193D2A] transition-colors"
          >
            Xem tất cả cây cảnh <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── AR Highlight ──────────────────────────────────────────────────────────────
const ARHighlight: React.FC = () => (
  <section className="py-20 bg-[#EAF2E7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#28643E]/10 rounded-full px-4 py-2 mb-6">
            <Camera className="w-4 h-4 text-[#28643E]" />
            <span className="font-['Be_Vietnam_Pro'] text-sm font-semibold text-[#28643E]">
              Công nghệ Thực tế ảo AR
            </span>
          </div>

          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B] mb-6 leading-tight">
            Ngắm nhìn trước khi
            <br />
            <span className="text-[#28643E]">mang thiên nhiên về nhà.</span>
          </h2>

          <p className="font-['Be_Vietnam_Pro'] text-[#788278] text-lg mb-8 leading-relaxed">
            Công nghệ AR của Plantify cho phép bạn dùng camera điện thoại đặt chậu cây thật vào không gian phòng. Thử đổi các kiểu dáng chậu, xoay 360 độ và kiểm tra kích thước chuẩn xác – mua sắm cây cảnh chưa bao giờ an tâm và thú vị đến thế!
          </p>

          <ul className="space-y-3 mb-10">
            {[
              'Hướng camera điện thoại vào bất kỳ góc phòng nào',
              'Chọn và ướm thử hơn 200 loài cây sống động',
              'Tùy chỉnh đổi màu sắc chậu & kích cỡ cây ngay tức thì',
              'Lưu lại hình ảnh thiết kế hoặc chia sẻ cùng bạn bè',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#28643E] flex-shrink-0" />
                <span className="font-['Be_Vietnam_Pro'] text-[#26352B]">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/ar"
            className="inline-flex items-center gap-2 bg-[#28643E] hover:bg-[#193D2A] text-white font-['Be_Vietnam_Pro'] font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Camera className="w-5 h-5" />
            Trải nghiệm AR ngay
          </Link>
        </div>

        {/* 3D Interactive Showcase */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-primary/10">
            <Plant3DViewer
              modelUrl="/models/monstera_deliciosa_potted_mid-century_plant.glb"
              posterUrl="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80"
              productName="Trầu Bà Nam Mỹ (Monstera Deliciosa)"
              potColor="#FFFFFF"
              potName="Trắng sứ cao cấp"
              enableAR={true}
              height="440px"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Plant Finder Teaser ───────────────────────────────────────────────────────
const PlantFinderTeaser: React.FC = () => (
  <section className="py-20 bg-[#26352B]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
        <Sparkles className="w-4 h-4 text-[#EAF2E7]" />
        <span className="font-['Be_Vietnam_Pro'] text-sm text-[#EAF2E7]">Trắc nghiệm gợi ý thông minh</span>
      </div>

      <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
        Chưa biết loài cây nào
        <br />
        <span className="text-[#EAF2E7]">phù hợp nhất với bạn?</span>
      </h2>

      <p className="font-['Be_Vietnam_Pro'] text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
        Chỉ cần trả lời 5 câu hỏi ngắn về không gian sống, mức ánh sáng và thời gian chăm sóc của bạn. Hệ thống sẽ phân tích và gợi ý những loài cây tương thích hoàn hảo.
      </p>

      <Link
        to="/plant-finder"
        className="inline-flex items-center gap-2 bg-white text-[#28643E] hover:bg-[#EAF2E7] font-['Be_Vietnam_Pro'] font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
      >
        <Sparkles className="w-5 h-5" />
        Tìm loại cây phù hợp với bạn
      </Link>
    </div>
  </section>
);

// ── Why Choose Plantify ───────────────────────────────────────────────────────
const features = [
  {
    icon: Leaf,
    title: 'Cây khỏe tuyển chọn',
    description:
      'Mỗi cây cảnh đều được các chuyên gia nông nghiệp chọn lọc kỹ lưỡng, thuần dưỡng thích nghi trước khi xuất vườn.',
    color: 'text-[#28643E]',
    bg: 'bg-[#EAF2E7]',
  },
  {
    icon: Monitor,
    title: 'Mô phỏng thực tế AR',
    description:
      'Ướm thử cây trực quan ngay trong phòng với công nghệ WebXR tân tiến, xua tan nỗi lo cây không vừa vặn.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Thanh toán an toàn',
    description:
      'Đa dạng hình thức: nhận hàng kiểm tra mới trả tiền (COD), chuyển khoản VietQR nhanh chóng hoặc ví điện tử.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Headphones,
    title: 'Đồng hành chăm sóc',
    description:
      'Đội ngũ bác sĩ cây cảnh luôn sẵn sàng tư vấn bắt bệnh, hướng dẫn bón phân và chăm sóc cây hoàn toàn miễn phí.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
];

const WhyChoosePlantify: React.FC = () => (
  <section className="py-20 bg-[#FAF9F4]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="font-['Be_Vietnam_Pro'] text-sm font-semibold tracking-widest uppercase text-[#28643E] mb-3">
          Cam kết thương hiệu
        </p>
        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B]">
          Tại sao chọn PLANTIFY?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6`}>
              <f.icon className={`w-7 h-7 ${f.color}`} />
            </div>
            <h3 className="font-['Be_Vietnam_Pro'] font-bold text-[#26352B] text-lg mb-3">
              {f.title}
            </h3>
            <p className="font-['Be_Vietnam_Pro'] text-[#788278] text-sm leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Plant Care Tips ───────────────────────────────────────────────────────────
const blogPosts = [
  {
    id: 1,
    title: 'Cẩm nang toàn diện chăm sóc Trầu Bà Nam Mỹ (Monstera Deliciosa)',
    excerpt:
      'Tất cả những gì bạn cần biết để giữ cho cây Monstera xẻ lá luôn xanh tốt, bóng mượt từ lịch tưới nước đến kỹ thuật bón phân.',
    category: 'Chăm sóc cây',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80',
    readTime: 8,
    slug: 'monstera-deliciosa-care-guide',
  },
  {
    id: 2,
    title: 'Top 7 loại cây cảnh lý tưởng nhất cho căn hộ chung cư nhỏ',
    excerpt:
      'Tối ưu hóa không gian sống chật hẹp với những loài cây nhỏ gọn, chịu bóng râm và có khả năng lọc bụi mịn vượt trội.',
    category: 'Không gian sống',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&q=80',
    readTime: 6,
    slug: 'best-indoor-plants-for-apartments',
  },
  {
    id: 3,
    title: 'Bí quyết tưới nước đúng cách: Không lo úng rễ, thối thân',
    excerpt:
      'Hơn 80% cây cảnh bị chết do tưới quá nhiều nước. Hãy học cách cảm nhận độ ẩm của đất để cây luôn khỏe mạnh.',
    category: 'Kinh nghiệm',
    image: 'https://images.unsplash.com/photo-1585559604959-7d2a1b7b2e0d?w=600&q=80',
    readTime: 5,
    slug: 'how-often-to-water-indoor-plants',
  },
];

const PlantCareTips: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
        <div>
          <p className="font-['Be_Vietnam_Pro'] text-sm font-semibold tracking-widest uppercase text-[#28643E] mb-3">
            Góc xanh chia sẻ
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B]">
            Kinh nghiệm chăm sóc cây
          </h2>
        </div>
        <Link
          to="/plant-care"
          className="inline-flex items-center gap-2 font-['Be_Vietnam_Pro'] font-semibold text-[#28643E] hover:text-[#193D2A] transition-colors"
        >
          Xem tất cả bài viết <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            to={`/plant-care/${post.slug}`}
            className="group bg-[#FAF9F4] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#EAF2E7] text-[#28643E] font-['Be_Vietnam_Pro'] text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="font-['Be_Vietnam_Pro'] text-xs text-[#788278]">
                  {post.readTime} phút đọc
                </span>
              </div>
              <h3 className="font-['Be_Vietnam_Pro'] font-bold text-[#26352B] text-lg mb-2 leading-snug group-hover:text-[#28643E] transition-colors">
                {post.title}
              </h3>
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#788278] line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// ── Customer Reviews ──────────────────────────────────────────────────────────
const reviews = [
  {
    id: 1,
    name: 'Nguyễn Phương Linh',
    location: 'Hà Nội',
    rating: 5,
    text: 'Tính năng thực tế ảo AR đỉnh thật sự! Mình bật camera ướm thử vào góc sofa phòng khách xem vừa vặn không rồi mới mua. Cây giao đến tươi rói, đóng gói cực kỳ an toàn.',
    avatar: 'PL',
    color: 'bg-[#28643E]',
  },
  {
    id: 2,
    name: 'Trần Đức Minh',
    location: 'TP. Hồ Chí Minh',
    rating: 5,
    text: 'Mua chậu Lưỡi Hổ để bàn làm việc. Ba tháng nay hầu như chẳng cần chăm sóc nhiều mà cây vẫn xanh mướt. Giao hàng hỏa tốc trong ngày rất ấn tượng!',
    avatar: 'DM',
    color: 'bg-[#6F956E]',
  },
  {
    id: 3,
    name: 'Vũ Thu Hằng',
    location: 'Đà Nẵng',
    rating: 5,
    text: 'Người mới tập tành trồng cây như mình rất ưng thiệp hướng dẫn chăm sóc đi kèm. Nhắn tin hỏi cách tưới cây lúc nửa đêm mà team hỗ trợ vẫn giải đáp rất tận tâm.',
    avatar: 'TH',
    color: 'bg-[#C46A30]',
  },
  {
    id: 4,
    name: 'Phạm Tuấn Lê',
    location: 'Hải Phòng',
    rating: 5,
    text: 'Làm trắc nghiệm Plant Finder ra cây Kim Tiền rất hợp với góc phòng ngủ ít sáng của mình. Giá cả phải chăng, chậu sứ phủ men cao cấp rất sang trọng.',
    avatar: 'TL',
    color: 'bg-[#C9A84C]',
  },
];

const StarRow: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-4 h-4 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

const CustomerReviews: React.FC = () => (
  <section className="py-20 bg-[#EAF2E7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="font-['Be_Vietnam_Pro'] text-sm font-semibold tracking-widest uppercase text-[#28643E] mb-3">
          Cảm nhận thực tế
        </p>
        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B]">
          Khách hàng nói gì về Plantify
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <StarRow rating={review.rating} />
            <p className="font-['Be_Vietnam_Pro'] text-[#26352B] text-sm leading-relaxed flex-1">
              "{review.text}"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-[#EAF2E7]">
              <div
                className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center text-white font-['Be_Vietnam_Pro'] font-bold text-sm`}
              >
                {review.avatar}
              </div>
              <div>
                <p className="font-['Be_Vietnam_Pro'] font-semibold text-[#26352B] text-sm">
                  {review.name}
                </p>
                <p className="font-['Be_Vietnam_Pro'] text-xs text-[#788278]">{review.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Newsletter ────────────────────────────────────────────────────────────────
const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-[#28643E]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 mb-6">
          <Mail className="w-4 h-4 text-white" />
          <span className="font-['Be_Vietnam_Pro'] text-sm text-white">Bản tin xanh</span>
        </div>

        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-4">
          Cùng sống xanh mỗi ngày
        </h2>
        <p className="font-['Be_Vietnam_Pro'] text-white/80 text-lg mb-10">
          Nhận cẩm nang chăm sóc cây định kỳ, thông báo cây cảnh mới về và ưu đãi độc quyền dành riêng cho bạn.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-8 py-4">
            <CheckCircle className="w-6 h-6 text-white" />
            <span className="font-['Be_Vietnam_Pro'] font-semibold text-white text-lg">
              Chào mừng bạn đã gia nhập cộng đồng yêu cây Plantify 🌿
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email của bạn..."
              className="flex-1 font-['Be_Vietnam_Pro'] px-6 py-4 rounded-full border-0 outline-none text-[#26352B] placeholder-[#788278] focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-[#193D2A] hover:bg-[#122A1E] text-white font-['Be_Vietnam_Pro'] font-semibold px-8 py-4 rounded-full transition-all duration-300 whitespace-nowrap"
            >
              Đăng ký
            </button>
          </form>
        )}

        <p className="font-['Be_Vietnam_Pro'] text-xs text-white/50 mt-4">
          Cam kết không gửi thư rác. Bạn có thể hủy đăng ký bất cứ lúc nào.
        </p>
      </div>
    </section>
  );
};

// ── Home Page ─────────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <BestSellers />
      <ARHighlight />
      <PlantFinderTeaser />
      <PlantCareTips />
      <CustomerReviews />
      <Newsletter />
    </main>
  );
};

export default Home;
