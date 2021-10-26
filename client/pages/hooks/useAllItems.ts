import { fetchAllItems } from '../landing/api/ItemApi';
import { useQuery } from 'react-query';

const loadAllItems = async () => {
  const res = await fetchAllItems();
  return await res.json();
};

export default function useAllItems() {
  return useQuery('items', () => loadAllItems());
}
