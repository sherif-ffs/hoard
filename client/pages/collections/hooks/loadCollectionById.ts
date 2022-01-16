import { useQuery } from 'react-query';
import { fetchCollectionsById } from '../api/CollectionsApi';

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

  if (data && data.data) {
    return {
      collections: data && data.data,
      status,
      error,
    };
  } else {
    return {
      collections: [],
      status: 'loading',
      error: null,
    };
  }
}
