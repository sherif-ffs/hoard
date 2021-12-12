import { useState } from 'react';
import { useRouter } from 'next/router';
import { Navigation } from '../navigation/components/Navigation';
import { useAppContext } from '../components/AppWrapper';
import Tabs from '../components/ui/Tabs';
import ProfileItems from './ProfileItems';
import ProfileCollections from './ProfileCollections';

import styles from './profile.module.scss';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { myCollections, user } = useAppContext();

  const [activeTab, setActiveTab] = useState(1);
  const loading = myCollections === 'loading' || !myCollections;
  if (loading) {
    return <p>loading</p>;
  }

  console.log('user: ', user);
  const tabCopy = ['Items', 'Collections'];
  const collectionsExist = myCollections && !!myCollections.length;

  const { name } = user;
  if (collectionsExist) {
    return (
      <section>
        <Navigation />
        <div className={styles.wrapper}>
          <header>
            <h1>{name}</h1>
            <div className={styles.tabs}>
              <Tabs {...{ activeTab, setActiveTab, tabCopy }} />
            </div>
          </header>

          {activeTab === 1 ? (
            <ProfileItems {...{ id }} />
          ) : (
            <ProfileCollections />
          )}
        </div>
      </section>
    );
  }
};

export default Profile;
