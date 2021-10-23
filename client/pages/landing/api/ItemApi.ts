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

// Fetch all Items
export function fetchAllItems() {
  return fetch('http://localhost:5000/items/items', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
