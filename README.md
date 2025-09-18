# ClassTrack - Attendance Management System

![ClassTrack Logo](frontend/src/assets/Logo.png)

## Overview

ClassTrack is a full-stack attendance management system that helps students track their attendance across different subjects. The application consists of a Django REST API backend for data management and authentication, paired with a modern React frontend built with Vite and TailwindCSS.

## Features

- 📚 Add and manage multiple subjects with faculty information
- 👨‍🏫 Track attendance by faculty and subject
- ✅ Mark attendance as present/absent with real-time updates
- 📊 Real-time attendance percentage calculation and progress indicators
- 🔐 User authentication (signup/login/logout)
- 💾 Persistent data storage with SQLite database
- 🎨 Clean, responsive UI with dark mode interface
- 🔄 Seamless frontend-backend integration
- 🌐 CORS-enabled API for cross-origin requests

## Tech Stack

### Backend
- Django 4.0+
- Django REST Framework
- SQLite (default) / PostgreSQL (production)
- Django CORS Headers
- Session-based authentication

### Frontend
- React.js 18
- Vite (build tool)
- TailwindCSS
- Axios (HTTP client)
- LocalStorage (client-side persistence)

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://www.github.com/Vishesh-Nagar/Attendance
   cd Attendance
   ```

2. **Backend Setup**

   ```bash
   cd backend

   # Create and activate virtual environment (Windows)
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1

   # Install dependencies
   pip install -r requirements.txt

   # (Optional) Configure external database
   # Copy .env.example to .env and set DATABASE_URL for PostgreSQL or other SQL databases
   cp .env.example .env

   # Run migrations
   python manage.py makemigrations
   python manage.py migrate

   # (Optional) Create superuser for admin access
   python manage.py createsuperuser

   # Start the development server
   python manage.py runserver 8000
   ```

3. **Frontend Setup** (in a new terminal)

   ```bash
   cd frontend

   # Install dependencies
   npm install

   # Create .env file with backend URL
   echo "VITE_BACKEND_URL=http://localhost:8000" > .env

   # Start the development server
   npm run dev
   ```

4. **Access the Application**

   - Frontend: Open `http://localhost:5173` in your browser
   - Backend API: Available at `http://localhost:8000`
   - Django Admin (if superuser created): `http://localhost:8000/admin/`

### Environment Configuration

- **Backend**: Configure `DATABASE_URL` environment variable for external databases (e.g., PostgreSQL)
- **Frontend**: Set `VITE_BACKEND_URL` to point to your backend URL (default: `http://localhost:8000`)

## API Endpoints

### Authentication
- `POST /api/signup/` - User registration
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout
- `GET /api/me/` - Check authentication status

### Subjects
- `GET /api/subjects/` - Get user's subjects
- `POST /api/subjects/` - Create/update subjects

### Admin Only
- `GET /api/users/` - List all registered users

## Usage

1. **Sign Up/Login**: Create an account or log in to access your attendance data
2. **Add Subjects**: Click "Add Subject" to create new subjects with faculty names
3. **Track Attendance**: Use Present/Absent buttons to mark attendance for each subject
4. **Monitor Progress**: View real-time attendance percentages and progress bars
5. **Manage Data**: Edit or delete subjects as needed

## Project Structure

```
Attendance/
├── backend/                    # Django backend
│   ├── api/                    # Django app for API
│   ├── attendance_backend/     # Django project settings
│   ├── data.csv                # Legacy CSV data
│   ├── db.sqlite3              # SQLite database
│   ├── manage.py               # Django management script
│   ├── requirements.txt        # Python dependencies
│   └── README.md               # Backend documentation
├── frontend/                   # React frontend
│   ├── public/                 # Static assets
│   ├── src/                    # Source code
│   │   ├── assets/             # Images and icons
│   │   ├── components/         # React components
│   │   └── ...
│   ├── package.json            # Node dependencies
│   └── README.md               # Frontend documentation
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## Deployment

### Backend Deployment
- Use platforms like Heroku, Render, Railway, or any VPS
- Set `DATABASE_URL` for external databases
- Install `psycopg2-binary` for PostgreSQL
- Run migrations on the host: `python manage.py migrate`

### Frontend Deployment
- Build the app: `npm run build`
- Deploy the `dist/` folder to any static hosting service
- Set `VITE_BACKEND_URL` to your deployed backend URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Django and React.js
- Styled with TailwindCSS
- Icons and assets from various sources

---

Made with ❤️ by Vishesh
