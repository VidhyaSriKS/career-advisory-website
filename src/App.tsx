import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SignInDetails from './pages/auth/SignInDetails';
import Profile from './pages/Profile';
import CareerDiscoveryQuiz from './components/CareerDiscoveryQuiz';
import Results from './pages/Results';
import CareerRecommendations from './pages/CareerRecommendations';
import CourseMapping from './pages/CourseMapping';
import CollegeDirectory from './pages/CollegeDirectory';
import Timeline from './pages/Timeline';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicOnlyRoute from './routes/PublicOnlyRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  <PublicOnlyRoute>
                    <SignInDetails />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicOnlyRoute>
                    <Register />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/quiz" element={<CareerDiscoveryQuiz />} />
              <Route path="/results" element={<Results />} />
              <Route path="/recommendations" element={<CareerRecommendations />} />
              <Route path="/course-mapping" element={<CourseMapping />} />
              <Route path="/colleges" element={<CollegeDirectory />} />
              <Route path="/timeline" element={<Timeline />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
