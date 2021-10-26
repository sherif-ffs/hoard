import { useRouter } from 'next/router';
import useCollectionById from '../hooks/useCollectionsById';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  let data, status, error;
  if (id) {
    const res = useCollectionById(id);
    data = res.data;
    status = res.status;
    error = res.error;
  }

  console.log('data; ', data);
  console.log('id; ', id);
  console.log('status; ', status);
  console.log('error; ', error);

  const collectionsExist = !error && status === 'success' && data && data.data;
  if (error) return <p>error!</p>;
  if (status === 'loading' || !id) return <p>loading</p>;

  if (collectionsExist) {
    const collections = data.data;
    return (
      <section>
        <p>User: {id}</p>
        {collections &&
          !!collections.length &&
          collections.map((collection) => {
            return (
              <div key={collection._id}>
                <p>Items: {collection.title}</p>
                <p>Items: {collection.items.length}</p>
              </div>
            );
            console.log('collection; ', collection);
          })}
      </section>
    );
  }
};

export default Profile;
