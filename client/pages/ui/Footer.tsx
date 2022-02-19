import React from 'react';
import classNames from 'classnames';

import loadItemCount from '../../hooks/items/loadItemCount';
import loadCollectionsCount from '../../hooks/collections/loadCollectionsCount';
import styles from './Footer.module.scss';

const Footer = () => {
  const response = loadItemCount();
  const secondResponse = loadCollectionsCount();
  const { count, status, error } = response;
  const { count: secondCount } = secondResponse;

  if (count && secondCount) {
    return (
      <footer className={styles.footer}>
        <div className={styles.content}>
          <div className={classNames(styles.box, styles.items)}>
            <h3>Items Gathered</h3>
            <h1>{count}</h1>
          </div>
          <div className={classNames(styles.box, styles.collections)}>
            <h3>Collections Created</h3>
            <h1>{secondCount}</h1>
          </div>
        </div>
      </footer>
    );
  } else {
    return null;
  }
};

export default Footer;
