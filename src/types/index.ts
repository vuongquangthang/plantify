// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  category: ProductCategory;
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: 'new' | 'sale' | 'bestseller' | 'limited';
  height: string;
  potDiameter: string;
  lightRequirement: LightRequirement;
  wateringFrequency: WateringFrequency;
  difficulty: DifficultyLevel;
  potOptions: PotOption[];
  modelPath?: string;
  model3D?: string;
  poster3D?: string;
  hasReal3DModel?: boolean;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  placement: PlantPlacement[];
  size: PlantSize;
  benefits: string[];
}

export type ProductCategory =
  | 'desk-plants'
  | 'indoor-plants'
  | 'air-purifying'
  | 'feng-shui'
  | 'easy-care'
  | 'decorative'
  | 'living-room'
  | 'bedroom';

export type LightRequirement = 'low' | 'medium' | 'bright-indirect' | 'direct';
export type WateringFrequency = 'rarely' | 'weekly' | 'twice-weekly' | 'daily';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type PlantPlacement = 'bedroom' | 'living-room' | 'office' | 'desk' | 'balcony';
export type PlantSize = 'small' | 'medium' | 'large';

export interface PotOption {
  id: string;
  name: string;
  color: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  images?: string[];
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedPot?: PotOption;
}

export interface Cart {
  items: CartItem[];
  discountCode?: string;
  discountAmount?: number;
}

// Wishlist
export type WishlistItem = Product;

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
  savedDesigns: ARDesign[];
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

// Order types
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
  estimatedDelivery: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'bank-transfer' | 'e-wallet';

// AR Design
export interface ARDesign {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  potOption?: PotOption;
  screenshot?: string;
  createdAt: string;
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: BlogCategory;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export type BlogCategory =
  | 'plant-care'
  | 'beginner-guide'
  | 'interior-design'
  | 'plant-health'
  | 'lifestyle';

// Plant Finder
export interface PlantFinderAnswers {
  placement?: PlantPlacement;
  light?: LightRequirement;
  careTime?: 'very-little' | 'few-times' | 'daily';
  size?: PlantSize;
  budget?: 'under-200k' | '200k-500k' | '500k-1m' | 'above-1m';
}

// Checkout
export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note: string;
  paymentMethod: PaymentMethod;
  deliveryOption: 'standard' | 'express';
}

// Search
export interface SearchResult {
  products: Product[];
  posts: BlogPost[];
}

// Notification
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
