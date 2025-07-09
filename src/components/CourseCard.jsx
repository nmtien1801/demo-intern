import { Heart, HeartIcon, Star } from 'lucide-react';

export default function CourseCard({ course, isFavorite, onCourseClick, onToggleFavorite }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="card h-100 shadow-sm border-0 hover-shadow transition rounded-4 overflow-hidden">
      <div className="position-relative">
        <img
          src={course.image}
          alt={course.title}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover', objectPosition: 'top' }}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(course.id);
          }}
          className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
        >
          {isFavorite ? (
            <HeartIcon size={18} fill="red" color="red" />
          ) : (
            <Heart size={18} />
          )}
        </button>

        <span className="badge bg-primary position-absolute bottom-0 start-0 m-2">
          {course.category}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold mb-2 text-truncate" title={course.title}>
          {course.title}
        </h5>

        <p className="card-text text-muted small text-truncate" title={course.description}>
          {course.description}
        </p>

        <div className="d-flex justify-content-between align-items-center my-2">
          <div className="d-flex align-items-center gap-1 text-warning small">
            <Star size={14} fill="#facc15" />
            <span className="fw-medium text-dark">{course.rating}</span>
            <span className="text-muted">({course.students})</span>
          </div>
          <span className="text-muted small">{course.duration}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold text-primary">{formatPrice(course.price)}</span>
          <span className="text-muted small">{course.instructor}</span>
        </div>

        <button
          onClick={() => onCourseClick(course)}
          className="btn btn-primary w-100 mt-auto"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
