import axios from 'axios';

const API_URL = 'https://6708715e8e86a8d9e42eecda.mockapi.io/api/mockCourses';

export const fetchCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.error('Lỗi khi fetch courses:', error);
    return []; // Hoặc throw error nếu muốn xử lý phía gọi
  }
};