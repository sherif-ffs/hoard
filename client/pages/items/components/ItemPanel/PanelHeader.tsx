import Link from 'next/link';
import classNames from 'classnames';
import Router from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { deleteItem } from '../../../../api/ItemApi';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useAppContext } from '../../../../contexts/AppContext';
import loadUserById from '../../../../hooks/auth/loadUserById';
import Loading from '../../../ui/Loading';
import Error from '../../../ui/Error';

import buttonStyles from '../../../../styles/button.module.scss';
import styles from './PanelHeader.module.scss';

const PanelHeader = () => {
  const { handleSetItemToCollect, selectedItem, handleCloseItemPanel } =
    useAppContext();
  const { user, authenticated } = useAuthContext();
  const { name, url, userId, tags, _id } = selectedItem && selectedItem;

  const [limit, setLimit] = useState(5);

  const response = loadUserById(userId);

  const { user: author, status, error } = response;

  if (status === 'loading') {
    return <Loading copy="Loading" />;
  }

  if (error) {
    return <Error />;
  }

  const handleDeleteItem = async () => {
    const res = await deleteItem(_id);
    const response = await res.json();
    const { status, data } = response;
    if (status === 'ok') {
      handleCloseItemPanel();
      return toast.success('Item deleted successfully');
    }
    return toast.error('something went wrong');
  };

  const sendToProfile = () => {
    handleCloseItemPanel();
    Router.push(`/profile/${userId}`);
  };

  const authorName = author && author[0] && author[0].name;
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
            <button
              className={classNames(buttonStyles.button, buttonStyles.dark)}
              onClick={handleDeleteItem}
            >
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
