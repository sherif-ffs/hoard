import { useState } from 'react';
import { useRouter } from 'next/router';
import { Navigation } from '../navigation/components/Navigation';
import { useAppContext } from '../components/AppWrapper';
import Tabs from '../components/ui/Tabs';
import ProfileItems from './ProfileItems';
import ProfileCollections from './ProfileCollections';
import loadMyCollections from '../collections/hooks/loadCollectionById';
import loadUserById from '../auth/hooks/loadUserById';
import styles from './profile.module.scss';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const [activeTab, setActiveTab] = useState(1);

  const user = loadUserById(id);

  const tabCopy = ['Items', 'Collections'];

  if (user === 'loading') {
    return <h1>loading</h1>;
  }

  return (
    <section>
      <Navigation />
      <div className={styles.wrapper}>
        <header>
          {user && user[0] && user[0].name && <h1>{user[0].name}</h1>}
          <div className={styles.tabs}>
            <Tabs {...{ activeTab, setActiveTab, tabCopy }} />
          </div>
        </header>

        {activeTab === 1 ? (
          <ProfileItems {...{ id }} />
        ) : (
          <ProfileCollections {...{ id }} />
        )}
      </div>
    </section>
  );
};

export default Profile;
