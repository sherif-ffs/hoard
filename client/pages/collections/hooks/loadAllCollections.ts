import { fetchAllCollections } from '../api/CollectionsApi';
import { useQuery } from 'react-query';

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
    // alert('something went wrong');
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
