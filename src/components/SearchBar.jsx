'use client';

import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="my-3 d-flex justify-content-center">
      <div className="position-relative w-100" style={{ maxWidth: '500px' }}>
        <Search
          className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
          size={18}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-control ps-5 py-2 rounded shadow-sm"
          placeholder="Tìm kiếm khóa học..."
        />
      </div>
    </div>
  );
}
