import { useQuery } from 'react-query';
import { fetchCollectionsCount } from '../api/CollectionsApi';

const getCollectionsCount = async () => {
  const res = await fetchCollectionsCount();
  return await res.json();
};

export default function loadCollectionsCount() {
  const { data, status, error } = useQuery(['getCollectionsCount'], () =>
    getCollectionsCount()
  );

  const count = data && data.data;
  return {
    count,
    error,
    status,
  };
}
