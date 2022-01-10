import { ItemInterface } from '../../Interfaces/ItemInterface';

// Create Item
export function createItem(item: ItemInterface) {
  return fetch('http://localhost:5000/items/create-item', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item,
    }),
  });
}

// Delete Item
export function deleteItem(id: string) {
  return fetch('http://localhost:5000/items/delete-item', {
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

// get item by itemId
export function fetchItemByID(id: string) {
  return fetch(`http://localhost:5000/items/item/?id=${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Fetch all Items
export function fetchAllItems(
  limit: number,
  offset: number,
  filterList: string[]
) {
  return fetch(`http://localhost:5000/items/items`, {
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

// fetch items by userId
export function fetchItemsByUserID(id: string) {
  return fetch(`http://localhost:5000/items/items-by?id=${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// load more items by user
export function fetchMoreItemsByUser(id: string) {
  return fetch(`http://localhost:5000/items/more-items-by?id=${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// fetch related items by tag
export function fetchItemsByTag(tags: string[]) {
  return fetch(`http://localhost:5000/items/items-by-tag`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tags,
    }),
  });
}
