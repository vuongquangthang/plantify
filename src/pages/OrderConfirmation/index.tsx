import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle,
  Package,
  Calendar,
  MapPin,
  Sparkles,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { formatVND } from '../../utils/format';
import type { Order } from '../../types';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('plantify_last_order');
      if (stored) {
        const parsed = JSON.parse(stored) as Order;
        if (!orderId || parsed.id === orderId) {
          setOrder(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, [orderId]);

  const paymentLabels: Record<string, string> = {
    cod: 'Thanh toán khi nhận hàng (COD)',
    'bank-transfer': 'Chuyển khoản ngân hàng (VietQR)',
    'e-wallet': 'Ví điện tử',
  };

  return (
    <div className="container-custom py-14 max-w-4xl">
      {/* Header status */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <span className="badge badge-sale bg-emerald-100 text-emerald-800 text-xs px-3 py-1 mb-2">
          Đặt Hàng Thành Công
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-main mt-1">
          Cảm Ơn Bạn Đã Chọn PLANTIFY!
        </h1>
        <p className="text-text-secondary mt-2 text-sm max-w-md mx-auto">
          Chúng tôi đã tiếp nhận đơn hàng{' '}
          <strong className="text-text-main">#{order?.id ?? orderId ?? 'PLT-789012'}</strong> của bạn.
          Thông tin chi tiết đơn hàng đã được gửi qua email.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-8">
        {/* Progress tracker */}
        <div className="py-4 border-b border-gray-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">
            Trạng thái đơn hàng
          </h3>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-0 w-1/4 h-1 bg-primary -translate-y-1/2 z-0" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <span className="text-[11px] font-semibold text-primary mt-2">Đã tiếp nhận</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="text-[11px] font-medium text-text-main mt-2">Đang dưỡng & đóng gói</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-[11px] text-text-secondary mt-2">Đang giao hàng</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold">
                4
              </div>
              <span className="text-[11px] text-text-secondary mt-2">Đã nhận cây</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-1 bg-cream/70 p-4 rounded-2xl">
            <span className="text-xs text-text-secondary flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-primary" /> Dự kiến giao hàng
            </span>
            <p className="font-semibold text-text-main text-sm">
              {order?.estimatedDelivery ?? 'Trong 2–4 ngày làm việc'}
            </p>
          </div>

          <div className="space-y-1 bg-cream/70 p-4 rounded-2xl">
            <span className="text-xs text-text-secondary flex items-center gap-1.5 font-medium">
              <Package className="w-4 h-4 text-primary" /> Hình thức thanh toán
            </span>
            <p className="font-semibold text-text-main text-sm">
              {order?.paymentMethod ? paymentLabels[order.paymentMethod] : 'Thanh toán khi nhận hàng (COD)'}
            </p>
          </div>

          <div className="space-y-1 bg-cream/70 p-4 rounded-2xl sm:col-span-2 md:col-span-1">
            <span className="text-xs text-text-secondary flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-primary" /> Địa chỉ giao tới
            </span>
            <p className="font-semibold text-text-main text-sm">
              {order?.shippingAddress?.fullName ?? 'Khách hàng thân thiết'}
            </p>
            <p className="text-xs text-text-secondary line-clamp-1">
              {order?.shippingAddress?.address ?? '45 Tràng Tiền, Hà Nội'}
            </p>
          </div>
        </div>

        {/* Ordered items */}
        {order?.items && order.items.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-serif text-lg font-bold text-text-main">
              Cây cảnh trong đơn hàng này
            </h3>
            <div className="divide-y divide-gray-100">
              {order.items.map((item, idx) => {
                const price = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-2xl object-cover bg-sage/30"
                      />
                      <div>
                        <h4 className="font-semibold text-text-main text-sm">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-text-secondary">
                          Số lượng: {item.quantity} • {item.selectedPot?.name ?? 'Chậu tiêu chuẩn'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-text-main text-sm">
                        {formatVND(price * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-1.5 text-sm max-w-xs ml-auto">
              <div className="flex justify-between text-text-secondary">
                <span>Tạm tính</span>
                <span>{formatVND(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Mã giảm giá</span>
                  <span>-{formatVND(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-text-secondary">
                <span>Phí vận chuyển</span>
                <span>{order.shippingFee === 0 ? 'MIỄN PHÍ' : formatVND(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-text-main pt-2 border-t border-gray-100">
                <span>Tổng số tiền</span>
                <span className="text-primary font-serif text-xl">
                  {formatVND(order.total)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Post-purchase AR preview tip */}
        <div className="bg-gradient-to-r from-sage/50 to-cream p-5 rounded-2xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-text-main">
                Trong lúc chờ cây giao tới, bạn muốn tìm góc đặt đẹp nhất?
              </h4>
              <p className="text-xs text-text-secondary">
                Hãy mở tính năng thực tế ảo AR để ướm thử vị trí đặt chậu cây trong phòng khách hoặc phòng làm việc nhé.
              </p>
            </div>
          </div>
          <Link to="/ar" className="btn-secondary text-xs py-2 px-4 whitespace-nowrap">
            Mở xem phòng qua AR
          </Link>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to="/shop" className="btn-primary w-full sm:w-auto">
            <ShoppingBag className="w-4 h-4" />
            <span>Tiếp tục mua sắm</span>
          </Link>
          <Link to="/account?tab=orders" className="btn-secondary w-full sm:w-auto">
            <span>Xem lịch sử đơn hàng</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
