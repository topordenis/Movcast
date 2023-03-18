import path from "path";
import { BrowserWindow, app, ipcMain } from "electron";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("update-title", (_e, arg) => {
    mainWindow.setTitle(`Electron App: ${arg}`);
  });

  mainWindow.loadFile("dist/index.html");
  // if (DEBUG) mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(createWindow);
app.once("window-all-closed", () => app.quit());
