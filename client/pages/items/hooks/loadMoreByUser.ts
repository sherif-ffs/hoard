import { useQuery } from 'react-query';
import { fetchMoreItemsByUser } from '../../../api/ItemApi';

const getMoreItemsByUserID = async (id: string) => {
  const res = await fetchMoreItemsByUser(id);
  return await res.json();
};

export default function loadMoreByUserID(id: string) {
  const { data, status, error } = useQuery(
    ['itemsByUserID', id],
    () => getMoreItemsByUserID(id),
    {
      enabled: !!id,
    }
  );

  const items = data && data.data;
  return {
    items,
    error,
    status,
  };
}
