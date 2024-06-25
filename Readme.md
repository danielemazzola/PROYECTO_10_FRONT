# Proyecto 10 Rock the Code 🎸

Welcome to **Proyecto 10 Rock the Code**! This is a web application for managing events built with Vite and vanilla JavaScript. The application provides a streamlined experience for creating, editing, and viewing events.

## 🚀 Technologies Used

| Technology         | Description                            |
| ------------------ | -------------------------------------- |
| Vite               | Fast and modern development build tool |
| Vanilla JavaScript | Pure JavaScript without frameworks     |

## 📁 Project Structure

The project structure is organized as follows:

### Root Directories

```
├── public/
│ ├── images/
│ └── index.html
├── src/
│ ├── assets/
│ │ └── style.css
│ ├── components/
│ │ ├── alert/
│ │ │ ├── alert.css
│ │ │ └── Alert.js
│ ├── auth/
│ │ ├── allEvents/
│ │ │ └── AllEvents.js
│ │ ├── createEvent/
│ │ │ ├── create.css
│ │ │ ├── CreateEvent.js
│ │ │ └── helpers.js
│ │ ├── editEvent/
│ │ │ └── template.js
│ │ ├── menu/
│ │ │ ├── helpers.js
│ │ │ ├── menu.css
│ │ │ └── Menu.js
│ │ ├── myEvents/
│ │ │ ├── helpers.js
│ │ │ └── MyEvents.js
│ │ └── profile/
│ │ ├── helpers.js
│ │ ├── profile.css
│ │ └── Profile.js
│ ├── cardEvent/
│ │ ├── card.css
│ │ ├── CardEvent.js
│ │ └── helpers.js
│ ├── loader/
│ │ ├── Loader.js
│ │ └── loader.css
│ ├── nav/
│ │ ├── helpers.js
│ │ ├── nav.css
│ │ └── Nav.js
│ ├── search/
│ │ ├── search.css
│ │ └── Search.js
│ └── templateNav/
│ ├── helpers.js
│ ├── template.css
│ └── templatesAuth.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## 📦 Scripts

You can use the following scripts for development and production builds:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## Environment Variables

- **.env**: Contains environment variables required for the application.
  - `VITE_URL_API`: API URL for fetching data.

## 📜 Pages

| Page              | Description                        |
| ----------------- | ---------------------------------- |
| 404               | Error page when route is not found |
| auth              | Authentication related pages       |
| home              | Home page displaying events        |
| recovery-password | Page for password recovery         |

## 🛠️ Services

| Service        | Description                                 |
| -------------- | ------------------------------------------- |
| fetchAuth.js   | Authentication, register and forgot service |
| fetchEvents.js | Service for fetching events and register    |
| fetchIsAuth.js | Service to check authentication status      |

## 🔧 Utilities

| Utility    | Description                         |
| ---------- | ----------------------------------- |
| date.js    | Utility for formatting date types   |
| helpers.js | Utility functions related to routes |

## Application URL

You can access the live application here: [Events Web App](https://events-dani.vercel.app/)

Both the backend and frontend are deployed on Vercel.

- **Back-end Repo**: [https://github.com/danielemazzola/PROYECTO_10](https://github.com/danielemazzola/PROYECTO_10)
