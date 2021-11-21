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
