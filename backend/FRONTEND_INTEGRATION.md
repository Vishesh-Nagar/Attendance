Example fetch usage from frontend (JS):

GET subjects:

```js
fetch('http://localhost:8000/api/subjects/')
  .then(r => r.json())
  .then(data => console.log(data));
```

POST subjects (overwrite CSV):

```js
fetch('http://localhost:8000/api/subjects/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(subjectsArray)
})
```

Or to send the exact localStorage subjects:

```js
const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
fetch('http://localhost:8000/api/subjects/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(subjects)
})

Authentication endpoints (session-based):

Signup (POST): `/api/signup/` with JSON `{ "email": "...", "password": "...", "username": "optional" }`.

Login (POST): `/api/login/` with JSON `{ "username": "...", "password": "..." }`.

Logout (POST): `/api/logout/`.

Check current user (GET): `/api/me/` returns `{ authenticated: true/false, username?, email? }`.

When calling from the frontend, include credentials so the session cookie is sent:

```js
fetch('/api/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ username, password })
})

If your backend is hosted, set the frontend `VITE_BACKEND_URL` to point to the hosted URL (or set `VITE_BACKEND_URL` env var during build):

```powershell
$env:VITE_BACKEND_URL = 'https://your-backend.example.com'
npm run build
```
```
```
