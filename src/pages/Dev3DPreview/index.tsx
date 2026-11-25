import React, { useState, useEffect } from 'react';
import { Leaf, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface ModelInfo {
  id: string;
  filename: string;
  url: string;
  displayNameCandidate: string;
  suggestedProductSlug: string;
  notes: string;
}

const MODELS_TO_VALIDATE: ModelInfo[] = [
  {
    id: 'downloaded-1',
    filename: 'monstera_deliciosa_potted_mid-century_plant.glb',
    url: '/models/monstera_deliciosa_potted_mid-century_plant.glb',
    displayNameCandidate: 'Trầu Bà Nam Mỹ (Monstera Deliciosa Mid-Century)',
    suggestedProductSlug: 'monstera-deliciosa',
    notes: 'Model Monstera tả thực cao cấp có chậu và chân đế gỗ Mid-Century',
  },
  {
    id: 'downloaded-2',
    filename: 'free_pothos_potted_plant_-_money_plant.glb',
    url: '/models/free_pothos_potted_plant_-_money_plant.glb',
    displayNameCandidate: 'Trầu Bà Vàng Dây Leo (Golden Pothos / Money Plant)',
    suggestedProductSlug: 'golden-pothos',
    notes: 'Model Pothos / Money Plant có chậu 3 chân gỗ',
  },
  {
    id: 'downloaded-3',
    filename: 'plant.glb',
    url: '/models/plant.glb',
    displayNameCandidate: 'Cây Lan Ý (Peace Lily) / Cây Lá Kiểng Chậu Đen Kim',
    suggestedProductSlug: 'peace-lily',
    notes: 'Lá thoi dài gân song song (Hojas), chậu đen viền vàng sang trọng',
  },
  {
    id: 'downloaded-4',
    filename: 'indoor_plant.glb',
    url: '/models/indoor_plant.glb',
    displayNameCandidate: 'Cây Cỏ Đồng Tiền / Trầu Bà (Indoor Plant Chậu Mây)',
    suggestedProductSlug: 'chinese-money-plant',
    notes: 'Lá hình tim/tròn mềm mại, chậu đan mây thủ công tự nhiên',
  },
  {
    id: 'downloaded-5',
    filename: 'indoor_plant2.glb',
    url: '/models/indoor_plant2.glb',
    displayNameCandidate: 'Cây Bàng Singapore / Cây Bụi Nội Thất (Scan Photogrammetry)',
    suggestedProductSlug: 'fiddle-leaf-fig',
    notes: 'Mô hình scan 3D thực tế chi tiết từng tán lá và chậu đất',
  },
];

export default function Dev3DPreview() {
  const [loadStates, setLoadStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({});

  const handleModelLoad = (id: string) => {
    setLoadStates((prev) => ({ ...prev, [id]: 'loaded' }));
  };

  const handleModelError = (id: string) => {
    setLoadStates((prev) => ({ ...prev, [id]: 'error' }));
  };

  return (
    <div className="min-h-screen bg-cream p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 bg-white p-6 rounded-3xl shadow-sm border border-primary/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
            🛠️ Development Only Tool
          </div>
          <h1 className="font-playfair text-3xl font-bold text-text-main">
            Kiểm tra 5 Mô hình 3D Thực tế vừa tải về
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Trang thẩm định hình thái học thực vật (botanical morphology), kiểm tra load status, textures và chất liệu trước khi tích hợp vào catalog chính.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS_TO_VALIDATE.map((item, idx) => {
            const status = loadStates[item.id] || 'loading';

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              >
                {/* 3D Canvas */}
                <div className="relative aspect-square w-full bg-gradient-to-b from-sage/30 to-cream overflow-hidden">
                  <model-viewer
                    src={item.url}
                    alt={item.displayNameCandidate}
                    camera-controls
                    auto-rotate
                    shadow-intensity="1.2"
                    exposure="1.0"
                    style={{ width: '100%', height: '100%', outline: 'none' }}
                    onLoad={() => handleModelLoad(item.id)}
                    onError={() => handleModelError(item.id)}
                  />

                  {/* Status Overlay */}
                  <div className="absolute top-3 right-3 z-10">
                    {status === 'loaded' && (
                      <span className="flex items-center gap-1 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đã tải thành công
                      </span>
                    )}
                    {status === 'error' && (
                      <span className="flex items-center gap-1 bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Lỗi tải file
                      </span>
                    )}
                    {status === 'loading' && (
                      <span className="flex items-center gap-1 bg-amber-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Đang tải...
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-3 left-3 bg-dark-forest/70 text-white text-[11px] px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    Mô hình #{idx + 1}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-text-main leading-tight mb-1">
                      {item.displayNameCandidate}
                    </h3>
                    <p className="text-xs font-mono text-primary font-semibold break-all mb-2">
                      {item.filename}
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">
                      {item.notes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Đề xuất gán vào:</span>
                    <span className="font-bold text-primary bg-sage/50 px-2 py-0.5 rounded-md">
                      {item.suggestedProductSlug}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
