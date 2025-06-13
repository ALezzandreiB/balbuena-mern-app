import './App.css';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import DashLayout from './components/DashLayout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage.jsx';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import UsersPage from './pages/Dashboard/UsersPage';
import ReportsPage from './pages/Dashboard/ReportsPage';
import DashArticleListPage from './pages/Dashboard/DashArticleListPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute, { AdminOnlyUsers, EditorAndAdmin } from './components/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'articles',
        element: <ArticleListPage />
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />
      },
      {
        path: 'welcome',
        element: <WelcomePage />
      }
    ]
  },
  {
    path: '/login',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <LoginPage />
      }
    ]
  },
  {
    path: '/register',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <RegistrationPage />
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: 'users',
        element: (
          <AdminOnlyUsers>
            <UsersPage />
          </AdminOnlyUsers>
        )
      },
      {
        path: 'articles',
        element: (
          <EditorAndAdmin>
            <DashArticleListPage />
          </EditorAndAdmin>
        )
      },
      {
        path: 'reports',
        element: <ReportsPage />
      }
    ]
  }
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;