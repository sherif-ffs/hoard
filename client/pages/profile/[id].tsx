import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Navigation } from '../navigation/components/Navigation';
import Tabs from '../ui/Tabs';
import ProfileItems from './ProfileItems';
import ProfileCollections from './ProfileCollections';
import loadUserById from '../auth/hooks/loadUserById';
import EditModal from './EditModal';
import styles from './profile.module.scss';
import { useAuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user: loggedInUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = loadUserById(id);
  const tabCopy = ['Items', 'Collections'];

  if (user === 'loading') {
    return <h1>loading</h1>;
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
        {...{ modalIsOpen, id, toggle, github, twitter, portfolio, role }}
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
            <ProfileItems {...{ id }} />
          ) : (
            <ProfileCollections {...{ id }} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
