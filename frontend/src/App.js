import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import emailjs from 'emailjs-com';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Technology from './pages/Technology';
import Architecture from './pages/Architecture';
import Business from './pages/Business';
import Infrastructure from './pages/Infrastructure';
import Event from './pages/Event';
import HR from './pages/HR';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import AdminBlog from './components/AdminBlog';
import AdminJobs from './components/AdminJobs';
import AdminSettings from './components/AdminSettings';
import AdminApplications from './components/AdminApplications';
import AdminAnalytics from './components/AdminAnalytics';
import ProtectedRoute from './components/ProtectedRoute';
import FlashMessage from './components/FlashMessage';
import { AuthProvider } from './context/AuthContext';
import AdminUsers from './components/AdminUsers';

// Initialize EmailJS with the public key
emailjs.init("vosgvbb9yvhPXNTlG");

function AppContent() {
  const [flashMessage, setFlashMessage] = useState(null);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Clear flash message on route change
    setFlashMessage(null);

    // Check for error/success messages in location state
    if (location.state?.error) {
      setFlashMessage({
        type: 'error',
        message: location.state.error
      });
    } else if (location.state?.success) {
      setFlashMessage({
        type: 'success',
        message: location.state.success
      });
    } else if (location.state?.message) {
      setFlashMessage({
        type: 'info',
        message: location.state.message
      });
    }
  }, [location]);

  return (
    <>
      {!location.pathname.startsWith('/admin') && <Navbar />}
      {flashMessage && (
        <div className="container" style={{ marginTop: '1rem' }}>
          <FlashMessage
            type={flashMessage.type}
            message={flashMessage.message}
            onClose={() => setFlashMessage(null)}
          />
        </div>
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/technology" element={<Technology />} />
        <Route path="/services/architecture" element={<Architecture />} />
        <Route path="/services/business" element={<Business />} />
        <Route path="/services/infrastructure" element={<Infrastructure />} />
        <Route path="/services/event" element={<Event />} />
        <Route path="/services/hr" element={<HR />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/users" element={<AdminUsers />} />
                <Route path="/blog/*" element={<AdminBlog />} />
                <Route path="/jobs/*" element={<AdminJobs />} />
                <Route path="/applications" element={<AdminApplications />} />
                <Route path="/settings" element={<AdminSettings />} />
                <Route path="/analytics" element={<AdminAnalytics />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
