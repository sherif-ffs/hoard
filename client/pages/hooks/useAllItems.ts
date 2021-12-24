import { fetchAllItems } from '../items/api/ItemApi';
import { useQuery } from 'react-query';

const loadAllItems = async (limit: number, offset: number) => {
  const res = await fetchAllItems(limit, offset);
  return await res.json();
};

export default function useAllItems(limit: number, offset: number) {
  return useQuery(['items', limit, offset], () => loadAllItems(limit, offset), {
    keepPreviousData: true,
  });
}
