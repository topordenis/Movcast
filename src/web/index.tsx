import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import "./index.scss";
import { NodeObs } from "obs-studio-node-primary";
import path from "path";


const signals = new Subject();
 function getNextSignalInfo() {
  return new Promise((resolve, reject) => {
    signals.pipe(first()).subscribe(signalInfo => resolve(signalInfo));
    setTimeout(() => reject('Output signal timeout'), 30000);
  });
}
export {getNextSignalInfo};
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
createRoot(document.getElementById("root") as Element).render(

    <App />
  
);
