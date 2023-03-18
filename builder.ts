import { build } from "electron-builder";

build({
  config: {
    productName: "Electron App",
    artifactName: "${productName}-${version}-${platform}-${arch}.${ext}",
    files: [
      "dist/**/*",
      "!node_modules/@craftamap/esbuild-plugin-html",
      "!node_modules/@jest/types",
      "!node_modules/@testing-library/dom",
      "!node_modules/@testing-library/jest-dom",
      "!node_modules/@testing-library/react",
      "!node_modules/@testing-library/user-event",
      "!node_modules/@types/jest",
      "!node_modules/@types/node",
      "!node_modules/@types/react",
      "!node_modules/@types/react-dom",
      "!node_modules/cross-env",
      "!node_modules/electron-builder",
      "!node_modules/electronmon",
      "!node_modules/esbuild",
      "!node_modules/esbuild-sass-plugin",
      "!node_modules/jest",
      "!node_modules/jest-environment-jsdom",
      "!node_modules/npm-run-all",
      "!node_modules/rimraf",
      "!node_modules/ts-jest",
      "!node_modules/ts-node",
      "!node_modules/typescript",
      "!node_modules/wait-on",
    ],
    directories: {
      output: "release",
      buildResources: "assets",
    },
    win: {
      target: ["zip", "nsis"],
      icon: "assets/icon.ico",
    },
    nsis: {
      artifactName: "${productName}-${version}-installer.${ext}",
      installerIcon: "assets/installer.ico",
    },
    mac: {
      identity: null,
      target: ["default"],
      icon: "assets/icon.icns",
    },
  },
});
