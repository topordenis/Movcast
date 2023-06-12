import { useEffect, useRef, useState } from "react";

import reactLogo from "./icons/react.svg";
import esbuildLogo from "./icons/esbuild.svg";
import electronLogo from "./icons/electron.svg";
import "./App.scss";

import { Global, InputFactory, NodeObs } from "obs-studio-node-primary";
import { configureOBS } from "./Services/OutputSettings";
import { CreateDisplayCapture } from "./Services/Capture";
import { setupPreview } from "./Services/Preview";
import * as remote from '@electron/remote';
import { getNextSignalInfo } from ".";
import React from "react";

 const useLazyEffect:typeof React.useEffect = (cb, dep) => {
  const initializeRef = React.useRef<boolean>(false)

  React.useEffect((...args) => {
    if (initializeRef.current) {
      cb(...args)
    } else {
      initializeRef.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep)
}
async function start() {

  let signalInfo: any;

  console.debug('Starting recording...');
  NodeObs.OBS_service_startRecording();

  console.debug('Started?');
  signalInfo = await getNextSignalInfo();

  if (signalInfo.signal === 'Stop') {
    throw Error(signalInfo.error);
  }

  console.debug('Started signalInfo.type:', signalInfo.type, '(expected: "recording")');
  console.debug('Started signalInfo.signal:', signalInfo.signal, '(expected: "start")');
  console.debug('Started!');
}

async function stop() {
  let signalInfo: any;

  console.log('Stopping recording...');
  NodeObs.OBS_service_stopRecording();
  console.log('Stopped?');

  signalInfo = await getNextSignalInfo();

  console.log('On stop signalInfo.type:', signalInfo.type, '(expected: "recording")');
  console.log('On stop signalInfo.signal:', signalInfo.signal, '(expected: "stopping")');

  signalInfo = await getNextSignalInfo();

  console.log('After stop signalInfo.type:', signalInfo.type, '(expected: "recording")');
  console.log('After stop signalInfo.signal:', signalInfo.signal, '(expected: "stop")');

  console.debug('Stopped!');
}
export const App = () => {
  const [count, setCount] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const [recordState, setRecordState] = useState<boolean>(false);

  useEffect(() => {
    console.log('setOutputSource ')
    configureOBS("C:\\Users\\adm\\Videos\\test");
    var displayCapture =  CreateDisplayCapture();
    Global.setOutputSource(0, displayCapture);
    if (previewRef.current == null) return;

    const { width, height, x, y } = previewRef.current.getBoundingClientRect();
    setupPreview(remote.getCurrentWindow(), { width, height, x, y })
  }, [previewRef]);

  var recordClick = () =>{
    if (recordState){

      stop();
      setRecordState(false);
    }
    else{
      start();
      setRecordState(true);
    }
  }
  return (
    <div className="App">

      <div className="preview" ref={previewRef}><p>mata</p></div>



      <div className="btn" onClick={recordClick} >{recordState ? 'Stop recording' : 'Start recording'}</div>
    </div>
  );
};

