import { useQuery } from 'react-query';
import { fetchItemsByUserID } from '../../api/ItemApi';

const getItemsByUser = async (id: string, limit: number, offset: number) => {
  const res = await fetchItemsByUserID(id, limit, offset);
  return await res.json();
};

export default function loadItemsByUserID(
  id: string,
  limit: number,
  offset: number
) {
  const { data, status, error } = useQuery(
    ['itemsByUserID', id],
    () => getItemsByUser(id, limit, offset),
    {
      enabled: !!id,
    }
  );

  return {
    data,
    status,
    error,
  };
}
