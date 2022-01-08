import { useQuery } from 'react-query';
import { fetchAllCollections } from '../api/CollectionsApi';

const fetchCollections = async (filterList: []) => {
  const res = await fetchAllCollections(filterList);
  return await res.json();
};

export default function loadAllCollections(filterList: []) {
  const { data, status, error } = useQuery(['allCollections', filterList], () =>
    fetchCollections(filterList)
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
