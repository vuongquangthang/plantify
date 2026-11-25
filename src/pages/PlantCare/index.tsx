import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ArrowRight, Leaf } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import PageHeader from '../../components/common/PageHeader';
import type { BlogPost, BlogCategory } from '../../types';

const CATEGORIES: { value: BlogCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả bài viết' },
  { value: 'plant-care', label: 'Chăm sóc cây' },
  { value: 'beginner-guide', label: 'Người mới bắt đầu' },
  { value: 'interior-design', label: 'Trang trí nội thất' },
  { value: 'plant-health', label: 'Sức khỏe & Sâu bệnh' },
  { value: 'lifestyle', label: 'Lối sống xanh' },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function ArticleCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      to={`/plant-care/${post.slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DFCF] hover:shadow-lg transition-all duration-200 ${featured ? 'md:flex' : ''}`}
    >
      <div className={`overflow-hidden ${featured ? 'md:w-1/2 flex-shrink-0' : ''}`}>
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${featured ? 'h-64 md:h-full' : 'h-52'}`}
          loading="lazy"
        />
      </div>
      <div className={`p-6 flex flex-col ${featured ? 'md:flex-1' : 'flex-1'}`}>
        {featured && (
          <span className="inline-block bg-[#28643E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 w-fit">
            Bài viết nổi bật
          </span>
        )}
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6F956E] mb-2">
          {CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
        </span>
        <h2 className={`font-playfair font-bold text-[#26352B] leading-tight mb-2 group-hover:text-[#28643E] transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {post.title}
        </h2>
        <p className="text-[#788278] text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-[#788278]">
          <span className="flex items-center gap-1">
            <User size={12} />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime} phút đọc
          </span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        {featured && (
          <div className="mt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#28643E] group-hover:gap-3 transition-all">
              Đọc bài viết chi tiết <ArrowRight size={14} />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function PlantCare() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = useMemo(() => blogPosts.find((p) => p.featured) ?? blogPosts[0], []);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const categoryMatch = activeCategory === 'all' || post.category === activeCategory;
      const searchMatch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const gridPosts = filtered.filter((p) => p.id !== featured.id || activeCategory !== 'all' || searchQuery);

  return (
    <div className="min-h-screen bg-[#FAF9F4]">
      {/* Hero */}
      <PageHeader
        badge="Cẩm nang & Kinh nghiệm"
        badgeIcon={<Leaf className="w-3 h-3 text-emerald-300" />}
        title="Cẩm Nang Chăm Sóc Cây Cảnh"
        description="Kinh nghiệm thực tế, cẩm nang từ chuyên gia và cảm hứng decor xanh giúp không gian sống luôn ngập tràn sinh khí."
        breadcrumbs={[{ label: 'Cẩm nang chăm sóc' }]}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#788278]" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết kinh nghiệm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8DFCF] bg-white focus:outline-none focus:ring-2 focus:ring-[#28643E]/30 focus:border-[#28643E] text-[#26352B] placeholder:text-[#788278]"
            />
          </div>
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.value
                    ? 'bg-[#28643E] text-white shadow-sm'
                    : 'bg-white border border-[#E8DFCF] text-[#788278] hover:border-[#28643E] hover:text-[#28643E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured article */}
        {activeCategory === 'all' && !searchQuery && (
          <div className="mb-12">
            <ArticleCard post={featured} featured />
          </div>
        )}

        {/* Article grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Leaf size={48} className="mx-auto text-[#788278] opacity-30 mb-4" />
            <h3 className="text-xl font-semibold text-[#26352B] mb-2">Không tìm thấy bài viết phù hợp</h3>
            <p className="text-[#788278]">Bạn hãy thử tìm với từ khóa hoặc danh mục khác nhé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === 'all' && !searchQuery ? gridPosts : filtered).map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
