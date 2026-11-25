import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import {
  Leaf, Zap, Shield, Users, Camera, Recycle,
  ArrowRight, TreePine, Heart, Star
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const coreValues = [
  {
    icon: <Zap size={28} />,
    title: 'Đổi mới công nghệ',
    desc: 'Chúng tôi tiên phong ứng dụng công nghệ thực tế tăng cường (AR) và 3D để thay đổi cách bạn chọn mua cây cảnh — giúp bạn an tâm thấy trước không gian sống xanh.',
  },
  {
    icon: <Recycle size={28} />,
    title: 'Bền vững & Sinh thái',
    desc: 'Từ bao bì giấy phân hủy sinh học đến nguồn cây nuôi trồng hữu cơ có trách nhiệm, mọi quyết định của chúng tôi đều hướng đến việc bảo vệ Trái Đất.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Chất lượng hàng đầu',
    desc: 'Mỗi mầm cây đều được tuyển chọn kỹ lưỡng, chăm sóc bởi chuyên gia nông học và kiểm tra chất lượng nghiêm ngặt trước khi xuất vườn.',
  },
  {
    icon: <Users size={28} />,
    title: 'Cộng đồng gắn kết',
    desc: 'Chúng tôi đồng hành và cùng bạn lớn lên. Cộng đồng yêu cây cảnh Plantify luôn sẻ chia kinh nghiệm, bí quyết chăm sóc và lan tỏa tình yêu thiên nhiên.',
  },
];

const teamMembers = [
  {
    name: 'Linh Nguyễn',
    role: 'Đồng sáng lập & Giám đốc Điều hành (CEO)',
    bio: 'Nhà thực vật học với hơn 10 năm kinh nghiệm trong ngành làm vườn đô thị và trang trí không gian xanh.',
    emoji: '🌿',
  },
  {
    name: 'Minh Trần',
    role: 'Giám đốc Công nghệ (Head of Technology)',
    bio: 'Kỹ sư AR đam mê kết hợp thế giới thực và kỹ thuật số để mang đến trải nghiệm mua sắm đột phá cho người tiêu dùng.',
    emoji: '💻',
  },
  {
    name: 'Hoa Phạm',
    role: 'Trưởng ban Tuyển chọn Thực vật',
    bio: 'Chuyên gia nghiên cứu thực vật học, lặn lội khắp các vườn ươm Việt Nam để mang về những giống cây khỏe đẹp và độc đáo nhất.',
    emoji: '🌸',
  },
  {
    name: 'Đức Lê',
    role: 'Trưởng nhóm Trải nghiệm Khách hàng',
    bio: 'Luôn tận tâm đồng hành để mỗi khách hàng Plantify đều nhận được sự chăm sóc tận tình từ lúc chọn cây đến khi mở hộp.',
    emoji: '😊',
  },
];

const sustainabilityPoints = [
  { icon: <TreePine size={20} />, text: 'Mỗi 10 đơn hàng thành công, chúng tôi đóng góp trồng 1 cây xanh trong các dự án phục hồi rừng tại Việt Nam.' },
  { icon: <Recycle size={20} />, text: '100% vật liệu đóng gói sử dụng giấy bìa tái chế và túi hữu cơ tự phân hủy sinh học.' },
  { icon: <Leaf size={20} />, text: 'Toàn bộ cây cảnh được nuôi dưỡng hữu cơ, hoàn toàn không dùng thuốc trừ sâu hóa học độc hại.' },
  { icon: <Heart size={20} />, text: 'Hợp tác trực tiếp với các nhà vườn địa phương nhằm nâng cao thu nhập cho nông dân Việt Nam.' },
];

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <PageHeader
      badge="Câu chuyện thương hiệu"
      badgeIcon={<Leaf className="w-3 h-3 text-emerald-300" />}
      title="Về Chúng Tôi – PLANTIFY"
      description="PLANTIFY ra đời từ ước mơ: cây xanh làm cho cuộc sống hạnh phúc hơn — và công nghệ AR giúp bạn an tâm thấy trước không gian sống xanh lý tưởng."
      breadcrumbs={[{ label: 'Về chúng tôi' }]}
    />
  );
}

function BrandStory() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Hành trình khởi đầu của Plantify
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Năm 2021, nhà đồng sáng lập Linh Nguyễn đứng phân vân trong một tiệm cây tại Hà Nội, trên tay là chậu Trầu Bà Nam Mỹ tuyệt đẹp — và tự hỏi: liệu chậu cây này có vừa với góc phòng khách chung cư của mình không? Cô mở điện thoại, cố tưởng tượng nhưng không thể hình dung nổi kích thước và sự hài hòa. Cuối cùng, cô đành đặt chậu cây xuống và ra về tay không.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Sự băn khoăn ấy đã châm ngòi cho một ý tưởng táo bạo: Sẽ ra sao nếu khách hàng có thể nhìn thấy chính xác chậu cây sẽ trông như thế nào ngay trong không gian nhà mình trước khi bấm mua? Linh bắt tay cùng kỹ sư AR Minh Trần, và PLANTIFY ra đời — nền tảng thương mại điện tử cây cảnh ứng dụng AR tiên phong tại Việt Nam. Ngày nay, chúng tôi đồng hành cùng hàng vạn người yêu cây khắp mọi miền, mang lại không chỉ những mầm xanh khỏe khoắn mà cả sự an tâm và hứng khởi trong từng đơn hàng.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
              alt="Cây cảnh trong không gian nội thất sang trọng"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 w-32 h-28 bg-green-100 rounded-2xl flex items-center justify-center shadow-xl">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-800">3+</p>
              <p className="text-xs text-green-700 font-semibold mt-0.5">Năm phát triển</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="bg-green-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sứ mệnh & Tầm nhìn
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
              <Star size={24} className="text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sứ mệnh của chúng tôi</h3>
            <p className="text-gray-600 leading-relaxed">
              Biến phong cách sống xanh trở nên dễ dàng và đầy cảm hứng thông qua việc kết hợp những giống cây chất lượng cao với công nghệ AR tiên tiến — giúp mọi người tự tin đưa thiên nhiên vào tổ ấm và nơi làm việc.
            </p>
          </div>
          <div className="bg-green-800 rounded-3xl p-8 shadow-sm text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
              <Leaf size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Tầm nhìn dài hạn</h3>
            <p className="text-green-100 leading-relaxed">
              Một tương lai nơi mỗi ngôi nhà đều có ít nhất một mầm xanh tràn đầy sức sống — và mỗi trải nghiệm mua cây đều ngập tràn niềm vui cùng sự an tâm tuyệt đối. Plantify hướng đến trở thành thương hiệu sống xanh được tin cậy hàng đầu tại Việt Nam và Đông Nam Á.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Giá trị cốt lõi
        </h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Những giá trị này không chỉ là khẩu hiệu — chúng định hướng cho từng giống cây chúng tôi tuyển chọn, từng dòng code chúng tôi xây dựng và từng khách hàng chúng tôi phục vụ.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreValues.map(v => (
          <div key={v.title} className="bg-white border border-gray-100 rounded-3xl p-7 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5 text-green-700">
              {v.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{v.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ARSection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80"
                alt="Trải nghiệm AR ướm thử cây cảnh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              CÔNG NGHỆ AR
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-2 mb-5 text-green-400 text-sm font-medium tracking-widest uppercase">
              <Camera size={16} />
              Thực tế tăng cường (AR)
            </div>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Thấy trước trong phòng, an tâm chọn mua
            </h2>
            <div className="space-y-5 text-gray-300">
              <p className="leading-relaxed">
                Trải nghiệm AR trực quan trên trình duyệt của Plantify cho phép bạn ướm thử bất kỳ chậu cây nào vào không gian thực thông qua camera điện thoại hoặc máy tính bảng. Tự do xoay 360°, điều chỉnh kích thước thật 1:1, di chuyển đến các góc phòng — an tâm tuyệt đối trước khi quyết định.
              </p>
              <div className="space-y-3">
                {[
                  'Hướng camera vào sàn nhà hoặc bàn làm việc phẳng',
                  'Chọn loại cây và mẫu chậu bạn ưng ý',
                  'Tự do xoay và cân chỉnh kích thước theo tỷ lệ thật 1:1',
                  'Lưu lại ảnh chụp thiết kế hoặc thêm ngay vào giỏ hàng',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link to="/ar"
              className="mt-8 inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Trải nghiệm AR ngay <Camera size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Đội ngũ tâm huyết
        </h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Những con người yêu cây xanh, đam mê công nghệ và luôn khát khao tạo nên những trải nghiệm mua sắm tuyệt vời nhất.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map(m => (
          <div key={m.name} className="text-center bg-white border border-gray-100 rounded-3xl p-7 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-5xl mx-auto mb-5">
              {m.emoji}
            </div>
            <h3 className="font-bold text-gray-900">{m.name}</h3>
            <p className="text-green-700 text-sm font-medium mt-0.5">{m.role}</p>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">{m.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sustainability() {
  return (
    <section className="bg-[#FAF9F4] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-5 text-green-700 text-sm font-medium tracking-widest uppercase">
              <Recycle size={16} />
              Phát triển bền vững
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Cam kết vì một hành tinh xanh
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Phát triển kinh doanh và bảo vệ thiên nhiên không bao giờ là hai mặt đối lập — đó chính là kim chỉ nam của chúng tôi. Mỗi đơn hàng tại Plantify là một hành động chung tay gìn giữ màu xanh cho Trái Đất.
            </p>
            <div className="space-y-4">
              {sustainabilityPoints.map((p, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 text-green-700">
                    {p.icon}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pt-1.5">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1542601906897-ecd9ece1d47b?w=800&q=80"
              alt="Cam kết phát triển bền vững cùng thiên nhiên"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-green-800 py-20 text-white text-center">
      <div className="max-w-2xl mx-auto px-6">
        <Leaf size={40} className="mx-auto mb-6 text-green-300" />
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Sẵn sàng mang thiên nhiên vào tổ ấm?
        </h2>
        <p className="text-green-200 mb-8 leading-relaxed">
          Hàng ngàn gia đình và văn phòng đã thay đổi không gian sống cùng Plantify. Hãy bắt đầu hành trình xanh của riêng bạn ngay hôm nay.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/shop"
            className="inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-colors">
            Khám phá cửa hàng <ArrowRight size={18} />
          </Link>
          <Link to="/ar"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
            Trải nghiệm AR ngay <Camera size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Hero />
      <BrandStory />
      <MissionVision />
      <CoreValues />
      <ARSection />
      <Team />
      <Sustainability />
      <CTA />
    </div>
  );
}
