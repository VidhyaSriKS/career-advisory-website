import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  User, 
  QuizResults, 
  Career, 
  CareerRecommendation, 
  RecommendationRequest,
  ApiResponse,
  College,
  Course,
  CareerTimeline
} from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      // Get Firebase auth token
      const { getAuth } = await import('firebase/auth');
      const auth = getAuth();
      if (auth.currentUser) {
        return await auth.currentUser.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  private handleUnauthorized(): void {
    // Redirect to login or refresh token
    window.location.href = '/login';
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    const response = await this.api.get('/health');
    return response.data;
  }

  // Auth endpoints
  async verifyToken(idToken: string): Promise<ApiResponse<User>> {
    const response = await this.api.post('/api/auth/verify-token', { idToken });
    return response.data;
  }

  async signup(userData: { email: string; name: string; idToken: string }): Promise<ApiResponse<User>> {
    const response = await this.api.post('/api/auth/signup', userData);
    return response.data;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.api.post('/api/auth/logout');
    return response.data;
  }

  // User endpoints
  async getUserProfile(): Promise<ApiResponse<User>> {
    const response = await this.api.get('/api/users/profile');
    return response.data;
  }

  async updateUserProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await this.api.put('/api/users/profile', profileData);
    return response.data;
  }

  async saveQuizResults(quizResults: QuizResults): Promise<ApiResponse> {
    const response = await this.api.post('/api/users/quiz-results', quizResults);
    return response.data;
  }

  async getQuizHistory(): Promise<ApiResponse<QuizResults[]>> {
    const response = await this.api.get('/api/users/quiz-results');
    return response.data;
  }

  async saveCareerPath(careerId: string): Promise<ApiResponse> {
    const response = await this.api.post('/api/users/save-career-path', { careerId });
    return response.data;
  }

  async removeSavedCareerPath(careerId: string): Promise<ApiResponse> {
    const response = await this.api.delete(`/api/users/save-career-path/${careerId}`);
    return response.data;
  }

  async getSavedCareerPaths(): Promise<ApiResponse<Career[]>> {
    const response = await this.api.get('/api/users/saved-career-paths');
    return response.data;
  }

  // Career endpoints
  async getCareers(filters?: {
    category?: string;
    educationLevel?: string;
    salaryRange?: { min: number; max: number };
    skills?: string[];
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ careers: Career[]; total: number; page: number; totalPages: number }>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            params.append(key, JSON.stringify(value));
          } else if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const response = await this.api.get(`/api/careers?${params.toString()}`);
    return response.data;
  }

  async getCareerById(id: string): Promise<ApiResponse<Career>> {
    const response = await this.api.get(`/api/careers/${id}`);
    return response.data;
  }

  async getCareerCategories(): Promise<ApiResponse<string[]>> {
    const response = await this.api.get('/api/careers/categories/list');
    return response.data;
  }

  async getSkillsList(): Promise<ApiResponse<string[]>> {
    const response = await this.api.get('/api/careers/skills/list');
    return response.data;
  }

  // Recommendation endpoints
  async getCareerRecommendations(request: RecommendationRequest): Promise<ApiResponse<CareerRecommendation[]>> {
    const response = await this.api.post('/api/recommend/careers', request);
    return response.data;
  }

  async getQuizBasedRecommendations(quizResults: QuizResults): Promise<ApiResponse<CareerRecommendation[]>> {
    const response = await this.api.post('/api/recommend/quiz-based', { quizResults });
    return response.data;
  }

  async getSimilarCareers(careerId: string): Promise<ApiResponse<Career[]>> {
    const response = await this.api.get(`/api/recommend/similar/${careerId}`);
    return response.data;
  }

  async getPersonalizedRecommendations(): Promise<ApiResponse<CareerRecommendation[]>> {
    const response = await this.api.post('/api/recommend/personalized');
    return response.data;
  }

  // College endpoints (if you want to add these to backend later)
  async getColleges(filters?: {
    location?: string;
    type?: string;
    programs?: string[];
    tuitionRange?: { min: number; max: number };
  }): Promise<ApiResponse<College[]>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            params.append(key, JSON.stringify(value));
          } else if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const response = await this.api.get(`/api/colleges?${params.toString()}`);
    return response.data;
  }

  // Course endpoints (if you want to add these to backend later)
  async getCourses(filters?: {
    category?: string;
    level?: string;
    provider?: string;
    format?: string;
    priceRange?: { min: number; max: number };
  }): Promise<ApiResponse<Course[]>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            params.append(key, JSON.stringify(value));
          } else if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const response = await this.api.get(`/api/courses?${params.toString()}`);
    return response.data;
  }

  // Timeline endpoints (if you want to add these to backend later)
  async getCareerTimeline(): Promise<ApiResponse<CareerTimeline>> {
    const response = await this.api.get('/api/timeline');
    return response.data;
  }

  async updateCareerTimeline(timeline: Partial<CareerTimeline>): Promise<ApiResponse<CareerTimeline>> {
    const response = await this.api.put('/api/timeline', timeline);
    return response.data;
  }

  // Utility methods
  async uploadFile(file: File, type: 'resume' | 'transcript' | 'portfolio'): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await this.api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Analytics endpoints (if you want to add these to backend later)
  async trackEvent(event: {
    type: string;
    data: Record<string, any>;
  }): Promise<ApiResponse> {
    const response = await this.api.post('/api/analytics/track', event);
    return response.data;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
