import loadMoreByUserID from '../../hooks/loadMoreByUser';
import { API_URL } from '../../../constants/ApiEndpoint';
import { ItemInterface } from '../../../Interfaces/ItemInterface';
import PanelImage from './PanelImage';

import styles from './MoreByUser.module.scss';
interface Props {
  item: ItemInterface;
  handleSetSelectedItem: () => void;
  handleCloseItemPanel: () => void;
}

const MoreByUser = (props: Props) => {
  const { userId } = props.item;
  const d = loadMoreByUserID(userId);

  if (d === 'loading') {
    return <p>loading</p>;
  }

  return (
    <div className={styles.wrapper}>
      {d &&
        !!d.length &&
        d.map((item) => (
          <img
            src={`${API_URL}/items/images/${item.imageID}`}
            onClick={() => props.handleSetSelectedItem(item)}
          ></img>
        ))}
    </div>
  );
};

export default MoreByUser;
