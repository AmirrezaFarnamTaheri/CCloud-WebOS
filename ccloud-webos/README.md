# CCloud WebOS Port

This project is a native port of the Android CCloud application for LG WebOS TV, built using the **Enact Framework** (React-based).

## Project Structure

The project follows the Android Clean Architecture patterns adapted for React/Enact:

```text
src/
├── api/           # Axios networking client & Mock Data
├── components/    # Reusable UI components (Poster, StreamPlayer)
├── views/         # UI Panels/Screens (Home, Details, Player, Search, etc.)
├── store/         # State management (FavoritesContext, SettingsContext)
├── assets/        # Images and other static resources
└── App/           # Application Entry & Navigation Logic
```

## Navigation

The app uses `@enact/sandstone/Panels` for deep navigation:
1.  **HomePanel**: Contains the Sidebar (`TabLayout`) with Movies, Series, Favorites, Search, and Settings.
2.  **DetailsPanel**: Displays media information and actions (Play, Favorite).
3.  **PlayerPanel**: Video player with HLS support.

## Key Features

*   **Movies & Series**: Browse content with poster grids.
*   **Search**: Fully functional search with debouncing.
*   **Favorites**: Local storage persistence for favorite items.
*   **Settings**: Configurable server URL, autoplay settings, and accent colors.
*   **Video Player**: HLS streaming support via `hls.js` and native WebOS video capabilities.

## Dependencies

*   **@enact/sandstone**: UI library for TV apps.
*   **axios**: HTTP client.
*   **hls.js**: HLS video streaming support.
*   **jest** & **@testing-library/react**: Comprehensive testing suite.

## Setup & Installation

1.  **Install Node.js**: Ensure you have Node.js (LTS recommended) installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
    This installs Enact (`@enact/cli`) and the webOS CLI (`@webos-tools/cli`) locally, so you can use `npm run ...` and `npx ares-...` without global installs.

## Testing

The project includes a comprehensive test suite covering components, views, API clients, and state management.

To run tests:
```bash
npm test
```

Or to watch for changes:
```bash
npm run test-watch
```

## Build & Deployment

### Development
To run the app in a browser (simulated TV environment):
```bash
npm run serve
```
Access at `http://localhost:8080`.

### Production Build
To create a minified build:
```bash
npm run pack-p
```

### Packaging for TV
To package the app into an `.ipk` file for installation on a real LG TV or Emulator:
```bash
npm run ipk
```
This generates `com.taheri.ccloud_1.0.0_all.ipk`.

### Installation
Ensure Developer Mode is enabled on your TV.
```bash
npx ares-install --device tv com.taheri.ccloud_1.0.0_all.ipk
```

## API Configuration
The base URL is configured in `src/api/client.js`. It can also be updated dynamically via the Settings screen in the app.

## Detailed Installation Guide

For a comprehensive guide on setting up the environment, building, and installing the application on your LG TV, please refer to [INSTALL.md](INSTALL.md).
