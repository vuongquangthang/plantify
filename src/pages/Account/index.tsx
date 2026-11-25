import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Package, Heart, Camera, MapPin, LogOut,
  Edit2, Save, X, ChevronDown, ChevronUp, Plus,
  Eye, EyeOff, ShoppingCart, Trash2, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import PageHeader from '../../components/common/PageHeader';
import type { Order, ARDesign, Address } from '../../types';

type AccountTab = 'profile' | 'orders' | 'wishlist' | 'ar-designs' | 'addresses';

// ─── Auth Forms ─────────────────────────────────────────────────────────────

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Vui lòng điền đầy đủ email và mật khẩu.'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    login({ id: Date.now().toString(), name: email.split('@')[0], email, phone: '', addresses: [], orders: [], savedDesigns: [] }, remember);
    setLoading(false);
    navigate('/account');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="ban@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
        <div className="relative">
          <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="••••••••" />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
          <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
        </label>
        <button type="button" className="text-sm text-green-700 hover:underline">Quên mật khẩu?</button>
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60">
        {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
      </button>
      <p className="text-center text-sm text-gray-500">
        Chưa có tài khoản?{' '}
        <button type="button" onClick={onSwitch} className="text-green-700 font-semibold hover:underline">Đăng ký ngay</button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Họ và tên không được để trống.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Vui lòng nhập email hợp lệ.';
    if (form.password.length < 6) e.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    if (form.password !== form.confirm) e.confirm = 'Mật khẩu xác nhận không khớp.';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    login({ id: Date.now().toString(), name: form.name, email: form.email, phone: '', addresses: [], orders: [], savedDesigns: [] }, true);
    setLoading(false);
    navigate('/account');
  };

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={key.includes('password') || key === 'confirm' ? (showPw ? 'text' : 'password') : type}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className={`w-full border ${errors[key] ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          placeholder={placeholder}
        />
        {(key === 'password' || key === 'confirm') && (
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {field('name', 'Họ và tên', 'text', 'Nguyễn Văn A')}
      {field('email', 'Địa chỉ Email', 'email', 'ban@example.com')}
      {field('password', 'Mật khẩu', 'password', '••••••••')}
      {field('confirm', 'Xác nhận mật khẩu', 'password', '••••••••')}
      <button type="submit" disabled={loading}
        className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60">
        {loading ? 'Đang tạo tài khoản…' : 'Đăng ký tài khoản'}
      </button>
      <p className="text-center text-sm text-gray-500">
        Đã có tài khoản?{' '}
        <button type="button" onClick={onSwitch} className="text-green-700 font-semibold hover:underline">Đăng nhập ngay</button>
      </p>
    </form>
  );
}

// ─── Dashboard Tabs ──────────────────────────────────────────────────────────

function ProfileTab() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' });

  const save = () => { updateUser(form); setEditing(false); };

  const fieldLabels: Record<string, string> = {
    name: 'Họ và tên',
    email: 'Địa chỉ Email',
    phone: 'Số điện thoại',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Thông tin cá nhân</h2>
        {!editing
          ? <button onClick={() => setEditing(true)} className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 font-medium">
              <Edit2 size={15} /> Chỉnh sửa
            </button>
          : <div className="flex gap-2">
              <button onClick={save} className="flex items-center gap-1 text-sm bg-green-800 text-white px-3 py-1.5 rounded-lg hover:bg-green-900">
                <Save size={14} /> Lưu
              </button>
              <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-sm border border-gray-300 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50">
                <X size={14} /> Hủy
              </button>
            </div>
        }
      </div>
      <div className="flex items-center gap-4 mb-8 p-4 bg-green-50 rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center text-white text-2xl font-bold">
          {(user?.name ?? 'U')[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg">{user?.name}</p>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>
      <div className="space-y-5">
        {(['name', 'email', 'phone'] as const).map(k => (
          <div key={k}>
            <label className="block text-sm font-medium text-gray-600 mb-1">{fieldLabels[k]}</label>
            {editing
              ? <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                  type={k === 'email' ? 'email' : 'text'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              : <p className="text-gray-800 font-medium py-2.5 px-4 bg-gray-50 rounded-xl">{form[k] || <span className="text-gray-400">Chưa thiết lập</span>}</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('plantify_last_order');
      if (stored) setOrders([JSON.parse(stored)]);
    } catch { /* ignore */ }
    try {
      const all = localStorage.getItem('plantify_orders');
      if (all) setOrders(JSON.parse(all));
    } catch { /* ignore */ }
  }, []);

  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700' },
    confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700' },
    shipping: { label: 'Đang vận chuyển', color: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Đã giao thành công', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
  };

  if (!orders.length) return (
    <div className="text-center py-16">
      <Package size={48} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Chưa có đơn hàng nào</h3>
      <p className="text-gray-500 text-sm mb-6">Đơn hàng của bạn sẽ xuất hiện tại đây khi bạn hoàn tất đặt mua cây cảnh.</p>
      <Link to="/shop" className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-900 transition-colors">
        Khám phá cửa hàng <ArrowRight size={16} />
      </Link>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Đơn hàng của tôi</h2>
      <div className="space-y-4">
        {orders.map(order => {
          const st = statusMap[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-600' };
          return (
            <div key={order.id} className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">#{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>
                    {st.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">{order.total.toLocaleString('vi-VN')} ₫</span>
                  {expanded === order.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </div>
              {expanded === order.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="space-y-3">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={item.product?.images?.[0]} alt={item.product?.name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{item.product?.name}</p>
                          <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">{((item.product?.salePrice ?? item.product?.price ?? 0) * item.quantity).toLocaleString('vi-VN')} ₫</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 text-sm space-y-1">
                    <div className="flex justify-between text-gray-600"><span>Phí vận chuyển</span><span>{order.shippingFee.toLocaleString('vi-VN')} ₫</span></div>
                    {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Khuyến mãi</span><span>-{order.discount.toLocaleString('vi-VN')} ₫</span></div>}
                    <div className="flex justify-between font-bold text-gray-900 pt-1"><span>Tổng thanh toán</span><span>{order.total.toLocaleString('vi-VN')} ₫</span></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WishlistTab() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!items.length) return (
    <div className="text-center py-16">
      <Heart size={48} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Danh sách yêu thích đang trống</h3>
      <p className="text-gray-500 text-sm mb-6">Lưu lại những chậu cây bạn yêu thích để dễ dàng tham khảo và mua sắm sau.</p>
      <Link to="/shop" className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-900 transition-colors">
        Khám phá cây cảnh <ArrowRight size={16} />
      </Link>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Cây cảnh yêu thích <span className="text-gray-400 font-normal text-base">({items.length})</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(product => (
          <div key={product.id} className="border border-gray-200 rounded-2xl p-4 flex gap-4 items-start hover:shadow-sm transition-shadow">
            <Link to={`/shop/${product.slug}`}>
              <img src={product.images?.[0]} alt={product.name}
                className="w-20 h-20 rounded-xl object-cover bg-gray-100 hover:opacity-90 transition-opacity" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/shop/${product.slug}`} className="font-semibold text-gray-800 text-sm hover:text-green-700 line-clamp-2">{product.name}</Link>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-green-700 font-bold text-sm">{(product.salePrice ?? product.price).toLocaleString('vi-VN')} ₫</span>
                {product.salePrice && <span className="text-gray-400 line-through text-xs">{product.price.toLocaleString('vi-VN')} ₫</span>}
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => addToCart(product, 1)}
                  className="flex items-center gap-1.5 bg-green-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-green-900 transition-colors">
                  <ShoppingCart size={12} /> Thêm vào giỏ
                </button>
                <button onClick={() => removeFromWishlist(product.id)}
                  className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors">
                  <Trash2 size={12} /> Bỏ thích
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ARDesignsTab() {
  const [designs, setDesigns] = useState<ARDesign[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('plantify_ar_designs');
      if (stored) setDesigns(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  if (!designs.length) return (
    <div className="text-center py-16">
      <Camera size={48} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Chưa có thiết kế AR nào được lưu</h3>
      <p className="text-gray-500 text-sm mb-6">Trải nghiệm AR để ướm thử cây trong không gian phòng và lưu lại các thiết kế ấn tượng.</p>
      <Link to="/ar" className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-900 transition-colors">
        Trải nghiệm AR ngay <Camera size={16} />
      </Link>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Không gian AR đã lưu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {designs.map(design => (
          <div key={design.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            {design.screenshot
              ? <img src={design.screenshot} alt={design.productName} className="w-full h-40 object-cover" />
              : <div className="w-full h-40 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                  <Camera size={32} className="text-green-600 opacity-50" />
                </div>
            }
            <div className="p-4">
              <p className="font-semibold text-gray-800">{design.productName}</p>
              {design.potOption && <p className="text-sm text-gray-500 mt-0.5">Kiểu chậu: {design.potOption.name}</p>}
              <p className="text-xs text-gray-400 mt-1">{new Date(design.createdAt).toLocaleDateString('vi-VN')}</p>
              <Link to="/ar" className="mt-3 flex items-center gap-2 text-sm text-green-700 font-medium hover:text-green-900">
                Xem lại trong AR <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  const { user, updateUser } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses ?? []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Address, 'id' | 'isDefault'>>({ fullName: '', phone: '', address: '', city: '', district: '', ward: '' });

  const addAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = { ...form, id: Date.now().toString(), isDefault: addresses.length === 0 };
    const updated = [...addresses, newAddr];
    setAddresses(updated);
    updateUser({ addresses: updated });
    setShowForm(false);
    setForm({ fullName: '', phone: '', address: '', city: '', district: '', ward: '' });
  };

  const remove = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    updateUser({ addresses: updated });
  };

  const labelMap: Record<string, string> = {
    fullName: 'Họ và tên người nhận',
    phone: 'Số điện thoại',
    address: 'Địa chỉ cụ thể (Số nhà, tên đường)',
    city: 'Tỉnh / Thành phố',
    district: 'Quận / Huyện',
    ward: 'Phường / Xã',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Sổ địa chỉ nhận hàng</h2>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-sm bg-green-800 text-white px-4 py-2 rounded-xl hover:bg-green-900 transition-colors">
          <Plus size={15} /> Thêm địa chỉ mới
        </button>
      </div>

      {showForm && (
        <form onSubmit={addAddress} className="mb-6 p-5 bg-green-50 rounded-2xl space-y-4 border border-green-100">
          <h3 className="font-semibold text-gray-800">Địa chỉ giao hàng mới</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['fullName', 'phone', 'address', 'city', 'district', 'ward'] as const).map(k => (
              <div key={k} className={k === 'address' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {labelMap[k]}
                </label>
                <input required value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" className="bg-green-800 text-white text-sm px-5 py-2 rounded-xl hover:bg-green-900 transition-colors font-medium">Lưu địa chỉ</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-gray-300 text-gray-600 text-sm px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
          </div>
        </form>
      )}

      {!addresses.length && !showForm ? (
        <div className="text-center py-12">
          <MapPin size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">Chưa có địa chỉ giao hàng nào được lưu.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map(addr => (
            <div key={addr.id} className="border border-gray-200 rounded-2xl p-4 flex justify-between items-start">
              <div>
                {addr.isDefault && <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full mb-2 inline-block">Mặc định</span>}
                <p className="font-semibold text-gray-800">{addr.fullName}</p>
                <p className="text-sm text-gray-500 mt-0.5">{addr.phone}</p>
                <p className="text-sm text-gray-600 mt-0.5">{addr.address}, {addr.ward}, {addr.district}, {addr.city}</p>
              </div>
              <button onClick={() => remove(addr.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Xóa địa chỉ">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');

  const tabs: { key: AccountTab; label: string; icon: React.ReactNode }[] = [
    { key: 'profile', label: 'Hồ sơ cá nhân', icon: <User size={18} /> },
    { key: 'orders', label: 'Đơn mua', icon: <Package size={18} /> },
    { key: 'wishlist', label: 'Yêu thích', icon: <Heart size={18} /> },
    { key: 'ar-designs', label: 'Thiết kế AR', icon: <Camera size={18} /> },
    { key: 'addresses', label: 'Sổ địa chỉ', icon: <MapPin size={18} /> },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF9F4] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Demo notice */}
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 text-center">
            🧪 <strong>Chế độ trải nghiệm nhanh</strong> — Bạn có thể đăng nhập bằng bất kỳ email & mật khẩu nào.
          </div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(['login', 'register'] as const).map(mode => (
                <button key={mode} onClick={() => setAuthMode(mode)}
                  className={`flex-1 py-4 text-sm font-semibold transition-colors ${authMode === mode ? 'text-green-800 border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700'}`}>
                  {mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
                </button>
              ))}
            </div>
            <div className="p-8">
              {authMode === 'login'
                ? <LoginForm onSwitch={() => setAuthMode('register')} />
                : <RegisterForm onSwitch={() => setAuthMode('login')} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F4]">
      {/* Page Header */}
      <PageHeader
        badge="Tài khoản cá nhân"
        badgeIcon={<User className="w-3 h-3 text-emerald-300" />}
        title="Tài Khoản Của Tôi"
        description="Quản lý hồ sơ, đơn hàng và các thiết kế AR yêu thích của bạn."
        breadcrumbs={[{ label: 'Tài khoản' }]}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-1 sticky top-24">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                    activeTab === tab.key
                      ? 'bg-green-800 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <button onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left">
                  <LogOut size={18} /> Đăng xuất
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-2xl shadow-sm p-6 lg:p-8 min-h-96">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'wishlist' && <WishlistTab />}
            {activeTab === 'ar-designs' && <ARDesignsTab />}
            {activeTab === 'addresses' && <AddressesTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
