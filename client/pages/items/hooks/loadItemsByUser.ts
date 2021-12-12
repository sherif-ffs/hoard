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
