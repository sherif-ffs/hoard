import styles from '../styles/404.module.scss';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h1>4</h1>
        <div className={styles.plane}>
        <Image
            src={'/../public/plane.png'}
            height="300px"
            width="300px"
          />
        </div>

        <h1>4</h1>
      </div>
      <h3>this page must be on vacation this week...</h3>
    </div>
  );
};

export default Custom404;