import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Leaf,
  Sun,
  Droplets,
  Ruler,
  Wallet,
  Home,
  Briefcase,
  Monitor,
  Wind,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { products } from '../../data/products';
import PageHeader from '../../components/common/PageHeader';
import type {
  PlantFinderAnswers,
  PlantPlacement,
  LightRequirement,
  PlantSize,
  Product,
} from '../../types';

// ─── Step option types ─────────────────────────────────────────────────────────
interface StepOption<T> {
  value: T;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

// ─── Step definitions ──────────────────────────────────────────────────────────
const placementOptions: StepOption<PlantPlacement>[] = [
  { value: 'bedroom', label: 'Phòng ngủ', icon: <Home size={28} />, description: 'Không gian yên bình tái tạo năng lượng' },
  { value: 'living-room', label: 'Phòng khách', icon: <Leaf size={28} />, description: 'Trái tim sum họp của cả gia đình' },
  { value: 'office', label: 'Văn phòng làm việc', icon: <Briefcase size={28} />, description: 'Nâng cao sự tập trung & giảm stress' },
  { value: 'desk', label: 'Bàn làm việc / Bàn học', icon: <Monitor size={28} />, description: 'Gọn gàng, nhỏ xinh thanh lọc mắt' },
  { value: 'balcony', label: 'Ban công / Hiên nhà', icon: <Wind size={28} />, description: 'Đón nắng gió tự nhiên dồi dào' },
];

const lightOptions: StepOption<LightRequirement>[] = [
  { value: 'low', label: 'Ánh sáng yếu', icon: <Sun size={28} className="opacity-30" />, description: 'Râm mát, hầu như không có nắng trực tiếp' },
  { value: 'medium', label: 'Ánh sáng vừa phải', icon: <Sun size={28} className="opacity-60" />, description: 'Có ánh sáng khuếch tán từ cửa sổ' },
  { value: 'bright-indirect', label: 'Ánh sáng tán xạ mạnh', icon: <Sun size={28} className="opacity-85" />, description: 'Sáng rõ nhưng có rèm mỏng che nắng gắt' },
  { value: 'direct', label: 'Nắng chiếu trực tiếp', icon: <Sun size={28} />, description: 'Đón ánh mặt trời trực diện nhiều giờ' },
];

const careOptions: StepOption<'very-little' | 'few-times' | 'daily'>[] = [
  { value: 'very-little', label: 'Rất ít thời gian', icon: <Droplets size={28} className="opacity-40" />, description: 'Vài tuần mới tưới 1 lần, sống khỏe dù bỏ quên' },
  { value: 'few-times', label: 'Vài ngày một lần', icon: <Droplets size={28} className="opacity-70" />, description: 'Thích ngắm nghía và tưới cây 1-2 lần mỗi tuần' },
  { value: 'daily', label: 'Hàng ngày', icon: <Droplets size={28} />, description: 'Đam mê chăm sóc, tưới ẩm và tỉa tót mỗi ngày' },
];

const sizeOptions: StepOption<PlantSize>[] = [
  { value: 'small', label: 'Cỡ nhỏ (< 40 cm)', icon: <Ruler size={18} />, description: 'Gọn gàng trên bàn làm việc, kệ sách' },
  { value: 'medium', label: 'Cỡ vừa (40–100 cm)', icon: <Ruler size={24} />, description: 'Đặt đôn gỗ hoặc góc phòng trà' },
  { value: 'large', label: 'Cỡ lớn (> 100 cm)', icon: <Ruler size={30} />, description: 'Dáng cây bề thế tạo điểm nhấn không gian' },
];

const budgetOptions: StepOption<'under-200k' | '200k-500k' | '500k-1m' | 'above-1m'>[] = [
  { value: 'under-200k', label: 'Dưới 200.000 ₫', icon: <Wallet size={28} />, description: 'Tiết kiệm, học sinh & sinh viên' },
  { value: '200k-500k', label: '200.000 ₫ – 500.000 ₫', icon: <Wallet size={28} />, description: 'Phổ biến, nhiều lựa chọn cây khỏe đẹp' },
  { value: '500k-1m', label: '500.000 ₫ – 1.000.000 ₫', icon: <Wallet size={28} />, description: 'Cây chọn lọc cao cấp kèm chậu sứ đẹp' },
  { value: 'above-1m', label: 'Trên 1.000.000 ₫', icon: <Wallet size={28} />, description: 'Cây phong thủy bề thế, kiểng lá sưu tầm' },
];

const STEPS = [
  { key: 'placement', title: 'Bạn muốn đặt cây cảnh ở đâu?', subtitle: 'Chọn vị trí không gian chính bạn muốn phủ xanh' },
  { key: 'light', title: 'Khu vực đó nhận được bao nhiêu ánh sáng tự nhiên?', subtitle: 'Ánh sáng là nguồn sống quan trọng nhất của cây' },
  { key: 'careTime', title: 'Bạn có thể dành bao nhiêu thời gian chăm sóc cây?', subtitle: 'Hãy chọn đúng thực tế – cây sẽ vô cùng biết ơn bạn đấy!' },
  { key: 'size', title: 'Kích cỡ cây cảnh bạn mong muốn là gì?', subtitle: 'Cân nhắc diện tích phòng và vị trí bạn định bày trí' },
  { key: 'budget', title: 'Mức ngân sách dự kiến của bạn là bao nhiêu?', subtitle: 'Plantify có những chậu cây tuyệt đẹp ở mọi mức giá' },
];

// ─── Scoring logic ─────────────────────────────────────────────────────────────
interface ScoredProduct {
  product: Product;
  score: number;
  reasons: string[];
}

function scoreProducts(answers: PlantFinderAnswers): ScoredProduct[] {
  return products
    .filter((p) => p.inStock)
    .map((product) => {
      let score = 0;
      const reasons: string[] = [];

      // Placement match (+2)
      if (answers.placement && product.placement.includes(answers.placement)) {
        score += 2;
        const placementLabel = placementOptions.find((o) => o.value === answers.placement)?.label;
        reasons.push(`Cực kỳ phù hợp đặt tại ${placementLabel}`);
      }

      // Size match (+2)
      if (answers.size && product.size === answers.size) {
        score += 2;
        const sizeLabel = sizeOptions.find((o) => o.value === answers.size)?.label;
        reasons.push(`Kích thước ${sizeLabel} đúng như kỳ vọng`);
      }

      // Light match (+2)
      if (answers.light) {
        if (product.lightRequirement === answers.light) {
          score += 2;
          const lightLabel = lightOptions.find((o) => o.value === answers.light)?.label;
          reasons.push(`Phát triển mạnh ở mức ${lightLabel}`);
        } else {
          const levels: LightRequirement[] = ['low', 'medium', 'bright-indirect', 'direct'];
          const diff = Math.abs(levels.indexOf(product.lightRequirement) - levels.indexOf(answers.light));
          if (diff === 1) {
            score += 1;
            reasons.push('Thích nghi tốt với mức ánh sáng này');
          }
        }
      }

      // Care time → watering frequency match (+2)
      if (answers.careTime) {
        const careMap: Record<string, string[]> = {
          'very-little': ['rarely'],
          'few-times': ['weekly', 'twice-weekly'],
          'daily': ['daily', 'twice-weekly'],
        };
        if (careMap[answers.careTime]?.includes(product.wateringFrequency)) {
          score += 2;
          reasons.push(`Phù hợp với quỹ thời gian chăm sóc của bạn`);
        }
      }

      // Budget match (+2)
      if (answers.budget) {
        const price = product.salePrice ?? product.price;
        const budgetMatch =
          (answers.budget === 'under-200k' && price < 200000) ||
          (answers.budget === '200k-500k' && price >= 200000 && price <= 500000) ||
          (answers.budget === '500k-1m' && price > 500000 && price <= 1000000) ||
          (answers.budget === 'above-1m' && price > 1000000);
        if (budgetMatch) {
          score += 2;
          reasons.push('Nằm trong khoảng ngân sách mong muốn');
        }
      }

      // Difficulty bonus
      if (answers.careTime === 'very-little' && product.difficulty === 'easy') {
        score += 1;
        reasons.push('Cực kỳ bền bỉ và dễ chăm sóc');
      }

      return { product, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

// ─── Option Card ───────────────────────────────────────────────────────────────
function OptionCard<T>({
  option,
  selected,
  onSelect,
}: {
  option: StepOption<T>;
  selected: boolean;
  onSelect: (v: T) => void;
}) {
  return (
    <button
      onClick={() => onSelect(option.value)}
      className={`group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 text-center w-full cursor-pointer ${
        selected
          ? 'border-[#28643E] bg-[#EAF2E7] shadow-lg scale-[1.02]'
          : 'border-[#E8DFCF] bg-white hover:border-[#6F956E] hover:shadow-md hover:scale-[1.01]'
      }`}
    >
      <span className={`${selected ? 'text-[#28643E]' : 'text-[#788278] group-hover:text-[#28643E]'} transition-colors`}>
        {option.icon}
      </span>
      <span className={`font-semibold text-sm ${selected ? 'text-[#28643E]' : 'text-[#26352B]'}`}>
        {option.label}
      </span>
      {option.description && (
        <span className="text-xs text-[#788278] leading-tight">{option.description}</span>
      )}
    </button>
  );
}

// ─── Result Card ───────────────────────────────────────────────────────────────
function ResultCard({ scored }: { scored: ScoredProduct }) {
  const { product, score, reasons } = scored;
  const price = product.salePrice ?? product.price;
  const maxScore = 11;
  const pct = Math.min(100, Math.round((score / maxScore) * 100));

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#E8DFCF] flex flex-col">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-52 object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/95 rounded-full px-3 py-1 text-xs font-bold text-[#28643E] shadow-sm">
          {pct}% phù hợp
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#26352B] text-lg leading-tight mb-1">{product.name}</h3>
        <p className="text-[#788278] text-sm mb-3 line-clamp-2">{product.shortDescription}</p>

        {/* Match bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-[#788278] mb-1">
            <span>Điểm tương thích</span>
            <span className="font-semibold text-[#28643E]">{score}/{maxScore} điểm</span>
          </div>
          <div className="h-2 bg-[#EAF2E7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#28643E] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Why this plant */}
        {reasons.length > 0 && (
          <div className="bg-[#EAF2E7] rounded-xl p-3 mb-4">
            <p className="text-xs font-semibold text-[#28643E] mb-1.5">Lý do cây này hợp với bạn:</p>
            <ul className="space-y-1">
              {reasons.map((r, i) => (
                <li key={i} className="text-xs text-[#26352B] flex items-center gap-1.5">
                  <Leaf size={12} className="text-[#28643E] flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#28643E] font-bold text-xl">
              {price.toLocaleString('vi-VN')} ₫
            </span>
            {product.salePrice && (
              <span className="text-[#788278] line-through text-sm">
                {product.price.toLocaleString('vi-VN')} ₫
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Link
              to={`/shop/${product.slug}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#28643E] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#193D2A] transition-colors"
            >
              <ExternalLink size={14} />
              Xem chi tiết
            </Link>
            <Link
              to={`/ar?product=${product.slug}`}
              className="flex items-center justify-center gap-1.5 border border-[#28643E] text-[#28643E] rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-[#EAF2E7] transition-colors"
            >
              <Camera size={14} />
              Thử AR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PlantFinder() {
  const [step, setStep] = useState(0); // 0-4 = questions, 5 = results
  const [answers, setAnswers] = useState<PlantFinderAnswers>({});
  const [results, setResults] = useState<ScoredProduct[]>([]);
  const [showAll, setShowAll] = useState(false);

  const totalSteps = STEPS.length;

  function handleSelect<K extends keyof PlantFinderAnswers>(key: K, value: PlantFinderAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      // Show results
      const scored = scoreProducts(answers);
      setResults(scored);
      setStep(totalSteps);
    }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleStartOver() {
    setStep(0);
    setAnswers({});
    setResults([]);
    setShowAll(false);
  }

  function getCurrentAnswer() {
    const key = STEPS[step]?.key as keyof PlantFinderAnswers;
    return answers[key];
  }

  function canProceed() {
    return getCurrentAnswer() !== undefined;
  }

  // ── Results page ───────────────────────────────────────────────────────────
  if (step === totalSteps) {
    const topResults = results.filter((r) => r.score > 0);
    const shownResults = showAll ? topResults : topResults.slice(0, 6);

    return (
      <div className="min-h-screen bg-[#FAF9F4]">
        {/* Header */}
        <PageHeader
          badge="Kết quả trắc nghiệm"
          badgeIcon={<Leaf className="w-3 h-3 text-emerald-300" />}
          title="Những Chậu Cây Hoàn Hảo Cho Bạn"
          description={`Dựa trên câu trả lời của bạn, chúng tôi đã chọn ra ${topResults.length} gợi ý phù hợp nhất.`}
          breadcrumbs={[{ label: 'Tìm cây phù hợp', href: '/plant-finder' }, { label: 'Kết quả' }]}
        />

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Summary of answers */}
          <div className="bg-white rounded-2xl border border-[#E8DFCF] p-5 mb-10 flex flex-wrap gap-3 items-center">
            {answers.placement && (
              <span className="bg-[#EAF2E7] text-[#28643E] px-3 py-1.5 rounded-full text-sm font-medium">
                📍 {placementOptions.find((o) => o.value === answers.placement)?.label}
              </span>
            )}
            {answers.light && (
              <span className="bg-[#EAF2E7] text-[#28643E] px-3 py-1.5 rounded-full text-sm font-medium">
                ☀️ {lightOptions.find((o) => o.value === answers.light)?.label}
              </span>
            )}
            {answers.careTime && (
              <span className="bg-[#EAF2E7] text-[#28643E] px-3 py-1.5 rounded-full text-sm font-medium">
                💧 {careOptions.find((o) => o.value === answers.careTime)?.label}
              </span>
            )}
            {answers.size && (
              <span className="bg-[#EAF2E7] text-[#28643E] px-3 py-1.5 rounded-full text-sm font-medium">
                📏 {sizeOptions.find((o) => o.value === answers.size)?.label}
              </span>
            )}
            {answers.budget && (
              <span className="bg-[#EAF2E7] text-[#28643E] px-3 py-1.5 rounded-full text-sm font-medium">
                💰 {budgetOptions.find((o) => o.value === answers.budget)?.label}
              </span>
            )}
            <button
              onClick={handleStartOver}
              className="ml-auto flex items-center gap-1.5 text-sm text-[#788278] hover:text-[#28643E] transition-colors"
            >
              <RotateCcw size={14} />
              Làm lại bài kiểm tra
            </button>
          </div>

          {topResults.length === 0 ? (
            <div className="text-center py-16">
              <Leaf size={48} className="mx-auto text-[#788278] mb-4 opacity-40" />
              <h2 className="text-xl font-semibold text-[#26352B] mb-2">Chưa tìm thấy cây khớp hoàn toàn</h2>
              <p className="text-[#788278] mb-6">Bạn hãy thử mở rộng tiêu chí ánh sáng hoặc ngân sách nhé.</p>
              <button onClick={handleStartOver} className="bg-[#28643E] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#193D2A] transition-colors">
                Thử lại ngay
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shownResults.map((s) => (
                  <ResultCard key={s.product.id} scored={s} />
                ))}
              </div>
              {topResults.length > 6 && !showAll && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setShowAll(true)}
                    className="border-2 border-[#28643E] text-[#28643E] px-8 py-3 rounded-xl font-semibold hover:bg-[#EAF2E7] transition-colors"
                  >
                    Xem tất cả {topResults.length} gợi ý
                  </button>
                </div>
              )}
              <div className="text-center mt-10">
                <button
                  onClick={handleStartOver}
                  className="flex items-center gap-2 mx-auto text-[#788278] hover:text-[#28643E] transition-colors font-medium"
                >
                  <RotateCcw size={16} />
                  Làm lại trắc nghiệm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Question steps ─────────────────────────────────────────────────────────
  const currentStep = STEPS[step];
  const progress = ((step + 1) / totalSteps) * 100;

  function renderOptions() {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {placementOptions.map((opt) => (
              <OptionCard
                key={String(opt.value)}
                option={opt}
                selected={answers.placement === opt.value}
                onSelect={(v) => handleSelect('placement', v)}
              />
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {lightOptions.map((opt) => (
              <OptionCard
                key={String(opt.value)}
                option={opt}
                selected={answers.light === opt.value}
                onSelect={(v) => handleSelect('light', v)}
              />
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {careOptions.map((opt) => (
              <OptionCard
                key={String(opt.value)}
                option={opt}
                selected={answers.careTime === opt.value}
                onSelect={(v) => handleSelect('careTime', v)}
              />
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sizeOptions.map((opt) => (
              <OptionCard
                key={String(opt.value)}
                option={opt}
                selected={answers.size === opt.value}
                onSelect={(v) => handleSelect('size', v)}
              />
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {budgetOptions.map((opt) => (
              <OptionCard
                key={String(opt.value)}
                option={opt}
                selected={answers.budget === opt.value}
                onSelect={(v) => handleSelect('budget', v)}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F4]">
      {/* Hero */}
      <PageHeader
        badge="Trắc nghiệm tìm cây"
        badgeIcon={<Leaf className="w-3 h-3 text-emerald-300" />}
        title="Tìm Loại Cây Phù Hợp Với Bạn"
        description="5 câu hỏi nhanh để tìm ra người bạn thực vật ưng ý nhất cho không gian và nhịp sống của bạn."
        breadcrumbs={[{ label: 'Tìm cây phù hợp' }]}
      />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-[#788278] mb-2">
            <span>Câu {step + 1} / {totalSteps}</span>
            <span>Đã hoàn thành {Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 bg-[#E8DFCF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#28643E] rounded-full transition-all duration-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i <= step ? 'bg-[#28643E]' : 'bg-[#E8DFCF]'}`}
              />
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8DFCF] p-8">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#26352B] mb-2">
            {currentStep.title}
          </h2>
          <p className="text-[#788278] mb-8">{currentStep.subtitle}</p>
          {renderOptions()}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#E8DFCF] text-[#788278] font-semibold hover:border-[#28643E] hover:text-[#28643E] transition-colors"
            >
              <ChevronLeft size={18} />
              Quay lại
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all ${
              canProceed()
                ? 'bg-[#28643E] hover:bg-[#193D2A] shadow-md'
                : 'bg-[#B0C4B4] cursor-not-allowed'
            }`}
          >
            {step === totalSteps - 1 ? 'Xem kết quả cây phù hợp' : 'Câu tiếp theo'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
