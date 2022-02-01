import { API_URL } from '../../../constants/ApiEndpoint';

// Create Item
export function createItem(item: any) {
  return fetch(`${API_URL}/items/create-item`, {
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
  return fetch(`${API_URL}/items/delete-item`, {
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
  return fetch(`${API_URL}/items/item/?id=${id}`, {
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
  return fetch(`${API_URL}/items/items`, {
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
  return fetch(`${API_URL}/items/items-by?id=${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// load more items by user
export function fetchMoreItemsByUser(id: string) {
  return fetch(`${API_URL}/items/more-items-by?id=${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// fetch related items by tag
export function fetchItemsByTag(tags: string[]) {
  return fetch(`${API_URL}/items/items-by-tag`, {
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

// fetch item count
export function fetchItemCount() {
  return fetch(`${API_URL}/items/count`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
