// Login User
export function loginUser(email: string, password: string) {
  return fetch('http://localhost:5000/auth/login', {
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
  return fetch('http://localhost:5000/auth/register', {
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
  return fetch('http://localhost:5000/auth/checkAuth', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Log out User
export function logOutUser() {
  return fetch('http://localhost:5000/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// FETCH ALL USERS
export function getAllUsers() {
  return fetch('http://localhost:5000/auth/users', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// get user by ID
export function fetchUserById(id: string) {
  return fetch(`http://localhost:5000/auth/user-by-id?id=${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
