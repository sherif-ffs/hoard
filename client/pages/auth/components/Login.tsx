import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useAppContext } from '../../components/AppWrapper';
import Router from 'next/router';
import { loginUser } from '../api/AuthApi';

const Login: NextPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { user, setUser, token, setToken } = useAppContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log('password: ', password);
    console.log('email: ', email);

    const result = await loginUser(email, password);
    const data = await result.json();
    const { user, token } = data.data;

    console.log('user: ', user);
    if (user && token) {
      setUser(user);
      setToken(token);
      Router.push('/auth/components/AuthCheck');
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="username"
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit Form" />
      </form>
    </section>
  );
};

export default Login;
