import { API_URL } from '../../../constants/ApiEndpoint';

// Login User
export function loginUser(email: string, password: string) {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

// Register User
export function registerUser(name: string, email: string, password: string) {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

// Check if User is authenticated
export function checkUserAuthentication() {
  return fetch(`${API_URL}/auth/checkAuth`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Log out User
export function logOutUser() {
  return fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// FETCH ALL USERS
export function getAllUsers() {
  return fetch(`${API_URL}/auth/users`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// get user by ID
export function fetchUserById(id: string) {
  return fetch(`${API_URL}/auth/user-by-id?id=${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// update socials
export function handleUpdateSocials(
  github: string,
  twitter: string,
  portfolio: string,
  role: string,
  id: string | undefined
) {
  return fetch(`${API_URL}/auth/socials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      github,
      twitter,
      portfolio,
      role,
      id,
    }),
  });
}
