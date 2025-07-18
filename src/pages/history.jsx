'use client';

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import ProductModal from '../components/ProductModal';
import { Trash2, ChevronRight, History, Search } from 'lucide-react';
import { fetchCourses } from '../components/fetchCourses'

// const mockCourses = [
//     {
//         id: '1',
//         title: 'Lập trình React từ cơ bản đến nâng cao',
//         price: 899000,
//         image: 'https://readdy.ai/api/search-image?query=Modern%20web%20development%20course%20with%20React%20programming%20on%20computer%20screen%2C%20clean%20white%20background%2C%20professional%20educational%20setting%2C%20bright%20lighting%2C%20high-tech%20atmosphere&width=400&height=250&seq=course1&orientation=landscape',
//         description: 'Khóa học toàn diện về React, từ cơ bản đến nâng cao. Bạn sẽ học được JSX, Components, Hooks, State Management và nhiều hơn nữa.',
//         rating: 4.8,
//         students: 1250,
//         instructor: 'Nguyễn Văn A',
//         category: 'Lập trình',
//         duration: '40 giờ'
//     },
//     {
//         id: '2',
//         title: 'Digital Marketing & SEO Masterclass',
//         price: 1200000,
//         image: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20course%20materials%20with%20SEO%20analytics%20charts%20and%20social%20media%20icons%2C%20clean%20white%20background%2C%20modern%20business%20education%20concept%2C%20professional%20setup&width=400&height=250&seq=course2&orientation=landscape',
//         description: 'Học digital marketing từ A-Z, bao gồm SEO, SEM, Social Media Marketing và Analytics.',
//         rating: 4.9,
//         students: 890,
//         instructor: 'Trần Thị B',
//         category: 'Marketing',
//         duration: '35 giờ'
//     },
//     {
//         id: '3',
//         title: 'UI/UX Design cho người mới bắt đầu',
//         price: 750000,
//         image: 'https://readdy.ai/api/search-image?query=UI%20UX%20design%20course%20with%20colorful%20interface%20mockups%20and%20design%20tools%2C%20clean%20white%20background%2C%20creative%20workspace%20with%20modern%20design%20elements%2C%20inspiring%20atmosphere&width=400&height=250&seq=course3&orientation=landscape',
//         description: 'Khóa học thiết kế UI/UX từ cơ bản, sử dụng Figma và các công cụ thiết kế hiện đại.',
//         rating: 4.7,
//         students: 2100,
//         instructor: 'Lê Văn C',
//         category: 'Thiết kế',
//         duration: '30 giờ'
//     },
//     {
//         id: '4',
//         title: 'Python cho Data Science',
//         price: 950000,
//         image: 'https://readdy.ai/api/search-image?query=Python%20programming%20for%20data%20science%20course%20with%20code%20snippets%20and%20data%20visualization%20charts%2C%20clean%20white%20background%2C%20technical%20education%20setting%2C%20analytical%20atmosphere&width=400&height=250&seq=course4&orientation=landscape',
//         description: 'Học Python từ cơ bản đến nâng cao cho Data Science, bao gồm Pandas, NumPy, Matplotlib.',
//         rating: 4.6,
//         students: 1580,
//         instructor: 'Phạm Văn D',
//         category: 'Data Science',
//         duration: '45 giờ'
//     },
//     {
//         id: '5',
//         title: 'Photoshop CC từ Zero đến Hero',
//         price: 650000,
//         image: 'https://readdy.ai/api/search-image?query=Adobe%20Photoshop%20course%20with%20creative%20photo%20editing%20workspace%20and%20colorful%20design%20projects%2C%20clean%20white%20background%2C%20artistic%20creative%20environment%2C%20inspiring%20setup&width=400&height=250&seq=course5&orientation=landscape',
//         description: 'Khóa học Photoshop toàn diện từ cơ bản đến chuyên nghiệp, thích hợp cho designer và photographer.',
//         rating: 4.5,
//         students: 3200,
//         instructor: 'Hoàng Thị E',
//         category: 'Thiết kế',
//         duration: '25 giờ'
//     },
//     {
//         id: '6',
//         title: 'Excel nâng cao cho doanh nghiệp',
//         price: 450000,
//         image: 'https://readdy.ai/api/search-image?query=Advanced%20Excel%20course%20with%20complex%20spreadsheets%20and%20business%20charts%2C%20clean%20white%20background%2C%20professional%20office%20environment%2C%20business%20education%20concept&width=400&height=250&seq=course6&orientation=landscape',
//         description: 'Làm chủ Excel với các công thức nâng cao, Pivot Table, Macro và Dashboard.',
//         rating: 4.4,
//         students: 2800,
//         instructor: 'Đỗ Văn F',
//         category: 'Văn phòng',
//         duration: '20 giờ'
//     }
// ];

export default function HistoryPage() {
    const [viewHistory, setViewHistory] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchCourses();
            setCourses(data);
        };

        loadData();
    }, []);

    useEffect(() => {
        const savedHistory = localStorage.getItem('viewHistory');
        const savedFavorites = localStorage.getItem('favorites');

        if (savedHistory) setViewHistory(JSON.parse(savedHistory));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    }, []);

    const historyCourses = viewHistory
        .map(id => courses.find(course => course.id === id))
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

            {selectedCourse && (
                <ProductModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                    isFavorite={favorites.includes(selectedCourse.id)}
                    onToggleFavorite={toggleFavorite}
                />
            )}
        </div>
    );
}
