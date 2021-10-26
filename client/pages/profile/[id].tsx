import { useRouter } from 'next/router';
import { useCollectionById } from '../hooks/useCollectionsById';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>User: {id}</p>;
};

export default Profile;
