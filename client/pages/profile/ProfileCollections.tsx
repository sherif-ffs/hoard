import { useAppContext } from '../components/AppWrapper';
import CollectionCard from '../collections/CollectionCard';
import { CollectionInterface } from '../Interfaces/CollectionInterface';
import gridStyles from '../../styles/_cardGrid.module.scss';

const ProfileCollections = () => {
  const { myCollections, user } = useAppContext();

  const collectionsExist = myCollections && !!myCollections.length;

  const loading = myCollections === 'loading' || !myCollections;

  if (loading) {
    return <p>loading</p>;
  }

  if (!collectionsExist) return null;

  if (collectionsExist) {
    return (
      <div className={gridStyles.cardGrid}>
        {myCollections &&
          !!myCollections.length &&
          myCollections.map((collection: CollectionInterface) => {
            const { title, items } = collection;
            const id = collection._id;
            return <CollectionCard {...{ title, items, id }} key={id} />;
          })}
      </div>
    );
  }
};

export default ProfileCollections;
