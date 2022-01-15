import Router from 'next/router';
import classNames from 'classnames';

import { useAppContext } from '../../../contexts/AppContext';
import loadMoreByUserID from '../../hooks/loadMoreByUser';
import { API_URL } from '../../../constants/ApiEndpoint';
import { ItemInterface } from '../../../Interfaces/ItemInterface';
import Loading from '../../../ui/Loading';
import Error from '../../../ui/Error';

import styles from './MoreByUser.module.scss';

const MoreByUser = () => {
  const { handleSetSelectedItem, selectedItem, setItemPanelIsOpen } =
    useAppContext();
  const { userId, author } = selectedItem;

  const response = loadMoreByUserID(userId);
  const { items, error, status } = response;

  if (status === 'loading') {
    return <Loading copy="Loading more items..." />;
  }

  if (error) {
    return <Error />;
  }

  const filteredItems =
    items && items.filter((i: ItemInterface) => i._id !== selectedItem._id);

  const handleRedirectToProfile = () => {
    setItemPanelIsOpen(false);
    Router.push(`/profile/${userId}`);
  };

  if (!(filteredItems.length > 0)) return null;

  return (
    <div className={styles.wrapper}>
      <header>
        <h3>More by {author}</h3>
        <h4 onClick={handleRedirectToProfile}>View Profile</h4>
      </header>
      <div className={styles.thumbnails}>
        {filteredItems &&
          !!filteredItems.length &&
          filteredItems.slice(0, 4).map((item: ItemInterface) => (
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

export default MoreByUser;
