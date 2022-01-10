import { useQuery } from 'react-query';
import { fetchUserById } from '../api/AuthApi';

const getUserByID = async (id: string) => {
  const res = await fetchUserById(id);
  return await res.json();
};

export default function loadUserById(id: string) {
  const { data, status, error } = useQuery(
    ['loadUserById', id],
    () => getUserByID(id),
    {
      enabled: !!id,
    }
  );

  return {
    user: data && data.data,
    status,
    error,
  };
}
