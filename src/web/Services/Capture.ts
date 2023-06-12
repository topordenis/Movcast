import { InputFactory, SceneFactory } from "obs-studio-node-primary";
import { byOS, OS } from "../Helpers";
import {setSetting} from "../Helpers/Settings"
import { getDisplayInfo } from "../Helpers/Display";

const CreateDisplayCapture = ()  =>  {
    const videoSource = InputFactory.create(byOS({ [OS.Windows]: 'monitor_capture', [OS.Mac]: 'display_capture' }), 'desktop-video');

    const { physicalWidth, physicalHeight, aspectRatio } = getDisplayInfo();
  
    // Update source settings:
    let settings = videoSource.settings;
    settings['width'] = physicalWidth;
    settings['height'] = physicalHeight;
    videoSource.update(settings);
    videoSource.save();
  
    // Set output video size to 1920x1080
    const outputWidth = 1920;
    const outputHeight = Math.round(outputWidth / aspectRatio);
    setSetting('Video', 'Base', `${outputWidth}x${outputHeight}`);
    setSetting('Video', 'Output', `${outputWidth}x${outputHeight}`);
    const videoScaleFactor = physicalWidth / outputWidth;
  
    // A scene is necessary here to properly scale captured screen size to output video size
    const scene = SceneFactory.create('test-scene');
    const sceneItem = scene.add(videoSource);
    sceneItem.scale = { x: 1.0/ videoScaleFactor, y: 1.0 / videoScaleFactor };

    return scene;
}

export {CreateDisplayCapture};