import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';

import { useAuthContext } from '../contexts/AuthContext';
import { loginUser } from '../api/AuthApi';
import Button from './ui/Button';

import styles from './auth/components/Form.module.scss';

const login: NextPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { user, setUser, token, setToken, setAuthenticated } = useAuthContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await loginUser(email, password);
    const data = await result.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    const { user, token, authenticated } = data.data;
    if (user && token && authenticated) {
      setUser(user);
      setAuthenticated(authenticated);
      setToken(token);
      Router.push('/');
    }
  };

  const fieldsNotEmpty =
    password && !!password.trim().length && email && !!email.trim().length;

  return (
    <section>
      <div className={styles.formWrapper}>
        <form className={styles.form}>
          <h1>Login</h1>
          {error && <span className={styles.error}>{error}</span>}
          <div className={styles.inputWrapper}>
            <label>Email *</label>
            <input
              className={styles.input}
              type="email"
              required
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Password *</label>
            <input
              className={styles.input}
              type="password"
              required
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={(e: any) =>
              fieldsNotEmpty
                ? handleSubmit(e)
                : alert('Please Fill out All Fields')
            }
            buttonCopy={'Log In'}
            version={'CTA'}
          />
          <hr />
          <p>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default login;
