import { useQuery } from 'react-query';
import { fetchItemByID } from '../api/ItemApi';

const getItemByID = async (id: string) => {
  const res = await fetchItemByID(id);
  return await res.json();
};

export default function loadItemByID(id: string) {
  const { data, status, error } = useQuery(
    ['loadItemByItemID', id],
    () => getItemByID(id),
    {
      enabled: !!id,
    }
  );

  if (status === 'loading') {
    return 'loading';
  }

  const itemExists = data && data.data && !!data.data.length;
  if (itemExists) {
    return data.data;
  }
}
