import classNames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';

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
      Router.push('/discover/Discover');
    }
  };

  const renderCTAButton = () => {
    if (user && authenticated) {
      return (
        <div className={styles.buttons}>
          <button
            className={classNames(styles.button, styles.primary)}
            onClick={
              authenticated
                ? () => setCreateModalIsOpen(true)
                : () => alert('Log in')
            }
          >
            Create
          </button>
          <Link href={`/profile/${user._id}`}>
            <button className={styles.profile}>
              {user.name.slice(0, 1).toUpperCase()}
            </button>
          </Link>
          <button onClick={handleLogout}>logout</button>
        </div>
      );
    } else {
      return (
        <div className={styles.buttons}>
          <button className={classNames(styles.button, styles.secondary)}>
            <Link href={'/auth/components/Login'}>Log In</Link>
          </button>
          <button className={classNames(styles.button, styles.primary)}>
            <Link href={'/auth/components/Signup'}>Sign Up</Link>
          </button>
        </div>
      );
    }
  };

  return (
    <nav className={styles.navigation}>
      <Link href={'/discover/Discover'}>
        <div className={styles.logo}>LOGO</div>
      </Link>
      {renderCTAButton()}
    </nav>
  );
};
