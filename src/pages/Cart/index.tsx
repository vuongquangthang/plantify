import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Tag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { formatVND } from '../../utils/format';
import PageHeader from '../../components/common/PageHeader';

export default function Cart() {
  const {
    items,
    totalItems,
    discountCode,
    discountAmount,
    updateQuantity,
    removeFromCart,
    applyDiscount,
    removeDiscount,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const { success, warning } = useNotification();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingFee = subtotal >= 500000 || items.length === 0 ? 0 : 30000;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const ok = applyDiscount(inputCode.trim());
    if (ok) {
      success(`Áp dụng mã giảm giá "${inputCode.trim()}" thành công!`);
      setInputCode('');
      setCodeError('');
    } else {
      setCodeError('Mã không hợp lệ. Gợi ý: PLANTIFY10, XANH20 hoặc WELCOME15');
      warning('Mã giảm giá không hợp lệ');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-text-main mb-3">
            Giỏ Hàng Của Bạn Đang Trống
          </h2>
          <p className="text-text-secondary text-sm mb-8">
            Có vẻ như bạn chưa chọn thêm người bạn thực vật nào. Hãy khám phá bộ sưu tập cây cảnh tuyệt đẹp của chúng tôi nhé!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="btn-primary">
              Khám phá cây cảnh
            </Link>
            <Link to="/ar" className="btn-secondary">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Thử đặt cây trong phòng (AR)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        badge="Giỏ hàng của bạn"
        badgeIcon={<ShoppingBag className="w-3 h-3 text-emerald-300" />}
        title="Giỏ Hàng Mua Sắm"
        description={`Bạn đang có ${totalItems} sản phẩm cây cảnh trong giỏ hàng.`}
        breadcrumbs={[{ label: 'Giỏ hàng' }]}
      />

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="divide-y divide-gray-100">
            {items.map((item) => {
              const currentPrice = item.product.salePrice ?? item.product.price;
              const itemTotal = currentPrice * item.quantity;
              const potKey = item.selectedPot?.id;

              return (
                <div
                  key={`${item.product.id}-${potKey ?? 'default'}`}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/shop/${item.product.slug}`}
                      className="w-20 h-20 rounded-2xl overflow-hidden bg-sage/30 flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/shop/${item.product.slug}`}
                        className="font-semibold text-text-main hover:text-primary transition-colors text-base"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-text-secondary">
                        {item.selectedPot ? (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.selectedPot.color }}
                            />
                            {item.selectedPot.name}
                          </span>
                        ) : (
                          <span>Chậu nhựa ươm tiêu chuẩn</span>
                        )}
                        <span>•</span>
                        <span>{item.product.height}</span>
                      </div>
                      <div className="text-sm font-semibold text-primary mt-1">
                        {formatVND(currentPrice)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0">
                    {/* Stepper */}
                    <div className="flex items-center border border-gray-200 rounded-full bg-gray-50/50 p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1, potKey)
                        }
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-text-main shadow-xs hover:bg-gray-100 transition-colors"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-semibold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1, potKey)
                        }
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-text-main shadow-xs hover:bg-gray-100 transition-colors"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="w-24 text-right font-bold text-text-main text-sm">
                      {formatVND(itemTotal)}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id, potKey)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Xóa khỏi giỏ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              to="/shop"
              className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5"
            >
              ← Tiếp tục mua sắm
            </Link>

            <Link
              to="/ar"
              className="text-xs bg-sage/80 hover:bg-sage text-primary font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Thử đặt cây trong phòng (AR)
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-serif text-xl font-bold text-text-main border-b border-gray-100 pb-4">
              Tóm Tắt Đơn Hàng
            </h3>

            {/* Subtotal */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Tạm tính</span>
                <span className="font-semibold text-text-main">{formatVND(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Giảm giá ({discountCode})
                  </span>
                  <span className="font-semibold">-{formatVND(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-text-secondary">
                <span>Phí vận chuyển</span>
                <span className="font-semibold text-text-main">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">MIỄN PHÍ</span>
                  ) : (
                    formatVND(shippingFee)
                  )}
                </span>
              </div>
              {subtotal < 500000 && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-xl leading-relaxed">
                  💡 Mua thêm <strong>{formatVND(500000 - subtotal)}</strong> để được <strong>MIỄN PHÍ vận chuyển</strong> toàn quốc!
                </p>
              )}

              <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                <span className="font-bold text-base text-text-main">Tổng thanh toán</span>
                <span className="font-serif text-2xl font-bold text-primary">
                  {formatVND(finalTotal)}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2">
              {discountCode ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-800">
                  <span>Mã đang dùng: <strong>{discountCode}</strong></span>
                  <button
                    onClick={removeDiscount}
                    className="text-red-500 font-semibold hover:underline text-xs"
                  >
                    Bỏ mã
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Mã giảm giá (ví dụ: WELCOME15)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-text-main text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {codeError && (
                    <p className="text-[11px] text-red-500">{codeError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary py-3.5 text-base shadow-md flex items-center justify-center gap-2"
            >
              <span>Tiến hành thanh toán</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Guarantees */}
          <div className="bg-sage/40 rounded-2xl p-4 space-y-2.5 text-xs text-text-secondary">
            <div className="flex items-center gap-2 text-text-main font-medium">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Cam kết cây khỏe mạnh 100% khi nhận</span>
            </div>
            <div className="flex items-center gap-2 text-text-main font-medium">
              <Truck className="w-4 h-4 text-primary" />
              <span>Đổi trả miễn phí trong 30 ngày nếu cây hư tổn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
