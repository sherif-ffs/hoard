import { useQuery } from 'react-query';

import { fetchAllItems } from '../../api/ItemApi';

const loadAllItems = async (
  limit: number,
  offset: number,
  filterList: string[]
) => {
  const res = await fetchAllItems(limit, offset, filterList);
  return await res.json();
};

export default function useAllItems(
  limit: number,
  offset: number,
  filterList: string[]
) {
  return useQuery(['items', limit, offset, filterList], () =>
    loadAllItems(limit, offset, filterList)
  );
}
