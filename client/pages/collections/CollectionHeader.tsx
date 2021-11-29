import styles from './CollectionHeader.module.scss';
import { useAppContext } from '../components/AppWrapper';
interface Props {
  title: string;
  count: number;
  description: string;
  authorId: string;
}

const CollectionHeader = (props: Props) => {
  const { title, count, description, authorId } = props;
  const { user } = useAppContext();
  if (!user) return <p>loading</p>;
  const isMyCollection = authorId === user && user._id;
  console.log('isMyCollection: ', isMyCollection);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <h3>{description}</h3>
        <h3>{count} items</h3>
      </div>
      {isMyCollection && (
        <div className={styles.actions}>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </header>
  );
};

export default CollectionHeader;
