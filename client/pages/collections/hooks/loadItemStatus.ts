import { useQuery } from 'react-query';
import { checkIfItemIsInCollection } from '../api/CollectionsApi';

const checkItem = async (itemId: string, collectionId: string) => {
  const res = await checkIfItemIsInCollection(itemId, collectionId);
  return await res.json();
};

export default function loadItemStatus(
  itemId: string,
  collectionId: string,
  refetching: boolean
) {
  const { data, status, error } = useQuery(
    ['loadItemStatus', itemId, collectionId, refetching],
    () => checkItem(itemId, collectionId)
  );

  if (error) {
    console.error('error', error);
    return error;
  }

  if (status === 'loading') {
    return 'loading';
  }

  const dataExists = data && data.data;
  if (dataExists) {
    return data.data;
  }
}
