Backend for Attendance app

Setup (Windows PowerShell):

1. Create and activate a virtualenv:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Run the development server:

```powershell
python manage.py runserver 8000
```

API endpoints:

- `GET /api/subjects/` - returns JSON array of subjects stored in the database.
- `POST /api/subjects/` - accepts a JSON array of subjects or a single subject object. Overwrites the subjects table.

Database:

- This project now uses SQLite by default: `attendance_backend/db.sqlite3`.

After installing dependencies, run migrations before starting the server:

```powershell
python manage.py makemigrations
python manage.py migrate
```

To create a superuser and access the Django admin:

```powershell
python manage.py createsuperuser
```

Note: `attendance_backend/data.csv` remains for backwards compatibility but is no longer the primary store.

Authentication endpoints (session-based):

- `POST /api/signup/` - JSON `{ "email": "...", "password": "...", "username": "optional" }`. Auto-logins after signup.
- `POST /api/login/` - JSON `{ "username": "...", "password": "..." }`.
- `POST /api/logout/` - logs out current session.
- `GET /api/me/` - returns `{ authenticated: bool, username?, email? }`.

Notes about sessions and CORS:

- The backend uses Django sessions (cookies). When calling from a different origin (frontend dev server), include `credentials: 'include'` in `fetch` requests and ensure `CORS_ALLOWED_ORIGINS` includes the frontend origin (`http://localhost:5173`).
- For production, use HTTPS and tighten `ALLOWED_HOSTS`, and consider token-based auth if you prefer stateless APIs.

Hosting and external database

- You can host the backend on platforms like Heroku, Render, Railway, or any VPS. If you use a hosted Postgres, set the `DATABASE_URL` environment variable to the provided URI (e.g. `postgres://user:pass@host:5432/dbname`).
- Make sure `psycopg2-binary` and `dj-database-url` are installed in your environment. The app will use `DATABASE_URL` automatically if present.
- After deploying and configuring `DATABASE_URL`, run migrations on the host:

```bash
python manage.py migrate
```

- To list registered users (staff-only): `GET /api/users/` (must be called by a staff user).

Per-user attendance data

- Attendance `Subject` records are now associated with users. Each authenticated user has their own set of subjects. The frontend must authenticate to access and modify subjects.
- `GET /api/subjects/` now returns only the logged-in user's subjects. `POST /api/subjects/` overwrites only the logged-in user's subjects.
- Admins can still view all subjects via the admin UI.
