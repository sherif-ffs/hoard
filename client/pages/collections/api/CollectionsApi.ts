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

// fetch collection by collection ID
export function fetchCollectionByCollectionID(id: string) {
  return fetch(
    `http://localhost:5000/collections/collection-by-collection-id?id=${id}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

// Fetch all collections
export function fetchAllCollections(
  limit: number,
  offset: number,
  filterList: string[]
) {
  return fetch('http://localhost:5000/collections/collections', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      limit,
      offset,
      filterList,
    }),
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

// check if item is included in collection
export function checkIfItemIsInCollection(
  itemId: string,
  collectionId: string
) {
  return fetch(
    `http://localhost:5000/collections/check-if-item-is-in-collection?itemId=${itemId}&collectionId=${collectionId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

// delete collection
export function deleteCollection(id: string | null) {
  return fetch('http://localhost:5000/collections/delete-collection', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
}

// return count of all collections
export function fetchCollectionsCount() {
  return fetch(`http://localhost:5000/collections/count`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
