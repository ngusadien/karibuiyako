import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // this used for redirecting
  const navigate = useNavigate(); 

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Save JWT token to localStorage
        localStorage.setItem('jwt-token', result.token);

        setMessage('Login successful! 🎉');
        setFormData({ email: '', password: '' });

        //  redirect to a protected route
        navigate('/ProductForm');
      } else {
        setMessage(result.message || 'Login failed. Check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
        <h4 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign in</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
