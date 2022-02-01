import type { NextPage } from 'next';
import Router from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

import Button from './ui/Button';
import { registerUser } from '../api/AuthApi';

import styles from './auth/components/Form.module.scss';

const Signup: NextPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await registerUser(name, email, password);
    const JSONResponse = await response.json();
    const { data, status, error } = JSONResponse;

    if (error) {
      return toast.error(error);
    }

    if (!error && status === 'ok') {
      Router.push('/login');
      return toast.success('Account Successfully created!');
    }
  };

  const fieldsNotEmpty = password && password.trim().length >= 6;

  return (
    <section>
      <div className={styles.formWrapper}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h1>Sign Up</h1>
          <div className={styles.inputWrapper}>
            <label>Name *</label>
            <input
              className={styles.input}
              type="text"
              placeholder="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Email *</label>
            <input
              className={styles.input}
              placeholder="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Password * (Minimum 6 characters)</label>
            <input
              className={styles.input}
              type="text"
              placeholder="password"
              required
              minLength={6}
              maxLength={100}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={(e: any) =>
              fieldsNotEmpty
                ? handleSubmit(e)
                : alert('Must Create Valid Password')
            }
            buttonCopy={'Sign Up'}
            version={'CTA'}
          />
          <hr />
          <p>
            Already have an account? <Link href="login">Log In</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
