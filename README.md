# ChatGPT Desktop

A lightweight, native-feeling Electron-based desktop application that wraps the official ChatGPT Web Interface.

The app uses persistent sessions so your login and chat history are preserved across restarts. You can also manually set your session-token to bypass the login screen if needed.

## Features

* Native desktop experience for ChatGPT
* Google login supported
* Persistent session (cookies, local storage, chat history)
* Custom app icon
* Manual session-token injection supported (as backup)
* User session safely stored in a dedicated profile
* Portable and cross-platform (Linux, Windows, macOS)
* Download logo and use as app icon
* Create a Linux desktop app shortcut

## Installation

### Prerequisites

* Node.js and npm installed
* Electron installed (included in `package.json`)

### Setup

Clone the repository:

```bash
git clone https://github.com/Klau5t4ler0x90/chatgpt-desktop.git
cd chatgpt-desktop
```

Install dependencies:

```bash
npm install
```

### Run the App

```bash
npm start
```

## Session Management

By default, the app will persist your session (cookies, local storage) across app restarts.

### Optional: Manual Session Token

If you want to manually set a session token:

1. Open the `token.json` file and paste your token:

```json
{
  "token": "YOUR_SESSION_TOKEN"
}
```

2. The app will automatically inject this token on startup.

If no token is provided, you can log in via the built-in web interface, and your session will be stored for future use.

## App Icon

The app icon is loaded from the `icon.png` file in the project root. You can replace this file with your own 512x512 `.png` to customize the look.

You can download a logo from the web or create your own and save it as `icon.png` in the project root.

## Optional: Linux Desktop Integration

You can create a `.desktop` launcher in:

```bash
~/.local/share/applications/chatgpt-desktop.desktop
```

Example:

```ini
[Desktop Entry]
Name=ChatGPT Desktop
Exec=/path/to/chatgpt-desktop/start.sh
Icon=/path/to/chatgpt-desktop/icon.png
Terminal=false
Type=Application
Categories=Utility;
```

Make it executable:

```bash
chmod +x ~/.local/share/applications/chatgpt-desktop.desktop
```

The app will now appear in your application menu.

Add it to desktop:

```bash
cp ~/.local/share/applications/chatgpt-desktop.desktop ~/Desktop/
chmod +x ~/Desktop/chatgpt-desktop.desktop
```

## Cross-Platform

The project is designed to work on:

* Linux
* Windows
* macOS

Note: On Linux, you may need to run with the `--no-sandbox` flag or configure `chrome-sandbox` permissions.

## License

MIT License
