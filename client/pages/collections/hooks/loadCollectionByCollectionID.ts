import { useQuery } from 'react-query';
import { fetchCollectionByCollectionID } from '../api/CollectionsApi';

const getCollectionByCollectionID = async (id: string) => {
  const res = await fetchCollectionByCollectionID(id);
  return await res.json();
};

export default function loadCollectionByCollectionID(id: string) {
  const { data, status, error } = useQuery(
    ['collectionByCollectionID', id],
    () => getCollectionByCollectionID(id),
    {
      enabled: !!id,
    }
  );

  if (error) {
    console.error('error: ', error);
    return error;
  }

  if (status === 'loading') {
    return 'loading';
  }

  const collectionsExist = data && data.data && !!data.data.length;
  if (collectionsExist) {
    return data.data;
  }
}
