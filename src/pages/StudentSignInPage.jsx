import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';

const StudentSignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const res = await axios.post('/api/students/login', user);
      // Handle successful login
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-0 rotate-6 sm:skew-y-0 sm:rotate-0 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="font-bold text-3xl text-gray-800 mb-6">Student Sign In</h1>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="mt-5">
                <label htmlFor="email" className="font-bold mb-2 text-gray-800 block">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classnames('w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500', {
                    'border-red-500': errors.email,
                  })}
                />
                {errors.email && <div className="text-red-500 mt-2 text-sm">{errors.email}</div>}
              </div>
              <div className="mt-5">
                <label htmlFor="password" className="font-bold mb-2 text-gray-800 block">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames('w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500', {
                    'border-red-500': errors.password,
                  })}
                />
                {errors.password && <div className="text-red-500 mt-2 text-sm">{errors.password}</div>}
              </div>
              <div className="mt-10">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Sign In</button>
              </div>
              <div className="mt-5 text-center">
                <Link to="/student/signup" className="text-gray-800">Don't have an account? Sign up here.</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignInPage;
