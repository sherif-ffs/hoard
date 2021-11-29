import Link from 'next/link';

import { useItemContext } from '../../../contexts/ItemsContext';
import loadMoreByUserID from '../../hooks/loadMoreByUser';
import { API_URL } from '../../../constants/ApiEndpoint';
import { ItemInterface } from '../../../Interfaces/ItemInterface';

import styles from './MoreByUser.module.scss';

const MoreByUser = () => {
  const { handleSetSelectedItem, selectedItem } = useItemContext();
  const { userId, author } = selectedItem;
  const items = loadMoreByUserID(userId);

  if (items === 'loading') {
    return <p>loading</p>;
  }

  const filteredItems = items.filter(
    (i: ItemInterface) => i._id !== selectedItem._id
  );

  if (!(filteredItems.length > 0)) return null;

  return (
    <div className={styles.wrapper}>
      <header>
        <h3>More by {author}</h3>
        <Link href={`/profile/${userId}`}>
          <h4>View Profile</h4>
        </Link>
      </header>
      <div className={styles.thumbnails}>
        {filteredItems &&
          !!filteredItems.length &&
          filteredItems.map((item: ItemInterface) => (
            <img
              key={item._id}
              src={`${API_URL}/items/images/${item.imageID}`}
              onClick={() => handleSetSelectedItem(item)}
            ></img>
          ))}
      </div>
    </div>
  );
};

export default MoreByUser;
