import { fetchCollectionsById } from '../api/CollectionsApi';
import { useQuery } from 'react-query';

const getCollectionsById = async (id: string) => {
  const res = await fetchCollectionsById(id);
  return await res.json();
};

export default function loadMyCollections(id: string) {
  const { data, status, error } = useQuery(
    'myCollections',
    () => getCollectionsById(id),
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  return {
    collections: data && data.data,
    status,
    error,
  };
}
