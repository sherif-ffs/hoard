import { useAppContext } from '../components/AppWrapper';
import CollectionCard from '../collections/CollectionCard';
import { CollectionInterface } from '../Interfaces/CollectionInterface';
import loadMyCollections from '../collections/hooks/loadCollectionById';
import gridStyles from '../../styles/_cardGrid.module.scss';

interface Props {
  id: string;
}
const ProfileCollections = (props: Props) => {
  const { myCollections, user } = useAppContext();
  const { id } = props;
  const collections = loadMyCollections(id);
  const collectionsExist = collections && !!collections.length;

  const loading = collections === 'loading';

  if (loading) {
    return <p>loading</p>;
  }

  if (!collectionsExist) return <h1>No collections</h1>;

  if (collectionsExist) {
    return (
      <div className={gridStyles.cardGrid}>
        {collections &&
          !!collections.length &&
          collections.map((collection: CollectionInterface) => {
            const { title, items } = collection;
            const id = collection._id;
            return <CollectionCard {...{ title, items, id }} key={id} />;
          })}
      </div>
    );
  }
};

export default ProfileCollections;
