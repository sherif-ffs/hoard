import styles from '../styles/404.module.scss';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        {/* <h1>4</h1> */}
        {/* <div className={styles.plane}> */}
        <Image
            src={'/../public/hoard.jpeg'}
            height="700px"
            width="700px"
          />
        {/* </div> */}
{/*  */}
      </div>
      <h1>404</h1>
    </div>
  );
};

export default Custom404;