// Fetch Collections by userId
export function fetchCollectionsById(userId: string) {
  return fetch(`http://localhost:5000/collections/collection?id=${userId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
