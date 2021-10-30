import React from 'react';
import styles from './Button.module.scss';

const Button = (props: any) => {
  const { buttonCopy, onClick, version } = props;
  return (
    <button className={styles.pushable} onClick={onClick}>
      <span className={styles.edge}></span>
      <span className={styles.front}>{buttonCopy}</span>
    </button>
  );
};

export default Button;