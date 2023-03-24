import path from "path";
import { BrowserWindow, app, ipcMain, shell } from "electron";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("update-title", (_e, arg) => {
    mainWindow.setTitle(`Electron App: ${arg}`);
  });

  ipcMain.handle("open-external", async (_e, arg) => {
    await shell.openExternal(arg);
  });

  mainWindow.loadFile("dist/index.html");
  // if (DEBUG) mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(createWindow);
app.once("window-all-closed", () => app.quit());
