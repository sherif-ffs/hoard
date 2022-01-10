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
    () => fetchCollections(limit, offset, filterList),
    {
      keepPreviousData: true,
    }
  );

  if (error) {
    return error;
  }

  if (status === 'loading') {
    return 'loading';
  }

  // const collectionsExist = data && data.data && !!data.data.length;
  if (data) {
    return data;
  }
}
