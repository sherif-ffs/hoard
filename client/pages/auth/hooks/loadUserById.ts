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

  if (error) {
    return error;
  }

  if (status === 'loading') {
    return 'loading';
  }

  const userExists = data && data.data && !!data.data.length;
  if (userExists) {
    return data.data;
  }
}
