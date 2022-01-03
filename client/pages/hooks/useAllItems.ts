import { fetchAllItems } from '../items/api/ItemApi';
import { useQuery } from 'react-query';

const loadAllItems = async (limit: number, offset: number, filterList: []) => {
  console.log('filterList: ', filterList);
  const res = await fetchAllItems(limit, offset, filterList);
  return await res.json();
};

export default function useAllItems(
  limit: number,
  offset: number,
  filterList: []
) {
  return useQuery(['items', limit, offset, filterList], () =>
    loadAllItems(limit, offset, filterList)
  );
}
