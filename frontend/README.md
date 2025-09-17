# ClassTrack - Attendance Management System

![ClassTrack Logo](src/assets/Logo.png)

## Overview

ClassTrack is a modern, web-based attendance management system built with React and TailwindCSS. It helps students track their attendance across different subjects and maintain their attendance percentage requirements.

## Features

- 📚 Add and manage multiple subjects
- 👨‍🏫 Track attendance by faculty
- ✅ Mark attendance as present/absent
- 📊 Real-time attendance percentage calculation
- 🎯 Visual progress indicators
- 💾 Persistent storage using localStorage
- 🎨 Clean and responsive UI
- 🌙 Dark mode interface

## Tech Stack

- React.js
- TailwindCSS
- LocalStorage API
- Vite

## Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/Vishesh-Nagar/Attendance.git
cd Attendance
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Connecting to the backend

The frontend will try to call a backend API at `http://localhost:8000` by default. To change this, set the `VITE_BACKEND_URL` environment variable before running Vite.

Example (Windows PowerShell):

```powershell
$env:VITE_BACKEND_URL = 'http://localhost:8000'
npm run dev
```

## Usage

1. Click "Add Subject" to add a new subject
2. Enter subject title and faculty name
3. Use Present/Absent buttons to mark attendance
4. Track your attendance percentage through the progress bar
5. Delete subjects when no longer needed

## Project Structure

```
src/
├── assets/           # Images and static assets
├── components/       # React components
│   ├── AddSubjectForm/
│   ├── Data/        # Data management
│   ├── Header/
│   ├── Logo/
│   ├── MainContent/
│   ├── Subject/
│   └── Title/
├── App.jsx          # Root component
└── main.jsx         # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React.js
- Styled with TailwindCSS
- Icons and assets from [source]

---

Made with ❤️ by Vishesh