import classNames from 'classnames';

import loadItemsByUserID from '../items/hooks/loadItemsByUser';
import ItemCard from '../items/components/ItemCard';
import NothingFound from '../ui/NothingFound';

import gridStyles from '../../styles/_cardGrid.module.scss';

interface Props {
  id: string;
}

const ProfileItems = (props: Props) => {
  const { id } = props;

  const response = loadItemsByUserID(id);
  const { items, status, error } = response;

  if (status === 'loading') {
    return <p>loading</p>;
  }

  if (error) {
    alert(error);
  }

  const itemsExist = items && !!items.length;
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
  } else {
    return <NothingFound />;
  }
};

export default ProfileItems;
