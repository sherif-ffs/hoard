import loadItemsByUserID from '../items/hooks/loadItemsByUser';
import styles from '../items/components/Items.module.scss';
import ItemCard from '../items/components/ItemCard';
import gridStyles from '../../styles/_cardGrid.module.scss';

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

  if (itemsExist) {
    return (
      <div className={gridStyles.cardGrid}>
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
