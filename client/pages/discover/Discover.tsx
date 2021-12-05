import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { Navigation } from '../navigation/components/Navigation';
import Items from '../items/components/Items';
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
          Items
        </button>
        <Link href="/collections/Collections">
          <button
            onClick={() => setView('collections')}
            className={classNames(styles.tab, { [styles.active]: !isItems })}
          >
            Collections
          </button>
        </Link>
      </div>

      {view === 'items' ? <Items /> : <Collections />}
    </>
  );
};

export default Discover;
