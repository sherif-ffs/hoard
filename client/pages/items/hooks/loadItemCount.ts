import { useQuery } from 'react-query';
import { fetchItemCount } from '../../../api/ItemApi';

const getItemCount = async () => {
  const res = await fetchItemCount();
  return await res.json();
};

export default function loadItemCount() {
  const { data, status, error } = useQuery(['getItemCount'], () =>
    getItemCount()
  );

  const count = data && data.data;
  return {
    count,
    error,
    status,
  };
}
