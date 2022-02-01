import { useQuery } from 'react-query';
import { checkIfItemIsInCollection } from '../../api/CollectionsApi';

const checkItem = async (itemId: string, collectionId: string) => {
  const res = await checkIfItemIsInCollection(itemId, collectionId);
  return await res.json();
};

export default function loadItemStatus(
  itemId: string,
  collectionId: string,
  updating: boolean
) {
  const { data, status, error } = useQuery(
    ['loadItemStatus', itemId, collectionId],
    () => checkItem(itemId, collectionId)
  );

  const dataExists = data && data.data;
  if (dataExists) {
    return data.data;
  }
}
