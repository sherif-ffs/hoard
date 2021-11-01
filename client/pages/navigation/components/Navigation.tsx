import { useAppContext } from '../../components/AppWrapper';
import Link from 'next/link';
import Router from 'next/router';
import { logOutUser } from '../../auth/api/AuthApi';
import styles from './Navigation.module.scss';

interface Props {
  openCreateModal: () => void;
}

export const Navigation = (props: Props) => {
  const { user, authenticated, token } = useAppContext();

  const { openCreateModal } = props;
  const handleLogout = async () => {
    const response = await logOutUser();
    const JSONResponse = await response.json();
    const { data, error, status } = JSONResponse;

    if (error) {
      alert(error);
      return;
    }

    if (!error && status === 'ok' && !data.authenticated) {
      Router.push('/landing/components/Landing');
    }
  };
  return (
    <nav className={styles.navigation}>
      <button
        onClick={
          authenticated ? () => openCreateModal() : () => alert('Log in')
        }
      >
        create
      </button>
      {user ? (
        <div>
          <Link href={`/profile/${user._id}`}>
            <p>{user.name}</p>
          </Link>
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <div>
          <button>
            <Link href={'/auth/components/Login'}>Log In</Link>
          </button>
          <button>
            <Link href={'/auth/components/Signup'}>Sign Up</Link>
          </button>
        </div>
      )}
    </nav>
  );
};
