import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ProductModal from '../components/ProductModal';
import AISuggestions from '../components/AISuggestions';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchCourses } from '../components/fetchCourses'
import { fetchSuggestions } from '../components/fetchSuggestion'

// const mockCourses = [
//   {
//     id: '1',
//     title: 'Lập trình React từ cơ bản đến nâng cao',
//     price: 899000,
//     image: 'https://readdy.ai/api/search-image?query=Modern%20web%20development%20course%20with%20React%20programming%20on%20computer%20screen%2C%20clean%20white%20background%2C%20professional%20educational%20setting%2C%20bright%20lighting%2C%20high-tech%20atmosphere&width=400&height=250&seq=course1&orientation=landscape',
//     description: 'Khóa học toàn diện về React, từ cơ bản đến nâng cao. Bạn sẽ học được JSX, Components, Hooks, State Management và nhiều hơn nữa.',
//     rating: 4.8,
//     students: 1250,
//     instructor: 'Nguyễn Văn A',
//     category: 'Lập trình',
//     duration: '40 giờ'
//   },
//   {
//     id: '2',
//     title: 'Digital Marketing & SEO Masterclass',
//     price: 1200000,
//     image: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20course%20materials%20with%20SEO%20analytics%20charts%20and%20social%20media%20icons%2C%20clean%20white%20background%2C%20modern%20business%20education%20concept%2C%20professional%20setup&width=400&height=250&seq=course2&orientation=landscape',
//     description: 'Học digital marketing từ A-Z, bao gồm SEO, SEM, Social Media Marketing và Analytics.',
//     rating: 4.9,
//     students: 890,
//     instructor: 'Trần Thị B',
//     category: 'Marketing',
//     duration: '35 giờ'
//   },
//   {
//     id: '3',
//     title: 'UI/UX Design cho người mới bắt đầu',
//     price: 750000,
//     image: 'https://readdy.ai/api/search-image?query=UI%20UX%20design%20course%20with%20colorful%20interface%20mockups%20and%20design%20tools%2C%20clean%20white%20background%2C%20creative%20workspace%20with%20modern%20design%20elements%2C%20inspiring%20atmosphere&width=400&height=250&seq=course3&orientation=landscape',
//     description: 'Khóa học thiết kế UI/UX từ cơ bản, sử dụng Figma và các công cụ thiết kế hiện đại.',
//     rating: 4.7,
//     students: 2100,
//     instructor: 'Lê Văn C',
//     category: 'Thiết kế',
//     duration: '30 giờ'
//   },
//   {
//     id: '4',
//     title: 'Python cho Data Science',
//     price: 950000,
//     image: 'https://readdy.ai/api/search-image?query=Python%20programming%20for%20data%20science%20course%20with%20code%20snippets%20and%20data%20visualization%20charts%2C%20clean%20white%20background%2C%20technical%20education%20setting%2C%20analytical%20atmosphere&width=400&height=250&seq=course4&orientation=landscape',
//     description: 'Học Python từ cơ bản đến nâng cao cho Data Science, bao gồm Pandas, NumPy, Matplotlib.',
//     rating: 4.6,
//     students: 1580,
//     instructor: 'Phạm Văn D',
//     category: 'Data Science',
//     duration: '45 giờ'
//   },
//   {
//     id: '5',
//     title: 'Photoshop CC từ Zero đến Hero',
//     price: 650000,
//     image: 'https://readdy.ai/api/search-image?query=Adobe%20Photoshop%20course%20with%20creative%20photo%20editing%20workspace%20and%20colorful%20design%20projects%2C%20clean%20white%20background%2C%20artistic%20creative%20environment%2C%20inspiring%20setup&width=400&height=250&seq=course5&orientation=landscape',
//     description: 'Khóa học Photoshop toàn diện từ cơ bản đến chuyên nghiệp, thích hợp cho designer và photographer.',
//     rating: 4.5,
//     students: 3200,
//     instructor: 'Hoàng Thị E',
//     category: 'Thiết kế',
//     duration: '25 giờ'
//   },
//   {
//     id: '6',
//     title: 'Excel nâng cao cho doanh nghiệp',
//     price: 450000,
//     image: 'https://readdy.ai/api/search-image?query=Advanced%20Excel%20course%20with%20complex%20spreadsheets%20and%20business%20charts%2C%20clean%20white%20background%2C%20professional%20office%20environment%2C%20business%20education%20concept&width=400&height=250&seq=course6&orientation=landscape',
//     description: 'Làm chủ Excel với các công thức nâng cao, Pivot Table, Macro và Dashboard.',
//     rating: 4.4,
//     students: 2800,
//     instructor: 'Đỗ Văn F',
//     category: 'Văn phòng',
//     duration: '20 giờ'
//   }
// ];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [viewHistory, setViewHistory] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };

    loadData();
  }, []);

  useEffect(() => {
    const fav = localStorage.getItem('favorites');
    const hist = localStorage.getItem('viewHistory');
    if (fav) setFavorites(JSON.parse(fav));
    if (hist) setViewHistory(JSON.parse(hist));
  }, []);

  useEffect(() => {
    let filtered = courses
      .filter(c =>
        (!searchTerm || c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase())))
      .filter(c =>
        priceFilter === 'all' ||
        (priceFilter === 'under500' && c.price < 500000) ||
        (priceFilter === '500to1000' && c.price >= 500000 && c.price <= 1000000) ||
        (priceFilter === 'over1000' && c.price > 1000000))
      .filter(c => categoryFilter === 'all' || c.category === categoryFilter);

    setFilteredCourses(filtered);
  }, [searchTerm, priceFilter, categoryFilter, courses]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    const newHist = [course.id, ...viewHistory.filter(id => id !== course.id)].slice(0, 10);
    setViewHistory(newHist);
    localStorage.setItem('viewHistory', JSON.stringify(newHist));
  };

  const toggleFavorite = (courseId) => {
    const newFav = favorites.includes(courseId)
      ? favorites.filter(id => id !== courseId)
      : [...favorites, courseId];
    setFavorites(newFav);
    localStorage.setItem('favorites', JSON.stringify(newFav));
  };

  const handleAISuggestions = async () => {
    setIsLoadingSuggestions(true);
    setShowSuggestions(true);
    await new Promise(r => setTimeout(r, 2000));

    const dataSuggested = await fetchSuggestions();

    const suggested = dataSuggested
      .filter(c => viewHistory.includes(c.id) || favorites.includes(c.id))
      .slice(0, 3);
    setFilteredCourses(suggested.length ? suggested : courses.sort(() => 0.5 - Math.random()).slice(0, 3));
    setIsLoadingSuggestions(false);
  };

  return (
    <div className="">
      <main className="container py-5">
        <div className="mb-5">
          <h1 className="display-4 fw-bold mb-3">Khám phá khóa học tốt nhất</h1>
          <p className="lead mb-4">Nâng cao kỹ năng của bạn với hàng nghìn khóa học chất lượng cao</p>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <div className="row g-4">
          <div className="col-lg-3">
            <FilterPanel
              priceFilter={priceFilter} onPriceFilterChange={setPriceFilter}
              categoryFilter={categoryFilter} onCategoryFilterChange={setCategoryFilter}
            />
            <AISuggestions
              onGetSuggestions={handleAISuggestions}
              isLoading={isLoadingSuggestions}
              showSuggestions={showSuggestions}
            />
          </div>

          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 fw-semibold text-dark">
                {showSuggestions ? 'Gợi ý cho bạn' : `${filteredCourses.length} khóa học`}
              </h2>

              {showSuggestions && (
                <button
                  onClick={() => {
                    setShowSuggestions(false);
                    setFilteredCourses(courses);
                  }}
                  className="btn btn-link text-primary fw-medium p-0 text-decoration-none"
                >
                  Xem tất cả khóa học
                </button>
              )}
            </div>

            {isLoadingSuggestions
              ? <LoadingSkeleton />
              : (
                filteredCourses.length === 0
                  ? <p className="text-muted">Không tìm thấy khóa học phù hợp.</p>
                  : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                      {filteredCourses.map(course => (
                        <div className="col" key={course.id}>
                          <CourseCard
                            course={course}
                            isFavorite={favorites.includes(course.id)}
                            onCourseClick={handleCourseClick}
                            onToggleFavorite={toggleFavorite}
                          />
                        </div>
                      ))}
                    </div>
                  )
              )
            }
          </div>
        </div>
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
