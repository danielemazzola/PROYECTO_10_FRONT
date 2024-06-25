# Proyecto 10 Rock the Code 🎸

Welcome to **Proyecto 10 Rock the Code**! This is a web application for managing events built with Vite and vanilla JavaScript. The application provides a streamlined experience for creating, editing, and viewing events.

## 🚀 Technologies Used

- **Vite**: A fast and modern development build tool.
- **Vanilla JavaScript**: Pure JavaScript without any frameworks.

## 📁 Project Structure

The project follows a structured architecture to keep things organized and maintainable.

### Root Directories

- **public**
  - `images/`: Contains all static images.
- **src**
  - `assets/`: Contains global assets like stylesheets.
    - `style.css`
  - `components/`: Reusable UI components.
    - `alert.css`, `Alert.js`
  - **auth**: Authentication-related components.
    - `allEvents/`
      - `AllEvents.js`
    - `createEvent/`
      - `create.css`, `CreateEvent.js`, `helpers.js`
    - `editEvent/`
      - `template.js`
    - `menu/`
      - `helpers.js`, `menu.css`, `Menu.js`
    - `myEvents/`
      - `helpers.js`, `MyEvents.js`
    - `profile/`
      - `helpers.js`, `profile.css`, `Profile.js`
  - **cardEvent**: Components related to event cards.
    - `card.css`, `CardEvent.js`, `helpers.js`
  - **loader**: Loader components.
    - `Loader.js`, `loader.css`
  - **nav**: Navigation components.
    - `helpers.js`, `nav.css`, `Nav.js`
  - **search**: Search components.
    - `search.css`, `Search.js`
  - **templateNav**: Template for navigation.
    - `helpers.js`, `template.css`, `templatesAuth.js`

### Pages

- **404**
  - `error.css`, `NotFound.js`
- **auth**
  - `dashboard.css`, `Dashboard.js`, `helpers.js`
- **home**
  - `helpers.js`, `home.css`, `Home.js`
- **recovery-password**
  - `helpers.js`, `recovery.css`, `RecoveryPassword.js`

### Services

- `fetchAuth.js`
- `fetchEvents.js`
- `fetchIsAuth.js`

### Utils

- **date.js**: Helps in formatting date types.
- **helpers.js**: Related to routes.

### Environment Variables

- `.env`: Contains the environment variables.
  - `VITE_URL_API`

### Main File

- `main.js`: Entry point logic.

## 📜 Scripts

You can use the following scripts for development and production builds:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```
