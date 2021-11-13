import { CollectionInterface } from '../../Interfaces/CollectionInterface';
// Create collection
export function createCollection(collection: CollectionInterface) {
  return fetch('http://localhost:5000/collections/create-collection', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collection,
    }),
  });
}

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

// Fetch all collections
export function fetchAllCollections() {
  return fetch('http://localhost:5000/collections/collections', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
