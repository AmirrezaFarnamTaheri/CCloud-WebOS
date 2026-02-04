# CCloud WebOS Port

This project is a native port of the Android CCloud application for LG WebOS TV, built using the **Enact Framework** (React-based).

## Project Structure

The project follows the Android Clean Architecture patterns adapted for React/Enact:

```text
src/
├── api/           # Axios networking client
├── components/    # Reusable UI components (Poster, StreamPlayer)
├── views/         # UI Panels/Screens (Home, Details, Player)
├── store/         # State management (FavoritesContext)
├── assets/        # Images and other static resources
└── App/           # Application Entry & Navigation Logic
```

## Navigation

The app uses `@enact/sandstone/Panels` for deep navigation:
1.  **HomePanel**: Contains the Sidebar (`TabLayout`) with Movies, Series, Favorites, Search, and Settings.
2.  **DetailsPanel**: Displays media information and actions (Play, Favorite).
3.  **PlayerPanel**: Video player with HLS support.

## Dependencies

*   **@enact/sandstone**: UI library for TV apps.
*   **axios**: HTTP client.
*   **hls.js**: HLS video streaming support.

## Setup & Installation

1.  **Install Node.js**: Ensure you have Node.js (LTS recommended) installed.
2.  **Install Enact CLI**:
    ```bash
    npm install -g @enact/cli
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
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
ares-package dist
```
This generates `com.pira.ccloud_1.0.0_all.ipk`.

### Installation
Ensure Developer Mode is enabled on your TV.
```bash
ares-install --device tv com.pira.ccloud_1.0.0_all.ipk
```

## API Configuration
The base URL is configured in `src/api/client.js`. Update this file if the backend URL changes.
