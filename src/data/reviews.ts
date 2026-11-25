import type { ProductReview } from '../types';

export const reviews: ProductReview[] = [
  // Monstera Deliciosa reviews
  {
    id: 'r1',
    productId: '1',
    author: 'Nguyễn Phương Linh',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment:
      'Cây thực tế đẹp ngỡ ngàng luôn ạ! Đóng gói cực kỳ cẩn thận, tán lá xẻ to và bóng mướt không hề bị gãy dập chiếc lá nào. Mình chọn chậu màu xanh Sage để ở góc sofa phòng khách nhìn sang trọng hẳn ra. Dịch vụ chăm sóc khách hàng tư vấn rất nhiệt tình!',
    date: '2024-01-20',
    verified: true,
    images: ['https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&q=80'],
  },
  {
    id: 'r2',
    productId: '1',
    author: 'Trần Đức Minh',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment:
      'Tính năng thực tế ảo AR đỉnh thật sự! Mình bật camera điện thoại ướm thử vào góc phòng khách xem vừa vặn không rồi mới chốt mua. Cây giao đến y hệt như lúc nhìn qua AR, mới 2 tuần mà đã bung nở thêm 1 búp lá non mới.',
    date: '2024-01-25',
    verified: true,
  },
  {
    id: 'r3',
    productId: '1',
    author: 'Vũ Thu Hằng',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    comment:
      'Cây rất khỏe và tươi tắn. Hộp vận chuyển chuyên nghiệp, đất ẩm vừa vặn không bị vương vãi ra ngoài. Thiệp hướng dẫn chăm sóc kèm theo ghi chi tiết từng bước, người mới tập chơi cây như mình đọc hiểu ngay.',
    date: '2024-02-02',
    verified: true,
  },
  // Snake Plant reviews
  {
    id: 'r4',
    productId: '2',
    author: 'Phạm Hoàng Nam',
    avatar: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    comment:
      'Chậu Lưỡi Hổ ưng ý nhất từ trước tới giờ. Mình hay phải đi công tác xa cả tuần, cây hầu như tự sống khỏe re không cần bận tâm nhiều. Đặt trong phòng ngủ cảm giác không khí trong lành, ngủ sâu giấc hơn hẳn.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: 'r5',
    productId: '2',
    author: 'Đỗ Bảo Châu',
    avatar: 'https://i.pravatar.cc/150?img=20',
    rating: 5,
    comment:
      'Đã mua được 6 tháng, cây vẫn xanh mướt kiên cường dù phòng mình khá ít ánh sáng tự nhiên. Đúng là loài cây bất tử dành cho những ai bận rộn. Rất đáng đồng tiền bát gạo!',
    date: '2024-01-30',
    verified: true,
  },
  // Peace Lily reviews
  {
    id: 'r6',
    productId: '3',
    author: 'Lê Mai Anh',
    avatar: 'https://i.pravatar.cc/150?img=25',
    rating: 5,
    comment:
      'Bông hoa trắng muốt nở rất thanh nhã và lâu tàn. Thích nhất là khi khát nước lá cây hơi rũ nhẹ để nhắc mình, tưới xong vài tiếng sau lại vươn thẳng tươi rói. Đặt cạnh bàn máy tính nhìn rất dịu mắt.',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: 'r7',
    productId: '3',
    author: 'Bùi Tuấn Anh',
    avatar: 'https://i.pravatar.cc/150?img=30',
    rating: 4,
    comment:
      'Cây giao nhanh trong 24h tại Hà Nội. Đóng gói cẩn thận có màng bảo vệ hoa không bị dập nát. Rất hài lòng với chất lượng phục vụ của Plantify.',
    date: '2024-02-10',
    verified: true,
  },
  // Golden Pothos reviews
  {
    id: 'r8',
    productId: '4',
    author: 'Phan Thùy Trang',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    comment:
      'Trầu bà vàng nhánh rủ xuống kệ sách nhìn thơ mộng lắm luôn. Cây lớn nhanh kinh khủng, mình mới cắt vài nhánh cắm vào ly nước để bàn làm việc mà đã ra rễ trắng phau rồi!',
    date: '2024-01-18',
    verified: true,
  },
  // ZZ Plant reviews
  {
    id: 'r9',
    productId: '5',
    author: 'Dương Quốc Huy',
    avatar: 'https://i.pravatar.cc/150?img=35',
    rating: 5,
    comment:
      'Lá dày và bóng loáng như xịt dầu bóng vậy. Đặt ở quầy lễ tân công ty ai đi qua cũng khen cây đẹp. Hơn tháng nay chỉ tưới đúng 2 lần mà cây vẫn xanh tốt mơn mởn.',
    date: '2024-02-01',
    verified: true,
  },
  // Succulent set reviews
  {
    id: 'r10',
    productId: '9',
    author: 'Ngô Thanh Trúc',
    avatar: 'https://i.pravatar.cc/150?img=40',
    rating: 5,
    comment:
      'Set 3 chậu sen đá xinh xỉu! Chậu sứ trắng dày dặn, màu sắc phối cực kỳ bắt mắt. Mua làm quà sinh nhật cho bạn đồng nghiệp mà bạn ấy mê tít. Sẽ ủng hộ shop dài dài!',
    date: '2024-02-14',
    verified: true,
    images: ['https://images.unsplash.com/photo-1455793547729-6e37b658a0bc?w=400&q=80'],
  },
];

export const getReviewsByProductId = (productId: string): ProductReview[] => {
  return reviews.filter((r) => r.productId === productId);
};

export const getAverageRating = (productId: string): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
};
