export async function getUser(token) {
    return fetch(`/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
}

export async function createUser(data) {
    return fetch(`/api/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => res.json())
}

export async function loginUser(data) {
    return fetch(`/api/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => res.json())
}

export async function logoutUser(token) {
    return fetch(`/api/users/logoutall`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
}

export async function deleteUser(token) {
    return fetch(`/api/users/me`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
      }).then(res => res.json())
}