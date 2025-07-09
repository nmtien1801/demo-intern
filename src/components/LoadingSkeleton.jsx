import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="row g-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="col-12 col-md-6 col-xl-4">
          <div className="card rounded overflow-hidden shadow-sm animate-pulse">
            <div className="bg-secondary bg-opacity-25" style={{ height: '12rem' }}></div>
            <div className="card-body">
              <div className="skeleton-line mb-3" style={{ height: '1rem' }}></div>
              <div className="skeleton-line mb-4" style={{ height: '1rem', width: '75%' }}></div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="skeleton-line" style={{ height: '0.75rem', width: '5rem' }}></div>
                <div className="skeleton-line" style={{ height: '0.75rem', width: '4rem' }}></div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="skeleton-line" style={{ height: '1.25rem', width: '6rem' }}></div>
                <div className="skeleton-line" style={{ height: '0.75rem', width: '5rem' }}></div>
              </div>

              <div className="skeleton-line rounded" style={{ height: '2.5rem' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
