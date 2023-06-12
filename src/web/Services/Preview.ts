import { NodeObs } from "obs-studio-node-primary";
import { OS, getOS } from "../Helpers";
import { getDisplayInfo } from "../Helpers/Display";
let existingWindow = false
let initY = 0
const displayId = 'display1';

function resizePreview(window: any, bounds: any) {
    let { aspectRatio, scaleFactor } = getDisplayInfo();
    if (getOS() === OS.Mac) {
      scaleFactor = 1
    }
    const displayWidth = Math.floor(bounds.width);
    const displayHeight = Math.round(displayWidth / aspectRatio);
    const displayX = Math.floor(bounds.x);
    const displayY = Math.floor(bounds.y);
    if (initY === 0) {
      initY = displayY
    }
    NodeObs.OBS_content_resizeDisplay(displayId, displayWidth * scaleFactor, displayHeight * scaleFactor);
  
    if (getOS() === OS.Mac) {
      
    } else {
      NodeObs.OBS_content_moveDisplay(displayId, displayX * scaleFactor, displayY * scaleFactor);
    }
  
    return { height: displayHeight }
  }

  
function setupPreview(window: any, bounds: any) {
    NodeObs.OBS_content_createSourcePreviewDisplay(
      window.getNativeWindowHandle(),
      'test-scene', // or use camera source Id here
      'display1',
    );
    NodeObs.OBS_content_setShouldDrawUI( 'display1', false);
    NodeObs.OBS_content_setPaddingSize( 'display1', 0);
    // Match padding color with main window background color
    NodeObs.OBS_content_setPaddingColor( 'display1', 255, 255, 255);
  
    return resizePreview(window, bounds);
  }
  
  export {setupPreview, resizePreview};

