import { useQuery } from 'react-query';
import { fetchAllCollections } from '../api/CollectionsApi';

const fetchCollections = async () => {
  const res = await fetchAllCollections();
  return await res.json();
};

export default function loadAllCollections() {
  const { data, status, error } = useQuery('allCollections', () =>
    fetchCollections()
  );

  if (error) {
    console.error('error', error);
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
