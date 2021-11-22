import { fetchAllItems } from '../items/api/ItemApi';
import { useQuery } from 'react-query';

const loadAllItems = async (limit: number) => {
  const res = await fetchAllItems(limit);
  return await res.json();
};

export default function useAllItems(limit: number) {
  return useQuery(['items', limit], () => loadAllItems(limit));
}
