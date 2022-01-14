import { useQuery } from 'react-query';
import { fetchAllCollections } from '../api/CollectionsApi';

const fetchCollections = async (
  limit: number,
  offset: number,
  filterList: string[]
) => {
  const res = await fetchAllCollections(limit, offset, filterList);
  return await res.json();
};

export default function loadAllCollections(
  limit: number,
  offset: number,
  filterList: string[]
) {
  const { data, status, error } = useQuery(
    ['allCollections', limit, offset, filterList],
    () => fetchCollections(limit, offset, filterList)
  );

  return {
    collectionsData: data && data.data ? data.data : [],
    status,
    error,
  };
}
