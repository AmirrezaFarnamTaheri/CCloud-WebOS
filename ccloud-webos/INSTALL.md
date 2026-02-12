# WebOS Installation Guide

This guide details how to build and install the CCloud application on an LG WebOS TV.

## Prerequisites

1.  **LG WebOS TV**: running webOS 4.0 or higher (recommended).
2.  **Developer Mode App**: Installed on your TV from the LG Content Store.
3.  **LG Developer Account**: Registered at [webosose.org](https://www.webosose.org/) or [LG Developer](https://webostv.developer.lge.com/).
4.  **WebOS CLI Tools**: `ares-*` commands are required for packaging and installation. This repo includes `@webos-tools/cli` as a dev dependency, so after `npm install` you can run `npx ares-package`, `npx ares-install`, etc. Alternatively, install the official CLI globally via the [webOS TV CLI](https://webostv.developer.lge.com/develop/tools/cli/installation).
5.  **Node.js**: LTS version installed on your development machine.

## Building the Application

1.  **Install Dependencies**
    Navigate to the `ccloud-webos` directory and install npm packages:
    ```bash
    cd ccloud-webos
    npm install
    ```

2.  **Build the Project**
    Run the production build command. This compiles the React/Enact application into the `dist` directory.
    ```bash
    npm run pack-p
    ```

3.  **Package into IPK**
    Create the installation package (`.ipk`):
    ```bash
    npm run ipk
    ```
    This will generate a file named like `com.taheri.ccloud_1.0.0_all.ipk`.

## Installing on TV

1.  **Enable Developer Mode**
    *   Open the **Developer Mode** app on your TV.
    *   Login with your LG Developer account.
    *   Turn on **Dev Mode Status**.
    *   Turn on **Key Server**.

2.  **Connect to TV**
    Ensure your TV and computer are on the same network.
    ```bash
    npx ares-setup-device
    ```
    *   Select `add`.
    *   Enter your TV's IP address (displayed in the Developer Mode app).
    *   Port is usually `9922`.
    *   Enter the Passphrase (displayed in the Developer Mode app) when prompted (or via `ares-novacom --device <device_name> --get-key`).

3.  **Install the IPK**
    Deploy the package to your TV.
    ```bash
    npx ares-install --device <device_name> com.taheri.ccloud_1.0.0_all.ipk
    ```
    Replace `<device_name>` with the name you gave your TV in the setup step (default is often `tv`).

4.  **Launch**
    You should now see the CCloud application in your TV's app list.

## Troubleshooting

*   **Connection Refused**: Ensure Key Server is ON in the Developer Mode app.
*   **Session Expired**: Developer Mode session lasts 50 hours. Open the app and click "Extend" to reset the timer.
*   **CLI Errors**: Ensure you have the latest version of `@enact/cli` and webOS CLI tools.
