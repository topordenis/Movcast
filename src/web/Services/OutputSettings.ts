import { getAvailableValues, setSetting } from "../Helpers/Settings";

function configureOBS(videPath: string) {
    console.debug('Configuring OBS');
    setSetting('Output', 'Mode', 'Advanced');
    const availableEncoders = getAvailableValues('Output', 'Recording', 'RecEncoder');
    console.log('availableEncoders ' + JSON.stringify(availableEncoders));
    setSetting('Output', 'RecEncoder', 'obs_x264');
    setSetting('Output', 'RecFilePath', videPath);
    setSetting('Output', 'RecFormat', 'mp4');
    setSetting('Output', 'VBitrate', 10000); // 10 Mbps
    setSetting('Video', 'FPSCommon', 60);
  
    console.debug('OBS Configured');
  }
  export {configureOBS};