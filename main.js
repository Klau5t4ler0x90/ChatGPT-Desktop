const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');

const tokenFile = path.join(__dirname, 'token.json');

function getSessionToken() {
  if (fs.existsSync(tokenFile)) {
    const data = JSON.parse(fs.readFileSync(tokenFile));
    return data.token;
  }
  return '';
}

function saveSessionToken(token) {
  fs.writeFileSync(tokenFile, JSON.stringify({ token: token }));
}

function createWindow(appSession) {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'ChatGPT Desktop',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      partition: 'persist:chatgpt-session'
    }
  });

  win.setMenuBarVisibility(false);

  const sessionToken = getSessionToken();

  // Cookie setzen
  appSession.cookies.set({
    url: 'https://chat.openai.com',
    name: '__Secure-next-auth.session-token',
    value: sessionToken,
    domain: '.openai.com',
    path: '/',
    secure: true,
    httpOnly: true
  }).then(() => {
    console.log('Session-Cookie gesetzt.');
    win.loadURL('https://chat.openai.com');
  }).catch((error) => {
    console.error('Fehler beim Setzen des Cookies:', error);
  });

  ipcMain.on('save-token', (event, token) => {
    saveSessionToken(token);
    app.relaunch();
    app.exit();
  });
}

app.whenReady().then(() => {
  const appSession = session.fromPartition('persist:chatgpt-session'); // after app.whenReady()
  createWindow(appSession);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const appSession = session.fromPartition('persist:chatgpt-session');
    createWindow(appSession);
  }
});
