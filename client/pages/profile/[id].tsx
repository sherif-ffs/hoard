import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Navigation } from '../navigation/components/Navigation';
import Tabs from '../ui/Tabs';
import loadUserById from '../auth/hooks/loadUserById';
import { useAuthContext } from '../contexts/AuthContext';
import ProfileCollections from './ProfileCollections';
import EditModal from './EditModal';
import ProfileItems from './ProfileItems';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

import styles from './profile.module.scss';

const Profile = () => {
  const router = useRouter();
  const id = router && router.query && router.query.id;

  if (!id) {
    return <h1>loading</h1>;
  }
  console.log('router: ', router);
  const { user: loggedInUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const tabCopy = ['Items', 'Collections'];

  const response = id && loadUserById(id.toString());
  const { user, status, error }: any = response;

  if (status === 'loading') {
    return <Loading copy="Loading..." />;
  }

  if (error) {
    return <Error />;
  }

  const toggle = () => {
    if (modalIsOpen) {
      setModalIsOpen(false);
      return;
    }
    setModalIsOpen(true);
  };

  const showEdit = loggedInUser && loggedInUser._id === id;

  const github = user && user[0] && user[0].github;
  const twitter = user && user[0] && user[0].twitter;
  const portfolio = user && user[0] && user[0].portfolio;
  const role = user && user[0] && user[0].role;
  return (
    <section>
      <Navigation />
      <EditModal
        {...{ modalIsOpen, toggle, github, twitter, portfolio, role }}
        id={id && id.toString()}
      />
      <div className={styles.wrapper}>
        <header>
          <div className={styles.content}>
            <div className={styles.text}>
              {user && user[0] && user[0].name && (
                <h1>
                  {user[0].name}
                  {showEdit && (
                    <span className={styles.edit} onClick={toggle}>
                      {' '}
                      &#9998;
                    </span>
                  )}
                </h1>
              )}
              <div className={styles.socials}>
                {github && (
                  <Link href={github}>
                    <a target="_blank">github</a>
                  </Link>
                )}
                {twitter && (
                  <Link href={twitter}>
                    <a target="_blank">twitter</a>
                  </Link>
                )}
                {portfolio && (
                  <Link href={twitter}>
                    <a target="_blank">portfolio</a>
                  </Link>
                )}
                {role && <span>{role}</span>}
              </div>
              <div className={styles.tabs}>
                <Tabs {...{ activeTab, setActiveTab, tabCopy }} dark />
              </div>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          {activeTab === 1 ? (
            <ProfileItems id={id.toString()} />
          ) : (
            <ProfileCollections id={id.toString()} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
