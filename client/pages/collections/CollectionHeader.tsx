import classNames from 'classnames';
import toast from 'react-hot-toast';

import { useAuthContext } from '../../contexts/AuthContext';
import { deleteCollection } from '../../api/CollectionsApi';

import buttonStyles from '../../styles/button.module.scss';
import styles from './CollectionHeader.module.scss';

interface Props {
  title: string | null;
  count: number | false | null;
  description: string | null;
  authorId: string | null;
  tags: String[] | null;
  collectionId: string | null;
}

const CollectionHeader = (props: Props) => {
  const { title, count, description, authorId, collectionId, tags } = props;
  const { user } = useAuthContext();

  const isMyCollection = user && authorId === user._id;

  const handleDelete = async () => {
    const res = await deleteCollection(collectionId);
    const response = await res.json();
    const { status, data } = response;
    if (status === 'ok') {
      return toast.success('Collection deleted successfully');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>{title}</h1>
          <h3>{description}</h3>
          {count && <h3>{count} items</h3>}
          <div className={styles.tags}>
            {tags && tags.map((tag) => <span>{tag}</span>)}
          </div>
        </div>
        {isMyCollection && (
          <button
            className={classNames(buttonStyles.button, buttonStyles.dark)}
            onClick={handleDelete}
          >
            <span className={styles.skull}>&#9760;</span>
            Destroy Collection
            <span className={styles.skull}>&#9760;</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default CollectionHeader;
