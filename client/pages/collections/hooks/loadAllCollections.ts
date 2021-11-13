import { fetchAllCollections } from '../api/CollectionsApi';
import { useQuery } from 'react-query';

const fetchCollections = async () => {
  const res = await fetchAllCollections();
  return await res.json();
};

export default function loadAllCollections() {
  return useQuery('collections', () => fetchCollections());
}
