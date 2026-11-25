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
  Mail,
  CheckCircle,
  CheckCircle2,
  Monitor,
  Facebook,
  Instagram,
  Twitter,
  QrCode,
  ChevronDown,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Clock,
  Sparkle,
} from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import { Plant3DViewer } from '../../components/ar/Plant3DViewer';
import { ARQRCodeModal } from '../../components/ar/ARQRCodeModal';
import { products, getFeaturedProducts } from '../../data/products';
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
              {/* Main Headline (Always 2 Lines) */}
              <h1 className="font-['Be_Vietnam_Pro'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.12] mb-4 sm:mb-5">
                <span className="block whitespace-nowrap">Mang Thiên Nhiên</span>
                <span className="block whitespace-nowrap">Lại Gần Hơn</span>
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
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-medium backdrop-blur-md border border-white/25 transition-all shadow-sm hover:scale-[1.02] active:scale-95"
                >
                  <Camera className="w-4 h-4 text-[#E9A443]" />
                  <span>Trải nghiệm AR</span>
                </Link>

                {/* Direct QR Modal trigger for mobile AR */}
                <button
                  type="button"
                  onClick={() => setShowARQr(true)}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-medium backdrop-blur-md border border-white/25 transition-all shadow-sm hover:scale-[1.02] active:scale-95"
                  title="Quét mã QR mở AR trên điện thoại"
                >
                  <QrCode className="w-4 h-4 text-[#E9A443]" />
                  <span>Quét QR mở AR</span>
                </button>
              </div>
            </div>

            {/* Right Column (Hero Plant Image clipped to Curved Arch) */}
            <div className="lg:col-span-6 relative flex items-stretch justify-end h-full min-h-[320px] lg:min-h-0 self-stretch">
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



// ── C. Best Sellers & Product Showcase with 4-Tab Filter ───────────────────────
type FilterTab = 'all' | 'low-light' | 'desk' | 'pet';

const filterTabs: { id: FilterTab; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất cả bán chạy', icon: '🔥' },
  { id: 'low-light', label: 'Ít sáng / Phòng ngủ', icon: '🌙' },
  { id: 'desk', label: 'Để bàn nhỏ gọn', icon: '🪴' },
  { id: 'pet', label: 'An toàn thú cưng', icon: '🐾' },
];

const BestSellers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Filter products based on selected tab
  const getFilteredProducts = () => {
    let list = [...products];

    switch (activeTab) {
      case 'low-light':
        list = list.filter(
          (p) =>
            p.lightRequirement === 'low' ||
            p.placement.includes('bedroom') ||
            p.tags.some((t) => t.toLowerCase().includes('ít sáng') || t.toLowerCase().includes('bóng râm'))
        );
        break;
      case 'desk':
        list = list.filter(
          (p) =>
            p.category === 'desk-plants' ||
            p.size === 'small' ||
            p.placement.includes('desk') ||
            p.placement.includes('office')
        );
        break;
      case 'pet':
        list = list.filter(
          (p) =>
            p.tags.some((t) => t.toLowerCase().includes('thú cưng') || t.toLowerCase().includes('an toàn')) ||
            p.slug === 'spider-plant' ||
            p.slug === 'peace-lily' ||
            p.slug === 'golden-pothos'
        );
        break;
      case 'all':
      default:
        list = list.filter((p) => p.badge === 'bestseller' || p.rating >= 4.8);
        break;
    }

    // Ưu tiên hiển thị cây có mô hình 3D thật (hasReal3DModel) lên đầu
    list.sort((a, b) => {
      const a3D = a.hasReal3DModel ? 1 : 0;
      const b3D = b.hasReal3DModel ? 1 : 0;
      if (b3D !== a3D) return b3D - a3D;
      return b.rating - a.rating;
    });

    return list.slice(0, 4);
  };

  const displayedProducts = getFilteredProducts();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <p className="font-['Be_Vietnam_Pro'] text-sm font-semibold tracking-widest uppercase text-[#28643E] mb-3">
              Được yêu thích nhất
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B]">
              Sản phẩm bán chạy
            </h2>
            <p className="font-['Be_Vietnam_Pro'] text-sm text-[#788278] mt-2">
              Ưu tiên các mẫu có sẵn mô hình 3D AR thực tế chuẩn kích thước căn phòng của bạn.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-['Be_Vietnam_Pro'] font-semibold text-[#28643E] hover:text-[#193D2A] transition-colors"
          >
            Xem tất cả cây cảnh <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Tab Quick Horizontal Filter */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-['Be_Vietnam_Pro'] text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#28643E] text-white border-[#28643E] shadow-sm scale-[1.02]'
                    : 'bg-[#FAF9F4] text-[#26352B] border-transparent hover:border-[#28643E]/30 hover:bg-[#EAF2E7]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
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
              posterUrl="https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&q=80"
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
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&q=80',
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

// ── D. Social Proof (Trust Summary, AR Before/After & 4 Real Testimonials) ─────
const customerTestimonials = [
  {
    id: 1,
    name: 'Nguyễn Phương Linh',
    location: 'Căn hộ Vinhomes Smart City, Hà Nội',
    productName: 'Trầu Bà Nam Mỹ (Monstera)',
    rating: 5,
    text: 'Phòng khách nhà mình hơi hẹp nên cứ sợ mua Monstera tán to quá bị vướng lối đi. Mở AR đặt thử vào cạnh sofa thấy vừa khít mới dám chốt. Cây giao tới chiều cao và độ xum xuê gần như y hệt bản 3D luôn, đóng gói rất kỹ.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
    roomPhoto: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&q=80',
  },
  {
    id: 2,
    name: 'Trần Đức Minh',
    location: 'Quận 3, TP.HCM',
    productName: 'Cây Lưỡi Hổ (Chậu Đen nhám)',
    rating: 5,
    text: 'Mình làm IT hay quên tưới cây lắm. Chọn Lưỡi Hổ theo gợi ý Plant Finder, đặt bàn làm việc trong phòng máy lạnh gần 4 tháng rồi, 2 tuần tưới đúng 1 lần mà lá vẫn cứng cáp xanh mướt. Giao nội thành trong ngày rất nhanh.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    roomPhoto: 'https://images.unsplash.com/photo-1599598425947-5202edd564c5?w=600&q=80',
  },
  {
    id: 3,
    name: 'Vũ Thu Hằng',
    location: 'Hải Châu, Đà Nẵng',
    productName: 'Cây Lan Ý & Set Sen Đá',
    rating: 5,
    text: 'Lần đầu mua cây online nên mình lo nhất khoản ship xa bị dập lá. Nhận thùng carton thấy bọc nẹp bầu đất và giữ ẩm rất cẩn thận, lá còn tươi nguyên. Có hôm lá hơi rũ nhắn hỏi fanpage, các bạn chỉ ngay cách tưới ngập gốc là tươi lại.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80',
    roomPhoto: 'https://images.unsplash.com/photo-1593482892290-f54927ae1eb6?w=600&q=80',
  },
  {
    id: 4,
    name: 'Phạm Tuấn Lê',
    location: 'Lê Chân, Hải Phòng',
    productName: 'Cây Kim Tiền (Chậu Trắng sứ)',
    rating: 5,
    text: 'Phòng ngủ hướng Bắc ít nắng trực tiếp nhưng Kim Tiền vẫn ra chồi non đều. Mình thích nhất chậu sứ phủ men nhìn đặt lên kệ gỗ rất sang, không bị cảm giác chậu nhựa rẻ tiền.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
    roomPhoto: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
  },
];

const CustomerReviews: React.FC = () => (
  <section className="py-20 bg-[#EAF2E7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-['Be_Vietnam_Pro'] text-sm font-semibold tracking-widest uppercase text-[#28643E] mb-3">
          Cảm nhận thực tế
        </p>
        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B]">
          Khách hàng nói gì về Plantify
        </h2>
      </div>

      {/* Trust Summary Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm border border-[#28643E]/20 rounded-full px-6 py-3 max-w-3xl mx-auto mb-12 shadow-sm text-center">
        <div className="flex items-center gap-1.5 text-amber-500 font-bold text-base">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[#26352B] font-['Be_Vietnam_Pro'] ml-1">4.8 / 5.0</span>
        </div>
        <span className="text-gray-300 hidden sm:inline">•</span>
        <span className="font-['Be_Vietnam_Pro'] text-sm text-[#26352B]">
          dựa trên <strong className="text-[#28643E] font-bold">1.200+ khách hàng</strong> căn hộ & văn phòng tại Hà Nội, TP.HCM, Đà Nẵng
        </span>
      </div>

      {/* Before / After: AR vs Actual Delivery Block */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-[#28643E]/10 mb-14">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#28643E]/10 rounded-full px-4 py-1.5 mb-3">
            <Smartphone className="w-4 h-4 text-[#28643E]" />
            <span className="font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#28643E]">
              Bằng chứng xóa tan nghi ngại
            </span>
          </div>
          <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#26352B] mb-2">
            Ướm thử AR vs Cây thật giao đến nhà
          </h3>
          <p className="font-['Be_Vietnam_Pro'] text-sm text-[#788278]">
            Kích thước mô phỏng 1:1 chuẩn xác từng centimet. Bạn nhìn thấy thế nào qua camera, cây nhận về vừa vặn đúng như thế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left: AR Screen Mockup */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-[#28643E]/30 shadow-md group aspect-[4/3] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80"
              alt="Mô phỏng AR trên điện thoại"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            />
            {/* AR UI Overlay Simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="bg-[#28643E] text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                  <Camera className="w-3 h-3" /> Chế độ WebXR AR 1:1
                </span>
                <span className="bg-black/60 backdrop-blur-sm text-white/90 text-[11px] px-2.5 py-1 rounded-full">
                  Kích thước: 105 cm
                </span>
              </div>
              <div className="text-center">
                <div className="inline-block w-20 h-20 border-2 border-dashed border-[#E9A443] rounded-full animate-pulse opacity-60" />
              </div>
              <div className="bg-black/70 backdrop-blur-md rounded-xl p-2.5 text-white text-xs flex items-center justify-between">
                <span className="font-medium text-white/90">Trầu Bà Nam Mỹ xẻ lá (Góc Sofa)</span>
                <span className="text-[#E9A443] font-bold">Chuẩn 100% tỷ lệ</span>
              </div>
            </div>
          </div>

          {/* Right: Actual Delivered Plant in Room */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-500/40 shadow-md group aspect-[4/3] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80"
              alt="Cây thật giao đến nhà khách hàng"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none p-4 flex flex-col justify-between">
              <span className="self-start bg-emerald-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ảnh thật bàn giao tại nhà
              </span>
              <div className="bg-black/70 backdrop-blur-md rounded-xl p-2.5 text-white text-xs">
                <p className="font-semibold text-white">Chị Phương Linh — Vinhomes Smart City</p>
                <p className="text-white/80 text-[11px] mt-0.5">"Đúng y xì góc ướm thử AR, đóng gói nẹp gỗ rất cẩn thận."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Testimonials Grid with User-Generated Space Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between border border-gray-100"
          >
            <div>
              {/* Plant Room Photo Badge */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-4 bg-gray-100">
                <img
                  src={t.roomPhoto}
                  alt={t.productName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 bg-[#26352B]/85 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-md shadow">
                  Đã mua • {t.productName}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex gap-0.5 mb-2.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#26352B] leading-relaxed mb-4 italic">
                "{t.text}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-9 h-9 rounded-full object-cover border border-primary/20"
              />
              <div className="min-w-0">
                <p className="font-['Be_Vietnam_Pro'] font-bold text-xs text-[#26352B] truncate">
                  {t.name}
                </p>
                <p className="font-['Be_Vietnam_Pro'] text-[11px] text-[#788278] truncate">
                  {t.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── E. FAQ / Objection Handling (Accordion) ───────────────────────────────────
interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: 'Đặt mua cây online ship đi tỉnh có sợ bị gãy lá, đổ đất không?',
    answer:
      'Hoàn toàn không. Plantify đóng gói bằng thùng carton chịu lực 5 lớp, cố định chặt bầu đất bằng đai nẹp chống xô lệch và lót giấy giữ ẩm cho tán lá. 100% đơn hàng đều được kiểm tra cây trước khi thanh toán (COD).',
  },
  {
    question: 'Nếu mang về nhà ít ngày mà cây bị héo hoặc chết thì sao?',
    answer:
      'Mọi chậu cây đều đi kèm Bảo hành sống khỏe 30 ngày. Nếu cây có dấu hiệu yếu rễ, vàng úa hoặc hư hại do vận chuyển trong 30 ngày đầu, bạn chỉ cần chụp ảnh gửi qua Zalo/Email — Plantify sẽ gửi đổi cây mới miễn phí hoặc hoàn tiền 100%.',
  },
  {
    question: 'Phòng chung cư thiếu ánh sáng tự nhiên có trồng được không?',
    answer:
      'Rất nhiều loài tại Plantify như Lưỡi Hổ, Kim Tiền, Lan Ý, Trầu Bà Vàng sống khỏe dưới ánh đèn văn phòng hoặc ánh sáng tán xạ yếu. Nếu chưa chắc chắn, hãy làm bài test Tìm cây phù hợp mất 30 giây để hệ thống lọc sẵn các loài sống tốt ở góc tối.',
  },
  {
    question: 'Tính năng ướm cây AR có cần cài thêm ứng dụng không?',
    answer:
      'Không cần tải app. Chỉ cần mở trang trên trình duyệt Safari (iPhone) hoặc Chrome (Android), bấm "Thử AR" và hướng camera xuống sàn nhà. Kích thước trên màn hình giữ đúng tỷ lệ 1:1 với cây thật bạn sẽ nhận.',
  },
  {
    question: 'Tôi bận rộn và chưa từng trồng cây bao giờ thì chọn loại nào?',
    answer:
      'Bạn nên bắt đầu với nhóm "Dễ chăm sóc" (Lưỡi Hổ, Kim Tiền, Trầu Bà). Các loài này chỉ cần tưới 1–2 tuần/lần. Ngoài ra, Plantify có đội ngũ Bác sĩ Cây Cảnh hỗ trợ chẩn đoán vàng lá, sâu bệnh miễn phí trọn đời qua tin nhắn.',
  },
  {
    question: 'Phí giao hàng và thời gian nhận cây mất bao lâu?',
    answer:
      'Nội thành Hà Nội, TP.HCM, Đà Nẵng giao hỏa tốc trong 24–48 giờ. Các tỉnh thành khác nhận hàng sau 2–4 ngày làm việc. Miễn phí vận chuyển tiêu chuẩn cho mọi đơn hàng từ 500.000 ₫.',
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-['Be_Vietnam_Pro'] text-sm font-semibold tracking-widest uppercase text-[#28643E] mb-3">
            Giải đáp thắc mắc
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#26352B]">
            Câu hỏi thường gặp
          </h2>
          <p className="font-['Be_Vietnam_Pro'] text-sm sm:text-base text-[#788278] mt-3">
            Mọi điều bạn cần biết về dịch vụ đóng gói, bảo hành cây sống khỏe và công nghệ AR của Plantify.
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'border-[#28643E]/40 bg-[#FAF9F4] shadow-sm'
                    : 'border-gray-200/80 bg-white hover:border-[#28643E]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-['Be_Vietnam_Pro'] font-bold text-sm sm:text-base text-[#26352B] focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#EAF2E7] text-[#28643E] text-xs font-semibold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#28643E] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 font-['Be_Vietnam_Pro'] text-sm text-[#506050] leading-relaxed border-t border-[#28643E]/10 mt-1 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── F. Final CTA / Closing Section ────────────────────────────────────────────
const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-[#28643E] relative overflow-hidden">
      {/* Decorative leaf watermarks */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Quick Decision Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-['Be_Vietnam_Pro'] text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
          >
            <span>Chọn cây ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/plant-finder"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E9A443] hover:bg-[#d69335] text-[#143924] font-['Be_Vietnam_Pro'] text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Làm bài test chọn cây 30s</span>
          </Link>
        </div>

        {/* Headline */}
        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Sẵn sàng làm mới góc phòng của bạn hôm nay?
        </h2>

        {/* Subheadline */}
        <p className="font-['Be_Vietnam_Pro'] text-white/90 text-sm sm:text-base lg:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Đăng ký nhận ngay mã giảm <strong className="text-[#E9A443] underline font-bold">15%</strong> cho đơn hàng đầu tiên (<span className="font-mono font-bold bg-white/15 px-2 py-0.5 rounded">WELCOME15</span>) kèm cẩm nang <em>7 lỗi tưới nước khiến cây chết rễ</em>.
        </p>

        {submitted ? (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-lg mx-auto border border-white/20 shadow-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E9A443] text-[#143924] mb-4">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-['Be_Vietnam_Pro'] font-bold text-white text-xl mb-2">
              Mã giảm giá 15% của bạn đã sẵn sàng!
            </h3>
            <p className="font-['Be_Vietnam_Pro'] text-white/80 text-sm mb-4">
              Cẩm nang chăm sóc cây đã được gửi tới <strong>{email}</strong>.
            </p>

            {/* Voucher Box */}
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 mb-4 shadow">
              <span className="font-mono font-bold text-lg text-[#28643E] tracking-wider">
                WELCOME15
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#28643E] hover:text-[#143924] bg-[#EAF2E7] px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép mã'}</span>
              </button>
            </div>

            {/* Direct CTA to Shop */}
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#E9A443] hover:bg-[#d69335] text-[#143924] font-['Be_Vietnam_Pro'] font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Áp dụng & Chọn cây ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email của bạn..."
              className="flex-1 font-['Be_Vietnam_Pro'] px-6 py-4 rounded-full border-0 outline-none text-[#26352B] placeholder-[#788278] focus:ring-2 focus:ring-[#E9A443]"
            />
            <button
              type="submit"
              className="bg-[#E9A443] hover:bg-[#d69335] text-[#143924] font-['Be_Vietnam_Pro'] font-bold px-8 py-4 rounded-full transition-all duration-300 whitespace-nowrap shadow-md hover:scale-105 active:scale-95"
            >
              Nhận mã giảm 15%
            </button>
          </form>
        )}

        <p className="font-['Be_Vietnam_Pro'] text-xs text-white/60 mt-5">
          Cam kết bảo mật 100%. Không spam. Bạn có thể hủy nhận tin bất kỳ lúc nào.
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
      <WhyChoosePlantify />
      <PlantCareTips />
      <CustomerReviews />
      <FAQSection />
      <Newsletter />
    </main>
  );
};

export default Home;
