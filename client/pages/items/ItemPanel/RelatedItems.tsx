import classNames from 'classnames';

import { API_URL } from '../../../constants/ApiEndpoint';
import { ItemInterface } from '../../../Interfaces/ItemInterface';
import { useAppContext } from '../../../contexts/AppContext';
import loadItemsByTag from '../../../hooks/items/loadItemsByTag';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

import styles from './RelatedItems.module.scss';

const RelatedItems = () => {
  const { handleSetSelectedItem, selectedItem } = useAppContext();

  const tags = selectedItem && selectedItem.tags;

  if (!tags || tags.length === 0) return null;

  const response = loadItemsByTag(tags);

  const items = response && response.items;
  const error = response && response.error;
  const status = response && response.status;

  if (status === 'loading') return <Loading copy="Loading related items..." />;

  const filteredItems =
    items && items.filter((i: ItemInterface) => i._id !== selectedItem._id);

  if (!(filteredItems.length >= 1)) return null;

  return (
    <div className={styles.wrapper}>
      {error && <Error />}
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
