import Link from 'next/link';
import classNames from 'classnames';
import Router from 'next/router';
import { useState } from 'react';
import { deleteItem } from '../../api/ItemApi';
import { useAuthContext } from '../../../contexts/AuthContext';

import { useAppContext } from '../../../contexts/AppContext';
import loadUserById from '../../../auth/hooks/loadUserById';

import buttonStyles from '../../../../styles/button.module.scss';
import styles from './PanelHeader.module.scss';

const PanelHeader = () => {
  const { handleSetItemToCollect, selectedItem, handleCloseItemPanel } =
    useAppContext();
  const { user, authenticated } = useAuthContext();
  const { name, url, author, userId, tags, _id } = selectedItem;
  const [limit, setLimit] = useState(5);
  const authorObj = loadUserById(userId);

  const handleDeleteItem = async () => {
    const res = await deleteItem(_id);
    const response = await res.json();
    const { status, data } = response;
    if (status === 'ok') {
      alert('Item deleted successfully');
      handleCloseItemPanel();
      return;
    }
    alert(data);
  };

  const sendToProfile = () => {
    handleCloseItemPanel();
    Router.push(`/profile/${userId}`);
  };

  const authorName = authorObj && authorObj[0] && authorObj[0].name;
  const authorId = user && user._id;
  const isMyItem = authorId && userId && userId === authorId;

  const showAllTags = () => {
    setLimit(100);
  };
  const tagCount = tags && tags.length;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.details}>
          <Link href={url}>
            <a target="_blank">
              <h1>{name}</h1>
            </a>
          </Link>
          <h3>
            uploaded by: <span onClick={sendToProfile}>{authorName}</span>
          </h3>
        </div>
        <div className={styles.buttons}>
          <button
            className={buttonStyles.button}
            onClick={() =>
              user && authenticated
                ? handleSetItemToCollect(selectedItem)
                : alert('You must login to collect stuff')
            }
          >
            Collect
          </button>
          {isMyItem && (
            <button className={buttonStyles.button} onClick={handleDeleteItem}>
              <span className={styles.skull}>&#9760;</span>
              Destroy
              <span className={styles.skull}>&#9760;</span>
            </button>
          )}
        </div>
      </header>
      <ul className={styles.tags}>
        {tags &&
          !!tags.length &&
          tags.slice(0, limit).map((tag: string, i: number) => (
            <li key={i} className={styles.tag}>
              {tag}
            </li>
          ))}
        {tags && tags.length > limit && (
          <button className={styles.tag} onClick={showAllTags}>
            {tagCount - 5} More Tags
          </button>
        )}
      </ul>
    </>
  );
};

export default PanelHeader;
