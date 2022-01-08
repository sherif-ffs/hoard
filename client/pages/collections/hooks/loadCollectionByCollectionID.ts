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

  const collection = data && data.data && data.data[0];
  return {
    collection,
    error,
    status,
  };
}
