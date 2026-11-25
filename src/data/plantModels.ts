export interface PlantModel {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  originalFilename: string;
  modelUrl: string;
  posterUrl: string;
  available: boolean;
  dimensions?: {
    height: string;
    width: string;
    depth?: string;
  };
  fileSizeMb: number;
  authorCredits?: string;
  description: string;
}

export const plantModels: PlantModel[] = [
  {
    id: 'model-monstera',
    productId: '1',
    productSlug: 'monstera-deliciosa',
    name: 'Trầu Bà Nam Mỹ (Monstera Deliciosa)',
    originalFilename: 'monstera_deliciosa_potted_mid-century_plant.glb',
    modelUrl: '/models/monstera_deliciosa_potted_mid-century_plant.glb',
    posterUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80',
    available: true,
    dimensions: {
      height: '1.2 m',
      width: '0.9 m',
    },
    fileSizeMb: 7.81,
    authorCredits: 'Giora (Sketchfab CC-BY-4.0)',
    description: 'Mô hình 3D thực tế chi tiết từng phiến lá xẻ Monstera, thân rễ và chậu sứ chân gỗ Mid-Century sang trọng.',
  },
  {
    id: 'model-pothos',
    productId: '4',
    productSlug: 'golden-pothos',
    name: 'Trầu Bà Vàng Dây Leo (Golden Pothos)',
    originalFilename: 'free_pothos_potted_plant_-_money_plant.glb',
    modelUrl: '/models/free_pothos_potted_plant_-_money_plant.glb',
    posterUrl: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=600&q=80',
    available: true,
    dimensions: {
      height: '0.5 m',
      width: '0.45 m',
    },
    fileSizeMb: 3.71,
    authorCredits: 'AllQuad (Sketchfab CC-BY-4.0)',
    description: 'Mô hình Pothos (Money Plant) với tán lá hình tim xum xuê và chậu 3 chân gỗ mộc mạc phong cách Scandinavian.',
  },
  {
    id: 'model-peace-lily',
    productId: '3',
    productSlug: 'peace-lily',
    name: 'Cây Lan Ý (Peace Lily)',
    originalFilename: 'plant.glb',
    modelUrl: '/models/plant.glb',
    posterUrl: 'https://images.unsplash.com/photo-1593691512429-7c43f2bac1a2?w=600&q=80',
    available: true,
    dimensions: {
      height: '0.6 m',
      width: '0.45 m',
    },
    fileSizeMb: 3.65,
    authorCredits: 'Boxroom 3D (Sketchfab CC-BY-4.0)',
    description: 'Mô hình cây kiểng lá thon dài gân nổi song song đặc trưng của loài Lan Ý, đặt trong chậu đen viền vàng hoàng gia.',
  },
  {
    id: 'model-fiddle-leaf',
    productId: '6',
    productSlug: 'fiddle-leaf-fig',
    name: 'Cây Bàng Singapore (Fiddle Leaf Fig)',
    originalFilename: 'indoor_plant.glb',
    modelUrl: '/models/indoor_plant.glb',
    posterUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&q=80',
    available: true,
    dimensions: {
      height: '1.4 m',
      width: '0.7 m',
    },
    fileSizeMb: 2.55,
    authorCredits: 'hako (Sketchfab CC-BY-NC-4.0)',
    description: 'Dáng cây nội thất thân thẳng với các tán lá hình đàn vĩ cầm vươn cao, đặt trong chậu giỏ mây đan thủ công ấm cúng.',
  },
  {
    id: 'model-zz-plant',
    productId: '5',
    productSlug: 'zz-plant',
    name: 'Cây Kim Tiền (ZZ Plant)',
    originalFilename: 'indoor_plant2.glb',
    modelUrl: '/models/indoor_plant2.glb',
    posterUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    available: true,
    dimensions: {
      height: '0.5 m',
      width: '0.4 m',
    },
    fileSizeMb: 5.06,
    authorCredits: 'emm (Sketchfab CC-BY-4.0)',
    description: 'Mô hình 3D scan Photogrammetry từ cây thực tế với tán lá rậm rạp xanh bóng mướt, mang ý nghĩa tài lộc thịnh vượng.',
  },
];

/**
 * Get plant model configuration by product slug
 */
export function getPlantModelBySlug(slug: string): PlantModel | undefined {
  return plantModels.find((m) => m.productSlug === slug && m.available);
}

/**
 * Get plant model configuration by product id
 */
export function getPlantModelById(productId: string): PlantModel | undefined {
  return plantModels.find((m) => m.productId === productId && m.available);
}

/**
 * Check if a product slug has an active real 3D model
 */
export function hasReal3DModel(slug: string): boolean {
  return plantModels.some((m) => m.productSlug === slug && m.available);
}
