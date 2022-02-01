import { fetchCollectionsById } from '../api/CollectionsApi';
import { useQuery } from 'react-query';

const loadMyCollections = async (id: string) => {
  const res = await fetchCollectionsById(id);
  return await res.json();
};

export default function useCollectionsById(id: string) {
  return useQuery('collections', () => loadMyCollections(id));
}
