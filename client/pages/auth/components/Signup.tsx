import type { NextPage } from 'next';
import Router from 'next/router';
import { useState } from 'react';

import { registerUser } from '../api/AuthApi';
import Button from '../../components/ui/Button';
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
    <div className={styles.wrapper}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <h1>registration</h1>
        <label>Name*</label>
        <input
          className={styles.input}
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email*</label>
        <input
          className={styles.input}
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password*</label>
        <input
          className={styles.input}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} buttonCopy={'Sign Up'} version={'CTA'} />
      </form>
    </div>
  );
};

export default Signup;
