'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post('https://palermo-light-backend-main.vercel.app/api/register', {
            username,
            email,
            password,
        });
        
        // Сохранение токена и имени пользователя в локальном хранилище
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username); // Сохраняем имя пользователя
        
        router.push('/profile');

    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            // Обрабатываем ответ с ошибкой
            setError(err.response.data.error || 'Регистрация не удалась. Попробуйте снова.');
        } else {
            setError('Регистрация не удалась. Попробуйте снова.');
        }
        console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="bg-black bg-opacity-80 p-8 lg:mt-20 rounded shadow-md w-full max-w-md">
        <h1 className="text-5xl font-bold text-white text-center mb-6">PalermoLight</h1>
        {error && <div className="text-green-500 mb-4">{error}</div>} {/* Изменен цвет текста */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Имя пользователя"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Пароль"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <a href="/auth/reset-password" className="text-sm text-white hover:underline">
              Восстановить пароль
            </a>
            <a className='text-blue-500 underline' href='/auth/login'>Есть аккаунт? Войдите</a>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-black text-white border rounded-md transition duration-300 hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-neutral-950 focus:ring-offset-2"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
