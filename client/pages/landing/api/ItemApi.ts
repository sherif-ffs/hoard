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
