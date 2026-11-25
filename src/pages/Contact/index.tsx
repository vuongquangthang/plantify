import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronDown,
  CheckCircle2,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'Tính năng thực tế tăng cường (AR) xem trước cây cảnh hoạt động như thế nào trên điện thoại hoặc máy tính?',
    answer:
      'Trải nghiệm AR của PLANTIFY được vận hành bởi WebXR và Google Model-Viewer. Trên điện thoại thông minh (iOS Safari với Quick Look và Android Chrome với Scene Viewer / WebXR), bạn chỉ cần chạm vào "Trải nghiệm AR" và cấp quyền camera để đặt mô hình cây 3D với tỷ lệ thật 1:1 ngay trên sàn nhà hoặc bàn làm việc. Với máy tính bàn hoặc laptop không có camera AR, hệ thống sẽ tự động chuyển sang chế độ xem mô hình 3D tương tác 360 độ.',
  },
  {
    question: 'Tôi có thể đổi trả hoặc bảo hành cây cảnh nếu không vừa ý không?',
    answer:
      'Có! Chúng tôi áp dụng Chính sách bảo hành cây xanh 30 ngày. Nếu cây cảnh của bạn bị hư hại do vận chuyển, héo úa hoặc yếu rễ trong vòng 30 ngày kể từ khi nhận hàng, bạn chỉ cần chụp ảnh và liên hệ bộ phận hỗ trợ. Chúng tôi sẽ gửi đổi một cây mới khỏe đẹp hoàn toàn miễn phí hoặc hoàn tiền 100%.',
  },
  {
    question: 'Cây cảnh được đóng gói như thế nào để đảm bảo an toàn khi vận chuyển toàn quốc?',
    answer:
      'Chúng tôi sử dụng quy cách đóng gói chuyên dụng bằng thùng carton lượn sóng chịu lực, có đai nẹp giữ ẩm bầu đất và khung cố định thân cây chống xô lệch. Cây và chậu được gia cố chắc chắn, thoáng khí và có lớp cách nhiệt đặc biệt giúp bảo vệ lá cây khỏi thay đổi nhiệt độ trong suốt hành trình.',
  },
  {
    question: 'Plantify có giao hàng tận nơi trên toàn quốc không?',
    answer:
      'Có, PLANTIFY hỗ trợ giao hàng tận nơi tới tất cả 63 tỉnh thành trên toàn quốc. Đơn hàng tại nội thành Hà Nội, TP.HCM, Đà Nẵng có dịch vụ giao hỏa tốc 24–48 giờ. Các tỉnh thành khác thời gian giao từ 2–4 ngày làm việc. Đặc biệt, miễn phí vận chuyển tiêu chuẩn cho mọi đơn hàng từ 500.000 ₫.',
  },
  {
    question: 'Tôi nên tưới nước cho cây mới mua với tần suất như thế nào?',
    answer:
      'Mỗi trang chi tiết sản phẩm đều cung cấp hướng dẫn tưới nước cụ thể: các dòng cây chịu hạn tốt như Lưỡi Hổ hay Kim Tiền chỉ cần tưới 2–3 tuần một lần; các loài cây nhiệt đới như Trầu Bà Nam Mỹ hay Lan Ý ưa ẩm hơn và nên tưới 1–2 lần mỗi tuần. Luôn kiểm tra độ ẩm bề mặt đất sâu khoảng 2–3 cm trước khi tưới.',
  },
  {
    question: 'Tôi có thể nhờ chuyên gia tư vấn cách chăm sóc cây sau khi mua không?',
    answer:
      'Chắc chắn rồi! Mọi khách hàng của PLANTIFY đều được hưởng dịch vụ Bác sĩ Cây Cảnh trọn đời miễn phí. Bạn có thể gửi hình ảnh tình trạng cây (vàng lá, đốm lá, thiếu sáng, sâu bệnh) qua Email hoặc Hotline, các chuyên gia thực vật học của chúng tôi sẽ phản hồi chẩn đoán và hướng dẫn khắc phục trong vòng 24 giờ.',
  },
];

export default function Contact() {
  const { success } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Vui lòng nhập họ và tên của bạn';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = 'Vui lòng nhập địa chỉ email hợp lệ';
    if (!formData.message.trim() || formData.message.length < 10)
      errs.message = 'Nội dung tin nhắn cần có ít nhất 10 ký tự';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    success('Tin nhắn đã được gửi thành công! Chuyên gia của chúng tôi sẽ phản hồi trong 24 giờ.');
    setFormData({ name: '', email: '', subject: 'general', message: '' });
  };

  return (
    <div>
      <PageHeader
        badge="Trung tâm hỗ trợ"
        title="Liên Hệ Với PLANTIFY"
        description="Đội ngũ chuyên gia thực vật và kỹ thuật luôn sẵn sàng lắng nghe, tư vấn và hỗ trợ bạn mọi lúc."
        breadcrumbs={[{ label: 'Liên hệ' }]}
      />

      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-serif text-2xl font-bold text-text-main mb-6">
            Gửi tin nhắn cho chúng tôi
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                Cảm ơn bạn! Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-text-main mb-1.5">
                  Họ và tên của bạn *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Trần Minh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`input-field text-sm ${errors.name ? 'border-red-400' : ''}`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-main mb-1.5">
                  Địa chỉ Email *
                </label>
                <input
                  type="email"
                  placeholder="Ví dụ: minh@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`input-field text-sm ${errors.email ? 'border-red-400' : ''}`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-main mb-1.5">
                Chủ đề / Vấn đề cần hỗ trợ *
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="input-field text-sm bg-white"
              >
                <option value="general">Tư vấn chung & Hỏi đáp</option>
                <option value="ar-support">Hỗ trợ kỹ thuật & Trải nghiệm AR</option>
                <option value="order">Tra cứu đơn hàng & Tình trạng vận chuyển</option>
                <option value="plant-care">Tư vấn chăm sóc & Bác sĩ cây cảnh</option>
                <option value="partnership">Hợp tác kinh doanh & Mua sỉ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-main mb-1.5">
                Nội dung tin nhắn *
              </label>
              <textarea
                rows={5}
                placeholder="Bạn cần chuyên gia Plantify hỗ trợ điều gì hôm nay?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`input-field text-sm resize-none ${
                  errors.message ? 'border-red-400' : ''
                }`}
              />
              {errors.message && (
                <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Gửi tin nhắn ngay</span>
            </button>
          </form>
        </div>

        {/* Contact Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
            <h2 className="font-serif text-xl font-bold text-text-main">
              Studio Trải nghiệm & Trụ sở
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-sm">Showroom Trải nghiệm Thực tế</h4>
                  <p className="text-text-secondary text-xs mt-0.5">
                    45 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội, Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-sm">Hotline Chăm sóc Khách hàng</h4>
                  <p className="text-text-secondary text-xs mt-0.5">
                    +84 24 3828 8899 (Miễn phí từ 8:00 – 21:00 hàng ngày)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-sm">Email Tư vấn Thực vật</h4>
                  <p className="text-text-secondary text-xs mt-0.5">
                    care@plantify.vn / hotro@plantify.vn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-sm">Thời gian mở cửa Studio</h4>
                  <p className="text-text-secondary text-xs mt-0.5">
                    Thứ Hai – Thứ Bảy: 8:30 – 20:30<br />
                    Chủ Nhật: 9:00 – 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Kết nối với cộng đồng yêu cây xanh
              </h4>
              <div className="flex gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-50 hover:bg-sage text-primary rounded-xl transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-50 hover:bg-sage text-primary rounded-xl transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-50 hover:bg-sage text-primary rounded-xl transition-colors"
                  aria-label="Youtube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold bg-sage px-3 py-1 rounded-full">
            Giải đáp thắc mắc
          </span>
          <h2 className="font-serif text-3xl font-bold text-text-main mt-3">
            Câu hỏi thường gặp (FAQ)
          </h2>
          <p className="text-text-secondary text-sm mt-1">
            Tìm câu trả lời nhanh chóng cho các thắc mắc phổ biến về cây cảnh, tính năng AR và giao nhận hàng.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-text-main hover:text-primary transition-colors text-sm sm:text-base"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed border-t border-gray-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
  );
}
