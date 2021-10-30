import type { NextPage } from 'next';
import Router from 'next/router';
import { useState } from 'react';

import { registerUser } from '../api/AuthApi';

import styles from './Signup.module.scss';

const Signup: NextPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await registerUser(name, email, password);
    const JSONResponse = await response.json();
    const { data, status, error } = JSONResponse;

    if (error) alert(error);

    if (!error && status === 'ok') {
      alert(data);
      Router.push('/auth/components/Login');
    }
  };

  return (
    <div>
      <h1>registration</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="name"
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
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
    </div>
  );
};

export default Signup;
