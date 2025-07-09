import React from 'react';
import {
  X, // icon đóng
  Heart,
  HeartOff,
  Star,
  Clock,
  User,
  Check
} from 'lucide-react';

export default function ProductModal({ course, onClose, isFavorite, onToggleFavorite }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" style={{ zIndex: 1050 }}>
      <div className="bg-white rounded-4 w-100" style={{ maxWidth: '900px', maxHeight: '90vh', overflow: 'hidden' }}>
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom p-4">
          <h2 className="h4 m-0 fw-bold text-dark">Chi tiết khóa học</h2>
          <button className="btn btn-light rounded-circle p-2" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body scrollable */}
        <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          <div className="row g-4 p-4">

            {/* Left */}
            <div className="col-md-6">
              <img src={course.image} alt={course.title} className="img-fluid rounded-3 mb-4" style={{ height: '250px', objectFit: 'cover' }} />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-primary bg-opacity-10 text-primary">{course.category}</span>
                <button className="btn btn-light rounded-circle p-2" onClick={() => onToggleFavorite(course.id)}>
                  {isFavorite ? <Heart fill="red" color="red" size={20} /> : <Heart color="gray" size={20} />}
                </button>
              </div>

              <div className="mb-3 text-muted d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                  <Star size={16} className="text-warning" />
                  <span>{course.rating}</span>
                  <small>({course.students} học viên)</small>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <Clock size={16} className="text-secondary" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="text-muted mb-3 d-flex align-items-center gap-2">
                <User size={16} />
                <span>Giảng viên: {course.instructor}</span>
              </div>
            </div>

            {/* Right */}
            <div className="col-md-6">
              <h3 className="fw-bold text-dark mb-3">{course.title}</h3>
              <p className="text-muted mb-4">{course.description}</p>

              <div className="bg-light rounded-3 p-3 mb-4">
                <h6 className="fw-semibold mb-3">Nội dung khóa học</h6>
                <ul className="list-unstyled small text-muted mb-0">
                  {[
                    'Học từ cơ bản đến nâng cao',
                    'Thực hành với dự án thực tế',
                    'Hỗ trợ 24/7 từ giảng viên',
                    'Chứng chỉ hoàn thành'
                  ].map((item, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
                      <Check size={16} className="text-success me-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <span className="h5 fw-bold text-primary">{formatPrice(course.price)}</span>
                    <span className="text-muted text-decoration-line-through ms-2">{formatPrice(course.price * 1.5)}</span>
                  </div>
                  <span className="badge bg-danger bg-opacity-10 text-danger">Giảm 33%</span>
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary fw-semibold">Mua ngay</button>
                  <button className="btn btn-outline-secondary fw-semibold">Thêm vào giỏ hàng</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
