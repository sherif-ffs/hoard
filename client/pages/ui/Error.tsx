import React from 'react';
import Link from 'next/link';
import styles from './Error.module.scss';

const Error = () => (
  <div className={styles.wrapper}>
    <h1>Something Went wrong</h1>
    <h3>Really sorry about that!</h3>
    <h3>
      Yell at this guy{' '}
      <Link href={'https://twitter.com/SherifElmetwal2'}>
        <a target="_blank">my twitta</a>
      </Link>
    </h3>
  </div>
);

export default Error;
