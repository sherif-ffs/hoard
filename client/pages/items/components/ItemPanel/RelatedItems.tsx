import classNames from 'classnames';

import { API_URL } from '../../../constants/ApiEndpoint';
import { ItemInterface } from '../../../Interfaces/ItemInterface';
import { useItemContext } from '../../../contexts/ItemsContext';
import loadItemsByTag from '../../hooks/loadItemsByTag';

import styles from './RelatedItems.module.scss';

const RelatedItems = () => {
  const { handleSetSelectedItem, selectedItem } = useItemContext();
  const { tags } = selectedItem;

  if (!tags || tags.length === 0) return null;

  const items = loadItemsByTag(tags);

  if (items === 'loading') return <p>loading</p>;

  const filteredItems = items.filter(
    (i: ItemInterface) => i._id !== selectedItem._id
  );

  if (!(filteredItems.length >= 1)) return null;

  return (
    <div className={styles.wrapper}>
      <header>
        <h3>You might also like</h3>
      </header>
      <div className={styles.thumbnails}>
        {filteredItems &&
          !!filteredItems.length &&
          filteredItems.map((item: ItemInterface) => (
            <div className={styles.imgWrapper}>
              <img
                key={item._id}
                src={`${API_URL}/items/images/${item.imageID}`}
                onClick={() => handleSetSelectedItem(item)}
              ></img>
              <div className={classNames(styles.background, styles.one)}></div>
              <div className={classNames(styles.background, styles.two)}></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedItems;