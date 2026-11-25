import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Leaf,
} from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import PageHeader from '../../components/common/PageHeader';
import { products } from '../../data/products';
import type {
  ProductCategory,
  LightRequirement,
  WateringFrequency,
  DifficultyLevel,
  PlantSize,
} from '../../types';

// ── Filter state type ─────────────────────────────────────────────────────────
interface Filters {
  categories: ProductCategory[];
  priceMin: string;
  priceMax: string;
  light: LightRequirement[];
  watering: WateringFrequency[];
  size: PlantSize[];
  difficulty: DifficultyLevel[];
}

const defaultFilters: Filters = {
  categories: [],
  priceMin: '',
  priceMax: '',
  light: [],
  watering: [],
  size: [],
  difficulty: [],
};

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

// ── Option sets ───────────────────────────────────────────────────────────────
const categoryOptions: { value: ProductCategory; label: string }[] = [
  { value: 'desk-plants', label: 'Cây để bàn' },
  { value: 'indoor-plants', label: 'Cây trong nhà' },
  { value: 'air-purifying', label: 'Lọc không khí' },
  { value: 'feng-shui', label: 'Cây phong thủy' },
  { value: 'easy-care', label: 'Dễ chăm sóc' },
  { value: 'decorative', label: 'Cây dáng lớn' },
  { value: 'living-room', label: 'Phòng khách' },
  { value: 'bedroom', label: 'Phòng ngủ' },
];

const lightOptions: { value: LightRequirement; label: string }[] = [
  { value: 'low', label: 'Ánh sáng yếu / bóng râm' },
  { value: 'medium', label: 'Ánh sáng vừa phải' },
  { value: 'bright-indirect', label: 'Ánh sáng tán xạ gián tiếp' },
  { value: 'direct', label: 'Nắng trực tiếp' },
];

const wateringOptions: { value: WateringFrequency; label: string }[] = [
  { value: 'rarely', label: 'Ít tưới (2–3 tuần/lần)' },
  { value: 'weekly', label: 'Hàng tuần (1 lần/tuần)' },
  { value: 'twice-weekly', label: '2 lần một tuần' },
  { value: 'daily', label: 'Hàng ngày' },
];

const sizeOptions: { value: PlantSize; label: string }[] = [
  { value: 'small', label: 'Nhỏ (< 40cm)' },
  { value: 'medium', label: 'Vừa (40–80cm)' },
  { value: 'large', label: 'Lớn (> 80cm)' },
];

const difficultyOptions: { value: DifficultyLevel; label: string }[] = [
  { value: 'easy', label: 'Dễ (Người mới tập trồng)' },
  { value: 'medium', label: 'Trung bình' },
  { value: 'hard', label: 'Cần nhiều kinh nghiệm' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Nổi bật nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
  { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'newest', label: 'Mới nhất' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

// ── FilterSection subcomponent ────────────────────────────────────────────────
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E8DFCF] pb-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 font-['Be_Vietnam_Pro'] font-semibold text-[#26352B] text-sm"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-[#788278] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="mt-1">{children}</div>}
    </div>
  );
};

// ── Checkbox option ───────────────────────────────────────────────────────────
interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, checked, onChange, count }) => (
  <label className="flex items-center justify-between gap-2 py-1.5 cursor-pointer group">
    <div className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded border flex-shrink-0 transition-colors duration-150 ${
          checked ? 'bg-[#28643E] border-[#28643E]' : 'border-[#C8D5C8] group-hover:border-[#28643E]'
        } flex items-center justify-center`}
        onClick={onChange}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span
        className={`font-['Be_Vietnam_Pro'] text-sm ${checked ? 'text-[#28643E] font-medium' : 'text-[#788278]'}`}
        onClick={onChange}
      >
        {label}
      </span>
    </div>
    {count !== undefined && (
      <span className="font-['Be_Vietnam_Pro'] text-xs text-[#788278]">({count})</span>
    )}
  </label>
);

// ── Sidebar ───────────────────────────────────────────────────────────────────
interface SidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onReset: () => void;
  activeFilterCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters, onReset, activeFilterCount }) => {
  const toggleCategory = useCallback(
    (v: ProductCategory) => setFilters((f) => ({ ...f, categories: toggleItem(f.categories, v) })),
    [setFilters]
  );
  const toggleLight = useCallback(
    (v: LightRequirement) => setFilters((f) => ({ ...f, light: toggleItem(f.light, v) })),
    [setFilters]
  );
  const toggleWatering = useCallback(
    (v: WateringFrequency) => setFilters((f) => ({ ...f, watering: toggleItem(f.watering, v) })),
    [setFilters]
  );
  const toggleSize = useCallback(
    (v: PlantSize) => setFilters((f) => ({ ...f, size: toggleItem(f.size, v) })),
    [setFilters]
  );
  const toggleDifficulty = useCallback(
    (v: DifficultyLevel) =>
      setFilters((f) => ({ ...f, difficulty: toggleItem(f.difficulty, v) })),
    [setFilters]
  );

  return (
    <aside className="w-full space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#28643E]" />
          <span className="font-['Be_Vietnam_Pro'] font-bold text-[#26352B]">Bộ lọc</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#28643E] text-white text-xs font-['Be_Vietnam_Pro'] rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="font-['Be_Vietnam_Pro'] text-xs text-[#28643E] hover:text-[#193D2A] font-medium"
          >
            Đặt lại
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Danh mục cây">
        {categoryOptions.map((opt) => (
          <CheckboxItem
            key={opt.value}
            label={opt.label}
            checked={filters.categories.includes(opt.value)}
            onChange={() => toggleCategory(opt.value)}
            count={products.filter((p) => p.category === opt.value).length}
          />
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Khoảng giá (₫)">
        <div className="flex gap-2 items-center mt-2">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Từ"
              value={filters.priceMin}
              onChange={(e) => setFilters((f) => ({ ...f, priceMin: e.target.value }))}
              className="w-full border border-[#C8D5C8] rounded-lg px-3 py-2 font-['Be_Vietnam_Pro'] text-sm text-[#26352B] outline-none focus:ring-2 focus:ring-[#28643E]/30 focus:border-[#28643E]"
            />
          </div>
          <span className="font-['Be_Vietnam_Pro'] text-[#788278] text-sm flex-shrink-0">–</span>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Đến"
              value={filters.priceMax}
              onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value }))}
              className="w-full border border-[#C8D5C8] rounded-lg px-3 py-2 font-['Be_Vietnam_Pro'] text-sm text-[#26352B] outline-none focus:ring-2 focus:ring-[#28643E]/30 focus:border-[#28643E]"
            />
          </div>
        </div>
        <p className="font-['Be_Vietnam_Pro'] text-xs text-[#788278] mt-2">Đơn vị tính: VNĐ (₫)</p>
      </FilterSection>

      {/* Light */}
      <FilterSection title="Nhu cầu ánh sáng">
        {lightOptions.map((opt) => (
          <CheckboxItem
            key={opt.value}
            label={opt.label}
            checked={filters.light.includes(opt.value)}
            onChange={() => toggleLight(opt.value)}
          />
        ))}
      </FilterSection>

      {/* Watering */}
      <FilterSection title="Tần suất tưới nước" defaultOpen={false}>
        {wateringOptions.map((opt) => (
          <CheckboxItem
            key={opt.value}
            label={opt.label}
            checked={filters.watering.includes(opt.value)}
            onChange={() => toggleWatering(opt.value)}
          />
        ))}
      </FilterSection>

      {/* Size */}
      <FilterSection title="Kích thước cây" defaultOpen={false}>
        {sizeOptions.map((opt) => (
          <CheckboxItem
            key={opt.value}
            label={opt.label}
            checked={filters.size.includes(opt.value)}
            onChange={() => toggleSize(opt.value)}
          />
        ))}
      </FilterSection>

      {/* Difficulty */}
      <FilterSection title="Mức độ chăm sóc" defaultOpen={false}>
        {difficultyOptions.map((opt) => (
          <CheckboxItem
            key={opt.value}
            label={opt.label}
            checked={filters.difficulty.includes(opt.value)}
            onChange={() => toggleDifficulty(opt.value)}
          />
        ))}
      </FilterSection>
    </aside>
  );
};

// ── Empty State ───────────────────────────────────────────────────────────────
interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 bg-[#EAF2E7] rounded-full flex items-center justify-center mb-6">
      <Leaf className="w-10 h-10 text-[#28643E]" />
    </div>
    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#26352B] mb-3">
      Không tìm thấy cây cảnh phù hợp
    </h3>
    <p className="font-['Be_Vietnam_Pro'] text-[#788278] mb-6 max-w-sm">
      Rất tiếc chúng tôi chưa tìm thấy cây cảnh nào khớp với các tiêu chí lọc hiện tại. Bạn vui lòng thử thay đổi từ khóa hoặc xóa bớt bộ lọc nhé.
    </p>
    <button
      onClick={onReset}
      className="inline-flex items-center gap-2 bg-[#28643E] text-white font-['Be_Vietnam_Pro'] font-semibold px-6 py-3 rounded-full hover:bg-[#193D2A] transition-colors duration-200"
    >
      Xóa tất cả bộ lọc
    </button>
  </div>
);

// ── Shop Page ─────────────────────────────────────────────────────────────────
const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') as ProductCategory | null;

  const [filters, setFilters] = useState<Filters>(() => ({
    ...defaultFilters,
    categories: urlCategory ? [urlCategory] : [],
  }));
  const [sort, setSort] = useState<SortOption>('default');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sync category from URL
  React.useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null;
    if (cat) {
      setFilters((f) => ({
        ...f,
        categories: [cat],
      }));
    }
  }, [searchParams]);

  const handleReset = useCallback(() => {
    setFilters(defaultFilters);
    setSearch('');
    setSearchParams({});
  }, [setSearchParams]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length) count += filters.categories.length;
    if (filters.priceMin) count++;
    if (filters.priceMax) count++;
    if (filters.light.length) count += filters.light.length;
    if (filters.watering.length) count += filters.watering.length;
    if (filters.size.length) count += filters.size.length;
    if (filters.difficulty.length) count += filters.difficulty.length;
    return count;
  }, [filters]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.categories.length) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Price
    if (filters.priceMin) {
      const min = parseInt(filters.priceMin, 10);
      result = result.filter((p) => (p.salePrice ?? p.price) >= min);
    }
    if (filters.priceMax) {
      const max = parseInt(filters.priceMax, 10);
      result = result.filter((p) => (p.salePrice ?? p.price) <= max);
    }

    // Light
    if (filters.light.length) {
      result = result.filter((p) => filters.light.includes(p.lightRequirement));
    }

    // Watering
    if (filters.watering.length) {
      result = result.filter((p) => filters.watering.includes(p.wateringFrequency));
    }

    // Size
    if (filters.size.length) {
      result = result.filter((p) => filters.size.includes(p.size));
    }

    // Difficulty
    if (filters.difficulty.length) {
      result = result.filter((p) => filters.difficulty.includes(p.difficulty));
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // featured: bestsellers first
        result.sort((a, b) => {
          const rank = { bestseller: 0, new: 1, sale: 2, limited: 3 };
          const ar = a.badge ? rank[a.badge] ?? 4 : 4;
          const br = b.badge ? rank[b.badge] ?? 4 : 4;
          return ar - br;
        });
    }

    return result;
  }, [filters, sort, search]);

  return (
    <div className="min-h-screen bg-[#FAF9F4]">
      {/* Page header */}
      <PageHeader
        badge="Danh mục sản phẩm"
        title="Cửa Hàng Cây Cảnh"
        description={`${products.length} loài cây tuyển chọn và chăm sóc kỹ lưỡng từ các vườn ươm uy tín`}
        breadcrumbs={[{ label: 'Cửa hàng' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile: search + filter toggle */}
        <div className="flex gap-3 mb-6 lg:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788278]" />
            <input
              type="text"
              placeholder="Tìm kiếm cây cảnh..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#C8D5C8] rounded-xl font-['Be_Vietnam_Pro'] text-sm text-[#26352B] bg-white outline-none focus:ring-2 focus:ring-[#28643E]/30 focus:border-[#28643E]"
            />
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 bg-white border border-[#C8D5C8] rounded-xl px-4 py-3 font-['Be_Vietnam_Pro'] text-sm font-semibold text-[#26352B] hover:border-[#28643E] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Bộ lọc
            {activeFilterCount > 0 && (
              <span className="bg-[#28643E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <Sidebar
                filters={filters}
                setFilters={setFilters}
                onReset={handleReset}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Desktop: search + sort bar */}
            <div className="hidden lg:flex gap-4 mb-6 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788278]" />
                <input
                  type="text"
                  placeholder="Tìm cây theo tên, loài, đặc tính phong thủy..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#C8D5C8] rounded-xl font-['Be_Vietnam_Pro'] text-sm text-[#26352B] bg-white outline-none focus:ring-2 focus:ring-[#28643E]/30 focus:border-[#28643E]"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#788278] hover:text-[#26352B]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-['Be_Vietnam_Pro'] text-sm text-[#788278] whitespace-nowrap">
                  Sắp xếp:
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="border border-[#C8D5C8] rounded-xl px-4 py-3 font-['Be_Vietnam_Pro'] text-sm text-[#26352B] bg-white outline-none focus:ring-2 focus:ring-[#28643E]/30 focus:border-[#28643E] appearance-none cursor-pointer pr-8"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23788278' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile: sort row */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <span className="font-['Be_Vietnam_Pro'] text-sm text-[#788278]">
                {filteredProducts.length} cây cảnh
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="border border-[#C8D5C8] rounded-lg px-3 py-2 font-['Be_Vietnam_Pro'] text-sm text-[#26352B] bg-white outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Result count + active filter tags (desktop) */}
            <div className="hidden lg:flex items-center gap-3 mb-6 flex-wrap">
              <span className="font-['Be_Vietnam_Pro'] text-sm text-[#788278]">
                Đang hiển thị{' '}
                <span className="font-semibold text-[#26352B]">{filteredProducts.length}</span> trên{' '}
                {products.length} cây
              </span>

              {filters.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 bg-[#EAF2E7] text-[#28643E] font-['Be_Vietnam_Pro'] text-xs font-medium px-3 py-1 rounded-full"
                >
                  {categoryOptions.find((c) => c.value === cat)?.label ?? cat}
                  <button
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        categories: f.categories.filter((c) => c !== cat),
                      }))
                    }
                    className="ml-1 hover:text-[#193D2A]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {activeFilterCount > 0 && (
                <button
                  onClick={handleReset}
                  className="font-['Be_Vietnam_Pro'] text-xs text-[#788278] hover:text-[#26352B] underline"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>

            {/* Product grid */}
            {filteredProducts.length === 0 ? (
              <EmptyState onReset={handleReset} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFCF]">
              <span className="font-['Be_Vietnam_Pro'] font-bold text-[#26352B] text-lg">
                Bộ lọc tìm kiếm
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EAF2E7] transition-colors"
              >
                <X className="w-5 h-5 text-[#788278]" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <Sidebar
                filters={filters}
                setFilters={setFilters}
                onReset={handleReset}
                activeFilterCount={activeFilterCount}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#E8DFCF] flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 border border-[#C8D5C8] text-[#26352B] font-['Be_Vietnam_Pro'] font-semibold py-3 rounded-full hover:bg-[#EAF2E7] transition-colors"
              >
                Đặt lại
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex-1 bg-[#28643E] text-white font-['Be_Vietnam_Pro'] font-semibold py-3 rounded-full hover:bg-[#193D2A] transition-colors"
              >
                Xem {filteredProducts.length} kết quả
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
