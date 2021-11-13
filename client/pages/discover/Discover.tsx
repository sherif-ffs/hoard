import React, { useState } from 'react';
import classNames from 'classnames';
import { Navigation } from '../navigation/components/Navigation';
import Landing from '../landing/components/Landing';
import Collections from '../collections/Collections';

import styles from './Discover.module.scss';

const Discover = () => {
  const [view, setView] = useState('items');

  const isItems = view === 'items';
  return (
    <>
      <Navigation />
      <div className={styles.tabs}>
        <button
          onClick={() => setView('items')}
          className={classNames(styles.tab, { [styles.active]: isItems })}
        >
          items
        </button>
        <button
          onClick={() => setView('collections')}
          className={classNames(styles.tab, { [styles.active]: !isItems })}
        >
          collections
        </button>
      </div>
      {view === 'items' ? <Landing /> : <Collections />}
    </>
  );
};

export default Discover;
