export async function getPosts(sq, token) {
    return fetch(`/api/posts?search_query=${sq}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
}

export async function getUserPosts(token) {
    return fetch(`/api/posts/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
}

export async function createPost(post, token) {
    return fetch(`/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
      }).then(res => res.json())
}

export async function updatePosts(post, token) {
    return fetch(`/api/posts`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
      }).then(res => res.json())
}