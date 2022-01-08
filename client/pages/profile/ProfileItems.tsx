import classNames from 'classnames';

import loadItemsByUserID from '../items/hooks/loadItemsByUser';
import ItemCard from '../items/components/ItemCard';

import gridStyles from '../../styles/_cardGrid.module.scss';
import styles from '../items/components/Items.module.scss';

interface Props {
  id: string;
}
const ProfileItems = (props: Props) => {
  const { id } = props;
  const items = loadItemsByUserID(id);

  const loading = items === 'loading';

  if (loading) {
    return <p>loading</p>;
  }

  const itemsExist = items && !!items.length;
  if (!itemsExist) return <h1>No items</h1>;

  const oneItemView = items && items.length === 1;
  if (itemsExist) {
    return (
      <div
        className={classNames(gridStyles.cardGrid, {
          [gridStyles.oneItem]: oneItemView,
        })}
      >
        {items.map((item: any) => {
          const isPublic = !item.isPrivate;
          if (isPublic) {
            return (
              <ItemCard
                {...{
                  item,
                }}
                key={item._id}
              />
            );
          }
        })}
      </div>
    );
  }
};

export default ProfileItems;
