import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="mt-4 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-600 hover:text-blue-500">
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>;
};