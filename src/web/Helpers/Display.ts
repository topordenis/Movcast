import * as remote from '@electron/remote';
function getDisplayInfo() {
    const { screen } = remote;
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.size;
    const { scaleFactor } = primaryDisplay;
    return {
      width,
      height,
      scaleFactor:    scaleFactor,
      aspectRatio:    width / height,
      physicalWidth:  width * scaleFactor,
      physicalHeight: height * scaleFactor,
    }
  }

  export {getDisplayInfo}