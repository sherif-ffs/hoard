import { CollectionInterface } from '../../Interfaces/CollectionInterface';
import { ItemInterface } from '../../Interfaces/ItemInterface';

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

// add item to collection
export function addItemToCollection(id: string, item: ItemInterface) {
  return fetch('http://localhost:5000/collections/add-item-to-collection', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      item,
    }),
  });
}

// remove item from collection
export function removeItemFromCollection(
  item: ItemInterface,
  collectionId: string
) {
  return fetch(
    'http://localhost:5000/collections/remove-item-from-collection',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item,
        collectionId,
      }),
    }
  );
}
