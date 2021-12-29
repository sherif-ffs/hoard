import classNames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';

import { useAppContext } from '../../components/AppWrapper';
import { logOutUser } from '../../auth/api/AuthApi';

import styles from './Navigation.module.scss';

export const Navigation = () => {
  const { user, authenticated, setCreateModalIsOpen } = useAppContext();
  const handleLogout = async () => {
    const response = await logOutUser();
    const JSONResponse = await response.json();
    const { data, error, status } = JSONResponse;

    if (error) {
      alert(error);
      return;
    }

    if (!error && status === 'ok' && !data.authenticated) {
      Router.push('/discover');
    }
  };

  const renderCTAButton = () => {
    if (user && authenticated) {
      return (
        <div className={styles.buttons}>
          <button
            className={styles.profile}
            onClick={
              authenticated
                ? () => setCreateModalIsOpen(true)
                : () => alert('Log in')
            }
          >
            Contribute
          </button>
          <Link href={`/profile/${user._id}`}>
            <button className={styles.profile}>My Stuff</button>
          </Link>
          <button className={styles.profile} onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.buttons}>
          <button className={classNames(styles.button, styles.secondary)}>
            <Link href={'/auth/components/Login'}>Log In</Link>
          </button>
          <button className={styles.profile}>
            <Link href={'/auth/components/Signup'}>Sign Up</Link>
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
