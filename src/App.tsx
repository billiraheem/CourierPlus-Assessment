import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/layout/AuthLayout';
import { Login } from './features/auth/Login';
import { BlogList } from './features/blogs/BlogList';
import { BlogDetails } from './features/blogs/BlogDetails';
import { DashboardLayout } from './components/layout/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route index element={<Navigate to="blogs" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
