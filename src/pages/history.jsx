'use client';

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import ProductModal from '../components/ProductModal';
import { Trash2, ChevronRight, History, Search } from 'lucide-react';

const mockCourses = [
    {
        id: '1',
        title: 'Lập trình React từ cơ bản đến nâng cao',
        price: 899000,
        image: 'https://readdy.ai/api/search-image?query=Modern%20web%20development%20course...',
        description: 'Khóa học toàn diện về React...',
        rating: 4.8,
        students: 1250,
        instructor: 'Nguyễn Văn A',
        category: 'Lập trình',
        duration: '40 giờ',
    },
    {
        id: '2',
        title: 'Digital Marketing & SEO Masterclass',
        price: 1200000,
        image: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20course...',
        description: 'Học digital marketing từ A-Z...',
        rating: 4.9,
        students: 890,
        instructor: 'Trần Thị B',
        category: 'Marketing',
        duration: '35 giờ',
    },
    // ... thêm các khoá học khác tương tự
];

export default function HistoryPage() {
    const [viewHistory, setViewHistory] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const savedHistory = localStorage.getItem('viewHistory');
        const savedFavorites = localStorage.getItem('favorites');

        if (savedHistory) setViewHistory(JSON.parse(savedHistory));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    }, []);

    const historyCourses = viewHistory
        .map(id => mockCourses.find(course => course.id === id))
        .filter(course => course !== undefined);

    const handleCourseClick = course => {
        setSelectedCourse(course);
        const newHistory = [course.id, ...viewHistory.filter(id => id !== course.id)].slice(0, 10);
        setViewHistory(newHistory);
        localStorage.setItem('viewHistory', JSON.stringify(newHistory));
    };

    const toggleFavorite = courseId => {
        const newFavorites = favorites.includes(courseId)
            ? favorites.filter(id => id !== courseId)
            : [...favorites, courseId];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const clearHistory = () => {
        setViewHistory([]);
        localStorage.removeItem('viewHistory');
    };

    return (
        <div className="min-vh-100 bg-light">
            <main className="container py-3">
                <div className="mb-4">
                    <nav className="d-flex align-items-center gap-2 text-muted mb-3 small">
                        <NavLink to="/" className="text-decoration-none text-primary">
                            <span className="ms-2 h5 mb-0 text-dark fw-bold">Trang chủ</span>
                        </NavLink>
                        <ChevronRight size={16} />
                        <span className="text-dark">Lịch sử xem</span>
                    </nav>

                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h1 className="display-6 fw-bold">Lịch sử xem</h1>
                            <p className="text-muted">{historyCourses.length} khóa học bạn đã xem gần đây</p>
                        </div>

                        {historyCourses.length > 0 && (
                            <button onClick={clearHistory} className="btn btn-outline-danger d-flex align-items-center gap-2">
                                <Trash2 size={18} />
                                <span>Xoá lịch sử</span>
                            </button>
                        )}
                    </div>
                </div>

                {historyCourses.length > 0 ? (
                    <div className="row gy-4">
                        {historyCourses.map((course, index) => (
                            <div key={course.id} className="col-md-6 col-xl-4 position-relative">
                                <div className="position-absolute top-0 start-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', transform: 'translate(-50%, -50%)' }}>
                                    <small className="fw-bold">{index + 1}</small>
                                </div>
                                <CourseCard
                                    course={course}
                                    isFavorite={favorites.includes(course.id)}
                                    onCourseClick={handleCourseClick}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center ">
                        <div className="mx-auto bg-light border rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: 100, height: 100 }}>
                            <History size={40} className="text-muted" />
                        </div>
                        <h2 className="h4 mb-3">Chưa có lịch sử xem</h2>
                        <p className="text-muted mb-4">Bạn chưa xem khóa học nào. Hãy khám phá và tìm hiểu những khóa học thú vị!</p>
                        <NavLink to="/" className="btn btn-primary d-inline-flex align-items-center gap-2">
                         <Search size={18} />
                            <span className="ms-2 h6 mb-0">Khám phá khóa học</span>
                        </NavLink>
                    </div>
                )}
            </main>
        </div>
    );
}
