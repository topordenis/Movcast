import path from "path";
import { BrowserWindow, app, ipcMain, shell } from "electron";
import { NodeObs } from "obs-studio-node-primary";

import * as remoteMain from '@electron/remote/main';
import { first } from 'rxjs/operators';
import { Subject } from "rxjs/internal/Subject";
remoteMain.initialize();


const signals = new Subject();

console.debug('Initializing OBS...');
// NodeObs.IPC.host('obs-studio-node-example'); 
NodeObs.IPC.host(`obs-studio-node-example-${Date.now()}`);
NodeObs.SetWorkingDirectory(path.resolve('node_modules', 'obs-studio-node-primary'));
 const obsDataPath = path.resolve('osn-data'); // OBS Studio configs and logs const initResult = osn.NodeObs.OBS_API_initAPI('en-US', obsDataPath, '1.0.0');
 

const initResult = NodeObs.OBS_API_initAPI('en-US', obsDataPath, '1.0.0');
console.log('initResult------------------------------------------------')


console.log('initResult ' + initResult);

NodeObs.OBS_service_connectOutputSignals((signalInfo: any) => {
  signals.next(signalInfo);
});

const createWindow = () => {



  const mainWindow = new BrowserWindow({
    webPreferences: {
      plugins: true, 
      nodeIntegration: true, 
      contextIsolation: false,
      backgroundThrottling: false,
      webSecurity: false 
    },
  });
  remoteMain.enable(mainWindow.webContents);
  mainWindow.loadFile("dist/index.html");
  mainWindow.webContents.openDevTools({ mode: "detach" });

};

app.whenReady().then(createWindow);
app.once("window-all-closed", () => app.quit());
