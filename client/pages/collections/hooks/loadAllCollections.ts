import { useQuery } from 'react-query';
import { fetchAllCollections } from '../api/CollectionsApi';

const fetchCollections = async (
  limit: number,
  offset: number,
  filterList: []
) => {
  const res = await fetchAllCollections(limit, offset, filterList);
  return await res.json();
};

export default function loadAllCollections(
  limit: number,
  offset: number,
  filterList: []
) {
  const { data, status, error } = useQuery(
    ['allCollections', limit, offset, filterList],
    () => fetchCollections(limit, offset, filterList),
    {
      keepPreviousData: true,
    }
  );

  console.log('data: ', data);
  if (error) {
    return error;
  }

  if (status === 'loading') {
    return 'loading';
  }

  // const collectionsExist = data && data.data && !!data.data.length;
  const dataObject = data;
  if (data) {
    return data;
  }
}
