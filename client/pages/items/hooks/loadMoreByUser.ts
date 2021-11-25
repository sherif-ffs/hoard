import { useQuery } from 'react-query';
import { fetchMoreItemsByUser } from '../api/ItemApi';

const getMoreItemsByUserID = async (id: string) => {
  const res = await fetchMoreItemsByUser(id);
  return await res.json();
};

export default function loadMoreByUserID(id: string) {
  const { data, status, error } = useQuery(
    ['collectionByCollectionID', id],
    () => getMoreItemsByUserID(id),
    {
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

  const itemExists = data && data.data && !!data.data.length;
  if (itemExists) {
    return data.data;
  }
}
