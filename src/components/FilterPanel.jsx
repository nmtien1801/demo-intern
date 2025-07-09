import React from 'react';

export default function FilterPanel({
  priceFilter,
  onPriceFilterChange,
  categoryFilter,
  onCategoryFilterChange,
}) {
  const priceOptions = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: 'under500', label: 'Dưới 500.000đ' },
    { value: '500to1000', label: '500.000đ - 1.000.000đ' },
    { value: 'over1000', label: 'Trên 1.000.000đ' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'Tất cả danh mục' },
    { value: 'Lập trình', label: 'Lập trình' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Thiết kế', label: 'Thiết kế' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Văn phòng', label: 'Văn phòng' },
  ];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Bộ lọc</h5>

        <div className="mb-4">
          <h6 className="fw-medium mb-3">Mức giá</h6>
          {priceOptions.map((option) => (
            <div className="form-check mb-2" key={option.value}>
              <input
                className="form-check-input"
                type="radio"
                name="price"
                id={`price-${option.value}`}
                value={option.value}
                checked={priceFilter === option.value}
                onChange={(e) => onPriceFilterChange(e.target.value)}
              />
              <label className="form-check-label" htmlFor={`price-${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h6 className="fw-medium mb-3">Danh mục</h6>
          {categoryOptions.map((option) => (
            <div className="form-check mb-2" key={option.value}>
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id={`category-${option.value}`}
                value={option.value}
                checked={categoryFilter === option.value}
                onChange={(e) => onCategoryFilterChange(e.target.value)}
              />
              <label className="form-check-label" htmlFor={`category-${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
