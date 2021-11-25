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
  // ?id=${id}
  return fetch(`http://localhost:5000/items/item/?id=${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Fetch all Items
export function fetchAllItems(limit: number) {
  return fetch(`http://localhost:5000/items/items/?limit=${limit}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
