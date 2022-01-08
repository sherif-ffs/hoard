import { useQuery } from 'react-query';
import { fetchItemsByTag } from '../api/ItemApi';

const getItemsByTag = async (tags: string[]) => {
  const res = await fetchItemsByTag(tags);
  return await res.json();
};

export default function loadItemsByTag(tags: string[]) {
  const { data, status, error } = useQuery(
    ['loadItemsByTag', tags],
    () => getItemsByTag(tags),
    {
      enabled: !!tags,
    }
  );

  const items = data && data.data;
  return {
    items,
    error,
    status,
  };
}
