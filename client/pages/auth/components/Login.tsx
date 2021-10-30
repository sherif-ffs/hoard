import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';

import { useAppContext } from '../../components/AppWrapper';
import { loginUser } from '../api/AuthApi';
import Button from '../../components/ui/Button';

import styles from './Form.module.scss';

const Login: NextPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { user, setUser, token, setToken, setAuthenticated } = useAppContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await loginUser(email, password);
    const data = await result.json();
    const { user, token, authenticated } = data.data;
    if (user && token && authenticated) {
      setUser(user);
      setAuthenticated(authenticated);
      setToken(token);
      Router.push('/landing/components/Landing');
    }
  };

  return (
    <section>
      <div className={styles.formWrapper}>
        <form className={styles.form}>
          <h1>Login</h1>
          <div className={styles.inputWrapper}>
            <label>Email *</label>
            <input
              className={styles.input}
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Password *</label>
            <input
              className={styles.input}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            buttonCopy={'Log In'}
            version={'CTA'}
          />
          <hr />
          <p>
            Don't have an account?{' '}
            <Link href="/auth/components/Signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
