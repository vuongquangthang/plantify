import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { formatVND } from '../../utils/format';
import { generateId } from '../../utils/helpers';
import type { Order, PaymentMethod } from '../../types';

export default function Checkout() {
  const { items, discountCode, discountAmount, clearCart } = useCart();
  const { user } = useAuth();
  const { error: notifyError } = useNotification();
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [address, setAddress] = useState(user?.addresses[0]?.address ?? '');
  const [city, setCity] = useState(user?.addresses[0]?.city ?? 'Hà Nội');
  const [district, setDistrict] = useState(user?.addresses[0]?.district ?? 'Ba Đình');
  const [ward, setWard] = useState(user?.addresses[0]?.ward ?? 'Cống Vị');
  const [note, setNote] = useState('');

  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingCost = deliveryOption === 'express' ? 60000 : (subtotal >= 500000 ? 0 : 30000);
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCost);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Vui lòng nhập email hợp lệ';
    if (!phone.trim() || phone.length < 9) newErrors.phone = 'Vui lòng nhập số điện thoại hợp lệ';
    if (!address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ cụ thể (số nhà, đường)';
    if (!city.trim()) newErrors.city = 'Vui lòng chọn Tỉnh / Thành phố';
    if (!district.trim()) newErrors.district = 'Vui lòng chọn Quận / Huyện';
    if (!ward.trim()) newErrors.ward = 'Vui lòng chọn Phường / Xã';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      notifyError('Giỏ hàng của bạn đang trống');
      navigate('/cart');
      return;
    }

    if (!validate()) {
      notifyError('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    const orderId = `PLT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      items: [...items],
      subtotal,
      shippingFee: shippingCost,
      discount: discountAmount,
      total: totalAmount,
      status: 'pending',
      shippingAddress: {
        id: generateId(),
        fullName,
        phone,
        address,
        city,
        district,
        ward,
        isDefault: false,
      },
      paymentMethod,
      createdAt: new Date().toISOString(),
      estimatedDelivery:
        deliveryOption === 'express'
          ? 'Giao hỏa tốc trong 1–2 ngày làm việc'
          : 'Giao tiêu chuẩn từ 3–5 ngày làm việc',
    };

    // Store in localStorage
    try {
      const existingOrdersStr = localStorage.getItem('plantify_orders');
      const existingOrders: Order[] = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
      localStorage.setItem('plantify_orders', JSON.stringify([newOrder, ...existingOrders]));
      localStorage.setItem('plantify_last_order', JSON.stringify(newOrder));
    } catch {
      // ignore
    }

    // Clear cart and redirect
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation?orderId=${orderId}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">Không có sản phẩm nào để thanh toán</h2>
        <Link to="/shop" className="btn-primary">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-10">
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary mb-2 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Quay lại giỏ hàng
        </Link>
        <h1 className="font-serif text-3xl font-bold text-text-main">
          Thanh Toán & Đặt Hàng
        </h1>
        <p className="text-text-secondary text-sm">
          Vui lòng nhập địa chỉ nhận hàng để chúng tôi chuẩn bị đóng gói cây cẩn thận gửi đến bạn.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main checkout form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact info */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-serif text-lg font-bold text-text-main flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-sans">
                  1
                </span>
                Thông tin người nhận
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-main mb-1">
                    Họ và tên người nhận *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className={`input-field text-sm ${errors.fullName ? 'border-red-400' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-main mb-1">
                    Số điện thoại liên hệ *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className={`input-field text-sm ${errors.phone ? 'border-red-400' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-main mb-1">
                    Email nhận thông báo đơn hàng *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className={`input-field text-sm ${errors.email ? 'border-red-400' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-serif text-lg font-bold text-text-main flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-sans">
                  2
                </span>
                Địa chỉ giao hàng
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-main mb-1">
                    Tỉnh / Thành phố *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Hà Nội"
                    className={`input-field text-sm ${errors.city ? 'border-red-400' : ''}`}
                  />
                  {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-main mb-1">
                    Quận / Huyện *
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Ba Đình"
                    className={`input-field text-sm ${errors.district ? 'border-red-400' : ''}`}
                  />
                  {errors.district && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.district}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-main mb-1">
                    Phường / Xã *
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="Cống Vị"
                    className={`input-field text-sm ${errors.ward ? 'border-red-400' : ''}`}
                  />
                  {errors.ward && <p className="text-[11px] text-red-500 mt-1">{errors.ward}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-text-main mb-1">
                    Địa chỉ cụ thể (Số nhà, ngõ, tên đường) *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số 12, ngõ 34, phố Liễu Giai"
                    className={`input-field text-sm ${errors.address ? 'border-red-400' : ''}`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-text-main mb-1">
                    Ghi chú giao hàng (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ví dụ: Giao trong giờ hành chính, gọi trước khi đến..."
                    className="input-field text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Option */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-serif text-lg font-bold text-text-main flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-sans">
                  3
                </span>
                Phương thức vận chuyển
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryOption === 'standard'
                      ? 'border-primary bg-sage/30 ring-1 ring-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryOption === 'standard'}
                    onChange={() => setDeliveryOption('standard')}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between font-semibold text-sm text-text-main">
                      <span>Giao hàng Tiêu chuẩn</span>
                      <span>{subtotal >= 500000 ? 'MIỄN PHÍ' : '30.000 ₫'}</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      Thời gian 3–5 ngày làm việc. Thùng carton giữ ẩm và chống sốc chuyên dụng cho cây.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryOption === 'express'
                      ? 'border-primary bg-sage/30 ring-1 ring-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryOption === 'express'}
                    onChange={() => setDeliveryOption('express')}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between font-semibold text-sm text-text-main">
                      <span>Giao hỏa tốc 24h</span>
                      <span>60.000 ₫</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      Nhận cây trong 24–48h. Xe vận chuyển chuyên dụng điều hòa nhiệt độ tối ưu.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Methods */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-serif text-lg font-bold text-text-main flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-sans">
                  4
                </span>
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-primary bg-sage/30 ring-1 ring-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <Banknote className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-text-main">
                      Thanh toán khi nhận hàng (COD)
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Bạn được mở thùng đồng kiểm tra cây cảnh tươi khỏe trước khi thanh toán tiền mặt.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank-transfer'
                      ? 'border-primary bg-sage/30 ring-1 ring-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank-transfer'}
                    onChange={() => setPaymentMethod('bank-transfer')}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <CreditCard className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-text-main">
                      Chuyển khoản ngân hàng (Quét mã VietQR 24/7)
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Chuyển tiền nhanh chóng, tự động xác nhận đơn hàng không cần gửi ảnh sao kê.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'e-wallet'
                      ? 'border-primary bg-sage/30 ring-1 ring-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'e-wallet'}
                    onChange={() => setPaymentMethod('e-wallet')}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <QrCode className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-text-main">
                      Ví điện tử (MoMo / ZaloPay / ShopeePay)
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Thanh toán tiện lợi qua ứng dụng ví điện tử yêu thích của bạn.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right sidebar: Order summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-text-main border-b border-gray-100 pb-4">
                Xem lại đơn hàng ({items.length} món)
              </h3>

              <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 pr-2">
                {items.map((item) => {
                  const price = item.product.salePrice ?? item.product.price;
                  return (
                    <div
                      key={`${item.product.id}-${item.selectedPot?.id ?? 'default'}`}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-sage/30 flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-text-main line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-text-secondary">
                            SL: {item.quantity} • {item.selectedPot?.name ?? 'Chậu tiêu chuẩn'}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-text-main">
                        {formatVND(price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2.5 text-sm pt-4 border-t border-gray-100">
                <div className="flex justify-between text-text-secondary">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-text-main">{formatVND(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Mã giảm ({discountCode})</span>
                    <span className="font-semibold">-{formatVND(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-text-secondary">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-text-main">
                    {shippingCost === 0 ? 'MIỄN PHÍ' : formatVND(shippingCost)}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="font-bold text-base text-text-main">Tổng thanh toán</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    {formatVND(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-base shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Xác nhận đặt hàng ({formatVND(totalAmount)})</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-text-secondary text-center space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Mã hóa bảo mật thông tin chuẩn SSL 256-bit
                </p>
                <p>Bằng việc nhấn đặt hàng, bạn đồng ý với các Điều khoản & Chính sách của PLANTIFY.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
