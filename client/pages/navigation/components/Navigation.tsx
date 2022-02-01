import classNames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';

import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import { logOutUser } from '../../../api/AuthApi';

import buttonStyles from '../../../styles/button.module.scss';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const { user, authenticated, checkAuth } = useAuthContext();

  const { setCreateModalIsOpen, setDiscoverView } = useAppContext();

  const handleLogout = async () => {
    const response = await logOutUser();
    const JSONResponse = await response.json();
    const { data, error, status } = JSONResponse;

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
            <button
              className={classNames(
                buttonStyles.button,
                buttonStyles.secondary
              )}
            >
              My Stuff
            </button>
          </Link>
          <button
            className={classNames(buttonStyles.button, buttonStyles.secondary)}
            onClick={handleLogout}
          >
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

  const sendToItems = () => {
    Router.push('/discover');
    setDiscoverView('items');
  };

  const sendToCollections = () => {
    Router.push('/discover');
    setDiscoverView('collections');
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.logo} onClick={sendToItems}>
            <Image src={'/../public/backpack.png'} height="50px" width="50px" />
          </div>
          <button
            className={classNames(styles.button, styles.secondary)}
            onClick={sendToItems}
          >
            Items
          </button>
          <button
            className={classNames(styles.button, styles.secondary)}
            onClick={sendToCollections}
          >
            Collections
          </button>
        </div>
        {renderCTAButton()}
      </div>
    </nav>
  );
};

export default Navigation;
