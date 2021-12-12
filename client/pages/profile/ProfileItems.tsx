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

  if (!items) return null;

  if (loading) {
    return <p>loading</p>;
  }

  console.log('items: ', items);
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
};

export default ProfileItems;
