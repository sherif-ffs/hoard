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

  if (error) {
    console.error('error: ', error);
    return error;
  }

  if (status === 'loading') {
    return 'loading';
  }

  const items = data && data.data && !!data.data.length;
  if (items) {
    return data.data;
  }
}
