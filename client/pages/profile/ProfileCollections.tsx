import classNames from 'classnames';

import CollectionCard from '../collections/CollectionCard';
import { CollectionInterface } from '../Interfaces/CollectionInterface';
import loadMyCollections from '../collections/hooks/loadCollectionById';

import gridStyles from '../../styles/_cardGrid.module.scss';

interface Props {
  id: string;
}
const ProfileCollections = (props: Props) => {
  const { id } = props;
  const collections = loadMyCollections(id);
  const collectionsExist = collections && !!collections.length;

  const loading = collections === 'loading';

  if (loading) {
    return <p>loading</p>;
  }

  if (!collectionsExist) return <h1>No collections</h1>;

  const oneCollectionView = collections && collections.length === 1;
  console.log('oneCollectionView: ', oneCollectionView);

  if (collectionsExist) {
    return (
      <div
        className={classNames(gridStyles.cardGrid, {
          [gridStyles.oneItem]: oneCollectionView,
        })}
      >
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
