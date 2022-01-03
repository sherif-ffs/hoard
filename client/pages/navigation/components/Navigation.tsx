import classNames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';

import { useAuthContext } from '../../contexts/AuthContext';
import { useAppContext } from '../../contexts/AppContext';
import { logOutUser } from '../../auth/api/AuthApi';

import buttonStyles from '../../../styles/button.module.scss';

import styles from './Navigation.module.scss';

export const Navigation = () => {
  const { user, authenticated, checkAuth } = useAuthContext();

  const { setCreateModalIsOpen } = useAppContext();

  const handleLogout = async () => {
    const response = await logOutUser();
    const JSONResponse = await response.json();
    const { data, error, status } = JSONResponse;

    if (error) {
      alert(error);
      return;
    }

    if (!error && status === 'ok' && !data.authenticated) {
      checkAuth();
      Router.push('/discover');
    }
  };

  const renderCTAButton = () => {
    if (user && authenticated) {
      return (
        <div className={styles.buttons}>
          <button
            className={buttonStyles.button}
            onClick={
              authenticated
                ? () => setCreateModalIsOpen(true)
                : () => alert('Log in')
            }
          >
            Contribute
          </button>
          <Link href={`/profile/${user._id}`}>
            <button className={buttonStyles.button}>My Stuff</button>
          </Link>
          <button className={buttonStyles.button} onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.buttons}>
          <button className={classNames(styles.button, styles.secondary)}>
            <Link href={'/login'}>Log In</Link>
          </button>
          <button className={buttonStyles.button}>
            <Link href={'/signup'}>Sign Up</Link>
          </button>
        </div>
      );
    }
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link href={'/discover'}>
            <div className={styles.logo}>
              <Image
                src={'/../public/backpack.png'}
                height="50px"
                width="50px"
              />
            </div>
          </Link>
          <Link href={'/discover'}>
            <button className={classNames(styles.button, styles.secondary)}>
              Items
            </button>
          </Link>
          <Link href={'/collections'}>
            <button className={classNames(styles.button, styles.secondary)}>
              Collections
            </button>
          </Link>
        </div>
        {renderCTAButton()}
      </div>
    </nav>
  );
};
