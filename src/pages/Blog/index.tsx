import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Calendar, ChevronRight, Copy, Facebook, Twitter, Leaf, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import { useNotification } from '../../context/NotificationContext';
import PageHeader from '../../components/common/PageHeader';

const CATEGORY_LABELS: Record<string, string> = {
  'plant-care': 'Chăm sóc cây',
  'beginner-guide': 'Người mới bắt đầu',
  'interior-design': 'Trang trí nội thất',
  'plant-health': 'Sức khỏe cây cảnh',
  'lifestyle': 'Lối sống xanh',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function RelatedCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link
      to={`/plant-care/${post.slug}`}
      className="group flex gap-4 p-4 bg-white rounded-xl border border-[#E8DFCF] hover:shadow-md transition-all"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
      />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold text-[#6F956E] uppercase tracking-wider">
          {CATEGORY_LABELS[post.category] ?? post.category}
        </span>
        <h4 className="font-semibold text-[#26352B] text-sm leading-snug mt-1 group-hover:text-[#28643E] transition-colors line-clamp-2">
          {post.title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-[#788278]">
          <Clock size={11} />
          {post.readTime} phút đọc
        </div>
      </div>
    </Link>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { success } = useNotification();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  const related = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF9F4] flex items-center justify-center">
        <div className="text-center px-4">
          <Leaf size={48} className="mx-auto text-[#788278] opacity-30 mb-4" />
          <h1 className="text-2xl font-bold text-[#26352B] mb-2">Không tìm thấy bài viết</h1>
          <p className="text-[#788278] mb-6">Bài viết này không tồn tại hoặc đã được gỡ xuống.</p>
          <Link to="/plant-care" className="btn-primary">
            Quay lại cẩm nang
          </Link>
        </div>
      </div>
    );
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    success('Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
  }

  return (
    <div className="min-h-screen bg-[#FAF9F4]">
      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: 'Cẩm nang', href: '/plant-care' },
          { label: CATEGORY_LABELS[post.category] ?? post.category }
        ]}
      />

      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#788278] mb-6 flex-wrap">
              <Link to="/" className="hover:text-[#28643E] transition-colors">Trang chủ</Link>
              <ChevronRight size={14} />
              <Link to="/plant-care" className="hover:text-[#28643E] transition-colors">Cẩm nang cây cảnh</Link>
              <ChevronRight size={14} />
              <span className="text-[#28643E] font-medium">{CATEGORY_LABELS[post.category]}</span>
            </nav>

            {/* Back button */}
            <Link
              to="/plant-care"
              className="inline-flex items-center gap-2 text-sm text-[#788278] hover:text-[#28643E] transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              Quay lại tất cả bài viết
            </Link>

            {/* Category + Title */}
            <div>
              <span className="inline-block bg-[#EAF2E7] text-[#28643E] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#26352B] leading-tight mb-5">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-5 text-sm text-[#788278] mb-8 pb-8 border-b border-[#E8DFCF]">
              <span className="flex items-center gap-1.5">
                <User size={15} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={15} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} />
                {post.readTime} phút đọc
              </span>
            </div>

            {/* Article content */}
            <div
              className="prose prose-lg prose-green max-w-none text-[#26352B] leading-relaxed
                prose-headings:font-playfair prose-headings:text-[#26352B]
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[#26352B] prose-p:leading-relaxed prose-p:mb-5
                prose-ul:text-[#26352B] prose-li:mb-1.5
                prose-strong:text-[#26352B] prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#E8DFCF]">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-[#EAF2E7] text-[#28643E] px-3 py-1 rounded-full text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social share */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-semibold text-[#788278]">Chia sẻ:</span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8DFCF] text-sm text-[#788278] hover:border-[#28643E] hover:text-[#28643E] transition-colors bg-white shadow-xs"
              >
                <Copy size={14} />
                Sao chép link
              </button>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8DFCF] text-sm text-[#788278] hover:border-blue-500 hover:text-blue-600 transition-colors bg-white shadow-xs"
              >
                <Facebook size={14} />
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8DFCF] text-sm text-[#788278] hover:border-sky-400 hover:text-sky-500 transition-colors bg-white shadow-xs"
              >
                <Twitter size={14} />
                Twitter
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="mt-14 lg:mt-0 space-y-8">
            {/* Author card */}
            <div className="bg-white rounded-2xl border border-[#E8DFCF] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E7] flex items-center justify-center">
                  <Leaf size={22} className="text-[#28643E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#26352B]">{post.author}</p>
                  <p className="text-xs text-[#788278]">Chuyên gia cây cảnh Plantify</p>
                </div>
              </div>
              <p className="text-sm text-[#788278] leading-relaxed">
                Đam mê chia sẻ tình yêu thiên nhiên và hỗ trợ mọi người xây dựng không gian sống xanh mát, trong lành.
              </p>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div>
                <h3 className="font-playfair text-xl font-bold text-[#26352B] mb-4">
                  Bài viết liên quan
                </h3>
                <div className="space-y-3">
                  {related.map((r) => (
                    <RelatedCard key={r.id} post={r} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-[#28643E] rounded-2xl p-6 text-white text-center shadow-sm">
              <Leaf size={28} className="mx-auto mb-3 opacity-80" />
              <h4 className="font-playfair text-lg font-bold mb-2">Tìm loại cây dành cho bạn</h4>
              <p className="text-green-100 text-sm mb-4">Làm bài trắc nghiệm 1 phút để nhận gợi ý cây cảnh phù hợp nhất.</p>
              <Link
                to="/plant-finder"
                className="block bg-white text-[#28643E] font-semibold py-2.5 rounded-xl hover:bg-[#EAF2E7] transition-colors text-sm shadow-xs"
              >
                Làm trắc nghiệm ngay
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
