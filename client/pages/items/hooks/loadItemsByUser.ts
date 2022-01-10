import { useQuery } from 'react-query';
import { fetchItemsByUserID } from '../api/ItemApi';

const getItemsByUser = async (id: string) => {
  const res = await fetchItemsByUserID(id);
  return await res.json();
};

export default function loadItemsByUserID(id: string) {
  const { data, status, error } = useQuery(
    ['itemsByUserID', id],
    () => getItemsByUser(id),
    {
      enabled: !!id,
    }
  );

  return {
    items: data && data.data,
    status,
    error,
  };
}
