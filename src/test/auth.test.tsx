import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Authentication Flow', () => {
  test('Signup creates new user', async () => {
    const TestComponent = () => {
      const { signup } = useAuth();
      
      const handleSignup = async () => {
        try {
          await signup('test@example.com', 'password123', 'Test User');
        } catch (error) {
          console.error(error);
        }
      };
      
      return (
        <button onClick={handleSignup}>Sign Up</button>
      );
    };
    
    render(
      <Router>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Router>
    );
    
    fireEvent.click(screen.getByText('Sign Up'));
    
    await waitFor(() => {
      expect(screen.getByText(/authenticated as/i)).toBeInTheDocument();
    });
  });

  test('Login authenticates user', async () => {
    const TestComponent = () => {
      const { login } = useAuth();
      
      const handleLogin = async () => {
        try {
          await login('test@example.com', 'password123');
        } catch (error) {
          console.error(error);
        }
      };
      
      return (
        <button onClick={handleLogin}>Login</button>
      );
    };
    
    render(
      <Router>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Router>
    );
    
    fireEvent.click(screen.getByText('Login'));
    
    await waitFor(() => {
      expect(screen.getByText(/authenticated as/i)).toBeInTheDocument();
    });
  });

  test('Logout clears user session', async () => {
    const TestComponent = () => {
      const { logout, currentUser } = useAuth();
      
      return (
        <div>
          {currentUser && <div>Authenticated as: {currentUser.email}</div>}
          <button onClick={logout}>Logout</button>
        </div>
      );
    };
    
    render(
      <Router>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Router>
    );
    
    fireEvent.click(screen.getByText('Logout'));
    
    await waitFor(() => {
      expect(screen.queryByText(/authenticated as/i)).not.toBeInTheDocument();
    });
  });

  test('Password reset sends email', async () => {
    const TestComponent = () => {
      const { resetPassword } = useAuth();
      
      const handleReset = async () => {
        try {
          await resetPassword('test@example.com');
        } catch (error) {
          console.error(error);
        }
      };
      
      return (
        <button onClick={handleReset}>Reset Password</button>
      );
    };
    
    render(
      <Router>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Router>
    );
    
    fireEvent.click(screen.getByText('Reset Password'));
    
    await waitFor(() => {
      expect(screen.getByText(/password reset email sent/i)).toBeInTheDocument();
    });
  });
});
