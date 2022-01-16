import classNames from 'classnames';

import CollectionCard from '../collections/CollectionCard';
import { CollectionInterface } from '../Interfaces/CollectionInterface';
import loadMyCollections from '../collections/hooks/loadCollectionById';
import NothingFound from '../ui/NothingFound';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

import gridStyles from '../../styles/_cardGrid.module.scss';

interface Props {
  id: string;
}
const ProfileCollections = (props: Props) => {
  const { id } = props;
  const response = loadMyCollections(id);
  const { collections, status, error } = response;
  const collectionsExist = collections && !!collections.length;

  if (status === 'loading') {
    return <Loading copy="Loading collections..." />;
  }

  const oneCollectionView = collections && collections.length === 1;

  if (collectionsExist) {
    return (
      <>
        {error && <Error />}
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
              if (title && id && items) {
                return <CollectionCard {...{ title, items, id }} key={id} />;
              }
            })}
        </div>
      </>
    );
  } else {
    return <NothingFound />;
  }
};

export default ProfileCollections;
