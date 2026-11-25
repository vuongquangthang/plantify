# PLANTIFY – AR-Powered E-Commerce Website 🌿

> **Tagline:** Plant Your Space, Live Your Way.  
> **Core Differentiator:** AR-powered plant visualization & 3D product experiences.

PLANTIFY is a modern, responsive full-stack e-commerce web platform for indoor plants and botanical lifestyle goods, featuring interactive WebXR Augmented Reality (AR) that allows customers to preview plants directly inside their living spaces before purchasing.

---

## 🌟 Key Features

1. **AR Experience ("See It. Place It. Love It.")**:
   - **True AR Mode (Mobile WebXR / Quick Look / Scene Viewer)**: Place real-scale 3D plants in your physical room using your smartphone camera.
   - **3D 360° Interactive Studio**: Inspect plant foliage, pot textures, and growth profiles from any angle on desktop and devices without AR sensors.
   - **Pot Customization**: Swap pot finishes (Ceramic White, Terracotta, Matte Black, Sage Green) in real-time.
   - **Preselection**: Seamlessly jump from any product detail page into the AR studio with that plant preloaded.

2. **Smart Plant Finder**:
   - 5-step diagnostic quiz assessing living space, sunlight exposure, maintenance schedule, desired size, and budget.
   - Dynamic recommendation engine that scores the catalog and provides personalized explanations for each match.

3. **Complete E-Commerce Flow**:
   - Responsive catalog with multi-dimensional filtering (category, price range, light requirements, watering needs, difficulty).
   - Dynamic search with keyword matching across plant descriptions and botanical tags.
   - Persistent Cart and Wishlist using browser LocalStorage.
   - Multi-step checkout simulation with address validation, coupon code discounts (`WELCOME15`, `PLANTIFY10`, `XANH20`), shipping tier selection, and payment options (COD, VietQR Bank Transfer, E-wallet).
   - Order confirmation and order tracking timeline.

4. **Botanical Knowledge & Community**:
   - Plant Care guides and educational blog articles.
   - Customer reviews and ratings.
   - User account portal with profile management, order history, wishlist, and saved AR designs.
   - Interactive FAQ and customer support channels.

---

## 🛠️ Technology Stack

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS 3 with custom nature-inspired palette:
  - Primary Green: `#28643E`
  - Dark Forest: `#193D2A`
  - Sage: `#EAF2E7`
  - Cream Background: `#FAF9F4`
  - Warm Beige: `#E8DFCF`
- **Typography:** Be Vietnam Pro (Interface) & Playfair Display (Headings)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **3D & AR:** `@google/model-viewer` with WebXR, iOS AR Quick Look, and Android Scene Viewer support
- **State Management:** React Context API with LocalStorage persistence

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or newer
- npm or pnpm or yarn

### Installation

```bash
# Clone or navigate to the project directory
cd d:\plantify

# Install dependencies
npm install
```

### Development Server

To launch the local development server:

```bash
npm run dev
```

The application will start at `http://localhost:3000` (or the port specified in console output).

### Production Build

To compile a production-ready bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📱 AR Setup & 3D Assets

### Supported Formats & Locations

- **3D Model Format:** `.glb` (Binary glTF) or `.gltf` with embedded or external PBR textures.
- **Asset Directory:** Place 3D model files in `public/models/`. For example:
  - `public/models/monstera.glb`
  - `public/models/snake-plant.glb`
- **Fallback Behavior:** When a device does not support WebXR or when model files are loading, PLANTIFY displays a high-resolution interactive preview with realistic botanical photography so the experience remains smooth across all hardware.

### Device Compatibility & Requirements

| Platform | AR Support Mode | Requirements |
|---|---|---|
| **Android (Chrome)** | WebXR / Scene Viewer | Android 8.0+, Google Play Services for AR (ARCore) |
| **iOS (Safari)** | AR Quick Look / WebXR | iOS 12+ (USDZ/GLB conversion handled by model-viewer) |
| **Desktop (Chrome, Edge, Safari)** | 3D Interactive Viewer | Full 360° rotation and zoom controls |

---

## 🔌 Connecting a Real Backend & Payment Gateway

The application is structured with decoupled context and service layers to easily wire into production backends:

1. **Authentication (`src/context/AuthContext.tsx`)**:
   - Replace the demo simulated `login` and `register` methods with calls to your backend API (e.g. Supabase, Firebase Auth, or a custom Express/NestJS JWT service).

2. **Products & Inventory (`src/data/products.ts`)**:
   - Fetch real-time inventory from your REST or GraphQL endpoint (e.g. `GET /api/v1/products`).

3. **Payment Gateways (`src/pages/Checkout/index.tsx`)**:
   - **VNPay / VietQR:** Integrate VNPay Payment URL generation or PayOS QR API during checkout submission.
   - **MoMo / ZaloPay:** Redirect to the gateway payment URL returned from the payment initialization API.
   - **Stripe:** Use `@stripe/stripe-js` and `@stripe/react-stripe-js` for international credit cards.

---

## 📄 License

This project is licensed under the MIT License.
# plantify
