import Link from 'next/link';
import classNames from 'classnames';
import { deleteItem } from '../../api/ItemApi';
import { useAppContext } from '../../../components/AppWrapper';

import SaveSVG from '../../../components/ui/icons/SaveSVG';
import { useItemContext } from '../../../contexts/ItemsContext';

import styles from './PanelHeader.module.scss';

const PanelHeader = () => {
  const { handleSetItemToCollect, selectedItem, handleCloseItemPanel } =
    useItemContext();
  const { user } = useAppContext();
  const { name, url, author, userId, tags, _id } = selectedItem;

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

  const authorId = user && user._id;
  const isMyItem = authorId && userId && userId === authorId;

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
            uploaded by:{' '}
            <Link href={`/profile/${userId}`}>
              <span>{author}</span>
            </Link>
          </h3>
        </div>
        <div className={styles.buttons}>
          <button
            className={classNames(styles.button, styles.saveButton)}
            onClick={() => handleSetItemToCollect(selectedItem)}
          >
            Collect
          </button>
          {isMyItem && (
            <button
              className={classNames(styles.button, styles.delete)}
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
          tags.map((tag: string, i: number) => (
            <li key={i} className={styles.tag}>
              {tag}
            </li>
          ))}
      </ul>
    </>
  );
};

export default PanelHeader;
