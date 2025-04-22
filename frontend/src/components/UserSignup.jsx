import React, { useState } from 'react';

const UserSignup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://0.0.0.0:10000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Signup successful! 🎉');
        setFormData({ email: '', password: '' });
      } else {
        setMessage(result.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md space-y-6"
      >
        {/* Google Sign-up Visual */}
        <div className="flex items-center space-x-3 justify-center">
          <img
            src="/Images/download.jpeg"
            alt="Signup visual"
            className="w-10 h-10 object-cover rounded-full shadow-sm"
          />
          <p className="text-gray-600 font-medium text-sm hover:underline cursor-pointer">
            Sign up with Google
          </p>
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-red-500 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default UserSignup;
